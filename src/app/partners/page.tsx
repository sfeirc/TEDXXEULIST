import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, Handshake, Building, ExternalLink, Star } from 'lucide-react';
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  TiltCard,
  MagneticWrapper,
} from '@/components/MotionElements';
import type { Partner } from '@/types/database';

export const revalidate = 60;

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
    logo: '',
    useText: true as boolean,
  },
];

const forumStandBeforeTedx = 'Forum stand presence at the theatre before TEDx';

const partnershipTiers = [
  {
    name: 'Partner',
    amount: '€5,000',
    includesPrevious: false,
    popular: false,
    bullet: 'dot' as const,
    benefits: [
      'Logo on the website',
      'Social media mention',
      'Logo in the printed program',
      '5 VIP seats',
    ],
  },
  {
    name: 'Major',
    amount: '€10,000',
    includesPrevious: true,
    popular: true,
    bullet: 'dot' as const,
    benefits: [
      'Buffet stand',
      'Logo on hall screens',
      'Job dating access',
      '20 VIP seats',
      forumStandBeforeTedx,
    ],
  },
  {
    name: 'Principal',
    amount: '€20,000+',
    includesPrevious: true,
    popular: false,
    bullet: 'star' as const,
    benefits: [
      'Stage opening',
      'Sector exclusivity',
      'Early access to CV database',
      '50 VIP seats',
      forumStandBeforeTedx,
    ],
  },
];

