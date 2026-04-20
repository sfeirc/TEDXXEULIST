'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/about', label: 'About' },
  { href: '/team', label: 'Team' },
  { href: '/speakers', label: 'Speakers' },
  { href: '/practical-info', label: 'Info' },
  { href: '/eulist-mobility', label: 'EULiST mobility' },
  { href: '/partners', label: 'Partners' },
  { href: '/contact', label: 'Contact' },
] as const;

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="nav-chrome relative z-30 px-4 md:px-6 py-3 md:py-4 font-inter">
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#e62b1e]/60 to-transparent pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto flex items-center gap-4 md:gap-6 min-w-0">
        <Link href="/" className="flex shrink-0 min-w-0 items-center gap-2 md:gap-4 group">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="transition-[filter,opacity] duration-300 group-hover:opacity-95 group-hover:drop-shadow-[0_0_18px_rgba(230,43,30,0.45)] flex items-center">
              <Image
                src="https://landing-pages.ted.com/tedx-logo-generator/assets/logo.png"
                alt="TEDx"
                width={80}
                height={30}
                className="w-auto h-6 md:h-7 ted-logo-red"
              />
            </div>
            <span className="text-white font-bold text-2xl md:text-3xl leading-none tracking-tight">×</span>
            <span className="font-bold text-white tracking-tight leading-none text-[1.75rem] md:text-[2.35rem] bg-gradient-to-b from-white to-white/85 bg-clip-text">
              IMT
            </span>
            <div className="hidden lg:flex items-center gap-2 ml-2 px-3 py-1.5 rounded-full border border-[#e62b1e]/25 bg-black/40 shadow-[0_0_24px_-8px_rgba(230,43,30,0.35)]">
              <span className="text-white/55 text-[0.65rem] font-semibold uppercase tracking-[0.14em]">
                in partnership with
              </span>
              <div className="transition-opacity hover:opacity-95">
                <Image
                  src="https://eulist.university/wp-content/themes/eulist/images/logo-new.png"
                  alt="EULiST"
                  width={80}
                  height={40}
                  className="w-auto h-5"
                />
              </div>
            </div>
          </div>
          <span className="text-white/90 font-semibold text-sm md:text-lg hidden sm:block ml-2 tracking-wide">
            Paris 2027
          </span>
        </Link>

        <div className="hidden md:flex min-w-0 flex-1 justify-end overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex flex-nowrap items-center gap-x-5 lg:gap-x-6 pl-2">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="shrink-0 whitespace-nowrap text-white/70 hover:text-white transition-colors duration-200 relative group text-[0.65rem] lg:text-[0.7rem] font-semibold uppercase tracking-[0.16em] lg:tracking-[0.2em] leading-none py-1"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-[#e62b1e] to-[#ff6b5e] transition-[width] duration-300 group-hover:w-full shadow-[0_0_12px_rgba(230,43,30,0.6)]" />
              </Link>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-[#e62b1e]/15 hover:border-[#e62b1e]/40 transition-all"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 nuclear-card border-t-0 rounded-b-2xl mx-2 border border-[#e62b1e]/20 animate-fade-in shadow-[0_32px_60px_-20px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col p-2">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-white py-3.5 px-4 rounded-xl border border-transparent hover:border-[#e62b1e]/25 hover:bg-white/5 text-sm font-semibold uppercase tracking-wider"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
