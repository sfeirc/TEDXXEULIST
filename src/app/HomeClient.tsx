'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import { ArrowRight, ArrowDown, MapPin, Calendar, Users, ChevronRight, Mail } from 'lucide-react';
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

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

type Props = {
  settings: Record<string, string>;
  speakers: Speaker[];
};

export default function HomeClient({ settings, speakers }: Props) {
  const countdown = useCountdown(settings['event_date_iso'] ?? '2027-02-22T09:00:00+01:00');
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const heroHeadline = settings['hero_headline'] ?? 'What Connects Us';
  const eventDateDisplay = settings['event_date_display'] ?? '22 February 2027';
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

  const headlineParts = heroHeadline.split(' ');
  const firstWord = headlineParts[0];
  const middleWord = headlineParts[1];
  const lastWord = headlineParts.slice(2).join(' ') || '';

  return (
    <div className="min-h-screen" style={{ background: 'var(--black-deep)', color: 'var(--off-white)' }}>
      <Navigation />

      {/* ── 1. HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-y-0 left-0 w-1/2 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://i.imgur.com/m8Y6ao9.png)' }}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/2 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://i.imgur.com/jWYW67W.jpeg)' }}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(7,7,6,0.6)' }} />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 90% 60% at 50% -5%, rgba(230,43,30,0.11) 0%, transparent 60%)' }}
          />
          {/* Red accent radial */}
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 90% 60% at 50% -5%, rgba(230,43,30,0.13) 0%, transparent 60%)' }}
          />
          {/* Bottom fade to page */}
          <div
            className="absolute bottom-0 left-0 right-0 h-48"
            style={{ background: 'linear-gradient(to top, var(--black-deep), transparent)' }}
          />
        </div>

        {/* Hero headline */}
        <h1
          className="font-display font-light text-display text-center mb-8 md:mb-10"
          style={{ maxWidth: '900px', animation: 'heroFadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s both' }}
        >
          <span className="block" style={{ color: 'var(--off-white)' }}>{firstWord}</span>
          <span className="block italic" style={{ color: 'var(--ted-red)' }}>{middleWord}</span>
          {lastWord && <span className="block" style={{ color: 'var(--off-white)' }}>{lastWord}</span>}
        </h1>

        {/* Event metadata */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-10 md:mb-12"
          style={{ color: 'var(--grey-400)', animation: 'heroFadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s both' }}
        >
          <span className="flex items-center gap-2 text-xs font-label tracking-widest uppercase">
            <Calendar className="w-3 h-3" style={{ color: 'var(--ted-red)' }} />
            {eventDateDisplay}
          </span>
          <span className="hidden md:block w-px h-3.5" style={{ background: 'var(--border-warm)' }} />
          <span className="flex items-center gap-2 text-xs font-label tracking-widest uppercase">
            <MapPin className="w-3 h-3" style={{ color: 'var(--ted-red)' }} />
            {venue}
          </span>
          <span className="hidden md:block w-px h-3.5" style={{ background: 'var(--border-warm)' }} />
          <span className="flex items-center gap-2 text-xs font-label tracking-widest uppercase">
            <Users className="w-3 h-3" style={{ color: 'var(--ted-red)' }} />
            Paris, France
          </span>
        </div>

        {/* CTA row */}
        <div
          className="flex flex-col sm:flex-row gap-4 mb-16 md:mb-20"
          style={{ animation: 'heroFadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.65s both' }}
        >
          <Link href="/register" className="btn-primary">
            Reserve Your Seat <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link href="/programme" className="btn-outline">
            View Programme
          </Link>
        </div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="grid grid-cols-4 gap-3 md:gap-4 w-full max-w-sm mx-auto"
        >
          {[
            { value: countdown.days, label: 'Days' },
            { value: countdown.hours, label: 'Hours' },
            { value: countdown.minutes, label: 'Min' },
            { value: countdown.seconds, label: 'Sec' },
          ].map(({ value, label }) => (
            <div
              key={label} className="text-center py-3.5 px-2 rounded-sm"
              style={{ border: '1px solid var(--border-warm)', background: 'var(--surface-1)' }}
            >
              <div
                className="font-display font-light tabular-nums"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: 'var(--white)' }}
              >
                {String(value).padStart(2, '0')}
              </div>
              <div className="eyebrow mt-1" style={{ fontSize: '0.55rem' }}>{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="eyebrow" style={{ fontSize: '0.55rem' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.7, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-3.5 h-3.5" style={{ color: 'var(--grey-600)' }} />
          </motion.div>
        </motion.div>
      </section>

      {/* TEDx disclaimer band */}
      <div className="section-divider-line" />
      <div className="py-4 px-6 text-center">
        <p className="eyebrow" style={{ fontSize: '0.6rem', color: 'var(--grey-600)' }}>
          TEDx IMT Paris is independently organized by students of IMT engineering schools · Licensed by TED Conferences LLC
        </p>
      </div>
      <div className="section-divider-line" />

      {/* ── 2. MANIFESTO ── */}
      <section className="section-editorial px-6 md:px-12" style={{ maxWidth: '68rem', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="eyebrow mb-6">The Theme · 2027</div>
          <h2 className="font-display font-light text-headline mb-10 md:mb-14" style={{ color: 'var(--off-white)' }}>
            What<br />
            <em className="italic" style={{ color: 'var(--ted-red)' }}>Connects</em>
            <br />Us
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {[
            'In an era of unprecedented connectivity, we are paradoxically more disconnected than ever. What are the invisible threads that bind us — across cultures, disciplines, and generations?',
            'TEDx IMT Paris 2027 gathers thinkers, engineers, artists, and entrepreneurs to explore the forces that connect — and sometimes divide — our world.',
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-body-lg leading-relaxed" style={{ color: 'var(--grey-300)' }}
            >
              {text}
            </motion.p>
          ))}
        </div>
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 1.3, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 h-px origin-left"
          style={{ background: 'linear-gradient(90deg, var(--ted-red), rgba(230,43,30,0.15), transparent)' }}
        />
      </section>

      {/* ── 3. SPEAKERS ── */}
      <section className="section-editorial px-6 md:px-12">
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8 }}
            >
              <div className="eyebrow mb-4">Line-up</div>
              <h2 className="font-display font-light text-title" style={{ color: 'var(--off-white)' }}>Speakers</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link href="/speakers" className="flex items-center gap-1.5 font-label text-xs tracking-widest uppercase transition-colors" style={{ color: 'var(--grey-400)' }}>
                All speakers <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {speakers.length > 0 ? speakers.slice(0, 4).map((speaker, i) => (
              <motion.div
                key={speaker.id}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="card-editorial"
              >
                <div className="aspect-[3/4] relative overflow-hidden"
                  style={{ background: 'linear-gradient(160deg, var(--grey-900), var(--grey-800))' }}>
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
              </motion.div>
            )) : [0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="card-editorial"
              >
                <div className="aspect-[3/4] relative overflow-hidden"
                  style={{ background: 'linear-gradient(160deg, var(--grey-900), var(--grey-800))' }}>
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)' }} />
                  <div className="absolute top-4 left-4"><span className="tag-red">TBA</span></div>
                  <div className="absolute inset-x-0 bottom-0 flex justify-center">
                    <div className="w-16 h-20 rounded-t-full opacity-20" style={{ background: 'var(--grey-500)', marginBottom: '-2px' }} />
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="h-2.5 rounded-sm opacity-30" style={{ background: 'var(--grey-600)', width: '70%' }} />
                  <div className="h-2 rounded-sm opacity-20" style={{ background: 'var(--grey-600)', width: '50%' }} />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.45 }}
            className="text-center mt-10 font-label text-xs tracking-widest uppercase"
            style={{ color: 'var(--grey-600)' }}
          >
            {speakers.length === 0 ? 'Speaker announcements coming autumn 2026' : `${speakers.length} speaker${speakers.length > 1 ? 's' : ''} confirmed — more to be announced`}
          </motion.p>
        </div>
      </section>

      {/* ── 5. EXPERIENCE ── */}
      <section className="section-editorial px-6 md:px-12">
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9 }}
            className="mb-12 md:mb-16"
          >
            <div className="eyebrow mb-4">The Experience</div>
            <h2 className="font-display font-light text-title" style={{ color: 'var(--off-white)', maxWidth: '28rem' }}>
              A day unlike any other
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {[
              { num: '01', title: 'Inspiring Talks', body: 'Ten speakers sharing ideas worth spreading — live on stage in Paris.' },
              { num: '02', title: 'Curated Networking', body: 'Structured moments to connect with researchers, engineers, artists and changemakers across disciplines.' },
              { num: '03', title: 'An Iconic Venue', body: 'Théâtre de Paris — an extraordinary historic stage for extraordinary ideas.' },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="card-editorial p-8 md:p-10"
              >
                <div className="font-display font-light mb-6" style={{ fontSize: 'clamp(3rem, 5vw, 4rem)', color: 'var(--ted-red)', opacity: 0.35 }}>
                  {card.num}
                </div>
                <h3 className="font-display font-medium text-xl md:text-2xl mb-4" style={{ color: 'var(--off-white)' }}>{card.title}</h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--grey-400)' }}>{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. PARTNERS ── */}
      <section className="section-editorial px-6 md:px-12" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="eyebrow mb-3">Institutional Partners</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-10 md:gap-16"
          >
            {[
              { src: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/IMT_logo_2017.png', alt: 'IMT', w: 80 },
              { src: 'https://eulist.university/wp-content/themes/eulist/images/logo-new.png', alt: 'EULiST', w: 100 },
              { src: 'https://www.imt-atlantique.fr/sites/default/files/ecole/logos/imtatlantique/imtatlantique-rvb-reserve.png', alt: 'IMT Atlantique', w: 130 },
            ].map((logo) => (
              <div key={logo.alt} className="transition-all duration-300 grayscale hover:grayscale-0 opacity-50 hover:opacity-80">
                <Image src={logo.src} alt={logo.alt} width={logo.w} height={40} className="object-contain h-8 md:h-10 w-auto" />
              </div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-10"
          >
            <Link href="/partners" className="font-label text-xs tracking-widest uppercase transition-colors" style={{ color: 'var(--grey-600)' }}>
              Become a partner →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 7. NEWSLETTER ── */}
      <section
        className="section-editorial px-6 md:px-12"
        style={{ background: 'var(--grey-900)', borderTop: '1px solid var(--border-subtle)' }}
      >
        <div style={{ maxWidth: '40rem', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9 }}
          >
            <div className="eyebrow mb-5">Stay informed</div>
            <h2 className="font-display font-light text-title mb-4" style={{ color: 'var(--off-white)' }}>
              Don&apos;t miss a thing
            </h2>
            <p className="text-sm md:text-base leading-relaxed mb-10" style={{ color: 'var(--grey-400)' }}>
              Speaker announcements, programme updates, registration openings. Be the first to know.
            </p>
            {newsletterStatus === 'done' ? (
              <div className="py-5 font-label text-xs tracking-widest uppercase" style={{ color: 'var(--grey-300)' }}>
                ✓ You&apos;re on the list
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com" required
                  className="flex-1 px-4 py-3 text-sm rounded-sm"
                  style={{ background: 'var(--surface-1)', border: '1px solid var(--border-warm)', color: 'var(--off-white)', outline: 'none' }}
                />
                <button type="submit" disabled={newsletterStatus === 'loading'} className="btn-primary whitespace-nowrap">
                  <Mail className="w-3.5 h-3.5" />
                  {newsletterStatus === 'loading' ? 'Subscribing…' : 'Subscribe'}
                </button>
              </form>
            )}
            {newsletterStatus === 'error' && (
              <p className="mt-3 text-xs" style={{ color: 'var(--ted-red)' }}>Something went wrong. Please try again.</p>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
