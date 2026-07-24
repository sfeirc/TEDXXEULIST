import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { redirect } from 'next/navigation';
import UsersClient from './UsersClient';

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email) redirect('/admin/login');

  // Verify super_admin via service role (bypasses RLS)
  const adminClient = createAdminClient();
  const { data: adminEntry } = await adminClient
    .from('admin_users')
    .select('role')
    .eq('email', user.email)
    .maybeSingle();

  if (adminEntry?.role !== 'super_admin') {
    redirect('/admin');
  }

  const { data: users } = await adminClient
    .from('admin_users')
    .select('id, email, role, invited_by, created_at')
    .order('created_at');

  return (
    <div className="p-8">
      <UsersClient users={users ?? []} currentEmail={user.email} />
    </div>
  );
}
