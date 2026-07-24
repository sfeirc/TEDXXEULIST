'use client';

import { useState, useTransition } from 'react';
import { Save, CheckCircle, AlertCircle, Settings } from 'lucide-react';
import { updateSettings } from '@/app/actions/admin/settings';
import type { SiteSetting } from '@/types/database';

const GROUPS: { label: string; keys: string[] }[] = [
  {
    label: 'Event Details',
    keys: ['event_date_display', 'event_date_iso', 'event_venue', 'event_venue_address', 'event_capacity', 'event_waitlist_at'],
  },
  {
    label: 'Hero Section',
    keys: ['hero_headline', 'hero_subtitle'],
  },
  {
    label: 'Registration',
    keys: ['registration_open'],
  },
  {
    label: 'About Page',
    keys: ['about_text'],
  },
  {
    label: 'Social Media',
    keys: ['social_instagram', 'social_linkedin', 'social_twitter', 'social_youtube'],
  },
  {
    label: 'Contact',
    keys: ['contact_email'],
  },
];

export default function SettingsClient({ settings }: { settings: SiteSetting[] }) {
  const byKey = Object.fromEntries(settings.map(s => [s.key, s]));
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(settings.map(s => [s.key, s.value ?? '']))
  );
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    setSaved(false);
    setSaveError('');
    startTransition(async () => {
      const res = await updateSettings(values);
      if (res.success) setSaved(true);
      else setSaveError('Save failed. Try again.');
    });
  };

  const inputBase = 'w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 transition-colors focus:outline-none focus:ring-1 focus:ring-[#e62b1e]/50';
  const inputStyle = {
    background: 'rgba(200,190,175,0.05)',
    border: '1px solid rgba(200,190,175,0.12)',
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Settings className="w-5 h-5" style={{ color: '#e62b1e' }} />
            <h1 className="text-2xl font-bold text-white">Site Settings</h1>
          </div>
          <p className="text-sm mt-1" style={{ color: 'rgba(200,190,175,0.45)' }}>
            Everything here is reflected on the public site immediately after saving.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isPending}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
          style={{ background: '#e62b1e', color: '#fff' }}
        >
          <Save className="w-4 h-4" />
          {isPending ? 'Saving…' : 'Save all changes'}
        </button>
      </div>

      {saved && (
        <div className="mb-6 flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-green-400"
          style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)' }}>
          <CheckCircle className="w-4 h-4 shrink-0" />
          Settings saved! Public pages will reflect the changes within a minute.
        </div>
      )}
      {saveError && (
        <div className="mb-6 flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-red-400"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <AlertCircle className="w-4 h-4 shrink-0" />
          {saveError}
        </div>
      )}

      <div className="space-y-8">
        {GROUPS.map(group => {
          const groupSettings = group.keys.map(k => byKey[k]).filter(Boolean);
          if (!groupSettings.length) return null;
          return (
            <div
              key={group.label}
              className="rounded-2xl p-6"
              style={{ background: 'rgba(200,190,175,0.03)', border: '1px solid rgba(200,190,175,0.07)' }}
            >
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] mb-5"
                style={{ color: 'rgba(200,190,175,0.4)' }}>
                {group.label}
              </h2>
              <div className="space-y-5">
                {groupSettings.map(setting => (
                  <div key={setting.key}>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <label className="text-sm font-medium text-white">{setting.label ?? setting.key}</label>
                      <span className="text-[0.65rem] font-mono" style={{ color: 'rgba(200,190,175,0.25)' }}>{setting.key}</span>
                    </div>
                    {setting.description && (
                      <p className="text-xs mb-2" style={{ color: 'rgba(200,190,175,0.35)' }}>{setting.description}</p>
                    )}
                    {setting.type === 'boolean' ? (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setValues(p => ({ ...p, [setting.key]: p[setting.key] === 'true' ? 'false' : 'true' }))}
                          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                          style={{
                            background: values[setting.key] === 'true' ? '#e62b1e' : 'rgba(200,190,175,0.15)',
                          }}
                          role="switch"
                          aria-checked={values[setting.key] === 'true'}
                        >
                          <span
                            className="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform"
                            style={{ transform: values[setting.key] === 'true' ? 'translateX(1.4rem)' : 'translateX(0.2rem)' }}
                          />
                        </button>
                        <span className="text-sm" style={{ color: values[setting.key] === 'true' ? '#e62b1e' : 'rgba(200,190,175,0.4)' }}>
                          {values[setting.key] === 'true' ? 'Open' : 'Closed'}
                        </span>
                      </div>
                    ) : setting.type === 'textarea' ? (
                      <textarea
                        rows={4}
                        className={`${inputBase} resize-none`}
                        style={inputStyle}
                        value={values[setting.key] ?? ''}
                        onChange={e => setValues(p => ({ ...p, [setting.key]: e.target.value }))}
                      />
                    ) : (
                      <input
                        type={setting.type === 'url' ? 'url' : setting.type === 'email' ? 'email' : 'text'}
                        className={inputBase}
                        style={inputStyle}
                        value={values[setting.key] ?? ''}
                        onChange={e => setValues(p => ({ ...p, [setting.key]: e.target.value }))}
                        placeholder={setting.type === 'url' ? 'https://…' : ''}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom save */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isPending}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
          style={{ background: '#e62b1e', color: '#fff' }}
        >
          <Save className="w-4 h-4" />
          {isPending ? 'Saving…' : 'Save all changes'}
        </button>
      </div>
    </div>
  );
}
