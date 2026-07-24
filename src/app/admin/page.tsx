import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Mic, Handshake, Users, ClipboardList, MessageSquare, ArrowUpRight, Mail, SlidersHorizontal } from 'lucide-react';

async function getStats() {
  const supabase = await createClient();
  const [
    { count: speakers },
    { count: partners },
    { count: team },
    { count: registrations },
    { count: contacts },
    { count: pending },
    { count: newContacts },
    { count: newsletter },
  ] = await Promise.all([
    supabase.from('speakers').select('*', { count: 'exact', head: true }),
    supabase.from('partners').select('*', { count: 'exact', head: true }),
    supabase.from('team_members').select('*', { count: 'exact', head: true }),
    supabase.from('registrations').select('*', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
    supabase.from('registrations').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }).eq('confirmed', true),
  ]);
  return { speakers, partners, team, registrations, contacts, pending, newContacts, newsletter };
}

async function getRecent() {
  const supabase = await createClient();
  const [{ data: recentRegs }, { data: recentContacts }] = await Promise.all([
    supabase.from('registrations').select('id,name,email,status,created_at').order('created_at', { ascending: false }).limit(6),
    supabase.from('contact_submissions').select('id,name,email,interest,status,created_at').order('created_at', { ascending: false }).limit(6),
  ]);
  return { recentRegs: recentRegs ?? [], recentContacts: recentContacts ?? [] };
}

const statusStyle: Record<string, { bg: string; color: string; border: string }> = {
  pending:   { bg: 'rgba(234,179,8,0.1)',  color: '#fbbf24', border: 'rgba(234,179,8,0.25)' },
  confirmed: { bg: 'rgba(34,197,94,0.1)',  color: '#4ade80', border: 'rgba(34,197,94,0.25)' },
  waitlisted:{ bg: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: 'rgba(59,130,246,0.25)' },
  cancelled: { bg: 'rgba(239,68,68,0.1)',  color: '#f87171', border: 'rgba(239,68,68,0.25)' },
  new:       { bg: 'rgba(230,43,30,0.12)', color: '#e62b1e', border: 'rgba(230,43,30,0.3)' },
  read:      { bg: 'rgba(200,190,175,0.06)', color: 'rgba(200,190,175,0.5)', border: 'rgba(200,190,175,0.15)' },
  replied:   { bg: 'rgba(34,197,94,0.1)',  color: '#4ade80', border: 'rgba(34,197,94,0.25)' },
};

