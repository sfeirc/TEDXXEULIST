import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ScrollReveal } from '@/components/MotionElements';
import { createClient } from '@/lib/supabase/server';
import type { FaqItem } from '@/types/database';
import FaqAccordion from './FaqAccordion';

export const revalidate = 60;

const FALLBACK_FAQS: Omit<FaqItem, 'id' | 'created_at' | 'updated_at'>[] = [
  { question: 'Qu\'est-ce que TEDx ?', answer: 'TEDx est un événement organisé de manière indépendante sous une licence officielle de TED. Il suit le même format que les conférences TED — des présentations courtes, soigneusement préparées, par des intervenants qui partagent des idées qui valent la peine d\'être diffusées — tout en étant adapté à la communauté locale.', category: null, display_order: 0, is_published: true },
  { question: 'Quand et où a lieu l\'événement ?', answer: 'TEDx IMT Paris se tient le 22 février 2027 au Théâtre de Paris. Les portes ouvrent à 9h et le programme se déroule toute la journée.', category: null, display_order: 1, is_published: true },
  { question: 'Comment obtenir des billets ?', answer: 'Inscrivez-vous sur ce site. Les places sont limitées — nous vous encourageons à vous inscrire rapidement. L\'entrée est gratuite pour les étudiants des écoles d\'ingénieurs IMT.', category: null, display_order: 2, is_published: true },
  { question: 'Les conférences seront-elles en français ou en anglais ?', answer: 'L\'événement propose un mélange de conférences en français et en anglais. Des sous-titres seront affichés pendant chaque conférence afin que tous les participants puissent suivre confortablement.', category: null, display_order: 3, is_published: true },
  { question: 'Quelle est la durée de l\'événement ?', answer: 'TEDx IMT Paris est un événement d\'une journée complète, de 9h à 18h, avec des pauses et un cocktail de clôture en réseau.', category: null, display_order: 4, is_published: true },
  { question: 'Puis-je postuler comme orateur ?', answer: 'Oui — soumettez votre proposition via le formulaire de contact. Nous recherchons des présentations originales et bien préparées, pertinentes pour un public curieux de l\'innovation, des sciences, de la société et de l\'avenir. La sélection des intervenants aura lieu à l\'automne 2026.', category: null, display_order: 5, is_published: true },
  { question: 'Y a-t-il des options de restauration ?', answer: 'Le déjeuner et les pauses café sont fournis pour tous les participants. Les régimes alimentaires spéciaux peuvent être signalés lors de l\'inscription.', category: null, display_order: 6, is_published: true },
  { question: 'Les conférences seront-elles enregistrées ?', answer: 'Oui. Toutes les conférences seront enregistrées de manière professionnelle et publiées sur YouTube et le site TED après l\'événement.', category: null, display_order: 7, is_published: true },
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
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-6">
        <Link href="/" className="back-link"><ArrowLeft className="w-4 h-4" />Retour</Link>
      </div>

      <main className="relative z-10 max-w-3xl mx-auto px-6 pb-24">
        <div className="mb-16 pt-4">
          <ScrollReveal>
            <p className="page-eyebrow mb-5">Questions fréquentes</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              FAQ
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-white/60 max-w-xl leading-relaxed">Tout ce que vous devez savoir sur TEDx IMT Paris 2027.</p>
          </ScrollReveal>
        </div>

        {hasCategories ? (
          Object.entries(grouped).map(([category, items]) => (
            <section key={category} className="mb-10">
              {category && (
                <ScrollReveal>
                  <h2 className="page-eyebrow mb-4">{category}</h2>
                </ScrollReveal>
              )}
              <FaqAccordion items={items} />
            </section>
          ))
        ) : (
          <FaqAccordion items={faqs} />
        )}

        <ScrollReveal>
          <div className="mt-16 border-t border-white/10 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-white/55">Une autre question ? Notre équipe vous répond.</p>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2 shrink-0">
              Nous contacter <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
