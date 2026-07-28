'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Conférenciers', href: '/speakers' },
  { label: 'Programme', href: '/programme' },
  { label: 'Partenaires', href: '/partners' },
  { label: 'Équipe', href: '/team' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Inscription', href: '/register' },
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
    <footer
      className="relative z-20 mt-16"
      style={{
        background: 'var(--grey-900)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

          {/* Colonne 1 — Identité */}
          <div className="flex flex-col gap-6">
            <Image
              src="https://i.imgur.com/NSU2tVP.png"
              alt="TEDx IMT Paris"
              width={130}
              height={30}
              className="w-auto h-10"
            />
            <p className="text-sm leading-relaxed" style={{ color: 'var(--grey-500)', maxWidth: '22rem' }}>
              Un événement TEDx porté par des étudiants des écoles IMT, réunissant penseurs, ingénieurs et artistes à Paris.
            </p>
            <div
              className="self-start px-3 py-1"
              style={{
                border: '1px solid rgba(230,43,30,0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span className="w-1.5 h-1.5 shrink-0" style={{ background: 'var(--ted-red)', borderRadius: '50%' }} />
              <span className="font-label text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: 'var(--ted-red)' }}>
                Événement TEDx officiel
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="eyebrow" style={{ fontSize: '0.55rem', color: 'var(--grey-600)' }}>En partenariat avec</span>
              <Image
                src="https://eulist.university/wp-content/themes/eulist/images/logo-new.png"
                alt="EULiST"
                width={70}
                height={30}
                className="w-auto h-4 opacity-60"
              />
            </div>
          </div>

          {/* Colonne 2 — Navigation */}
          <div className="flex flex-col gap-5">
            <p className="eyebrow" style={{ color: 'var(--grey-600)' }}>Navigation</p>
            <nav aria-label="Liens du pied de page">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                {navLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: 'var(--grey-500)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--off-white)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--grey-500)')}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Colonne 3 — Réseaux */}
          <div className="flex flex-col gap-5">
            <p className="eyebrow" style={{ color: 'var(--grey-600)' }}>Suivez-nous</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--grey-500)' }}>
              Premières annonces de conférenciers, coulisses et mises à jour de l&apos;événement.
            </p>
            {activeSocial.length > 0 ? (
              <div className="flex flex-col gap-3">
                {activeSocial.map(({ key, label, Icon }) => (
                  <a
                    key={key}
                    href={social[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex items-center gap-3 text-sm transition-colors duration-200"
                    style={{ color: 'var(--grey-500)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--off-white)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--grey-500)')}
                  >
                    <Icon size={15} strokeWidth={1.5} />
                    {label}
                  </a>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {socialDefs.map(({ key, label, Icon }) => (
                  <span key={key} className="inline-flex items-center gap-3 text-sm" style={{ color: 'var(--grey-700)' }}>
                    <Icon size={15} strokeWidth={1.5} />
                    {label}
                  </span>
                ))}
              </div>
            )}
            {social['contact_email'] && (
              <a
                href={`mailto:${social['contact_email']}`}
                className="text-xs mt-1 transition-colors"
                style={{ color: 'var(--grey-600)' }}
              >
                {social['contact_email']}
              </a>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
              <span className="text-xs" style={{ color: 'var(--grey-600)' }}>
                © {new Date().getFullYear()} TEDx IMT Paris
              </span>
              <span className="text-xs italic" style={{ color: 'var(--grey-700)' }}>
                Événement indépendant sous licence TED Conferences LLC
              </span>
            </div>
            <div className="flex items-center gap-5">
              <Link href="/legal" className="text-xs transition-colors" style={{ color: 'var(--grey-600)' }}>
                Mentions légales
              </Link>
              <Link href="/privacy" className="text-xs transition-colors" style={{ color: 'var(--grey-600)' }}>
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
