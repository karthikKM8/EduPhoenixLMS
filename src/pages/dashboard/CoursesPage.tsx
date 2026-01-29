import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { courses, categories } from "@/Data/courseData";
import {
  Search,
  Plus,
  Grid3X3,
  List,
  Clock,
  Users,
  Star,
  Play,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [openCourseId, setOpenCourseId] = useState<number | null>(null);
  const navigate = useNavigate();

  const { user } = useAuth();

  const isAdmin = user?.role === "super_admin" || user?.role === "admin";
  const isInstructor = user?.role === "instructor";

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // ✅ FIXED: Navigate to dashboard course player page
  const handleCourseClick = (courseId: number) => {
    navigate(`/course-player/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Courses"
        subtitle={
          isAdmin
            ? "Manage all courses"
            : isInstructor
            ? "Your courses"
            : "Browse and learn"
        }
      />

      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex gap-3 flex-1 flex-wrap">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 transition-colors",
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                <Grid3X3 size={18} />
              </button>

              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 transition-colors",
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                <List size={18} />
              </button>
            </div>

            {(isAdmin || isInstructor) && (
              <Button variant="phoenix">
                <Plus size={18} />
                Create Course
              </Button>
            )}
          </div>
        </div>

        {/* Courses Grid/List */}
        <div
          className={cn(
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          )}
        >
          {filteredCourses.map((course, index) => {
            const isOpen = openCourseId === course.id;

            return (
              <div
                key={course.id}
                className={cn(
                  "bg-card rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 group animate-fade-in",
                  viewMode === "list" && "flex"
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Thumbnail */}
                <div
                  className={cn(
                    "relative overflow-hidden cursor-pointer",
                    viewMode === "grid"
                      ? "aspect-video"
                      : "w-48 h-32 flex-shrink-0"
                  )}
                  onClick={() => handleCourseClick(course.id)}
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-phoenix">
                      <Play size={24} fill="currentColor" />
                    </button>
                  </div>

                  <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-card/90 text-foreground text-xs font-medium">
                    {course.level}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1">
                  <p className="text-xs text-primary font-medium mb-2">
                    {course.category}
                  </p>

                  {/* Title + Dropdown Arrow */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3
                      className="font-display font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors cursor-pointer"
                      onClick={() => handleCourseClick(course.id)}
                    >
                      {course.title}
                    </h3>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenCourseId(isOpen ? null : course.id);
                      }}
                      className="mt-1 p-1 rounded-md hover:bg-muted transition"
                      title="Show details"
                    >
                      <ChevronDown
                        size={18}
                        className={cn(
                          "transition-transform duration-200",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>
                  </div>

                  {/* Details - Only visible when dropdown is open */}
                  {isOpen && (
                    <div className="animate-fade-in space-y-3">
                      <p className="text-sm text-muted-foreground">
                        {course.description}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        by{" "}
                        <span className="font-medium text-foreground">
                          {course.instructor}
                        </span>
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {course.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen size={14} />
                          {course.lessons} lessons
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          {course.students} enrolled
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 pt-3 border-t border-border">
                        <Star size={16} className="text-accent fill-accent" />
                        <span className="font-medium">{course.rating}</span>
                        <span className="text-muted-foreground text-sm">
                          ({course.students} reviews)
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
