import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Search, 
  Plus,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Upload,
  Eye,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

const assignments = [
  { 
    id: 1, 
    title: 'React Component Architecture', 
    course: 'React Advanced',
    dueDate: '2024-01-20',
    status: 'pending',
    submissions: 18,
    total: 25,
    points: 100,
    description: 'Create a reusable component library with proper TypeScript types.'
  },
  { 
    id: 2, 
    title: 'Data Visualization Project', 
    course: 'Python Data Science',
    dueDate: '2024-01-18',
    status: 'submitted',
    submissions: 22,
    total: 28,
    points: 150,
    description: 'Build an interactive dashboard using Plotly and Pandas.'
  },
  { 
    id: 3, 
    title: 'UI Redesign Challenge', 
    course: 'UI/UX Design',
    dueDate: '2024-01-15',
    status: 'graded',
    submissions: 20,
    total: 20,
    points: 80,
    score: 75,
    description: 'Redesign the landing page of a chosen e-commerce website.'
  },
  { 
    id: 4, 
    title: 'REST API Development', 
    course: 'Node.js Masterclass',
    dueDate: '2024-01-25',
    status: 'pending',
    submissions: 8,
    total: 30,
    points: 120,
    description: 'Build a complete CRUD API with authentication and validation.'
  },
  { 
    id: 5, 
    title: 'ML Model Training', 
    course: 'Machine Learning',
    dueDate: '2024-01-22',
    status: 'overdue',
    submissions: 15,
    total: 25,
    points: 200,
    description: 'Train and evaluate a classification model on the provided dataset.'
  },
];

const statusConfig = {
  pending: { color: 'bg-accent/10 text-accent-foreground border-accent', icon: Clock, label: 'Pending' },
  submitted: { color: 'bg-blue-500/10 text-blue-600 border-blue-500', icon: Upload, label: 'Submitted' },
  graded: { color: 'bg-green-500/10 text-green-600 border-green-500', icon: CheckCircle, label: 'Graded' },
  overdue: { color: 'bg-red-500/10 text-red-600 border-red-500', icon: AlertCircle, label: 'Overdue' },
};

export default function AssignmentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const { user } = useAuth();

  const isInstructorOrAdmin = user?.role === 'super_admin' || user?.role === 'admin' || user?.role === 'instructor';

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assignment.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || assignment.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getDaysRemaining = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Assignments" subtitle="Manage and submit assignments" />

      <div className="p-6 space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-3 flex-1 flex-wrap">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search assignments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'pending', 'submitted', 'graded', 'overdue'].map((status) => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedStatus(status)}
                  className="capitalize"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
          {isInstructorOrAdmin && (
            <Button variant="phoenix">
              <Plus size={18} />
              Create Assignment
            </Button>
          )}
        </div>

        {/* Assignments Grid */}
        <div className="grid gap-6">
          {filteredAssignments.map((assignment, index) => {
            const StatusIcon = statusConfig[assignment.status as keyof typeof statusConfig].icon;
            const daysRemaining = getDaysRemaining(assignment.dueDate);
            
            return (
              <div
                key={assignment.id}
                className="bg-card rounded-2xl border border-border p-6 shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-phoenix flex items-center justify-center flex-shrink-0">
                    <FileText size={28} className="text-primary-foreground" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-display text-xl font-semibold">{assignment.title}</h3>
                        <p className="text-sm text-muted-foreground">{assignment.course}</p>
                      </div>
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border",
                        statusConfig[assignment.status as keyof typeof statusConfig].color
                      )}>
                        <StatusIcon size={14} />
                        {statusConfig[assignment.status as keyof typeof statusConfig].label}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-1">{assignment.description}</p>

                    <div className="flex flex-wrap items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar size={16} />
                        <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        {daysRemaining > 0 && daysRemaining <= 3 && (
                          <span className="text-accent font-medium">({daysRemaining} days left)</span>
                        )}
                        {daysRemaining < 0 && (
                          <span className="text-red-500 font-medium">(Overdue)</span>
                        )}
                      </div>
                      
                      {isInstructorOrAdmin && (
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-phoenix rounded-full"
                              style={{ width: `${(assignment.submissions / assignment.total) * 100}%` }}
                            />
                          </div>
                          <span className="text-muted-foreground">
                            {assignment.submissions}/{assignment.total} submitted
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 font-medium">
                        <span className="text-primary">{assignment.points} pts</span>
                        {assignment.score !== undefined && (
                          <span className="text-green-600">• Score: {assignment.score}/{assignment.points}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button variant="outline">
                      <Eye size={18} />
                      View
                    </Button>
                    {user?.role === 'student' && assignment.status === 'pending' && (
                      <Button variant="phoenix">
                        <Upload size={18} />
                        Submit
                      </Button>
                    )}
                    {isInstructorOrAdmin && (
                      <Button variant="default">
                        Grade
                      </Button>
                    )}
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
