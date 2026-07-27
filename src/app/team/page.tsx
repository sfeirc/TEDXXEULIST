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

function Avatar({ photo, name, size }: { photo: string; name: string; size: string }) {
  return (
    <div className={`${size} mx-auto mb-3 relative overflow-hidden border border-white/10`}>
      {photo ? (
        <Image src={photo} alt={name} width={160} height={160} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-white/8 flex items-center justify-center text-white/40 font-display font-semibold text-xl">
          {name.charAt(0)}
        </div>
      )}
    </div>
  );
}

function PersonCard({ person, variant = 'member' }: { person: Person; variant?: 'leader' | 'director' | 'member' }) {
  if (variant === 'leader') {
    return (
      <div className="text-center px-10 py-8 border border-white/10 rounded-sm max-w-xs bg-white/[0.02]">
        <Avatar photo={person.photo} name={person.name} size="w-28 h-28 md:w-32 md:h-32" />
        <h3 className="font-display font-light text-xl mb-1 leading-tight">{person.name}</h3>
        <p className="text-[#e62b1e] text-sm font-medium tracking-wide">{person.role}</p>
        {person.school && (
          <p className="mt-2 text-white/35 text-xs uppercase tracking-widest">{person.school}</p>
        )}
      </div>
    );
  }

  if (variant === 'director') {
    return (
      <div className="text-center px-6 py-5 border border-white/8 rounded-sm bg-white/[0.02] w-44">
        <Avatar photo={person.photo} name={person.name} size="w-16 h-16 md:w-20 md:h-20" />
        <h3 className="font-display font-light text-sm mb-0.5 leading-tight">{person.name}</h3>
        <p className="text-[#e62b1e] text-xs tracking-wide">{person.role}</p>
        {person.school && (
          <p className="mt-1.5 text-white/30 text-[0.65rem] uppercase tracking-widest">{person.school}</p>
        )}
      </div>
    );
  }

  return (
    <div className="text-center px-3 py-3 border border-white/6 rounded-sm bg-white/[0.015] w-36">
      <Avatar photo={person.photo} name={person.name} size="w-12 h-12 md:w-14 md:h-14" />
      <h3 className="font-medium text-white/85 text-xs mb-0.5 leading-tight">{person.name}</h3>
      <p className="text-white/40 text-[0.65rem] leading-tight">{person.role}</p>
    </div>
  );
}

function VerticalLine({ height = 'h-8', className = '' }: { height?: string; className?: string }) {
  return <div className={`w-px ${height} bg-white/10 mx-auto ${className}`} />;
}

function PoleBadge({ name }: { name: string }) {
  return (
    <span className="inline-block text-white/50 text-[0.65rem] font-label uppercase tracking-[0.2em] px-3 py-1 border border-white/8 rounded-sm whitespace-nowrap">
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
      <div className="min-h-screen relative overflow-hidden">
        <Navigation />
        <main className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
          <p className="text-white/40">Équipe bientôt disponible.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <Link href="/" className="back-link">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        {/* Header */}
        <div className="mb-16 pt-4">
          <ScrollReveal>
            <p className="page-eyebrow mb-5">Organisation</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Équipe organisatrice
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-white/55 max-w-2xl leading-relaxed">
              TEDx IMT Paris est organisé par des étudiants venant de toute l&apos;IMT, répartis par pôle — communication, partenariats, logistique, et plus encore.
            </p>
          </ScrollReveal>
        </div>

        {/* Org Chart */}
        <section className="overflow-x-auto">
          <div className="min-w-[1000px] lg:min-w-0">

            {leader && (
              <ScrollReveal>
                <div className="flex justify-center">
                  <PersonCard person={leader} variant="leader" />
                </div>
              </ScrollReveal>
            )}

            {leader && poles.length > 0 && <VerticalLine height="h-10" />}

            {poles.length > 0 && (
              <ScrollReveal delay={0.15}>
                <div className="relative">
                  <div className="absolute top-0 left-[10%] right-[10%] h-px bg-white/8" />
                  <div className="grid gap-3 lg:gap-5" style={{ gridTemplateColumns: `repeat(${poles.length}, 1fr)` }}>
                    {poles.map((pole) => (
                      <PoleColumn key={pole.name} pole={pole} />
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {activeMembers.length > 0 && (
              <div className="mt-16">
                <ScrollReveal delay={0.25}>
                  <div className="text-center mb-6">
                    <span className="page-eyebrow">Membres actifs</span>
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
