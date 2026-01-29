import {
  LayoutDashboard,
  User,
  BookOpen,
  Users,
  ClipboardList,
  Settings,
} from "lucide-react";

export type RoleType = "super_admin" | "admin" | "user";

export type DashboardNavItem = {
  label: string;
  path: string;
  icon?: any;
  roles: RoleType[];
};

export const dashboardNavItems: DashboardNavItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: ["super_admin", "admin", "user"],
  },
  {
    label: "Profile",
    path: "/dashboard/profile",
    icon: User,
    roles: ["super_admin", "admin", "user"],
  },
  {
    label: "Courses",
    path: "/dashboard/courses",
    icon: BookOpen,
    roles: ["super_admin", "admin", "user"],
  },
  {
    label: "Students",
    path: "/dashboard/students",
    icon: Users,
    roles: ["super_admin", "admin"],
  },
  {
    label: "Assignments",
    path: "/dashboard/assignments",
    icon: ClipboardList,
    roles: ["super_admin", "admin", "user"],
  },
  {
    label: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
    roles: ["super_admin", "admin"],
  },
];
