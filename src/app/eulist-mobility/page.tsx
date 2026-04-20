'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, Lock, ExternalLink, GraduationCap, Sparkles } from 'lucide-react';
import { isMobilityUnlockedAt } from './mobility';

const FORM_URL =
  process.env.NEXT_PUBLIC_EULIST_MOBILITY_FORM_URL ?? 'https://forms.google.com/eulist-mobility';

function useMobilityUnlocked() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const tick = () => setUnlocked(isMobilityUnlockedAt(Date.now()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return unlocked;
}

export default function EulistMobilityPage() {
  const unlocked = useMobilityUnlocked();

  return (
    <div className="min-h-screen relative overflow-hidden font-inter">
      <Navigation />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <Link href="/" className="back-link">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>

      <main className="relative z-10 max-w-3xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <p className="page-eyebrow mb-4">EULiST</p>
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight">
            EULiST mobility
          </h1>
          <p className="text-lg text-white/70 leading-relaxed">
            Register your interest in mobility activities linked to the EULiST university network. One short form —
            school, interests, and how you would like to take part.
          </p>
        </div>

        <div className="nuclear-card rounded-3xl p-8 md:p-10 mb-10">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-[#e62b1e] shrink-0" />
            What the form is for
          </h2>
          <p className="text-white/75 text-sm leading-relaxed mb-4">
            When registration opens, you will use a single button below to open the official form. You will be asked for
            details such as your <strong className="text-white">school / institution</strong>, your{' '}
            <strong className="text-white">areas of interest</strong>, and other fields so we can match you with the
            right opportunities within EULiST mobility.
          </p>
          <p className="text-white/75 text-sm leading-relaxed flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#e62b1e] shrink-0 mt-0.5" />
            The link is intentionally inactive until the registration window — see the status below.
          </p>
        </div>

        <div className="nuclear-card rounded-3xl p-8 md:p-10 text-center">
          {!unlocked ? (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#e62b1e]/35 bg-[#e62b1e]/10 mb-6 mx-auto">
                <Lock className="w-8 h-8 text-[#e62b1e]" aria-hidden />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Registration is closed</h2>
              <p className="text-white/65 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                The mobility form unlocks in <strong className="text-white">October 2026</strong>. After that date,
                the button below will take you to the form to complete.
              </p>
              <button
                type="button"
                disabled
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-base font-semibold bg-white/10 text-white/40 border border-white/10 cursor-not-allowed w-full sm:w-auto"
              >
                <Lock className="w-5 h-5" />
                Open form (from October 2026)
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-white mb-2">Registration is open</h2>
              <p className="text-white/65 text-sm mb-8 max-w-md mx-auto leading-relaxed">
                Click the button to open the form in a new tab. Fill in your school, interests, and any other required
                fields.
              </p>
              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-nuclear-primary inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-base w-full sm:w-auto"
              >
                <ExternalLink className="w-5 h-5" />
                Open mobility form
              </a>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
