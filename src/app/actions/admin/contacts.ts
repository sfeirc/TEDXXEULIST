'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

type Status = 'new' | 'read' | 'replied';
type Result = { success: true } | { success: false; error: string };

export async function updateContactStatus(id: string, status: Status): Promise<Result> {
  const supabase = await createClient();
  const { error } = await supabase.from('contact_submissions').update({ status }).eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/contacts');
  return { success: true };
}
