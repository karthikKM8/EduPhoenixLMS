import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const enrollmentData = [
  { month: 'Jan', enrollments: 120, completions: 45 },
  { month: 'Feb', enrollments: 180, completions: 78 },
  { month: 'Mar', enrollments: 250, completions: 120 },
  { month: 'Apr', enrollments: 310, completions: 180 },
  { month: 'May', enrollments: 420, completions: 245 },
  { month: 'Jun', enrollments: 380, completions: 290 },
];

const revenueData = [
  { month: 'Jan', revenue: 12000 },
  { month: 'Feb', revenue: 18500 },
  { month: 'Mar', revenue: 24000 },
  { month: 'Apr', revenue: 31000 },
  { month: 'May', revenue: 42000 },
  { month: 'Jun', revenue: 38000 },
];

const coursePerformance = [
  { name: 'React', students: 450, rating: 4.8 },
  { name: 'Python', students: 380, rating: 4.9 },
  { name: 'Node.js', students: 320, rating: 4.6 },
  { name: 'UI/UX', students: 280, rating: 4.7 },
  { name: 'ML', students: 220, rating: 4.8 },
];

const categoryDistribution = [
  { name: 'Web Dev', value: 45, color: 'hsl(0, 85%, 45%)' },
  { name: 'Data Science', value: 25, color: 'hsl(45, 100%, 50%)' },
  { name: 'Design', value: 15, color: 'hsl(0, 0%, 20%)' },
  { name: 'DevOps', value: 10, color: 'hsl(0, 85%, 60%)' },
  { name: 'AI/ML', value: 5, color: 'hsl(40, 95%, 40%)' },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader title="Analytics & Reports" subtitle="Track performance and insights" />

      <div className="p-6 space-y-6">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard 
            title="Total Students" 
            value="12,458" 
            change="+12%" 
            changeType="positive" 
            icon={Users}
          />
          <StatsCard 
            title="Active Courses" 
            value="342" 
            change="+8%" 
            changeType="positive" 
            icon={BookOpen}
          />
          <StatsCard 
            title="Monthly Revenue" 
            value="$84,250" 
            change="+23%" 
            changeType="positive" 
            icon={DollarSign}
            variant="primary"
          />
          <StatsCard 
            title="Completion Rate" 
            value="78%" 
            change="+5%" 
            changeType="positive" 
            icon={TrendingUp}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Enrollment Trends */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display text-lg font-semibold">Enrollment Trends</h3>
                <p className="text-sm text-muted-foreground">Enrollments vs Completions</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span>Enrollments</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span>Completions</span>
                </div>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={enrollmentData}>
                  <defs>
                    <linearGradient id="enrollmentGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(0, 85%, 45%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(0, 85%, 45%)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="completionGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(45, 100%, 50%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(45, 100%, 50%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 90%)" />
                  <XAxis dataKey="month" stroke="hsl(0, 0%, 50%)" />
                  <YAxis stroke="hsl(0, 0%, 50%)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(0, 0%, 100%)', 
                      border: '1px solid hsl(0, 0%, 90%)',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="enrollments" 
                    stroke="hsl(0, 85%, 45%)" 
                    fill="url(#enrollmentGradient)" 
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="completions" 
                    stroke="hsl(45, 100%, 50%)" 
                    fill="url(#completionGradient)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display text-lg font-semibold">Revenue Overview</h3>
                <p className="text-sm text-muted-foreground">Monthly revenue trend</p>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <ArrowUpRight size={16} />
                <span className="text-sm font-medium">+23% vs last period</span>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 90%)" />
                  <XAxis dataKey="month" stroke="hsl(0, 0%, 50%)" />
                  <YAxis stroke="hsl(0, 0%, 50%)" tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(0, 0%, 100%)', 
                      border: '1px solid hsl(0, 0%, 90%)',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="hsl(0, 85%, 45%)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Course Performance */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-card">
            <h3 className="font-display text-lg font-semibold mb-6">Top Performing Courses</h3>
            <div className="space-y-4">
              {coursePerformance.map((course, index) => (
                <div key={course.name} className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-lg bg-gradient-phoenix flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{course.name}</span>
                      <span className="text-sm text-muted-foreground">{course.students} students</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-phoenix rounded-full transition-all duration-500"
                        style={{ width: `${(course.students / 450) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-accent">
                    <span className="font-semibold">{course.rating}</span>
                    <span className="text-muted-foreground">★</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
            <h3 className="font-display text-lg font-semibold mb-6">Course Categories</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {categoryDistribution.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span>{cat.name}</span>
                  </div>
                  <span className="font-medium">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
