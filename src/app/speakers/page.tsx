import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, Mic, Calendar, ExternalLink } from 'lucide-react';

export default function Speakers() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#e62b1e]/5 rounded-full blur-3xl"></div>
      </div>

      <Navigation />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Conférenciers</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-4">
            Pour donner vie à l'événement TEDx IMT, nous avons réuni des intervenants d'exception !
          </p>
        </div>

        <section className="mb-16">
          <div className="glass rounded-2xl p-12 text-center border border-white/10">
            <div className="w-24 h-24 bg-[#e62b1e]/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#e62b1e]/30">
              <Mic className="w-12 h-12 text-[#e62b1e]" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Bientôt Annoncés</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Vous retrouverez ici très prochainement les conférenciers qui prendront la parole lors de l'événement TEDx IMT
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20">
                <Calendar className="w-5 h-5 text-[#e62b1e]" />
                <span className="text-white">Automne 2026</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="glass rounded-2xl border border-white/10 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Candidature Conférencier</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-6">
                Vous êtes intéressé pour devenir conférencier de l'événement TEDX IMT ? Vous trouverez ci-dessous les points que nous recherchons ainsi que les différents avantages dont vous pourrez jouir en tant que conférencier.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Ce Que Nous Recherchons</h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#e62b1e] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Lorem ipsum dolor sit amet consectetur adipiscing elit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#e62b1e] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Sed do eiusmod tempor incididunt ut labore</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#e62b1e] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Ut enim ad minim veniam quis nostrud</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Avantages</h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span>Duis aute irure dolor in reprehenderit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span>Excepteur sint occaecat cupidatat non proident</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
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
                className="inline-flex items-center gap-2 bg-[#e62b1e] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#c92419] transition-all"
              >
                <ExternalLink className="w-5 h-5" />
                Postuler comme Conférencier
              </a>
            </div>
          </div>
        </section>

        <div className="text-center mb-16">
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Vous retrouverez ici très prochainement les conférenciers qui prendront la parole lors de l'événement TEDX IMT.
          </p>
        </div>

        <div className="text-center">
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all"
          >
            Des Questions?
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}