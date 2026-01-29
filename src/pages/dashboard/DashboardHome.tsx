import { useAuth } from "@/contexts/AuthContext";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import {
  Users,
  BookOpen,
  GraduationCap,
  Clock,
  Award,
  FileCheck,
  BarChart3,
  Play,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const superAdminStats = [
  { title: "Total Users", value: "9", icon: Users, href: "/dashboard/users" },

  // ✅ ROLE BASED CLICKING
  { title: "Admins", value: "1", icon: Users, href: "/dashboard/users?role=admin" },
  { title: "Instructors", value: "3", icon: BookOpen, href: "/dashboard/users?role=instructor" },
  { title: "Student", value: "4", icon: GraduationCap, href: "/dashboard/users?role=student" },
];

const adminStats = [
  // ✅ ROLE BASED CLICKING
  { title: "Active Students", value: "9", icon: GraduationCap, href: "/dashboard/users?role=student" },
  { title: "Instructors", value: "3", icon: Users, href: "/dashboard/users?role=instructor" },

  { title: "Courses", value: "5", icon: BookOpen, href: "/dashboard/courses" },

  // ✅ Keeping your same card but role based
  {
    title: "Instructors",
    value: "3",
    icon: Users,
    variant: "primary" as const,
    href: "/dashboard/users?role=instructor",
  },
];

const instructorStats = [
  { title: "My Courses", value: "5", icon: BookOpen, href: "/dashboard/courses" },

  // ✅ ROLE BASED CLICKING
  { title: "Total Students", value: "4", icon: GraduationCap, href: "/dashboard/users?role=student" },

  { title: "Pending Assignments", value: "12", icon: FileCheck, variant: "accent" as const },
  { title: "Avg. Rating", value: "4.8", icon: Award },
];

const studentStats = [
  { title: "Enrolled Courses", value: "5", icon: BookOpen },
  { title: "Completed", value: "4", icon: Award, variant: "primary" as const },
  { title: "Pending Tasks", value: "8", icon: FileCheck },
  { title: "Study Hours", value: "124", icon: Clock },
];

const recentActivities = [
  { action: "New course enrolled", item: "Advanced React Development", time: "2 hours ago" },
  { action: "Assignment submitted", item: "JavaScript Fundamentals Quiz", time: "5 hours ago" },
  { action: "Certificate earned", item: "Python Basics", time: "1 day ago" },
  { action: "New discussion reply", item: "Machine Learning Thread", time: "2 days ago" },
];

// ✅ Replace Upcoming Classes with Active Courses Data
// Later you can replace this with API response from backend
const allCourses = [
  { id: "1", title: "React Advanced Patterns", instructor: "John Smith", status: "active" },
  { id: "2", title: "Node.js Masterclass", instructor: "Sarah Wilson", status: "active" },
  { id: "3", title: "Database Design", instructor: "Mike Johnson", status: "inactive" },
  { id: "4", title: "MERN Stack Full Course", instructor: "David Lee", status: "active" },
];

const resumeLearningCourses = [
  {
    title: "Advanced React Development",
    instructor: "John Smith",
    progress: 65,
    lastLesson: "Context API & State Management",
    totalLessons: 24,
    completedLessons: 16,
  },
  {
    title: "Node.js Masterclass",
    instructor: "Sarah Wilson",
    progress: 42,
    lastLesson: "Building REST APIs",
    totalLessons: 32,
    completedLessons: 13,
  },
  {
    title: "Python for Data Science",
    instructor: "Mike Johnson",
    progress: 28,
    lastLesson: "NumPy Fundamentals",
    totalLessons: 40,
    completedLessons: 11,
  },
];

export default function DashboardHome() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getStatsForRole = () => {
    switch (user?.role) {
      case "super_admin":
        return superAdminStats;
      case "admin":
        return adminStats;
      case "instructor":
        return instructorStats;
      case "student":
        return studentStats;
      default:
        return studentStats;
    }
  };

  const stats = getStatsForRole();

  // ✅ active courses list
  const activeCourses = allCourses.filter((c) => c.status === "active");

  return (
    <div className="min-h-screen">
      <DashboardHeader
        title={`Welcome back, ${user?.name?.split(" ")[0]}!`}
        subtitle={new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.title}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* Resume Learning - Only for Students */}
        {user?.role === "student" && (
          <div
            className="bg-card rounded-2xl border border-border p-6 shadow-card animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-semibold">Resume Learning</h2>
              <button
                onClick={() => navigate("/dashboard/courses")}
                className="text-sm text-primary hover:underline"
              >
                View all courses
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resumeLearningCourses.map((course, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-phoenix transition-all duration-300 bg-muted/30"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-phoenix flex items-center justify-center text-primary-foreground">
                      <BookOpen size={18} />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {course.completedLessons}/{course.totalLessons} lessons
                    </span>
                  </div>

                  <h3 className="font-medium mb-1 line-clamp-1">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{course.instructor}</p>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-primary">{course.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-phoenix rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <CheckCircle size={12} />
                    <span className="truncate">{course.lastLesson}</span>
                  </div>

                  <Button variant="phoenix" size="sm" className="w-full">
                    <Play size={14} />
                    Continue
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity & Active Courses - For non-students */}
        {user?.role !== "student" && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div
              onClick={() => navigate("/dashboard/activity")}
              className="bg-card rounded-2xl border border-border p-6 shadow-card animate-fade-in cursor-pointer hover:bg-muted/30 transition"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-lg font-semibold">Recent Activity</h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/dashboard/activity");
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  View all
                </button>
              </div>

              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground truncate">{activity.item}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ✅ Active Courses */}
            <div
              onClick={() => navigate("/dashboard/courses")}
              className="bg-card rounded-2xl border border-border p-6 shadow-card animate-fade-in cursor-pointer hover:bg-muted/30 transition"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-lg font-semibold">Active Courses</h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/dashboard/courses");
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  View all
                </button>
              </div>

              {activeCourses.length === 0 ? (
                <p className="text-sm text-muted-foreground">No active courses available</p>
              ) : (
                <div className="space-y-4">
                  {activeCourses.slice(0, 5).map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-phoenix flex items-center justify-center text-primary-foreground">
                        <BookOpen size={20} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{course.title}</p>
                        <p className="text-sm text-muted-foreground truncate">{course.instructor}</p>
                      </div>

                      <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ✅ Quick Actions */}
        {(user?.role === "super_admin" || user?.role === "admin") && (
          <div
            className="bg-card rounded-2xl border border-border p-6 shadow-card animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <h2 className="font-display text-lg font-semibold mb-4">Quick Actions</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: Users,
                  label: "Add User",
                  color: "bg-primary/10 text-primary",
                  href: "/dashboard/users/add",
                },
                {
                  icon: BookOpen,
                  label: "Create Course",
                  color: "bg-accent/10 text-accent-foreground",
                  href: "/dashboard/courses/create",
                },
                {
                  icon: BarChart3,
                  label: "View Reports",
                  color: "bg-blue-500/10 text-blue-600",
                  href: "/dashboard/reports",
                },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => navigate(action.href)}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-phoenix transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center`}
                  >
                    <action.icon size={24} />
                  </div>
                  <span className="text-sm font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
