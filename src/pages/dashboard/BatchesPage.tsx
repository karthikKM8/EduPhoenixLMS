import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus,
  Users,
  Calendar,
  Clock,
  MoreVertical,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';

const batches = [
  { 
    id: 1, 
    name: 'Batch A - Morning', 
    course: 'React Advanced',
    instructor: 'John Smith',
    students: 25, 
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    schedule: 'Mon, Wed, Fri - 10:00 AM',
    status: 'active',
    progress: 65
  },
  { 
    id: 2, 
    name: 'Batch B - Evening', 
    course: 'Python Data Science',
    instructor: 'Sarah Wilson',
    students: 30, 
    startDate: '2024-02-01',
    endDate: '2024-05-01',
    schedule: 'Tue, Thu - 6:00 PM',
    status: 'active',
    progress: 40
  },
  { 
    id: 3, 
    name: 'Batch C - Weekend', 
    course: 'UI/UX Design',
    instructor: 'Mike Johnson',
    students: 20, 
    startDate: '2024-01-20',
    endDate: '2024-04-20',
    schedule: 'Sat, Sun - 10:00 AM',
    status: 'active',
    progress: 55
  },
  { 
    id: 4, 
    name: 'Batch D - Intensive', 
    course: 'Node.js Masterclass',
    instructor: 'Anna Garcia',
    students: 15, 
    startDate: '2024-03-01',
    endDate: '2024-04-01',
    schedule: 'Daily - 2:00 PM',
    status: 'upcoming',
    progress: 0
  },
  { 
    id: 5, 
    name: 'Batch E - Completed', 
    course: 'JavaScript Basics',
    instructor: 'David Lee',
    students: 28, 
    startDate: '2023-10-01',
    endDate: '2024-01-01',
    schedule: 'Mon, Wed - 4:00 PM',
    status: 'completed',
    progress: 100
  },
];

const statusColors = {
  active: 'bg-green-500/10 text-green-600 border-green-500',
  upcoming: 'bg-accent/10 text-accent-foreground border-accent',
  completed: 'bg-muted text-muted-foreground border-border',
};

export default function BatchesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         batch.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || batch.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Batches" subtitle="Manage course batches and schedules" />

      <div className="p-6 space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-3 flex-1 flex-wrap">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search batches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'active', 'upcoming', 'completed'].map((status) => (
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
          <Button variant="phoenix">
            <Plus size={18} />
            Create Batch
          </Button>
        </div>

        {/* Batches Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBatches.map((batch, index) => (
            <div
              key={batch.id}
              className="bg-card rounded-2xl border border-border p-6 shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-phoenix flex items-center justify-center text-primary-foreground">
                  <BookOpen size={24} />
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-medium capitalize border",
                    statusColors[batch.status as keyof typeof statusColors]
                  )}>
                    {batch.status}
                  </span>
                  <Button variant="ghost" size="icon">
                    <MoreVertical size={16} />
                  </Button>
                </div>
              </div>

              <h3 className="font-display text-lg font-semibold mb-1">{batch.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{batch.course}</p>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users size={16} />
                  <span>{batch.students} Students • {batch.instructor}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar size={16} />
                  <span>{new Date(batch.startDate).toLocaleDateString()} - {new Date(batch.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock size={16} />
                  <span>{batch.schedule}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{batch.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-phoenix rounded-full transition-all duration-500"
                    style={{ width: `${batch.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
