import { createClient } from '@/lib/supabase/server';
import FaqClient from './FaqClient';
import type { FaqItem } from '@/types/database';

async function getFaqItems(): Promise<FaqItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('faq_items')
    .select('*')
    .order('display_order')
    .order('created_at');
  return data ?? [];
}

export default async function AdminFaqPage() {
  const items = await getFaqItems();
  return <FaqClient items={items} />;
}
