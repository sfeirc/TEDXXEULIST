'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, Ticket, CheckCircle, Calendar, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal, TiltCard, MagneticWrapper } from '@/components/MotionElements';
import { submitRegistration } from '@/app/actions/registration';

const labelClass = 'block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', institution: '', role: '', motivation: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    const result = await submitRegistration({
      name: formData.name,
      email: formData.email,
      institution: formData.institution || undefined,
      role: formData.role || undefined,
      motivation: formData.motivation || undefined,
    });
    setIsSubmitting(false);
    if (result.success) {
      setIsSubmitted(true);
    } else {
      setError(result.error);
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

      <main className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="page-eyebrow mb-4">22 February 2027</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-bold text-4xl md:text-6xl text-white mb-6 tracking-tight">Register</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Secure your spot at TEDx IMT Paris — an evening of ideas, connection, and inspiration.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Calendar, label: 'Date', value: '22 February 2027' },
            { icon: MapPin, label: 'Venue', value: 'Théâtre de Paris, Paris' },
            { icon: Ticket, label: 'Format', value: 'Full evening — talks + networking' },
          ].map(({ icon: Icon, label, value }) => (
            <ScrollReveal key={label}>
              <div className="nuclear-card rounded-2xl p-5 text-center">
                <Icon className="w-6 h-6 text-[#e62b1e] mx-auto mb-2" />
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">{label}</p>
                <p className="text-white font-semibold text-sm">{value}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <TiltCard intensity={3}>
            <div className="nuclear-card rounded-3xl p-8 md:p-12">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                      className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-[#e62b1e]/40 bg-[#e62b1e]/10 shadow-[0_0_60px_-14px_rgba(230,43,30,0.6)]"
                    >
                      <CheckCircle className="h-12 w-12 text-[#e62b1e]" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-white mb-3">Registration received</h2>
                    <p className="text-white/65 max-w-md mx-auto leading-relaxed mb-8">
                      Thank you, <strong className="text-white">{formData.name}</strong>! Your registration is pending confirmation. We&apos;ll email you at <strong className="text-white">{formData.email}</strong> once your spot is confirmed.
                    </p>
                    <Link href="/" className="btn-nuclear-ghost inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm">
                      <ArrowLeft className="w-4 h-4" />
                      Back to home
                    </Link>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-white mb-8">Your information</h2>

                    {error && (
                      <div className="rounded-xl bg-red-900/30 border border-red-500/40 p-3 text-sm text-red-300">
                        {error}
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className={labelClass}>Full name *</label>
                        <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="input-nuclear" placeholder="Your full name" autoComplete="name" />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClass}>Email *</label>
                        <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="input-nuclear" placeholder="you@email.com" autoComplete="email" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="institution" className={labelClass}>Institution / School</label>
                        <input type="text" id="institution" name="institution" value={formData.institution} onChange={handleChange} className="input-nuclear" placeholder="IMT, Sorbonne…" />
                      </div>
                      <div>
                        <label htmlFor="role" className={labelClass}>Your role</label>
                        <input type="text" id="role" name="role" value={formData.role} onChange={handleChange} className="input-nuclear" placeholder="Student, Researcher, Engineer…" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="motivation" className={labelClass}>Why do you want to attend? <span className="text-white/30">(optional)</span></label>
                      <textarea id="motivation" name="motivation" rows={4} value={formData.motivation} onChange={handleChange} className="input-nuclear resize-none" placeholder="Tell us what draws you to this event…" maxLength={1000} />
                    </div>

                    <p className="text-white/35 text-xs leading-relaxed">
                      By registering, you agree that your name and email will be stored securely to manage your registration. Seats are limited and subject to confirmation.
                    </p>

                    <MagneticWrapper className="w-full">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-nuclear-primary w-full flex items-center justify-center gap-2 rounded-xl py-4 px-6 text-base disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <><div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />Submitting…</>
                        ) : (
                          <><Ticket className="h-5 w-5" />Register my spot</>
                        )}
                      </button>
                    </MagneticWrapper>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </TiltCard>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
