export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "document" | "quiz";
  isCompleted: boolean;
  isLocked: boolean;
  videoUrl?: string;
  documentUrl?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  students: number;
  rating: number;
  duration: string;
  lessons: number;
  level: string;
  category: string;
  thumbnail: string;
  progress: number;
  modules: Module[];
}

export const sampleCourseModules: Module[] = [
  {
    id: "module-1",
    title: "Getting Started",
    lessons: [
      {
        id: "lesson-1-1",
        title: "Welcome to the Course",
        duration: "5:30",
        type: "video",
        isCompleted: true,
        isLocked: false,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "lesson-1-2",
        title: "Course Overview & Setup",
        duration: "12:45",
        type: "video",
        isCompleted: true,
        isLocked: false,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "lesson-1-3",
        title: "Development Environment Setup",
        duration: "18:20",
        type: "document",
        isCompleted: false,
        isLocked: false,
      },
    ],
  },
  {
    id: "module-2",
    title: "Core Fundamentals",
    lessons: [
      {
        id: "lesson-2-1",
        title: "Understanding the Basics",
        duration: "22:10",
        type: "video",
        isCompleted: false,
        isLocked: false,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "lesson-2-2",
        title: "Building Your First Project",
        duration: "35:00",
        type: "video",
        isCompleted: false,
        isLocked: false,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "lesson-2-3",
        title: "Best Practices Guide",
        duration: "15:00",
        type: "document",
        isCompleted: false,
        isLocked: false,
      },
      {
        id: "lesson-2-4",
        title: "Module 2 Quiz",
        duration: "10:00",
        type: "quiz",
        isCompleted: false,
        isLocked: true,
      },
    ],
  },
  {
    id: "module-3",
    title: "Advanced Concepts",
    lessons: [
      {
        id: "lesson-3-1",
        title: "Advanced Patterns",
        duration: "28:15",
        type: "video",
        isCompleted: false,
        isLocked: true,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "lesson-3-2",
        title: "Performance Optimization",
        duration: "32:40",
        type: "video",
        isCompleted: false,
        isLocked: true,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "lesson-3-3",
        title: "Deployment Strategies",
        duration: "25:00",
        type: "video",
        isCompleted: false,
        isLocked: true,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
  },
  {
    id: "module-4",
    title: "Real-World Projects",
    lessons: [
      {
        id: "lesson-4-1",
        title: "Project 1: E-commerce App",
        duration: "45:00",
        type: "video",
        isCompleted: false,
        isLocked: true,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "lesson-4-2",
        title: "Project 2: Dashboard",
        duration: "50:00",
        type: "video",
        isCompleted: false,
        isLocked: true,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "lesson-4-3",
        title: "Final Project Documentation",
        duration: "20:00",
        type: "document",
        isCompleted: false,
        isLocked: true,
      },
    ],
  },
];

export const courses: Course[] = [
  {
    id: 1,
    title: "Full Stack Development",
    description:
      "Master advanced React concepts like hooks, context API, performance optimizations, reusable components and scalable architecture.",
    instructor: "John Smith",
    students: 245,
    rating: 4.8,
    duration: "24h",
    lessons: 48,
    level: "Advanced",
    category: "Full stack development",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    progress: 65,
    modules: sampleCourseModules,
  },
  {
    id: 2,
    title: "Data Science with Python",
    description:
      "Learn Python fundamentals for data science, including NumPy, Pandas, data visualization, and real-world datasets.",
    instructor: "Sarah Wilson",
    students: 512,
    rating: 4.9,
    duration: "32h",
    lessons: 64,
    level: "Intermediate",
    category: "Data Science",
    thumbnail:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
    progress: 30,
    modules: sampleCourseModules,
  },
  {
    id: 3,
    title: "Machine Learning with Python",
    description:
      "Understand ML principles, algorithms, model training, and building intelligent applications.",
    instructor: "Mike Johnson",
    students: 189,
    rating: 4.7,
    duration: "18h",
    lessons: 36,
    level: "Beginner",
    category: "AI & ML",
    thumbnail:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    progress: 100,
    modules: sampleCourseModules,
  },
  {
    id: 4,
    title: "Cyber Security",
    description:
      "Learn security fundamentals, ethical hacking, penetration testing, and protecting digital assets.",
    instructor: "Anna Garcia",
    students: 367,
    rating: 4.6,
    duration: "28h",
    lessons: 56,
    level: "Intermediate",
    category: "Cyber Security",
    thumbnail:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
    progress: 0,
    modules: sampleCourseModules,
  },
  {
    id: 5,
    title: "Artificial Intelligence",
    description:
      "Explore AI concepts including neural networks, deep learning, NLP, and computer vision.",
    instructor: "David Lee",
    students: 428,
    rating: 4.8,
    duration: "40h",
    lessons: 80,
    level: "Intermediate",
    category: "AI & ML",
    thumbnail:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
    progress: 45,
    modules: sampleCourseModules,
  },
];

export const categories = ["All", "Full stack development", "Data Science", "Cyber Security", "AI & ML"];
