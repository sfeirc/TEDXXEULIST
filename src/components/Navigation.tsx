'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="relative z-20 px-4 md:px-6 py-3 md:py-4 bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            {/* TEDx Badge */}
            <div className="transition-all hover:scale-105 drop-shadow-lg">
              <Image 
                src="https://landing-pages.ted.com/tedx-logo-generator/assets/logo.png" 
                alt="TEDx" 
                width={80} 
                height={30}
                className="w-auto h-5 md:h-6"
              />
            </div>
            <span className="text-white font-bold text-lg md:text-xl">×</span>
            {/* IMT Badge */}
            <div className="transition-all hover:scale-105 drop-shadow-lg">
              <Image 
                src="https://upload.wikimedia.org/wikipedia/commons/b/b0/IMT_logo_2017.png" 
                alt="IMT" 
                width={100} 
                height={40}
                className="w-auto h-7 md:h-9"
              />
            </div>
            {/* Partnership indicator with EULIST */}
            <div className="hidden lg:flex items-center gap-2 ml-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-400/20">
              <span className="text-blue-300 text-xs font-medium">in partnership with</span>
              <div className="transition-all hover:scale-105">
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

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link href="/about" className="text-gray-300 hover:text-red-400 transition-all relative group">
            À Propos
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/team" className="text-gray-300 hover:text-blue-400 transition-all relative group">
            Équipe
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/speakers" className="text-gray-300 hover:text-red-400 transition-all relative group">
            Conférenciers
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/practical-info" className="text-gray-300 hover:text-blue-400 transition-all relative group">
            Infos
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/partners" className="text-gray-300 hover:text-red-400 transition-all relative group">
            Partenaires
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-all relative group">
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-white/10 animate-fade-in shadow-2xl">
          <div className="flex flex-col space-y-4 p-6">
            <Link 
              href="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-red-400 transition-all py-2 border-b border-gray-800"
            >
              À Propos
            </Link>
            <Link 
              href="/team" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-blue-400 transition-all py-2 border-b border-gray-800"
            >
              Équipe
            </Link>
            <Link 
              href="/speakers" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-red-400 transition-all py-2 border-b border-gray-800"
            >
              Conférenciers
            </Link>
            <Link 
              href="/practical-info" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-blue-400 transition-all py-2 border-b border-gray-800"
            >
              Infos Pratiques
            </Link>
            <Link 
              href="/partners" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-red-400 transition-all py-2 border-b border-gray-800"
            >
              Partenaires
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-blue-400 transition-all py-2"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
