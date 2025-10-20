import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

export default function Team() {
  const teamMembers = [
    {
      name: "Antoine",
      role: "Coordinateur Général",
      team: "Coordination",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.",
      photo: "https://i.imgur.com/4HCB0To.jpg"
    },
    {
      name: "Clovis",
      role: "Directeur Communication",
      team: "Communication",
      description: "Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore.",
      photo: "https://i.imgur.com/LlBFi0N.jpg"
    },
    {
      name: "Daner",
      role: "Manager Logistique",
      team: "Logistique",
      description: "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi.",
      photo: "https://i.imgur.com/a2E8lRY.jpg"
    },
    {
      name: "Etienne",
      role: "Relations Conférenciers",
      team: "Coordination",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
      photo: "https://i.imgur.com/QoB5jl6.jpg"
    },
    {
      name: "Leo",
      role: "Coordinateur Partenariats",
      team: "Partenariats",
      description: "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia.",
      photo: "https://i.imgur.com/bk1Zigv.jpg"
    },
    {
      name: "Maxime",
      role: "Créateur de Contenu",
      team: "Communication",
      description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.",
      photo: "https://i.imgur.com/E7wFzI4.jpg"
    },
    {
      name: "Theo",
      role: "Relations Médias",
      team: "Communication",
      description: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
      photo: "https://imgur.com/LeD6M4C.jpg"
    },
    {
      name: "Valentin",
      role: "Responsable Technique",
      team: "Logistique",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
      photo: "https://i.imgur.com/2UmbeYh.jpg"
    },
    {
      name: "Raphael",
      role: "Responsable Communication",
      team: "Communication",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
      photo: "https://imgur.com/8GwceGM.jpg"
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
          <h1 className="text-5xl font-bold text-white mb-6">L'Équipe Organisatrice</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
          </p>
        </div>

        <section className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-500/10 to-slate-800/50 rounded-2xl p-8 border border-blue-400/20 hover:border-blue-400/40 transition-all card-hover group">
                <div className="text-center mb-5">
                  <div className="w-40 h-40 mx-auto mb-5 relative overflow-hidden rounded-full border-4 border-gradient-to-br from-red-500 to-blue-500 group-hover:scale-105 transition-transform shadow-xl">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-400 font-medium text-base mb-3">{member.role}</p>
                  <span className="inline-block bg-slate-700/50 text-gray-300 text-sm px-4 py-1.5 rounded-full border border-slate-600">
                    {member.team}
                  </span>
                </div>
                <p className="text-gray-400 text-sm text-center leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}