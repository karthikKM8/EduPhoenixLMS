import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Layers,
  Calendar,
  ClipboardList,
  FileCheck,
  CreditCard,
  BarChart3,
  UserCircle,
  MessageSquare,
  HelpCircle,
  Settings,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  type LucideIcon,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';

interface SearchItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  category: string;
  keywords: string[];
  roles: UserRole[];
}

const searchItems: SearchItem[] = [
  // Main Navigation
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, category: 'Navigation', keywords: ['home', 'main', 'overview'], roles: ['super_admin', 'admin', 'instructor', 'student'] },
  { id: 'users', label: 'User Management', path: '/dashboard/users', icon: Users, category: 'Navigation', keywords: ['students', 'instructors', 'admins', 'members'], roles: ['super_admin', 'admin'] },
  { id: 'courses', label: 'Courses', path: '/dashboard/courses', icon: BookOpen, category: 'Navigation', keywords: ['classes', 'subjects', 'lessons', 'learning'], roles: ['super_admin', 'admin', 'instructor', 'student'] },
  { id: 'batches', label: 'Batches', path: '/dashboard/batches', icon: Layers, category: 'Navigation', keywords: ['groups', 'cohorts', 'sections'], roles: ['super_admin', 'admin', 'instructor'] },
  { id: 'schedule', label: 'Schedule', path: '/dashboard/schedule', icon: Calendar, category: 'Navigation', keywords: ['timetable', 'calendar', 'classes', 'events'], roles: ['super_admin', 'admin', 'instructor', 'student'] },
  { id: 'attendance', label: 'Attendance', path: '/dashboard/attendance', icon: ClipboardList, category: 'Navigation', keywords: ['present', 'absent', 'tracking', 'records'], roles: ['super_admin', 'admin', 'instructor', 'student'] },
  { id: 'assignments', label: 'Assignments', path: '/dashboard/assignments', icon: FileCheck, category: 'Navigation', keywords: ['homework', 'tasks', 'submissions', 'grades'], roles: ['super_admin', 'admin', 'instructor', 'student'] },
  { id: 'payments', label: 'Payments', path: '/dashboard/payments', icon: CreditCard, category: 'Navigation', keywords: ['fees', 'billing', 'transactions', 'invoices'], roles: ['super_admin'] },
  { id: 'analytics', label: 'Analytics', path: '/dashboard/analytics', icon: BarChart3, category: 'Navigation', keywords: ['reports', 'statistics', 'insights', 'data'], roles: ['super_admin', 'admin', 'instructor'] },
  { id: 'profile', label: 'Profile', path: '/dashboard/profile', icon: UserCircle, category: 'Navigation', keywords: ['account', 'personal', 'details', 'my profile'], roles: ['super_admin', 'admin', 'instructor', 'student'] },
  { id: 'grievance', label: 'Grievance', path: '/dashboard/grievance', icon: MessageSquare, category: 'Navigation', keywords: ['complaints', 'issues', 'feedback', 'concerns'], roles: ['super_admin'] },
  { id: 'support', label: 'Help & Support', path: '/dashboard/support', icon: HelpCircle, category: 'Navigation', keywords: ['help', 'faq', 'assistance', 'contact'], roles: ['super_admin', 'admin', 'instructor', 'student'] },
  { id: 'settings', label: 'Settings', path: '/dashboard/settings', icon: Settings, category: 'Navigation', keywords: ['preferences', 'configuration', 'options'], roles: ['super_admin', 'admin'] },

  // Settings Sections
  { id: 'settings-general', label: 'General Settings', path: '/dashboard/settings?section=general', icon: Settings, category: 'Settings', keywords: ['platform', 'name', 'timezone'], roles: ['super_admin', 'admin'] },
  { id: 'settings-notifications', label: 'Notification Settings', path: '/dashboard/settings?section=notifications', icon: Bell, category: 'Settings', keywords: ['alerts', 'email', 'push'], roles: ['super_admin', 'admin'] },
  { id: 'settings-security', label: 'Security Settings', path: '/dashboard/settings?section=security', icon: Shield, category: 'Settings', keywords: ['password', 'two-factor', '2fa', 'authentication'], roles: ['super_admin', 'admin'] },
  { id: 'settings-appearance', label: 'Appearance Settings', path: '/dashboard/settings?section=appearance', icon: Palette, category: 'Settings', keywords: ['theme', 'dark mode', 'light mode', 'colors'], roles: ['super_admin', 'admin'] },
  { id: 'settings-localization', label: 'Localization Settings', path: '/dashboard/settings?section=localization', icon: Globe, category: 'Settings', keywords: ['language', 'region', 'date format'], roles: ['super_admin', 'admin'] },
  { id: 'settings-data', label: 'Data & Privacy', path: '/dashboard/settings?section=data', icon: Database, category: 'Settings', keywords: ['export', 'privacy', 'data management'], roles: ['super_admin', 'admin'] },

  // Quick Actions
  { id: 'add-user', label: 'Add New User', path: '/dashboard/users?action=add', icon: Users, category: 'Quick Actions', keywords: ['create user', 'new student', 'new instructor'], roles: ['super_admin', 'admin'] },
  { id: 'create-course', label: 'Create Course', path: '/dashboard/courses?action=create', icon: BookOpen, category: 'Quick Actions', keywords: ['new course', 'add course'], roles: ['super_admin', 'admin', 'instructor'] },
  { id: 'create-batch', label: 'Create Batch', path: '/dashboard/batches?action=create', icon: Layers, category: 'Quick Actions', keywords: ['new batch', 'add batch', 'new group'], roles: ['super_admin', 'admin'] },
  { id: 'view-reports', label: 'View Reports', path: '/dashboard/analytics', icon: BarChart3, category: 'Quick Actions', keywords: ['analytics', 'statistics', 'insights'], roles: ['super_admin', 'admin', 'instructor'] },
];

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Filter items based on user role
  const filteredItems = searchItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  // Group items by category
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchItem[]>);

  const handleSelect = useCallback((path: string) => {
    onOpenChange(false);
    navigate(path);
  }, [navigate, onOpenChange]);

  // Keyboard shortcut to open search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search pages, settings, actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {Object.entries(groupedItems).map(([category, items]) => (
          <CommandGroup key={category} heading={category}>
            {items.map((item) => (
              <CommandItem
                key={item.id}
                value={`${item.label} ${item.keywords.join(' ')}`}
                onSelect={() => handleSelect(item.path)}
                className="cursor-pointer"
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
