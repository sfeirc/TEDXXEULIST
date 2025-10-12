import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { ArrowLeft, Mic, Calendar, ExternalLink } from 'lucide-react';

export default function Speakers() {
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

      <Navigation />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Conférenciers</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
          </p>
        </div>

        <section className="mb-16">
          <div className="bg-gradient-to-br from-red-500/10 via-blue-500/10 to-slate-800/50 rounded-2xl p-12 text-center border border-white/10">
            <div className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-400/30">
              <Mic className="w-12 h-12 text-blue-400" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Bientôt Annoncés</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus suspendisse lectus tortor, 
              dignissim sit amet adipiscing nec ultricies sed dolor.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full border border-blue-400/30">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span className="text-gray-200">Automne 2026</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-gradient-to-br from-blue-500/10 to-slate-800/50 rounded-2xl border border-blue-400/20 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Candidature Conférencier</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Ce Que Nous Recherchons</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Lorem ipsum dolor sit amet consectetur adipiscing elit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Sed do eiusmod tempor incididunt ut labore</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Ut enim ad minim veniam quis nostrud</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Avantages</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Duis aute irure dolor in reprehenderit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Excepteur sint occaecat cupidatat non proident</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Sunt in culpa qui officia deserunt mollit</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <a 
                href="https://forms.google.com/speaker-application"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-red-700 hover:to-red-600 transition-all shadow-lg shadow-red-500/30"
              >
                <ExternalLink className="w-5 h-5" />
                Postuler comme Conférencier
              </a>
            </div>
          </div>
        </section>

        <div className="text-center">
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all"
          >
            Des Questions?
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </div>
      </main>
    </div>
  );
}