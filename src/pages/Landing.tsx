import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Users, 
  BarChart3, 
  BookOpen,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'User Management',
    description: 'Manage students, instructors, and admins with role-based access control.',
  },
  {
    icon: BookOpen,
    title: 'Course Creation',
    description: 'Create and manage courses with rich content, assignments, and resources.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description: 'Comprehensive insights into student performance and engagement.',
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'Enterprise-grade security for your educational institution.',
  },
];

const stats = [
  { value: '10K+', label: 'Active Students' },
  { value: '500+', label: 'Courses' },
  { value: '200+', label: 'Instructors' },
  { value: '99.9%', label: 'Uptime' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo size="sm" />
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="phoenix" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 animate-fade-in">
              <Sparkles size={16} />
              <span className="text-sm font-medium">Transform Your Learning Experience</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Rise with{' '}
              <span className="text-gradient-phoenix">EduPhoenix</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              A comprehensive learning management system designed to empower educators and inspire students. Manage courses, track progress, and achieve excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/signup">
                  Start Free Trial
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/login">
                  View Demo
                </Link>
              </Button>
            </div>

            {/* Demo Credentials */}
            <div className="mt-8 p-4 bg-muted/50 rounded-xl inline-block animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <p className="text-sm text-muted-foreground mb-2">Demo Credentials (password: password123)</p>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                <span className="px-2 py-1 bg-background rounded">superadmin@eduphoenix.com</span>
                <span className="px-2 py-1 bg-background rounded">instructor@eduphoenix.com</span>
                <span className="px-2 py-1 bg-background rounded">student@eduphoenix.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl md:text-5xl font-display font-bold text-secondary-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-secondary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">
              Everything You Need to <span className="text-gradient-phoenix">Succeed</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed for modern educational institutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-phoenix transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-phoenix flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} className="text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <GraduationCap size={64} className="mx-auto mb-6 text-accent" />
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-secondary-foreground">
              Ready to Transform Your Institution?
            </h2>
            <p className="text-secondary-foreground/80 text-lg mb-8">
              Join thousands of educators who trust EduPhoenix to deliver exceptional learning experiences.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['No credit card required', 'Free 14-day trial', '24/7 Support'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-accent">
                  <CheckCircle2 size={18} />
                  <span className="text-secondary-foreground">{item}</span>
                </div>
              ))}
            </div>
            <Button variant="gold" size="xl" className="mt-8" asChild>
              <Link to="/signup">
                Get Started Now
                <ArrowRight size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo size="sm" />
            <p className="text-muted-foreground text-sm">
              © 2024 EduPhoenix. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
