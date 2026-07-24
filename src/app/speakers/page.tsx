import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, Mic, Calendar, ExternalLink } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem, TiltCard, MagneticWrapper } from '@/components/MotionElements';
import type { Speaker } from '@/types/database';

const speakerDirections = [
  { theme: 'Social professions', skills: 'Relations, solidarity, inclusion', profession: 'Sociologist, psychologist, mediator, social worker' },
  { theme: 'Networks and technology', skills: 'Internet, social networks, global interconnection', profession: 'Network engineer, data scientist, cybersecurity specialist' },
  { theme: 'Environment', skills: 'Ecosystems; links between people and nature', profession: 'Environmental engineer, climatologist, sustainable urban planner' },
  { theme: 'Science and interdisciplinarity', skills: 'Collaboration across scientific fields', profession: 'Researcher, R&D engineer, scientific project lead' },
  { theme: 'Culture and communication', skills: 'Language, art, how ideas travel', profession: 'Journalist, communicator, translator, artist' },
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
    <div className="min-h-screen relative overflow-hidden font-inter">
      <Navigation />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <Link href="/" className="back-link"><ArrowLeft className="w-4 h-4" />Back to home</Link>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <ScrollReveal><p className="page-eyebrow mb-4">Line-up</p></ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight">Speakers</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              Exceptional voices for TEDx IMT — announced here first.
            </p>
          </ScrollReveal>
        </div>

        {hasSpeakers ? (
          <section className="mb-16">
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
              {speakers.map(speaker => (
                <StaggerItem key={speaker.id}>
                  <TiltCard intensity={4}>
                    <div className="nuclear-card rounded-2xl p-6 h-full flex flex-col">
                      {speaker.image_url ? (
                        <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 ring-2 ring-[#e62b1e]/30">
                          <Image src={speaker.image_url} alt={speaker.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-[#e62b1e]/10 border border-[#e62b1e]/30 flex items-center justify-center mb-4">
                          <Mic className="w-8 h-8 text-[#e62b1e]/60" />
                        </div>
                      )}
                      <h3 className="font-bold text-white text-lg mb-1">{speaker.name}</h3>
                      <p className="text-[#e62b1e]/80 text-sm font-medium mb-2">{speaker.title}</p>
                      {speaker.theme && (
                        <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-white/40 mb-3 w-fit">{speaker.theme}</span>
                      )}
                      {speaker.bio && (
                        <p className="text-white/60 text-sm leading-relaxed flex-1">{speaker.bio}</p>
                      )}
                    </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        ) : (
          <section className="mb-16">
            <ScrollReveal>
              <TiltCard intensity={3}>
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
              </TiltCard>
            </ScrollReveal>
          </section>
        )}

        <section className="mb-16">
          <ScrollReveal>
            <div className="nuclear-card rounded-3xl p-8 md:p-10">
              <div className="text-center mb-8">
                <h2 className="font-bold text-2xl md:text-4xl text-white mb-3">Apply to speak</h2>
                <p className="text-white/70 max-w-2xl mx-auto mb-6">Five directions we care about.</p>
                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">What we look for</h3>
              </div>
              <StaggerContainer className="space-y-4 mb-10" staggerDelay={0.1}>
                {speakerDirections.map((row, i) => (
                  <StaggerItem key={row.theme}>
                    <div className="rounded-2xl border border-[#e62b1e]/15 bg-black/35 overflow-hidden hover:border-[#e62b1e]/35 transition-all duration-300">
                      <p className="px-4 pt-3 pb-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#e62b1e]/85">{i + 1}</p>
                      <div className="grid sm:grid-cols-3 gap-0 sm:divide-x sm:divide-[#e62b1e]/15">
                        <div className="p-4 sm:p-5 border-b sm:border-b-0 border-[#e62b1e]/15">
                          <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/45 mb-2">Theme</h3>
                          <p className="text-white font-semibold text-sm leading-snug">{row.theme}</p>
                        </div>
                        <div className="p-4 sm:p-5 border-b sm:border-b-0 border-[#e62b1e]/15">
                          <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/45 mb-2">Profession</h3>
                          <p className="text-white/80 text-sm leading-relaxed">{row.profession}</p>
                        </div>
                        <div className="p-4 sm:p-5">
                          <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/45 mb-2">Skills</h3>
                          <p className="text-white/80 text-sm leading-relaxed">{row.skills}</p>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
              <div className="text-center">
                <MagneticWrapper>
                  <Link href="/contact?interest=speaker" className="btn-nuclear-primary inline-flex items-center gap-2 px-10 py-4 rounded-full text-base">
                    <ExternalLink className="w-5 h-5" />Apply as a speaker
                  </Link>
                </MagneticWrapper>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <ScrollReveal>
          <div className="text-center">
            <MagneticWrapper>
              <Link href="/contact" className="btn-nuclear-ghost inline-flex items-center gap-2 px-10 py-4 rounded-full text-base">
                Questions?<ArrowLeft className="w-5 h-5 rotate-180" />
              </Link>
            </MagneticWrapper>
          </div>
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
