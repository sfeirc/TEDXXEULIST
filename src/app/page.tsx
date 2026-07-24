import { createClient } from '@/lib/supabase/server';
import Footer from '@/components/Footer';
import HomeClient from './HomeClient';
import type { Speaker } from '@/types/database';

export const revalidate = 60;

async function getPageData(): Promise<{ settings: Record<string, string>; speakers: Speaker[] }> {
  try {
    const supabase = await createClient();
    const [{ data: settingsData }, { data: speakersData }] = await Promise.all([
      supabase.from('site_settings').select('key, value'),
      supabase.from('speakers').select('*').eq('is_published', true).order('display_order').limit(4),
    ]);
    const settings = Object.fromEntries((settingsData ?? []).map(s => [s.key, s.value ?? '']));
    return { settings, speakers: speakersData ?? [] };
  } catch {
    return { settings: {}, speakers: [] };
  }
}

export default async function HomePage() {
  const { settings, speakers } = await getPageData();
  return (
    <>
      <HomeClient settings={settings} speakers={speakers} />
      <Footer />
    </>
  );
}
