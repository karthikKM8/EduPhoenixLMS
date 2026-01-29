import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Settings,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Save
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const settingsSections = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'localization', label: 'Localization', icon: Globe },
  { id: 'data', label: 'Data & Privacy', icon: Database },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'EduPhoenix',
    siteUrl: 'https://eduphoenix.com',
    supportEmail: 'support@eduphoenix.com',
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    twoFactor: false,
    sessionTimeout: '30',
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
  });

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Settings" subtitle="Manage platform settings" />

      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-card rounded-2xl border border-border p-4 shadow-card">
              <nav className="space-y-1">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      activeSection === section.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <section.icon size={18} />
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 bg-card rounded-2xl border border-border p-6 shadow-card">
            {activeSection === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-lg font-semibold mb-4">General Settings</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Configure basic platform settings and information.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Site Name</Label>
                    <Input
                      value={settings.siteName}
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Site URL</Label>
                    <Input
                      value={settings.siteUrl}
                      onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Support Email</Label>
                    <Input
                      value={settings.supportEmail}
                      onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-lg font-semibold mb-4">Notification Settings</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Manage how and when you receive notifications.
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications' },
                    { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive promotional content' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                        className={cn(
                          "w-12 h-6 rounded-full transition-colors relative",
                          settings[item.key as keyof typeof settings] ? "bg-primary" : "bg-muted"
                        )}
                      >
                        <div className={cn(
                          "w-5 h-5 rounded-full bg-card shadow absolute top-0.5 transition-transform",
                          settings[item.key as keyof typeof settings] ? "translate-x-6" : "translate-x-0.5"
                        )} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-lg font-semibold mb-4">Security Settings</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Configure security and authentication options.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                  <div className="space-y-2">
                    <Label>Session Timeout (minutes)</Label>
                    <Input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
                      className="max-w-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'localization' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-lg font-semibold mb-4">Localization Settings</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Configure language and regional preferences.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                      className="w-full h-11 rounded-lg border border-input bg-background px-4"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                      className="w-full h-11 rounded-lg border border-input bg-background px-4"
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time</option>
                      <option value="PST">Pacific Time</option>
                      <option value="GMT">GMT</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date Format</Label>
                    <select
                      value={settings.dateFormat}
                      onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}
                      className="w-full h-11 rounded-lg border border-input bg-background px-4"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {(activeSection === 'appearance' || activeSection === 'data') && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Settings for this section coming soon.</p>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-border flex justify-end">
              <Button variant="phoenix" onClick={handleSave}>
                <Save size={18} />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
