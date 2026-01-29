import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Search, 
  Plus,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Send
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const grievances = [
  { 
    id: 1, 
    subject: 'Course Access Issue',
    description: 'Unable to access the React Advanced course materials since yesterday.',
    category: 'Technical',
    status: 'open',
    priority: 'high',
    createdAt: '2024-01-15',
    user: 'Emily Brown'
  },
  { 
    id: 2, 
    subject: 'Payment Not Reflected',
    description: 'Made payment for Python course but access not granted.',
    category: 'Billing',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2024-01-14',
    user: 'David Lee'
  },
  { 
    id: 3, 
    subject: 'Certificate Request',
    description: 'Completed UI/UX course but certificate not issued yet.',
    category: 'Academic',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2024-01-12',
    user: 'Lisa Chen'
  },
  { 
    id: 4, 
    subject: 'Instructor Feedback',
    description: 'Request for more detailed feedback on assignments.',
    category: 'Academic',
    status: 'open',
    priority: 'low',
    createdAt: '2024-01-10',
    user: 'James Wilson'
  },
];

const statusConfig = {
  open: { color: 'bg-accent/10 text-accent-foreground border-accent', icon: AlertCircle, label: 'Open' },
  in_progress: { color: 'bg-blue-500/10 text-blue-600 border-blue-500', icon: Clock, label: 'In Progress' },
  resolved: { color: 'bg-green-500/10 text-green-600 border-green-500', icon: CheckCircle, label: 'Resolved' },
};

const priorityColors = {
  high: 'bg-red-500/10 text-red-600',
  medium: 'bg-accent/10 text-accent-foreground',
  low: 'bg-muted text-muted-foreground',
};

export default function GrievancePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ subject: '', category: 'Technical', description: '' });
  const { user } = useAuth();

  const isAdmin = user?.role === 'super_admin' || user?.role === 'admin';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Grievance submitted successfully!');
    setShowForm(false);
    setFormData({ subject: '', category: 'Technical', description: '' });
  };

  const filteredGrievances = grievances.filter(g =>
    g.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Grievance" subtitle="Submit and track your concerns" />

      <div className="p-6 space-y-6">
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search grievances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="phoenix" onClick={() => setShowForm(true)}>
            <Plus size={18} />
            New Grievance
          </Button>
        </div>

        {/* New Grievance Form */}
        {showForm && (
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card animate-fade-in">
            <h3 className="font-display text-lg font-semibold mb-4">Submit New Grievance</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief subject of your concern"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full h-11 rounded-lg border border-input bg-background px-4"
                  >
                    <option>Technical</option>
                    <option>Billing</option>
                    <option>Academic</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your concern in detail..."
                  rows={4}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm"
                  required
                />
              </div>
              <div className="flex gap-3">
                <Button type="submit" variant="phoenix">
                  <Send size={18} />
                  Submit
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Grievances List */}
        <div className="space-y-4">
          {filteredGrievances.map((grievance, index) => {
            const StatusIcon = statusConfig[grievance.status as keyof typeof statusConfig].icon;
            return (
              <div
                key={grievance.id}
                className="bg-card rounded-2xl border border-border p-6 shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={24} className="text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-semibold">{grievance.subject}</h3>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium",
                        priorityColors[grievance.priority as keyof typeof priorityColors]
                      )}>
                        {grievance.priority}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
                        {grievance.category}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-3">{grievance.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      {isAdmin && <span>By: {grievance.user}</span>}
                      <span>Created: {new Date(grievance.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border",
                      statusConfig[grievance.status as keyof typeof statusConfig].color
                    )}>
                      <StatusIcon size={14} />
                      {statusConfig[grievance.status as keyof typeof statusConfig].label}
                    </span>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
