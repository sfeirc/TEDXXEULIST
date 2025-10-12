'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Users, Handshake, Star, Menu, X } from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-09-01T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black relative overflow-hidden">
      {/* Animated Background Orbs with Red-Blue Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-float delay-200"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-800 rounded-full"></div>
        
        {/* Gradient Lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600/20 to-transparent"></div>
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-blue-600/20 to-transparent"></div>
        </div>
      </div>


      {/* Navigation */}
      <nav className="relative z-20 px-4 md:px-6 py-3 md:py-4 glass border-b border-white/10 animate-fade-in delay-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-4">
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
              {/* EULiST Badge */}
              <div className="transition-all hover:scale-105 drop-shadow-lg">
                <Image 
                  src="https://eulist.university/wp-content/themes/eulist/images/logo-new.png" 
                  alt="EULiST" 
                  width={200} 
                  height={100}
                  className="w-auto h-10 md:h-12"
                />
              </div>
            </div>
            <span className="text-white font-semibold text-sm md:text-lg hidden sm:block">Paris 2026</span>
          </div>

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
          <div className="md:hidden absolute top-full left-0 right-0 glass border-b border-white/10 animate-fade-in">
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

      {/* Hero Section */}
      <main className="relative z-10 px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-7xl mx-auto text-center">
          {/* Dual Brand Logo with Visual Representations */}
          <div className="mb-6 md:mb-8">
            {/* TEDx x EULiST Combined Logo */}
            <div className="flex items-center justify-center gap-4 md:gap-12 mb-6 md:mb-8 flex-wrap">
              {/* TEDx Logo */}
              <div className="text-center animate-slide-in-left delay-200 group">
                <div className="relative">
                  {/* TEDx Visual Logo */}
                  <div className="relative transition-all duration-300 group-hover:scale-105">
        <Image
                      src="https://landing-pages.ted.com/tedx-logo-generator/assets/logo.png" 
                      alt="TEDx Logo" 
                      width={250} 
                      height={80}
                      className="w-auto h-16 md:h-20 drop-shadow-2xl"
          priority
        />
                  </div>
                  {/* Red Glow Effect */}
                  <div className="absolute inset-0 bg-red-600/30 blur-3xl -z-10 group-hover:bg-red-600/40"></div>
                </div>
                <div className="text-red-400 text-xs mt-4 font-semibold tracking-wider">Ideas Worth Spreading</div>
              </div>
              
              {/* Collaboration Symbol */}
              <div className="relative animate-scale-in delay-300">
                <div className="text-4xl md:text-6xl font-bold text-gray-500">
                  ×
                </div>
              </div>
              
              {/* EULiST Logo */}
              <div className="text-center animate-slide-in-right delay-200 group">
                <div className="relative">
                  {/* EULiST Visual Logo */}
                  <div className="relative transition-all duration-300 group-hover:scale-105">
            <Image
                      src="https://eulist.university/wp-content/themes/eulist/images/logo-new.png" 
                      alt="EULiST Logo" 
                      width={400} 
                      height={160}
                      className="w-auto h-24 md:h-32 drop-shadow-2xl"
                      priority
                    />
                  </div>
                  {/* Blue Glow Effect */}
                  <div className="absolute inset-0 bg-blue-600/30 blur-3xl -z-10 group-hover:bg-blue-600/40"></div>
                </div>
                <div className="text-blue-400 text-xs mt-4 font-semibold tracking-wider">European Universities</div>
              </div>
            </div>
            
            {/* Gradient Underline */}
            <div className="w-64 h-1 mx-auto mb-6 bg-gradient-to-r from-red-600 via-gray-700 to-blue-600 rounded-full"></div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 animate-fade-in-up delay-400">
              Paris 2026
            </h1>
            <div className="flex items-center justify-center gap-2 text-gray-400 animate-fade-in delay-500">
              <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span className="text-xs md:text-sm">Télécom Paris</span>
            </div>
          </div>

          {/* Theme Tagline */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-5xl font-light text-white mb-3 md:mb-4 px-2">
              Lorem Ipsum Dolor Sit Amet
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
            </p>
          </div>

          {/* Date & Venue */}
          <div className="mb-8 md:mb-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span className="text-lg text-gray-200">Automne 2026</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="text-lg text-gray-200">Télécom Paris</span>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="mb-10 md:mb-16 animate-fade-in-up delay-500">
            <div className="glass rounded-2xl p-4 md:p-8 max-w-4xl mx-auto border border-white/20 shadow-2xl">
              <h3 className="text-xl md:text-2xl text-white mb-4 md:mb-6 font-semibold">Compte à Rebours</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <div className="text-center bg-gradient-to-br from-red-500/10 to-blue-500/10 rounded-xl p-4 md:p-6 border border-white/10 card-hover">
                  <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">{timeLeft.days}</div>
                  <div className="text-gray-400 text-xs md:text-sm mt-2 font-medium">Jours</div>
                </div>
                <div className="text-center bg-gradient-to-br from-red-500/10 to-blue-500/10 rounded-xl p-4 md:p-6 border border-white/10 card-hover">
                  <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">{timeLeft.hours}</div>
                  <div className="text-gray-400 text-xs md:text-sm mt-2 font-medium">Heures</div>
                </div>
                <div className="text-center bg-gradient-to-br from-red-500/10 to-blue-500/10 rounded-xl p-4 md:p-6 border border-white/10 card-hover">
                  <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">{timeLeft.minutes}</div>
                  <div className="text-gray-400 text-xs md:text-sm mt-2 font-medium">Minutes</div>
                </div>
                <div className="text-center bg-gradient-to-br from-red-500/10 to-blue-500/10 rounded-xl p-4 md:p-6 border border-white/10 card-hover">
                  <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">{timeLeft.seconds}</div>
                  <div className="text-gray-400 text-xs md:text-sm mt-2 font-medium">Secondes</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center animate-fade-in-up delay-500 px-4">
            <Link 
              href="/about"
              className="btn-professional bg-gradient-to-r from-red-600 to-red-500 text-white w-full md:w-auto px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg hover:from-red-700 hover:to-red-600 transition-all shadow-2xl shadow-red-500/40 hover:shadow-red-500/60 hover:scale-105 flex items-center justify-center gap-3"
            >
              <Users className="w-5 h-5" />
              <span>Découvrir</span>
            </Link>
            <Link 
              href="/contact"
              className="btn-professional bg-gradient-to-r from-blue-600 to-blue-500 text-white w-full md:w-auto px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-105 flex items-center justify-center gap-3"
            >
              <Calendar className="w-5 h-5" />
              <span>Participer</span>
            </Link>
            <Link 
              href="/partners"
              className="btn-professional glass border-2 border-white/30 text-white w-full md:w-auto px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-white/20 hover:border-white/50 transition-all shadow-2xl hover:scale-105 flex items-center justify-center gap-3"
            >
              <Handshake className="w-5 h-5" />
              <span>Devenir Partenaire</span>
            </Link>
          </div>

          {/* Collaboration Explanation with Gradient */}
          <div className="mt-20 max-w-4xl mx-auto animate-fade-in-up">
            <div className="relative glass rounded-2xl p-8 border border-purple-500/20 overflow-hidden">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-purple-600/10 to-blue-600/5"></div>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"></div>
              
              <div className="relative grid md:grid-cols-2 gap-8">
                <div className="text-left card-hover p-6 rounded-xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="drop-shadow-lg">
                      <Image src="https://landing-pages.ted.com/tedx-logo-generator/assets/logo.png" alt="TEDx" width={80} height={32} className="w-auto h-6" />
                    </div>
                    <h3 className="text-white font-semibold text-lg">Ideas Worth Spreading</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus suspendisse lectus tortor dignissim sit amet adipiscing nec.
                  </p>
                </div>
                <div className="text-left card-hover p-6 rounded-xl bg-gradient-to-bl from-blue-500/10 to-transparent border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="drop-shadow-lg">
                      <Image src="https://eulist.university/wp-content/themes/eulist/images/logo-new.png" alt="EULiST" width={120} height={64} className="w-auto h-10" />
                    </div>
                    <h3 className="text-white font-semibold text-lg">European Universities</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure.
                  </p>
                </div>
              </div>
              <div className="relative mt-8 pt-6 border-t border-gradient-to-r from-red-500/20 via-purple-500/40 to-blue-500/20 text-center">
                <div className="inline-block px-6 py-3 rounded-full glass border border-purple-400/30 mb-4">
                  <p className="text-white font-semibold bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Ensemble pour l'innovation européenne
                  </p>
                </div>
                <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer with Both Brands and Gradient */}
      <footer className="relative z-10 mt-20 border-t border-white/10 bg-black/80 backdrop-blur-sm overflow-hidden">
        {/* Gradient Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-gray-800 to-blue-600"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="transition-transform hover:scale-105 drop-shadow-lg">
                  <Image src="https://landing-pages.ted.com/tedx-logo-generator/assets/logo.png" alt="TEDx" width={60} height={24} className="w-auto h-5" />
                </div>
                <span className="text-gray-400 font-bold">×</span>
                <div className="transition-transform hover:scale-105 drop-shadow-lg">
                  <Image src="https://eulist.university/wp-content/themes/eulist/images/logo-new.png" alt="EULiST" width={100} height={48} className="w-auto h-7" />
                </div>
              </div>
              <span className="text-gray-400 text-sm">Paris 2026</span>
            </div>
            <div className="text-gray-400 text-sm text-center">
              <p className="text-white font-semibold">
                Une collaboration entre TEDx et le réseau EULiST
              </p>
              <p className="text-xs mt-1">© 2026 TEDxEULiSTParis - Tous droits réservés</p>
            </div>
            <div className="flex gap-4 text-gray-400 text-sm">
              <a href="#" className="hover:text-red-500 transition-colors relative group">
                TEDx
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors relative group">
                EULiST
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors relative group">
                IMT
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-300 transition-all group-hover:w-full"></span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Geometric Patterns */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-blue-400/10 rounded-full"></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
    </div>
  );
}