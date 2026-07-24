'use client';

import { useState } from 'react';
import { upsertFaq, deleteFaq, toggleFaqPublished } from '@/app/actions/admin/faq';
import type { FaqItem } from '@/types/database';
import { Plus, Pencil, Trash2, Eye, EyeOff, ChevronDown, ChevronUp, X, Check } from 'lucide-react';

const borderWarm = 'rgba(200,190,175,0.09)';

function FaqForm({
  initial,
  onDone,
  onCancel,
}: {
  initial?: Partial<FaqItem>;
  onDone: (item: Partial<FaqItem>) => void;
  onCancel: () => void;
}) {
  const [question, setQuestion] = useState(initial?.question ?? '');
  const [answer, setAnswer] = useState(initial?.answer ?? '');
  const [category, setCategory] = useState(initial?.category ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!question.trim() || !answer.trim()) { setError('Question and answer are required.'); return; }
    setSaving(true);
    const result = await upsertFaq({ question, answer, category: category || undefined, is_published: initial?.is_published ?? true }, initial?.id);
    setSaving(false);
    if ('error' in result) { setError(result.error); return; }
    onDone({ ...initial, question, answer, category: category || null });
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: borderWarm,
    color: '#f4f0e8',
    borderRadius: '10px',
    padding: '10px 14px',
    width: '100%',
    outline: 'none',
    fontSize: '14px',
  };

  return (
    <div className="rounded-2xl p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(230,43,30,0.2)' }}>
      <input
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Question…"
        style={inputStyle}
      />
      <textarea
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        placeholder="Answer… (plain text, keep it concise)"
        rows={4}
        style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }}
      />
      <input
        value={category}
        onChange={e => setCategory(e.target.value)}
        placeholder="Category (optional, e.g. Tickets, Speakers)"
        style={inputStyle}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
      <div className="flex gap-2 justify-end pt-1">
        <button onClick={onCancel} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-label font-semibold" style={{ color: 'rgba(200,190,175,0.5)' }}>
          <X className="w-3.5 h-3.5" /> Cancel
        </button>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-label font-semibold disabled:opacity-50" style={{ background: '#e62b1e', color: '#fff' }}>
          <Check className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>
  );
}

export default function FaqClient({ items: initial }: { items: FaqItem[] }) {
  const [items, setItems] = useState(initial);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | 'new' | null>(null);

  const handleToggle = async (id: string, is_published: boolean) => {
    await toggleFaqPublished(id, !is_published);
    setItems(prev => prev.map(i => i.id === id ? { ...i, is_published: !is_published } : i));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this FAQ item?')) return;
    await deleteFaq(id);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleSaved = (id: string | undefined, data: Partial<FaqItem>) => {
    if (!id) {
      // new item — refresh optimistically with placeholder id
      setItems(prev => [...prev, { ...data, id: crypto.randomUUID(), display_order: prev.length, is_published: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as FaqItem]);
    } else {
      setItems(prev => prev.map(i => i.id === id ? { ...i, ...data } : i));
    }
    setEditing(null);
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="font-label text-[0.65rem] tracking-[0.2em] uppercase mb-1.5" style={{ color: 'rgba(200,190,175,0.35)' }}>Admin</p>
          <h1 className="font-display text-3xl font-light" style={{ color: '#f4f0e8' }}>FAQ</h1>
          <p className="font-label text-xs mt-1" style={{ color: 'rgba(200,190,175,0.4)' }}>{items.length} questions · changes visible instantly on the site</p>
        </div>
        <button
          onClick={() => setEditing('new')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-label text-xs font-semibold"
          style={{ background: '#e62b1e', color: '#fff' }}
        >
          <Plus className="w-3.5 h-3.5" /> Add question
        </button>
      </div>

      {editing === 'new' && (
        <div className="mb-4">
          <FaqForm onDone={data => handleSaved(undefined, data)} onCancel={() => setEditing(null)} />
        </div>
      )}

      <div className="space-y-2">
        {items.length === 0 && editing !== 'new' && (
          <div className="rounded-2xl p-12 text-center" style={{ border: borderWarm }}>
            <p className="text-sm" style={{ color: 'rgba(200,190,175,0.35)' }}>No FAQ items yet. Add your first question.</p>
          </div>
        )}
        {items.map(item => (
          <div key={item.id} className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: borderWarm }}>
            {editing === item.id ? (
              <div className="p-3">
                <FaqForm initial={item} onDone={data => handleSaved(item.id, data)} onCancel={() => setEditing(null)} />
              </div>
            ) : (
              <>
                <div
                  className="flex items-center gap-3 px-5 py-4 cursor-pointer"
                  onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {!item.is_published && (
                        <span className="font-label text-[0.6rem] px-1.5 py-0.5 rounded" style={{ background: 'rgba(200,190,175,0.08)', color: 'rgba(200,190,175,0.4)' }}>hidden</span>
                      )}
                      {item.category && (
                        <span className="font-label text-[0.6rem] px-2 py-0.5 rounded-full" style={{ background: 'rgba(230,43,30,0.1)', color: '#e62b1e', border: '1px solid rgba(230,43,30,0.2)' }}>{item.category}</span>
                      )}
                    </div>
                    <p className="text-sm font-medium mt-1" style={{ color: item.is_published ? '#f4f0e8' : 'rgba(200,190,175,0.4)' }}>{item.question}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                    <button onClick={() => handleToggle(item.id, item.is_published)} className="p-1.5 rounded-lg transition-colors" title={item.is_published ? 'Hide' : 'Show'} style={{ color: 'rgba(200,190,175,0.4)' }}>
                      {item.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => setEditing(item.id)} className="p-1.5 rounded-lg transition-colors" style={{ color: 'rgba(200,190,175,0.4)' }}>
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg transition-colors" style={{ color: 'rgba(239,68,68,0.5)' }}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    {expanded === item.id ? <ChevronUp className="w-3.5 h-3.5 ml-1" style={{ color: 'rgba(200,190,175,0.4)' }} /> : <ChevronDown className="w-3.5 h-3.5 ml-1" style={{ color: 'rgba(200,190,175,0.4)' }} />}
                  </div>
                </div>
                {expanded === item.id && (
                  <div className="px-5 pb-4 pt-0">
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,190,175,0.6)', borderTop: borderWarm, paddingTop: '12px' }}>{item.answer}</p>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
