'use server';

import { randomBytes } from 'crypto';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

type Role = 'admin' | 'super_admin';
type Result<T = void> = { success: true; data?: T } | { success: false; error: string };

async function getCurrentSuperAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return null;

  const admin = createAdminClient();
  const { data } = await admin
    .from('admin_users')
    .select('role')
    .eq('email', user.email)
    .maybeSingle();

  return data?.role === 'super_admin' ? user : null;
}

export async function listAdminUsers() {
  const caller = await getCurrentSuperAdmin();
  if (!caller) return { success: false as const, error: 'Unauthorized' };

  const admin = createAdminClient();
  const { data, error } = await admin
    .from('admin_users')
    .select('id, email, role, invited_by, created_at')
    .order('created_at');

  if (error) return { success: false as const, error: error.message };
  return { success: true as const, data: data ?? [] };
}

export async function createAdminUser(
  email: string,
  role: Role
): Promise<Result<{ tempPassword: string }>> {
  const caller = await getCurrentSuperAdmin();
  if (!caller) return { success: false, error: 'Unauthorized — super admin only' };

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Invalid email address' };
  }

  const tempPassword = 'Admin@' + randomBytes(5).toString('hex') + '!';
  const adminClient = createAdminClient();

  // Create or retrieve auth user
  const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true,
  });

  if (authError) {
    // If user already exists in auth, just add to admin_users
    if (!authError.message.toLowerCase().includes('already')) {
      return { success: false, error: authError.message };
    }
  }

  // Insert into admin_users (ignore if already exists)
  const { error: dbError } = await adminClient
    .from('admin_users')
    .upsert({ email, role, invited_by: caller.email }, { onConflict: 'email' });

  if (dbError) {
    // Rollback auth user if we just created them
    if (authData?.user) {
      await adminClient.auth.admin.deleteUser(authData.user.id);
    }
    return { success: false, error: dbError.message };
  }

  revalidatePath('/admin/users');
  return { success: true, data: { tempPassword: authError ? '(compte existant — mot de passe inchangé)' : tempPassword } };
}

export async function updateAdminRole(targetEmail: string, newRole: Role): Promise<Result> {
  const caller = await getCurrentSuperAdmin();
  if (!caller) return { success: false, error: 'Unauthorized' };
  if (targetEmail === caller.email) return { success: false, error: 'Cannot change your own role' };

  const adminClient = createAdminClient();
  const { error } = await adminClient
    .from('admin_users')
    .update({ role: newRole })
    .eq('email', targetEmail);

  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/users');
  return { success: true };
}

export async function deleteAdminUser(targetId: string, targetEmail: string): Promise<Result> {
  const caller = await getCurrentSuperAdmin();
  if (!caller) return { success: false, error: 'Unauthorized' };
  if (targetEmail === caller.email) return { success: false, error: 'Cannot delete your own account' };

  const adminClient = createAdminClient();

  // Get Supabase Auth user ID by email
  const { data: authList } = await adminClient.auth.admin.listUsers();
  const authUser = authList?.users?.find(u => u.email === targetEmail);

  // Remove from admin_users table
  const { error: dbError } = await adminClient
    .from('admin_users')
    .delete()
    .eq('id', targetId);

  if (dbError) return { success: false, error: dbError.message };

  // Delete from Supabase Auth (non-blocking)
  if (authUser) {
    await adminClient.auth.admin.deleteUser(authUser.id);
  }

  revalidatePath('/admin/users');
  return { success: true };
}