function StatusBadge({ status }: { status: string }) {
  const s = statusStyle[status] ?? statusStyle.read;
  return (
    <span
      className="text-[0.65rem] font-label font-semibold px-2 py-0.5 rounded-full"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`, letterSpacing: '0.08em' }}
    >
      {status}
    </span>
  );
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const { recentRegs, recentContacts } = await getRecent();

  const cards = [
    { label: 'Speakers',      value: stats.speakers      ?? 0, icon: Mic,               href: '/admin/speakers' },
    { label: 'Partners',      value: stats.partners      ?? 0, icon: Handshake,          href: '/admin/partners' },
    { label: 'Team',          value: stats.team          ?? 0, icon: Users,              href: '/admin/team' },
    { label: 'Registrations', value: stats.registrations ?? 0, icon: ClipboardList,      href: '/admin/registrations', badge: stats.pending    ?? 0, badgeLabel: 'pending' },
    { label: 'Contacts',      value: stats.contacts      ?? 0, icon: MessageSquare,      href: '/admin/contacts',      badge: stats.newContacts ?? 0, badgeLabel: 'new' },
    { label: 'Newsletter',    value: stats.newsletter    ?? 0, icon: Mail,               href: '/admin/newsletter' },
    { label: 'Settings',      value: 0,                        icon: SlidersHorizontal,  href: '/admin/settings', hideCount: true },
  ];

  const borderWarm = 'rgba(200,190,175,0.09)';

  return (
    <div className="p-8 max-w-6xl">

      {/* Header */}
      <div className="mb-10">
        <p className="font-label text-[0.65rem] tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(200,190,175,0.35)' }}>
          Overview
        </p>
        <h1 className="font-display text-3xl font-light" style={{ color: '#f4f0e8' }}>Dashboard</h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-10">
        {cards.map(({ label, value, icon: Icon, href, badge, badgeLabel, hideCount }) => (
          <Link
            key={label}
            href={href}
            className="group relative rounded-2xl p-5 transition-all duration-200 overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${borderWarm}` }}
          >
            <span
              className="absolute top-0 left-4 right-4 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(90deg, transparent, #e62b1e, transparent)' }}
            />
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(230,43,30,0.1)', border: '1px solid rgba(230,43,30,0.2)' }}
              >
                <Icon className="w-4 h-4" style={{ color: '#e62b1e' }} />
              </div>
              {badge !== undefined && badge > 0 && (
                <span
                  className="text-[0.6rem] font-label font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: 'rgba(230,43,30,0.15)', color: '#e62b1e', border: '1px solid rgba(230,43,30,0.3)', letterSpacing: '0.05em' }}
                >
                  {badge} {badgeLabel}
                </span>
              )}
            </div>
            {hideCount ? (
              <p className="font-label text-[0.65rem] tracking-[0.15em] uppercase mt-8" style={{ color: 'rgba(200,190,175,0.4)' }}>
                {label}
              </p>
            ) : (
              <>
                <p className="font-display font-light leading-none mb-1.5" style={{ fontSize: '2.25rem', color: '#f4f0e8' }}>
                  {value}
                </p>
                <p className="font-label text-[0.65rem] tracking-[0.15em] uppercase" style={{ color: 'rgba(200,190,175,0.4)' }}>
                  {label}
                </p>
              </>
            )}
          </Link>
        ))}
      </div>

      {/* Recent tables */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Registrations */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${borderWarm}` }}>
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${borderWarm}` }}>
            <h2 className="font-label font-semibold text-sm tracking-wide" style={{ color: '#f4f0e8' }}>
              Registrations
            </h2>
            <Link
              href="/admin/registrations"
              className="flex items-center gap-1 font-label text-[0.65rem] tracking-widest uppercase transition-colors duration-150"
              style={{ color: 'rgba(200,190,175,0.35)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#e62b1e'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(200,190,175,0.35)'}
            >
              All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          {recentRegs.length === 0 ? (
            <p className="p-6 text-sm" style={{ color: 'rgba(200,190,175,0.3)' }}>No registrations yet.</p>
          ) : (
            <div className="divide-y" style={{ borderColor: borderWarm }}>
              {recentRegs.map(r => (
                <div key={r.id} className="flex items-center justify-between px-6 py-3.5 gap-4" style={{ transition: 'background 0.15s' }}>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate" style={{ color: '#f4f0e8' }}>{r.name}</p>
                    <p className="text-xs truncate mt-0.5" style={{ color: 'rgba(200,190,175,0.4)' }}>{r.email}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-label" style={{ color: 'rgba(200,190,175,0.3)' }}>{fmt(r.created_at)}</span>
                    <StatusBadge status={r.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contacts */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${borderWarm}` }}>
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${borderWarm}` }}>
            <h2 className="font-label font-semibold text-sm tracking-wide" style={{ color: '#f4f0e8' }}>
              Messages
            </h2>
            <Link
              href="/admin/contacts"
              className="flex items-center gap-1 font-label text-[0.65rem] tracking-widest uppercase transition-colors duration-150"
              style={{ color: 'rgba(200,190,175,0.35)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#e62b1e'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(200,190,175,0.35)'}
            >
              All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          {recentContacts.length === 0 ? (
            <p className="p-6 text-sm" style={{ color: 'rgba(200,190,175,0.3)' }}>No messages yet.</p>
          ) : (
            <div className="divide-y" style={{ borderColor: borderWarm }}>
              {recentContacts.map(c => (
                <div key={c.id} className="flex items-center justify-between px-6 py-3.5 gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate" style={{ color: '#f4f0e8' }}>{c.name}</p>
                    <p className="text-xs truncate mt-0.5" style={{ color: 'rgba(200,190,175,0.4)' }}>{c.interest ?? 'General'}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-label" style={{ color: 'rgba(200,190,175,0.3)' }}>{fmt(c.created_at)}</span>
                    <StatusBadge status={c.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
