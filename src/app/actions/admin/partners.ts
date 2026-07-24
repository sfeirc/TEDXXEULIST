'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { partnerSchema } from '@/lib/validations';

type Result = { success: true } | { success: false; error: string };

export async function upsertPartner(data: unknown, id?: string): Promise<Result> {
  const parsed = partnerSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = id
    ? await supabase.from('partners').update(parsed.data).eq('id', id)
    : await supabase.from('partners').insert(parsed.data);

  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/partners');
  revalidatePath('/partners');
  return { success: true };
}

export async function deletePartner(id: string): Promise<Result> {
  const supabase = await createClient();
  const { error } = await supabase.from('partners').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/partners');
  revalidatePath('/partners');
  return { success: true };
}
