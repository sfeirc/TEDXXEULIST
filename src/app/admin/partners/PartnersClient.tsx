'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { upsertPartner, deletePartner } from '@/app/actions/admin/partners';
import type { Partner } from '@/types/database';

const tierColors: Record<string, string> = {
  gold: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  silver: 'bg-white/10 text-white/70 border-white/20',
  bronze: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  institutional: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
};

const empty = {
  name: '', logo_url: '', website_url: '', tier: 'bronze' as Partner['tier'],
  display_order: 0, is_published: true,
};

export default function PartnersClient({ partners }: { partners: Partner[] }) {
  const router = useRouter();
  const [list, setList] = useState(partners);
  const [modal, setModal] = useState<{ open: boolean; editing?: Partner }>({ open: false });
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const openAdd = () => { setForm(empty); setError(''); setModal({ open: true }); };
  const openEdit = (p: Partner) => {
    setForm({
      name: p.name, logo_url: p.logo_url ?? '', website_url: p.website_url ?? '',
      tier: p.tier, display_order: p.display_order, is_published: p.is_published,
    });
    setError('');
    setModal({ open: true, editing: p });
  };
  const close = () => setModal({ open: false });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const result = await upsertPartner(
      { ...form, display_order: Number(form.display_order) },
      modal.editing?.id
    );
    setSaving(false);
    if (!result.success) { setError(result.error); return; }
    close();
    router.refresh();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete partner "${name}"?`)) return;
    await deletePartner(id);
    setList(prev => prev.filter(p => p.id !== id));
  };

  const inputClass = 'input-nuclear w-full';
  const labelClass = 'block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5';

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Partners</h1>
          <p className="text-white/40 text-sm mt-1">{list.length} partner{list.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openAdd} className="btn-nuclear-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm">
          <Plus className="w-4 h-4" />Add partner
        </button>
      </div>

      {list.length === 0 ? (
        <div className="nuclear-card rounded-2xl p-16 text-center">
          <p className="text-white/30 text-sm">No partners yet.</p>
        </div>
      ) : (
        <div className="nuclear-card rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['Name', 'Tier', 'Website', 'Order', 'Published', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/40">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {list.map(p => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{p.name}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium capitalize ${tierColors[p.tier] ?? ''}`}>
                      {p.tier}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {p.website_url ? (
                      <a href={p.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#e62b1e]/70 hover:text-[#e62b1e] text-xs">
                        <ExternalLink className="w-3 h-3" />Link
                      </a>
                    ) : <span className="text-white/30">—</span>}
                  </td>
                  <td className="px-4 py-3 text-white/40">{p.display_order}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${p.is_published ? 'text-green-400' : 'text-white/30'}`}>
                      {p.is_published ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(p.id, p.name)} className="p-1.5 rounded-lg hover:bg-red-900/30 text-white/50 hover:text-red-400 transition-colors">
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
          <div className="nuclear-card rounded-2xl p-8 w-full max-w-lg">
            <h2 className="text-xl font-bold text-white mb-6">{modal.editing ? 'Edit partner' : 'Add partner'}</h2>
            {error && <div className="mb-4 rounded-xl bg-red-900/30 border border-red-500/40 p-3 text-sm text-red-300">{error}</div>}
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className={labelClass}>Name *</label>
                <input className={inputClass} required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Tier</label>
                <select className="input-nuclear w-full appearance-none bg-[#0a0a0a]" value={form.tier} onChange={e => setForm(p => ({ ...p, tier: e.target.value as Partner['tier'] }))}>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                  <option value="bronze">Bronze</option>
                  <option value="institutional">Institutional</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Logo URL</label>
                <input type="url" className={inputClass} value={form.logo_url} onChange={e => setForm(p => ({ ...p, logo_url: e.target.value }))} placeholder="https://…" />
              </div>
              <div>
                <label className={labelClass}>Website URL</label>
                <input type="url" className={inputClass} value={form.website_url} onChange={e => setForm(p => ({ ...p, website_url: e.target.value }))} placeholder="https://…" />
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
