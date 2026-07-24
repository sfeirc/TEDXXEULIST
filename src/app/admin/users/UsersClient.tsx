'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, Trash2, Shield, User, AlertCircle, CheckCircle, Eye, EyeOff, Crown } from 'lucide-react';
import { createAdminUser, deleteAdminUser, updateAdminRole } from '@/app/actions/admin/users';

type AdminUser = {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
  invited_by: string | null;
  created_at: string;
};

function fmt(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
}

const borderWarm = 'rgba(200,190,175,0.09)';

export default function UsersClient({ users: initial, currentEmail }: { users: AdminUser[]; currentEmail: string }) {
  const router = useRouter();
  const [users, setUsers] = useState(initial);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ email: '', role: 'admin' as 'admin' | 'super_admin' });
  const [newCredentials, setNewCredentials] = useState<{ email: string; password: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleAdd = () => {
    if (!form.email.trim()) return;
    setFeedback(null);
    startTransition(async () => {
      const res = await createAdminUser(form.email.trim(), form.role);
      if (!res.success) {
        setFeedback({ type: 'error', message: res.error });
        return;
      }
      setNewCredentials({ email: form.email.trim(), password: res.data!.tempPassword });
      setForm({ email: '', role: 'admin' });
      setShowAdd(false);
      router.refresh();
    });
  };

  const handleDelete = (id: string, email: string) => {
    if (!confirm(`Supprimer l'accès admin de ${email} ?\n\nLeur compte sera définitivement supprimé.`)) return;
    startTransition(async () => {
      const res = await deleteAdminUser(id, email);
      if (!res.success) { setFeedback({ type: 'error', message: res.error }); return; }
      setUsers(prev => prev.filter(u => u.id !== id));
      setFeedback({ type: 'success', message: `${email} supprimé.` });
    });
  };

  const handleRoleChange = (email: string, newRole: 'admin' | 'super_admin') => {
    const label = newRole === 'super_admin' ? 'super admin' : 'admin';
    if (!confirm(`Changer le rôle de ${email} en ${label} ?`)) return;
    startTransition(async () => {
      const res = await updateAdminRole(email, newRole);
      if (!res.success) { setFeedback({ type: 'error', message: res.error }); return; }
      setUsers(prev => prev.map(u => u.email === email ? { ...u, role: newRole } : u));
    });
  };

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Crown className="w-5 h-5" style={{ color: '#e62b1e' }} />
            <h1 className="text-2xl font-bold text-white">Gestion des admins</h1>
          </div>
          <p className="text-sm mt-1" style={{ color: 'rgba(200,190,175,0.45)' }}>
            {users.length} compte{users.length > 1 ? 's' : ''} admin · Accès super admin requis
          </p>
        </div>
        <button
          onClick={() => { setShowAdd(v => !v); setFeedback(null); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
          style={{ background: '#e62b1e', color: '#fff' }}
        >
          <UserPlus className="w-4 h-4" />
          Ajouter un admin
        </button>
      </div>

      {/* Feedback */}
      {feedback && (
        <div
          className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm mb-6"
          style={{
            background: feedback.type === 'success' ? 'rgba(74,222,128,0.08)' : 'rgba(239,68,68,0.08)',
            border: `1px solid ${feedback.type === 'success' ? 'rgba(74,222,128,0.2)' : 'rgba(239,68,68,0.2)'}`,
            color: feedback.type === 'success' ? '#4ade80' : '#f87171',
          }}
        >
          {feedback.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          {feedback.message}
        </div>
      )}

      {/* New credentials card (shown once after creation) */}
      {newCredentials && (
        <div className="rounded-2xl p-5 mb-6" style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)' }}>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <p className="text-sm font-semibold text-green-400">Compte créé — transmettez ces identifiants de manière sécurisée</p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <span style={{ color: 'rgba(200,190,175,0.5)' }}>Email :</span>
              <code className="text-white font-mono">{newCredentials.email}</code>
            </div>
            <div className="flex items-center gap-3">
              <span style={{ color: 'rgba(200,190,175,0.5)' }}>Mot de passe :</span>
              <code className="text-white font-mono">{showPassword ? newCredentials.password : '••••••••••••••'}</code>
              <button onClick={() => setShowPassword(v => !v)} className="text-white/40 hover:text-white transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <p className="text-xs mt-3" style={{ color: 'rgba(200,190,175,0.4)' }}>
            ⚠️ Ce mot de passe ne sera plus affiché. La personne peut le changer après sa première connexion.
          </p>
          <button onClick={() => { setNewCredentials(null); setShowPassword(false); }} className="text-xs mt-2 text-white/40 hover:text-white transition-colors underline">
            Fermer
          </button>
        </div>
      )}

      {/* Add form */}
      {showAdd && (
        <div className="rounded-2xl p-5 mb-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(230,43,30,0.2)' }}>
          <h2 className="text-sm font-semibold text-white mb-4">Nouvel administrateur</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'rgba(200,190,175,0.4)' }}>
                Email *
              </label>
              <input
                type="email" required
                placeholder="email@exemple.com"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-[#e62b1e]/50"
                style={{ background: 'rgba(200,190,175,0.05)', border: `1px solid ${borderWarm}` }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'rgba(200,190,175,0.4)' }}>
                Rôle
              </label>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { value: 'admin', label: 'Admin', desc: 'Gère le contenu du site', icon: User },
                  { value: 'super_admin', label: 'Super Admin', desc: 'Gère aussi les admins', icon: Crown },
                ] as const).map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setForm(p => ({ ...p, role: opt.value }))}
                    className="text-left p-3 rounded-xl transition-all"
                    style={{
                      border: form.role === opt.value ? '1px solid #e62b1e' : `1px solid ${borderWarm}`,
                      background: form.role === opt.value ? 'rgba(230,43,30,0.08)' : 'rgba(200,190,175,0.03)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <opt.icon className="w-3.5 h-3.5" style={{ color: form.role === opt.value ? '#e62b1e' : 'rgba(200,190,175,0.4)' }} />
                      <p className="text-sm font-medium text-white">{opt.label}</p>
                    </div>
                    <p className="text-xs" style={{ color: 'rgba(200,190,175,0.4)' }}>{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setShowAdd(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium"
                style={{ border: `1px solid ${borderWarm}`, color: 'rgba(200,190,175,0.5)' }}
              >
                Annuler
              </button>
              <button
                onClick={handleAdd}
                disabled={isPending || !form.email.trim()}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium disabled:opacity-40"
                style={{ background: '#e62b1e', color: '#fff' }}
              >
                {isPending ? 'Création…' : 'Créer le compte'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users list */}
      <div className="rounded-2xl overflow-hidden" style={{ border: borderWarm }}>
        <div className="px-5 py-3.5 flex items-center" style={{ borderBottom: borderWarm, background: 'rgba(255,255,255,0.02)' }}>
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(200,190,175,0.35)' }}>
            Comptes administrateurs
          </span>
        </div>
        <div className="divide-y" style={{ borderColor: borderWarm }}>
          {users.map(u => {
            const isSelf = u.email === currentEmail;
            const isSuperAdmin = u.role === 'super_admin';

            return (
              <div key={u.id} className="flex items-center gap-4 px-5 py-4">
                {/* Avatar */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                  style={{
                    background: isSuperAdmin ? 'rgba(230,43,30,0.12)' : 'rgba(200,190,175,0.07)',
                    color: isSuperAdmin ? '#e62b1e' : 'rgba(200,190,175,0.5)',
                    border: `1px solid ${isSuperAdmin ? 'rgba(230,43,30,0.2)' : 'rgba(200,190,175,0.1)'}`,
                  }}
                >
                  {u.email.charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-white truncate">{u.email}</p>
                    {isSelf && (
                      <span className="text-[0.6rem] font-label font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(200,190,175,0.08)', color: 'rgba(200,190,175,0.5)', border: '1px solid rgba(200,190,175,0.12)' }}>
                        vous
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(200,190,175,0.35)' }}>
                    Depuis le {fmt(u.created_at)}
                    {u.invited_by && <span> · invité par {u.invited_by}</span>}
                  </p>
                </div>

                {/* Role badge + change */}
                <div className="flex items-center gap-2 shrink-0">
                  {isSelf ? (
                    <span
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{
                        background: isSuperAdmin ? 'rgba(230,43,30,0.12)' : 'rgba(200,190,175,0.07)',
                        color: isSuperAdmin ? '#e62b1e' : 'rgba(200,190,175,0.6)',
                        border: `1px solid ${isSuperAdmin ? 'rgba(230,43,30,0.2)' : 'rgba(200,190,175,0.1)'}`,
                      }}
                    >
                      {isSuperAdmin ? <Crown className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                      {isSuperAdmin ? 'Super Admin' : 'Admin'}
                    </span>
                  ) : (
                    <select
                      value={u.role}
                      onChange={e => handleRoleChange(u.email, e.target.value as 'admin' | 'super_admin')}
                      disabled={isPending}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full appearance-none cursor-pointer focus:outline-none"
                      style={{
                        background: isSuperAdmin ? 'rgba(230,43,30,0.12)' : 'rgba(200,190,175,0.07)',
                        color: isSuperAdmin ? '#e62b1e' : 'rgba(200,190,175,0.6)',
                        border: `1px solid ${isSuperAdmin ? 'rgba(230,43,30,0.2)' : 'rgba(200,190,175,0.1)'}`,
                      }}
                    >
                      <option value="admin" style={{ background: '#0c0b0a' }}>Admin</option>
                      <option value="super_admin" style={{ background: '#0c0b0a' }}>Super Admin</option>
                    </select>
                  )}

                  {/* Delete */}
                  {!isSelf && (
                    <button
                      onClick={() => handleDelete(u.id, u.email)}
                      disabled={isPending}
                      className="p-1.5 rounded-lg hover:bg-red-900/30 text-white/30 hover:text-red-400 transition-colors disabled:opacity-40"
                      title="Supprimer cet admin"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info box */}
      <div className="mt-6 rounded-xl px-4 py-3 text-xs" style={{ background: 'rgba(200,190,175,0.03)', border: borderWarm, color: 'rgba(200,190,175,0.4)' }}>
        <p className="font-semibold mb-1 text-white/50">À savoir</p>
        <ul className="space-y-0.5 list-disc list-inside">
          <li>Un <strong className="text-white/60">Admin</strong> peut gérer tout le contenu du site (speakers, team, programme, inscriptions…)</li>
          <li>Un <strong className="text-white/60">Super Admin</strong> peut en plus ajouter/supprimer des admins et changer leurs rôles</li>
          <li>Vous ne pouvez pas supprimer ni modifier votre propre compte depuis cette interface</li>
        </ul>
      </div>
    </div>
  );
}
