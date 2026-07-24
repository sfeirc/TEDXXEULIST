'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2, Linkedin } from 'lucide-react';
import { upsertTeamMember, deleteTeamMember } from '@/app/actions/admin/team';
import type { TeamMember } from '@/types/database';

const POLES = [
  { value: '', label: 'General Manager (top level)' },
  { value: 'Speaker Relations', label: 'Speaker Relations' },
  { value: 'Technical', label: 'Technical' },
  { value: 'Communications', label: 'Communications' },
  { value: 'Partnerships', label: 'Partnerships' },
  { value: 'Logistics', label: 'Logistics' },
  { value: 'Active Member', label: 'Active Member' },
];

const empty = {
  name: '', role: '', school: '', pole: '',
  image_url: '', linkedin_url: '',
  display_order: 0, is_published: true,
};

export default function TeamClient({ members }: { members: TeamMember[] }) {
  const router = useRouter();
  const [list, setList] = useState(members);
  const [modal, setModal] = useState<{ open: boolean; editing?: TeamMember }>({ open: false });
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const openAdd = () => { setForm(empty); setError(''); setModal({ open: true }); };
  const openEdit = (m: TeamMember) => {
    setForm({
      name: m.name,
      role: m.role,
      school: m.school ?? '',
      pole: m.pole ?? '',
      image_url: m.image_url ?? '',
      linkedin_url: m.linkedin_url ?? '',
      display_order: m.display_order,
      is_published: m.is_published,
    });
    setError('');
    setModal({ open: true, editing: m });
  };
  const close = () => setModal({ open: false });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const result = await upsertTeamMember(
      { ...form, display_order: Number(form.display_order) },
      modal.editing?.id
    );
    setSaving(false);
    if (!result.success) { setError(result.error); return; }
    close();
    router.refresh();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}" from the team?`)) return;
    await deleteTeamMember(id);
    setList(prev => prev.filter(m => m.id !== id));
  };

  const inputClass = 'input-nuclear w-full';
  const labelClass = 'block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5';

  const poleBadgeColor = (pole: string | null) => {
    const colors: Record<string, string> = {
      'Speaker Relations': '#60a5fa',
      'Technical': '#a78bfa',
      'Communications': '#34d399',
      'Partnerships': '#fbbf24',
      'Logistics': '#fb923c',
      'Active Member': 'rgba(200,190,175,0.5)',
    };
    return pole ? (colors[pole] ?? '#e62b1e') : '#e62b1e';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Team</h1>
          <p className="text-white/40 text-sm mt-1">{list.length} member{list.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openAdd} className="btn-nuclear-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm">
          <Plus className="w-4 h-4" />Add member
        </button>
      </div>

      {list.length === 0 ? (
        <div className="nuclear-card rounded-2xl p-16 text-center">
          <p className="text-white/30 text-sm">No team members yet.</p>
        </div>
      ) : (
        <div className="nuclear-card rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['Name', 'Role', 'Pole', 'School', 'Order', 'Published', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/40">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {list.map(m => (
                <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-white font-medium">{m.name}</span>
                    {m.linkedin_url && (
                      <a href={m.linkedin_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-[#e62b1e]/60 hover:text-[#e62b1e] inline-flex">
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3 text-white/60">{m.role}</td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        color: poleBadgeColor(m.pole),
                        background: `${poleBadgeColor(m.pole)}18`,
                        border: `1px solid ${poleBadgeColor(m.pole)}30`,
                      }}
                    >
                      {m.pole || 'GM'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/40 text-xs">{m.school ?? '—'}</td>
                  <td className="px-4 py-3 text-white/40">{m.display_order}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${m.is_published ? 'text-green-400' : 'text-white/30'}`}>
                      {m.is_published ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(m)} className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(m.id, m.name)} className="p-1.5 rounded-lg hover:bg-red-900/30 text-white/50 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="nuclear-card rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-6">{modal.editing ? 'Edit member' : 'Add member'}</h2>
            {error && <div className="mb-4 rounded-xl bg-red-900/30 border border-red-500/40 p-3 text-sm text-red-300">{error}</div>}
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className={labelClass}>Name *</label>
                <input className={inputClass} required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Role *</label>
                <input
                  className={inputClass} required value={form.role}
                  onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
                  placeholder="ex: Communications Director, Head of Partnerships…"
                />
              </div>

              {/* Pole selector */}
              <div>
                <label className={labelClass}>Pole (position dans l&apos;organigramme) *</label>
                <select
                  className={inputClass}
                  value={form.pole}
                  onChange={e => setForm(p => ({ ...p, pole: e.target.value }))}
                  style={{ background: 'rgba(255,255,255,0.05)', color: '#f4f0e8' }}
                >
                  {POLES.map(p => (
                    <option key={p.value} value={p.value} style={{ background: '#0c0b0a' }}>
                      {p.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs mt-1" style={{ color: 'rgba(200,190,175,0.35)' }}>
                  Les rôles contenant "Director", "Head of" ou "Manager" apparaissent automatiquement comme chef de pôle.
                </p>
              </div>

              <div>
                <label className={labelClass}>École / Institution</label>
                <input
                  className={inputClass} value={form.school}
                  onChange={e => setForm(p => ({ ...p, school: e.target.value }))}
                  placeholder="ex: IMT Atlantique, Télécom Paris…"
                />
              </div>
              <div>
                <label className={labelClass}>Image URL</label>
                <input type="url" className={inputClass} value={form.image_url} onChange={e => setForm(p => ({ ...p, image_url: e.target.value }))} placeholder="https://…" />
              </div>
              <div>
                <label className={labelClass}>LinkedIn URL</label>
                <input type="url" className={inputClass} value={form.linkedin_url} onChange={e => setForm(p => ({ ...p, linkedin_url: e.target.value }))} placeholder="https://linkedin.com/in/…" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Ordre d&apos;affichage</label>
                  <input type="number" min={0} className={inputClass} value={form.display_order} onChange={e => setForm(p => ({ ...p, display_order: Number(e.target.value) }))} />
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.is_published} onChange={e => setForm(p => ({ ...p, is_published: e.target.checked }))} className="w-4 h-4 accent-[#e62b1e]" />
                    <span className="text-white/70 text-sm">Publié</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={close} className="flex-1 btn-nuclear-dark py-2.5 rounded-xl text-sm">Annuler</button>
                <button type="submit" disabled={saving} className="flex-1 btn-nuclear-primary py-2.5 rounded-xl text-sm disabled:opacity-50">
                  {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
