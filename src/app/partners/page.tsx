import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { ArrowLeft, Handshake, Building, ExternalLink } from 'lucide-react';

export default function Partners() {
  const institutionalPartners = [
    { name: "IMT", description: "Institut Mines-Télécom", logo: "IMT" },
    { name: "EULiST", description: "European Universities", logo: "EULiST" },
    { name: "Fondation IMT", description: "Lorem ipsum dolor", logo: "F-IMT" },
    { name: "Union des Élèves", description: "Sit amet consectetur", logo: "UE" }
  ];

  const partnershipTiers = [
    {
      name: "Platine",
      amount: "€10,000+",
      benefits: ["Lorem ipsum dolor sit", "Consectetur adipiscing elit", "Sed do eiusmod tempor", "Incididunt ut labore"],
      color: "from-slate-700 to-slate-800 border-slate-600"
    },
    {
      name: "Or",
      amount: "€5,000+",
      benefits: ["Ut enim ad minim", "Quis nostrud exercitation", "Ullamco laboris nisi"],
      color: "from-yellow-600 to-yellow-700 border-yellow-500"
    },
    {
      name: "Argent",
      amount: "€2,500+",
      benefits: ["Duis aute irure", "In reprehenderit voluptate", "Velit esse cillum"],
      color: "from-gray-400 to-gray-500 border-gray-400"
    },
    {
      name: "Bronze",
      amount: "€1,000+",
      benefits: ["Excepteur sint", "Cupidatat non proident"],
      color: "from-orange-600 to-orange-700 border-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black relative overflow-hidden">
      {/* Animated Background Orbs with Red-Blue Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-float delay-200"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-800 rounded-full"></div>
        
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

      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Partenaires</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
          </p>
        </div>

        <section className="mb-16">
          <div className="bg-gradient-to-br from-blue-500/10 to-slate-800/50 rounded-2xl border border-blue-400/20 p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Partenaires Institutionnels</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {institutionalPartners.map((partner, index) => (
                <div key={index} className="bg-slate-800/30 rounded-xl p-6 text-center border border-slate-700/50 hover:border-blue-400/40 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
                    <span className="text-blue-400 font-bold text-sm">{partner.logo}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">{partner.name}</h3>
                  <p className="text-gray-400 text-sm">{partner.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-gradient-to-r from-red-500/10 via-blue-500/10 to-slate-800/50 rounded-2xl p-8 text-center border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">Logos Sponsors</h2>
            <p className="text-xl text-gray-300 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="bg-slate-800/30 rounded-xl p-8 border border-slate-700/50">
              <Building className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-gradient-to-br from-blue-500/10 to-slate-800/50 rounded-2xl border border-blue-400/20 p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Niveaux de Partenariat</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnershipTiers.map((tier, index) => (
                <div key={index} className={`bg-gradient-to-br ${tier.color} rounded-xl p-6 text-white border`}>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                    <div className="text-2xl font-bold">{tier.amount}</div>
                  </div>
                  <ul className="space-y-3">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-gradient-to-br from-red-500/10 to-slate-800/50 rounded-2xl border border-red-400/20 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Devenez Partenaire</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
              </p>
            </div>

            <div className="text-center">
              <a 
                href="https://forms.google.com/partnership-application"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-red-700 hover:to-red-600 transition-all shadow-lg shadow-red-500/30"
              >
                <Handshake className="w-5 h-5" />
                Devenir Partenaire
              </a>
            </div>
          </div>
        </section>

        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-slate-800/50 rounded-2xl p-8 border border-blue-400/20">
            <h2 className="text-2xl font-bold text-white mb-4">Prêt à Collaborer?</h2>
            <p className="text-gray-300 mb-6">
              Lorem ipsum dolor sit amet consectetur adipiscing elit.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/30"
              >
                <Handshake className="w-5 h-5" />
                Nous Contacter
              </Link>
              <a 
                href="mailto:partnerships@tedxeulistparis.com"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all"
              >
                <ExternalLink className="w-5 h-5" />
                Envoyer Email
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}