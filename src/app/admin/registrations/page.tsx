import { createClient } from '@/lib/supabase/server';
import RegistrationsClient from './RegistrationsClient';

export default async function AdminRegistrations() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="p-8">
      <RegistrationsClient registrations={data ?? []} />
    </div>
  );
}
