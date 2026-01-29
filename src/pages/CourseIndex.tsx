import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, BookOpen, Users, Award, ArrowRight } from "lucide-react";
import { courses } from "@/Data/courseData";

const Index = () => {
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-phoenix opacity-5" />
        <div className="container mx-auto px-4 py-20 sm:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Learn Without{" "}
              <span className="text-gradient-phoenix">Limits</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Master new skills with expert-led courses in development, data science, 
              AI, and more. Start your learning journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="phoenix" size="lg" asChild>
                <Link to="/courses">
                  Explore Courses
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Play size={20} />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-display font-bold text-primary mb-2">
                50+
              </div>
              <p className="text-sm text-muted-foreground">Expert Courses</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-display font-bold text-primary mb-2">
                10K+
              </div>
              <p className="text-sm text-muted-foreground">Active Students</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-display font-bold text-primary mb-2">
                4.8
              </div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-display font-bold text-primary mb-2">
                95%
              </div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Why Choose Us?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get the best learning experience with our modern platform designed for success.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card hover:shadow-elevated transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <BookOpen className="text-primary" size={24} />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">
              Expert-Led Content
            </h3>
            <p className="text-sm text-muted-foreground">
              Learn from industry professionals with real-world experience and proven track records.
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 shadow-card hover:shadow-elevated transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Users className="text-primary" size={24} />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">
              Community Support
            </h3>
            <p className="text-sm text-muted-foreground">
              Join a vibrant community of learners and get help whenever you need it.
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 shadow-card hover:shadow-elevated transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Award className="text-primary" size={24} />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">
              Certificates
            </h3>
            <p className="text-sm text-muted-foreground">
              Earn recognized certificates upon course completion to showcase your skills.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
                Featured Courses
              </h2>
              <p className="text-muted-foreground">
                Start with our most popular courses
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/courses">
                View All
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="bg-card rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 group"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-phoenix">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-primary font-medium mb-2">
                    {course.category}
                  </p>
                  <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    by {course.instructor}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {course.lessons} lessons • {course.duration}
                    </span>
                    <span className="font-medium">{course.level}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-phoenix rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Join thousands of students already learning on our platform. 
            Get started for free today.
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            asChild
          >
            <Link to="/courses">
              Browse Courses
              <ArrowRight size={20} />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 LMS Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
