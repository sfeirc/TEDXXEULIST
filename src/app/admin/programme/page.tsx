import { createClient } from '@/lib/supabase/server';
import ProgrammeClient from './ProgrammeClient';
import type { ProgrammeSession } from '@/types/database';

async function getSessions(): Promise<ProgrammeSession[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('programme_sessions')
    .select('*')
    .order('display_order')
    .order('time');
  return data ?? [];
}

export default async function AdminProgrammePage() {
  const sessions = await getSessions();
  return <ProgrammeClient sessions={sessions} />;
}
