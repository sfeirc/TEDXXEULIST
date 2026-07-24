'use client';

import { useState } from 'react';
import { updateContactStatus } from '@/app/actions/admin/contacts';
import type { ContactSubmission } from '@/types/database';

type Status = ContactSubmission['status'];

const statusColor: Record<Status, string> = {
  new: 'bg-[#e62b1e]/15 text-[#e62b1e] border-[#e62b1e]/30',
  read: 'bg-white/10 text-white/60 border-white/20',
  replied: 'bg-green-500/15 text-green-400 border-green-500/30',
};

export default function ContactsClient({ contacts }: { contacts: ContactSubmission[] }) {
  const [list, setList] = useState(contacts);
  const [filter, setFilter] = useState<Status | 'all'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === 'all' ? list : list.filter(c => c.status === filter);

  const handleStatus = async (id: string, status: Status) => {
    await updateContactStatus(id, status);
    setList(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  const counts = {
    all: list.length,
    new: list.filter(c => c.status === 'new').length,
    read: list.filter(c => c.status === 'read').length,
    replied: list.filter(c => c.status === 'replied').length,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Contact submissions</h1>
        <p className="text-white/40 text-sm mt-1">{list.length} total</p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {(['all', 'new', 'read', 'replied'] as const).map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all ${
              filter === s
                ? 'bg-[#e62b1e] text-white border-[#e62b1e]'
                : 'text-white/50 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            {s} <span className="opacity-60">({counts[s]})</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="nuclear-card rounded-2xl p-16 text-center">
          <p className="text-white/30 text-sm">No messages {filter !== 'all' ? `with status "${filter}"` : 'yet'}.</p>
        </div>
      ) : (
        <div className="nuclear-card rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['Name', 'Email', 'Interest', 'Subject', 'Date', 'Status', 'Action'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/40">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map(c => (
                <>
                  <tr
                    key={c.id}
                    className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                    onClick={() => {
                      setExpanded(expanded === c.id ? null : c.id);
                      if (c.status === 'new') handleStatus(c.id, 'read');
                    }}
                  >
                    <td className="px-4 py-3 text-white font-medium">{c.name}</td>
                    <td className="px-4 py-3 text-white/60">
                      <a href={`mailto:${c.email}`} onClick={e => e.stopPropagation()} className="hover:text-[#e62b1e]">{c.email}</a>
                    </td>
                    <td className="px-4 py-3 text-white/40 capitalize">{c.interest ?? '—'}</td>
                    <td className="px-4 py-3 text-white/60 max-w-[150px] truncate">{c.subject}</td>
                    <td className="px-4 py-3 text-white/40 text-xs">{new Date(c.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColor[c.status]}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={c.status}
                        onChange={e => handleStatus(c.id, e.target.value as Status)}
                        onClick={e => e.stopPropagation()}
                        className="bg-[#0a0a0a] border border-white/10 text-white/70 text-xs px-2 py-1 rounded-lg"
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                    </td>
                  </tr>
                  {expanded === c.id && (
                    <tr key={`${c.id}-expanded`} className="bg-white/[0.015]">
                      <td colSpan={7} className="px-6 py-4">
                        <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Message</p>
                        <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">{c.message}</p>
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
