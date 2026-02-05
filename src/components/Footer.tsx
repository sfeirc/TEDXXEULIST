import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/10 bg-black/90 backdrop-blur-sm overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#e62b1e]"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="transition-opacity duration-200 hover:opacity-90">
                <Image src="https://landing-pages.ted.com/tedx-logo-generator/assets/logo.png" alt="TEDx" width={60} height={24} className="w-auto h-5 md:h-6 ted-logo-red" />
              </div>
              <span className="text-white font-bold text-2xl tracking-tight">×</span>
              <span className="text-white font-bold tracking-tight text-[1.5rem] md:text-[1.75rem]">IMT</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-xs">in partnership with</span>
              <div className="transition-opacity hover:opacity-90">
                <Image src="https://eulist.university/wp-content/themes/eulist/images/logo-new.png" alt="EULiST" width={80} height={40} className="w-auto h-6" />
              </div>
            </div>
            <span className="text-white/60 text-xs">Paris 2026</span>
          </div>
          
          <div className="text-white/70 text-sm text-center">
            <p className="text-white font-semibold">Une collaboration TEDx × IMT</p>
            <p className="text-white/60 text-xs mt-1">avec le soutien d'EULiST</p>
            <p className="text-xs mt-2 text-white/50">© 2026 TEDx × IMT - Tous droits réservés</p>
          </div>
          
          <div className="flex flex-wrap gap-3 md:gap-4 text-white/60 text-xs md:text-sm justify-center md:justify-end">
            <a href="https://www.ted.com/about/programs-initiatives/tedx-program" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TEDx</a>
            <a href="https://www.imt.fr/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">IMT</a>
            <a href="https://eulist.university/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">EULiST</a>
            <a href="https://europa.eu/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">EU</a>
            <a href="https://www.union-eleves-imt.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors whitespace-nowrap">Union IMT</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

