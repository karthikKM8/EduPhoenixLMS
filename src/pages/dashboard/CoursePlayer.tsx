import { useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/courses/VideoPlayer";
import { CourseSidebar } from "@/components/courses/CourseSidebar";
import { DocumentViewer } from "@/components/courses/DocumentViewer";
import { courses } from "@/Data/courseData";
import type { Lesson } from "@/Data/courseData";
import { cn } from "@/lib/utils";

export default function CoursePlayerPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // ✅ Mobile sidebar open default
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const course = courses.find((c) => c.id === Number(courseId));

  const [currentLessonId, setCurrentLessonId] = useState<string>(
    course?.modules[0]?.lessons[0]?.id || ""
  );

  if (!course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-white">Course not found</h1>
          <Button variant="phoenix" onClick={() => navigate("/dashboard/courses")}>
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  // ✅ Build all lessons list (flatten)
  const allLessons = useMemo(() => {
    return course.modules.flatMap((m) => m.lessons);
  }, [course.modules]);

  // Find current lesson
  const currentLessonIndexGlobal = allLessons.findIndex(
    (l) => l.id === currentLessonId
  );

  const currentLesson: Lesson | undefined =
    currentLessonIndexGlobal !== -1 ? allLessons[currentLessonIndexGlobal] : undefined;

  // Find current module + lesson index for breadcrumb
  let currentModuleIndex = 0;
  let currentLessonIndex = 0;

  for (let i = 0; i < course.modules.length; i++) {
    const lessonIndex = course.modules[i].lessons.findIndex(
      (l) => l.id === currentLessonId
    );
    if (lessonIndex !== -1) {
      currentModuleIndex = i;
      currentLessonIndex = lessonIndex;
      break;
    }
  }

  const handleLessonSelect = (lesson: Lesson) => {
    setCurrentLessonId(lesson.id);
  };

  // ✅ Udemy style → Auto move to next unlocked lesson
  const goToNextUnlockedLesson = () => {
    for (let i = currentLessonIndexGlobal + 1; i < allLessons.length; i++) {
      const nextLesson = allLessons[i];
      if (!nextLesson.isLocked) {
        setCurrentLessonId(nextLesson.id);
        return;
      }
    }
  };

  const goToPreviousLesson = () => {
    if (currentLessonIndexGlobal > 0) {
      const prevLesson = allLessons[currentLessonIndexGlobal - 1];
      setCurrentLessonId(prevLesson.id);
    }
  };

  const courseProgress = Math.round(
    (course.modules.reduce(
      (acc, module) => acc + module.lessons.filter((l) => l.isCompleted).length,
      0
    ) /
      course.modules.reduce((acc, module) => acc + module.lessons.length, 0)) *
      100
  );

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* ✅ Header */}
      <header className="h-14 z-50 px-4 flex items-center justify-between flex-shrink-0 bg-zinc-950 border-b border-white/10">
        <div className="flex items-center gap-4 min-w-0">
          <Link
            to="/dashboard/courses"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Back to Courses</span>
          </Link>

          <div className="h-6 w-px bg-white/10 hidden sm:block" />

          <h1 className="font-display font-semibold text-sm sm:text-base line-clamp-1 text-white">
            {course.title}
          </h1>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden text-white hover:bg-white/10"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </header>

      {/* ✅ Main */}
      <div className="flex-1 flex overflow-hidden">
        {/* ✅ Sidebar Responsive Width */}
        <div
          className={cn(
            "fixed lg:relative top-0 bottom-0 left-0 z-40 transition-transform duration-300 lg:translate-x-0",
            "w-full sm:w-[320px] lg:w-[360px]",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <CourseSidebar
            modules={course.modules}
            currentLessonId={currentLessonId}
            onLessonSelect={handleLessonSelect}
            courseProgress={courseProgress}
          />
        </div>

        {/* ✅ Overlay mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ✅ Content */}
        <main className="flex-1 overflow-y-auto bg-black scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-white/60">
              <span>{course.modules[currentModuleIndex]?.title}</span>
              <ChevronRight size={14} />
              <span className="text-white font-medium">
                {currentLesson?.title}
              </span>
            </div>

            {/* ✅ Video / Document */}
            {currentLesson?.type === "video" && currentLesson.videoUrl && (
              <VideoPlayer
                videoUrl={currentLesson.videoUrl}
                title={currentLesson.title}
                onComplete={goToNextUnlockedLesson} // ✅ AUTOPLAY NEXT
              />
            )}

            {currentLesson?.type === "document" && (
              <DocumentViewer title={currentLesson.title} />
            )}

            {currentLesson?.type === "quiz" && (
              <div className="bg-zinc-950 rounded-xl border border-white/10 p-8 text-center text-white">
                <h3 className="font-display text-xl font-semibold mb-4">
                  Quiz: {currentLesson.title}
                </h3>
                <p className="text-white/60 mb-6">
                  Test your knowledge from this module.
                </p>
                <Button variant="phoenix">Start Quiz</Button>
              </div>
            )}

            {/* Lesson Info */}
            <div className="bg-zinc-950 rounded-xl border border-white/10 p-6 text-white">
              <h2 className="font-display text-xl font-semibold mb-2">
                {currentLesson?.title}
              </h2>

              <p className="text-white/60 mb-4">
                Duration: {currentLesson?.duration} • {currentLesson?.type}
              </p>

              <div className="flex gap-3 flex-wrap">
                <Button
                  variant="outline"
                  onClick={goToPreviousLesson}
                  disabled={currentLessonIndexGlobal <= 0}
                >
                  Previous Lesson
                </Button>

                <Button variant="phoenix" onClick={goToNextUnlockedLesson}>
                  Next Lesson
                  <ChevronRight size={18} />
                </Button>
              </div>
            </div>

            {/* About */}
            <div className="bg-zinc-950 rounded-xl border border-white/10 p-6 text-white">
              <h3 className="font-display font-semibold mb-3">
                About this course
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {course.description}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
