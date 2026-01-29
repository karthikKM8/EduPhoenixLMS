import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Camera, Mail, Phone, MapPin, Edit2, Save, X, Award, BookOpen, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 234 567 890",
    location: "New York, USA",
    bio: "Passionate learner and educator dedicated to continuous growth and development.",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const stats = [
    { icon: BookOpen, label: "Courses", value: user?.role === "student" ? "6" : "8" },
    { icon: Clock, label: "Hours", value: "124" },
    { icon: Award, label: "Certificates", value: "4" },
  ];

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Profile" subtitle="Manage your account settings" />

      <div className="p-6 space-y-6">
        {/* Profile Header */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-card">
          {/* ✅ Cover */}
          <div className="h-32 bg-gradient-phoenix relative">
            <button className="absolute bottom-4 right-4 p-2 rounded-lg bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-colors">
              <Camera size={18} />
            </button>

            {/* ✅ Profile Photo fixed inside cover */}
            <div className="absolute -bottom-10 left-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-phoenix flex items-center justify-center text-primary-foreground text-3xl font-display font-bold border-4 border-card shadow-elevated">
                  {user?.name?.charAt(0) || "U"}
                </div>

                <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary text-primary-foreground shadow-md">
                  <Camera size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* ✅ Profile Info (pushed down so no overlap) */}
          <div className="px-6 pb-6 pt-14">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Left spacing for avatar on desktop */}
              <div className="sm:pl-28 flex-1">
                <h2 className="font-display text-2xl font-bold">{user?.name || "User"}</h2>
                <p className="text-muted-foreground capitalize">
                  {user?.role?.replace("_", " ") || "user"}
                </p>
              </div>

              <Button
                variant={isEditing ? "outline" : "phoenix"}
                onClick={() => (isEditing ? setIsEditing(false) : setIsEditing(true))}
              >
                {isEditing ? (
                  <>
                    <X size={18} />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit2 size={18} />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon size={24} className="mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-display font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-semibold">Personal Information</h3>
              {isEditing && (
                <Button variant="phoenix" size="sm" onClick={handleSave}>
                  <Save size={16} />
                  Save Changes
                </Button>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  className={cn(!isEditing && "bg-muted")}
                />
              </div>

              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className={cn("pl-10", !isEditing && "bg-muted")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    className={cn("pl-10", !isEditing && "bg-muted")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    disabled={!isEditing}
                    className={cn("pl-10", !isEditing && "bg-muted")}
                  />
                </div>
              </div>

              <div className="sm:col-span-2 space-y-2">
                <Label>Bio</Label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  disabled={!isEditing}
                  rows={3}
                  className={cn(
                    "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed",
                    !isEditing && "bg-muted"
                  )}
                />
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <h3 className="font-display text-lg font-semibold mb-4">Account Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                  <span className="text-sm font-medium">Account Status</span>
                  <span className="text-sm text-green-600 font-medium">Active</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-muted">
                  <span className="text-sm font-medium">Member Since</span>
                  <span className="text-sm text-muted-foreground">Jan 2026</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-muted">
                  <span className="text-sm font-medium">Role</span>
                  <span className="text-sm text-primary font-medium capitalize">
                    {user?.role?.replace("_", " ") || "user"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <h3 className="font-display text-lg font-semibold mb-4">Security</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Two-Factor Authentication
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-destructive hover:text-destructive"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
