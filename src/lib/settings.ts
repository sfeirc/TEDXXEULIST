import { createClient } from '@/lib/supabase/server';

export async function getSettings(): Promise<Record<string, string>> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from('site_settings').select('key, value');
    if (!data) return {};
    return Object.fromEntries(data.map(s => [s.key, s.value ?? '']));
  } catch {
    return {};
  }
}
