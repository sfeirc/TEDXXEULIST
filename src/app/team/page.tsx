export const revalidate = 60;

import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { ScrollReveal } from '@/components/MotionElements';
import { createClient } from '@/lib/supabase/server';

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

type TeamMemberRow = {
  id: string;
  name: string;
  role: string;
  school: string | null;
  pole: string | null;
  image_url: string | null;
  display_order: number;
  is_published: boolean;
};

function mapRowsToOrgChart(rows: TeamMemberRow[]): {
  leader: Person | null;
  poles: Pole[];
  activeMembers: Person[];
} {
  let leader: Person | null = null;
  const polesMap = new Map<string, Pole>();
  const activeMembers: Person[] = [];

  for (const row of rows) {
    const person: Person = {
      name: row.name,
      role: row.role,
      photo: row.image_url ?? '',
      school: row.school ?? undefined,
    };

    if (!row.pole) {
      leader = person;
      continue;
    }

    if (row.pole === 'Active Member') {
      activeMembers.push(person);
      continue;
    }

    if (!polesMap.has(row.pole)) {
      polesMap.set(row.pole, { name: row.pole, director: null, members: [] });
    }
    const pole = polesMap.get(row.pole)!;

    const roleLower = row.role.toLowerCase();
    const isDirector =
      roleLower.startsWith('head of') ||
      roleLower.endsWith('director') ||
      roleLower.endsWith('manager');

    if (isDirector && !pole.director) {
      pole.director = person;
    } else {
      pole.members.push(person);
    }
  }

  return { leader, poles: Array.from(polesMap.values()), activeMembers };
}

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
        {person.photo ? (
          <Image src={person.photo} alt={person.name} width={160} height={160} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-white/10 flex items-center justify-center text-white/30 text-xl font-bold">
            {person.name.charAt(0)}
          </div>
        )}
      </div>
      <h3 className={`${c.name} font-bold text-white mb-0.5`}>{person.name}</h3>
      <p className={`${c.role} text-[#e62b1e] font-semibold tracking-wide`}>{person.role}</p>
      {person.school && (
        <p className="mt-2 inline-block bg-white/5 text-white/70 text-[0.7rem] font-semibold px-2.5 py-0.5 rounded-full border border-white/10 tracking-wide">
          {person.school}
        </p>
      )}
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

export default async function Team() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('team_members')
    .select('id, name, role, school, pole, image_url, display_order, is_published')
    .eq('is_published', true)
    .order('display_order');

  const rows: TeamMemberRow[] = (!error && data && data.length > 0) ? data : [];
  const { leader, poles, activeMembers } = mapRowsToOrgChart(rows);

  if (!leader && poles.length === 0) {
    return (
      <div className="min-h-screen relative overflow-hidden font-inter">
        <Navigation />
        <main className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
          <p className="text-white/40">Team coming soon.</p>
        </main>
        <Footer />
      </div>
    );
  }

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

            {/* General Manager */}
            {leader && (
              <ScrollReveal>
                <div className="flex justify-center">
                  <PersonCard person={leader} variant="leader" />
                </div>
              </ScrollReveal>
            )}

            {/* Connector from GM to directors */}
            {leader && poles.length > 0 && <VerticalLine height="h-10" />}

            {/* Director poles */}
            {poles.length > 0 && (
              <ScrollReveal delay={0.15}>
                <div className="relative">
                  <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#e62b1e]/40 to-transparent" />
                  <div className={`grid gap-3 lg:gap-5`} style={{ gridTemplateColumns: `repeat(${poles.length}, 1fr)` }}>
                    {poles.map((pole) => (
                      <PoleColumn key={pole.name} pole={pole} />
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Active Members */}
            {activeMembers.length > 0 && (
              <div className="mt-16">
                <ScrollReveal delay={0.25}>
                  <div className="text-center mb-6">
                    <span className="text-white/30 text-xs font-semibold tracking-widest uppercase">
                      Active Members
                    </span>
                  </div>
                  <div className="flex justify-center gap-4 flex-wrap">
                    {activeMembers.map((member) => (
                      <PersonCard key={member.name} person={member} variant="member" />
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            )}

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
