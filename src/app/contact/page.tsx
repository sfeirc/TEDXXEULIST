'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, Mail, MapPin, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal, TiltCard, MagneticWrapper } from '@/components/MotionElements';
import { submitContact } from '@/app/actions/contact';
import { subscribeNewsletter } from '@/app/actions/newsletter';

const contactInfo = [
  {
    icon: Mail,
    title: 'Speakers & talk proposals',
    details: 'tedx.imt2026@gmail.com',
    description: 'Apply to speak, suggest a talk, or ask about the speaker line-up.',
  },
  {
    icon: Mail,
    title: 'Sponsorship & partnerships',
    details: 'tedximtpartenaire@gmail.com',
    description: 'Sponsor packages, partner tiers, and institutional visibility.',
  },
];

const labelClass = 'block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: '', interest: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [newsletterError, setNewsletterError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    const result = await submitContact({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      interest: formData.interest || undefined,
    });
    setIsSubmitting(false);
    if (result.success) {
      setIsSubmitted(true);
    } else {
      setFormError(result.error);
    }
  };

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterState('loading');
    setNewsletterError('');
    const result = await subscribeNewsletter(newsletterEmail);
    if (result.success) {
      setNewsletterState('done');
    } else {
      setNewsletterState('error');
      setNewsletterError(result.error);
    }
  };

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
          <ScrollReveal>
            <p className="page-eyebrow mb-4">Direct</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight">Contact</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Partnerships, volunteering, media — get in touch.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <ScrollReveal direction="left">
            <TiltCard intensity={3}>
              <div className="nuclear-card rounded-3xl p-8 md:p-10">
                <h2 className="text-2xl font-bold text-white mb-8">Send a message</h2>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="text-center py-10"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#e62b1e]/40 bg-[#e62b1e]/10 shadow-[0_0_50px_-14px_rgba(230,43,30,0.55)]"
                      >
                        <Send className="h-9 w-9 text-[#e62b1e]" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-white mb-2">Message sent</h3>
                      <p className="text-white/65 mb-8 text-sm leading-relaxed">Thank you — we&apos;ll get back to you shortly.</p>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: '', email: '', subject: '', message: '', interest: '' });
                        }}
                        className="text-[#e62b1e] hover:text-white text-sm font-semibold underline-offset-4 hover:underline"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      {formError && (
                        <div className="rounded-xl bg-red-900/30 border border-red-500/40 p-3 text-sm text-red-300">
                          {formError}
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className={labelClass}>Full name *</label>
                          <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} className="input-nuclear" placeholder="Your name" autoComplete="name" />
                        </div>
                        <div>
                          <label htmlFor="email" className={labelClass}>Email *</label>
                          <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} className="input-nuclear" placeholder="you@email.com" autoComplete="email" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="interest" className={labelClass}>Area of interest</label>
                        <select id="interest" name="interest" value={formData.interest} onChange={handleInputChange} className="input-nuclear appearance-none bg-[#0a0a0a]">
                          <option value="">Select</option>
                          <option value="general">General information</option>
                          <option value="speaker">Speaker</option>
                          <option value="partnership">Partnership</option>
                          <option value="team">Join the team</option>
                          <option value="media">Media</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="subject" className={labelClass}>Subject *</label>
                        <input type="text" id="subject" name="subject" required value={formData.subject} onChange={handleInputChange} className="input-nuclear" placeholder="Subject" />
                      </div>

                      <div>
                        <label htmlFor="message" className={labelClass}>Message *</label>
                        <textarea id="message" name="message" required rows={6} value={formData.message} onChange={handleInputChange} className="input-nuclear resize-none" placeholder="Your message..." />
                      </div>

                      <MagneticWrapper className="w-full">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-nuclear-primary w-full flex items-center justify-center gap-2 rounded-xl py-3.5 px-6 text-base disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <><div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />Sending...</>
                          ) : (
                            <><Send className="h-5 w-5" />Send message</>
                          )}
                        </button>
                      </MagneticWrapper>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </TiltCard>
          </ScrollReveal>

          <div className="space-y-8">
            <ScrollReveal direction="right">
              <TiltCard intensity={4}>
                <div className="nuclear-card rounded-3xl p-8 md:p-10">
                  <h2 className="text-2xl font-bold text-white mb-6">Details</h2>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => {
                      const IconComponent = info.icon;
                      return (
                        <div key={index} className="flex items-start gap-4 group">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#e62b1e]/35 bg-[#e62b1e]/10 shadow-[0_0_24px_-8px_rgba(230,43,30,0.35)] group-hover:shadow-[0_0_36px_-8px_rgba(230,43,30,0.55)] transition-shadow duration-300">
                            <IconComponent className="h-6 w-6 text-[#e62b1e]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{info.title}</h3>
                            <a href={`mailto:${info.details}`} className="text-[#e62b1e] hover:text-white font-medium text-sm transition-colors duration-200">{info.details}</a>
                            <p className="mt-1 text-sm text-white/60">{info.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <TiltCard intensity={4}>
                <div className="nuclear-card rounded-3xl p-8 md:p-10">
                  <h2 className="text-2xl font-bold text-white mb-6">Location</h2>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#e62b1e]/35 bg-[#e62b1e]/10">
                      <MapPin className="h-6 w-6 text-[#e62b1e]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Théâtre de Paris</h3>
                      <p className="text-white/75 text-sm mt-2 leading-relaxed">32 rue Richer<br />75009 Paris, France</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="nuclear-card rounded-3xl p-6 md:p-8">
                <h3 className="text-lg font-semibold text-white mb-2">Response time</h3>
                <p className="text-white/65 text-sm leading-relaxed">We aim to reply within 24 hours.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal>
          <div className="mt-16 nuclear-card rounded-3xl p-8 md:p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Stay informed</h2>
            <p className="text-white/65 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join the TEDx IMT journey — be the first to hear about speakers, tickets, and event updates.
            </p>

            <AnimatePresence mode="wait">
              {newsletterState === 'done' ? (
                <motion.p
                  key="done"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#e62b1e] font-semibold"
                >
                  You&apos;re on the list. We&apos;ll be in touch!
                </motion.p>
              ) : (
                <motion.form
                  key="newsletter"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleNewsletter}
                  className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row"
                >
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    placeholder="Your email"
                    className="input-nuclear flex-1"
                    aria-label="Newsletter email"
                  />
                  <MagneticWrapper>
                    <button
                      type="submit"
                      disabled={newsletterState === 'loading'}
                      className="btn-nuclear-primary whitespace-nowrap px-8 py-3 rounded-xl text-sm font-semibold disabled:opacity-50"
                    >
                      {newsletterState === 'loading' ? 'Subscribing…' : 'Subscribe'}
                    </button>
                  </MagneticWrapper>
                </motion.form>
              )}
            </AnimatePresence>

            {newsletterState === 'error' && (
              <p className="mt-3 text-sm text-red-400">{newsletterError}</p>
            )}
          </div>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
