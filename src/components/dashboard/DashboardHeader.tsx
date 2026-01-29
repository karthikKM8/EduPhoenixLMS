import { useEffect, useRef, useState } from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { SearchCommand } from "./SearchCommand";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ Search Command Dialog State
  const [searchOpen, setSearchOpen] = useState(false);

  // ✅ Notification State
  const [openNotif, setOpenNotif] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const notifRef = useRef<HTMLDivElement | null>(null);

  // ✅ Sample notifications (replace later with backend API)
  const notifications = [
    { id: 1, title: "New course added", desc: "React Masterclass is now available" },
    { id: 2, title: "Profile updated", desc: "Your account details were updated" },
    { id: 3, title: "New message", desc: "Admin sent you an update" },
  ];

  // ✅ Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setOpenNotif(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Keyboard shortcut Ctrl/⌘ + K for search command
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
        {/* Left Title */}
        <div>
          <h1 className="font-display text-xl font-bold">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* ✅ Search Button (Desktop) */}
          <Button
            variant="outline"
            className="relative hidden md:flex items-center gap-2 w-64 justify-start text-muted-foreground"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={18} />
            <span>Search...</span>

            <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>

          {/* ✅ Search Button (Mobile) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={20} />
          </Button>

          {/* ✅ Notification Bell */}
          <div className="relative" ref={notifRef}>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => {
                setOpenNotif((prev) => !prev);
                setHasUnread(false);
              }}
            >
              <Bell size={20} />
              {hasUnread && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              )}
            </Button>

            {/* ✅ Notification Dropdown */}
            {openNotif && (
              <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-2xl shadow-lg z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                  <p className="font-semibold text-sm">Notifications</p>
                  <button
                    className="text-xs text-primary hover:underline"
                    onClick={() => setHasUnread(false)}
                  >
                    Mark all read
                  </button>
                </div>

                <div className="max-h-72 overflow-auto">
                  {notifications.length === 0 ? (
                    <p className="px-4 py-4 text-sm text-muted-foreground">No notifications</p>
                  ) : (
                    notifications.map((n) => (
                      <button
                        key={n.id}
                        className="w-full text-left px-4 py-3 hover:bg-muted transition"
                        onClick={() => {
                          setOpenNotif(false);
                          navigate("/dashboard/notifications");
                        }}
                      >
                        <p className="text-sm font-medium">{n.title}</p>
                        <p className="text-xs text-muted-foreground">{n.desc}</p>
                      </button>
                    ))
                  )}
                </div>

                <div className="px-4 py-3 border-t border-border">
                  <button
                    className="text-sm text-primary hover:underline w-full text-center"
                    onClick={() => {
                      setOpenNotif(false);
                      navigate("/dashboard/notifications");
                    }}
                  >
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ✅ Profile Redirect */}
          <div
            onClick={() => navigate("/dashboard/profile")}
            className="flex items-center gap-3 pl-4 border-l border-border cursor-pointer hover:opacity-90 transition"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-phoenix flex items-center justify-center text-primary-foreground font-semibold text-sm">
              {user?.name?.charAt(0) || "U"}
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-medium">{user?.name || "User"}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {user?.role?.replace("_", " ") || "user"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ✅ Search Command Dialog */}
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
