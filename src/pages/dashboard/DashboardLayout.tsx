import { Outlet, Navigate } from 'react-router-dom';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-background w-full">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
