import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function RecentActivityPage() {
  const recentActivities = [
    { action: "New course enrolled", item: "Advanced React Development", time: "2 hours ago" },
    { action: "Assignment submitted", item: "JavaScript Fundamentals Quiz", time: "5 hours ago" },
    { action: "Certificate earned", item: "Python Basics", time: "1 day ago" },
    { action: "New discussion reply", item: "Machine Learning Thread", time: "2 days ago" },
    { action: "Course completed", item: "Node.js Masterclass", time: "3 days ago" },
  ];

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Recent Activity" subtitle="All user activities history" />

      <div className="p-6">
        <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold">All Recent Activities</h2>
            <p className="text-sm text-muted-foreground">
              Here you can view the full recent activity list
            </p>
          </div>

          <div className="p-6 space-y-3">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted transition"
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
      </div>
    </div>
  );
}
