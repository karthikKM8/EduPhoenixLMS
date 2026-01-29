import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// ✅ Public Pages (Auth)
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

// ✅ Dashboard Pages (Protected)
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import NotificationsPage from "@/pages/dashboard/NotificationsPage";
import DashboardHome from "./pages/dashboard/DashboardHome";
import UsersPage from "./pages/dashboard/UsersPage";
import CoursePage from "./pages/dashboard/CoursesPage";
import CoursePlayerPage from "./pages/dashboard/CoursePlayer";
import BatchesPage from "./pages/dashboard/BatchesPage";
import AttendancePage from "./pages/dashboard/AttendancePage";
import AssignmentsPage from "./pages/dashboard/AssignmentsPage";
import PaymentsPage from "./pages/dashboard/PaymentsPage";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import GrievancePage from "./pages/dashboard/GrievancePage";
import SupportPage from "./pages/dashboard/SupportPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import RecentActivityPage from "@/pages/dashboard/RecentActivityPage";

const queryClient = new QueryClient();

/* ============================
   🔐 Route Protection
============================ */
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

/* ============================
   🚀 App
============================ */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            {/* ✅ Always start from Login Page */}
            <Route path="/" element={<Login />} />

            {/* ✅ Public Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Optional */}
            <Route path="/index" element={<Index />} />

            {/* ✅ FULL PAGE COURSE PLAYER (Udemy style) */}
            <Route
              path="/course-player/:courseId"
              element={
                <ProtectedRoute>
                  <CoursePlayerPage />
                </ProtectedRoute>
              }
            />

            {/* ✅ Protected Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="courses" element={<CoursePage />} />
              <Route path="activity" element={<RecentActivityPage />} />
              <Route path="batches" element={<BatchesPage />} />
              <Route path="attendance" element={<AttendancePage />} />
              <Route path="assignments" element={<AssignmentsPage />} />
              <Route path="payments" element={<PaymentsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="grievance" element={<GrievancePage />} />
              <Route path="support" element={<SupportPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* ✅ Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
