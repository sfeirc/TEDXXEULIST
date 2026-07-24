'use client';

import { useState, useTransition } from 'react';
import { Download, Mail, Users, UserCheck, UserX, Send, X, AlertCircle, CheckCircle } from 'lucide-react';
import { sendBroadcast } from '@/app/actions/admin/broadcast';
import type { NewsletterSubscriber } from '@/types/database';

function fmt(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
}

function exportCSV(subscribers: NewsletterSubscriber[]) {
  const rows = [
    'email,confirmed,subscribed_at',
    ...subscribers.map(s => `${s.email},${s.confirmed},${new Date(s.created_at).toISOString()}`),
  ].join('\n');
  const blob = new Blob([rows], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `newsletter_subscribers_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

type BroadcastStatus = { type: 'success'; sent: number } | { type: 'error'; message: string } | null;

export default function NewsletterClient({ subscribers }: { subscribers: NewsletterSubscriber[] }) {
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'unconfirmed'>('all');
  const [search, setSearch] = useState('');
  const [showBroadcast, setShowBroadcast] = useState(false);
  const [broadcastForm, setBroadcastForm] = useState({
    subject: '',
    bodyHtml: '',
    audience: 'newsletter' as 'newsletter' | 'confirmed_registrants',
  });
  const [broadcastStatus, setBroadcastStatus] = useState<BroadcastStatus>(null);
  const [isPending, startTransition] = useTransition();

  const confirmed = subscribers.filter(s => s.confirmed);
  const unconfirmed = subscribers.filter(s => !s.confirmed);

  const filtered = subscribers
    .filter(s => filter === 'all' ? true : filter === 'confirmed' ? s.confirmed : !s.confirmed)
    .filter(s => !search || s.email.toLowerCase().includes(search.toLowerCase()));

  const handleSendBroadcast = () => {
    if (!broadcastForm.subject.trim() || !broadcastForm.bodyHtml.trim()) return;
    const confirmMsg = broadcastForm.audience === 'newsletter'
      ? `Send to ${confirmed.length} confirmed newsletter subscribers?`
      : `Send to confirmed event registrants?`;
    if (!confirm(confirmMsg)) return;

    setBroadcastStatus(null);
    startTransition(async () => {
      const res = await sendBroadcast(broadcastForm.subject, broadcastForm.bodyHtml, broadcastForm.audience);
      if (res.success) {
        setBroadcastStatus({ type: 'success', sent: res.sent });
        setBroadcastForm(p => ({ ...p, subject: '', bodyHtml: '' }));
      } else {
        setBroadcastStatus({ type: 'error', message: res.error ?? 'Unknown error' });
      }
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Mail className="w-5 h-5" style={{ color: '#e62b1e' }} />
            <h1 className="text-2xl font-bold text-white">Newsletter</h1>
          </div>
          <p className="text-sm mt-1" style={{ color: 'rgba(200,190,175,0.45)' }}>
            {subscribers.length} subscriber{subscribers.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setShowBroadcast(true); setBroadcastStatus(null); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{ background: '#e62b1e', color: '#fff' }}
          >
            <Send className="w-4 h-4" />
            Send broadcast
          </button>
          <button
            onClick={() => exportCSV(subscribers)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{ border: '1px solid rgba(200,190,175,0.12)', color: 'rgba(200,190,175,0.7)', background: 'rgba(200,190,175,0.04)' }}
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total', value: subscribers.length, icon: Users, color: 'rgba(200,190,175,0.5)' },
          { label: 'Confirmed', value: confirmed.length, icon: UserCheck, color: '#4ade80' },
          { label: 'Pending', value: unconfirmed.length, icon: UserX, color: 'rgba(200,190,175,0.3)' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-xl p-4" style={{ background: 'rgba(200,190,175,0.03)', border: '1px solid rgba(200,190,175,0.07)' }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: 'rgba(200,190,175,0.35)' }}>{label}</span>
              <Icon className="w-3.5 h-3.5" style={{ color }} />
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="search" placeholder="Search by email…" value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-[#e62b1e]/50"
          style={{ background: 'rgba(200,190,175,0.05)', border: '1px solid rgba(200,190,175,0.1)' }}
        />
        <div className="flex gap-2">
          {(['all', 'confirmed', 'unconfirmed'] as const).map(f => (
            <button
              key={f} onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all"
              style={{
                background: filter === f ? '#e62b1e' : 'transparent',
                color: filter === f ? '#fff' : 'rgba(200,190,175,0.5)',
                borderColor: filter === f ? '#e62b1e' : 'rgba(200,190,175,0.12)',
              }}
            >
              {f} ({f === 'all' ? subscribers.length : f === 'confirmed' ? confirmed.length : unconfirmed.length})
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl p-16 text-center" style={{ background: 'rgba(200,190,175,0.03)', border: '1px solid rgba(200,190,175,0.07)' }}>
          <p className="text-sm" style={{ color: 'rgba(200,190,175,0.3)' }}>No subscribers match your filter.</p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(200,190,175,0.08)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(200,190,175,0.06)' }}>
                {['Email', 'Status', 'Subscribed'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(200,190,175,0.35)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(200,190,175,0.04)' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(200,190,175,0.01)' }}>
                  <td className="px-4 py-3 text-white">
                    <a href={`mailto:${s.email}`} className="hover:text-[#e62b1e] transition-colors">{s.email}</a>
                  </td>
                  <td className="px-4 py-3">
                    {s.confirmed ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />Confirmed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'rgba(200,190,175,0.05)', color: 'rgba(200,190,175,0.4)', border: '1px solid rgba(200,190,175,0.1)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'rgba(200,190,175,0.4)' }}>{fmt(s.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Broadcast Modal */}
      {showBroadcast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ background: '#0c0b0a', border: '1px solid rgba(200,190,175,0.12)' }}>
            <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid rgba(200,190,175,0.08)' }}>
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" style={{ color: '#e62b1e' }} />
                <h2 className="text-lg font-bold text-white">Send Broadcast Email</h2>
              </div>
              <button onClick={() => setShowBroadcast(false)} className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {broadcastStatus && (
                <div className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${broadcastStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}
                  style={{ background: broadcastStatus.type === 'success' ? 'rgba(74,222,128,0.08)' : 'rgba(239,68,68,0.08)', border: `1px solid ${broadcastStatus.type === 'success' ? 'rgba(74,222,128,0.2)' : 'rgba(239,68,68,0.2)'}` }}>
                  {broadcastStatus.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  {broadcastStatus.type === 'success'
                    ? `✓ Sent to ${broadcastStatus.sent} recipient${broadcastStatus.sent !== 1 ? 's' : ''}!`
                    : broadcastStatus.message}
                </div>
              )}

              {/* Audience selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: 'rgba(200,190,175,0.4)' }}>Recipients</label>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { value: 'newsletter', label: 'Newsletter subscribers', desc: `${confirmed.length} confirmed` },
                    { value: 'confirmed_registrants', label: 'Confirmed registrants', desc: 'All confirmed event attendees' },
                  ] as const).map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setBroadcastForm(p => ({ ...p, audience: opt.value }))}
                      className="text-left p-4 rounded-xl transition-all"
                      style={{
                        border: broadcastForm.audience === opt.value ? '1px solid #e62b1e' : '1px solid rgba(200,190,175,0.1)',
                        background: broadcastForm.audience === opt.value ? 'rgba(230,43,30,0.08)' : 'rgba(200,190,175,0.03)',
                      }}
                    >
                      <p className="text-sm font-medium text-white mb-0.5">{opt.label}</p>
                      <p className="text-xs" style={{ color: 'rgba(200,190,175,0.4)' }}>{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: 'rgba(200,190,175,0.4)' }}>Subject *</label>
                <input
                  type="text" required
                  placeholder="TEDx IMT Paris — Important update"
                  value={broadcastForm.subject}
                  onChange={e => setBroadcastForm(p => ({ ...p, subject: e.target.value }))}
                  className="w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-[#e62b1e]/50"
                  style={{ background: 'rgba(200,190,175,0.05)', border: '1px solid rgba(200,190,175,0.12)' }}
                />
              </div>

              {/* Body */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: 'rgba(200,190,175,0.4)' }}>Message (HTML supported) *</label>
                <textarea
                  rows={8} required
                  placeholder="<p>Dear attendee,</p><p>We have an exciting update to share...</p>"
                  value={broadcastForm.bodyHtml}
                  onChange={e => setBroadcastForm(p => ({ ...p, bodyHtml: e.target.value }))}
                  className="w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-[#e62b1e]/50 resize-none font-mono"
                  style={{ background: 'rgba(200,190,175,0.05)', border: '1px solid rgba(200,190,175,0.12)' }}
                />
                <p className="text-xs mt-1.5" style={{ color: 'rgba(200,190,175,0.3)' }}>
                  HTML tags accepted: &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;a&gt;, &lt;br&gt;, &lt;ul&gt;/&lt;li&gt;
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button" onClick={() => setShowBroadcast(false)}
                  className="flex-1 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{ border: '1px solid rgba(200,190,175,0.1)', color: 'rgba(200,190,175,0.6)' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendBroadcast}
                  disabled={isPending || !broadcastForm.subject.trim() || !broadcastForm.bodyHtml.trim()}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all disabled:opacity-40"
                  style={{ background: '#e62b1e', color: '#fff' }}
                >
                  <Send className="w-4 h-4" />
                  {isPending ? 'Sending…' : 'Send now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
