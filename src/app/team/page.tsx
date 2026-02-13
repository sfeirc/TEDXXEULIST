import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

export default function Team() {
  const teamMembers = [
    {
      name: "Théo",
      role: "Directeur Général",
      team: "Direction",
      description: "Pilotage stratégique et direction de l'équipe organisatrice du TEDx. Assure la cohérence du projet et la coordination entre tous les pôles.",
      photo: "https://imgur.com/LeD6M4C.jpg"
    },
    {
      name: "Tiago",
      role: "Directeur Communication",
      team: "Communication",
      description: "Pilote la stratégie de communication et la visibilité du projet. Coordonne les supports, les réseaux sociaux et les canaux de diffusion du TEDx.",
      photo: "https://i.imgur.com/sH46wlg.jpeg"
    },
    {
      name: "Clovis",
      role: "Directeur Technique",
      team: "Technique",
      description: "Responsable de la technique événementielle : son, lumière, visuels et infrastructure technique. Garant du bon déroulement technique le jour J.",
      photo: "https://imgur.com/nAAULb5.jpg"
    },
    {
      name: "Valentin",
      role: "Relation Sponsors",
      team: "Partenariats",
      description: "En charge du développement des partenariats et de la relation avec les sponsors et mécènes. Assure le lien entre l'équipe et les soutiens du projet.",
      photo: "https://imgur.com/HS6y4mW.jpg"
    },
    {
      name: "Clarissa",
      role: "Coordinatrice Junior Entreprise France / Europe",
      team: "Coordination",
      description: "Coordination des échanges et des projets avec le réseau Junior Entreprise France et Europe. Interface avec le mouvement JE pour le TEDx.",
      photo: "https://i.imgur.com/sMOeQnw.jpeg"
    },
    {
      name: "Daner",
      role: "Manager Logistique",
      team: "Logistique",
      description: "Gère l’accès aux ressources et aux matériels nécessaires pour l’organisation du projet. Assure le respect des exigences (sécurité, accessibilité).",
      photo: "https://i.imgur.com/a2E8lRY.jpg"
    },
    {
      name: "Etienne",
      role: "Relations Conférenciers",
      team: "Coordination",
      description: "Mise en relation avec les intervenants de la conférence. Encadre et soutient les prises de parole sur le thème du TEDx.",
      photo: "https://imgur.com/0rTLU7d.jpg"
    },
    {
      name: "Leo",
      role: "Coordinateur Partenariats",
      team: "Partenariats",
      description: "Recherche et création de partenariats pour la mise en place du projet. Mise en relation entre l'équipe et les entreprises partenaires.",
      photo: "https://i.imgur.com/bk1Zigv.jpg"
    },
    {
      name: "Raphael",
      role: "Responsable Communication",
      team: "Communication",
      description: "Promotion du projet et visibilité de la conférence. Veille à l'image et à la cohérence des messages diffusés.",
      photo: "https://imgur.com/8GwceGM.jpg"
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
          <h1 className="text-5xl font-bold text-white mb-6">L'Équipe Organisatrice</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            L'organisation et la mise en œuvre du projet TEDX IMT ont été réalisées par une équipe d'étudiants issue du groupe IMT. L'organisation s'est vue être divisée en différents pôles d'action répartis entre tous les étudiants.
          </p>
        </div>

        <section className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="glass rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all card-hover group">
                <div className="text-center mb-5">
                  <div className="w-40 h-40 mx-auto mb-5 relative overflow-hidden rounded-full border-2 border-[#e62b1e]/50 group-hover:scale-105 transition-transform shadow-xl">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-[#e62b1e] font-medium text-base mb-3">{member.role}</p>
                  <span className="inline-block bg-white/10 text-white/80 text-sm px-4 py-1.5 rounded-full border border-white/20">
                    {member.team}
                  </span>
                </div>
                <p className="text-white/70 text-sm text-center leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}