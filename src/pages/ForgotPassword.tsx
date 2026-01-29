import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/Logo';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call - replace with actual Supabase call when Cloud is enabled
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-block mb-8">
            <Logo size="md" />
          </Link>

          {!isSubmitted ? (
            <>
              <h1 className="font-display text-3xl font-bold mb-2">Forgot Password?</h1>
              <p className="text-muted-foreground mb-8">
                No worries! Enter your email and we'll send you reset instructions.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
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

                {error && (
                  <p className="text-destructive text-sm">{error}</p>
                )}

                <Button type="submit" variant="phoenix" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>

              <Link 
                to="/login" 
                className="mt-8 flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Login
              </Link>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-primary" size={32} />
              </div>
              <h1 className="font-display text-3xl font-bold mb-2">Check Your Email</h1>
              <p className="text-muted-foreground mb-8">
                We've sent a password reset link to <span className="text-foreground font-medium">{email}</span>
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Didn't receive the email? Check your spam folder or{' '}
                <button 
                  onClick={() => setIsSubmitted(false)} 
                  className="text-primary hover:underline"
                >
                  try again
                </button>
              </p>
              <Link to="/login">
                <Button variant="phoenix" size="lg" className="w-full">
                  <ArrowLeft size={18} />
                  Back to Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Decorative */}
      <div className="hidden lg:flex flex-1 bg-secondary items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center p-12">
          <Logo size="lg" />
          <h2 className="font-display text-3xl font-bold mt-8 mb-4 text-secondary-foreground">
            Secure Recovery
          </h2>
          <p className="text-secondary-foreground/70 max-w-sm">
            We'll help you get back to your learning journey in no time.
          </p>
        </div>
      </div>
    </div>
  );
}
