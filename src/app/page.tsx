'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Calendar, Users, Handshake, Zap } from 'lucide-react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
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
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden font-inter">
      <Navigation />

      <main className="relative z-10">
        <section className="min-h-[88vh] flex flex-col justify-center px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-6xl mx-auto w-full text-center">
            <div className="mb-8 md:mb-10 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#e62b1e]/30 bg-black/50 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/70 shadow-[0_0_40px_-12px_rgba(230,43,30,0.45)]">
                <Zap className="h-3.5 w-3.5 text-[#e62b1e]" aria-hidden />
                TEDx · engineering connection
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 md:gap-14 mb-12 md:mb-16 flex-wrap">
              <a
                href="https://www.ted.com/about/programs-initiatives/tedx-program"
                target="_blank"
                rel="noopener noreferrer"
                className="animate-slide-in-left delay-200 flex items-center drop-shadow-[0_0_28px_rgba(230,43,30,0.25)]"
              >
                <Image
                  src="https://landing-pages.ted.com/tedx-logo-generator/assets/logo.png"
                  alt="TEDx"
                  width={260}
                  height={84}
                  className="w-auto h-16 md:h-24 ted-logo-red"
                  priority
                />
              </a>
              <span className="font-display text-5xl md:text-8xl font-extrabold text-white/90 leading-none select-none">
                ×
              </span>
              <a
                href="https://www.imt.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="animate-slide-in-right delay-200 flex items-center"
              >
                <span
                  className="font-display font-extrabold text-white tracking-tight leading-none text-[4rem] md:text-[7.5rem] bg-gradient-to-b from-white via-white to-white/75 bg-clip-text text-transparent"
                  style={{ letterSpacing: '-0.04em' }}
                >
                  IMT
                </span>
              </a>
            </div>

            <div className="flex justify-center mb-10 md:mb-12 animate-fade-in delay-400">
              <div className="rounded-full border border-[#e62b1e]/25 bg-gradient-to-r from-black/80 via-black/40 to-black/80 px-6 py-3 flex items-center gap-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <span className="text-white/50 text-[0.65rem] md:text-xs tracking-[0.2em] uppercase font-semibold">
                  in partnership with
                </span>
                <a href="https://eulist.university/" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="https://eulist.university/wp-content/themes/eulist/images/logo-new.png"
                    alt="EULiST"
                    width={120}
                    height={48}
                    className="w-auto h-6 md:h-8 opacity-95"
                  />
                </a>
              </div>
            </div>

            <h1
              className="font-display font-extrabold tracking-tight leading-[1.05] mb-6 md:mb-8 animate-fade-in-up delay-400 hero-title-line"
              style={{ fontSize: 'clamp(2rem, 5vw + 0.5rem, 4rem)' }}
            >
              <span className="block text-white">What connects us</span>
              <span className="mt-3 md:mt-4 block bg-gradient-to-r from-white via-red-100 to-[#e62b1e] bg-clip-text text-transparent">
                Exploring human connection
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/65 max-w-2xl mx-auto mb-10 md:mb-11 animate-fade-in delay-500 leading-relaxed">
              Against fragmentation — rebuilding connection.
            </p>

            <p className="text-[#e62b1e]/90 text-xs md:text-sm font-semibold tracking-[0.35em] uppercase mb-12 md:mb-14 animate-fade-in delay-500">
              February 2027 · Théâtre Mogador
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-500">
              <Link
                href="/about"
                className="btn-nuclear-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-base"
              >
                <Users className="w-5 h-5" />
                About the 2026 edition
              </Link>
              <Link
                href="/contact"
                className="btn-nuclear-dark w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-base"
              >
                <Calendar className="w-5 h-5" />
                Get involved
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-28 text-center">
          <p className="page-eyebrow mb-4">Experience</p>
          <h2 className="font-bold text-3xl md:text-5xl text-white mb-6 md:mb-8 tracking-tight">
            An evening of inspiring talks
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-14 md:mb-20">
            This year, TEDx IMT Paris is built around{' '}
            <strong className="text-white font-semibold">What connects us</strong> — exploring how we rebuild human
            connection in a fragmented world.
          </p>

          <div className="mb-14 md:mb-20">
            <div className="nuclear-card rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-8">
                <span className="h-px flex-1 max-w-[4rem] bg-gradient-to-r from-transparent to-[#e62b1e]/50" />
                <h3 className="text-sm md:text-base text-white/80 font-semibold tracking-[0.28em] uppercase">
                  Countdown
                </h3>
                <span className="h-px flex-1 max-w-[4rem] bg-gradient-to-l from-transparent to-[#e62b1e]/50" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                {[
                  { value: timeLeft.days, label: 'Days' },
                  { value: timeLeft.hours, label: 'Hours' },
                  { value: timeLeft.minutes, label: 'Minutes' },
                  { value: timeLeft.seconds, label: 'Seconds' },
                ].map((item, i) => (
                  <div key={i} className="countdown-cell text-center p-6 md:p-8 card-hover">
                    <div
                      className="text-3xl md:text-5xl font-bold tabular-nums bg-gradient-to-b from-[#ff6b5e] to-[#e62b1e] bg-clip-text text-transparent"
                      style={{ textShadow: '0 0 40px rgba(230,43,30,0.15)' }}
                    >
                      {item.value}
                    </div>
                    <div className="text-white/45 text-[0.65rem] md:text-xs mt-3 uppercase tracking-[0.2em] font-semibold">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/partners"
            className="btn-nuclear-ghost inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-base"
          >
            <Handshake className="w-5 h-5" />
            Become a partner
          </Link>
        </section>

        <section className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="relative nuclear-card rounded-3xl p-6 md:p-14 overflow-hidden">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#e62b1e]/15 blur-3xl pointer-events-none" aria-hidden />
            <div className="relative space-y-10 md:space-y-12">
              <div className="text-center">
                <h2 className="font-bold text-2xl md:text-4xl text-white mb-4 tracking-tight">What connects us</h2>
                <p className="text-lg md:text-xl text-white/75 max-w-3xl mx-auto leading-relaxed">
                  We explore how to rebuild human connection in a fragmented world — from public space and local
                  communities to science, cooperation, and shared stories.
                </p>
              </div>
              <div className="rounded-2xl p-6 md:p-9 border border-white/8 bg-gradient-to-br from-white/[0.04] to-transparent card-hover">
                <h4 className="text-xl md:text-2xl font-bold text-white mb-4">Context &amp; stakes</h4>
                <p className="text-white/75 leading-relaxed mb-4">
                  Geopolitical, ecological, and economic crises pile up; the endless stream of bad news is exhausting.
                  Information fatigue sometimes pushes us toward disengagement.
                </p>
                <p className="text-white/75 leading-relaxed">
                  The world feels ever more complex, absurd, and dehumanizing as crises stack. It becomes harder to see
                  why they emerge — or how they compound.
                </p>
              </div>
              <div className="rounded-2xl p-6 md:p-9 border border-white/8 bg-gradient-to-br from-white/[0.04] to-transparent card-hover">
                <h4 className="text-xl md:text-2xl font-bold text-white mb-4">We need a shift in perspective</h4>
                <p className="text-white/75 leading-relaxed mb-4">
                  At our own scale, how can we truly change things? How do we widen our lens beyond constant decay and
                  notice the openings still available to us?
                </p>
                <p className="text-white/75 leading-relaxed">
                  How do we surface hope, simplicity, and humanity inside an overwhelming moment?
                </p>
              </div>
              <div className="rounded-2xl p-6 md:p-9 border border-white/8 bg-gradient-to-br from-white/[0.04] to-transparent card-hover">
                <h4 className="text-xl md:text-2xl font-bold text-white mb-4">Fragmented ties</h4>
                <p className="text-white/75 leading-relaxed">
                  Beyond the big crises, it is everyday life that slowly frays the threads between us.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="nuclear-card rounded-3xl p-6 md:p-10">
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-left card-hover p-6 rounded-2xl border border-white/10 bg-black/30">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="https://landing-pages.ted.com/tedx-logo-generator/assets/logo.png"
                    alt="TEDx"
                    width={64}
                    height={26}
                    className="w-auto h-5 ted-logo-red"
                  />
                  <h3 className="text-white font-bold text-lg">TEDx</h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  TEDx events are independent gatherings created in the spirit of TED — bringing curious people together
                  around ideas that inspire, challenge, and move us toward a better future.
                </p>
              </div>
              <div className="text-left card-hover p-6 rounded-2xl border border-white/10 bg-black/30">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-bold text-white text-2xl md:text-3xl tracking-tight" style={{ letterSpacing: '-0.03em' }}>
                    IMT
                  </span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  IMT unites leading engineering schools across France, training tomorrow&apos;s engineers on the issues
                  that matter. The group is a powerful source of ideas for evolving society.
                </p>
              </div>
              <div className="text-left card-hover p-6 rounded-2xl border border-white/10 bg-black/30">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="https://eulist.university/wp-content/themes/eulist/images/logo-new.png"
                    alt="EULiST"
                    width={96}
                    height={48}
                    className="w-auto h-8"
                  />
                  <h3 className="text-white font-bold text-lg">EULiST</h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  EULiST brings European universities together to strengthen cooperation in education and research.
                </p>
              </div>
            </div>
            <div className="relative mt-10 pt-8 border-t border-white/10 text-center">
              <p className="font-bold text-white text-lg">Together for European innovation</p>
              <p className="text-white/50 text-sm mt-2 tracking-wide">Let&apos;s redefine and prepare tomorrow&apos;s world</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
