'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, Ticket, CheckCircle, Calendar, MapPin } from 'lucide-react';
import { submitRegistration } from '@/app/actions/registration';

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
    <div className="min-h-screen" style={{ background: 'var(--black-deep)', color: 'var(--off-white)' }}>
      <Navigation />

      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-28 pb-6">
        <Link href="/" className="back-link">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>
      </div>

      <main className="max-w-4xl mx-auto px-6 md:px-12 pb-24">

        {/* Header */}
        <div className="mb-14 pt-2">
          <div className="flex items-center gap-3 mb-6">
            <div style={{ width: '1.5rem', height: '1px', background: 'var(--amber)' }} />
            <span className="eyebrow" style={{ color: 'var(--amber)' }}>Inscription</span>
          </div>
          <h1
            className="font-display font-light mb-5"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 0.93, letterSpacing: '-0.025em' }}
          >
            Réserver ma place
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--grey-400)', maxWidth: '36rem' }}>
            Les places sont limitées et soumises à confirmation.
          </p>
        </div>

        {/* Event facts strip */}
        <div
          className="grid md:grid-cols-3 gap-0 mb-14"
          style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}
        >
          {[
            { icon: Calendar, label: 'Date', value: '22 février 2027' },
            { icon: MapPin, label: 'Lieu', value: 'Théâtre de Paris, 75009' },
            { icon: Ticket, label: 'Format', value: 'Soirée complète — talks & networking' },
          ].map(({ icon: Icon, label, value }, i) => (
            <div
              key={label}
              className="flex items-center gap-4 py-5"
              style={{
                paddingLeft: i > 0 ? '2rem' : 0,
                paddingRight: i < 2 ? '2rem' : 0,
                borderLeft: i > 0 ? '1px solid var(--border-subtle)' : 'none',
              }}
            >
              <Icon className="w-4 h-4 shrink-0" style={{ color: 'var(--grey-600)' }} />
              <div>
                <p className="eyebrow mb-0.5" style={{ fontSize: '0.55rem', color: 'var(--grey-600)' }}>{label}</p>
                <p className="text-sm" style={{ color: 'var(--grey-300)' }}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form / Success */}
        {isSubmitted ? (
          <div style={{ borderTop: '1px solid var(--border-warm)', paddingTop: '2rem' }}>
            <div className="flex items-center gap-3 mb-5">
              <CheckCircle className="w-5 h-5" style={{ color: 'var(--ted-red)' }} />
              <p className="font-display font-light text-2xl" style={{ color: 'var(--off-white)' }}>
                Inscription enregistrée
              </p>
            </div>
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--grey-400)', maxWidth: '34rem' }}>
              Merci, <strong style={{ color: 'var(--off-white)' }}>{formData.name}</strong>&nbsp;!
              Votre inscription est en attente de confirmation. Nous vous écrirons à{' '}
              <strong style={{ color: 'var(--off-white)' }}>{formData.email}</strong> dès que votre place sera confirmée.
            </p>
            <Link href="/" className="btn-outline inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour à l&apos;accueil
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-7">
            {error && (
              <p className="text-sm" style={{ color: 'var(--ted-red)' }}>{error}</p>
            )}

            <div className="grid md:grid-cols-2 gap-7">
              <div>
                <label htmlFor="name" className={labelClass} style={{ color: 'var(--grey-600)' }}>Nom complet *</label>
                <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} style={inputStyle} placeholder="Votre nom" autoComplete="name" />
              </div>
              <div>
                <label htmlFor="email" className={labelClass} style={{ color: 'var(--grey-600)' }}>Email *</label>
                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} style={inputStyle} placeholder="vous@email.com" autoComplete="email" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-7">
              <div>
                <label htmlFor="institution" className={labelClass} style={{ color: 'var(--grey-600)' }}>Établissement / École</label>
                <input type="text" id="institution" name="institution" value={formData.institution} onChange={handleChange} style={inputStyle} placeholder="IMT, Sorbonne…" />
              </div>
              <div>
                <label htmlFor="role" className={labelClass} style={{ color: 'var(--grey-600)' }}>Votre rôle</label>
                <input type="text" id="role" name="role" value={formData.role} onChange={handleChange} style={inputStyle} placeholder="Étudiant, Chercheur, Ingénieur…" />
              </div>
            </div>

            <div>
              <label htmlFor="motivation" className={labelClass} style={{ color: 'var(--grey-600)' }}>
                Pourquoi souhaitez-vous participer ?{' '}
                <span style={{ color: 'var(--grey-700)', textTransform: 'none', letterSpacing: 0 }}>(facultatif)</span>
              </label>
              <textarea
                id="motivation" name="motivation" rows={4}
                value={formData.motivation} onChange={handleChange}
                style={{ ...inputStyle, resize: 'none' }}
                placeholder="Ce qui vous attire dans cet événement…"
                maxLength={1000}
              />
            </div>

            <p className="text-xs leading-relaxed" style={{ color: 'var(--grey-600)' }}>
              En vous inscrivant, vous acceptez que vos nom et email soient conservés pour la gestion de votre inscription.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{ opacity: isSubmitting ? 0.6 : 1 }}
            >
              <Ticket className="w-3.5 h-3.5" />
              {isSubmitting ? 'Envoi…' : 'Réserver ma place'}
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
