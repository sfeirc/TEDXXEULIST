import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

export default function Team() {
  const teamMembers = [
    {
      name: "Lorem Ipsum",
      role: "Coordinateur Général",
      team: "Coordination",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor."
    },
    {
      name: "Dolor Sit",
      role: "Directeur Communication",
      team: "Communication",
      description: "Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore."
    },
    {
      name: "Amet Consectetur",
      role: "Manager Logistique",
      team: "Logistique",
      description: "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi."
    },
    {
      name: "Adipiscing Elit",
      role: "Relations Conférenciers",
      team: "Coordination",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum."
    },
    {
      name: "Sed Eiusmod",
      role: "Coordinateur Partenariats",
      team: "Partenariats",
      description: "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia."
    },
    {
      name: "Tempor Incididunt",
      role: "Créateur de Contenu",
      team: "Communication",
      description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium."
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-500/10 to-slate-800/50 rounded-xl p-6 border border-blue-400/20 hover:border-blue-400/40 transition-all">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                  <p className="text-blue-400 font-medium">{member.role}</p>
                  <span className="inline-block bg-slate-700/50 text-gray-300 text-xs px-3 py-1 rounded-full mt-2 border border-slate-600">
                    {member.team}
                  </span>
                </div>
                <p className="text-gray-400 text-sm text-center">{member.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}