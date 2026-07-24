import { createClient } from '@/lib/supabase/server';
import ContactsClient from './ContactsClient';

export default async function AdminContacts() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="p-8">
      <ContactsClient contacts={data ?? []} />
    </div>
  );
}
