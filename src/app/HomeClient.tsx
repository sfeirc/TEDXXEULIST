'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import { ArrowRight, ChevronRight, Mail } from 'lucide-react';
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
          <div className="absolute inset-0" style={{ background: 'rgba(7,7,6,0.62)' }} />
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{ height: '70%', background: 'linear-gradient(to top, var(--black-deep) 0%, transparent 100%)' }}
          />
        </div>

        <div className="relative z-10 px-6 md:px-12 lg:px-20" style={{ maxWidth: '76rem' }}>
          <p
            className="eyebrow mb-6 md:mb-8"
            style={{ color: 'var(--grey-400)', animation: 'heroFadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.1s both' }}
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

          {/* Countdown — purely typographic, no boxes */}
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

      {/* Disclaimer */}
      <div className="section-divider-line" />
      <div className="py-4 px-6 text-center">
        <p className="eyebrow" style={{ fontSize: '0.6rem', color: 'var(--grey-600)' }}>
          TEDx IMT Paris est un événement indépendant organisé par des étudiants des écoles IMT · Sous licence TED Conferences LLC
        </p>
      </div>
      <div className="section-divider-line" />

      {/* ── 2. MANIFESTO ── */}
      <section className="section-editorial px-6 md:px-12" style={{ maxWidth: '68rem', margin: '0 auto' }}>
        <div className="flex items-center gap-3 mb-8">
          <div style={{ width: '1.5rem', height: '1px', background: 'var(--amber)' }} />
          <span className="eyebrow" style={{ color: 'var(--amber)' }}>Le thème · 2027</span>
        </div>
        <h2
          className="font-display font-light mb-10 md:mb-14"
          style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 0.93, letterSpacing: '-0.025em', color: 'var(--off-white)' }}
        >
          Ce qui<br />
          <em style={{ color: 'var(--ted-red)', fontStyle: 'italic' }}>nous</em>
          <br />relie
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          <p className="text-body-lg leading-relaxed" style={{ color: 'var(--grey-300)' }}>
            À une époque de connectivité sans précédent, nous sommes paradoxalement plus isolés que jamais. Quels sont les fils invisibles qui nous unissent — à travers les cultures, les disciplines et les générations ?
          </p>
          <p className="text-body-lg leading-relaxed" style={{ color: 'var(--grey-300)' }}>
            TEDx IMT Paris 2027 réunit penseurs, ingénieurs, artistes et entrepreneurs pour explorer les forces qui connectent — et parfois divisent — notre monde.
          </p>
        </div>
        <div className="mt-14 h-px" style={{ background: 'linear-gradient(90deg, var(--amber-dim), transparent)' }} />
      </section>

      {/* ── 3. SPEAKERS ── */}
      <section className="section-editorial px-6 md:px-12">
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <div className="eyebrow mb-4">Line-up</div>
              <h2
                className="font-display font-light"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.95, letterSpacing: '-0.02em', color: 'var(--off-white)' }}
              >
                Conférenciers
              </h2>
            </div>
            <Link
              href="/speakers"
              className="flex items-center gap-1.5 font-label text-xs tracking-widest uppercase transition-colors"
              style={{ color: 'var(--grey-400)' }}
            >
              Tous les conférenciers <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {speakers.length > 0
              ? speakers.slice(0, 4).map((speaker) => (
                  <div key={speaker.id} className="card-editorial">
                    <div
                      className="aspect-[3/4] relative overflow-hidden"
                      style={{ background: 'linear-gradient(160deg, var(--grey-900), var(--grey-800))' }}
                    >
                      {speaker.image_url ? (
                        <Image src={speaker.image_url} alt={speaker.name} fill className="object-cover" />
                      ) : (
                        <>
                          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)' }} />
                          <div className="absolute inset-x-0 bottom-0 flex justify-center">
                            <div className="w-16 h-20 rounded-t-full opacity-20" style={{ background: 'var(--grey-500)', marginBottom: '-2px' }} />
                          </div>
                        </>
                      )}
                      {speaker.theme && (
                        <div className="absolute top-4 left-4">
                          <span className="tag-red text-[0.55rem]">{speaker.theme}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 space-y-1">
                      <p className="font-medium text-sm" style={{ color: 'var(--off-white)' }}>{speaker.name}</p>
                      <p className="text-xs" style={{ color: 'var(--grey-500)' }}>{speaker.title}</p>
                    </div>
                  </div>
                ))
              : [0, 1, 2, 3].map((i) => (
                  <div key={i} className="card-editorial">
                    <div
                      className="aspect-[3/4] relative overflow-hidden"
                      style={{ background: 'linear-gradient(160deg, var(--grey-900), var(--grey-800))' }}
                    >
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)' }} />
                      <div className="absolute top-4 left-4"><span className="tag-red">À venir</span></div>
                      <div className="absolute inset-x-0 bottom-0 flex justify-center">
                        <div className="w-16 h-20 rounded-t-full opacity-20" style={{ background: 'var(--grey-500)', marginBottom: '-2px' }} />
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="h-2.5 rounded-sm opacity-30" style={{ background: 'var(--grey-600)', width: '70%' }} />
                      <div className="h-2 rounded-sm opacity-20" style={{ background: 'var(--grey-600)', width: '50%' }} />
                    </div>
                  </div>
                ))}
          </div>

          <p
            className="text-center mt-10 font-label text-xs tracking-widest uppercase"
            style={{ color: 'var(--grey-600)' }}
          >
            {speakers.length === 0
              ? "Annonces de conférenciers à l'automne 2026"
              : `${speakers.length} conférencier${speakers.length > 1 ? 's' : ''} confirmé${speakers.length > 1 ? 's' : ''} — d'autres à venir`}
          </p>
        </div>
      </section>

      {/* ── 4. EXPERIENCE — magazine 3 colonnes, sans numéros, sans animations ── */}
      <section className="section-editorial px-6 md:px-12" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div className="mb-14 md:mb-20">
            <div className="eyebrow mb-4">L'expérience</div>
            <h2
              className="font-display font-light"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: 0.93, letterSpacing: '-0.025em', color: 'var(--off-white)', maxWidth: '26rem' }}
            >
              Une journée à part entière
            </h2>
          </div>

          <div className="grid md:grid-cols-3">
            {[
              {
                title: 'Des conférences\nqui inspirent',
                body: "Des intervenants d'exception partagent des idées qui méritent d'être entendues — en direct, sur scène, à Paris.",
              },
              {
                title: 'Un réseau\nchoisi',
                body: "Des moments structurés pour rencontrer chercheurs, ingénieurs, artistes et entrepreneurs venus de toute l'Europe.",
              },
              {
                title: "Un lieu\nd'exception",
                body: "Le Théâtre de Paris — une scène historique au cœur du 9e arrondissement, à la hauteur des idées qui s'y expriment.",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  paddingTop: '2.5rem',
                  paddingBottom: '2.5rem',
                  paddingLeft: i > 0 ? 'clamp(1.5rem, 3vw, 3rem)' : 0,
                  paddingRight: i < 2 ? 'clamp(1.5rem, 3vw, 3rem)' : 0,
                  borderRight: i < 2 ? '1px solid var(--border-subtle)' : 'none',
                }}
              >
                <div style={{ width: '2rem', height: '1px', background: 'var(--amber)', marginBottom: '2rem' }} />
                <h3
                  className="font-display font-normal mb-5"
                  style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2rem)', lineHeight: 1.1, color: 'var(--off-white)', whiteSpace: 'pre-line', letterSpacing: '-0.01em' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--grey-400)' }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PARTNERS ── */}
      <section className="section-editorial px-6 md:px-12" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', textAlign: 'center' }}>
          <div className="eyebrow mb-12">Partenaires institutionnels</div>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {[
              { src: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/IMT_logo_2017.png', alt: 'IMT', w: 80 },
              { src: 'https://eulist.university/wp-content/themes/eulist/images/logo-new.png', alt: 'EULiST', w: 100 },
              { src: 'https://www.imt-atlantique.fr/sites/default/files/ecole/logos/imtatlantique/imtatlantique-rvb-reserve.png', alt: 'IMT Atlantique', w: 130 },
            ].map((logo) => (
              <div key={logo.alt} className="grayscale hover:grayscale-0 opacity-50 hover:opacity-80 transition-all duration-300">
                <Image src={logo.src} alt={logo.alt} width={logo.w} height={40} className="object-contain h-8 md:h-10 w-auto" />
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/partners" className="font-label text-xs tracking-widest uppercase" style={{ color: 'var(--grey-600)' }}>
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
          <div className="eyebrow mb-5">Restez informés</div>
          <h2
            className="font-display font-light mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--off-white)' }}
          >
            Ne rien manquer
          </h2>
          <p className="text-sm md:text-base leading-relaxed mb-10" style={{ color: 'var(--grey-400)' }}>
            Annonces de conférenciers, programme, ouverture des inscriptions. Soyez les premiers informés.
          </p>
          {newsletterStatus === 'done' ? (
            <div className="py-5 font-label text-xs tracking-widest uppercase" style={{ color: 'var(--grey-300)' }}>
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
                className="flex-1 px-4 py-3 text-sm rounded-sm"
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
