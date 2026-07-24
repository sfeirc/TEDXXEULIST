import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import SidebarNav from './SidebarNav';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let userRole: 'admin' | 'super_admin' | null = null;
  if (user?.email) {
    const adminClient = createAdminClient();
    const { data } = await adminClient
      .from('admin_users')
      .select('role')
      .eq('email', user.email)
      .maybeSingle();
    userRole = (data?.role as typeof userRole) ?? null;
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#070706', fontFamily: 'var(--font-ui, system-ui)' }}>
      <SidebarNav email={user?.email} userRole={userRole} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
