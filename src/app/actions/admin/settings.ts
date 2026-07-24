'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function updateSetting(key: string, value: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('site_settings')
    .update({ value, updated_at: new Date().toISOString() })
    .eq('key', key);
  if (error) return { success: false, error: error.message };
  revalidatePath('/');
  revalidatePath('/admin/settings');
  revalidatePath('/programme');
  revalidatePath('/faq');
  revalidatePath('/about');
  return { success: true };
}

export async function updateSettings(entries: Record<string, string>) {
  const supabase = await createClient();
  const now = new Date().toISOString();
  const updates = Object.entries(entries).map(([key, value]) =>
    supabase.from('site_settings').update({ value, updated_at: now }).eq('key', key)
  );
  await Promise.all(updates);
  revalidatePath('/');
  revalidatePath('/admin/settings');
  revalidatePath('/programme');
  revalidatePath('/faq');
  revalidatePath('/about');
  return { success: true };
}