async function getPartners(): Promise<Partner[]> {
  try {
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();
    const { data } = await supabase
      .from('partners')
      .select('*')
      .eq('is_published', true)
      .order('display_order');
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function Partners() {
  const partners = await getPartners();
  const hasPartners = partners.length > 0;

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
          <ScrollReveal>
            <p className="page-eyebrow mb-4">Support</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight">Partners</h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="max-w-5xl mx-auto mb-12">
              <TiltCard intensity={3}>
                <div className="nuclear-card rounded-3xl p-8 md:p-10">
                  <div className="flex items-center justify-center mb-6">
                    <Image
                      src="https://i.imgur.com/NSU2tVP.png"
                      alt="TEDx IMT Paris"
                      width={280}
                      height={70}
                      className="w-auto h-16 md:h-20"
                    />
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
              </TiltCard>
            </div>
          </ScrollReveal>
        </div>

        {/* Static institutional partners — always shown */}
        <section className="mb-16">
          <ScrollReveal>
            <div className="nuclear-card rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">Institutional partners</h2>
              <StaggerContainer className="flex flex-wrap justify-center gap-6" staggerDelay={0.08}>
                {institutionalPartners.map((partner, index) => (
                  <StaggerItem key={index}>
                    <TiltCard intensity={6}>
                      <div className="rounded-2xl p-6 text-center border border-[#e62b1e]/15 bg-black/35 hover:border-[#e62b1e]/35 transition-all duration-300 w-80 flex-shrink-0 card-hover">
                        <div className="w-full h-32 rounded-lg flex items-center justify-center mx-auto mb-4 p-4 overflow-hidden">
                          {partner.useText ? (
                            <span
                              className="text-4xl font-bold tracking-tight"
                              style={{ color: partner.name === 'TEDx' ? '#e62b1e' : 'white' }}
                            >
                              {partner.name === 'TEDx' ? 'TEDx' : 'IMT'}
                            </span>
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
                    </TiltCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>
        </section>

        {/* Dynamic partners from Supabase — only shown when records exist */}
        {hasPartners && (
          <section className="mb-16">
            <ScrollReveal>
              <div className="nuclear-card rounded-3xl p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">Our Partners</h2>
                <StaggerContainer className="flex flex-wrap justify-center gap-6" staggerDelay={0.08}>
                  {partners.map((partner) => (
                    <StaggerItem key={partner.id}>
                      <TiltCard intensity={6}>
                        <div className="rounded-2xl p-6 text-center border border-[#e62b1e]/15 bg-black/35 hover:border-[#e62b1e]/35 transition-all duration-300 w-80 flex-shrink-0 card-hover">
                          <div className="w-full h-32 rounded-lg flex items-center justify-center mx-auto mb-4 p-4 overflow-hidden">
                            {partner.logo_url ? (
                              <Image
                                src={partner.logo_url}
                                alt={partner.name}
                                width={200}
                                height={100}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <Building className="w-12 h-12 text-[#e62b1e]/50" />
                            )}
                          </div>
                          <h3 className="font-semibold text-white mb-2">{partner.name}</h3>
                          {partner.tier && (
                            <p className="text-white/50 text-xs uppercase tracking-widest mb-2">{partner.tier}</p>
                          )}
                          {partner.website_url && (
                            <a
                              href={partner.website_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[#e62b1e]/80 hover:text-[#e62b1e] text-xs transition-colors duration-200"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Visit website
                            </a>
                          )}
                        </div>
                      </TiltCard>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </ScrollReveal>
          </section>
        )}

        {/* Sponsor placeholder — shown only when no dynamic partners yet */}
        {!hasPartners && (
          <section className="mb-16">
            <ScrollReveal>
              <div className="nuclear-card rounded-3xl p-8 md:p-10 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Sponsor logos</h2>
                <p className="text-xl text-white/80 mb-8">
                  Behind every idea, partners who make TEDx IMT shine — logos will appear here.
                </p>
                <div className="rounded-2xl p-8 border border-[#e62b1e]/15 bg-black/40 animate-border-glow">
                  <Building className="w-16 h-16 text-[#e62b1e]/50 mx-auto mb-4" />
                  <p className="text-white/70">Sponsor logos will appear here as they are confirmed.</p>
                </div>
              </div>
            </ScrollReveal>
          </section>
        )}

        <section className="mb-16">
          <ScrollReveal>
            <div className="nuclear-card rounded-3xl p-8 md:p-10">
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide uppercase mb-3">
                  Partnership tiers
                </h2>
                <div className="h-1 w-20 rounded-full bg-[#e62b1e]" aria-hidden />
              </div>
              <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.12}>
                {partnershipTiers.map((tier, index) => (
                  <StaggerItem key={index}>
                    <TiltCard intensity={5}>
                      <div
                        className={`tier-nuclear rounded-xl p-6 text-white relative ${tier.popular ? 'tier-nuclear--pulse ring-2 ring-[#e62b1e]/50' : ''}`}
                      >
                        {tier.popular && (
                          <div className="absolute -top-3 left-1/2 z-[2] -translate-x-1/2 rounded-full border border-[#e62b1e]/40 bg-black/80 px-3 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[#fecaca] animate-pulse-ring">
                            Popular
                          </div>
                        )}
                        <div className="text-center mb-6 relative z-[1] pt-1">
                          <h3 className="text-xl font-bold mb-2 uppercase tracking-wide text-[#fecaca]">{tier.name}</h3>
                          <div
                            className={`text-2xl font-bold ${tier.popular ? 'text-[#e62b1e]' : 'bg-gradient-to-b from-white to-white/75 bg-clip-text text-transparent'}`}
                          >
                            {tier.amount}
                          </div>
                          {tier.includesPrevious && (
                            <p className="text-xs text-white/55 mt-3 leading-snug">Includes previous benefits +</p>
                          )}
                        </div>
                        <ul className="space-y-3 relative z-[1] text-left">
                          {tier.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="flex items-start gap-2 text-sm text-white/85">
                              {tier.bullet === 'star' ? (
                                <Star className="mt-0.5 h-4 w-4 shrink-0 fill-[#e62b1e] text-[#e62b1e]" aria-hidden />
                              ) : (
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e62b1e] shadow-[0_0_6px_rgba(230,43,30,0.9)]" />
                              )}
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TiltCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>
        </section>

        <section className="mb-16">
          <ScrollReveal>
            <div className="nuclear-card rounded-3xl p-8 md:p-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Become a partner</h2>
                <p className="text-xl text-white/80 max-w-3xl mx-auto mb-6">
                  Join us in spreading ideas that transform and inspire.
                </p>
              </div>

              <div className="text-center">
                <MagneticWrapper>
                  <a
                    href="https://forms.google.com/partnership-application"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-nuclear-primary inline-flex items-center gap-2 px-10 py-4 rounded-full text-lg"
                  >
                    <Handshake className="w-5 h-5" />
                    Apply as a partner
                  </a>
                </MagneticWrapper>
              </div>

              <p className="text-white/70 text-center mt-6 text-lg">
                Interested in supporting TEDx IMT? We would love to hear from you.
              </p>
            </div>
          </ScrollReveal>
        </section>

        <ScrollReveal>
          <div className="text-center">
            <TiltCard intensity={3}>
              <div className="nuclear-card rounded-3xl p-8 md:p-10 max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-4">Ready to collaborate?</h2>
                <p className="text-white/80 mb-6">Let&apos;s build positive impact and share ideas that matter.</p>
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                  <MagneticWrapper>
                    <Link href="/contact" className="btn-nuclear-primary inline-flex items-center gap-2 px-10 py-4 rounded-full text-lg">
                      <Handshake className="w-5 h-5" />
                      Contact us
                    </Link>
                  </MagneticWrapper>
                  <MagneticWrapper>
                    <a
                      href="mailto:contact@tedxeulistparis.com"
                      className="btn-nuclear-ghost inline-flex items-center gap-2 px-10 py-4 rounded-full text-lg"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Email us
                    </a>
                  </MagneticWrapper>
                </div>
                <p className="text-white/70 text-center mt-6 text-lg">
                  Want to work with the TEDx IMT organizing team? Get in touch for more details.
                </p>
              </div>
            </TiltCard>
          </div>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
