'use client';

import { useState, useMemo } from 'react';
import { updateRegistrationStatus, bulkUpdateStatus } from '@/app/actions/admin/registrations';
import type { Registration } from '@/types/database';
import { Search, Download, ChevronDown, ChevronUp } from 'lucide-react';

type Status = Registration['status'];

const statusStyle: Record<Status, { bg: string; color: string; border: string }> = {
  pending:    { bg: 'rgba(234,179,8,0.1)',  color: '#fbbf24', border: 'rgba(234,179,8,0.25)' },
  confirmed:  { bg: 'rgba(34,197,94,0.1)',  color: '#4ade80', border: 'rgba(34,197,94,0.25)' },
  waitlisted: { bg: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: 'rgba(59,130,246,0.25)' },
  cancelled:  { bg: 'rgba(239,68,68,0.1)',  color: '#f87171', border: 'rgba(239,68,68,0.25)' },
};

const borderWarm = 'rgba(200,190,175,0.09)';

function StatusBadge({ status }: { status: Status }) {
  const s = statusStyle[status];
  return (
    <span
      className="text-[0.62rem] font-label font-semibold px-2 py-0.5 rounded-full"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`, letterSpacing: '0.07em' }}
    >
      {status}
    </span>
  );
}

export default function RegistrationsClient({ registrations }: { registrations: Registration[] }) {
  const [list, setList]         = useState(registrations);
  const [filter, setFilter]     = useState<Status | 'all'>('all');
  const [search, setSearch]     = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulking, setBulking]   = useState(false);

  const filtered = useMemo(() => {
    let base = filter === 'all' ? list : list.filter(r => r.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      base = base.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        (r.institution ?? '').toLowerCase().includes(q)
      );
    }
    return base;
  }, [list, filter, search]);

  const counts = {
    all:        list.length,
    pending:    list.filter(r => r.status === 'pending').length,
    confirmed:  list.filter(r => r.status === 'confirmed').length,
    waitlisted: list.filter(r => r.status === 'waitlisted').length,
    cancelled:  list.filter(r => r.status === 'cancelled').length,
  };

  const handleStatus = async (id: string, status: Status) => {
    await updateRegistrationStatus(id, status);
    setList(prev => prev.map(r => {
      if (r.id === id) return { ...r, status };
      // Mirror auto-promotion: if cancelling confirmed and someone is waitlisted
      return r;
    }));
  };

  const toggleSelect = (id: string) =>
    setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const allSelected = filtered.length > 0 && filtered.every(r => selected.has(r.id));
  const toggleAll = () =>
    setSelected(prev => {
      const n = new Set(prev);
      allSelected ? filtered.forEach(r => n.delete(r.id)) : filtered.forEach(r => n.add(r.id));
      return n;
    });

  const handleBulk = async (status: Status) => {
    setBulking(true);
    await bulkUpdateStatus([...selected], status);
    setList(prev => prev.map(r => selected.has(r.id) ? { ...r, status } : r));
    setSelected(new Set());
    setBulking(false);
  };

  const handleExport = () => {
    window.location.href = '/api/admin/export?type=registrations';
  };

  const fmt = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: '2-digit' });

  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="font-label text-[0.65rem] tracking-[0.2em] uppercase mb-1.5" style={{ color: 'rgba(200,190,175,0.35)' }}>
            Admin
          </p>
          <h1 className="font-display text-3xl font-light" style={{ color: '#f4f0e8' }}>
            Registrations
          </h1>
          <p className="font-label text-xs mt-1" style={{ color: 'rgba(200,190,175,0.4)' }}>
            {counts.confirmed} confirmed · {counts.pending} pending · {counts.waitlisted} waitlisted
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-label text-xs font-semibold tracking-wide transition-all"
          style={{ background: 'rgba(255,255,255,0.04)', border: borderWarm, color: 'rgba(200,190,175,0.7)' }}
        >
          <Download className="w-3.5 h-3.5" />
          Export CSV
        </button>
      </div>

      {/* Filters + search */}
      <div className="flex flex-wrap gap-3 mb-5 items-center">
        <div className="flex gap-1.5 flex-wrap">
          {(['all', 'pending', 'confirmed', 'waitlisted', 'cancelled'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className="px-3.5 py-1.5 rounded-full font-label text-[0.65rem] font-semibold tracking-wider uppercase border transition-all"
              style={
                filter === s
                  ? { background: '#e62b1e', color: '#fff', border: '1px solid #e62b1e' }
                  : { background: 'transparent', color: 'rgba(200,190,175,0.45)', border: borderWarm }
              }
            >
              {s} <span style={{ opacity: 0.6 }}>({counts[s]})</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto rounded-xl px-3 py-2" style={{ background: 'rgba(255,255,255,0.04)', border: borderWarm, minWidth: '200px' }}>
          <Search className="w-3.5 h-3.5 shrink-0" style={{ color: 'rgba(200,190,175,0.35)' }} />
          <input
            type="text"
            placeholder="Search…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm w-full"
            style={{ color: '#f4f0e8' }}
          />
        </div>
      </div>

      {/* Bulk actions bar */}
      {selected.size > 0 && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4 font-label text-sm"
          style={{ background: 'rgba(230,43,30,0.08)', border: '1px solid rgba(230,43,30,0.2)' }}
        >
          <span style={{ color: 'rgba(200,190,175,0.7)' }}>{selected.size} selected</span>
          <div className="flex gap-2 ml-auto">
            {(['confirmed', 'pending', 'waitlisted', 'cancelled'] as Status[]).map(s => (
              <button
                key={s}
                onClick={() => handleBulk(s)}
                disabled={bulking}
                className="px-3 py-1 rounded-lg text-xs font-semibold transition-all disabled:opacity-40"
                style={{ background: statusStyle[s].bg, color: statusStyle[s].color, border: `1px solid ${statusStyle[s].border}` }}
              >
                → {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-2xl p-16 text-center" style={{ border: borderWarm }}>
          <p className="text-sm" style={{ color: 'rgba(200,190,175,0.3)' }}>
            {search ? 'No results for this search.' : `No registrations${filter !== 'all' ? ` with status "${filter}"` : ' yet'}.`}
          </p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: borderWarm }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: borderWarm }}>
                <th className="px-4 py-3 text-left w-8">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="accent-[#e62b1e] w-3.5 h-3.5 cursor-pointer"
                  />
                </th>
                {['Name', 'Email', 'Institution', 'Date', 'Status', 'Actions'].map(h => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-label text-[0.6rem] font-semibold uppercase tracking-wider"
                    style={{ color: 'rgba(200,190,175,0.35)' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <>
                  <tr
                    key={r.id}
                    className="cursor-pointer transition-colors"
                    style={{
                      borderTop: i > 0 ? `1px solid ${borderWarm}` : undefined,
                      background: selected.has(r.id) ? 'rgba(230,43,30,0.04)' : 'transparent',
                    }}
                    onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                  >
                    <td className="px-4 py-3.5" onClick={e => { e.stopPropagation(); toggleSelect(r.id); }}>
                      <input
                        type="checkbox"
                        checked={selected.has(r.id)}
                        onChange={() => toggleSelect(r.id)}
                        className="accent-[#e62b1e] w-3.5 h-3.5 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3.5 font-medium" style={{ color: '#f4f0e8' }}>{r.name}</td>
                    <td className="px-4 py-3.5" style={{ color: 'rgba(200,190,175,0.55)' }}>{r.email}</td>
                    <td className="px-4 py-3.5 font-label text-xs" style={{ color: 'rgba(200,190,175,0.35)' }}>{r.institution ?? '—'}</td>
                    <td className="px-4 py-3.5 font-label text-xs" style={{ color: 'rgba(200,190,175,0.35)' }}>{fmt(r.created_at)}</td>
                    <td className="px-4 py-3.5"><StatusBadge status={r.status} /></td>
                    <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <select
                          value={r.status}
                          onChange={e => handleStatus(r.id, e.target.value as Status)}
                          className="rounded-lg text-xs px-2 py-1 outline-none cursor-pointer"
                          style={{ background: 'rgba(255,255,255,0.05)', border: borderWarm, color: 'rgba(200,190,175,0.7)' }}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="waitlisted">Waitlisted</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        {expanded === r.id
                          ? <ChevronUp className="w-3.5 h-3.5" style={{ color: 'rgba(200,190,175,0.4)' }} />
                          : <ChevronDown className="w-3.5 h-3.5" style={{ color: 'rgba(200,190,175,0.4)' }} />}
                      </div>
                    </td>
                  </tr>
                  {expanded === r.id && (
                    <tr key={`${r.id}-exp`} style={{ background: 'rgba(255,255,255,0.015)', borderTop: `1px solid ${borderWarm}` }}>
                      <td colSpan={7} className="px-8 py-4">
                        <div className="grid grid-cols-3 gap-6 text-sm">
                          <div>
                            <p className="font-label text-[0.6rem] uppercase tracking-wider mb-1" style={{ color: 'rgba(200,190,175,0.35)' }}>Role</p>
                            <p style={{ color: 'rgba(200,190,175,0.8)' }}>{r.role ?? '—'}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="font-label text-[0.6rem] uppercase tracking-wider mb-1" style={{ color: 'rgba(200,190,175,0.35)' }}>Motivation</p>
                            <p style={{ color: 'rgba(200,190,175,0.8)' }}>{r.motivation ?? '—'}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
