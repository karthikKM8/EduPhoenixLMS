import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/Logo';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, GraduationCap, BookOpen, Shield } from 'lucide-react';

const roles: { value: UserRole; label: string; icon: React.ElementType; description: string }[] = [
  { value: 'student', label: 'Student', icon: GraduationCap, description: 'Learn and grow' },
  { value: 'instructor', label: 'Instructor', icon: BookOpen, description: 'Teach and inspire' },
  { value: 'admin', label: 'Admin', icon: Shield, description: 'Manage institution' },
];

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await signup(email, password, name, role);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex flex-1 bg-secondary items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-20" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center p-12">
          <Logo size="lg" />
          <h2 className="font-display text-3xl font-bold mt-8 mb-4 text-secondary-foreground">
            Begin Your Journey
          </h2>
          <p className="text-secondary-foreground/70 max-w-sm">
            Create your account and unlock a world of learning opportunities with EduPhoenix.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <Link to="/" className="inline-block mb-8 lg:hidden">
            <Logo size="md" />
          </Link>

          <h1 className="font-display text-3xl font-bold mb-2">Create an account</h1>
          <p className="text-muted-foreground mb-8">
            Join EduPhoenix and start learning today
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-2">
              <Label>Select your role</Label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                      role === r.value
                        ? 'border-primary bg-primary/5 shadow-phoenix'
                        : 'border-border hover:border-primary/30'
                    }`}
                  >
                    <r.icon size={24} className={`mx-auto mb-2 ${role === r.value ? 'text-primary' : 'text-muted-foreground'}`} />
                    <p className={`text-sm font-medium ${role === r.value ? 'text-primary' : ''}`}>{r.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{r.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-destructive text-sm">{error}</p>
            )}

            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1 rounded border-input" required />
              <span className="text-sm text-muted-foreground">
                I agree to the{' '}
                <a href="#" className="text-primary hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </span>
            </div>

            <Button type="submit" variant="phoenix" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
              <ArrowRight size={18} />
            </Button>
          </form>

          <p className="mt-8 text-center text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
