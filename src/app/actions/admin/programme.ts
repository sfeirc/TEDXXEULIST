'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import type { ProgrammeSession } from '@/types/database';

type Result = { success: true } | { success: false; error: string };

export async function upsertSession(data: {
  time: string;
  title: string;
  type: ProgrammeSession['type'];
  section?: string;
  description?: string;
  speaker_count?: number;
  display_order?: number;
  is_published?: boolean;
}, id?: string): Promise<Result> {
  const supabase = await createClient();
  const payload = {
    time: data.time.trim(),
    title: data.title.trim(),
    type: data.type,
    section: data.section?.trim() || 'TEDx',
    description: data.description?.trim() || null,
    speaker_count: data.speaker_count ?? 0,
    display_order: data.display_order ?? 0,
    is_published: data.is_published ?? true,
    updated_at: new Date().toISOString(),
  };
  const { error } = id
    ? await supabase.from('programme_sessions').update(payload).eq('id', id)
    : await supabase.from('programme_sessions').insert(payload);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/programme');
  revalidatePath('/programme');
  return { success: true };
}

export async function deleteSession(id: string): Promise<Result> {
  const supabase = await createClient();
  const { error } = await supabase.from('programme_sessions').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/programme');
  revalidatePath('/programme');
  return { success: true };
}

export async function toggleSessionPublished(id: string, is_published: boolean): Promise<Result> {
  const supabase = await createClient();
  const { error } = await supabase.from('programme_sessions').update({ is_published, updated_at: new Date().toISOString() }).eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/programme');
  revalidatePath('/programme');
  return { success: true };
}
