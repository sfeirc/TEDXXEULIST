'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

type Result = { success: true } | { success: false; error: string };

export async function upsertFaq(data: {
  question: string;
  answer: string;
  category?: string;
  display_order?: number;
  is_published?: boolean;
}, id?: string): Promise<Result> {
  const supabase = await createClient();
  const payload = {
    question: data.question.trim(),
    answer: data.answer.trim(),
    category: data.category?.trim() || null,
    display_order: data.display_order ?? 0,
    is_published: data.is_published ?? true,
    updated_at: new Date().toISOString(),
  };
  const { error } = id
    ? await supabase.from('faq_items').update(payload).eq('id', id)
    : await supabase.from('faq_items').insert(payload);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/faq');
  revalidatePath('/faq');
  return { success: true };
}

export async function deleteFaq(id: string): Promise<Result> {
  const supabase = await createClient();
  const { error } = await supabase.from('faq_items').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/faq');
  revalidatePath('/faq');
  return { success: true };
}

export async function toggleFaqPublished(id: string, is_published: boolean): Promise<Result> {
  const supabase = await createClient();
  const { error } = await supabase.from('faq_items').update({ is_published, updated_at: new Date().toISOString() }).eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/faq');
  revalidatePath('/faq');
  return { success: true };
}

export async function reorderFaq(items: { id: string; display_order: number }[]): Promise<Result> {
  const supabase = await createClient();
  await Promise.all(
    items.map(({ id, display_order }) =>
      supabase.from('faq_items').update({ display_order, updated_at: new Date().toISOString() }).eq('id', id)
    )
  );
  revalidatePath('/admin/faq');
  revalidatePath('/faq');
  return { success: true };
}
