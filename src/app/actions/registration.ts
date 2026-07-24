'use server';

import { createClient } from '@/lib/supabase/server';
import { registrationSchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/get-ip';
import { resend, FROM, ADMIN_EMAIL } from '@/lib/email/client';
import {
  registrationPendingEmail,
  registrationWaitlistedEmail,
  adminNewRegistrationEmail,
} from '@/lib/email/templates';

type Result = { success: true } | { success: false; error: string };

export async function submitRegistration(data: {
  name: string;
  email: string;
  institution?: string;
  role?: string;
  motivation?: string;
}): Promise<Result> {
  try {
    const ip = await getClientIp();

    if (!rateLimit(`register:${ip}`, 2, 300_000).success) {
      return { success: false, error: 'Too many registration attempts. Please try again later.' };
    }

    const parsed = registrationSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const supabase = await createClient();

    const { count, error: countError } = await supabase
      .from('registrations')
      .select('id', { count: 'exact', head: true })
      .neq('status', 'cancelled');

    if (countError) {
      console.error('registration count error:', countError.message);
      return { success: false, error: 'Could not complete registration. Please try again.' };
    }

    const totalRegistrations = count ?? 0;

    if (totalRegistrations >= 300) {
      return { success: false, error: 'Sorry, the event is fully booked. Join the waitlist via the contact form.' };
    }

    const isWaitlisted = totalRegistrations >= 250;

    const { data: existing } = await supabase
      .from('registrations')
      .select('id')
      .eq('email', parsed.data.email)
      .maybeSingle();

    if (existing) {
      return { success: false, error: 'This email is already registered.' };
    }

    const { error } = await supabase.from('registrations').insert({
      ...parsed.data,
      ip_address: ip !== 'unknown' ? ip : null,
      ...(isWaitlisted && { status: 'waitlisted' }),
    });

    if (error) {
      console.error('registration insert error:', error.message);
      return { success: false, error: 'Could not complete registration. Please try again.' };
    }

    // Send emails in parallel, fire-and-forget (don't block on failure)
    const emailToApplicant = isWaitlisted
      ? resend.emails.send({
          from: FROM,
          to: parsed.data.email,
          subject: 'TEDx IMT Paris 2027 — Vous êtes sur la liste d\'attente',
          html: registrationWaitlistedEmail(parsed.data.name),
        })
      : resend.emails.send({
          from: FROM,
          to: parsed.data.email,
          subject: 'TEDx IMT Paris 2027 — Inscription reçue',
          html: registrationPendingEmail(parsed.data.name),
        });

    const emailToAdmin = resend.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      subject: `[TEDx] Nouvelle inscription — ${parsed.data.name}`,
      html: adminNewRegistrationEmail(parsed.data.name, parsed.data.email, parsed.data.institution),
    });

    await Promise.allSettled([emailToApplicant, emailToAdmin]);

    return { success: true };
  } catch (err) {
    console.error('submitRegistration error:', err);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
