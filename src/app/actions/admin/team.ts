'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { teamMemberSchema } from '@/lib/validations';

type Result = { success: true } | { success: false; error: string };

export async function upsertTeamMember(data: unknown, id?: string): Promise<Result> {
  const parsed = teamMemberSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = id
    ? await supabase.from('team_members').update(parsed.data).eq('id', id)
    : await supabase.from('team_members').insert(parsed.data);

  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/team');
  revalidatePath('/team');
  return { success: true };
}

export async function deleteTeamMember(id: string): Promise<Result> {
  const supabase = await createClient();
  const { error } = await supabase.from('team_members').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/team');
  revalidatePath('/team');
  return { success: true };
}
