import { createClient } from '@/lib/supabase/server';
import SpeakersClient from './SpeakersClient';

export default async function AdminSpeakers() {
  const supabase = await createClient();
  const { data } = await supabase.from('speakers').select('*').order('display_order');
  return (
    <div className="p-8">
      <SpeakersClient speakers={data ?? []} />
    </div>
  );
}
