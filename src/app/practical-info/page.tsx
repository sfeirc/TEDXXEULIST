import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { ArrowLeft, MapPin, Clock, Calendar, MessageCircle } from 'lucide-react';

export default function PracticalInfo() {
  const faqs = [
    {
      question: "Lorem ipsum dolor sit amet?",
      answer: "Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      question: "Ut enim ad minim veniam?",
      answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      question: "Duis aute irure dolor?",
      answer: "In reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      question: "Excepteur sint occaecat?",
      answer: "Cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation currentPage="info" />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
      </div>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Informations Pratiques</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
          </p>
        </div>

        <section className="mb-16">
          <div className="bg-gradient-to-br from-blue-500/10 to-slate-800/50 rounded-2xl border border-blue-400/20 p-8">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-red-500" />
              Programme
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  Matin
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>08:30 - 09:00</span>
                    <span>Lorem ipsum</span>
                  </div>
                  <div className="flex justify-between">
                    <span>09:00 - 10:30</span>
                    <span>Dolor sit amet</span>
                  </div>
                  <div className="flex justify-between">
                    <span>10:45 - 12:30</span>
                    <span>Consectetur adipiscing</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  Après-midi
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>12:30 - 14:00</span>
                    <span>Elit sed do</span>
                  </div>
                  <div className="flex justify-between">
                    <span>14:00 - 16:00</span>
                    <span>Eiusmod tempor</span>
                  </div>
                  <div className="flex justify-between">
                    <span>16:00 - 18:00</span>
                    <span>Incididunt ut</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-gradient-to-br from-red-500/10 to-slate-800/50 rounded-2xl border border-red-400/20 p-8">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <MapPin className="w-8 h-8 text-blue-400" />
              Lieu & Accès
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Télécom Paris</h3>
                <div className="space-y-3 text-gray-300">
                  <p>19 Place Marguerite Perey</p>
                  <p>91120 Palaiseau, France</p>
                  <p className="text-sm text-gray-400 mt-4">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.
                  </p>
                </div>
              </div>
              <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
                <h4 className="font-semibold text-white mb-4">Comment S'y Rendre</h4>
                <div className="space-y-3 text-gray-300 text-sm">
                  <p>🚊 RER B jusqu'à Massy-Palaiseau</p>
                  <p>🚗 Parking gratuit disponible</p>
                  <p>✈️ 45 min depuis CDG</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-gradient-to-br from-blue-500/10 to-slate-800/50 rounded-2xl border border-blue-400/20 p-8">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <MessageCircle className="w-8 h-8 text-yellow-400" />
              FAQ
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-slate-700/50 pb-6 last:border-b-0">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="text-center">
          <div className="bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Encore Des Questions?</h2>
            <p className="text-gray-300 mb-6">
              Lorem ipsum dolor sit amet consectetur adipiscing elit.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-red-700 hover:to-red-600 transition-all shadow-lg shadow-red-500/30"
            >
              <MessageCircle className="w-5 h-5" />
              Contactez-Nous
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}