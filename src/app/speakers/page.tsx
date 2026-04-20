import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, Mic, Calendar, ExternalLink } from 'lucide-react';

export default function Speakers() {
  return (
    <div className="min-h-screen relative overflow-hidden font-inter">
      <Navigation />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <Link href="/" className="back-link">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <p className="page-eyebrow mb-4">Line-up</p>
          <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight">Speakers</h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Exceptional voices for TEDx IMT — announced here first.
          </p>
        </div>

        <section className="mb-16">
          <div className="nuclear-card rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[120%] h-48 bg-[#e62b1e]/10 blur-3xl pointer-events-none" aria-hidden />
            <div className="relative">
              <div className="w-28 h-28 bg-[#e62b1e]/15 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#e62b1e]/40 shadow-[0_0_60px_-15px_rgba(230,43,30,0.55)]">
                <Mic className="w-14 h-14 text-[#e62b1e]" />
              </div>
              <h2 className="font-bold text-3xl md:text-5xl text-white mb-4">Coming soon</h2>
              <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
                Speaker announcements will appear on this page — watch this space.
              </p>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#e62b1e]/35 bg-black/40 text-white/90">
                <Calendar className="w-5 h-5 text-[#e62b1e]" />
                <span className="text-sm font-semibold tracking-wide">February 2027</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="nuclear-card rounded-3xl p-8 md:p-10">
            <div className="text-center mb-10">
              <h2 className="font-bold text-2xl md:text-4xl text-white mb-4">Apply to speak</h2>
              <p className="text-lg text-white/75 max-w-3xl mx-auto leading-relaxed">
                Interested in the red circle? Here is what we look for and what we offer speakers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="rounded-2xl border border-[#e62b1e]/15 bg-black/35 p-6">
                <h3 className="text-xl font-bold text-white mb-4">What we look for</h3>
                <ul className="space-y-3 text-white/80 text-sm leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#e62b1e] shadow-[0_0_8px_rgba(230,43,30,0.8)]" />
                    <span>Lorem ipsum dolor sit amet consectetur adipiscing elit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#e62b1e] shadow-[0_0_8px_rgba(230,43,30,0.8)]" />
                    <span>Sed do eiusmod tempor incididunt ut labore</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#e62b1e] shadow-[0_0_8px_rgba(230,43,30,0.8)]" />
                    <span>Ut enim ad minim veniam quis nostrud</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/35 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Benefits</h3>
                <ul className="space-y-3 text-white/80 text-sm leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-white/80" />
                    <span>Duis aute irure dolor in reprehenderit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-white/80" />
                    <span>Excepteur sint occaecat cupidatat non proident</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-white/80" />
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
                className="btn-nuclear-primary inline-flex items-center gap-2 px-10 py-4 rounded-full text-base"
              >
                <ExternalLink className="w-5 h-5" />
                Apply as a speaker
              </a>
            </div>
          </div>
        </section>

        <div className="text-center mb-12">
          <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">Full line-up: posted here when ready.</p>
        </div>

        <div className="text-center">
          <Link href="/contact" className="btn-nuclear-ghost inline-flex items-center gap-2 px-10 py-4 rounded-full text-base">
            Questions?
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
