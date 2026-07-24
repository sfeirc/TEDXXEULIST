'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { resend, FROM } from '@/lib/email/client';
import {
  registrationConfirmedEmail,
  registrationWaitlistedEmail,
  registrationWaitlistPromotedEmail,
} from '@/lib/email/templates';

type Status = 'pending' | 'confirmed' | 'waitlisted' | 'cancelled';
type Result = { success: true } | { success: false; error: string };

async function sendStatusEmail(name: string, email: string, status: Status, promoted = false) {
  if (status === 'confirmed') {
    const html = promoted
      ? registrationWaitlistPromotedEmail(name)
      : registrationConfirmedEmail(name);
    const subject = promoted
      ? 'TEDx IMT Paris 2027 — Une place s\'est libérée pour vous !'
      : 'TEDx IMT Paris 2027 — Votre place est confirmée !';
    await resend.emails.send({ from: FROM, to: email, subject, html }).catch(console.error);
  } else if (status === 'waitlisted') {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: 'TEDx IMT Paris 2027 — Vous êtes sur la liste d\'attente',
      html: registrationWaitlistedEmail(name),
    }).catch(console.error);
  }
}

export async function updateRegistrationStatus(id: string, status: Status): Promise<Result> {
  const supabase = await createClient();

  // Fetch registration before updating so we have name/email for the email
  const { data: reg } = await supabase
    .from('registrations')
    .select('name,email,status')
    .eq('id', id)
    .single();

  const { error } = await supabase
    .from('registrations')
    .update({ status })
    .eq('id', id);

  if (error) return { success: false, error: error.message };

  // Send status-change email to the registrant (only on meaningful transitions)
  if (reg && reg.status !== status) {
    sendStatusEmail(reg.name, reg.email, status);
  }

  // When cancelling, auto-promote the oldest waitlisted entry
  if (status === 'cancelled') {
    const { data: next } = await supabase
      .from('registrations')
      .select('id,name,email')
      .eq('status', 'waitlisted')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (next) {
      await supabase
        .from('registrations')
        .update({ status: 'confirmed' })
        .eq('id', next.id);

      // Notify the promoted person
      sendStatusEmail(next.name, next.email, 'confirmed', true);
    }
  }

  revalidatePath('/admin/registrations');
  revalidatePath('/admin');
  return { success: true };
}

export async function bulkUpdateStatus(ids: string[], status: Status): Promise<Result> {
  if (ids.length === 0) return { success: true };
  const supabase = await createClient();

  // Fetch names/emails for notifications
  const { data: regs } = await supabase
    .from('registrations')
    .select('id,name,email,status')
    .in('id', ids);

  const { error } = await supabase
    .from('registrations')
    .update({ status })
    .in('id', ids);

  if (error) return { success: false, error: error.message };

  // Send emails (fire-and-forget)
  if (regs) {
    for (const reg of regs) {
      if (reg.status !== status) {
        sendStatusEmail(reg.name, reg.email, status);
      }
    }
  }

  revalidatePath('/admin/registrations');
  revalidatePath('/admin');
  return { success: true };
}
