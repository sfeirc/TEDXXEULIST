'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, MapPin, Clock, Calendar, MessageCircle, FileDown, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  TiltCard,
  MagneticWrapper,
} from '@/components/MotionElements';

const EULIST_BOOKLET_PDF_URL =
  'https://drive.google.com/uc?export=download&id=1KmQnf5iN6_BQ5vlBWrdML4OF_Me78cRK';

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="border-b border-white/8 last:border-b-0 overflow-hidden"
      initial={false}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left py-6 flex items-center justify-between gap-4 group"
      >
        <h3 className="text-lg font-semibold text-white group-hover:text-[#e62b1e] transition-colors duration-200">
          {question}
        </h3>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#e62b1e] text-2xl font-light shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-[#e62b1e]/25"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-white/75 leading-relaxed pb-6">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PracticalInfo() {
  const faqs = [
    {
      question: 'Who is the event for?',
      answer:
        'Anyone curious about bold ideas — students, professionals, or first-timers. TEDx IMT is open to all.',
    },
    {
      question: 'How do I attend TEDx IMT?',
      answer:
        'Register online when tickets open. Seats are limited — sign up early.',
    },
    {
      question: 'How are speakers selected?',
      answer:
        'We look at topic relevance and originality, ability to inspire a live audience, and clarity of delivery — so every talk is memorable.',
    },
    {
      question: 'Will there be breaks or networking?',
      answer:
        'Yes. Networking runs from 6:15pm to 10:00pm so you can meet speakers and attendees. See the schedule on this page for timings.',
    },
  ];

  const schedule = [
    { time: '1:00pm – 2:00pm', event: 'Doors open & welcome' },
    { time: '2:00pm – 4:00pm', event: 'First talk session' },
    { time: '4:00pm – 4:30pm', event: 'Break & informal chat' },
    { time: '4:30pm – 6:00pm', event: 'Second talk session' },
    { time: '6:15pm – 10:00pm', event: 'Buffet & networking' },
  ];

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
          <ScrollReveal>
            <p className="page-eyebrow mb-4">Logistics</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight">Practical information</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              Everything you need to get the most out of TEDx IMT.
            </p>
          </ScrollReveal>
        </div>

        <section className="mb-16" aria-labelledby="eulist-booklet-heading">
          <ScrollReveal>
            <TiltCard intensity={3}>
              <div className="nuclear-card rounded-3xl p-0 overflow-hidden">
                <div className="grid lg:grid-cols-[minmax(0,340px)_1fr]">
                  <div className="relative order-2 lg:order-1 border-t lg:border-t-0 lg:border-r border-[#e62b1e]/12 min-h-[220px] lg:min-h-[300px]">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_60%_at_50%_-10%,rgba(230,43,30,0.22),transparent_55%)] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1f0a0a]/90 via-black/80 to-black pointer-events-none" />
                    <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 py-10 lg:py-12">
                      <div className="relative w-full max-w-[210px]">
                        <div
                          className="absolute -right-2 -top-2 h-full w-full rounded-lg border border-[#e62b1e]/20 bg-black/60 rotate-[2deg] shadow-lg"
                          aria-hidden
                        />
                        <div
                          className="absolute -right-1 -top-1 h-full w-full rounded-lg border border-[#e62b1e]/15 bg-black/50 -rotate-1 shadow-md"
                          aria-hidden
                        />
                        <div className="relative rounded-lg border border-[#e62b1e]/35 bg-gradient-to-b from-[#140808] to-black p-8 shadow-[0_0_48px_-12px_rgba(230,43,30,0.35)] flex flex-col items-center text-center">
                          <FileText className="w-12 h-12 text-[#e62b1e] mb-5 drop-shadow-[0_0_20px_rgba(230,43,30,0.35)]" aria-hidden />
                          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-[#fecaca]/85 mb-3">Booklet</p>
                          <p className="font-semibold text-white text-base leading-snug tracking-tight">
                            TEDx IMT
                            <span className="block text-[#e62b1e]/95 mt-1">× EULiST</span>
                          </p>
                          <span className="mt-6 inline-block h-px w-12 bg-gradient-to-r from-transparent via-[#e62b1e]/50 to-transparent" aria-hidden />
                          <p className="mt-4 text-[0.7rem] text-white/40 font-mono tabular-nums">PDF</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="order-1 lg:order-2 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#e62b1e]/30 bg-[#e62b1e]/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#fecaca] w-fit mb-5">
                      EULiST network
                    </span>
                    <h2 id="eulist-booklet-heading" className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                      Partnership booklet
                    </h2>
                    <p className="text-white/70 leading-relaxed mb-8 max-w-lg text-[15px] md:text-base">
                      Official PDF covering the TEDx IMT × EULiST collaboration — context on the European university
                      alliance, what to expect on site, and useful pointers for participants coming from partner schools.
                    </p>
                    <MagneticWrapper className="sm:w-auto w-full">
                      <a
                        href={EULIST_BOOKLET_PDF_URL}
                        className="btn-nuclear-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base sm:w-auto w-full"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileDown className="w-5 h-5 shrink-0" aria-hidden />
                        Download booklet
                      </a>
                    </MagneticWrapper>
                  </div>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        </section>

        <section className="mb-16">
          <ScrollReveal>
            <div className="nuclear-card rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Calendar className="w-8 h-8 text-[#e62b1e] shrink-0" />
                Schedule
              </h2>
              <div className="space-y-6">
                <div className="rounded-2xl p-6 border border-[#e62b1e]/15 bg-black/35">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#e62b1e]" />
                    Morning
                  </h3>
                  <p className="text-white/70 italic">No public program in the morning (tbc).</p>
                </div>
                <div className="rounded-2xl p-6 border border-[#e62b1e]/15 bg-black/35">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#e62b1e]" />
                    Afternoon &amp; evening
                  </h3>
                  <StaggerContainer className="space-y-3 text-white/80 text-sm md:text-base" staggerDelay={0.08}>
                    {schedule.map((item, i) => (
                      <StaggerItem key={i}>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b border-white/5 pb-3 last:border-0 hover:bg-white/[0.02] rounded-lg transition-colors px-2 -mx-2">
                          <span className="text-[#e62b1e]/90 font-mono tabular-nums shrink-0">{item.time}</span>
                          <span>{item.event}</span>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="mb-16">
          <ScrollReveal>
            <TiltCard intensity={3}>
              <div className="nuclear-card rounded-3xl p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-[#e62b1e] shrink-0" />
                  Venue &amp; access
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Théâtre de Paris</h3>
                    <p className="text-white/65 text-sm mb-4">
                      The main campus of IMT in Paris — a vibrant hub for engineering and innovation.
                    </p>
                    <div className="space-y-3 text-white/75">
                      <p>Paris, France</p>
                      <p>Exact address TBC</p>
                    </div>
                  </div>
                  <div className="rounded-2xl p-6 border border-[#e62b1e]/15 bg-black/35">
                    <h4 className="font-semibold text-white mb-4">Getting here</h4>
                    <div className="space-y-3 text-white/75 text-sm leading-relaxed">
                      <p>
                        <strong className="text-white">Metro:</strong> Grands Boulevards (lines 8 &amp; 9) — about 2 min walk;
                        Cadet or Le Peletier (line 7) — about 5 min walk; Chaussée d&apos;Antin — La Fayette (lines 7 &amp; 9)
                        — about 7 min walk
                      </p>
                      <p>
                        <strong className="text-white">Bus:</strong> lines along Boulevard Montmartre / Boulevard Haussmann
                        (e.g. 20, 27, 32, 42, 45, 66, 74, 85 — check stops near rue Richer)
                      </p>
                      <p>
                        <strong className="text-white">RER:</strong> Auber (RER A) or Haussmann — Saint-Lazare (RER E, metro
                        7/9/12/13/14), then metro or short walk to Grands Boulevards area
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        </section>

        <section className="mb-16">
          <ScrollReveal>
            <div className="nuclear-card rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-[#e62b1e] shrink-0" />
                FAQ
              </h2>
              <div>
                {faqs.map((faq, index) => (
                  <FaqItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        <ScrollReveal>
          <div className="text-center">
            <TiltCard intensity={3}>
              <div className="nuclear-card rounded-3xl p-8 md:p-10 inline-block w-full max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-4">More questions?</h2>
                <p className="text-white/70 mb-8 leading-relaxed">Reach us via the contact page — we&apos;re happy to help.</p>
                <MagneticWrapper>
                  <Link href="/contact" className="btn-nuclear-primary inline-flex items-center gap-2 px-10 py-4 rounded-full text-base">
                    <MessageCircle className="w-5 h-5" />
                    Contact us
                  </Link>
                </MagneticWrapper>
              </div>
            </TiltCard>
          </div>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
