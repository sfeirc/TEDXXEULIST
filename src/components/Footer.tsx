'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Speakers', href: '/speakers' },
  { label: 'Programme', href: '/programme' },
  { label: 'Partners', href: '/partners' },
  { label: 'Team', href: '/team' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Register', href: '/register' },
  { label: 'Contact', href: '/contact' },
];

const socialDefs = [
  { key: 'social_instagram', label: 'Instagram', Icon: Instagram },
  { key: 'social_linkedin', label: 'LinkedIn', Icon: Linkedin },
  { key: 'social_twitter', label: 'Twitter / X', Icon: Twitter },
  { key: 'social_youtube', label: 'YouTube', Icon: Youtube },
];

type Social = Record<string, string>;

export default function Footer() {
  const [social, setSocial] = useState<Social>({});

  useEffect(() => {
    const key = 'tedx_footer_social';
    const cached = sessionStorage.getItem(key);
    if (cached) { setSocial(JSON.parse(cached)); return; }

    import('@/lib/supabase/client').then(({ createClient }) => {
      const supabase = createClient();
      supabase
        .from('site_settings')
        .select('key, value')
        .in('key', ['social_instagram', 'social_linkedin', 'social_twitter', 'social_youtube', 'contact_email'])
        .then(({ data }) => {
          if (data) {
            const map = Object.fromEntries(data.map(s => [s.key, s.value ?? '']));
            setSocial(map);
            sessionStorage.setItem(key, JSON.stringify(map));
          }
        });
    });
  }, []);

  const activeSocial = socialDefs.filter(s => social[s.key]);

  return (
    <footer className="relative z-20 mt-24 border-t border-[#e62b1e]/20 bg-black/80 backdrop-blur-xl overflow-hidden font-inter">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e62b1e] to-transparent opacity-90" />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center">
              <div className="drop-shadow-[0_0_20px_rgba(230,43,30,0.35)]">
                <Image
                  src="https://i.imgur.com/NSU2tVP.png"
                  alt="TEDx IMT Paris" width={130} height={30}
                  className="w-auto h-12 md:h-14"
                />
              </div>
            </div>

            <p className="text-white/55 text-sm leading-relaxed max-w-xs">
              Ideas worth spreading — a student-led TEDx event bringing together innovators,
              thinkers, and changemakers at IMT Paris.
            </p>

            <div className="inline-flex items-center gap-2 self-start border border-[#e62b1e]/40 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e62b1e] shrink-0" />
              <span className="text-[#e62b1e] text-[0.65rem] font-semibold uppercase tracking-[0.2em]">Licensed TEDx Event</span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-white/35 text-[0.65rem] font-semibold uppercase tracking-[0.15em]">In partnership with</span>
              <Image
                src="https://eulist.university/wp-content/themes/eulist/images/logo-new.png"
                alt="EULiST" width={80} height={40} className="w-auto h-5 opacity-75"
              />
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="flex flex-col gap-5">
            <h3 className="text-white text-xs font-semibold uppercase tracking-[0.22em]">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                {quickLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-white/50 text-sm hover:text-[#e62b1e] transition-colors duration-200 hover:underline underline-offset-4">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3 — Social / Contact */}
          <div className="flex flex-col gap-5">
            <h3 className="text-white text-xs font-semibold uppercase tracking-[0.22em]">Follow Us</h3>
            <p className="text-white/45 text-sm leading-relaxed">
              Stay updated on speakers, announcements, and behind-the-scenes moments.
            </p>
            {activeSocial.length > 0 ? (
              <div className="flex flex-col gap-3">
                {activeSocial.map(({ key, label, Icon }) => (
                  <a
                    key={key} href={social[key]} target="_blank" rel="noopener noreferrer"
                    aria-label={label}
                    className="group inline-flex items-center gap-3 text-white/50 hover:text-[#e62b1e] transition-colors duration-200"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 group-hover:border-[#e62b1e]/50 transition-colors duration-200">
                      <Icon size={15} strokeWidth={1.75} />
                    </span>
                    <span className="text-sm">{label}</span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {socialDefs.map(({ key, label, Icon }) => (
                  <span key={key} className="inline-flex items-center gap-3 text-white/25">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/[0.06]">
                      <Icon size={15} strokeWidth={1.75} />
                    </span>
                    <span className="text-sm">{label}</span>
                  </span>
                ))}
              </div>
            )}
            {social['contact_email'] && (
              <a href={`mailto:${social['contact_email']}`} className="text-white/40 text-sm hover:text-[#e62b1e] transition-colors mt-1">
                {social['contact_email']}
              </a>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-white/8" />

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/30 text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} TEDx IMT Paris. All rights reserved.</span>
            <span className="hidden sm:inline text-white/15">|</span>
            <span className="italic">Independently organized TEDx event</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/legal" className="hover:text-[#e62b1e] transition-colors duration-200 hover:underline underline-offset-4">Legal</Link>
            <span className="text-white/15">|</span>
            <Link href="/privacy" className="hover:text-[#e62b1e] transition-colors duration-200 hover:underline underline-offset-4">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
