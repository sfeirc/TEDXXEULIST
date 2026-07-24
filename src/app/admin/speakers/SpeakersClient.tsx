'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { upsertSpeaker, deleteSpeaker, toggleSpeakerPublished } from '@/app/actions/admin/speakers';
import type { Speaker } from '@/types/database';

const themes = [
  'Social professions', 'Networks and technology', 'Environment',
  'Science and interdisciplinarity', 'Culture and communication', 'Other',
];

const empty = {
  name: '', title: '', bio: '', image_url: '', theme: '',
  display_order: 0, is_published: false,
};

export default function SpeakersClient({ speakers }: { speakers: Speaker[] }) {
  const router = useRouter();
  const [list, setList] = useState(speakers);
  const [modal, setModal] = useState<{ open: boolean; editing?: Speaker }>({ open: false });
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const openAdd = () => { setForm(empty); setError(''); setModal({ open: true }); };
  const openEdit = (s: Speaker) => {
    setForm({
      name: s.name, title: s.title, bio: s.bio ?? '', image_url: s.image_url ?? '',
      theme: s.theme ?? '', display_order: s.display_order, is_published: s.is_published,
    });
    setError('');
    setModal({ open: true, editing: s });
  };
  const close = () => setModal({ open: false });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const result = await upsertSpeaker(
      { ...form, display_order: Number(form.display_order) },
      modal.editing?.id
    );
    setSaving(false);
    if (!result.success) { setError(result.error); return; }
    close();
    router.refresh();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete speaker "${name}"?`)) return;
    await deleteSpeaker(id);
    setList(prev => prev.filter(s => s.id !== id));
  };

  const handleToggle = async (s: Speaker) => {
    await toggleSpeakerPublished(s.id, !s.is_published);
    setList(prev => prev.map(x => x.id === s.id ? { ...x, is_published: !x.is_published } : x));
  };

  const inputClass = 'input-nuclear w-full';
  const labelClass = 'block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5';

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Speakers</h1>
          <p className="text-white/40 text-sm mt-1">{list.length} speaker{list.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openAdd} className="btn-nuclear-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm">
          <Plus className="w-4 h-4" />Add speaker
        </button>
      </div>

      {list.length === 0 ? (
        <div className="nuclear-card rounded-2xl p-16 text-center">
          <p className="text-white/30 text-sm">No speakers yet. Add the first one!</p>
        </div>
      ) : (
        <div className="nuclear-card rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['Name', 'Title', 'Theme', 'Order', 'Published', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/40">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {list.map(s => (
                <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{s.name}</td>
                  <td className="px-4 py-3 text-white/60">{s.title}</td>
                  <td className="px-4 py-3 text-white/40">{s.theme ?? '—'}</td>
                  <td className="px-4 py-3 text-white/40">{s.display_order}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleToggle(s)} className="flex items-center gap-1.5 text-xs">
                      {s.is_published
                        ? <><Eye className="w-4 h-4 text-green-400" /><span className="text-green-400">Published</span></>
                        : <><EyeOff className="w-4 h-4 text-white/30" /><span className="text-white/30">Draft</span></>
                      }
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(s.id, s.name)} className="p-1.5 rounded-lg hover:bg-red-900/30 text-white/50 hover:text-red-400 transition-colors">
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

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="nuclear-card rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-6">
              {modal.editing ? 'Edit speaker' : 'Add speaker'}
            </h2>

            {error && (
              <div className="mb-4 rounded-xl bg-red-900/30 border border-red-500/40 p-3 text-sm text-red-300">{error}</div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className={labelClass}>Name *</label>
                <input className={inputClass} required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Title / Role *</label>
                <input className={inputClass} required value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Theme</label>
                <select className="input-nuclear w-full appearance-none bg-[#0a0a0a]" value={form.theme} onChange={e => setForm(p => ({ ...p, theme: e.target.value }))}>
                  <option value="">— Select —</option>
                  {themes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Bio</label>
                <textarea className="input-nuclear w-full resize-none" rows={4} value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Image URL</label>
                <input type="url" className={inputClass} value={form.image_url} onChange={e => setForm(p => ({ ...p, image_url: e.target.value }))} placeholder="https://…" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Display order</label>
                  <input type="number" min={0} className={inputClass} value={form.display_order} onChange={e => setForm(p => ({ ...p, display_order: Number(e.target.value) }))} />
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.is_published} onChange={e => setForm(p => ({ ...p, is_published: e.target.checked }))} className="w-4 h-4 accent-[#e62b1e]" />
                    <span className="text-white/70 text-sm">Published</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={close} className="flex-1 btn-nuclear-dark py-2.5 rounded-xl text-sm">Cancel</button>
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
