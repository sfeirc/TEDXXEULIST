'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, Mail, MapPin, Send } from 'lucide-react';
import { submitContact } from '@/app/actions/contact';
import { subscribeNewsletter } from '@/app/actions/newsletter';

const contactInfo = [
  {
    icon: Mail,
    title: 'Conférenciers & propositions',
    details: 'tedx.imt2026@gmail.com',
    description: 'Candidature speaker, suggestion de talk, questions sur le line-up.',
  },
  {
    icon: Mail,
    title: 'Sponsoring & partenariats',
    details: 'tedximtpartenaire@gmail.com',
    description: 'Packages partenaires, niveaux de visibilité, partenariats institutionnels.',
  },
];

const labelClass = 'block text-xs font-medium uppercase tracking-widest mb-2' as const;
const inputStyle = {
  width: '100%',
  padding: '0.75rem 0',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(200,190,175,0.2)',
  color: 'var(--off-white)',
  fontSize: '0.9375rem',
  outline: 'none',
  transition: 'border-color 0.2s ease',
} as const;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: '', interest: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

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
    const result = await subscribeNewsletter(newsletterEmail);
    setNewsletterState(result.success ? 'done' : 'error');
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--black-deep)', color: 'var(--off-white)' }}>
      <Navigation />

      <div className="max-w-5xl mx-auto px-6 md:px-12 pt-28 pb-6">
        <Link href="/" className="back-link">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>
      </div>

      <main className="max-w-5xl mx-auto px-6 md:px-12 pb-24">

        {/* Header */}
        <div className="mb-16 pt-2">
          <div className="flex items-center gap-3 mb-6">
            <div style={{ width: '1.5rem', height: '1px', background: 'var(--amber)' }} />
            <span className="eyebrow" style={{ color: 'var(--amber)' }}>Contact</span>
          </div>
          <h1
            className="font-display font-light mb-5"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 0.93, letterSpacing: '-0.025em' }}
          >
            Nous écrire
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--grey-400)', maxWidth: '38rem' }}>
            Partenariats, bénévolat, candidature speaker, presse — nous répondons sous 24 h.
          </p>
        </div>

        <div
          className="mb-1 h-px"
          style={{ background: 'linear-gradient(90deg, var(--amber-dim), transparent)' }}
        />

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 md:gap-20 pt-12">

          {/* Left — form */}
          <div>
            {isSubmitted ? (
              <div style={{ borderTop: '1px solid var(--border-warm)', paddingTop: '2rem' }}>
                <p className="font-display font-light mb-2" style={{ fontSize: '1.75rem', color: 'var(--off-white)' }}>
                  Message envoyé
                </p>
                <p className="text-sm mb-8" style={{ color: 'var(--grey-400)' }}>
                  Merci — nous revenons vers vous sous 24 h.
                </p>
                <button
                  type="button"
                  onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '', interest: '' }); }}
                  className="font-label text-xs tracking-widest uppercase"
                  style={{ color: 'var(--ted-red)' }}
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                {formError && (
                  <p className="text-sm" style={{ color: 'var(--ted-red)' }}>{formError}</p>
                )}

                <div className="grid md:grid-cols-2 gap-7">
                  <div>
                    <label htmlFor="name" className={labelClass} style={{ color: 'var(--grey-600)' }}>Nom complet *</label>
                    <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} style={inputStyle} placeholder="Votre nom" autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass} style={{ color: 'var(--grey-600)' }}>Email *</label>
                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} style={inputStyle} placeholder="vous@email.com" autoComplete="email" />
                  </div>
                </div>

                <div>
                  <label htmlFor="interest" className={labelClass} style={{ color: 'var(--grey-600)' }}>Sujet</label>
                  <select id="interest" name="interest" value={formData.interest} onChange={handleInputChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="" style={{ background: 'var(--grey-900)' }}>Sélectionner</option>
                    <option value="general" style={{ background: 'var(--grey-900)' }}>Information générale</option>
                    <option value="speaker" style={{ background: 'var(--grey-900)' }}>Conférencier</option>
                    <option value="partnership" style={{ background: 'var(--grey-900)' }}>Partenariat</option>
                    <option value="team" style={{ background: 'var(--grey-900)' }}>Rejoindre l&apos;équipe</option>
                    <option value="media" style={{ background: 'var(--grey-900)' }}>Presse / Médias</option>
                    <option value="other" style={{ background: 'var(--grey-900)' }}>Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className={labelClass} style={{ color: 'var(--grey-600)' }}>Objet *</label>
                  <input type="text" id="subject" name="subject" required value={formData.subject} onChange={handleInputChange} style={inputStyle} placeholder="Objet de votre message" />
                </div>

                <div>
                  <label htmlFor="message" className={labelClass} style={{ color: 'var(--grey-600)' }}>Message *</label>
                  <textarea
                    id="message" name="message" required rows={5}
                    value={formData.message} onChange={handleInputChange}
                    style={{ ...inputStyle, resize: 'none' }}
                    placeholder="Votre message…"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{ opacity: isSubmitting ? 0.6 : 1 }}
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSubmitting ? 'Envoi…' : 'Envoyer'}
                </button>
              </form>
            )}
          </div>

          {/* Right — contact info */}
          <div className="space-y-10">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div key={info.title} style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-3.5 h-3.5" style={{ color: 'var(--grey-600)' }} />
                    <span className="eyebrow" style={{ color: 'var(--grey-600)' }}>{info.title}</span>
                  </div>
                  <a
                    href={`mailto:${info.details}`}
                    className="font-display font-light text-lg block mb-2"
                    style={{ color: 'var(--off-white)', letterSpacing: '-0.01em' }}
                  >
                    {info.details}
                  </a>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--grey-500)' }}>{info.description}</p>
                </div>
              );
            })}

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--grey-600)' }} />
                <span className="eyebrow" style={{ color: 'var(--grey-600)' }}>Lieu</span>
              </div>
              <p className="font-display font-light text-lg mb-1" style={{ color: 'var(--off-white)', letterSpacing: '-0.01em' }}>
                Théâtre de Paris
              </p>
              <p className="text-sm" style={{ color: 'var(--grey-500)' }}>32 rue Richer, 75009 Paris</p>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--grey-500)' }}>
                Nous répondons sous 24 heures, du lundi au vendredi.
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter strip */}
        <div
          className="mt-20 pt-12"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <div>
              <div className="eyebrow mb-3" style={{ color: 'var(--grey-600)' }}>Newsletter</div>
              <h2
                className="font-display font-light"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.02em', color: 'var(--off-white)', lineHeight: 1.1 }}
              >
                Rester dans la boucle
              </h2>
            </div>
            <div>
              {newsletterState === 'done' ? (
                <p className="font-label text-xs tracking-widest uppercase" style={{ color: 'var(--grey-400)' }}>
                  ✓ Vous êtes sur la liste
                </p>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-3">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    placeholder="votre@email.com"
                    style={{ ...inputStyle, flex: 1 }}
                    aria-label="Newsletter email"
                  />
                  <button type="submit" disabled={newsletterState === 'loading'} className="btn-primary whitespace-nowrap">
                    {newsletterState === 'loading' ? '…' : "S'inscrire"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
