'use client';

import { useState } from 'react';
import { upsertSession, deleteSession, toggleSessionPublished } from '@/app/actions/admin/programme';
import type { ProgrammeSession } from '@/types/database';
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Check } from 'lucide-react';

const SECTIONS = ['TEDx', 'Forum Entreprise'];

const SESSION_TYPES: ProgrammeSession['type'][] = ['doors', 'opening', 'session', 'break', 'lunch', 'closing', 'cocktail', 'forum'];

const typeLabel: Record<ProgrammeSession['type'], string> = {
  doors:    'Doors / Welcome',
  opening:  'Opening',
  session:  'Talk session',
  break:    'Break',
  lunch:    'Lunch',
  closing:  'Closing',
  cocktail: 'Cocktail',
  forum:    'Forum / Stand',
};

const typeColor: Record<ProgrammeSession['type'], string> = {
  doors:    'rgba(200,190,175,0.15)',
  opening:  'rgba(230,43,30,0.15)',
  session:  'rgba(230,43,30,0.25)',
  break:    'rgba(200,190,175,0.1)',
  lunch:    'rgba(200,190,175,0.1)',
  closing:  'rgba(230,43,30,0.15)',
  cocktail: 'rgba(230,43,30,0.2)',
  forum:    'rgba(245,158,11,0.2)',
};

const borderWarm = 'rgba(200,190,175,0.09)';

function SessionForm({
  initial,
  onDone,
  onCancel,
}: {
  initial?: Partial<ProgrammeSession>;
  onDone: (item: Partial<ProgrammeSession>) => void;
  onCancel: () => void;
}) {
  const [time, setTime] = useState(initial?.time ?? '');
  const [title, setTitle] = useState(initial?.title ?? '');
  const [type, setType] = useState<ProgrammeSession['type']>(initial?.type ?? 'session');
  const [section, setSection] = useState(initial?.section ?? 'TEDx');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [speakerCount, setSpeakerCount] = useState(initial?.speaker_count ?? 0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!time.trim() || !title.trim()) { setError('Time and title are required.'); return; }
    setSaving(true);
    const result = await upsertSession({
      time, title, type, section,
      description: description || undefined,
      speaker_count: speakerCount,
      is_published: initial?.is_published ?? true,
      display_order: initial?.display_order ?? 0,
    }, initial?.id);
    setSaving(false);
    if ('error' in result) { setError(result.error); return; }
    onDone({ ...initial, time, title, type, section, description: description || null, speaker_count: speakerCount });
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: borderWarm,
    color: '#f4f0e8',
    borderRadius: '10px',
    padding: '10px 14px',
    outline: 'none',
    fontSize: '14px',
  };

  return (
    <div className="rounded-2xl p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(230,43,30,0.2)' }}>
      {/* Section + Type */}
      <div className="grid grid-cols-3 gap-3">
        <select
          value={section}
          onChange={e => setSection(e.target.value)}
          style={{ ...inputStyle, width: '100%', cursor: 'pointer' }}
        >
          {SECTIONS.map(s => <option key={s} value={s} style={{ background: '#0c0b0a' }}>{s}</option>)}
        </select>
        <input value={time} onChange={e => setTime(e.target.value)} placeholder="Heure (ex: 09:00)" style={{ ...inputStyle, width: '100%' }} />
        <select
          value={type}
          onChange={e => setType(e.target.value as ProgrammeSession['type'])}
          style={{ ...inputStyle, width: '100%', cursor: 'pointer' }}
        >
          {SESSION_TYPES.map(t => <option key={t} value={t} style={{ background: '#0c0b0a' }}>{typeLabel[t]}</option>)}
        </select>
      </div>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre…" style={{ ...inputStyle, width: '100%' }} />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description (optionnel)" rows={2} style={{ ...inputStyle, width: '100%', resize: 'vertical' }} />
      {type === 'session' && (
        <div className="flex items-center gap-3">
          <label className="font-label text-xs" style={{ color: 'rgba(200,190,175,0.5)' }}>Speaker slots :</label>
          <input type="number" min={0} max={10} value={speakerCount} onChange={e => setSpeakerCount(Number(e.target.value))} style={{ ...inputStyle, width: '80px' }} />
        </div>
      )}
      {error && <p className="text-xs text-red-400">{error}</p>}
      <div className="flex gap-2 justify-end pt-1">
        <button onClick={onCancel} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-label font-semibold" style={{ color: 'rgba(200,190,175,0.5)' }}>
          <X className="w-3.5 h-3.5" /> Annuler
        </button>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-label font-semibold disabled:opacity-50" style={{ background: '#e62b1e', color: '#fff' }}>
          <Check className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>
  );
}

