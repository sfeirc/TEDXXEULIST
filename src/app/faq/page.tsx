import Link from 'next/link';
import { ArrowLeft, HelpCircle, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ScrollReveal } from '@/components/MotionElements';
import { createClient } from '@/lib/supabase/server';
import type { FaqItem } from '@/types/database';
import FaqAccordion from './FaqAccordion';

export const revalidate = 60;

const FALLBACK_FAQS: Omit<FaqItem, 'id' | 'created_at' | 'updated_at'>[] = [
  { question: 'What is TEDx?', answer: 'TEDx is an independently organized event run under an official license from TED. It follows the same format as TED talks — short, carefully prepared talks by speakers who share ideas worth spreading — while being tailored to the local community.', category: null, display_order: 0, is_published: true },
  { question: 'When and where?', answer: 'TEDx IMT Paris takes place on 22 February 2027 at Théâtre de Paris. Doors open at 9 am and the programme runs throughout the day.', category: null, display_order: 1, is_published: true },
  { question: 'How to get tickets?', answer: 'Register on this site. Seats are limited — we encourage you to register early. Admission is free for students enrolled at IMT engineering schools.', category: null, display_order: 2, is_published: true },
  { question: 'Will talks be in French or English?', answer: 'The event features a mix of French and English talks. Subtitles will be displayed during every talk so all attendees can follow comfortably.', category: null, display_order: 3, is_published: true },
  { question: 'How long is the event?', answer: 'TEDx IMT Paris is a full-day event running from 9 am to 6 pm, with breaks and a closing networking cocktail.', category: null, display_order: 4, is_published: true },
  { question: 'Can I apply as a speaker?', answer: 'Yes — submit your proposal via the contact form. We look for original, well-prepared talks relevant to audiences curious about innovation, science, society, and the future. Speaker selection takes place in autumn 2026.', category: null, display_order: 5, is_published: true },
  { question: 'Are there food options?', answer: 'Lunch and coffee breaks are provided for all attendees. Dietary requirements can be noted at registration.', category: null, display_order: 6, is_published: true },
  { question: 'Will talks be recorded?', answer: 'Yes. All talks will be professionally recorded and published on YouTube and the TED website after the event.', category: null, display_order: 7, is_published: true },
];

async function getFaqs(): Promise<FaqItem[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('faq_items')
      .select('*')
      .eq('is_published', true)
      .order('display_order')
      .order('created_at');
    if (data && data.length > 0) return data;
  } catch { /* fall through */ }
  return FALLBACK_FAQS.map((f, i) => ({ ...f, id: String(i), created_at: '', updated_at: '' }));
}

export default async function FaqPage() {
  const faqs = await getFaqs();

  const grouped = faqs.reduce<Record<string, FaqItem[]>>((acc, item) => {
    const key = item.category ?? '';
    acc[key] = [...(acc[key] ?? []), item];
    return acc;
  }, {});

  const hasCategories = Object.keys(grouped).some(k => k !== '');

  return (
    <div className="min-h-screen relative overflow-hidden font-inter">
      <Navigation />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <Link href="/" className="back-link"><ArrowLeft className="w-4 h-4" />Back to home</Link>
      </div>

      <main className="relative z-10 max-w-3xl mx-auto px-6 pb-24">
        <div className="text-center mb-14">
          <ScrollReveal>
            <p className="page-eyebrow mb-4">
              <HelpCircle className="inline-block w-3.5 h-3.5 mr-1.5 -mt-0.5" />
              Questions
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-4 tracking-tight">FAQ</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-white/60 max-w-xl mx-auto">Everything you need to know about TEDx IMT Paris 2027.</p>
          </ScrollReveal>
        </div>

        {hasCategories ? (
          Object.entries(grouped).map(([category, items]) => (
            <section key={category} className="mb-10">
              {category && (
                <ScrollReveal>
                  <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e62b1e]/70 mb-4 px-1">{category}</h2>
                </ScrollReveal>
              )}
              <FaqAccordion items={items} />
            </section>
          ))
        ) : (
          <FaqAccordion items={faqs} />
        )}

        <ScrollReveal>
          <div className="mt-14 nuclear-card rounded-2xl border border-[#e62b1e]/15 p-8 text-center">
            <p className="text-white/70 mb-4">Still have a question?</p>
            <Link href="/contact" className="btn-nuclear-primary inline-flex items-center gap-2 px-8 py-3 rounded-full">
              Contact us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
