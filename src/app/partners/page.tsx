import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, Handshake, Building, ExternalLink } from 'lucide-react';

export default function Partners() {
  const institutionalPartners = [
    { 
      name: "Fondation IMT", 
      description: "Institut Mines-Télécom", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/IMT_logo_2017.png"
    },
    { 
      name: "EULiST", 
      description: "European Universities", 
      logo: "https://eulist.university/wp-content/themes/eulist/images/logo-new.png"
    },
    { 
      name: "IMT Atlantique", 
      description: "Grande école d'ingénieurs", 
      logo: "https://www.imt-atlantique.fr/sites/default/files/ecole/logos/imtatlantique/imtatlantique-rvb-reserve.png"
    },
    { 
      name: "Union des Élèves de l'IMT", 
      description: "Sit amet consectetur", 
      logo: "https://www.union-eleves-imt.org/web/image/2638-d3f4ead9/IMT_UnionDesEleves_Logo_couleurs.webp"
    },
    { 
      name: "TEDx", 
      description: "Ideas Worth Spreading", 
      logo: "https://landing-pages.ted.com/tedx-logo-generator/assets/logo.png"
    }
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
          
          {/* Main Partnership Banner */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 border border-white/20">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-6">
                  {/* TEDx Logo */}
                  <div className="text-center">
                    <div className="relative">
                      <Image
                        src="https://landing-pages.ted.com/tedx-logo-generator/assets/logo.png" 
                        alt="TEDx Logo" 
                        width={180} 
                        height={60}
                        className="w-auto h-14 md:h-16 drop-shadow-2xl"
                      />
                      <div className="absolute inset-0 bg-red-600/30 blur-2xl -z-10"></div>
                    </div>
                  </div>
                  
                  <div className="text-4xl md:text-5xl font-bold text-gray-400">×</div>
                  
                  {/* IMT Logo */}
                  <div className="text-center">
                    <div className="relative">
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b0/IMT_logo_2017.png" 
                        alt="IMT Logo" 
                        width={240} 
                        height={70}
                        className="w-auto h-16 md:h-20 drop-shadow-2xl"
                      />
                      <div className="absolute inset-0 bg-cyan-500/30 blur-2xl -z-10"></div>
                    </div>
                  </div>
                </div>
                
                {/* Partnership with EULIST */}
                <div className="flex items-center justify-center gap-3 pt-6 border-t border-white/10">
                  <span className="text-blue-300 text-base font-medium">in partnership with</span>
                  <div className="relative">
                    <Image
                      src="https://eulist.university/wp-content/themes/eulist/images/logo-new.png" 
                      alt="EULiST" 
                      width={140} 
                      height={60}
                      className="w-auto h-12 drop-shadow-lg"
                    />
                  </div>
                </div>
                
                <p className="text-gray-300 text-center mt-6 max-w-2xl mx-auto">
                  Une collaboration exceptionnelle entre TEDx et la Fondation IMT, soutenue par le réseau européen EULiST
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-16">
          <div className="bg-gradient-to-br from-blue-500/10 to-slate-800/50 rounded-2xl border border-blue-400/20 p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Partenaires Institutionnels</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {institutionalPartners.map((partner, index) => (
                <div key={index} className="bg-slate-800/30 rounded-xl p-6 text-center border border-slate-700/50 hover:border-blue-400/40 transition-all group w-80 flex-shrink-0">
                  <div className="w-full h-32 rounded-lg flex items-center justify-center mx-auto mb-4 p-4 overflow-hidden transition-all">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={200}
                      height={100}
                      className="w-full h-full object-contain drop-shadow-lg"
                    />
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

      <Footer />
    </div>
  );
}