import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Search, 
  Calendar,
  Check,
  X,
  Clock,
  Download,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

const attendanceData = [
  { id: 1, student: 'Emily Brown', course: 'React Advanced', date: '2024-01-15', status: 'present', time: '10:02 AM' },
  { id: 2, student: 'David Lee', course: 'React Advanced', date: '2024-01-15', status: 'absent', time: '-' },
  { id: 3, student: 'Lisa Chen', course: 'React Advanced', date: '2024-01-15', status: 'present', time: '9:58 AM' },
  { id: 4, student: 'James Wilson', course: 'React Advanced', date: '2024-01-15', status: 'late', time: '10:15 AM' },
  { id: 5, student: 'Anna Garcia', course: 'React Advanced', date: '2024-01-15', status: 'present', time: '10:00 AM' },
  { id: 6, student: 'Michael Brown', course: 'React Advanced', date: '2024-01-15', status: 'present', time: '9:55 AM' },
];

const courses = ['All Courses', 'React Advanced', 'Python Data Science', 'UI/UX Design', 'Node.js'];

const statusColors = {
  present: 'bg-green-500/10 text-green-600 border-green-500',
  absent: 'bg-red-500/10 text-red-600 border-red-500',
  late: 'bg-accent/10 text-accent-foreground border-accent',
};

const statusIcons = {
  present: Check,
  absent: X,
  late: Clock,
};

export default function AttendancePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All Courses');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { user } = useAuth();

  const isInstructorOrAdmin = user?.role === 'super_admin' || user?.role === 'admin' || user?.role === 'instructor';

  const filteredData = attendanceData.filter(record => {
    const matchesSearch = record.student.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === 'All Courses' || record.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  const stats = {
    present: attendanceData.filter(r => r.status === 'present').length,
    absent: attendanceData.filter(r => r.status === 'absent').length,
    late: attendanceData.filter(r => r.status === 'late').length,
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Attendance" subtitle="Track and manage attendance records" />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-500/10 rounded-2xl p-6 border border-green-500/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Check size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-green-600">{stats.present}</p>
                <p className="text-sm text-muted-foreground">Present</p>
              </div>
            </div>
          </div>
          <div className="bg-red-500/10 rounded-2xl p-6 border border-red-500/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                <X size={24} className="text-red-600" />
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-red-600">{stats.absent}</p>
                <p className="text-sm text-muted-foreground">Absent</p>
              </div>
            </div>
          </div>
          <div className="bg-accent/10 rounded-2xl p-6 border border-accent/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Clock size={24} className="text-accent-foreground" />
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-accent-foreground">{stats.late}</p>
                <p className="text-sm text-muted-foreground">Late</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-3 flex-1 flex-wrap">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-10 w-auto"
              />
            </div>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-4 py-2 rounded-lg border border-input bg-background"
            >
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
          <Button variant="outline">
            <Download size={18} />
            Export
          </Button>
        </div>

        {/* Attendance Table */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-medium text-muted-foreground">Student</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Course</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Check-in Time</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  {isInstructorOrAdmin && (
                    <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((record, index) => {
                  const StatusIcon = statusIcons[record.status as keyof typeof statusIcons];
                  return (
                    <tr 
                      key={record.id} 
                      className="border-b border-border hover:bg-muted/30 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-phoenix flex items-center justify-center text-primary-foreground font-semibold">
                            {record.student.charAt(0)}
                          </div>
                          <span className="font-medium">{record.student}</span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{record.course}</td>
                      <td className="p-4 text-muted-foreground">{new Date(record.date).toLocaleDateString()}</td>
                      <td className="p-4 text-muted-foreground">{record.time}</td>
                      <td className="p-4">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize border",
                          statusColors[record.status as keyof typeof statusColors]
                        )}>
                          <StatusIcon size={14} />
                          {record.status}
                        </span>
                      </td>
                      {isInstructorOrAdmin && (
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-500/10">
                              <Check size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-500/10">
                              <X size={16} />
                            </Button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
