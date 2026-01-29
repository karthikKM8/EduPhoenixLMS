import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { 
  Search,
  DollarSign,
  CreditCard,
  TrendingUp,
  Download,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

const transactions = [
  { id: 'TXN001', student: 'Emily Brown', course: 'React Advanced', amount: 299, date: '2024-01-15', status: 'completed', method: 'Credit Card' },
  { id: 'TXN002', student: 'David Lee', course: 'Python Data Science', amount: 349, date: '2024-01-14', status: 'completed', method: 'PayPal' },
  { id: 'TXN003', student: 'Lisa Chen', course: 'UI/UX Design', amount: 199, date: '2024-01-13', status: 'pending', method: 'Bank Transfer' },
  { id: 'TXN004', student: 'James Wilson', course: 'Node.js Masterclass', amount: 279, date: '2024-01-12', status: 'completed', method: 'Credit Card' },
  { id: 'TXN005', student: 'Anna Garcia', course: 'Machine Learning', amount: 399, date: '2024-01-11', status: 'failed', method: 'Credit Card' },
  { id: 'TXN006', student: 'Michael Brown', course: 'DevOps Essentials', amount: 249, date: '2024-01-10', status: 'completed', method: 'PayPal' },
];

const subscriptions = [
  { plan: 'Pro Monthly', price: 49, students: 234, revenue: 11466 },
  { plan: 'Pro Annual', price: 470, students: 89, revenue: 41830 },
  { plan: 'Enterprise', price: 199, students: 12, revenue: 2388 },
];

const statusConfig = {
  completed: { color: 'bg-green-500/10 text-green-600 border-green-500', icon: CheckCircle },
  pending: { color: 'bg-accent/10 text-accent-foreground border-accent', icon: Clock },
  failed: { color: 'bg-red-500/10 text-red-600 border-red-500', icon: XCircle },
};

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  const isAdmin = user?.role === 'super_admin' || user?.role === 'admin';

  const filteredTransactions = transactions.filter(txn =>
    txn.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
    txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    txn.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
  const pendingAmount = transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen">
      <DashboardHeader 
        title="Payments" 
        subtitle={isAdmin ? 'Manage payments and subscriptions' : 'Your payment history'} 
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        {isAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCard 
              title="Total Revenue" 
              value={`$${totalRevenue.toLocaleString()}`} 
              change="+23%" 
              changeType="positive" 
              icon={DollarSign}
              variant="primary"
            />
            <StatsCard 
              title="Pending" 
              value={`$${pendingAmount.toLocaleString()}`} 
              icon={Clock}
            />
            <StatsCard 
              title="Transactions" 
              value={transactions.length} 
              change="+12" 
              changeType="positive" 
              icon={CreditCard}
            />
            <StatsCard 
              title="Growth" 
              value="+18%" 
              change="vs last month" 
              changeType="positive" 
              icon={TrendingUp}
            />
          </div>
        )}

        {/* Subscription Plans (Admin only) */}
        {isAdmin && (
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
            <h2 className="font-display text-lg font-semibold mb-4">Subscription Revenue</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {subscriptions.map((plan) => (
                <div key={plan.plan} className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{plan.plan}</h3>
                    <span className="text-primary font-bold">${plan.price}/mo</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{plan.students} subscribers</span>
                    <span className="font-medium text-foreground">${plan.revenue.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transactions Table */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Download size={18} />
              Export
            </Button>
          </div>

          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-4 font-medium text-muted-foreground">Transaction ID</th>
                    {isAdmin && <th className="text-left p-4 font-medium text-muted-foreground">Student</th>}
                    <th className="text-left p-4 font-medium text-muted-foreground">Course</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Amount</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Method</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((txn, index) => {
                    const StatusIcon = statusConfig[txn.status as keyof typeof statusConfig].icon;
                    return (
                      <tr 
                        key={txn.id} 
                        className="border-b border-border hover:bg-muted/30 transition-colors animate-fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <td className="p-4 font-mono text-sm">{txn.id}</td>
                        {isAdmin && (
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-phoenix flex items-center justify-center text-primary-foreground font-semibold text-sm">
                                {txn.student.charAt(0)}
                              </div>
                              <span>{txn.student}</span>
                            </div>
                          </td>
                        )}
                        <td className="p-4 text-muted-foreground">{txn.course}</td>
                        <td className="p-4 font-semibold">${txn.amount}</td>
                        <td className="p-4 text-muted-foreground">{new Date(txn.date).toLocaleDateString()}</td>
                        <td className="p-4 text-muted-foreground">{txn.method}</td>
                        <td className="p-4">
                          <span className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize border",
                            statusConfig[txn.status as keyof typeof statusConfig].color
                          )}>
                            <StatusIcon size={14} />
                            {txn.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="icon">
                            <Eye size={16} />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
