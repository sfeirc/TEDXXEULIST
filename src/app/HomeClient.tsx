'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import { ArrowRight, Mail } from 'lucide-react';
import type { Speaker } from '@/types/database';

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const update = () => {
      const diff = target - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
          seconds: Math.floor((diff % 60000) / 1000),
        });
      }
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

type Props = {
  settings: Record<string, string>;
  speakers: Speaker[];
};

export default function HomeClient({ settings, speakers }: Props) {
  const countdown = useCountdown(settings['event_date_iso'] ?? '2027-02-22T09:00:00+01:00');
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const eventDateDisplay = settings['event_date_display'] ?? '22 février 2027';
  const venue = settings['event_venue'] ?? 'Théâtre de Paris';

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setNewsletterStatus('loading');
    try {
      const { subscribeNewsletter } = await import('@/app/actions/newsletter');
      const res = await subscribeNewsletter(email);
      setNewsletterStatus(res.success ? 'done' : 'error');
    } catch {
      setNewsletterStatus('error');
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--black-deep)', color: 'var(--off-white)' }}>
      <Navigation />

      {/* ── 1. HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden pb-16 md:pb-24">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-y-0 left-0 w-1/2 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://i.imgur.com/m8Y6ao9.png)' }}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/2 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://i.imgur.com/jWYW67W.jpeg)' }}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(7,7,6,0.60)' }} />
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{ height: '70%', background: 'linear-gradient(to top, var(--black-deep) 0%, transparent 100%)' }}
          />
        </div>

        <div className="relative z-10 px-6 md:px-12 lg:px-20" style={{ maxWidth: '76rem' }}>
          <p
            className="eyebrow mb-6 md:mb-8"
            style={{ color: 'var(--grey-500)', animation: 'heroFadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.1s both' }}
          >
            TEDx IMT Paris · {eventDateDisplay} · {venue}
          </p>

          <h1
            className="font-display font-normal mb-10 md:mb-12"
            style={{
              fontSize: 'clamp(4.5rem, 12vw, 10rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.025em',
              animation: 'heroFadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.25s both',
            }}
          >
            <span style={{ display: 'block', color: 'var(--off-white)' }}>What</span>
            <em style={{ display: 'block', color: 'var(--ted-red)', fontStyle: 'italic' }}>Connects</em>
            <span style={{ display: 'block', color: 'var(--off-white)' }}>Us</span>
          </h1>

          <div
            className="flex flex-col sm:flex-row gap-4 mb-14 md:mb-16"
            style={{ animation: 'heroFadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.4s both' }}
          >
            <Link href="/register" className="btn-primary">
              Réserver ma place <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/programme" className="btn-outline">
              Voir le programme
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.65 }}
            className="flex flex-wrap gap-6 md:gap-10 items-baseline"
          >
            {[
              { value: countdown.days, label: 'jours' },
              { value: countdown.hours, label: 'heures' },
              { value: countdown.minutes, label: 'min' },
              { value: countdown.seconds, label: 'sec' },
            ].map(({ value, label }, i) => (
              <div key={label} className="flex items-baseline gap-1.5">
                <span
                  className="font-display tabular-nums"
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: 'var(--off-white)', fontWeight: 300 }}
                >
                  {String(value).padStart(2, '0')}
                </span>
                <span className="eyebrow" style={{ fontSize: '0.5rem', color: 'var(--grey-600)' }}>{label}</span>
                {i < 3 && <span style={{ color: 'var(--border-warm)', marginLeft: '0.2rem', opacity: 0.5 }}>·</span>}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2. MANIFESTO — section crème (alternance lumière/obscurité comme TEDxSaclay) ── */}
      <section className="section-editorial px-6 md:px-12" style={{ background: 'var(--cream)' }}>
        <div style={{ maxWidth: '68rem', margin: '0 auto' }}>
          <div className="flex items-center gap-3 mb-8">
            <div style={{ width: '1.5rem', height: '1px', background: 'var(--ted-red)' }} />
            <span className="eyebrow" style={{ color: 'rgba(26,22,18,0.45)' }}>Le thème · 2027</span>
          </div>
          <h2
            className="font-display font-light mb-10 md:mb-14"
            style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 0.93, letterSpacing: '-0.025em', color: 'var(--ink)' }}
          >
            Ce qui<br />
            <em style={{ color: 'var(--ted-red)', fontStyle: 'italic' }}>nous</em>
            <br />relie
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            <p className="text-body-lg leading-relaxed" style={{ color: 'var(--ink-muted)' }}>
              À une époque de connectivité sans précédent, nous sommes paradoxalement plus isolés que jamais. Quels sont les fils invisibles qui nous unissent — à travers les cultures, les disciplines et les générations ?
            </p>
            <p className="text-body-lg leading-relaxed" style={{ color: 'var(--ink-muted)' }}>
              TEDx IMT Paris 2027 réunit penseurs, ingénieurs, artistes et entrepreneurs pour explorer les forces qui connectent — et parfois divisent — notre monde.
            </p>
          </div>
          <div className="mt-14 h-px" style={{ background: 'linear-gradient(90deg, var(--ink-faint), transparent)' }} />
        </div>
      </section>

      {/* ── 3. SPEAKERS — fond sombre ── */}
      <section className="section-editorial px-6 md:px-12" style={{ background: 'var(--black-deep)' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <div className="eyebrow mb-4" style={{ color: 'var(--grey-600)' }}>Intervenants</div>
              <h2
                className="font-display font-light"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.95, letterSpacing: '-0.02em', color: 'var(--off-white)' }}
              >
                Conférenciers
              </h2>
            </div>
            <Link
              href="/speakers"
              className="hidden sm:flex items-center gap-1.5 text-xs tracking-widest uppercase transition-colors"
              style={{ color: 'var(--grey-500)' }}
            >
              Tous les conférenciers →
            </Link>
          </div>

          {speakers.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                {speakers.slice(0, 4).map((speaker, i) => (
                  <div
                    key={speaker.id}
                    style={{
                      borderLeft: i > 0 ? '1px solid var(--border-subtle)' : 'none',
                      padding: '0 clamp(1rem, 2vw, 2rem)',
                    }}
                  >
                    <div
                      className="aspect-square relative overflow-hidden mb-4"
                      style={{ background: 'var(--grey-900)' }}
                    >
                      {speaker.image_url ? (
                        <Image src={speaker.image_url} alt={speaker.name} fill className="object-cover object-top" />
                      ) : (
                        <div className="absolute inset-0" style={{ background: 'var(--grey-800)' }} />
                      )}
                    </div>
                    <p className="font-medium text-sm mb-0.5" style={{ color: 'var(--off-white)' }}>{speaker.name}</p>
                    <p className="text-xs" style={{ color: 'var(--grey-500)' }}>{speaker.title}</p>
                    {speaker.theme && (
                      <p className="text-[0.6rem] tracking-widest uppercase mt-2" style={{ color: 'var(--ted-red)' }}>{speaker.theme}</p>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-10 text-xs tracking-widest uppercase" style={{ color: 'var(--grey-600)' }}>
                {speakers.length} conférencier{speakers.length > 1 ? 's' : ''} confirmé{speakers.length > 1 ? 's' : ''} — d&apos;autres à venir
              </p>
            </>
          ) : (
            <div
              className="py-10 md:py-14"
              style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}
            >
              <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-start">
                <div>
                  <div style={{ width: '1.5rem', height: '1px', background: 'var(--ted-red)', marginBottom: '1.5rem' }} />
                  <h3
                    className="font-display font-light"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--off-white)' }}
                  >
                    Annonces à<br />l&apos;automne 2026
                  </h3>
                </div>
                <div className="space-y-5">
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--grey-400)' }}>
                    Les conférenciers de TEDx IMT Paris 2027 seront révélés progressivement à partir de l&apos;automne 2026. Cinq axes thématiques guident notre sélection : métiers du social, réseaux et technologie, environnement, sciences et interdisciplinarité, culture et communication.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Social', 'Technologie', 'Environnement', 'Sciences', 'Culture'].map((theme) => (
                      <span
                        key={theme}
                        className="text-[0.6rem] tracking-widest uppercase px-3 py-1"
                        style={{ border: '1px solid var(--border-warm)', color: 'var(--grey-500)' }}
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/speakers"
                    className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase"
                    style={{ color: 'var(--grey-500)' }}
                  >
                    En savoir plus →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 4. EXPERIENCE — retour crème, 2 colonnes éditoriales ── */}
      <section className="section-editorial px-6 md:px-12" style={{ background: 'var(--cream)' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20 items-start">

            <div>
              <div className="eyebrow mb-6" style={{ color: 'rgba(26,22,18,0.4)' }}>L&apos;expérience</div>
              <h2
                className="font-display font-light mb-6"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.95, letterSpacing: '-0.025em', color: 'var(--ink)' }}
              >
                Une journée<br />à part entière
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--ink-muted)' }}>
                Le 22 février 2027, le Théâtre de Paris accueille une journée de conférences, de rencontres et d&apos;échanges inattendus.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 text-xs tracking-widest uppercase"
                style={{ color: 'var(--ted-red)', borderBottom: '1px solid rgba(230,43,30,0.3)', paddingBottom: '2px' }}
              >
                Réserver ma place <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div>
              {[
                {
                  num: '01',
                  title: 'Des conférences qui inspirent',
                  body: "Des intervenants d'exception partagent des idées qui méritent d'être entendues — en direct, sur scène, à Paris.",
                },
                {
                  num: '02',
                  title: 'Un réseau choisi',
                  body: "Des moments structurés pour rencontrer chercheurs, ingénieurs, artistes et entrepreneurs venus de toute l'Europe.",
                },
                {
                  num: '03',
                  title: "Un lieu d'exception",
                  body: "Le Théâtre de Paris — une scène historique au cœur du 9e arrondissement, à la hauteur des idées qui s'y expriment.",
                },
              ].map((item, i) => (
                <div
                  key={item.num}
                  style={{
                    paddingTop: '1.75rem',
                    paddingBottom: '1.75rem',
                    borderTop: '1px solid var(--ink-faint)',
                    borderBottom: i === 2 ? '1px solid var(--ink-faint)' : 'none',
                  }}
                >
                  <div className="flex gap-6 items-start">
                    <span
                      className="font-display font-light shrink-0"
                      style={{ fontSize: '0.75rem', color: 'var(--ink-accent)', letterSpacing: '0.05em', paddingTop: '0.15rem' }}
                    >
                      {item.num}
                    </span>
                    <div>
                      <h3
                        className="font-display font-normal mb-2"
                        style={{ fontSize: '1.2rem', lineHeight: 1.15, color: 'var(--ink)', letterSpacing: '-0.01em' }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-muted)' }}>{item.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. PARTNERS — fond sombre ── */}
      <section className="section-editorial px-6 md:px-12" style={{ background: 'var(--black-deep)', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', textAlign: 'center' }}>
          <div className="eyebrow mb-12" style={{ color: 'var(--grey-600)' }}>Partenaires institutionnels</div>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {[
              { src: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/IMT_logo_2017.png', alt: 'IMT', w: 80 },
              { src: 'https://eulist.university/wp-content/themes/eulist/images/logo-new.png', alt: 'EULiST', w: 100 },
              { src: 'https://www.imt-atlantique.fr/sites/default/files/ecole/logos/imtatlantique/imtatlantique-rvb-reserve.png', alt: 'IMT Atlantique', w: 130 },
            ].map((logo) => (
              <div
                key={logo.alt}
                className="opacity-40 hover:opacity-70 transition-opacity duration-300"
                style={{ filter: 'brightness(0) invert(1)' }}
              >
                <Image src={logo.src} alt={logo.alt} width={logo.w} height={40} className="object-contain h-8 md:h-10 w-auto" unoptimized />
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/partners" className="text-xs tracking-widest uppercase" style={{ color: 'var(--grey-600)' }}>
              Devenir partenaire →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. NEWSLETTER ── */}
      <section
        className="section-editorial px-6 md:px-12"
        style={{ background: 'var(--grey-900)', borderTop: '1px solid var(--border-subtle)' }}
      >
        <div style={{ maxWidth: '40rem', margin: '0 auto', textAlign: 'center' }}>
          <div className="eyebrow mb-5" style={{ color: 'var(--grey-600)' }}>Restez informés</div>
          <h2
            className="font-display font-light mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--off-white)' }}
          >
            Ne rien manquer
          </h2>
          <p className="text-sm md:text-base leading-relaxed mb-10" style={{ color: 'var(--grey-500)' }}>
            Annonces de conférenciers, programme, ouverture des inscriptions. Soyez les premiers informés.
          </p>
          {newsletterStatus === 'done' ? (
            <div className="py-5 text-xs tracking-widest uppercase" style={{ color: 'var(--grey-400)' }}>
              ✓ Vous êtes sur la liste
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                className="flex-1 px-4 py-3 text-sm"
                style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-warm)', color: 'var(--off-white)', outline: 'none' }}
              />
              <button type="submit" disabled={newsletterStatus === 'loading'} className="btn-primary whitespace-nowrap">
                <Mail className="w-3.5 h-3.5" />
                {newsletterStatus === 'loading' ? 'Inscription…' : "S'inscrire"}
              </button>
            </form>
          )}
          {newsletterStatus === 'error' && (
            <p className="mt-3 text-xs" style={{ color: 'var(--ted-red)' }}>Une erreur est survenue. Veuillez réessayer.</p>
          )}
        </div>
      </section>
    </div>
  );
}
