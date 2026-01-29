import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    { id: 1, title: "New course added", desc: "React Masterclass is now available", time: "2 mins ago" },
    { id: 2, title: "Profile updated", desc: "Your account details were updated", time: "1 hour ago" },
    { id: 3, title: "New message", desc: "Admin sent you an update", time: "Yesterday" },
  ];

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Notifications" subtitle="All your recent notifications" />

      <div className="p-6">
        <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
          <div className="p-6 border-b border-border flex items-center gap-2">
            <Bell size={20} />
            <h2 className="text-lg font-semibold">All Notifications</h2>
          </div>

          <div className="p-6 space-y-4">
            {notifications.length === 0 ? (
              <p className="text-muted-foreground">No notifications found</p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className="p-4 rounded-xl border border-border bg-muted/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">{n.title}</p>
                      <p className="text-sm text-muted-foreground">{n.desc}</p>
                    </div>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">
                      {n.time}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
