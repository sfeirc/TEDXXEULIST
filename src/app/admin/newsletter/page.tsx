import { createClient } from '@/lib/supabase/server';
import NewsletterClient from './NewsletterClient';
import type { NewsletterSubscriber } from '@/types/database';

async function getSubscribers(): Promise<NewsletterSubscriber[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function AdminNewsletterPage() {
  const subscribers = await getSubscribers();
  return (
    <div className="p-8">
      <NewsletterClient subscribers={subscribers} />
    </div>
  );
}
