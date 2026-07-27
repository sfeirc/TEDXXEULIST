import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, Clock, Calendar, MapPin, Coffee, Mic, Music, Briefcase } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/MotionElements';
import { createClient } from '@/lib/supabase/server';
import type { ProgrammeSession } from '@/types/database';

export const revalidate = 60;

async function getSettings(): Promise<Record<string, string>> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from('site_settings').select('key, value').in('key', ['event_date_display', 'event_venue']);
    return Object.fromEntries((data ?? []).map(s => [s.key, s.value ?? '']));
  } catch { return {}; }
}

async function getSessions(): Promise<ProgrammeSession[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('programme_sessions')
      .select('*')
      .eq('is_published', true)
      .order('display_order')
      .order('time');
    if (data && data.length > 0) return data;
  } catch { /* fall through */ }
  return [];
}

const slotAccent: Record<ProgrammeSession['type'], string> = {
  doors:    'border-white/10 bg-white/[0.025]',
  opening:  'border-[#e62b1e]/20 bg-[#e62b1e]/[0.04]',
  session:  'border-[#e62b1e]/25 bg-[#e62b1e]/[0.06]',
  break:    'border-white/10 bg-white/[0.025]',
  lunch:    'border-white/10 bg-white/[0.025]',
  closing:  'border-[#e62b1e]/20 bg-[#e62b1e]/[0.04]',
  cocktail: 'border-[#e62b1e]/25 bg-[#e62b1e]/[0.06]',
  forum:    'border-amber-500/20 bg-amber-500/[0.05]',
};

const slotIconBg: Record<ProgrammeSession['type'], string> = {
  doors:    'bg-white/5 text-white/40',
  opening:  'bg-[#e62b1e]/15 text-[#e62b1e]/80',
  session:  'bg-[#e62b1e]/20 text-[#e62b1e]',
  break:    'bg-white/5 text-white/40',
  lunch:    'bg-white/5 text-white/40',
  closing:  'bg-[#e62b1e]/15 text-[#e62b1e]/80',
  cocktail: 'bg-[#e62b1e]/20 text-[#e62b1e]',
  forum:    'bg-amber-500/15 text-amber-400',
};

function SlotIcon({ type }: { type: ProgrammeSession['type'] }) {
  if (type === 'session' || type === 'opening' || type === 'closing') return <Mic className="w-5 h-5" />;
  if (type === 'cocktail') return <Music className="w-5 h-5" />;
  if (type === 'lunch') return <MapPin className="w-5 h-5" />;
  if (type === 'forum') return <Briefcase className="w-5 h-5" />;
  return <Coffee className="w-5 h-5" />;
}

function SpeakerSlot({ index }: { index: number }) {
  return (
    <div className="flex items-center gap-3 mt-3 px-4 py-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--ted-red)', opacity: 0.5 }} />
      <p className="text-sm italic" style={{ color: 'var(--grey-600)' }}>
        Conférencier {index + 1} — annonce à venir
      </p>
    </div>
  );
}

const SECTION_META: Record<string, { color: string; accent: string; icon: string }> = {
  'Forum Entreprise': { color: '#f59e0b', accent: 'rgba(245,158,11,0.15)', icon: '🏢' },
  'TEDx':             { color: '#e62b1e', accent: 'rgba(230,43,30,0.15)',  icon: '🎤' },
};

