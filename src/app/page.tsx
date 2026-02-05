'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Calendar, MapPin, Users, Handshake } from 'lucide-react';

export default function Home() {
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[32rem] h-[32rem] bg-[#e62b1e]/[0.07] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[32rem] h-[32rem] bg-[#e62b1e]/[0.05] rounded-full blur-3xl"></div>
      </div>

      <Navigation />

      {/* Hero – Outstanding Montmartre-style: big logo block + two-line statement + date/venue + CTAs */}
      <main className="relative z-10">
        <section className="min-h-[85vh] flex flex-col justify-center px-4 md:px-8 py-20 md:py-28">
          <div className="max-w-6xl mx-auto w-full text-center">
            {/* Logo block: TEDx × IMT – IMT larger for strong presence */}
            <div className="flex items-center justify-center gap-6 md:gap-12 mb-12 md:mb-16 flex-wrap">
              <a href="https://www.ted.com/about/programs-initiatives/tedx-program" target="_blank" rel="noopener noreferrer" className="animate-slide-in-left delay-200 flex items-center">
                <Image
                  src="https://landing-pages.ted.com/tedx-logo-generator/assets/logo.png"
                  alt="TEDx"
                  width={260}
                  height={84}
                  className="w-auto h-16 md:h-24 ted-logo-red"
                  priority
                />
              </a>
              <span className="text-5xl md:text-7xl font-bold text-white leading-none tracking-tight select-none">×</span>
              <a href="https://www.imt.fr/" target="_blank" rel="noopener noreferrer" className="animate-slide-in-right delay-200 flex items-center">
                <span className="font-bold text-white tracking-tight leading-none text-[4rem] md:text-[7rem]" style={{ letterSpacing: '-0.04em' }}>IMT</span>
              </a>
            </div>
            <div className="flex justify-center mb-10 animate-fade-in delay-400">
              <div className="px-5 py-2.5 rounded-full border border-white/15 flex items-center gap-3 bg-white/[0.02]">
                <span className="text-white/70 text-xs md:text-sm tracking-[0.12em] uppercase">in partnership with</span>
                <a href="https://eulist.university/" target="_blank" rel="noopener noreferrer">
                  <Image src="https://eulist.university/wp-content/themes/eulist/images/logo-new.png" alt="EULiST" width={120} height={48} className="w-auto h-6 md:h-8 opacity-90" />
                </a>
              </div>
            </div>

            {/* Two-line statement – Montmartre "ET SI ON CHANGEAIT NOTRE / FAÇON DE VOIR LE MONDE ?" style */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1] mb-6 md:mb-8 animate-fade-in-up delay-400" style={{ letterSpacing: '-0.02em' }}>
              <span className="block">Ce qui nous relie</span>
              <span className="block mt-1 md:mt-2 text-white/95">Explorer le lien humain</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 md:mb-12 animate-fade-in delay-500 leading-relaxed">
              Face à la fragmentation, recréer du lien.
            </p>

            {/* Date & venue – single line like Montmartre */}
            <p className="text-white/80 text-sm md:text-base tracking-wide mb-10 md:mb-14 animate-fade-in delay-500">
              Automne 2026 · Télécom Paris
            </p>

            {/* Primary CTAs – Montmartre: "Découvrez l'édition 2025" / "Achetez un billet" */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-500">
              <Link
                href="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#e62b1e] text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-[#c92419] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Users className="w-5 h-5" />
                Découvrir l&apos;édition 2026
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold text-base hover:bg-white/95 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Calendar className="w-5 h-5" />
                Participer
              </Link>
            </div>
          </div>
        </section>

        {/* Section: Vivez une soirée... – Montmartre-style */}
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-6 md:mb-8 tracking-tight">
            Vivez une soirée de conférences inspirantes
          </h2>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-14 md:mb-20">
            Cette année, TEDx IMT Paris s&apos;articule autour du thème <strong className="text-white">Ce qui nous relie</strong> — explorer comment recréer du lien humain face à la fragmentation.
          </p>

          {/* Countdown */}
          <div className="mb-12 md:mb-16">
            <div className="glass rounded-2xl p-6 md:p-10 max-w-4xl mx-auto border border-white/10">
              <h3 className="text-lg md:text-xl text-white/90 mb-6 font-medium tracking-wide">Compte à rebours</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[
                  { value: timeLeft.days, label: 'Jours' },
                  { value: timeLeft.hours, label: 'Heures' },
                  { value: timeLeft.minutes, label: 'Minutes' },
                  { value: timeLeft.seconds, label: 'Secondes' },
                ].map((item, i) => (
                  <div key={i} className="text-center rounded-xl p-5 md:p-6 border border-white/10 card-hover bg-white/[0.04]">
                    <div className="text-3xl md:text-5xl font-bold text-[#e62b1e] tabular-nums">{item.value}</div>
                    <div className="text-white/50 text-xs md:text-sm mt-2 uppercase tracking-wider">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/partners"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white hover:text-black transition-all duration-200"
          >
            <Handshake className="w-5 h-5" />
            Devenir partenaire
          </Link>
        </section>

        {/* Theme Explanation – Montmartre editorial style */}
        <section className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="relative glass rounded-2xl p-6 md:p-12 border border-white/10 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#e62b1e] rounded-t-2xl" aria-hidden></div>
            <div className="relative space-y-10">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 tracking-tight">Ce qui nous relie</h2>
                  <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                    Permet d'explorer comment recréer du lien humain face à la fragmentation : un architecte peut parler d'espaces publics, un entrepreneur social de communautés locales, un scientifique de coopération, un artiste de récits collectifs...
                  </p>
                </div>
                <div className="rounded-xl p-6 md:p-8 border border-white/10 card-hover bg-white/5">
                  <h4 className="text-xl md:text-2xl font-semibold text-white mb-4">Contexte et enjeu</h4>
                  <p className="text-white/80 leading-relaxed mb-4">
                    Face à l'accumulation des crises géopolitiques, écologiques et économiques, nous sommes épuisés par le flot incessant de mauvaises nouvelles. Cette fatigue informationnelle nous pousse parfois au désengagement.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    Le monde devient de plus en plus complexe, absurde et déshumanisant à mesure que les crises se succèdent. Nous ne comprenons plus vraiment pourquoi elles apparaissent ni comment elles s'accumulent.
                  </p>
                </div>
                <div className="rounded-xl p-6 md:p-8 border border-white/10 card-hover bg-white/5">
                  <h4 className="text-xl md:text-2xl font-semibold text-white mb-4">Le besoin de changement de perspective</h4>
                  <p className="text-white/80 leading-relaxed mb-4">
                    Comment, à notre échelle, pouvons-nous réellement changer les choses ? Comment modifier notre regard pour ne plus voir uniquement une dégradation constante, mais aussi les opportunités qui s'offrent à nous ?
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    Comment faire ressortir l'espoir, la simplicité et l'humanité dans ce contexte oppressant ?
                  </p>
                </div>
                <div className="rounded-xl p-6 md:p-8 border border-white/10 card-hover bg-white/5">
                  <h4 className="text-xl md:text-2xl font-semibold text-white mb-4">La fragmentation des liens</h4>
                  <p className="text-white/80 leading-relaxed">
                    Au-delà des grandes crises, ce sont les événements du quotidien qui, progressivement, fragmentent les liens entre nous.
                  </p>
                </div>
              </div>
            </div>
        </section>

        {/* Collaboration – TEDx × IMT × EULiST */}
        <section className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
            <div className="relative glass rounded-2xl p-8 border border-white/10">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#e62b1e] rounded-t-2xl"></div>
              <div className="relative grid md:grid-cols-3 gap-6">
                <div className="text-left card-hover p-6 rounded-xl border border-white/10 bg-white/5">
                  <div className="flex items-center gap-3 mb-4">
                    <Image src="https://landing-pages.ted.com/tedx-logo-generator/assets/logo.png" alt="TEDx" width={64} height={26} className="w-auto h-5 ted-logo-red" />
                    <h3 className="text-white font-semibold text-lg">TEDx</h3>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    TEDx est un programme d'événements indépendants créés dans l'esprit de TED. Ils rassemblent des esprits curieux autour d'idées qui inspirent, questionnent et donnent envie d'agir pour un avenir meilleur.
                  </p>
                </div>
                <div className="text-left card-hover p-6 rounded-xl border border-white/10 bg-white/5">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-white font-bold text-2xl md:text-3xl tracking-tight" style={{ letterSpacing: '-0.03em' }}>IMT</span>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    IMT est une institution de prestige regroupant de nombreuses écoles sur le territoire français, elles forment de futurs ingénieurs aux problématiques et enjeux de demain. Le groupe IMT est une réelle source d'idées innovantes pour faire évoluer notre société.
                  </p>
                </div>
                <div className="text-left card-hover p-6 rounded-xl border border-white/10 bg-white/5">
                  <div className="flex items-center gap-3 mb-4">
                    <Image src="https://eulist.university/wp-content/themes/eulist/images/logo-new.png" alt="EULiST" width={96} height={48} className="w-auto h-8" />
                    <h3 className="text-white font-semibold text-lg">EULiST</h3>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    EULiST rassemble des universités européennes qui unissent leurs forces pour renforcer la coopération internationale dans l'enseignement et la recherche.
                  </p>
                </div>
              </div>
              <div className="relative mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-white font-semibold">Ensemble pour l&apos;innovation européenne</p>
                <p className="text-white/70 text-sm mt-2">Ensemble, redéfinissons et préparons le monde de demain</p>
              </div>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}