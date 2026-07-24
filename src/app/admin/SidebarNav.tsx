'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut } from '@/app/actions/admin/auth';
import {
  LayoutDashboard, Mic, Handshake, Users,
  ClipboardList, MessageSquare, LogOut,
  CalendarDays, HelpCircle, Mail, SlidersHorizontal, Crown,
} from 'lucide-react';

const navLinks = [
  { href: '/admin',               label: 'Dashboard',     icon: LayoutDashboard },
  { href: '/admin/speakers',      label: 'Speakers',      icon: Mic },
  { href: '/admin/partners',      label: 'Partners',      icon: Handshake },
  { href: '/admin/team',          label: 'Team',          icon: Users },
  { href: '/admin/programme',     label: 'Programme',     icon: CalendarDays },
  { href: '/admin/faq',           label: 'FAQ',           icon: HelpCircle },
  { href: '/admin/registrations', label: 'Registrations', icon: ClipboardList },
  { href: '/admin/contacts',      label: 'Contacts',      icon: MessageSquare },
  { href: '/admin/newsletter',    label: 'Newsletter',    icon: Mail },
  { href: '/admin/settings',      label: 'Settings',      icon: SlidersHorizontal },
];

const superAdminLinks = [
  { href: '/admin/users', label: 'Admins', icon: Crown },
];

export default function SidebarNav({
  email,
  userRole,
}: {
  email?: string;
  userRole?: 'admin' | 'super_admin' | null;
}) {
  const pathname = usePathname();
  const isSuperAdmin = userRole === 'super_admin';

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  const renderLink = (href: string, label: string, Icon: React.ElementType) => {
    const active = isActive(href);
    return (
      <Link
        key={href}
        href={href}
        className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
        style={{
          color: active ? '#fff' : 'rgba(200,190,175,0.45)',
          background: active ? 'rgba(230,43,30,0.1)' : 'transparent',
        }}
        onMouseEnter={e => {
          if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(200,190,175,0.85)';
          if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(200,190,175,0.04)';
        }}
        onMouseLeave={e => {
          if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(200,190,175,0.45)';
          if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent';
        }}
      >
        {active && (
          <span
            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-r-full"
            style={{ background: '#e62b1e' }}
          />
        )}
        <Icon
          className="w-4 h-4 shrink-0"
          style={{ color: active ? '#e62b1e' : 'rgba(200,190,175,0.4)' }}
        />
        {label}
      </Link>
    );
  };

  return (
    <aside
      className="w-56 shrink-0 flex flex-col"
      style={{
        background: 'rgba(10,9,8,0.98)',
        borderRight: '1px solid rgba(200,190,175,0.07)',
      }}
    >
      {/* Logo */}
      <div className="px-5 pt-6 pb-5" style={{ borderBottom: '1px solid rgba(200,190,175,0.07)' }}>
        <div className="flex items-center">
          <Image
            src="https://i.imgur.com/NSU2tVP.png"
            alt="TEDx IMT Paris"
            width={100}
            height={22}
            className="w-auto h-10"
          />
        </div>
        <p className="font-label text-[0.6rem] tracking-[0.2em] uppercase mt-1.5" style={{ color: 'rgba(200,190,175,0.3)' }}>
          Admin
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2.5 py-3 space-y-0.5 overflow-y-auto">
        {navLinks.map(({ href, label, icon: Icon }) => renderLink(href, label, Icon))}

        {/* Super admin section */}
        {isSuperAdmin && (
          <>
            <div className="pt-3 pb-1 px-3">
              <p className="text-[0.6rem] font-label font-semibold uppercase tracking-[0.18em]" style={{ color: 'rgba(200,190,175,0.2)' }}>
                Super Admin
              </p>
            </div>
            {superAdminLinks.map(({ href, label, icon: Icon }) => renderLink(href, label, Icon))}
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="px-2.5 pb-4 pt-3" style={{ borderTop: '1px solid rgba(200,190,175,0.07)' }}>
        {email && (
          <div className="px-3 pb-2">
            <p className="text-[0.65rem] truncate font-label tracking-wide" style={{ color: 'rgba(200,190,175,0.3)' }}>
              {email}
            </p>
            {isSuperAdmin && (
              <span className="inline-flex items-center gap-1 text-[0.58rem] font-label font-semibold mt-0.5" style={{ color: '#e62b1e' }}>
                <Crown className="w-2.5 h-2.5" />
                Super Admin
              </span>
            )}
          </div>
        )}
        <form action={signOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
            style={{ color: 'rgba(200,190,175,0.4)' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = '#f87171';
              (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.08)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'rgba(200,190,175,0.4)';
              (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
