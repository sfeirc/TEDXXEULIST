import Link from 'next/link';
import { ArrowLeft, Lock, Database, UserCheck, Cookie, Mail } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ScrollReveal } from '@/components/MotionElements';

export default function PrivacyPolicy() {
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
            <p className="page-eyebrow mb-4">RGPD / GDPR</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight">
              Privacy Policy
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              How we collect, use, and protect your personal data — in compliance with the General Data
              Protection Regulation (EU) 2016/679 (GDPR / RGPD).
            </p>
          </ScrollReveal>
        </div>

        {/* Who we are */}
        <section className="mb-8">
          <ScrollReveal>
            <div className="nuclear-card rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <UserCheck className="w-7 h-7 text-[#e62b1e] shrink-0" />
                Data Controller
              </h2>
              <div className="space-y-3 text-white/80 leading-relaxed">
                <p>
                  The data controller for this website is the <strong className="text-white">TEDx IMT Paris</strong>{' '}
                  student association, operating under the authority of IMT Atlantique, a French public
                  higher education institution.
                </p>
                <p>
                  For any privacy-related request, you can reach us at:{' '}
                  <a
                    href="mailto:tedximtparis@gmail.com"
                    className="text-[#e62b1e] hover:text-white transition-colors duration-200 underline underline-offset-4"
                  >
                    tedximtparis@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Data collected */}
        <section className="mb-8">
          <ScrollReveal>
            <div className="nuclear-card rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Database className="w-7 h-7 text-[#e62b1e] shrink-0" />
                Data We Collect
              </h2>
              <div className="space-y-6 text-white/80">
                <p className="leading-relaxed">
                  We only collect personal data that you voluntarily provide to us through our registration
                  form or contact form. We do not collect any data automatically beyond strictly functional
                  authentication cookies (see Cookies section below).
                </p>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    When you register for the event
                  </h3>
                  <ul className="space-y-2 text-white/75">
                    {[
                      { field: 'Full name', reason: 'To identify participants and prepare name badges' },
                      { field: 'Email address', reason: 'To send confirmation, updates, and event information' },
                      { field: 'Institution / school', reason: 'For event organization and demographic reporting' },
                    ].map(({ field, reason }) => (
                      <li key={field} className="flex gap-3">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#e62b1e] shrink-0" />
                        <span>
                          <strong className="text-white/90">{field}</strong> — {reason}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    When you contact us
                  </h3>
                  <ul className="space-y-2 text-white/75">
                    {[
                      { field: 'Full name', reason: 'To address you personally in our reply' },
                      { field: 'Email address', reason: 'To respond to your message' },
                      { field: 'Message content', reason: 'To process your inquiry' },
                    ].map(({ field, reason }) => (
                      <li key={field} className="flex gap-3">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#e62b1e] shrink-0" />
                        <span>
                          <strong className="text-white/90">{field}</strong> — {reason}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Purpose and legal basis */}
        <section className="mb-8">
          <ScrollReveal>
            <div className="nuclear-card rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Lock className="w-7 h-7 text-[#e62b1e] shrink-0" />
                Purpose &amp; Legal Basis
              </h2>
              <div className="space-y-5 text-white/80 leading-relaxed">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      purpose: 'Event organization',
                      basis: 'Performance of a contract (your registration constitutes an agreement to participate)',
                      detail:
                        'Managing registrations, preparing participant lists, sending event logistics, coordinating attendance.',
                    },
                    {
                      purpose: 'Communication',
                      basis: 'Legitimate interest',
                      detail:
                        'Sending event updates, schedule changes, speaker announcements, and post-event information directly related to TEDx IMT Paris.',
                    },
                    {
                      purpose: 'Contact replies',
                      basis: 'Legitimate interest',
                      detail:
                        'Responding to messages and inquiries you send us through the contact form.',
                    },
                    {
                      purpose: 'Compliance',
                      basis: 'Legal obligation',
                      detail:
                        'Maintaining records as required by applicable French and European law for associations.',
                    },
                  ].map(({ purpose, basis, detail }) => (
                    <div
                      key={purpose}
                      className="rounded-2xl border border-[#e62b1e]/15 bg-black/25 p-5"
                    >
                      <h3 className="text-base font-semibold text-white mb-1">{purpose}</h3>
                      <p className="text-xs uppercase tracking-wider text-[#e62b1e]/80 font-semibold mb-2">
                        {basis}
                      </p>
                      <p className="text-sm text-white/65 leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Retention */}
        <section className="mb-8">
          <ScrollReveal>
            <div className="nuclear-card rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Data Retention</h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  We retain your personal data for a maximum of{' '}
                  <strong className="text-white">2 years after the TEDx IMT Paris event</strong>.
                  After this period, your data is permanently deleted from our systems unless a longer
                  retention period is required by law.
                </p>
                <p>
                  Contact messages are retained for a maximum of 1 year, or until the inquiry is resolved,
                  whichever comes first.
                </p>
                <p>
                  You may request earlier deletion of your data at any time (see Your Rights below).
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Third parties */}
        <section className="mb-8">
          <ScrollReveal>
            <div className="nuclear-card rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Data Sharing &amp; Third Parties</h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <div className="flex gap-3 p-4 rounded-xl bg-[#e62b1e]/8 border border-[#e62b1e]/20">
                  <span className="text-[#e62b1e] font-bold text-lg shrink-0">✕</span>
                  <p>
                    <strong className="text-white">We do not sell your personal data</strong> to any
                    third party, under any circumstances.
                  </p>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-[#e62b1e]/8 border border-[#e62b1e]/20">
                  <span className="text-[#e62b1e] font-bold text-lg shrink-0">✕</span>
                  <p>
                    <strong className="text-white">We do not use your data for advertising</strong>{' '}
                    purposes or share it with advertising networks.
                  </p>
                </div>
                <p>
                  Your data is stored using <strong className="text-white">Supabase</strong>, a
                  database-as-a-service provider. Data is processed within the European Economic Area (EEA).
                  Supabase acts as a data processor on our behalf and is bound by GDPR-compliant data
                  processing agreements.
                </p>
                <p>
                  Network traffic passes through <strong className="text-white">Cloudflare</strong> for
                  security and performance (see our{' '}
                  <Link href="/legal" className="text-[#e62b1e] hover:text-white transition-colors duration-200 underline underline-offset-4">
                    Legal Notices
                  </Link>
                  ). Cloudflare processes IP addresses and HTTP request metadata as a data processor.
                </p>
                <p>
                  We do not share your personal data with any other third party without your explicit
                  consent, except as required by law.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Cookies */}
        <section className="mb-8">
          <ScrollReveal>
            <div className="nuclear-card rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Cookie className="w-7 h-7 text-[#e62b1e] shrink-0" />
                Cookies
              </h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  This website uses only <strong className="text-white">strictly functional cookies</strong>{' '}
                  necessary for authentication. These cookies are essential for the website to operate
                  correctly and cannot be disabled.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 pr-4 text-xs uppercase tracking-wider text-white/45 font-semibold">Cookie</th>
                        <th className="text-left py-3 pr-4 text-xs uppercase tracking-wider text-white/45 font-semibold">Purpose</th>
                        <th className="text-left py-3 text-xs uppercase tracking-wider text-white/45 font-semibold">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/70">
                      <tr className="border-b border-white/5">
                        <td className="py-3 pr-4 font-mono text-xs text-white/85">sb-auth-token</td>
                        <td className="py-3 pr-4">Authentication session (admin area only)</td>
                        <td className="py-3">Session</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-mono text-xs text-white/85">sb-refresh-token</td>
                        <td className="py-3 pr-4">Session renewal (admin area only)</td>
                        <td className="py-3">7 days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-white/55">
                  We do not use analytics cookies, advertising cookies, or any other tracking cookies.
                  No third-party tracking scripts are loaded on this website.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Your rights */}
        <section className="mb-8">
          <ScrollReveal>
            <div className="nuclear-card rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Mail className="w-7 h-7 text-[#e62b1e] shrink-0" />
                Your Rights (GDPR / RGPD)
              </h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  Under the General Data Protection Regulation (GDPR) and French data protection law
                  (loi Informatique et Libertés), you have the following rights regarding your personal data:
                </p>
                <ul className="space-y-3">
                  {[
                    {
                      right: 'Right of access',
                      desc: 'You may request a copy of all personal data we hold about you.',
                    },
                    {
                      right: 'Right to rectification',
                      desc: 'You may request correction of any inaccurate or incomplete data.',
                    },
                    {
                      right: 'Right to erasure ("right to be forgotten")',
                      desc: 'You may request the deletion of your personal data, subject to our legal retention obligations.',
                    },
                    {
                      right: 'Right to restriction of processing',
                      desc: 'You may request that we limit how we use your data in certain circumstances.',
                    },
                    {
                      right: 'Right to data portability',
                      desc: 'You may request your data in a structured, commonly used, machine-readable format.',
                    },
                    {
                      right: 'Right to object',
                      desc: 'You may object to processing based on legitimate interest at any time.',
                    },
                    {
                      right: 'Right to withdraw consent',
                      desc: 'Where processing is based on consent, you may withdraw it at any time without affecting prior processing.',
                    },
                  ].map(({ right, desc }) => (
                    <li key={right} className="flex gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#e62b1e] shrink-0" />
                      <span>
                        <strong className="text-white">{right}:</strong> {desc}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-white/10 rounded-xl bg-black/20 p-5">
                  <p className="text-white/90 font-medium mb-2">To exercise any of these rights:</p>
                  <p className="text-white/75">
                    Send your request to{' '}
                    <a
                      href="mailto:tedximtparis@gmail.com"
                      className="text-[#e62b1e] hover:text-white transition-colors duration-200 underline underline-offset-4"
                    >
                      tedximtparis@gmail.com
                    </a>
                    . We will respond within 30 days. You may also lodge a complaint with the French
                    data protection authority:{' '}
                    <a
                      href="https://www.cnil.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#e62b1e] hover:text-white transition-colors duration-200 underline underline-offset-4"
                    >
                      CNIL — www.cnil.fr
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Security */}
        <section className="mb-12">
          <ScrollReveal>
            <div className="nuclear-card rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Security</h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  We implement appropriate technical and organizational measures to protect your personal
                  data against unauthorized access, alteration, disclosure, or destruction. These include:
                </p>
                <ul className="space-y-2">
                  {[
                    'Encrypted connections (HTTPS / TLS) enforced on all traffic',
                    'Data stored in access-controlled databases with row-level security',
                    'Access to personal data restricted to authorized team members only',
                    'DDoS protection and network security via Cloudflare',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-white/75">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#e62b1e] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Footer note */}
        <ScrollReveal>
          <div className="text-center">
            <p className="text-white/35 text-sm">
              Last updated: June 2026 — This policy may be updated to reflect changes in our practices
              or applicable law. We will notify registered participants of material changes by email.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm text-white/45">
              <Link href="/legal" className="hover:text-[#e62b1e] transition-colors duration-200">
                Legal Notices
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