export default function ProgrammeClient({ sessions: initial }: { sessions: ProgrammeSession[] }) {
  const [sessions, setSessions] = useState(initial);
  const [editing, setEditing] = useState<string | 'new' | null>(null);

  const handleToggle = async (id: string, is_published: boolean) => {
    await toggleSessionPublished(id, !is_published);
    setSessions(prev => prev.map(s => s.id === id ? { ...s, is_published: !is_published } : s));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette session ?')) return;
    await deleteSession(id);
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  const handleSaved = (id: string | undefined, data: Partial<ProgrammeSession>) => {
    if (!id) {
      setSessions(prev => [...prev, { ...data, id: crypto.randomUUID(), display_order: prev.length, is_published: true, speaker_count: 0, section: data.section ?? 'TEDx', created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as ProgrammeSession]);
    } else {
      setSessions(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
    }
    setEditing(null);
  };

  // Group by section for display
  const sectionOrder: string[] = [];
  const grouped: Record<string, ProgrammeSession[]> = {};
  for (const s of sessions) {
    const sec = s.section ?? 'TEDx';
    if (!grouped[sec]) { grouped[sec] = []; sectionOrder.push(sec); }
    grouped[sec].push(s);
  }

  const sectionColor: Record<string, string> = {
    'Forum Entreprise': '#f59e0b',
    'TEDx': '#e62b1e',
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="font-label text-[0.65rem] tracking-[0.2em] uppercase mb-1.5" style={{ color: 'rgba(200,190,175,0.35)' }}>Admin</p>
          <h1 className="font-display text-3xl font-light" style={{ color: '#f4f0e8' }}>Programme</h1>
          <p className="font-label text-xs mt-1" style={{ color: 'rgba(200,190,175,0.4)' }}>{sessions.length} slots · modifications visibles instantanément sur le site</p>
        </div>
        <button onClick={() => setEditing('new')} className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-label text-xs font-semibold" style={{ background: '#e62b1e', color: '#fff' }}>
          <Plus className="w-3.5 h-3.5" /> Ajouter un slot
        </button>
      </div>

      {editing === 'new' && (
        <div className="mb-6">
          <SessionForm onDone={data => handleSaved(undefined, data)} onCancel={() => setEditing(null)} />
        </div>
      )}

      {sessions.length === 0 && editing !== 'new' && (
        <div className="rounded-2xl p-12 text-center" style={{ border: borderWarm }}>
          <p className="text-sm" style={{ color: 'rgba(200,190,175,0.35)' }}>Aucune session. Ajoutez votre premier créneau.</p>
        </div>
      )}

      <div className="space-y-8">
        {sectionOrder.map(section => {
          const color = sectionColor[section] ?? '#e62b1e';
          return (
            <div key={section}>
              {/* Section header */}
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs font-label font-bold px-3 py-1 rounded-full"
                  style={{ color, background: `${color}15`, border: `1px solid ${color}30` }}
                >
                  {section}
                </span>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${color}25, transparent)` }} />
                <span className="text-xs" style={{ color: 'rgba(200,190,175,0.3)' }}>{grouped[section].length} slots</span>
              </div>

              <div className="space-y-2">
                {grouped[section].map(session => (
                  <div key={session.id} className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: borderWarm }}>
                    {editing === session.id ? (
                      <div className="p-3">
                        <SessionForm initial={session} onDone={data => handleSaved(session.id, data)} onCancel={() => setEditing(null)} />
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 px-5 py-4">
                        <span className="font-mono text-sm font-semibold shrink-0 w-12" style={{ color }}>{session.time}</span>
                        <span className="px-2 py-0.5 rounded-full font-label text-[0.6rem] font-semibold shrink-0" style={{ background: typeColor[session.type], color: '#f4f0e8', border: borderWarm }}>
                          {typeLabel[session.type]}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate" style={{ color: session.is_published ? '#f4f0e8' : 'rgba(200,190,175,0.4)' }}>{session.title}</p>
                          {session.description && <p className="text-xs truncate mt-0.5" style={{ color: 'rgba(200,190,175,0.35)' }}>{session.description}</p>}
                        </div>
                        {session.speaker_count > 0 && (
                          <span className="font-label text-xs shrink-0" style={{ color: 'rgba(200,190,175,0.4)' }}>{session.speaker_count} speakers</span>
                        )}
                        <div className="flex items-center gap-1 shrink-0">
                          <button onClick={() => handleToggle(session.id, session.is_published)} className="p-1.5 rounded-lg" style={{ color: 'rgba(200,190,175,0.4)' }}>
                            {session.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          </button>
                          <button onClick={() => setEditing(session.id)} className="p-1.5 rounded-lg" style={{ color: 'rgba(200,190,175,0.4)' }}>
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDelete(session.id)} className="p-1.5 rounded-lg" style={{ color: 'rgba(239,68,68,0.5)' }}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
