'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { speakerSchema } from '@/lib/validations';

type Result = { success: true } | { success: false; error: string };

export async function upsertSpeaker(data: unknown, id?: string): Promise<Result> {
  const parsed = speakerSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = id
    ? await supabase.from('speakers').update(parsed.data).eq('id', id)
    : await supabase.from('speakers').insert(parsed.data);

  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/speakers');
  revalidatePath('/speakers');
  return { success: true };
}

export async function deleteSpeaker(id: string): Promise<Result> {
  const supabase = await createClient();
  const { error } = await supabase.from('speakers').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/speakers');
  revalidatePath('/speakers');
  return { success: true };
}

export async function toggleSpeakerPublished(id: string, is_published: boolean): Promise<Result> {
  const supabase = await createClient();
  const { error } = await supabase.from('speakers').update({ is_published }).eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/speakers');
  revalidatePath('/speakers');
  return { success: true };
}
