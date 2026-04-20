import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, Handshake, Building, ExternalLink } from 'lucide-react';

export default function Partners() {
  const institutionalPartners = [
    {
      name: 'IMT Foundation',
      description: 'Institut Mines-Télécom',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/IMT_logo_2017.png',
      useText: true as boolean,
    },
    {
      name: 'EULiST',
      description: 'European Universities',
      logo: 'https://eulist.university/wp-content/themes/eulist/images/logo-new.png',
      useText: false,
    },
    {
      name: 'IMT Atlantique',
      description: 'Graduate engineering school',
      logo: 'https://www.imt-atlantique.fr/sites/default/files/ecole/logos/imtatlantique/imtatlantique-rvb-reserve.png',
      useText: false,
    },
    {
      name: 'Union des Élèves de l’IMT',
      description: 'IMT student union',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq4jUMcAyO5Ttl_f0mlqs-0UuLgrEQ4PPjOA&s',
      useText: false,
    },
    {
      name: 'TEDx',
      description: 'Ideas worth spreading',
      logo: 'https://landing-pages.ted.com/tedx-logo-generator/assets/logo.png',
      useText: false,
    },
  ];

  const partnershipTiers = [
    {
      name: 'Platinum',
      amount: '€10,000+',
      benefits: ['Lorem ipsum dolor sit', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor', 'Incididunt ut labore'],
      emphasis: true,
    },
    {
      name: 'Gold',
      amount: '€5,000+',
      benefits: ['Ut enim ad minim', 'Quis nostrud exercitation', 'Ullamco laboris nisi'],
      emphasis: false,
    },
    {
      name: 'Silver',
      amount: '€2,500+',
      benefits: ['Duis aute irure', 'In reprehenderit voluptate', 'Velit esse cillum'],
      emphasis: false,
    },
    {
      name: 'Bronze',
      amount: '€1,000+',
      benefits: ['Excepteur sint', 'Cupidatat non proident'],
      emphasis: false,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden font-inter">
      <Navigation />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <Link href="/" className="back-link">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <p className="page-eyebrow mb-4">Support</p>
          <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight">Partners</h1>

          <div className="max-w-5xl mx-auto mb-12">
            <div className="nuclear-card rounded-3xl p-8 md:p-10">
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
                  <span
                    className="font-bold text-white tracking-tight text-[3.5rem] md:text-[5.5rem] bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent"
                    style={{ letterSpacing: '-0.04em' }}
                  >
                    IMT
                  </span>
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
                A collaboration between TEDx and the IMT Foundation, strengthened by the European EULiST network.
              </p>
            </div>
          </div>
        </div>

        <section className="mb-16">
          <div className="nuclear-card rounded-3xl p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">Institutional partners</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {institutionalPartners.map((partner, index) => (
                <div
                  key={index}
                  className="rounded-2xl p-6 text-center border border-[#e62b1e]/15 bg-black/35 hover:border-[#e62b1e]/35 transition-all w-80 flex-shrink-0 card-hover"
                >
                  <div className="w-full h-32 rounded-lg flex items-center justify-center mx-auto mb-4 p-4 overflow-hidden">
                    {partner.useText ? (
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
          <div className="nuclear-card rounded-3xl p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Sponsor logos</h2>
            <p className="text-xl text-white/80 mb-8">
              Behind every idea, partners who make TEDx IMT shine — logos will appear here.
            </p>
            <div className="rounded-2xl p-8 border border-[#e62b1e]/15 bg-black/40">
              <Building className="w-16 h-16 text-[#e62b1e]/50 mx-auto mb-4" />
              <p className="text-white/70">Placeholder — sponsor wall coming soon.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="nuclear-card rounded-3xl p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">Partnership tiers</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnershipTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`tier-nuclear rounded-xl p-6 text-white ${tier.emphasis ? 'tier-nuclear--pulse' : ''}`}
                >
                  <div className="text-center mb-6 relative z-[1]">
                    <h3 className="text-xl font-bold mb-2 text-[#fecaca]">{tier.name}</h3>
                    <div className="text-2xl font-bold bg-gradient-to-b from-white to-white/75 bg-clip-text text-transparent">
                      {tier.amount}
                    </div>
                  </div>
                  <ul className="space-y-3 relative z-[1]">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start gap-2 text-sm text-white/85">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e62b1e] shadow-[0_0_6px_rgba(230,43,30,0.9)]" />
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
          <div className="nuclear-card rounded-3xl p-8 md:p-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Become a partner</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-6">
                Join us in spreading ideas that transform and inspire.
              </p>
            </div>

            <div className="text-center">
              <a
                href="https://forms.google.com/partnership-application"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-nuclear-primary inline-flex items-center gap-2 px-10 py-4 rounded-full text-lg"
              >
                <Handshake className="w-5 h-5" />
                Apply as a partner
              </a>
            </div>

            <p className="text-white/70 text-center mt-6 text-lg">
              Interested in supporting TEDx IMT? We would love to hear from you.
            </p>
          </div>
        </section>

        <div className="text-center">
          <div className="nuclear-card rounded-3xl p-8 md:p-10 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to collaborate?</h2>
            <p className="text-white/80 mb-6">Let&apos;s build positive impact and share ideas that matter.</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Link href="/contact" className="btn-nuclear-primary inline-flex items-center gap-2 px-10 py-4 rounded-full text-lg">
                <Handshake className="w-5 h-5" />
                Contact us
              </Link>
              <a
                href="mailto:contact@tedxeulistparis.com"
                className="btn-nuclear-ghost inline-flex items-center gap-2 px-10 py-4 rounded-full text-lg"
              >
                <ExternalLink className="w-5 h-5" />
                Email us
              </a>
            </div>
            <p className="text-white/70 text-center mt-6 text-lg">
              Want to work with the TEDx IMT organizing team? Get in touch for more details.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
