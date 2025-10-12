import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { ArrowLeft, Mail, MessageSquare } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation currentPage="team" />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-20">
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

        <section className="bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-2xl p-8 text-center border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-6">Rejoignez Notre Équipe</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-red-700 hover:to-red-600 transition-all shadow-lg shadow-red-500/30"
            >
              <Mail className="w-5 h-5" />
              Nous Contacter
            </Link>
            <a 
              href="mailto:team@tedxeulistparis.com"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              Envoyer Email
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}