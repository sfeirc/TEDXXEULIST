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
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq4jUMcAyO5Ttl_f0mlqs-0UuLgrEQ4PPjOA&s"
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

      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Partenaires</h1>
          
          {/* Main Partnership Banner - TEDx style, IMT as white text */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="glass rounded-2xl p-8 border border-white/10">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-6">
                <div className="text-center">
                  <Image
                    src="https://landing-pages.ted.com/tedx-logo-generator/assets/logo.png"
                    alt="TEDx"
                    width={180}
                    height={60}
                    className="w-auto h-14 md:h-16 ted-logo-red"
                  />
                </div>
                <div className="text-4xl md:text-6xl font-bold text-white tracking-tight">×</div>
                <div className="text-center flex items-center">
                  <span className="font-bold text-white tracking-tight text-[3.5rem] md:text-[5.5rem]" style={{ letterSpacing: '-0.04em' }}>IMT</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 pt-6 border-t border-white/10">
                <span className="text-white/80 text-base font-medium">in partnership with</span>
                <Image
                  src="https://eulist.university/wp-content/themes/eulist/images/logo-new.png"
                  alt="EULiST"
                  width={140}
                  height={60}
                  className="w-auto h-12"
                />
              </div>
              <p className="text-white/80 text-center mt-6 max-w-2xl mx-auto">
                Une collaboration exceptionnelle entre TEDx et la Fondation IMT, soutenue par le réseau européen EULiST
              </p>
            </div>
          </div>
        </div>

        <section className="mb-16">
          <div className="glass rounded-2xl border border-white/10 p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Partenaires Institutionnels</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {institutionalPartners.map((partner, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6 text-center border border-white/10 hover:border-white/20 transition-all w-80 flex-shrink-0">
                  <div className="w-full h-32 rounded-lg flex items-center justify-center mx-auto mb-4 p-4 overflow-hidden">
                    {partner.name === 'Fondation IMT' ? (
                      <span className="text-4xl font-bold text-white tracking-tight">IMT</span>
                    ) : (
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={200}
                        height={100}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  <h3 className="font-semibold text-white mb-2">{partner.name}</h3>
                  <p className="text-white/70 text-sm">{partner.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="glass rounded-2xl p-8 text-center border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">Logos Sponsors</h2>
            <p className="text-xl text-white/80 mb-8">
              Derrière chaque idée, des partenaires engagés : découvrez ceux qui font briller TEDx IMT
            </p>
            <div className="bg-white/5 rounded-xl p-8 border border-white/10">
              <Building className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <p className="text-white/70">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="glass rounded-2xl border border-white/10 p-8">
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
          <div className="glass rounded-2xl border border-white/10 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Devenez Partenaire</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-6">
                Rejoignez-nous dans cette aventure pour diffuser des idées qui transforment et inspirent.
              </p>
            </div>

            <div className="text-center">
              <a 
                href="https://forms.google.com/partnership-application"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#e62b1e] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#c92419] transition-all"
              >
                <Handshake className="w-5 h-5" />
                Devenir Partenaire
              </a>
            </div>
            
            <p className="text-white/70 text-center mt-6 text-lg">
              Intéressé par un partenariat ? Rejoignez-nous pour faire partie de cette aventure.
            </p>
          </div>
        </section>

        <div className="text-center">
          <div className="glass rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Prêt à Collaborer?</h2>
            <p className="text-white/80 mb-6">
              Ensemble, créons un impact positif et partageons des idées qui changent le monde.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#e62b1e] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#c92419] transition-all"
              >
                <Handshake className="w-5 h-5" />
                Nous Contacter
              </Link>
              <a
                href="mailto:contact@tedxeulistparis.com"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all"
              >
                <ExternalLink className="w-5 h-5" />
                Envoyer Email
              </a>
            </div>
            <p className="text-white/70 text-center mt-6 text-lg">
              Vous souhaitez collaborer avec l'équipe d'organisation du projet TEDx IMT ? Contactez-nous pour en savoir plus.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}