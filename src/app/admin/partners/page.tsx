import { createClient } from '@/lib/supabase/server';
import PartnersClient from './PartnersClient';

export default async function AdminPartners() {
  const supabase = await createClient();
  const { data } = await supabase.from('partners').select('*').order('display_order');
  return (
    <div className="p-8">
      <PartnersClient partners={data ?? []} />
    </div>
  );
}
