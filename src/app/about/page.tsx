'use client';

import Link from 'next/link';
import { ArrowLeft, Users, Target, Lightbulb, Globe } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  TiltCard,
  MagneticWrapper,
} from '@/components/MotionElements';

export default function About() {
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
            <p className="page-eyebrow mb-4">Project</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight">About the project</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              General information about TEDx IMT, the organizing team, and what we are aiming for.
            </p>
          </ScrollReveal>
        </div>

        <section className="mb-16">
          <ScrollReveal>
            <TiltCard intensity={3}>
              <div className="nuclear-card rounded-3xl p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Users className="w-8 h-8 text-[#e62b1e] shrink-0" />
                  How we started
                </h2>
                <div className="prose prose-invert text-white/80 max-w-none">
                  <p>
                    We are students at IMT Atlantique — an engineering school focused on innovation, research, and
                    tomorrow&apos;s challenges. Driven by curiosity and a desire to share ideas that matter, we chose to host
                    a TEDx and give a platform to people who move things forward.
                  </p>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        </section>

        <section className="mb-16">
          <ScrollReveal>
            <TiltCard intensity={3}>
              <div className="nuclear-card rounded-3xl p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Target className="w-8 h-8 text-[#e62b1e] shrink-0" />
                  Our mission
                </h2>
                <div className="prose prose-invert text-white/80 max-w-none">
                  <p className="mb-4">
                    We want ideas to resonate across IMT Atlantique, the wider IMT network, and beyond. Through a TEDx, we
                    aim to give a stage to those who think differently, push limits, and imagine a more sustainable, caring,
                    and creative future.
                  </p>
                  <p className="mb-4">
                    Grounded nationally in IMT and internationally through EULiST, we foster dialogue across cultures,
                    disciplines, and worldviews.
                  </p>
                  <p>
                    We hope to create a space where students, researchers, entrepreneurs, and citizens can share ideas,
                    learn from each other, and act together on the challenges ahead.
                  </p>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        </section>

        <section className="mb-16">
          <ScrollReveal>
            <div className="nuclear-card rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-[#e62b1e] shrink-0" />
                Objectives
              </h2>
              <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.12}>
                {[
                  {
                    Icon: Lightbulb,
                    title: 'Inspire',
                    text: 'Share bold ideas that spark curiosity, reflection, and a desire to act.',
                  },
                  {
                    Icon: Globe,
                    title: 'Connect',
                    text: 'Build a network of exchange between students, researchers, and professionals — within IMT and with EULiST.',
                  },
                  {
                    Icon: Users,
                    title: 'Collaborate',
                    text: 'Encourage co-creation across the IMT community and EULiST to imagine a shared future.',
                  },
                ].map((obj) => (
                  <StaggerItem key={obj.title}>
                    <TiltCard intensity={6}>
                      <div className="text-center rounded-2xl border border-[#e62b1e]/20 bg-black/25 p-6 card-hover h-full">
                        <div className="bg-[#e62b1e]/15 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#e62b1e]/35 shadow-[0_0_30px_-8px_rgba(230,43,30,0.4)] animate-pulse-ring">
                          <obj.Icon className="w-8 h-8 text-[#e62b1e]" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{obj.title}</h3>
                        <p className="text-white/70 text-sm leading-relaxed">{obj.text}</p>
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
            <TiltCard intensity={3}>
              <div className="nuclear-card rounded-3xl p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Our story</h2>
                <div className="prose prose-invert text-white/80 max-w-none">
                  <p className="mb-4">
                    TED began in California in 1984 with a simple goal: spread powerful ideas. It grew into a global movement
                    around the motto <em>Ideas worth spreading</em>.
                  </p>
                  <p>
                    In 2009 TED launched TEDx so local communities could host independent events that stay true to TED&apos;s
                    spirit. Today thousands of TEDx events run every year in well over 100 countries — offering a stage to
                    anyone who wants to share a vision and inspire change.
                  </p>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        </section>

        <section className="mb-16">
          <ScrollReveal>
            <div className="nuclear-card rounded-3xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">TEDx license</h2>
              <p className="text-white/75 max-w-2xl mx-auto leading-relaxed">
                Running a TEDx requires an official license from TED. It ensures the format, values, and quality standards
                that keep the experience true to <em>Ideas worth spreading</em>.
              </p>
            </div>
          </ScrollReveal>
        </section>

        <ScrollReveal>
          <div className="text-center">
            <MagneticWrapper>
              <Link href="/contact" className="btn-nuclear-primary inline-flex items-center gap-2 px-10 py-4 rounded-full text-base">
                Join our mission
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </Link>
            </MagneticWrapper>
          </div>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
