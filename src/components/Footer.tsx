import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/10 bg-black/80 backdrop-blur-sm overflow-hidden">
      {/* Gradient Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-blue-600"></div>
      
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
            <p className="text-white font-semibold flex items-center justify-center gap-2">
              <span>Une collaboration entre TEDx et le réseau EULiST</span>
            </p>
            {/* EU Flag Badge */}
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="relative group">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600/30 to-blue-700/30 border border-yellow-400/30 backdrop-blur-sm transition-all duration-300 group-hover:border-yellow-400/50 group-hover:shadow-lg group-hover:shadow-yellow-400/20">
                  {/* EU Flag Circle of Stars */}
                  <div className="relative w-5 h-5">
                    {[
                      { x: 50, y: 15 },
                      { x: 67.5, y: 19.69 },
                      { x: 80.31, y: 32.5 },
                      { x: 85, y: 50 },
                      { x: 80.31, y: 67.5 },
                      { x: 67.5, y: 80.31 },
                      { x: 50, y: 85 },
                      { x: 32.5, y: 80.31 },
                      { x: 19.69, y: 67.5 },
                      { x: 15, y: 50 },
                      { x: 19.69, y: 32.5 },
                      { x: 32.5, y: 19.69 },
                    ].map((pos, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-yellow-400"
                        style={{
                          left: `${pos.x}%`,
                          top: `${pos.y}%`,
                          transform: 'translate(-50%, -50%)',
                          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-yellow-200/90">European Union</span>
                </div>
              </div>
            </div>
            <p className="text-xs mt-2">© 2026 TEDxEULiSTParis - Tous droits réservés</p>
          </div>
          
          <div className="flex flex-wrap gap-3 md:gap-4 text-gray-400 text-xs md:text-sm justify-center md:justify-end">
            <a href="https://www.ted.com/about/programs-initiatives/tedx-program" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors relative group">
              TEDx
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
            </a>
            <a href="https://eulist.university/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors relative group">
              EULiST
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </a>
            <a href="https://europa.eu/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors relative group">
              EU
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="https://www.imt.fr/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors relative group">
              IMT
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-300 transition-all group-hover:w-full"></span>
            </a>
            <a href="https://www.union-eleves-imt.org/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors relative group whitespace-nowrap">
              Union IMT
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-300 transition-all group-hover:w-full"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

