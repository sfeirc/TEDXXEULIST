import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_HOSTNAME = 'admin.tedximtparis.com';
const SUPABASE_PROJECT = 'coxmzgotdoofgqebqrpf';
const COOKIE_KEY = `sb-${SUPABASE_PROJECT}-auth-token`;

/**
 * Reads the Supabase session from cookies.
 * @supabase/ssr v0.12+ stores the session as base64-encoded JSON,
 * potentially split across multiple chunks (.0, .1, ...).
 * Returns true if a non-expired session is found.
 */
function hasValidSession(request: NextRequest): boolean {
  const all = request.cookies.getAll();

  // Collect all chunks for this auth key
  const chunks: Array<{ index: number; value: string }> = [];

  for (const cookie of all) {
    if (cookie.name === COOKIE_KEY) {
      chunks.push({ index: -1, value: cookie.value }); // single-chunk
    } else if (cookie.name.startsWith(`${COOKIE_KEY}.`)) {
      const indexStr = cookie.name.slice(COOKIE_KEY.length + 1);
      const index = parseInt(indexStr, 10);
      if (!isNaN(index)) chunks.push({ index, value: cookie.value });
    }
  }

  if (chunks.length === 0) return false;

  try {
    // Assemble chunks in order
    chunks.sort((a, b) => a.index - b.index);
    let raw = chunks.map((c) => c.value).join('');

    // @supabase/ssr v0.12 prefixes with "base64-"
    if (raw.startsWith('base64-')) {
      raw = atob(raw.slice('base64-'.length));
    }

    const session = JSON.parse(raw);
    const accessToken: string = session.access_token ?? session[0] ?? '';
    if (!accessToken) return false;

    // Decode JWT payload and check expiry (no signature verification needed here)
    const parts = accessToken.split('.');
    if (parts.length !== 3) return false;

    const payload = JSON.parse(
      atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
    );

    if (payload.exp && payload.exp * 1000 < Date.now()) return false;

    return true;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Effective hostname (Cloudflare may forward via x-forwarded-host)
  const rawHost =
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    '';
  const hostname = rawHost.split(':')[0].toLowerCase().trim();
  const isAdminSubdomain = hostname === ADMIN_HOSTNAME;

  // ── Admin subdomain routing: admin.tedximtparis.com/* → /admin/* ──
  if (isAdminSubdomain) {
    // '/' and '/admin' → /admin; paths already prefixed with /admin stay as-is;
    // subdomain-relative paths like /contacts → /admin/contacts
    const rewrittenPath =
      pathname === '/' || pathname === '/admin'
        ? '/admin'
        : pathname.startsWith('/admin/')
        ? pathname
        : `/admin${pathname}`;

    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = rewrittenPath;

    // Login page is always public
    if (
      rewrittenPath === '/admin/login' ||
      rewrittenPath.startsWith('/admin/login/')
    ) {
      return NextResponse.rewrite(rewriteUrl);
    }

    // Check session
    if (!hasValidSession(request)) {
      const loginUrl = new URL(`https://${ADMIN_HOSTNAME}/login`);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.rewrite(rewriteUrl);
  }

  // ── Main domain: protect /admin/* routes ──
  if (!pathname.startsWith('/admin') || pathname.startsWith('/admin/login')) {
    return NextResponse.next({ request });
  }

  if (!hasValidSession(request)) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next({ request });
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
