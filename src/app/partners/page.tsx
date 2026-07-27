import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, Building, ExternalLink } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/MotionElements';
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
    description: 'Universités européennes',
    logo: 'https://eulist.university/wp-content/themes/eulist/images/logo-new.png',
    useText: false,
  },
  {
    name: 'IMT Atlantique',
    description: 'École d\'ingénieurs',
    logo: 'https://www.imt-atlantique.fr/sites/default/files/ecole/logos/imtatlantique/imtatlantique-rvb-reserve.png',
    useText: false,
  },
  {
    name: 'Union des Élèves de l\'IMT',
    description: 'Association étudiante IMT',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq4jUMcAyO5Ttl_f0mlqs-0UuLgrEQ4PPjOA&s',
    useText: false,
  },
] as const;

const partnershipTiers = [
  {
    name: 'Partenaire',
    amount: '5 000 €',
    includesPrevious: false,
    popular: false,
    benefits: [
      'Logo sur le site web',
      'Mention sur les réseaux sociaux',
      'Logo dans le programme imprimé',
      '5 places VIP',
    ],
  },
  {
    name: 'Majeur',
    amount: '10 000 €',
    includesPrevious: true,
    popular: true,
    benefits: [
      'Stand au buffet',
      'Logo sur les écrans de la salle',
      'Accès job dating',
      '20 places VIP',
      'Stand forum avant le TEDx',
    ],
  },
  {
    name: 'Principal',
    amount: '20 000 €+',
    includesPrevious: true,
    popular: false,
    benefits: [
      'Ouverture de scène',
      'Exclusivité sectorielle',
      'Accès anticipé à la CVthèque',
      '50 places VIP',
      'Stand forum avant le TEDx',
    ],
  },
] as const;

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
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-6">
        <Link href="/" className="back-link">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        {/* Header */}
        <div className="mb-20 pt-4">
          <ScrollReveal>
            <p className="page-eyebrow mb-5">Partenaires</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Ils nous soutiennent
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-white/55 max-w-2xl leading-relaxed">
              Une collaboration entre TEDx et la Fondation IMT, renforcée par le réseau européen EULiST.
            </p>
          </ScrollReveal>
        </div>

        {/* Institutional partners */}
        <section className="mb-20">
          <ScrollReveal>
            <div className="border-t border-white/10 pt-10">
              <p className="page-eyebrow mb-8">Partenaires institutionnels</p>
              <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-0" staggerDelay={0.07}>
                {institutionalPartners.map((partner, index) => (
                  <StaggerItem key={index}>
                    <div className="border-r border-b border-white/8 p-6 flex flex-col items-center justify-center min-h-[120px] last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r md:[&:nth-child(4)]:border-r-0">
                      <div className="w-full h-16 flex items-center justify-center mb-3">
                        {partner.useText ? (
                          <span className="text-2xl font-bold tracking-tight" style={{ color: (partner.name as string).startsWith('TEDx') ? '#e62b1e' : 'white' }}>
                            {(partner.name as string).startsWith('TEDx') ? 'TEDx' : 'IMT'}
                          </span>
                        ) : (
                          <Image
                            src={partner.logo}
                            alt={partner.name}
                            width={140}
                            height={60}
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>
                      <p className="text-white/30 text-xs text-center">{partner.description}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>
        </section>

        {/* Dynamic partners */}
        {hasPartners && (
          <section className="mb-20">
            <ScrollReveal>
              <div className="border-t border-white/10 pt-10">
                <p className="page-eyebrow mb-8">Nos partenaires</p>
                <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-8" staggerDelay={0.08}>
                  {partners.map((partner) => (
                    <StaggerItem key={partner.id}>
                      <div className="border-t border-white/8 pt-6">
                        <div className="h-16 flex items-center mb-4">
                          {partner.logo_url ? (
                            <Image
                              src={partner.logo_url}
                              alt={partner.name}
                              width={160}
                              height={64}
                              className="h-full w-auto object-contain"
                            />
                          ) : (
                            <Building className="w-10 h-10 text-white/20" />
                          )}
                        </div>
                        <h3 className="font-display font-semibold text-white mb-1">{partner.name}</h3>
                        {partner.tier && (
                          <p className="text-white/35 text-xs uppercase tracking-widest mb-2">{partner.tier}</p>
                        )}
                        {partner.website_url && (
                          <a
                            href={partner.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[#e62b1e]/70 hover:text-[#e62b1e] text-xs transition-colors duration-200"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Visiter le site
                          </a>
                        )}
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </ScrollReveal>
          </section>
        )}

        {/* Sponsor placeholder */}
        {!hasPartners && (
          <section className="mb-20">
            <ScrollReveal>
              <div className="border-t border-white/10 pt-10">
                <p className="page-eyebrow mb-6">Sponsors</p>
                <p className="text-white/40 text-sm">Les logos de nos sponsors apparaîtront ici au fur et à mesure de leur confirmation.</p>
              </div>
            </ScrollReveal>
          </section>
        )}

        {/* Partnership tiers */}
        <section className="mb-20">
          <ScrollReveal>
            <div className="border-t border-white/10 pt-10">
              <p className="page-eyebrow mb-8">Niveaux de partenariat</p>
              <StaggerContainer className="grid md:grid-cols-3 gap-0" staggerDelay={0.1}>
                {partnershipTiers.map((tier) => (
                  <StaggerItem key={tier.name}>
                    <div className={`border-r border-white/8 last:border-r-0 pr-8 pl-8 first:pl-0 py-2 ${tier.popular ? 'relative' : ''}`}>
                      {tier.popular && (
                        <span className="text-[#e62b1e] font-label text-[0.6rem] uppercase tracking-widest mb-3 block">Le plus choisi</span>
                      )}
                      <div className="mb-6">
                        <h3 className="font-display font-semibold text-white text-2xl mb-1">{tier.name}</h3>
                        <p className="text-white/40 text-sm font-mono">{tier.amount}</p>
                        {tier.includesPrevious && (
                          <p className="text-white/25 text-xs mt-2">Inclut les avantages précédents +</p>
                        )}
                      </div>
                      <ul className="space-y-2.5">
                        {tier.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-white/65">
                            <span className="mt-2 w-1 h-1 rounded-full bg-[#e62b1e] shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>
        </section>

        {/* Become a partner CTA */}
        <ScrollReveal>
          <div className="border-t border-white/10 pt-10">
            <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end">
              <div>
                <h2 className="font-display font-semibold text-white text-3xl md:text-4xl mb-3 leading-tight">
                  Devenir partenaire
                </h2>
                <p className="text-white/50 leading-relaxed max-w-xl">
                  Vous souhaitez soutenir TEDx IMT Paris ? Contactez notre équipe partenariats pour en savoir plus.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                  Nous contacter
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
                <a
                  href="mailto:partenariats@tedximtparis.com"
                  className="btn-outline inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Par email
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
