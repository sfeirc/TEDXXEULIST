'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="relative z-20 px-4 md:px-6 py-3 md:py-4 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            {/* TEDx Badge - white logo (Inter-style match) */}
            <div className="transition-opacity duration-200 hover:opacity-90 flex items-center">
              <Image 
                src="https://landing-pages.ted.com/tedx-logo-generator/assets/logo.png" 
                alt="TEDx" 
                width={80} 
                height={30}
                className="w-auto h-6 md:h-7 ted-logo-red"
              />
            </div>
            <span className="text-white font-bold text-2xl md:text-3xl leading-none tracking-tight">×</span>
            {/* IMT – larger, matches TEDx logo prominence */}
            <span className="text-white font-bold tracking-tight leading-none text-[1.75rem] md:text-[2.25rem]">IMT</span>
            {/* Partnership indicator with EULIST */}
            <div className="hidden lg:flex items-center gap-2 ml-2 px-3 py-1.5 rounded-full border border-white/20">
              <span className="text-white/70 text-xs font-medium">in partnership with</span>
              <div className="transition-all hover:opacity-90">
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
          <span className="text-white font-semibold text-sm md:text-lg hidden sm:block ml-2">Paris 2026</span>
        </Link>

        {/* Desktop Menu – Montmartre: letter-spacing, smooth underline */}
        <div className="hidden md:flex space-x-8">
          <Link href="/about" className="text-white/80 hover:text-white transition-colors duration-200 relative group tracking-wide text-[0.9375rem] uppercase">À Propos<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e62b1e] transition-[width] duration-200 group-hover:w-full"></span></Link>
          <Link href="/team" className="text-white/80 hover:text-white transition-colors duration-200 relative group tracking-wide text-[0.9375rem] uppercase">Équipe<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e62b1e] transition-[width] duration-200 group-hover:w-full"></span></Link>
          <Link href="/speakers" className="text-white/80 hover:text-white transition-colors duration-200 relative group tracking-wide text-[0.9375rem] uppercase">Conférenciers<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e62b1e] transition-[width] duration-200 group-hover:w-full"></span></Link>
          <Link href="/practical-info" className="text-white/80 hover:text-white transition-colors duration-200 relative group tracking-wide text-[0.9375rem] uppercase">Infos<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e62b1e] transition-[width] duration-200 group-hover:w-full"></span></Link>
          <Link href="/partners" className="text-white/80 hover:text-white transition-colors duration-200 relative group tracking-wide text-[0.9375rem] uppercase">Partenaires<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e62b1e] transition-[width] duration-200 group-hover:w-full"></span></Link>
          <Link href="/contact" className="text-white/80 hover:text-white transition-colors duration-200 relative group tracking-wide text-[0.9375rem] uppercase">Contact<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e62b1e] transition-[width] duration-200 group-hover:w-full"></span></Link>
        </div>

        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass border-b border-white/10 animate-fade-in">
          <div className="flex flex-col space-y-4 p-6">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white py-2 border-b border-white/10">À Propos</Link>
            <Link href="/team" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white py-2 border-b border-white/10">Équipe</Link>
            <Link href="/speakers" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white py-2 border-b border-white/10">Conférenciers</Link>
            <Link href="/practical-info" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white py-2 border-b border-white/10">Infos Pratiques</Link>
            <Link href="/partners" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white py-2 border-b border-white/10">Partenaires</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white py-2">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
