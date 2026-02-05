'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    interest: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Général",
      details: "contact@tedxeulistparis.com",
      description: "Pour toute question générale ou demande d'information"
    },
    {
      icon: Mail,
      title: "Équipe",
      details: "team@tedxeulistparis.com",
      description: "Contacter ici le groupe d'organisation du projet TEDX IMT"
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#e62b1e]/5 rounded-full blur-3xl"></div>
      </div>

      <Navigation />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Contactez-Nous</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Si vous rencontrez un problème ou souhaitez obtenir plus d'informations, n'hésitez pas à nous contacter.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass rounded-2xl border border-white/10 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Envoyez-nous un Message</h2>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-400/30">
                  <Send className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Message Envoyé!</h3>
                <p className="text-gray-300 mb-6">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
                <button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '', interest: '' });
                  }}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Nom Complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-[#e62b1e] focus:border-transparent"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-[#e62b1e] focus:border-transparent"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-300 mb-2">
                    Domaine d'Intérêt
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-[#e62b1e] focus:border-transparent"
                  >
                    <option value="">Sélectionner</option>
                    <option value="general">Information Générale</option>
                    <option value="speaker">Conférencier</option>
                    <option value="partnership">Partenariat</option>
                    <option value="team">Rejoindre l'Équipe</option>
                    <option value="media">Média</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Sujet *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-[#e62b1e] focus:border-transparent"
                    placeholder="Sujet du message"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-[#e62b1e] focus:border-transparent resize-none"
                    placeholder="Votre message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#e62b1e] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#c92419] focus:ring-2 focus:ring-[#e62b1e] focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer le Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="glass rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Coordonnées</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#e62b1e]/20 rounded-full flex items-center justify-center flex-shrink-0 border border-[#e62b1e]/30">
                        <IconComponent className="w-6 h-6 text-[#e62b1e]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{info.title}</h3>
                        <a href={`mailto:${info.details}`} className="text-[#e62b1e] hover:text-white font-medium">
                          {info.details}
                        </a>
                        <p className="text-white/70 text-sm mt-1">{info.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="glass rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Localisation</h2>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#e62b1e]/20 rounded-full flex items-center justify-center flex-shrink-0 border border-[#e62b1e]/30">
                  <MapPin className="w-6 h-6 text-[#e62b1e]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Cité des sciences et de l'industrie</h3>
                  <p className="text-white/80">
                    30, avenue Corentin-Cariou<br />
                    75019 Paris
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">Temps de Réponse</h3>
              <p className="text-white/80 text-sm">
                Nous nous engageons à vous répondre dans les plus brefs délais (sous 24h).
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 glass rounded-2xl p-8 text-center border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4">Restez Informé</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Rejoignez l'aventure TEDx IMT en vous inscrivant ci-dessous !
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-[#e62b1e] focus:border-transparent"
            />
            <button className="bg-[#e62b1e] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#c92419] transition-all whitespace-nowrap">
              S'inscrire
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}