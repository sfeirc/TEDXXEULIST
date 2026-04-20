import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, MapPin, Clock, Calendar, MessageCircle } from 'lucide-react';

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
          <p className="page-eyebrow mb-4">Logistics</p>
          <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight">Practical information</h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Everything you need to get the most out of TEDx IMT.
          </p>
        </div>

        <section className="mb-16">
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
                <div className="space-y-3 text-white/80 text-sm md:text-base">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b border-white/5 pb-3 last:border-0">
                    <span className="text-[#e62b1e]/90 font-mono tabular-nums shrink-0">1:00pm – 2:00pm</span>
                    <span>Doors open &amp; welcome</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b border-white/5 pb-3 last:border-0">
                    <span className="text-[#e62b1e]/90 font-mono tabular-nums shrink-0">2:00pm – 4:00pm</span>
                    <span>First talk session</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b border-white/5 pb-3 last:border-0">
                    <span className="text-[#e62b1e]/90 font-mono tabular-nums shrink-0">4:00pm – 4:30pm</span>
                    <span>Break &amp; informal chat</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b border-white/5 pb-3 last:border-0">
                    <span className="text-[#e62b1e]/90 font-mono tabular-nums shrink-0">4:30pm – 6:00pm</span>
                    <span>Second talk session</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                    <span className="text-[#e62b1e]/90 font-mono tabular-nums shrink-0">6:15pm – 10:00pm</span>
                    <span>Buffet &amp; networking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="nuclear-card rounded-3xl p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <MapPin className="w-8 h-8 text-[#e62b1e] shrink-0" />
              Venue &amp; access
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Cité des sciences et de l&apos;industrie</h3>
                <div className="space-y-3 text-white/75">
                  <p>30 avenue Corentin-Cariou</p>
                  <p>75019 Paris, France</p>
                </div>
              </div>
              <div className="rounded-2xl p-6 border border-[#e62b1e]/15 bg-black/35">
                <h4 className="font-semibold text-white mb-4">Getting here</h4>
                <div className="space-y-3 text-white/75 text-sm leading-relaxed">
                  <p>
                    <strong className="text-white">Metro:</strong> line 7, Porte de la Villette
                  </p>
                  <p>
                    <strong className="text-white">Bus:</strong> 71, 139, 150, 152 — Porte de la Villette
                  </p>
                  <p>
                    <strong className="text-white">Tram:</strong> T3b — Porte de la Villette
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="nuclear-card rounded-3xl p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <MessageCircle className="w-8 h-8 text-[#e62b1e] shrink-0" />
              FAQ
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-white/8 pb-6 last:border-b-0 last:pb-0">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-white/75 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="text-center">
          <div className="nuclear-card rounded-3xl p-8 md:p-10 inline-block w-full max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">More questions?</h2>
            <p className="text-white/70 mb-8 leading-relaxed">Reach us via the contact page — we&apos;re happy to help.</p>
            <Link href="/contact" className="btn-nuclear-primary inline-flex items-center gap-2 px-10 py-4 rounded-full text-base">
              <MessageCircle className="w-5 h-5" />
              Contact us
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
