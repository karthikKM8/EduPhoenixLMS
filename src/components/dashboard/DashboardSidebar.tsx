import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  GraduationCap,
  CreditCard,
  ClipboardList,
  BarChart3,
  UserCircle,
  HelpCircle,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Layers,
  FileCheck
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  roles: string[];
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', roles: ['super_admin', 'admin', 'instructor', 'student'] },
  { icon: Users, label: 'User Management', path: '/dashboard/users', roles: ['super_admin', 'admin'] },
  { icon: BookOpen, label: 'Courses', path: '/dashboard/courses', roles: ['super_admin', 'admin', 'instructor', 'student'] },
  { icon: Layers, label: 'Batches', path: '/dashboard/batches', roles: ['super_admin', 'admin', 'instructor'] },
  { icon: ClipboardList, label: 'Attendance', path: '/dashboard/attendance', roles: ['admin', 'instructor', 'student'] },
  { icon: FileCheck, label: 'Assignments', path: '/dashboard/assignments', roles: ['admin', 'instructor', 'student'] },
  { icon: CreditCard, label: 'Payments', path: '/dashboard/payments', roles: ['super_admin'] },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics', roles: ['super_admin', 'admin', 'instructor'] },
  { icon: UserCircle, label: 'Profile', path: '/dashboard/profile', roles: ['super_admin', 'admin', 'instructor', 'student'] },
  { icon: MessageSquare, label: 'Grievance', path: '/dashboard/grievance', roles: ['super_admin'] },
  { icon: HelpCircle, label: 'Help & Support', path: '/dashboard/support', roles: ['super_admin', 'admin', 'instructor', 'student'] },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings', roles: ['super_admin', 'admin'] },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const filteredNavItems = navItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-accent text-accent-foreground';
      case 'admin': return 'bg-primary text-primary-foreground';
      case 'instructor': return 'bg-phoenix-gold-dark text-accent-foreground';
      case 'student': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <aside className={cn(
      "h-screen bg-sidebar flex flex-col border-r border-sidebar-border transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && <Logo size="sm" />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* User Info */}
      {!collapsed && user && (
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-phoenix flex items-center justify-center text-primary-foreground font-semibold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
              <span className={cn("text-xs px-2 py-0.5 rounded-full", getRoleBadgeColor(user.role))}>
                {user.role.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {filteredNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                isActive 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-phoenix" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                collapsed && "justify-center"
              )}
            >
              <item.icon size={20} />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={logout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
            collapsed && "justify-center"
          )}
        >
          <LogOut size={20} />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
