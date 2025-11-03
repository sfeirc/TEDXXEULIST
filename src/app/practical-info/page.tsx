import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, MapPin, Clock, Calendar, MessageCircle } from 'lucide-react';

export default function PracticalInfo() {
  const faqs = [
    {
      question: "À qui s'adresse l'événement ?",
      answer: "L'événement s'adresse à tous ceux qui souhaitent découvrir des idées innovantes et inspirantes. Que vous soyez étudiant, professionnel ou curieux, TEDx IMT est ouvert à tous."
    },
    {
      question: "Comment puis-je assister à la conférence TEDx IMT ?",
      answer: "Pour assister à la conférence TEDx IMT, il vous suffit de vous inscrire en ligne via notre formulaire d'inscription. Les places sont limitées, alors ne tardez pas !"
    },
    {
      question: "Quels critères sont pris en compte pour sélectionner les intervenants ?",
      answer: "Les intervenants sont sélectionnés selon plusieurs critères : la pertinence et l'originalité de leur sujet, leur capacité à inspirer et captiver le public, ainsi que la clarté et l'impact de leur présentation. L'objectif est de garantir des talks mémorables et enrichissants pour tous les participants."
    },
    {
      question: "Y aura-t-il des pauses ou un moment de networking ?",
      answer: "Oui ! Un moment de networking est prévu de 18h15 à 22h, idéal pour échanger et rencontrer les intervenants ainsi que les autres participants. Pour plus de détails sur les horaires, consultez le programme disponible sur cette page."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black relative overflow-hidden">
      {/* Animated Background Orbs with Red-Blue Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-float delay-200"></div>
        
        {/* Gradient Lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600/20 to-transparent"></div>
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-blue-600/20 to-transparent"></div>
        </div>
      </div>

      <Navigation />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Informations Pratiques</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            Retrouvez ici toutes les informations dont vous avez besoin pour vivre pleinement l'expérience TEDx IMT.
          </p>
        </div>

        <section className="mb-16">
          <div className="bg-gradient-to-br from-blue-500/10 to-slate-800/50 rounded-2xl border border-blue-400/20 p-8">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-red-500" />
              Programme
            </h2>
            <div className="space-y-6">
              <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  Matin
                </h3>
                <p className="text-gray-300 italic">A priori, rien le matin</p>
              </div>
              <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  Après-midi
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>13h00 – 14h00</span>
                    <span>Accueil du public et ouverture des portes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>14h00 – 16h00</span>
                    <span>Première session de conférences</span>
                  </div>
                  <div className="flex justify-between">
                    <span>16h00 – 16h30</span>
                    <span>Pause et échanges informels</span>
                  </div>
                  <div className="flex justify-between">
                    <span>16h30 – 18h00</span>
                    <span>Deuxième session de conférences</span>
                  </div>
                  <div className="flex justify-between">
                    <span>18h15 – 22h00</span>
                    <span>Buffet & session de networking</span>
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
                <h3 className="text-xl font-semibold text-white mb-4">Cité des sciences et de l'industrie</h3>
                <div className="space-y-3 text-gray-300">
                  <p>30, avenue Corentin-Cariou</p>
                  <p>75019 Paris</p>
                </div>
              </div>
              <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
                <h4 className="font-semibold text-white mb-4">Comment S'y Rendre</h4>
                <div className="space-y-3 text-gray-300 text-sm">
                  <p><strong>Métro :</strong> ligne 7, station Porte de la Villette</p>
                  <p><strong>Bus :</strong> lignes 71, 139, 150, 152, station Porte de la Villette</p>
                  <p><strong>Tramway :</strong> T3b (Porte de Vincennes - Porte Dauphine), station Porte de la Villette</p>
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
            Pour toute question supplémentaire, veuillez nous contacter directement via la page dédiée.
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

      <Footer />
    </div>
  );
}