import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, Mic, Calendar } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/MotionElements';
import type { Speaker } from '@/types/database';

const speakerDirections = [
  { theme: 'Métiers du social', skills: 'Relations, solidarité, inclusion', profession: 'Sociologue, psychologue, médiateur, travailleur social' },
  { theme: 'Réseaux et technologie', skills: 'Internet, réseaux sociaux, interconnexion mondiale', profession: 'Ingénieur réseaux, data scientist, expert cybersécurité' },
  { theme: 'Environnement', skills: 'Écosystèmes, liens entre humains et nature', profession: 'Ingénieur environnemental, climatologue, urbaniste durable' },
  { theme: 'Sciences et interdisciplinarité', skills: 'Collaboration entre champs scientifiques', profession: 'Chercheur, ingénieur R&D, chef de projet scientifique' },
  { theme: 'Culture et communication', skills: 'Langue, art, circulation des idées', profession: 'Journaliste, communicant, traducteur, artiste' },
] as const;

async function getSpeakers(): Promise<Speaker[]> {
  try {
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();
    const { data } = await supabase
      .from('speakers')
      .select('*')
      .eq('is_published', true)
      .order('display_order');
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function Speakers() {
  const speakers = await getSpeakers();
  const hasSpeakers = speakers.length > 0;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <Link href="/" className="back-link"><ArrowLeft className="w-4 h-4" />Retour</Link>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        {/* Header */}
        <div className="mb-20 pt-4">
          <ScrollReveal><p className="page-eyebrow mb-5">Intervenants</p></ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-display font-light mb-6" style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 0.95, letterSpacing: '-0.025em', color: 'var(--off-white)' }}>
              Nos orateurs
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
              Des voix d&apos;exception pour TEDx IMT Paris — annoncées ici en avant-première.
            </p>
          </ScrollReveal>
        </div>

        {hasSpeakers ? (
          <section className="mb-20">
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.08}>
              {speakers.map(speaker => (
                <StaggerItem key={speaker.id}>
                  <div className="border-t border-white/10 pt-6">
                    {speaker.image_url ? (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden mb-5">
                        <Image src={speaker.image_url} alt={speaker.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                        <Mic className="w-7 h-7 text-white/30" />
                      </div>
                    )}
                    <h3 className="font-display font-semibold text-white text-xl mb-1 leading-tight">{speaker.name}</h3>
                    <p className="text-[#e62b1e] text-sm font-medium mb-3">{speaker.title}</p>
                    {speaker.theme && (
                      <span className="text-xs text-white/40 uppercase tracking-widest mb-3 block">{speaker.theme}</span>
                    )}
                    {speaker.bio && (
                      <p className="text-white/55 text-sm leading-relaxed">{speaker.bio}</p>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        ) : (
          <section className="mb-20">
            <ScrollReveal>
              <div className="border-t border-white/10 pt-10 pb-14 flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mic className="w-8 h-8 text-white/30" />
                </div>
                <div>
                  <h2 className="font-display font-light mb-3 leading-tight">
                    Bientôt annoncés
                  </h2>
                  <p className="text-white/55 leading-relaxed max-w-xl mb-5">
                    Les orateurs seront révélés progressivement. Revenez régulièrement pour découvrir les premières annonces.
                  </p>
                  <div className="inline-flex items-center gap-2 text-white/40 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span className="font-label uppercase tracking-widest text-xs">22 février 2027</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </section>
        )}

        {/* Apply section */}
        <section className="mb-20">
          <ScrollReveal>
            <div className="border-t border-white/10 pt-10">
              <div className="mb-10">
                <p className="page-eyebrow mb-4">Candidature</p>
                <h2 className="font-display font-light mb-3 leading-tight">
                  Prendre la parole
                </h2>
                <p className="text-white/55 max-w-xl">Cinq axes thématiques qui nous tiennent à cœur.</p>
              </div>
              <div className="space-y-0 mb-10">
                {speakerDirections.map((row, i) => (
                  <div key={row.theme} className="grid sm:grid-cols-[2fr_2fr_2fr] gap-0 border-t border-white/8 py-5 first:border-t-0">
                    <div className="flex items-start gap-3 pr-6">
                      <div style={{ width: '1rem', height: '1px', background: 'var(--amber)', marginTop: '0.55rem', flexShrink: 0 }} />
                      <p className="font-medium text-sm leading-snug" style={{ color: 'var(--off-white)' }}>{row.theme}</p>
                    </div>
                    <div className="pr-6 mt-2 sm:mt-0">
                      <p className="text-white/50 text-sm leading-relaxed">{row.profession}</p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <p className="text-white/40 text-sm leading-relaxed italic">{row.skills}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/contact?interest=speaker" className="btn-primary inline-flex items-center gap-2">
                Postuler comme orateur
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </ScrollReveal>
        </section>

        <ScrollReveal>
          <div className="border-t border-white/10 pt-8">
            <Link href="/contact" className="btn-outline inline-flex items-center gap-2">
              Une question ?
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
