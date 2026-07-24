'use server';

import { createClient } from '@/lib/supabase/server';
import { contactSchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/get-ip';
import { resend, FROM, ADMIN_EMAIL } from '@/lib/email/client';
import { contactAutoReplyEmail, adminNewContactEmail } from '@/lib/email/templates';

type Result = { success: true } | { success: false; error: string };

export async function submitContact(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  interest?: string;
}): Promise<Result> {
  try {
    const ip = await getClientIp();

    if (!rateLimit(`contact:${ip}`, 3, 60_000).success) {
      return { success: false, error: 'Too many submissions — please wait a minute and try again.' };
    }

    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const supabase = await createClient();
    const { error } = await supabase.from('contact_submissions').insert({
      ...parsed.data,
      ip_address: ip !== 'unknown' ? ip : null,
    });

    if (error) {
      console.error('contact insert error:', error.message);
      return { success: false, error: 'Could not save your message. Please try again.' };
    }

    await Promise.allSettled([
      resend.emails.send({
        from: FROM,
        to: parsed.data.email,
        subject: `TEDx IMT Paris — Message reçu`,
        html: contactAutoReplyEmail(parsed.data.name, parsed.data.subject),
      }),
      resend.emails.send({
        from: FROM,
        to: ADMIN_EMAIL,
        replyTo: parsed.data.email,
        subject: `[TEDx Contact] ${parsed.data.subject}`,
        html: adminNewContactEmail(parsed.data.name, parsed.data.email, parsed.data.subject, parsed.data.message),
      }),
    ]);

    return { success: true };
  } catch (err) {
    console.error('submitContact error:', err);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
