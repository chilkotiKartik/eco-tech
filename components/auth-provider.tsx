"use client"

import type React from "react"

import { createContext, useState, useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

// Define user types
export type Skill = {
  id: string
  name: string
  level: number
  category: string
  description: string
  lastPracticed: string
}

export type Badge = {
  id: string
  name: string
  description: string
  icon: string
  earnedAt: string
  category: string
}

export type JournalEntry = {
  id: string
  title: string
  content: string
  mood: string
  date: string
  tags: string[]
}

export type Course = {
  id: string
  title: string
  description: string
  progress: number
  category: string
  level: string
  duration: string
  instructor: string
  enrolledAt: string
}

export type Project = {
  id: string
  title: string
  description: string
  status: "not-started" | "in-progress" | "completed"
  dueDate: string
  collaborators: string[]
  tags: string[]
}

export type User = {
  id: string
  name: string
  email: string
  avatar: string
  role: "student" | "mentor" | "admin"
  careerPath: string
  skills: Skill[]
  badges: Badge[]
  journalEntries: JournalEntry[]
  courses: Course[]
  projects: Project[]
  joinedAt: string
  lastActive: string
  bio: string
  interests: string[]
  teams: string[]
  completedMissions: string[]
  level: number
  xp: number
  streak: number
  preferredLearningStyle: string
  careerGoals: string[]
  mentors: string[]
  mentees: string[]
}

// Create the context
type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  demoLogin: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Career-specific skills
const careerSkills = {
  developer: [
    {
      id: "skill-1",
      name: "JavaScript",
      level: 7,
      category: "Programming",
      description: "Modern JavaScript including ES6+ features",
      lastPracticed: "2023-05-10T14:30:00Z",
    },
    {
      id: "skill-2",
      name: "React",
      level: 6,
      category: "Programming",
      description: "Building web applications with React",
      lastPracticed: "2023-05-12T11:20:00Z",
    },
    {
      id: "skill-3",
      name: "Node.js",
      level: 5,
      category: "Programming",
      description: "Server-side JavaScript runtime",
      lastPracticed: "2023-05-08T09:15:00Z",
    },
    {
      id: "skill-4",
      name: "CSS",
      level: 8,
      category: "Design",
      description: "Styling web applications",
      lastPracticed: "2023-05-14T16:45:00Z",
    },
    {
      id: "skill-5",
      name: "Git",
      level: 6,
      category: "Tools",
      description: "Version control system",
      lastPracticed: "2023-05-11T13:30:00Z",
    },
  ],
  musician: [
    {
      id: "skill-1",
      name: "Music Theory",
      level: 7,
      category: "Theory",
      description: "Understanding of scales, chords, and harmony",
      lastPracticed: "2023-05-10T14:30:00Z",
    },
    {
      id: "skill-2",
      name: "Piano",
      level: 6,
      category: "Instrument",
      description: "Playing piano and keyboard instruments",
      lastPracticed: "2023-05-12T11:20:00Z",
    },
    {
      id: "skill-3",
      name: "Composition",
      level: 5,
      category: "Creation",
      description: "Creating original musical pieces",
      lastPracticed: "2023-05-08T09:15:00Z",
    },
    {
      id: "skill-4",
      name: "Music Production",
      level: 4,
      category: "Technology",
      description: "Using DAWs and audio production tools",
      lastPracticed: "2023-05-14T16:45:00Z",
    },
    {
      id: "skill-5",
      name: "Ear Training",
      level: 6,
      category: "Theory",
      description: "Identifying pitches, intervals, and chords by ear",
      lastPracticed: "2023-05-11T13:30:00Z",
    },
  ],
  artist: [
    {
      id: "skill-1",
      name: "Drawing",
      level: 7,
      category: "Technique",
      description: "Creating images using various drawing media",
      lastPracticed: "2023-05-10T14:30:00Z",
    },
    {
      id: "skill-2",
      name: "Color Theory",
      level: 6,
      category: "Theory",
      description: "Understanding color relationships and psychology",
      lastPracticed: "2023-05-12T11:20:00Z",
    },
    {
      id: "skill-3",
      name: "Digital Illustration",
      level: 5,
      category: "Digital",
      description: "Creating artwork using digital tools",
      lastPracticed: "2023-05-08T09:15:00Z",
    },
    {
      id: "skill-4",
      name: "Composition",
      level: 8,
      category: "Theory",
      description: "Arranging elements within artwork",
      lastPracticed: "2023-05-14T16:45:00Z",
    },
    {
      id: "skill-5",
      name: "Painting",
      level: 6,
      category: "Technique",
      description: "Creating images using paint media",
      lastPracticed: "2023-05-11T13:30:00Z",
    },
  ],
  researcher: [
    {
      id: "skill-1",
      name: "Research Methods",
      level: 7,
      category: "Methodology",
      description: "Designing and conducting research studies",
      lastPracticed: "2023-05-10T14:30:00Z",
    },
    {
      id: "skill-2",
      name: "Data Analysis",
      level: 6,
      category: "Analysis",
      description: "Statistical analysis and interpretation",
      lastPracticed: "2023-05-12T11:20:00Z",
    },
    {
      id: "skill-3",
      name: "Academic Writing",
      level: 5,
      category: "Communication",
      description: "Writing research papers and reports",
      lastPracticed: "2023-05-08T09:15:00Z",
    },
    {
      id: "skill-4",
      name: "Literature Review",
      level: 8,
      category: "Research",
      description: "Analyzing and synthesizing existing research",
      lastPracticed: "2023-05-14T16:45:00Z",
    },
    {
      id: "skill-5",
      name: "Critical Thinking",
      level: 6,
      category: "Cognitive",
      description: "Evaluating information and arguments",
      lastPracticed: "2023-05-11T13:30:00Z",
    },
  ],
  educator: [
    {
      id: "skill-1",
      name: "Pedagogy",
      level: 7,
      category: "Teaching",
      description: "Theories and methods of teaching",
      lastPracticed: "2023-05-10T14:30:00Z",
    },
    {
      id: "skill-2",
      name: "Curriculum Design",
      level: 6,
      category: "Planning",
      description: "Creating educational content and plans",
      lastPracticed: "2023-05-12T11:20:00Z",
    },
    {
      id: "skill-3",
      name: "Assessment",
      level: 5,
      category: "Evaluation",
      description: "Evaluating student learning",
      lastPracticed: "2023-05-08T09:15:00Z",
    },
    {
      id: "skill-4",
      name: "Classroom Management",
      level: 8,
      category: "Management",
      description: "Creating positive learning environments",
      lastPracticed: "2023-05-14T16:45:00Z",
    },
    {
      id: "skill-5",
      name: "Educational Technology",
      level: 6,
      category: "Technology",
      description: "Using technology to enhance learning",
      lastPracticed: "2023-05-11T13:30:00Z",
    },
  ],
  entrepreneur: [
    {
      id: "skill-1",
      name: "Business Strategy",
      level: 7,
      category: "Strategy",
      description: "Developing and implementing business plans",
      lastPracticed: "2023-05-10T14:30:00Z",
    },
    {
      id: "skill-2",
      name: "Marketing",
      level: 6,
      category: "Marketing",
      description: "Promoting products and services",
      lastPracticed: "2023-05-12T11:20:00Z",
    },
    {
      id: "skill-3",
      name: "Finance",
      level: 5,
      category: "Finance",
      description: "Managing business finances",
      lastPracticed: "2023-05-08T09:15:00Z",
    },
    {
      id: "skill-4",
      name: "Leadership",
      level: 8,
      category: "Management",
      description: "Leading and motivating teams",
      lastPracticed: "2023-05-14T16:45:00Z",
    },
    {
      id: "skill-5",
      name: "Networking",
      level: 6,
      category: "Communication",
      description: "Building professional relationships",
      lastPracticed: "2023-05-11T13:30:00Z",
    },
  ],
  default: [
    {
      id: "skill-1",
      name: "Communication",
      level: 7,
      category: "Soft Skills",
      description: "Effective verbal and written communication",
      lastPracticed: "2023-05-10T14:30:00Z",
    },
    {
      id: "skill-2",
      name: "Problem Solving",
      level: 6,
      category: "Cognitive",
      description: "Analyzing and solving complex problems",
      lastPracticed: "2023-05-12T11:20:00Z",
    },
    {
      id: "skill-3",
      name: "Time Management",
      level: 5,
      category: "Organization",
      description: "Efficiently managing time and priorities",
      lastPracticed: "2023-05-08T09:15:00Z",
    },
    {
      id: "skill-4",
      name: "Critical Thinking",
      level: 8,
      category: "Cognitive",
      description: "Evaluating information and making reasoned judgments",
      lastPracticed: "2023-05-14T16:45:00Z",
    },
    {
      id: "skill-5",
      name: "Adaptability",
      level: 6,
      category: "Soft Skills",
      description: "Adjusting to new conditions and challenges",
      lastPracticed: "2023-05-11T13:30:00Z",
    },
  ],
}

// Career-specific courses
const careerCourses = {
  developer: [
    {
      id: "course-1",
      title: "Modern JavaScript Fundamentals",
      description: "Master the core concepts of modern JavaScript programming",
      progress: 75,
      category: "Programming",
      level: "Intermediate",
      duration: "8 weeks",
      instructor: "Alex Johnson",
      enrolledAt: "2023-04-15T10:00:00Z",
    },
    {
      id: "course-2",
      title: "React for Beginners",
      description: "Learn to build interactive UIs with React",
      progress: 45,
      category: "Programming",
      level: "Beginner",
      duration: "6 weeks",
      instructor: "Maya Patel",
      enrolledAt: "2023-05-01T14:30:00Z",
    },
    {
      id: "course-3",
      title: "Full Stack Development with Node.js",
      description: "Build complete web applications with Node.js and Express",
      progress: 20,
      category: "Programming",
      level: "Advanced",
      duration: "10 weeks",
      instructor: "James Wilson",
      enrolledAt: "2023-05-10T09:15:00Z",
    },
  ],
  musician: [
    {
      id: "course-1",
      title: "Music Theory Fundamentals",
      description: "Understand the building blocks of music",
      progress: 80,
      category: "Theory",
      level: "Beginner",
      duration: "6 weeks",
      instructor: "Sarah Chen",
      enrolledAt: "2023-04-15T10:00:00Z",
    },
    {
      id: "course-2",
      title: "Digital Music Production",
      description: "Create professional music with digital tools",
      progress: 50,
      category: "Production",
      level: "Intermediate",
      duration: "8 weeks",
      instructor: "David Rodriguez",
      enrolledAt: "2023-05-01T14:30:00Z",
    },
    {
      id: "course-3",
      title: "Songwriting Workshop",
      description: "Craft compelling lyrics and melodies",
      progress: 30,
      category: "Composition",
      level: "Intermediate",
      duration: "6 weeks",
      instructor: "Emma Thompson",
      enrolledAt: "2023-05-10T09:15:00Z",
    },
  ],
  artist: [
    {
      id: "course-1",
      title: "Digital Illustration Fundamentals",
      description: "Master the basics of digital art creation",
      progress: 65,
      category: "Digital Art",
      level: "Beginner",
      duration: "6 weeks",
      instructor: "Mia Johnson",
      enrolledAt: "2023-04-15T10:00:00Z",
    },
    {
      id: "course-2",
      title: "Color Theory for Artists",
      description: "Understand and apply color effectively in your artwork",
      progress: 90,
      category: "Theory",
      level: "Intermediate",
      duration: "4 weeks",
      instructor: "Carlos Mendez",
      enrolledAt: "2023-05-01T14:30:00Z",
    },
    {
      id: "course-3",
      title: "Character Design Masterclass",
      description: "Create compelling and unique character designs",
      progress: 40,
      category: "Illustration",
      level: "Advanced",
      duration: "8 weeks",
      instructor: "Naomi Lee",
      enrolledAt: "2023-05-10T09:15:00Z",
    },
  ],
  researcher: [
    {
      id: "course-1",
      title: "Research Methods and Design",
      description: "Learn to design effective research studies",
      progress: 85,
      category: "Methodology",
      level: "Intermediate",
      duration: "8 weeks",
      instructor: "Dr. Robert Chen",
      enrolledAt: "2023-04-15T10:00:00Z",
    },
    {
      id: "course-2",
      title: "Statistical Analysis for Researchers",
      description: "Master data analysis techniques for research",
      progress: 60,
      category: "Analysis",
      level: "Advanced",
      duration: "10 weeks",
      instructor: "Dr. Sophia Martinez",
      enrolledAt: "2023-05-01T14:30:00Z",
    },
    {
      id: "course-3",
      title: "Academic Writing and Publication",
      description: "Write and publish research papers effectively",
      progress: 40,
      category: "Communication",
      level: "Advanced",
      duration: "6 weeks",
      instructor: "Dr. Michael Thompson",
      enrolledAt: "2023-05-10T09:15:00Z",
    },
  ],
  educator: [
    {
      id: "course-1",
      title: "Modern Teaching Methods",
      description: "Explore innovative approaches to education",
      progress: 70,
      category: "Pedagogy",
      level: "Intermediate",
      duration: "8 weeks",
      instructor: "Dr. Lisa Johnson",
      enrolledAt: "2023-04-15T10:00:00Z",
    },
    {
      id: "course-2",
      title: "Curriculum Development",
      description: "Design effective learning experiences",
      progress: 55,
      category: "Planning",
      level: "Advanced",
      duration: "6 weeks",
      instructor: "Dr. James Wilson",
      enrolledAt: "2023-05-01T14:30:00Z",
    },
    {
      id: "course-3",
      title: "Educational Technology Integration",
      description: "Enhance learning with digital tools",
      progress: 30,
      category: "Technology",
      level: "Intermediate",
      duration: "4 weeks",
      instructor: "Sarah Martinez",
      enrolledAt: "2023-05-10T09:15:00Z",
    },
  ],
  entrepreneur: [
    {
      id: "course-1",
      title: "Business Model Canvas",
      description: "Design and validate your business model",
      progress: 90,
      category: "Strategy",
      level: "Beginner",
      duration: "4 weeks",
      instructor: "Mark Johnson",
      enrolledAt: "2023-04-15T10:00:00Z",
    },
    {
      id: "course-2",
      title: "Digital Marketing for Startups",
      description: "Grow your business with effective online marketing",
      progress: 65,
      category: "Marketing",
      level: "Intermediate",
      duration: "6 weeks",
      instructor: "Sophia Lee",
      enrolledAt: "2023-05-01T14:30:00Z",
    },
    {
      id: "course-3",
      title: "Startup Funding Strategies",
      description: "Learn how to raise capital for your venture",
      progress: 40,
      category: "Finance",
      level: "Advanced",
      duration: "8 weeks",
      instructor: "Robert Chen",
      enrolledAt: "2023-05-10T09:15:00Z",
    },
  ],
  default: [
    {
      id: "course-1",
      title: "Personal Development Fundamentals",
      description: "Build essential skills for personal growth",
      progress: 75,
      category: "Self-Improvement",
      level: "Beginner",
      duration: "6 weeks",
      instructor: "Emma Thompson",
      enrolledAt: "2023-04-15T10:00:00Z",
    },
    {
      id: "course-2",
      title: "Effective Communication",
      description: "Master verbal and written communication skills",
      progress: 60,
      category: "Communication",
      level: "Intermediate",
      duration: "4 weeks",
      instructor: "David Wilson",
      enrolledAt: "2023-05-01T14:30:00Z",
    },
    {
      id: "course-3",
      title: "Critical Thinking and Problem Solving",
      description: "Develop analytical and creative thinking skills",
      progress: 40,
      category: "Cognitive Skills",
      level: "Intermediate",
      duration: "8 weeks",
      instructor: "Sarah Chen",
      enrolledAt: "2023-05-10T09:15:00Z",
    },
  ],
}

// Career-specific projects
const careerProjects = {
  developer: [
    {
      id: "project-1",
      title: "Personal Portfolio Website",
      description: "Create a responsive portfolio website to showcase your work",
      status: "in-progress",
      dueDate: "2023-06-15T23:59:59Z",
      collaborators: [],
      tags: ["Web Development", "React", "Portfolio"],
    },
    {
      id: "project-2",
      title: "Task Management App",
      description: "Build a full-stack application for managing tasks and projects",
      status: "not-started",
      dueDate: "2023-07-30T23:59:59Z",
      collaborators: ["user-2", "user-3"],
      tags: ["Full Stack", "React", "Node.js", "Database"],
    },
  ],
  musician: [
    {
      id: "project-1",
      title: "Original Composition",
      description: "Compose an original piece in your preferred genre",
      status: "in-progress",
      dueDate: "2023-06-15T23:59:59Z",
      collaborators: [],
      tags: ["Composition", "Music Production"],
    },
    {
      id: "project-2",
      title: "Cover Song Arrangement",
      description: "Create a unique arrangement of a popular song",
      status: "not-started",
      dueDate: "2023-07-30T23:59:59Z",
      collaborators: ["user-2"],
      tags: ["Arrangement", "Performance", "Recording"],
    },
  ],
  artist: [
    {
      id: "project-1",
      title: "Digital Art Portfolio",
      description: "Create a collection of digital artworks showcasing various techniques",
      status: "in-progress",
      dueDate: "2023-06-15T23:59:59Z",
      collaborators: [],
      tags: ["Digital Art", "Illustration", "Portfolio"],
    },
    {
      id: "project-2",
      title: "Character Design Series",
      description: "Design a series of characters with consistent style and theme",
      status: "not-started",
      dueDate: "2023-07-30T23:59:59Z",
      collaborators: ["user-2"],
      tags: ["Character Design", "Concept Art", "Storytelling"],
    },
  ],
  researcher: [
    {
      id: "project-1",
      title: "Literature Review",
      description: "Conduct a comprehensive review of literature in your field of interest",
      status: "in-progress",
      dueDate: "2023-06-15T23:59:59Z",
      collaborators: [],
      tags: ["Research", "Academic Writing", "Analysis"],
    },
    {
      id: "project-2",
      title: "Research Proposal",
      description: "Develop a detailed proposal for a research study",
      status: "not-started",
      dueDate: "2023-07-30T23:59:59Z",
      collaborators: ["user-2", "user-3"],
      tags: ["Research Design", "Methodology", "Grant Writing"],
    },
  ],
  educator: [
    {
      id: "project-1",
      title: "Lesson Plan Series",
      description: "Create a series of engaging lesson plans for your subject area",
      status: "in-progress",
      dueDate: "2023-06-15T23:59:59Z",
      collaborators: [],
      tags: ["Curriculum Design", "Pedagogy", "Assessment"],
    },
    {
      id: "project-2",
      title: "Educational Resource",
      description: "Develop a digital resource to support student learning",
      status: "not-started",
      dueDate: "2023-07-30T23:59:59Z",
      collaborators: ["user-2"],
      tags: ["EdTech", "Digital Resources", "Instructional Design"],
    },
  ],
  entrepreneur: [
    {
      id: "project-1",
      title: "Business Plan",
      description: "Develop a comprehensive business plan for your venture idea",
      status: "in-progress",
      dueDate: "2023-06-15T23:59:59Z",
      collaborators: [],
      tags: ["Business Strategy", "Market Research", "Financial Planning"],
    },
    {
      id: "project-2",
      title: "MVP Development",
      description: "Create a minimum viable product to test your business concept",
      status: "not-started",
      dueDate: "2023-07-30T23:59:59Z",
      collaborators: ["user-2", "user-3"],
      tags: ["Product Development", "User Testing", "Iteration"],
    },
  ],
  default: [
    {
      id: "project-1",
      title: "Personal Development Plan",
      description: "Create a structured plan for your personal and professional growth",
      status: "in-progress",
      dueDate: "2023-06-15T23:59:59Z",
      collaborators: [],
      tags: ["Self-Improvement", "Goal Setting", "Planning"],
    },
    {
      id: "project-2",
      title: "Skill Showcase",
      description: "Develop a portfolio or demonstration of your key skills",
      status: "not-started",
      dueDate: "2023-07-30T23:59:59Z",
      collaborators: [],
      tags: ["Portfolio", "Skill Development", "Presentation"],
    },
  ],
}

// Create demo user with career-specific data
const createDemoUser = (careerPath = "default") => {
  return {
    id: "demo-user-123",
    name: "Alex Johnson",
    email: "demo@example.com",
    avatar: "/placeholder.svg?height=200&width=200",
    role: "student",
    careerPath,
    skills: careerSkills[careerPath] || careerSkills.default,
    badges: [
      {
        id: "badge-1",
        name: "Fast Learner",
        description: "Completed 5 courses in one week",
        icon: "🚀",
        earnedAt: "2023-04-15T08:30:00Z",
        category: "Achievement",
      },
      {
        id: "badge-2",
        name: "Team Player",
        description: "Collaborated on 3 team projects",
        icon: "👥",
        earnedAt: "2023-04-22T14:45:00Z",
        category: "Social",
      },
      {
        id: "badge-3",
        name: "Problem Solver",
        description: "Solved 10 complex challenges",
        icon: "🧩",
        earnedAt: "2023-05-01T11:20:00Z",
        category: "Skills",
      },
    ],
    journalEntries: [
      {
        id: "entry-1",
        title: "First Day Reflections",
        content: "Today was my first day using the platform. I'm excited about the journey ahead!",
        mood: "Excited",
        date: "2023-04-10T18:30:00Z",
        tags: ["beginning", "goals", "reflection"],
      },
      {
        id: "entry-2",
        title: "Overcoming Challenges",
        content: "Faced a difficult problem today but managed to solve it after some research.",
        mood: "Accomplished",
        date: "2023-04-15T20:15:00Z",
        tags: ["challenge", "growth", "learning"],
      },
      {
        id: "entry-3",
        title: "Team Collaboration",
        content: "Working with my new team has been a great experience. We complement each other's skills.",
        mood: "Happy",
        date: "2023-04-22T19:45:00Z",
        tags: ["teamwork", "collaboration", "communication"],
      },
    ],
    courses: careerCourses[careerPath] || careerCourses.default,
    projects: careerProjects[careerPath] || careerProjects.default,
    joinedAt: "2023-04-10T08:00:00Z",
    lastActive: "2023-05-15T15:30:00Z",
    bio: "Passionate learner exploring the intersection of technology and creativity. Always looking for new challenges and opportunities to grow.",
    interests: ["Web Development", "AI", "Design", "Music", "Photography"],
    teams: ["team-1", "team-2"],
    completedMissions: ["mission-1", "mission-3", "mission-5"],
    level: 12,
    xp: 1250,
    streak: 15,
    preferredLearningStyle: "Visual",
    careerGoals: ["Full Stack Developer", "UX Designer"],
    mentors: ["mentor-1", "mentor-3"],
    mentees: [],
  }
}

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get selected career path from localStorage
      const careerPath = localStorage.getItem("selectedCareer") || "default"

      // Create demo user with career-specific data
      const loggedInUser = createDemoUser(careerPath)
      loggedInUser.email = email // Use the provided email

      setUser(loggedInUser)
      localStorage.setItem("user", JSON.stringify(loggedInUser))

      toast({
        title: "Login successful",
        description: "Welcome back to Em-Sphere!",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      })
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const demoLogin = async () => {
    setIsLoading(true)

    // Get selected career path from localStorage
    const careerPath = localStorage.getItem("selectedCareer") || "default"

    // Create demo user with career-specific data
    const demoUser = createDemoUser(careerPath)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setUser(demoUser)
    localStorage.setItem("user", JSON.stringify(demoUser))

    toast({
      title: "Demo login successful",
      description: `Welcome to Em-Sphere, Alex! You're logged in as a ${careerPath === "default" ? "learner" : careerPath}.`,
    })

    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/home")

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        demoLogin,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
