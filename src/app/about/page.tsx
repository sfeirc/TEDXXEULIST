import Link from 'next/link';
import { ArrowLeft, Users, Target, Lightbulb, Globe } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#e62b1e]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Back Button */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors animate-fade-in">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 pb-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">À Propos du Projet</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Vous pourrez retrouver ici des informations générales concernant le projet TEDX IMT et son groupe d'organisation, ainsi que les objectifs de ce projet.
          </p>
        </div>

        {/* Origin Story */}
        <section className="mb-16">
          <div className="glass rounded-2xl border border-white/10 p-8">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-[#e62b1e]" />
              Notre Origine
            </h2>
            <div className="prose prose-invert text-white/80">
              <p>
                Nous sommes un groupe d'étudiants de l'IMT Atlantique, une école d'ingénieurs tournée vers l'innovation, la recherche et les grands défis de demain. Animés par la curiosité et l'envie de partager des idées qui inspirent, nous avons décidé d'organiser un événement TEDx pour donner la parole à celles et ceux qui font bouger les lignes.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="mb-16">
          <div className="glass rounded-2xl border border-white/10 p-8">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Target className="w-8 h-8 text-[#e62b1e]" />
              Notre Mission
            </h2>
            <div className="prose prose-invert text-white/80">
              <p className="mb-4">
                Notre mission est de faire rayonner les idées au sein de la communauté de l'IMT Atlantique, du groupe IMT et au-delà. À travers l'organisation d'un événement TEDx, nous souhaitons offrir une plateforme à celles et ceux qui osent penser différemment, repousser les limites et imaginer un futur plus durable, solidaire et créatif.
              </p>
              <p className="mb-4">
                Ancrés dans une dynamique nationale grâce au réseau du groupe IMT, et internationale par notre partenariat avec EuList, nous voulons encourager le dialogue entre cultures, disciplines et visions du monde.
              </p>
              <p>
                Nous aspirons à créer un espace d'échange où étudiants, chercheurs, entrepreneurs et citoyens peuvent partager leurs idées, s'inspirer mutuellement et agir ensemble pour relever les défis de demain.
              </p>
            </div>
          </div>
        </section>

        {/* Objectives */}
        <section className="mb-16">
          <div className="glass rounded-2xl border border-white/10 p-8">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-[#e62b1e]" />
              Nos Objectifs
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-[#e62b1e]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#e62b1e]/30">
                  <Lightbulb className="w-8 h-8 text-[#e62b1e]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Inspirer</h3>
                <p className="text-white/70">
                  Partager des idées fortes et innovantes qui éveillent la curiosité, suscitent la réflexion et donnent envie d'agir.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Connecter</h3>
                <p className="text-white/70">
                  Faire naître un véritable réseau d'échanges et d'opportunités, reliant étudiants, chercheurs et professionnels, au sein du groupe IMT et du partenariat EuList.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Collaborer</h3>
                <p className="text-white/70">
                  Favoriser l'échange et la co-création au sein de la communauté IMT et du réseau EuList pour imaginer un futur commun.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Project Creation Story */}
        <section className="mb-16">
          <div className="glass rounded-2xl border border-white/10 p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Notre Histoire</h2>
            <div className="prose prose-invert text-white/80">
              <p className="mb-4">
                Les conférences TED (Technology, Entertainment, Design) sont nées en 1984 en Californie, avec pour ambition de partager des idées innovantes et inspirantes à travers le monde. De simples rencontres entre experts, elles sont rapidement devenues un mouvement mondial, réunissant penseurs, chercheurs et créateurs autour du célèbre slogan "Ideas worth spreading."
              </p>
              <p>
                Face à cet engouement, le programme TEDx a été lancé en 2009 pour permettre à des communautés locales d'organiser leurs propres événements indépendants tout en respectant l'esprit TED. Aujourd'hui, des milliers de TEDx ont lieu chaque année dans plus de 150 pays, offrant une scène à celles et ceux qui veulent partager leur vision du monde et inspirer le changement à leur échelle.
              </p>
            </div>
          </div>
        </section>

        {/* TEDx License */}
        <section className="mb-16">
          <div className="glass rounded-2xl p-8 text-center border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Licence TEDx</h2>
            <p className="text-white/80">
              Pour organiser un événement TEDx, il est indispensable d'obtenir une licence officielle délivrée par TED. Celle-ci garantit le respect des valeurs, règles et standards du format, assurant une expérience fidèle à l'esprit "Ideas worth spreading."
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#e62b1e] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#c92419] transition-all"
          >
            Rejoignez Notre Mission
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}