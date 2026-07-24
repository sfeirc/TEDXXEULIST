import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Only accessible when authenticated (middleware protects /admin/* on main domain,
// but this API route needs its own check since it's under /api/)
async function isAuthenticated(): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return !!user;
  } catch {
    return false;
  }
}

function toCSV(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown) => {
    const s = v == null ? '' : String(v);
    return s.includes(',') || s.includes('"') || s.includes('\n')
      ? `"${s.replace(/"/g, '""')}"`
      : s;
  };
  const lines = [
    headers.join(','),
    ...rows.map(r => headers.map(h => escape(r[h])).join(',')),
  ];
  return lines.join('\r\n');
}

export async function GET(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const type = req.nextUrl.searchParams.get('type') ?? 'registrations';
  const supabase = await createClient();

  let csv = '';
  let filename = '';

  if (type === 'registrations') {
    const { data, error } = await supabase
      .from('registrations')
      .select('name,email,institution,role,motivation,status,created_at')
      .order('created_at', { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    csv = toCSV(data ?? []);
    filename = `registrations-${new Date().toISOString().slice(0, 10)}.csv`;
  } else if (type === 'contacts') {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('name,email,subject,message,interest,status,created_at')
      .order('created_at', { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    csv = toCSV(data ?? []);
    filename = `contacts-${new Date().toISOString().slice(0, 10)}.csv`;
  } else if (type === 'newsletter') {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('email,confirmed,created_at')
      .order('created_at', { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    csv = toCSV(data ?? []);
    filename = `newsletter-${new Date().toISOString().slice(0, 10)}.csv`;
  } else {
    return NextResponse.json({ error: 'Unknown type' }, { status: 400 });
  }

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
