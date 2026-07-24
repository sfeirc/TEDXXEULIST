import Link from 'next/link';
import { ArrowLeft, FileText, Server, Globe, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ScrollReveal } from '@/components/MotionElements';

export default function LegalNotices() {
  return (
    <div className="min-h-screen relative overflow-hidden font-inter">
      <Navigation />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-6">
        <Link href="/" className="back-link animate-fade-in">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 pb-20">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="page-eyebrow mb-4">Legal</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight">
              Legal Notices
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Mandatory information pursuant to French law n° 2004-575 of June 21, 2004 on confidence in
              the digital economy (LCEN).
            </p>
          </ScrollReveal>
        </div>

        {/* Site Publisher */}
        <section className="mb-8">
          <ScrollReveal>
            <div className="nuclear-card rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <FileText className="w-7 h-7 text-[#e62b1e] shrink-0" />
                Site Publisher
              </h2>
              <dl className="space-y-4 text-white/80">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-white/45 mb-1">
                    Organisation
                  </dt>
                  <dd className="text-base leading-relaxed">
                    TEDx IMT Paris — student association operating under the authority of{' '}
                    <strong className="text-white">IMT Atlantique</strong>, a French public higher education
                    and research institution (Grande École).
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-white/45 mb-1">
                    Legal form
                  </dt>
                  <dd className="text-base leading-relaxed">
                    Student association affiliated with IMT Atlantique, a public institution of a scientific,
                    cultural, and professional nature (EPSCP) under French law.
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-white/45 mb-1">
                    Registered address
                  </dt>
                  <dd className="text-base leading-relaxed">
                    IMT Atlantique — Campus de Paris<br />
                    75013 Paris, France
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-white/45 mb-1">
                    Contact
                  </dt>
                  <dd className="text-base">
                    <a
                      href="mailto:tedximtparis@gmail.com"
                      className="text-[#e62b1e] hover:text-white transition-colors duration-200 underline underline-offset-4"
                    >
                      tedximtparis@gmail.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-white/45 mb-1">
                    Publication director
                  </dt>
                  <dd className="text-base leading-relaxed">
                    The president of the TEDx IMT Paris student association.
                  </dd>
                </div>
              </dl>
            </div>
          </ScrollReveal>
        </section>

        {/* Hosting */}
        <section className="mb-8">
          <ScrollReveal>
            <div className="nuclear-card rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Server className="w-7 h-7 text-[#e62b1e] shrink-0" />
                Hosting
              </h2>
              <dl className="space-y-4 text-white/80">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-white/45 mb-1">
                    Infrastructure
                  </dt>
                  <dd className="text-base leading-relaxed">
                    This website is self-hosted and served via{' '}
                    <strong className="text-white">Cloudflare Tunnel</strong>, a secure tunnel service
                    provided by Cloudflare, Inc. Traffic is routed through Cloudflare's global network
                    for performance and DDoS protection.
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-white/45 mb-1">
                    Network provider
                  </dt>
                  <dd className="text-base leading-relaxed">
                    Cloudflare, Inc.<br />
                    101 Townsend St, San Francisco, CA 94107, USA<br />
                    <a
                      href="https://www.cloudflare.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#e62b1e] hover:text-white transition-colors duration-200 underline underline-offset-4"
                    >
                      www.cloudflare.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-white/45 mb-1">
                    Server location
                  </dt>
                  <dd className="text-base leading-relaxed">
                    Physical server operated by IMT Atlantique, France. Edge nodes located within
                    Cloudflare's European points of presence.
                  </dd>
                </div>
              </dl>
            </div>
          </ScrollReveal>
        </section>

        {/* TEDx License */}
        <section className="mb-8">
          <ScrollReveal>
            <div className="nuclear-card rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Globe className="w-7 h-7 text-[#e62b1e] shrink-0" />
                TEDx License
              </h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  TEDx IMT Paris is an independently organized TEDx event, operated under a license granted
                  by <strong className="text-white">TED Conferences LLC</strong>, a Delaware limited
                  liability company headquartered in New York, USA.
                </p>
                <p>
                  The TEDx program allows communities around the world to host their own local TED-like
                  events. In organizing TEDx IMT Paris, we follow all rules and guidelines set by TED
                  Conferences LLC to ensure the event meets TED's standards for quality and intellectual
                  integrity.
                </p>
                <p>
                  The TED name, TEDx name, and associated logos are trademarks of TED Conferences LLC.
                  Their use on this site is made strictly within the scope of the TEDx license granted
                  to the organizing team and does not imply any other affiliation with or endorsement by
                  TED Conferences LLC.
                </p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-sm text-white/55">
                    More information about the TEDx program:{' '}
                    <a
                      href="https://www.ted.com/about/programs-initiatives/tedx-program"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#e62b1e] hover:text-white transition-colors duration-200 underline underline-offset-4"
                    >
                      ted.com/about/programs-initiatives/tedx-program
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Intellectual Property */}
        <section className="mb-8">
          <ScrollReveal>
            <div className="nuclear-card rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Shield className="w-7 h-7 text-[#e62b1e] shrink-0" />
                Intellectual Property
              </h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  All content on this website — including but not limited to texts, photographs, graphics,
                  logos, and the overall design — is the exclusive property of the TEDx IMT Paris organizing
                  team, unless otherwise stated.
                </p>
                <p>
                  Any reproduction, distribution, modification, adaptation, retransmission, or publication
                  of any of these elements, even partially, without the express written consent of the
                  TEDx IMT Paris team and, where applicable, TED Conferences LLC, is strictly prohibited.
                </p>
                <p>
                  Any unauthorized use may constitute an infringement punishable under French intellectual
                  property law (Code de la propriété intellectuelle).
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Disclaimer */}
        <section className="mb-12">
          <ScrollReveal>
            <div className="nuclear-card rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Disclaimer</h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  TEDx IMT Paris endeavors to ensure that the information provided on this website is
                  accurate and up to date. However, we make no warranty as to the accuracy, completeness,
                  or timeliness of the information published.
                </p>
                <p>
                  External links are provided for convenience only. TEDx IMT Paris has no control over
                  the content of external websites and accepts no liability in connection with their use.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Footer note */}
        <ScrollReveal>
          <div className="text-center">
            <p className="text-white/35 text-sm">
              Last updated: June 2026 — For any question, contact us at{' '}
              <a
                href="mailto:tedximtparis@gmail.com"
                className="text-[#e62b1e] hover:text-white transition-colors duration-200"
              >
                tedximtparis@gmail.com
              </a>
            </p>
            <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm text-white/45">
              <Link href="/privacy" className="hover:text-[#e62b1e] transition-colors duration-200">
                Privacy Policy
              </Link>
              <span aria-hidden>·</span>
              <Link href="/" className="hover:text-[#e62b1e] transition-colors duration-200">
                Back to home
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