export default async function ProgrammePage() {
  const [sessions, settings] = await Promise.all([getSessions(), getSettings()]);
  const dateDisplay = settings['event_date_display'] ?? '22 February 2027';
  const venue = settings['event_venue'] ?? 'Théâtre de Paris';

  // Group sessions by section, preserving natural order (Forum Entreprise first via display_order)
  const sectionOrder: string[] = [];
  const grouped: Record<string, ProgrammeSession[]> = {};
  for (const s of sessions) {
    const sec = s.section ?? 'TEDx';
    if (!grouped[sec]) { grouped[sec] = []; sectionOrder.push(sec); }
    grouped[sec].push(s);
  }

  return (
    <div className="min-h-screen relative overflow-hidden font-inter">
      <Navigation />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <Link href="/" className="back-link"><ArrowLeft className="w-4 h-4" />Retour</Link>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <ScrollReveal>
            <p className="page-eyebrow mb-4">
              <Calendar className="inline-block w-3.5 h-3.5 mr-1.5 -mt-0.5" />
              {dateDisplay}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-display font-light mb-6" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.93, letterSpacing: '-0.025em', color: 'var(--off-white)' }}>Programme</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed">
              Une journée complète d&apos;idées et de rencontres à {venue}.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.25}>
          <div className="mb-14 px-5 py-4 flex items-start gap-4" style={{ borderLeft: '2px solid var(--ted-red)', background: 'var(--ted-red-muted)' }}>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--grey-300)' }}>
              <span style={{ color: 'var(--off-white)', fontWeight: 500 }}>Programme complet révélé en janvier 2027.</span>
              {' '}Les noms des intervenants et titres des talks apparaîtront ici au fil des confirmations.
            </p>
          </div>
        </ScrollReveal>

        {/* Sections */}
        <div className="space-y-16">
          {sectionOrder.map((section, sIdx) => {
            const meta = SECTION_META[section] ?? { color: '#e62b1e', accent: 'rgba(230,43,30,0.15)', icon: '•' };
            const sectionSessions = grouped[section];

            return (
              <div key={section}>
                {/* Section header */}
                <ScrollReveal delay={sIdx * 0.1}>
                  <div className="flex items-center gap-4 mb-8">
                    <div
                      className="flex items-center gap-2.5 px-4 py-2 rounded-2xl"
                      style={{ background: meta.accent, border: `1px solid ${meta.color}30` }}
                    >
                      <span className="text-base leading-none">{meta.icon}</span>
                      <span
                        className="font-label font-bold text-sm tracking-wide"
                        style={{ color: meta.color }}
                      >
                        {section}
                      </span>
                    </div>
                    <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${meta.color}30, transparent)` }} />
                  </div>
                </ScrollReveal>

                {/* Timeline */}
                <section>
                  <StaggerContainer className="relative" staggerDelay={0.07}>
                    <div
                      className="absolute left-[5.5rem] md:left-28 top-0 bottom-0 w-px pointer-events-none"
                      style={{ background: `linear-gradient(to bottom, transparent, ${meta.color}25, transparent)` }}
                    />

                    {sectionSessions.map((slot) => (
                      <StaggerItem key={slot.id}>
                        <div className="relative flex gap-4 md:gap-8 mb-5 last:mb-0">
                          <div className="shrink-0 w-20 md:w-24 pt-4 text-right">
                            <span
                              className="font-mono text-sm md:text-base font-semibold tabular-nums"
                              style={{ color: `${meta.color}cc` }}
                            >
                              {slot.time}
                            </span>
                          </div>
                          <div className="relative shrink-0 flex items-start pt-[1.1rem]">
                            <div
                              className="w-3 h-3 rounded-full border-2 bg-[#070706]"
                              style={{ borderColor: `${meta.color}60`, boxShadow: `0 0 8px ${meta.color}40` }}
                            />
                          </div>
                          <div className={`flex-1 nuclear-card rounded-2xl border p-5 ${slotAccent[slot.type]}`}>
                            <div className="flex items-start gap-3">
                              <span className={`shrink-0 mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center ${slotIconBg[slot.type]}`}>
                                <SlotIcon type={slot.type} />
                              </span>
                              <div className="flex-1 min-w-0">
                                <h2 className="font-semibold text-white text-base md:text-lg leading-snug">{slot.title}</h2>
                                {slot.description && (
                                  <p className="text-white/55 text-sm mt-1 leading-relaxed">{slot.description}</p>
                                )}
                                {slot.speaker_count > 0 && slot.type === 'session' && (
                                  <div className="mt-1">
                                    {Array.from({ length: slot.speaker_count }).map((_, si) => (
                                      <SpeakerSlot key={si} index={si} />
                                    ))}
                                  </div>
                                )}
                              </div>
                              {slot.type === 'session' && slot.speaker_count > 0 && (
                                <span
                                  className="shrink-0 ml-auto text-[0.6rem] font-semibold uppercase tracking-[0.18em] border rounded-full px-2.5 py-1 hidden sm:inline-flex"
                                  style={{ color: `${meta.color}b0`, borderColor: `${meta.color}25` }}
                                >
                                  {slot.speaker_count} speakers
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </section>
              </div>
            );
          })}
        </div>

        <ScrollReveal delay={0.1}>
          <div className="mt-14 nuclear-card rounded-2xl border border-white/8 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-white/40" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{venue}</p>
              <p className="text-white/45 text-sm mt-0.5">Forum Entreprise dès 08:00 · TEDx dès 09:00</p>
            </div>
            <Link href="/practical-info" className="sm:ml-auto text-[#e62b1e] text-sm font-medium hover:text-[#ff3d2e] transition-colors flex items-center gap-1 shrink-0">
              Lieu & accès <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-14 text-center">
            <div className="nuclear-card rounded-3xl border border-[#e62b1e]/15 p-10 md:p-14 relative overflow-hidden">
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[80%] h-40 bg-[#e62b1e]/10 blur-3xl pointer-events-none" />
              <div className="relative">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-[#e62b1e]" />
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#e62b1e]/80">Réservez votre place</span>
                </div>
                <h2 className="font-bold text-2xl md:text-4xl text-white mb-3 tracking-tight">S&apos;inscrire à l&apos;événement</h2>
                <p className="text-white/60 max-w-md mx-auto mb-8 leading-relaxed">Les places sont limitées. Inscrivez-vous dès maintenant pour le {dateDisplay}.</p>
                <Link href="/register" className="btn-nuclear-primary inline-flex items-center gap-2 px-10 py-4 rounded-full text-base">
                  S&apos;inscrire <ArrowLeft className="w-5 h-5 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
