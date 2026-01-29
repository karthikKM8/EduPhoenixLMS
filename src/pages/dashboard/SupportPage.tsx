import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  HelpCircle,
  BookOpen,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'How do I reset my password?',
    answer: 'You can reset your password by clicking on "Forgot Password" on the login page. Enter your email address and we\'ll send you a reset link.',
  },
  {
    question: 'How can I access my course materials?',
    answer: 'Navigate to the Courses section from your dashboard. Click on any enrolled course to access all materials, videos, and resources.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept Credit/Debit cards, PayPal, and Bank transfers. All payments are secured with industry-standard encryption.',
  },
  {
    question: 'How do I download my certificate?',
    answer: 'Once you complete a course, go to your Profile > Certificates section. Click the download button next to your completed courses.',
  },
  {
    question: 'Can I get a refund for my course?',
    answer: 'Yes, we offer a 30-day money-back guarantee. Contact our support team with your order details for refund processing.',
  },
];

const resources = [
  { title: 'Getting Started Guide', description: 'Learn the basics of using EduPhoenix', icon: BookOpen },
  { title: 'Video Tutorials', description: 'Step-by-step video guides', icon: BookOpen },
  { title: 'API Documentation', description: 'For developers and integrations', icon: BookOpen },
  { title: 'Best Practices', description: 'Tips for effective learning', icon: BookOpen },
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Help & Support" subtitle="Find answers and get assistance" />

      <div className="p-6 space-y-6">
        {/* Search */}
        <div className="bg-gradient-phoenix rounded-2xl p-8 text-center">
          <HelpCircle size={48} className="mx-auto mb-4 text-primary-foreground" />
          <h2 className="font-display text-2xl font-bold text-primary-foreground mb-2">
            How can we help you?
          </h2>
          <p className="text-primary-foreground/80 mb-6">
            Search our knowledge base or browse frequently asked questions
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-background"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* FAQs */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-card">
            <h3 className="font-display text-lg font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-border rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
                  >
                    <span className="font-medium pr-4">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp size={20} className="text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown size={20} className="text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-4 text-muted-foreground animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Resources */}
          <div className="space-y-6">
            {/* Contact */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <h3 className="font-display text-lg font-semibold mb-4">Contact Support</h3>
              <div className="space-y-4">
                <a
                  href="#"
                  className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
               </a>
                <a
                  href="mailto:support@eduphoenix.com"
                  className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Mail size={20} className="text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-muted-foreground">support@eduphoenix.com</p>
                  </div>
                </a>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Phone size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-muted-foreground">+1 (234) 567-890</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <h3 className="font-display text-lg font-semibold mb-4">Resources</h3>
              <div className="space-y-3">
                {resources.map((resource) => (
                  <a
                    key={resource.title}
                    href="#"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                  >
                    <resource.icon size={18} className="text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">
                        {resource.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{resource.description}</p>
                    </div>
                    <ExternalLink size={14} className="text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
