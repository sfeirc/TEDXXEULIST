'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { href: '/about', label: 'À propos' },
  { href: '/speakers', label: 'Conférenciers' },
  { href: '/programme', label: 'Programme' },
  { href: '/faq', label: 'FAQ' },
  { href: '/partners', label: 'Partenaires' },
  { href: '/team', label: 'Équipe' },
  { href: '/contact', label: 'Contact' },
] as const;

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-300"
        style={
          scrolled
            ? {
                paddingTop: '0.875rem',
                paddingBottom: '0.875rem',
                background: 'rgba(7,7,6,0.96)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderBottom: '1px solid var(--border-subtle)',
              }
            : { paddingTop: '1.375rem', paddingBottom: '1.375rem' }
        }
      >
        <Link href="/" className="flex items-center" aria-label="TEDx IMT Paris — accueil">
          <Image
            src="https://i.imgur.com/NSU2tVP.png"
            alt="TEDx IMT Paris"
            width={120}
            height={28}
            className="h-12 w-auto"
          />
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="relative font-label text-[0.75rem] tracking-[0.15em] uppercase transition-colors duration-200 group"
                style={{ color: 'var(--grey-400)' }}
              >
                {label}
                <span
                  className="absolute -bottom-px left-0 w-0 h-px group-hover:w-full transition-all duration-300 ease-out"
                  style={{ background: 'var(--ted-red)' }}
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href="/register"
            className="btn-primary hidden md:inline-flex"
            style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', paddingLeft: '1.25rem', paddingRight: '1.25rem', fontSize: '0.72rem' }}
          >
            Réserver
          </Link>
          <button
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            className="lg:hidden p-1 transition-colors"
            style={{ color: 'var(--grey-400)' }}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay — AnimatePresence only for show/hide, no stagger */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex flex-col px-6 py-8"
            style={{ background: 'var(--black-deep)' }}
          >
            <div className="flex items-center justify-between mb-14">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
                <Image
                  src="https://i.imgur.com/NSU2tVP.png"
                  alt="TEDx IMT Paris"
                  width={120}
                  height={28}
                  className="h-12 w-auto"
                />
              </Link>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="p-1"
                style={{ color: 'var(--grey-400)' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1">
              <ul>
                {navLinks.map(({ href, label }) => (
                  <li
                    key={href}
                    style={{ borderBottom: '1px solid var(--border-subtle)' }}
                  >
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className="block py-4 font-display font-light transition-colors"
                      style={{ fontSize: 'clamp(1.75rem, 5vw, 2.25rem)', color: 'var(--off-white)' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8">
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="btn-primary w-full justify-center text-center block"
              >
                Réserver ma place
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
