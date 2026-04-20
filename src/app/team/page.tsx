import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

type TeamMember = {
  name: string;
  role: string;
  team: string;
  description: string;
  photo: string;
};

function MemberCard({ member, featured = false }: { member: TeamMember; featured?: boolean }) {
  return (
    <div
      className={`nuclear-card rounded-3xl p-8 group card-hover hover:border-[#e62b1e]/30 ${
        featured ? 'max-w-md w-full mx-auto' : ''
      }`}
    >
      <div className="text-center mb-5">
        <div
          className={`mx-auto mb-5 relative overflow-hidden rounded-full border-2 border-[#e62b1e]/45 group-hover:scale-[1.03] transition-transform duration-300 shadow-[0_0_40px_-12px_rgba(230,43,30,0.45)] ${
            featured ? 'w-44 h-44 md:w-48 md:h-48' : 'w-40 h-40'
          }`}
        >
          <Image
            src={member.photo}
            alt={member.name}
            width={featured ? 192 : 160}
            height={featured ? 192 : 160}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
        <p className="text-[#e62b1e] font-semibold text-sm mb-3 tracking-wide">{member.role}</p>
        <span className="inline-block bg-black/40 text-white/75 text-xs px-4 py-1.5 rounded-full border border-[#e62b1e]/25">
          {member.team}
        </span>
      </div>
      <p className="text-white/70 text-sm text-center leading-relaxed">{member.description}</p>
    </div>
  );
}

export default function Team() {
  const teamMembers: TeamMember[] = [
    {
      name: 'Théo',
      role: 'General Manager',
      team: 'Leadership',
      description:
        'Strategic direction of the organizing team. Keeps the project coherent and coordinates every workstream.',
      photo: 'https://imgur.com/LeD6M4C.jpg',
    },
    {
      name: 'Clovis',
      role: 'Technical Director',
      team: 'Technical',
      description:
        'Leads event technology: sound, lighting, visuals, and infrastructure — execution on show day.',
      photo: 'https://imgur.com/nAAULb5.jpg',
    },
    {
      name: 'Tiago',
      role: 'Communications Director',
      team: 'Communications',
      description:
        'Owns comms strategy and visibility: channels, social media, and how the TEDx reaches its audience.',
      photo: 'https://i.imgur.com/sH46wlg.jpeg',
    },
    {
      name: 'Clarissa',
      role: 'Head of Speaker Relations',
      team: 'Speaker Relations',
      description:
        'Coordinates exchanges with the Junior Entreprise network across France and Europe as interface for the TEDx.',
      photo: 'https://i.imgur.com/sMOeQnw.jpeg',
    },
    {
      name: 'Valentin',
      role: 'Sponsorship Relations',
      team: 'Partnerships',
      description:
        'Develops partnerships and maintains relationships with sponsors and supporters of the project.',
      photo: 'https://imgur.com/HS6y4mW.jpg',
    },
    {
      name: 'Daner',
      role: 'Logistics Manager',
      team: 'Logistics',
      description:
        'Secures resources and materials for the event and ensures safety and accessibility requirements are met.',
      photo: 'https://i.imgur.com/a2E8lRY.jpg',
    },
    {
      name: 'Etienne',
      role: 'Speaker Relations',
      team: 'Coordination',
      description:
        'Primary contact for speakers — supports rehearsals and talks aligned with the event theme.',
      photo: 'https://imgur.com/0rTLU7d.jpg',
    },
    {
      name: 'Leo',
      role: 'Partnerships Coordinator',
      team: 'Partnerships',
      description:
        'Sources and builds partnerships, connecting the team with companies that support the project.',
      photo: 'https://i.imgur.com/bk1Zigv.jpg',
    },
    {
      name: 'Raphael',
      role: 'Communications Lead',
      team: 'Communications',
      description:
        'Promotes the conference and safeguards a consistent, strong message across all outreach.',
      photo: 'https://imgur.com/8GwceGM.jpg',
    },
  ];

  const lead = teamMembers.find((m) => m.name === 'Théo');
  const rest = teamMembers.filter((m) => m.name !== 'Théo');

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
        <div className="text-center mb-14 md:mb-16">
          <p className="page-eyebrow mb-4">Organization</p>
          <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight">
            Organizing team
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            TEDx IMT is run by students from across IMT, organized by role across comms, partnerships, logistics, and
            more.
          </p>
        </div>

        <section className="mb-6">
          <div className="flex flex-col items-center">
            {lead ? (
              <>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#e62b1e]/90 mb-6">
                  Leadership
                </p>
                <MemberCard member={lead} featured />
              </>
            ) : null}

            <div className="flex flex-col items-center my-8 md:my-10" aria-hidden>
              <div className="h-12 w-px bg-gradient-to-b from-[#e62b1e] via-[#e62b1e]/60 to-[#e62b1e]/20" />
              <div
                className="my-1 h-3 w-3 rounded-full border-2 border-[#e62b1e]/70 bg-[#e62b1e]/30 shadow-[0_0_20px_rgba(230,43,30,0.55)]"
                aria-hidden
              />
              <div className="h-12 w-px bg-gradient-to-b from-[#e62b1e]/20 to-transparent" />
            </div>

            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/45 mb-10">
              Core team
            </p>

            <div className="grid w-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {rest.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
