import { createClient } from '@/lib/supabase/server';
import SettingsClient from './SettingsClient';
import type { SiteSetting } from '@/types/database';

async function getSettings(): Promise<SiteSetting[]> {
  const supabase = await createClient();
  const { data } = await supabase.from('site_settings').select('*').order('key');
  return data ?? [];
}

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  return (
    <div className="p-8">
      <SettingsClient settings={settings} />
    </div>
  );
}
