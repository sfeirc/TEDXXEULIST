import { createClient } from '@/lib/supabase/server';
import TeamClient from './TeamClient';

export default async function AdminTeam() {
  const supabase = await createClient();
  const { data } = await supabase.from('team_members').select('*').order('display_order');
  return (
    <div className="p-8">
      <TeamClient members={data ?? []} />
    </div>
  );
}
