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
  /** IMT school / institution when relevant */
  school?: string;
};

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="nuclear-card rounded-3xl p-8 group card-hover hover:border-[#e62b1e]/30">
      <div className="text-center mb-5">
        <div className="w-40 h-40 mx-auto mb-5 relative overflow-hidden rounded-full border-2 border-[#e62b1e]/45 group-hover:scale-[1.03] transition-transform duration-300 shadow-[0_0_40px_-12px_rgba(230,43,30,0.45)]">
          <Image
            src={member.photo}
            alt={member.name}
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
        <p className="text-[#e62b1e] font-semibold text-sm mb-3 tracking-wide">{member.role}</p>
        <span className="inline-block bg-black/40 text-white/75 text-xs px-4 py-1.5 rounded-full border border-[#e62b1e]/25">
          {member.team}
        </span>
        {member.school && (
          <p className="text-white/60 text-xs mt-3 font-medium tracking-wide">{member.school}</p>
        )}
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
      school: 'IMT Atlantique',
      description:
        'Sets priorities and timelines for the edition, arbitrates across teams, and is the main representative of the organizing committee to institutions and major partners.',
      photo: 'https://imgur.com/LeD6M4C.jpg',
    },
    {
      name: 'Clovis',
      role: 'Technical Director',
      team: 'Technical',
      school: 'IMT Atlantique',
      description:
        'Defines the technical setup for the venue — sound, lighting, video, and graphics — and leads technicians and cues so the show runs cleanly on the day.',
      photo: 'https://imgur.com/nAAULb5.jpg',
    },
    {
      name: 'Clarissa',
      role: 'Head of Speaker Relations',
      team: 'Speaker Relations',
      school: 'IMT Atlantique',
      description:
        'Steers the speaker program: strategy, quality of the line-up, and liaison with the Junior-Enterprise network across France and Europe as a key interface for the TEDx.',
      photo: 'https://i.imgur.com/sMOeQnw.jpeg',
    },
    {
      name: 'Tiago',
      role: 'Communications Director',
      team: 'Communications',
      school: 'IMT Atlantique',
      description:
        'Owns overall communications strategy — brand positioning, flagship campaigns, and channel mix — so public messaging stays bold, coherent, and on strategy.',
      photo: 'https://i.imgur.com/sH46wlg.jpeg',
    },
    {
      name: 'Daner',
      role: 'Logistics Manager',
      team: 'Logistics',
      school: 'IMT Atlantique',
      description:
        'Plans venue flow, supplies, signage, and volunteer tasks; manages risk, access, and on-site safety so audience, crew, and speakers can move through the event without friction.',
      photo: 'https://i.imgur.com/a2E8lRY.jpg',
    },
    {
      name: 'Thi Binh Minh Lê',
      role: 'Communications Team',
      team: 'Communications',
      school: 'IMT Atlantique',
      description:
        'Contributes hands-on to comms production — copy, visuals, and campus outreach — under the director and lead, in line with the agreed editorial plan.',
      photo: "https://i.imgur.com/7h2FtZC.png",
    },
    {
      name: 'Eléonore Piette',
      role: 'Secretary',
      team: 'Leadership',
      school: 'IMT Nord Europe',
      description:
        'Supports the secretary function alongside Arthur — agendas, written follow-ups, and formal coordination — with a focus on the IMT Nord Europe community.',
      photo: "https://i.imgur.com/p73gfmR.jpeg",
    },
    {
      name: 'Etienne',
      role: 'Speaker Relations',
      team: 'Coordination',
      school: 'IMT Atlantique',
      description:
        'Central liaison for speakers inside the coordination track: schedules, deadlines, and alignment between speakers, rehearsals, and the rest of the organizing team.',
      photo: 'https://imgur.com/0rTLU7d.jpg',
    },
    {
      name: 'Raphael',
      role: 'Communications Lead',
      team: 'Communications',
      school: 'IMT Atlantique',
      description:
        'Runs day-to-day comms execution: editorial calendar, key assets, and rollout across channels, keeping tone and timing consistent with the director\'s strategy.',
      photo: 'https://imgur.com/8GwceGM.jpg',
    },
    {
      name: 'Nour El Houda El Bouz',
      role: 'Communications Team',
      team: 'Communications',
      school: 'IMT Nord Europe',
      description:
        'Supports campaigns and messaging for IMT Nord Europe audiences — amplifying the event locally and helping stories travel within that community.',
      photo: "https://i.imgur.com/VDa5tcl.png",
    },
    {
      name: 'Eunice Mboutchouang',
      role: 'Hiring Team',
      team: 'Hiring',
      school: 'IMT Mines Albi',
      description:
        'Recruits and on-boards volunteers and contributors for the organizing team, working with IMT Mines Albi channels to grow a reliable crew around the event.',
      photo: "https://i.imgur.com/pDsGgAN.jpeg",
    },
    {
      name: 'Nicolas De Oliveira-Neige',
      role: 'Partnerships Relations',
      team: 'Partnerships',
      school: 'Mines Saint-Étienne',
      description:
        'Prospects and cultivates sponsors and partners from the Mines Saint-Étienne and regional ecosystem, from first contact through deliverables and event-day recognition.',
      photo: "https://i.imgur.com/qZJNz5M.jpeg",
    },
    
    {
      name: 'Oscar Hu',
      role: 'Partnerships Relations',
      team: 'Partnerships',
      school: 'Télécom Paris',
      description:
        'Drives partnership outreach and follow-up anchored at Télécom Paris, connecting companies and foundations with sponsorship packages and on-site visibility.',
      photo: "https://i.imgur.com/tTlWZbS.jpeg",
    },
    {
      name: 'Théo Menoux',
      role: 'Speaker Relations',
      team: 'Speaker Relations',
      school: 'IMT Mines Alès',
      description:
        'Part of the dedicated speaker squad: briefings, rehearsal logistics, and continuity so every talk fits the format, theme, and TEDx standards before the curtain goes up.',
      photo: "https://i.imgur.com/hMwzqZJ.png",
    },
    {
      name: 'Antoine Boissel',
      role: 'Speaker Relations',
      team: 'Speaker Relations',
      school: 'IMT Alès',
      description:
        'Focuses on speaker preparation — content checks, staging notes, and backstage handovers — alongside the Alès-based speaker team through show week.',
      photo: "https://i.imgur.com/qzjfmHj.jpeg",
    },
    {
      name: 'Théophile Trillat',
      role: 'Partnerships Relations',
      team: 'Partnerships',
      school: 'IMT Atlantique',
      description:
        'Builds the sponsor pipeline from IMT Atlantique: identifying prospects, tailoring pitches, and coordinating contract steps with the partnerships lead.',
      photo: "https://i.imgur.com/HEpZyZs.jpeg",
    },
    {
      name: 'Arthur Pasquier',
      role: 'Secretary',
      team: 'Leadership',
      school: 'IMT Atlantique',
      description:
        'Keeps the committee\'s paper trail in order — agendas, minutes, official correspondence, and tracking decisions — so governance stays clear for leadership and sponsors.',
      photo: "https://i.imgur.com/tP2M175.jpeg",
    },
  ];

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

        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <MemberCard key={`${member.name}-${index}`} member={member} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
