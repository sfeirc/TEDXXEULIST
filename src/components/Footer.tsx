'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ScrollReveal } from '@/components/MotionElements';

export default function Footer() {
  return (
    <ScrollReveal>
      <footer className="relative z-20 mt-24 border-t border-[#e62b1e]/20 bg-black/80 backdrop-blur-xl overflow-hidden font-inter">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e62b1e] to-transparent opacity-90" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
          aria-hidden
        />

        <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-14">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-12">
            <div className="flex flex-col items-center lg:items-start gap-4">
              <div className="flex items-center gap-3">
                <div className="drop-shadow-[0_0_20px_rgba(230,43,30,0.35)]">
                  <Image
                    src="https://landing-pages.ted.com/tedx-logo-generator/assets/logo.png"
                    alt="TEDx"
                    width={60}
                    height={24}
                    className="w-auto h-5 md:h-6 ted-logo-red"
                  />
                </div>
                <span className="text-white font-bold text-2xl tracking-tight">×</span>
                <span className="text-white font-extrabold tracking-tight text-[1.5rem] md:text-[1.85rem]">
                  IMT
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <span className="text-white/45 text-[0.65rem] font-semibold uppercase tracking-[0.18em]">
                  in partnership with
                </span>
                <Image
                  src="https://eulist.university/wp-content/themes/eulist/images/logo-new.png"
                  alt="EULiST"
                  width={80}
                  height={40}
                  className="w-auto h-6 opacity-90"
                />
              </div>
              <span className="text-[#e62b1e] text-xs font-semibold tracking-[0.25em] uppercase">
                Paris 2027
              </span>
            </div>

            <div className="text-center max-w-md">
              <p className="font-semibold text-lg md:text-xl text-white tracking-tight">
                A TEDx × IMT collaboration
              </p>
              <p className="text-white/50 text-sm mt-2">with the support of EULiST</p>
              <p className="text-xs mt-4 text-white/35 tracking-wide">
                © 2026 TEDx × IMT — All rights reserved
              </p>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-white/45 text-xs md:text-sm justify-center lg:justify-end max-w-md">
              {[
                ['TEDx', 'https://www.ted.com/about/programs-initiatives/tedx-program'],
                ['IMT', 'https://www.imt.fr/'],
                ['EULiST', 'https://eulist.university/'],
                ['EU', 'https://europa.eu/'],
                ['Union IMT', 'https://www.union-eleves-imt.org/'],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#e62b1e] transition-colors duration-200 underline-offset-4 hover:underline"
                >
                  {label}
                </a>
              ))}
              <Link href="/contact" className="hover:text-[#e62b1e] transition-colors duration-200">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </ScrollReveal>
  );
}
