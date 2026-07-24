'use server';

import { createClient } from '@/lib/supabase/server';
import { resend, FROM } from '@/lib/email/client';

export async function sendBroadcast(subject: string, bodyHtml: string, targetAudience: 'newsletter' | 'confirmed_registrants') {
  const supabase = await createClient();

  // Verify authenticated
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized', sent: 0 };

  let emails: string[] = [];

  if (targetAudience === 'newsletter') {
    const { data } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('confirmed', true);
    emails = (data ?? []).map(r => r.email);
  } else {
    const { data } = await supabase
      .from('registrations')
      .select('email')
      .eq('status', 'confirmed');
    emails = (data ?? []).map(r => r.email);
  }

  if (emails.length === 0) {
    return { success: false, error: 'No recipients found', sent: 0 };
  }

  const unsubscribeFooter = `
    <div style="margin-top:40px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.1);text-align:center;font-size:11px;color:rgba(255,255,255,0.3);">
      You are receiving this email because you signed up at tedximtparis.com.<br/>
      TEDx IMT Paris · Paris, France
    </div>
  `;

  const fullHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="background:#070706;color:#e8e4de;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin:0;padding:0;">
<div style="max-width:600px;margin:0 auto;padding:40px 24px;">
  <div style="margin-bottom:32px;">
    <span style="font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(230,43,30,0.8);">TEDx IMT Paris</span>
  </div>
  <div style="line-height:1.7;color:rgba(232,228,222,0.85);">
    ${bodyHtml}
  </div>
  ${unsubscribeFooter}
</div>
</body>
</html>`;

  // Send in batches of 50 (Resend limit)
  const BATCH = 50;
  let sent = 0;
  const errors: string[] = [];

  for (let i = 0; i < emails.length; i += BATCH) {
    const batch = emails.slice(i, i + BATCH);
    try {
      await resend.emails.send({
        from: FROM,
        to: batch,
        subject,
        html: fullHtml,
      });
      sent += batch.length;
    } catch (err: unknown) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }

  // Log broadcast
  await supabase.from('email_broadcasts').insert({
    subject,
    body_html: bodyHtml,
    sent_to_count: sent,
    status: errors.length === 0 ? 'sent' : 'partial',
    sent_at: new Date().toISOString(),
  });

  if (errors.length > 0 && sent === 0) {
    return { success: false, error: errors.join('; '), sent: 0 };
  }

  return { success: true, sent, errors: errors.length > 0 ? errors : undefined };
}
