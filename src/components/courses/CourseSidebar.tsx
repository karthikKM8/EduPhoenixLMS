import { useState } from "react";
import {
  ChevronDown,
  Play,
  FileText,
  HelpCircle,
  CheckCircle,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Module, Lesson } from "@/Data/courseData";

interface CourseSidebarProps {
  modules: Module[];
  currentLessonId: string;
  onLessonSelect: (lesson: Lesson) => void;
  courseProgress: number;
}

export function CourseSidebar({
  modules,
  currentLessonId,
  onLessonSelect,
  courseProgress,
}: CourseSidebarProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>([
    modules[0]?.id || "",
  ]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getLessonIcon = (lesson: Lesson) => {
    if (lesson.isLocked) return <Lock size={16} className="text-white/40" />;
    if (lesson.isCompleted)
      return <CheckCircle size={16} className="text-green-400" />;

    switch (lesson.type) {
      case "video":
        return <Play size={16} className="text-white/80" />;
      case "document":
        return <FileText size={16} className="text-white/80" />;
      case "quiz":
        return <HelpCircle size={16} className="text-white/80" />;
      default:
        return <Play size={16} className="text-white/80" />;
    }
  };

  const getModuleProgress = (module: Module) => {
    const completed = module.lessons.filter((l) => l.isCompleted).length;
    return Math.round((completed / module.lessons.length) * 100);
  };

  return (
    <aside className="h-full w-full bg-zinc-950 border-r border-white/10 flex flex-col overflow-hidden text-white">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <h2 className="font-display font-semibold text-lg mb-2">
          Course Content
        </h2>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/70 rounded-full transition-all duration-500"
              style={{ width: `${courseProgress}%` }}
            />
          </div>

          <span className="text-sm font-medium text-white/60">
            {courseProgress}%
          </span>
        </div>
      </div>

      {/* Modules */}
      <div className="flex-1 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {modules.map((module, moduleIndex) => {
          const isExpanded = expandedModules.includes(module.id);
          const moduleProgress = getModuleProgress(module);

          return (
            <div
              key={module.id}
              className="border-b border-white/10 last:border-0"
            >
              {/* Module Header */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full p-4 flex items-start gap-3 hover:bg-white/5 transition-colors text-left"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-semibold text-white">
                  {moduleIndex + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm line-clamp-2">
                    {module.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-white/60">
                      {module.lessons.length} lessons
                    </span>

                    {moduleProgress > 0 && (
                      <span className="text-xs text-green-400 font-medium">
                        {moduleProgress}% complete
                      </span>
                    )}
                  </div>
                </div>

                <ChevronDown
                  size={18}
                  className={cn(
                    "flex-shrink-0 text-white/60 transition-transform mt-0.5",
                    isExpanded && "rotate-180"
                  )}
                />
              </button>

              {/* Lessons */}
              {isExpanded && (
                <div className="bg-black/40 animate-fade-in">
                  {module.lessons.map((lesson) => {
                    const isActive = lesson.id === currentLessonId;

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => !lesson.isLocked && onLessonSelect(lesson)}
                        disabled={lesson.isLocked}
                        className={cn(
                          "w-full pl-12 pr-4 py-3 flex items-center gap-3 text-left transition-colors",
                          isActive
                            ? "bg-white/10 border-l-2 border-white"
                            : "hover:bg-white/5",
                          lesson.isLocked && "opacity-60 cursor-not-allowed"
                        )}
                      >
                        {getLessonIcon(lesson)}

                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              "text-sm line-clamp-1",
                              isActive && "font-medium text-white"
                            )}
                          >
                            {lesson.title}
                          </p>
                        </div>

                        <span className="text-xs text-white/50 flex-shrink-0">
                          {lesson.duration}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
