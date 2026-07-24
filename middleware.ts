import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const ADMIN_HOSTNAME = 'admin.tedximtparis.com';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') ?? '';
  const xForwardedHost = request.headers.get('x-forwarded-host') ?? '';
  const effectiveHost = xForwardedHost || hostname;
  console.log('[MW]', pathname, '| host:', hostname, '| x-forwarded-host:', xForwardedHost, '| effective:', effectiveHost);
  const isAdminSubdomain = effectiveHost === ADMIN_HOSTNAME || hostname === ADMIN_HOSTNAME;

  // Rewrite admin.tedximtparis.com/* → /admin/*
  if (isAdminSubdomain) {
    const rewrittenPath = pathname === '/' ? '/admin' : `/admin${pathname}`;
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = rewrittenPath;

    // Public: login page on subdomain
    if (rewrittenPath === '/admin/login' || pathname.startsWith('/admin/login')) {
      return NextResponse.rewrite(rewriteUrl);
    }

    // Auth check
    let response = NextResponse.rewrite(rewriteUrl);
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.rewrite(rewriteUrl);
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      const loginUrl = new URL(`https://${ADMIN_HOSTNAME}/login`);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  // Standard /admin/* protection on main domain
  if (!pathname.startsWith('/admin') || pathname.startsWith('/admin/login')) {
    const res = NextResponse.next({ request });
    res.headers.set('x-debug-host', hostname);
    res.headers.set('x-debug-xfwdhost', xForwardedHost);
    res.headers.set('x-debug-isadmin', String(isAdminSubdomain));
    return res;
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/((?!_next/static|_next/image|favicon.ico).*)'],
};
