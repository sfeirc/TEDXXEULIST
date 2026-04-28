'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { ScrollReveal } from '@/components/MotionElements';

type Person = {
  name: string;
  role: string;
  photo: string;
  school?: string;
};

type Pole = {
  name: string;
  director: Person | null;
  members: Person[];
};

const poles: Pole[] = [
  {
    name: 'Speaker Relations',
    director: {
      name: 'Clarissa',
      role: 'Head of Speaker Relations',
      photo: 'https://i.imgur.com/sMOeQnw.jpeg',
      school: 'IMT Atlantique',
    },
    members: [
      { name: 'Etienne', role: 'Speaker Relations', photo: 'https://imgur.com/0rTLU7d.jpg', school: 'IMT Atlantique' },
      { name: 'Théo Menoux', role: 'Speaker Relations', photo: 'https://i.imgur.com/hMwzqZJ.png', school: 'IMT Mines Alès' },
      { name: 'Antoine Boissel', role: 'Speaker Relations', photo: 'https://i.imgur.com/qzjfmHj.jpeg', school: 'IMT Alès' },
      { name: 'Eunice Mboutchouang', role: 'Hiring', photo: 'https://i.imgur.com/pDsGgAN.jpeg', school: 'IMT Mines Albi' },
    ],
  },
  {
    name: 'Technical',
    director: {
      name: 'Clovis',
      role: 'Technical Director',
      photo: 'https://imgur.com/nAAULb5.jpg',
      school: 'IMT Atlantique',
    },
    members: [],
  },
  {
    name: 'General Management',
    director: {
      name: 'Théo',
      role: 'General Manager',
      photo: 'https://imgur.com/LeD6M4C.jpg',
      school: 'IMT Atlantique',
    },
    members: [
      { name: 'Nicolas De Oliveira-Neige', role: 'Partnerships', photo: 'https://i.imgur.com/qZJNz5M.jpeg', school: 'Mines Saint-Étienne' },
      { name: 'Oscar Hu', role: 'Partnerships', photo: 'https://i.imgur.com/tTlWZbS.jpeg', school: 'Télécom Paris' },
      { name: 'Théophile Trillat', role: 'Partnerships', photo: 'https://i.imgur.com/HEpZyZs.jpeg', school: 'IMT Atlantique' },
      { name: 'Arthur Pasquier', role: 'Secretary', photo: 'https://i.imgur.com/tP2M175.jpeg', school: 'IMT Atlantique' },
      { name: 'Eléonore Piette', role: 'Secretary', photo: 'https://i.imgur.com/p73gfmR.jpeg', school: 'IMT Nord Europe' },
    ],
  },
  {
    name: 'Communications',
    director: {
      name: 'Tiago',
      role: 'Communications Director',
      photo: 'https://i.imgur.com/sH46wlg.jpeg',
      school: 'IMT Atlantique',
    },
    members: [
      { name: 'Raphael', role: 'Communications Lead', photo: 'https://imgur.com/8GwceGM.jpg', school: 'IMT Atlantique' },
      { name: 'Thi Binh Minh Lê', role: 'Communications', photo: 'https://i.imgur.com/7h2FtZC.png', school: 'IMT Atlantique' },
      { name: 'Nour El Houda El Bouz', role: 'Communications', photo: 'https://i.imgur.com/VDa5tcl.png', school: 'IMT Nord Europe' },
    ],
  },
  {
    name: 'Logistics',
    director: {
      name: 'Daner',
      role: 'Logistics Director',
      photo: 'https://i.imgur.com/a2E8lRY.jpg',
      school: 'IMT Atlantique',
    },
    members: [],
  },
];

function PersonCard({ person, variant = 'member' }: { person: Person; variant?: 'leader' | 'director' | 'member' }) {
  const config = {
    leader: {
      img: 'w-28 h-28 md:w-36 md:h-36',
      border: 'border-[#e62b1e]/60 shadow-[0_0_50px_-12px_rgba(230,43,30,0.5)]',
      name: 'text-xl md:text-2xl',
      role: 'text-sm md:text-base',
      card: 'px-8 py-6 md:px-10 md:py-8',
      radius: 'rounded-2xl',
    },
    director: {
      img: 'w-20 h-20 md:w-24 md:h-24',
      border: 'border-[#e62b1e]/40 shadow-[0_0_30px_-10px_rgba(230,43,30,0.35)]',
      name: 'text-base md:text-lg',
      role: 'text-xs md:text-sm',
      card: 'px-5 py-4 md:px-6 md:py-5',
      radius: 'rounded-xl',
    },
    member: {
      img: 'w-14 h-14 md:w-16 md:h-16',
      border: 'border-white/15',
      name: 'text-sm',
      role: 'text-xs',
      card: 'px-3 py-3',
      radius: 'rounded-lg',
    },
  };
  const c = config[variant];

  return (
    <div className={`nuclear-card ${c.radius} ${c.card} text-center group hover:border-[#e62b1e]/30 transition-all duration-300`}>
      <div className={`${c.img} mx-auto mb-2 relative overflow-hidden rounded-full border-2 ${c.border} group-hover:scale-105 transition-all duration-500`}>
        <Image src={person.photo} alt={person.name} width={160} height={160} className="w-full h-full object-cover" />
      </div>
      <h3 className={`${c.name} font-bold text-white mb-0.5`}>{person.name}</h3>
      <p className={`${c.role} text-[#e62b1e] font-semibold tracking-wide`}>{person.role}</p>
      {person.school && <p className="text-white/45 text-[0.65rem] mt-1 font-medium">{person.school}</p>}
    </div>
  );
}

function VerticalLine({ height = 'h-8', className = '' }: { height?: string; className?: string }) {
  return <div className={`w-px ${height} bg-gradient-to-b from-[#e62b1e]/50 to-[#e62b1e]/15 mx-auto ${className}`} />;
}

function PoleBadge({ name }: { name: string }) {
  return (
    <span className="inline-block bg-[#e62b1e]/10 text-[#e62b1e] text-[0.65rem] font-bold px-3 py-1 rounded-full border border-[#e62b1e]/20 tracking-widest uppercase whitespace-nowrap">
      {name}
    </span>
  );
}

function PoleColumn({ pole }: { pole: Pole }) {
  return (
    <div className="flex flex-col items-center">
      <VerticalLine height="h-6" />
      <PoleBadge name={pole.name} />
      <VerticalLine height="h-4" />
      {pole.director && (
        <PersonCard person={pole.director} variant="director" />
      )}
      {pole.members.length > 0 && (
        <div className="flex flex-col items-center gap-1.5 mt-1.5">
          {pole.director && <VerticalLine height="h-3" />}
          {pole.members.map((member) => (
            <div key={member.name} className="flex flex-col items-center">
              <PersonCard person={member} variant="member" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Team() {
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
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <ScrollReveal>
            <p className="page-eyebrow mb-4">Organization</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight">
              Organizing team
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              TEDx IMT is run by students from across IMT, organized by role across comms, partnerships, logistics, and
              more.
            </p>
          </ScrollReveal>
        </div>

        {/* === Org Chart === */}
        <section className="overflow-x-auto">
          <div className="min-w-[1000px] lg:min-w-0">
            <ScrollReveal delay={0.15}>
              <div className="relative">
                <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#e62b1e]/40 to-transparent" />

                <div className="grid grid-cols-5 gap-3 lg:gap-5">
                  {poles.map((pole) => (
                    <PoleColumn key={pole.name} pole={pole} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
