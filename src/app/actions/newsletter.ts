'use server';

import { createClient } from '@/lib/supabase/server';
import { newsletterSchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/get-ip';

type Result = { success: true } | { success: false; error: string };

export async function subscribeNewsletter(email: string): Promise<Result> {
  try {
    const ip = await getClientIp();

    if (!rateLimit(`newsletter:${ip}`, 3, 300_000).success) {
      return { success: false, error: 'Too many attempts. Please try again later.' };
    }

    const parsed = newsletterSchema.safeParse({ email });
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const supabase = await createClient();
    const { error } = await supabase.from('newsletter_subscribers').insert({
      email: parsed.data.email,
      ip_address: ip !== 'unknown' ? ip : null,
    });

    // Unique constraint means duplicate email → treat as success (silent dedup)
    if (error && error.code !== '23505') {
      console.error('newsletter insert error:', error.message);
      return { success: false, error: 'Could not subscribe. Please try again.' };
    }

    return { success: true };
  } catch (err) {
    console.error('subscribeNewsletter error:', err);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
