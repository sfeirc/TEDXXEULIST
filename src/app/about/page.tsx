import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/MotionElements';
import { createClient } from '@/lib/supabase/server';

export const revalidate = 60;

const DEFAULT_ABOUT_TEXT = 'TEDx IMT Paris est un événement TEDx organisé de manière indépendante, réunissant étudiants, chercheurs, innovateurs et visionnaires de l\'Institut Mines-Télécom et du réseau universitaire européen EULiST. Notre thème explore les connexions — entre les individus, les idées, les disciplines et les continents — qui façonnent notre futur commun.';

async function getAboutText(): Promise<string> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from('site_settings').select('value').eq('key', 'about_text').single();
    return data?.value || DEFAULT_ABOUT_TEXT;
  } catch { return DEFAULT_ABOUT_TEXT; }
}

const objectives = [
  {
    num: '01',
    title: 'Inspirer',
    text: 'Partager des idées audacieuses qui suscitent la curiosité, la réflexion et l\'envie d\'agir.',
  },
  {
    num: '02',
    title: 'Connecter',
    text: 'Tisser un réseau d\'échange entre étudiants, chercheurs et professionnels — au sein d\'IMT et avec EULiST.',
  },
  {
    num: '03',
    title: 'Collaborer',
    text: 'Encourager la co-création au sein de la communauté IMT et d\'EULiST pour imaginer un avenir partagé.',
  },
] as const;

export default async function About() {
  const aboutText = await getAboutText();
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 py-6">
        <Link href="/" className="back-link">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 pb-24">
        {/* Header */}
        <div className="mb-20 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <div style={{ width: '1.5rem', height: '1px', background: 'var(--amber)' }} />
            <span className="eyebrow" style={{ color: 'var(--amber)' }}>À propos</span>
          </div>
          <h1 className="font-display font-light mb-6" style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 0.95, letterSpacing: '-0.025em', color: 'var(--off-white)' }}>
            Le projet
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--grey-400)', maxWidth: '38rem' }}>
            Tout ce qu&apos;il faut savoir sur TEDx IMT Paris — l&apos;équipe, les ambitions, et notre manière de faire.
          </p>
        </div>

        {/* Our story */}
        <section className="mb-16">
          <ScrollReveal>
            <div className="border-t border-white/10 pt-10">
              <p className="page-eyebrow mb-6">Notre histoire</p>
              <div className="grid md:grid-cols-[1fr_1.8fr] gap-10">
                <div>
                  <h2 className="font-display font-light leading-snug">
                    D&apos;où vient ce projet
                  </h2>
                </div>
                <div className="text-white/60 leading-relaxed space-y-4">
                  {aboutText.split('\n').filter(Boolean).map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Mission */}
        <section className="mb-16">
          <ScrollReveal>
            <div className="border-t border-white/10 pt-10">
              <p className="page-eyebrow mb-6">Mission</p>
              <div className="grid md:grid-cols-[1fr_1.8fr] gap-10">
                <div>
                  <h2 className="font-display font-light leading-snug">
                    Ce que nous voulons accomplir
                  </h2>
                </div>
                <div className="text-white/60 leading-relaxed space-y-4">
                  <p>
                    Nous voulons que les idées résonnent — au sein d&apos;IMT Atlantique, dans le réseau IMT au sens large, et au-delà. Avec ce TEDx, nous souhaitons offrir une scène à ceux qui pensent différemment, repoussent les limites et imaginent un avenir plus durable, plus solidaire et plus créatif.
                  </p>
                  <p>
                    Ancrés nationalement dans l&apos;IMT et internationalement dans EULiST, nous cultivons le dialogue entre cultures, disciplines et visions du monde.
                  </p>
                  <p>
                    Nous espérons créer un espace où étudiants, chercheurs, entrepreneurs et citoyens peuvent partager des idées, apprendre les uns des autres et agir ensemble face aux défis qui nous attendent.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Objectives */}
        <section className="mb-16">
          <ScrollReveal>
            <div className="border-t border-white/10 pt-10">
              <p className="page-eyebrow mb-8">Objectifs</p>
              <div className="grid md:grid-cols-3 gap-0">
                {objectives.map((obj, i) => (
                  <div key={obj.title} style={{
                    paddingLeft: i > 0 ? 'clamp(1.5rem, 3vw, 2.5rem)' : 0,
                    paddingRight: i < 2 ? 'clamp(1.5rem, 3vw, 2.5rem)' : 0,
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                    borderLeft: i > 0 ? '1px solid var(--border-subtle)' : 'none',
                  }}>
                    <div style={{ width: '1.5rem', height: '1px', background: 'var(--amber)', marginBottom: '1.5rem' }} />
                    <h3 className="font-display font-light mb-3" style={{ fontSize: '1.375rem', color: 'var(--off-white)', letterSpacing: '-0.01em' }}>{obj.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--grey-500)' }}>{obj.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* TED history */}
        <section className="mb-16">
          <ScrollReveal>
            <div className="border-t border-white/10 pt-10">
              <p className="page-eyebrow mb-6">Le format TED</p>
              <div className="grid md:grid-cols-[1fr_1.8fr] gap-10">
                <div>
                  <h2 className="font-display font-light leading-snug">
                    Une histoire qui commence en 1984
                  </h2>
                </div>
                <div className="text-white/60 leading-relaxed space-y-4">
                  <p>
                    TED est né en Californie en 1984 avec un objectif simple : diffuser des idées puissantes. Il est devenu un mouvement mondial autour de la devise <em>Ideas worth spreading</em>.
                  </p>
                  <p>
                    En 2009, TED a lancé le programme TEDx pour permettre à des communautés locales d&apos;organiser des événements indépendants fidèles à l&apos;esprit TED. Aujourd&apos;hui, des milliers d&apos;événements TEDx se tiennent chaque année dans plus de 100 pays — offrant une tribune à quiconque souhaite partager une vision et inspirer le changement.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* License */}
        <section className="mb-20">
          <ScrollReveal>
            <div className="border-t border-white/10 pt-10">
              <div className="grid md:grid-cols-[1fr_1.8fr] gap-10">
                <div>
                  <h2 className="font-display font-light leading-snug">
                    Licence TEDx
                  </h2>
                </div>
                <p className="text-white/55 leading-relaxed">
                  Organiser un TEDx exige une licence officielle de TED. Elle garantit le format, les valeurs et les standards de qualité qui font vivre l&apos;esprit <em>Ideas worth spreading</em>.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <ScrollReveal>
          <div className="border-t border-white/10 pt-8">
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              Rejoindre l&apos;aventure
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
