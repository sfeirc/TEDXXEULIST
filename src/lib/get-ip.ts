import { headers } from 'next/headers';

export async function getClientIp(): Promise<string> {
  const h = await headers();
  // Cloudflare sets the real IP here
  return (
    h.get('cf-connecting-ip') ??
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    h.get('x-real-ip') ??
    'unknown'
  );
}
