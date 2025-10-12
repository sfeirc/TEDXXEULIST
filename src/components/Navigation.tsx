import Link from 'next/link';

interface NavigationProps {
  currentPage?: string;
}

export default function Navigation({ currentPage }: NavigationProps) {
  const isActive = (page: string) => currentPage === page;

  return (
    <>
      {/* TEDx x EULiST Branding Banner */}
      <div className="bg-gradient-to-r from-red-600 via-slate-800 to-blue-600 py-2 text-center border-b border-white/10">
        <div className="flex items-center justify-center gap-3 text-sm">
          <span className="text-white font-semibold">Une collaboration</span>
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white px-3 py-1 rounded font-bold text-xs">TEDx</span>
            <span className="text-white">×</span>
            <span className="bg-blue-600 text-white px-3 py-1 rounded font-bold text-xs">EULiST</span>
          </div>
        </div>
      </div>

      <nav className="bg-white/5 backdrop-blur-sm border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {/* TEDx Badge */}
              <div className="bg-red-600 text-white px-3 py-1.5 rounded-md font-bold text-lg">
                TEDx
              </div>
              <span className="text-white font-bold text-2xl">×</span>
              {/* EULiST Badge */}
              <div className="bg-blue-600 text-white px-3 py-1.5 rounded-md font-bold text-lg">
                EULiST
              </div>
            </div>
            <span className="text-white font-semibold text-lg hidden md:block">Paris 2026</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/about" 
              className={`transition-colors ${isActive('about') ? 'text-red-400 font-medium' : 'text-gray-300 hover:text-red-400'}`}
            >
              À Propos
            </Link>
            <Link 
              href="/team" 
              className={`transition-colors ${isActive('team') ? 'text-blue-400 font-medium' : 'text-gray-300 hover:text-blue-400'}`}
            >
              Équipe
            </Link>
            <Link 
              href="/speakers" 
              className={`transition-colors ${isActive('speakers') ? 'text-red-400 font-medium' : 'text-gray-300 hover:text-red-400'}`}
            >
              Conférenciers
            </Link>
            <Link 
              href="/practical-info" 
              className={`transition-colors ${isActive('info') ? 'text-blue-400 font-medium' : 'text-gray-300 hover:text-blue-400'}`}
            >
              Infos
            </Link>
            <Link 
              href="/partners" 
              className={`transition-colors ${isActive('partners') ? 'text-red-400 font-medium' : 'text-gray-300 hover:text-red-400'}`}
            >
              Partenaires
            </Link>
            <Link 
              href="/contact" 
              className={`transition-colors ${isActive('contact') ? 'text-blue-400 font-medium' : 'text-gray-300 hover:text-blue-400'}`}
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
