"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"
import { useEmotion } from "@/components/emotion-provider"
import { InterestSelector } from "@/components/interest-selector"
import { MoodDetector } from "@/components/mood-detector"
import { AIChatbot } from "@/components/ai-chatbot"
import { VoiceInteraction } from "@/components/voice-interaction"
import { AchievementSystem } from "@/components/achievement-system"
import { InteractiveLearningGame } from "@/components/interactive-learning-game"
import { PersonalizedLearningPath } from "@/components/personalized-learning-path"
import { ResponsiveNavbar } from "@/components/responsive-navbar"
import {
  Rocket,
  Brain,
  BookOpen,
  Users,
  Sparkles,
  Zap,
  Calendar,
  BarChart3,
  MessageSquare,
  Lightbulb,
  Palette,
  Code,
  HeartPulse,
  Briefcase,
  ArrowRight,
  Star,
  Trophy,
  Bell,
  Clock,
  Music,
  Mic,
  PenTool,
  LineChart,
  Target,
  Layers,
  Cpu,
  Database,
  GitBranch,
  Headphones,
  FileMusicIcon as MusicNote,
  Brush,
} from "lucide-react"

// Custom icon components
const ClipboardCheck = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  )
}

const Presentation = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h20" />
      <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
      <path d="m7 21 5-5 5 5" />
    </svg>
  )
}

// Career-specific content
const careerContent = {
  developer: {
    title: "Developer Dashboard",
    description: "Track your coding journey and technical skill development",
    icon: <Code className="h-6 w-6" />,
    recommendations: [
      { title: "Advanced JavaScript Patterns", type: "course", difficulty: "Intermediate" },
      { title: "Building Scalable APIs", type: "course", difficulty: "Advanced" },
      { title: "React Performance Optimization", type: "course", difficulty: "Intermediate" },
      { title: "Full-Stack E-commerce Project", type: "project", difficulty: "Advanced" },
      { title: "Introduction to TypeScript", type: "course", difficulty: "Beginner" },
    ],
    activities: [
      { title: "Debug a complex algorithm", icon: <Cpu className="h-4 w-4" /> },
      { title: "Optimize database queries", icon: <Database className="h-4 w-4" /> },
      { title: "Refactor legacy code", icon: <GitBranch className="h-4 w-4" /> },
    ],
    skills: [
      { name: "JavaScript", level: 7, category: "Frontend" },
      { name: "React", level: 6, category: "Frontend" },
      { name: "Node.js", level: 5, category: "Backend" },
      { name: "SQL", level: 4, category: "Database" },
      { name: "System Design", level: 3, category: "Architecture" },
    ],
    projects: [
      { name: "Personal Portfolio", progress: 85, deadline: "2 weeks" },
      { name: "Task Management API", progress: 60, deadline: "1 month" },
      { name: "E-commerce Frontend", progress: 30, deadline: "3 months" },
    ],
    events: [
      { name: "Web Dev Hackathon", date: "June 15-17, 2025" },
      { name: "React Conference", date: "July 22-24, 2025" },
      { name: "Code Review Workshop", date: "May 30, 2025" },
    ],
    insights: [
      {
        title: "Coding Patterns",
        description: "You excel at frontend development but could improve backend skills",
      },
      {
        title: "Learning Style",
        description: "You learn best through project-based approaches with clear documentation",
      },
      {
        title: "Productivity",
        description: "Your peak coding hours are between 9am-12pm and 4pm-7pm",
      },
    ],
    chartData: [
      { date: "Apr 24", coding: 65, learning: 70 },
      { date: "Apr 25", coding: 60, learning: 65 },
      { date: "Apr 26", coding: 70, learning: 60 },
      { date: "Apr 27", coding: 75, learning: 75 },
      { date: "Apr 28", coding: 60, learning: 80 },
      { date: "Apr 29", coding: 80, learning: 65 },
      { date: "Apr 30", coding: 75, learning: 70 },
    ],
  },
  musician: {
    title: "Musician Dashboard",
    description: "Track your musical journey and creative development",
    icon: <Music className="h-6 w-6" />,
    recommendations: [
      { title: "Advanced Music Theory", type: "course", difficulty: "Intermediate" },
      { title: "Studio Recording Techniques", type: "course", difficulty: "Advanced" },
      { title: "Songwriting Workshop", type: "course", difficulty: "Beginner" },
      { title: "Collaborative EP Project", type: "project", difficulty: "Intermediate" },
      { title: "Music Business Essentials", type: "course", difficulty: "Beginner" },
    ],
    activities: [
      { title: "Practice sight reading", icon: <MusicNote className="h-4 w-4" /> },
      { title: "Record a cover song", icon: <Mic className="h-4 w-4" /> },
      { title: "Mix a multi-track recording", icon: <Headphones className="h-4 w-4" /> },
    ],
    skills: [
      { name: "Music Theory", level: 6, category: "Theory" },
      { name: "Performance", level: 7, category: "Practical" },
      { name: "Composition", level: 5, category: "Creative" },
      { name: "Production", level: 4, category: "Technical" },
      { name: "Ear Training", level: 6, category: "Practical" },
    ],
    projects: [
      { name: "Original EP", progress: 70, deadline: "1 month" },
      { name: "Live Performance Set", progress: 85, deadline: "2 weeks" },
      { name: "Collaborative Remix", progress: 40, deadline: "3 months" },
    ],
    events: [
      { name: "Songwriting Contest", date: "June 15-30, 2025" },
      { name: "Music Production Workshop", date: "July 8-10, 2025" },
      { name: "Open Mic Night", date: "May 25, 2025" },
    ],
    insights: [
      {
        title: "Musical Strengths",
        description: "You excel at performance and improvisation but could develop composition skills",
      },
      {
        title: "Learning Style",
        description: "You learn best through ear training and practical application",
      },
      {
        title: "Creativity",
        description: "Your peak creative hours are in the evening between 7pm-11pm",
      },
    ],
    chartData: [
      { date: "Apr 24", practice: 75, composition: 60 },
      { date: "Apr 25", practice: 80, composition: 55 },
      { date: "Apr 26", practice: 65, composition: 70 },
      { date: "Apr 27", practice: 70, composition: 75 },
      { date: "Apr 28", practice: 85, composition: 60 },
      { date: "Apr 29", practice: 75, composition: 80 },
      { date: "Apr 30", practice: 80, composition: 70 },
    ],
  },
  artist: {
    title: "Artist Dashboard",
    description: "Track your artistic journey and creative development",
    icon: <Palette className="h-6 w-6" />,
    recommendations: [
      { title: "Color Theory Masterclass", type: "course", difficulty: "Intermediate" },
      { title: "Digital Illustration Techniques", type: "course", difficulty: "Advanced" },
      { title: "Composition Fundamentals", type: "course", difficulty: "Beginner" },
      { title: "Character Design Project", type: "project", difficulty: "Intermediate" },
      { title: "Art Business for Freelancers", type: "course", difficulty: "Beginner" },
    ],
    activities: [
      { title: "Practice figure drawing", icon: <PenTool className="h-4 w-4" /> },
      { title: "Create a color study", icon: <Palette className="h-4 w-4" /> },
      { title: "Experiment with new medium", icon: <Brush className="h-4 w-4" /> },
    ],
    skills: [
      { name: "Drawing", level: 7, category: "Fundamental" },
      { name: "Color Theory", level: 5, category: "Theory" },
      { name: "Digital Art", level: 6, category: "Technical" },
      { name: "Composition", level: 4, category: "Theory" },
      { name: "Character Design", level: 6, category: "Specialized" },
    ],
    projects: [
      { name: "Digital Art Portfolio", progress: 75, deadline: "1 month" },
      { name: "Children's Book Illustrations", progress: 40, deadline: "3 months" },
      { name: "Character Design Series", progress: 60, deadline: "2 months" },
    ],
    events: [
      { name: "Digital Art Exhibition", date: "June 10-20, 2025" },
      { name: "Character Design Workshop", date: "July 15, 2025" },
      { name: "Art Portfolio Review", date: "May 28, 2025" },
    ],
    insights: [
      {
        title: "Artistic Strengths",
        description: "You excel at character design and linework but could develop color theory",
      },
      {
        title: "Learning Style",
        description: "You learn best through visual demonstrations and practice",
      },
      {
        title: "Creativity",
        description: "Your peak creative hours are in the morning between 8am-11am",
      },
    ],
    chartData: [
      { date: "Apr 24", practice: 70, creation: 65 },
      { date: "Apr 25", practice: 65, creation: 75 },
      { date: "Apr 26", practice: 80, creation: 60 },
      { date: "Apr 27", practice: 75, creation: 70 },
      { date: "Apr 28", practice: 60, creation: 85 },
      { date: "Apr 29", practice: 70, creation: 75 },
      { date: "Apr 30", practice: 75, creation: 80 },
    ],
  },
  researcher: {
    title: "Researcher Dashboard",
    description: "Track your research journey and analytical development",
    icon: <Brain className="h-6 w-6" />,
    recommendations: [
      { title: "Advanced Research Methods", type: "course", difficulty: "Advanced" },
      { title: "Data Analysis with R", type: "course", difficulty: "Intermediate" },
      { title: "Scientific Writing Workshop", type: "course", difficulty: "Intermediate" },
      { title: "Literature Review Project", type: "project", difficulty: "Advanced" },
      { title: "Research Ethics", type: "course", difficulty: "Beginner" },
    ],
    activities: [
      { title: "Analyze recent literature", icon: <BookOpen className="h-4 w-4" /> },
      { title: "Design an experiment", icon: <Layers className="h-4 w-4" /> },
      { title: "Practice statistical analysis", icon: <BarChart3 className="h-4 w-4" /> },
    ],
    skills: [
      { name: "Research Methods", level: 7, category: "Methodology" },
      { name: "Data Analysis", level: 6, category: "Technical" },
      { name: "Scientific Writing", level: 5, category: "Communication" },
      { name: "Critical Thinking", level: 7, category: "Cognitive" },
      { name: "Experimental Design", level: 6, category: "Methodology" },
    ],
    projects: [
      { name: "Research Paper", progress: 65, deadline: "2 months" },
      { name: "Data Analysis Project", progress: 80, deadline: "3 weeks" },
      { name: "Literature Review", progress: 50, deadline: "1 month" },
    ],
    events: [
      { name: "Research Symposium", date: "June 20-22, 2025" },
      { name: "Data Science Workshop", date: "July 10, 2025" },
      { name: "Academic Writing Seminar", date: "May 15, 2025" },
    ],
    insights: [
      {
        title: "Research Strengths",
        description: "You excel at critical analysis but could improve data visualization skills",
      },
      {
        title: "Learning Style",
        description: "You learn best through systematic study and practical application",
      },
      {
        title: "Productivity",
        description: "Your peak analytical hours are in the morning between 9am-1pm",
      },
    ],
    chartData: [
      { date: "Apr 24", research: 75, writing: 60 },
      { date: "Apr 25", research: 80, writing: 55 },
      { date: "Apr 26", research: 70, writing: 65 },
      { date: "Apr 27", research: 65, writing: 75 },
      { date: "Apr 28", research: 75, writing: 70 },
      { date: "Apr 29", research: 80, writing: 65 },
      { date: "Apr 30", research: 70, writing: 80 },
    ],
  },
  educator: {
    title: "Educator Dashboard",
    description: "Track your teaching journey and educational development",
    icon: <BookOpen className="h-6 w-6" />,
    recommendations: [
      { title: "Advanced Pedagogical Methods", type: "course", difficulty: "Advanced" },
      { title: "Educational Technology Integration", type: "course", difficulty: "Intermediate" },
      { title: "Inclusive Classroom Strategies", type: "course", difficulty: "Intermediate" },
      { title: "Curriculum Development Project", type: "project", difficulty: "Advanced" },
      { title: "Student Assessment Techniques", type: "course", difficulty: "Beginner" },
    ],
    activities: [
      { title: "Create engaging lesson plan", icon: <BookOpen className="h-4 w-4" /> },
      { title: "Design formative assessment", icon: <ClipboardCheck className="h-4 w-4" /> },
      { title: "Explore new teaching tool", icon: <Layers className="h-4 w-4" /> },
    ],
    skills: [
      { name: "Pedagogy", level: 7, category: "Methodology" },
      { name: "Curriculum Design", level: 6, category: "Planning" },
      { name: "Assessment", level: 5, category: "Evaluation" },
      { name: "Classroom Management", level: 6, category: "Practical" },
      { name: "Educational Technology", level: 4, category: "Technical" },
    ],
    projects: [
      { name: "Course Curriculum", progress: 75, deadline: "1 month" },
      { name: "Interactive Lesson Series", progress: 60, deadline: "2 weeks" },
      { name: "Student Assessment System", progress: 40, deadline: "2 months" },
    ],
    events: [
      { name: "Education Innovation Conference", date: "June 5-7, 2025" },
      { name: "Inclusive Teaching Workshop", date: "July 12, 2025" },
      { name: "EdTech Showcase", date: "May 20, 2025" },
    ],
    insights: [
      {
        title: "Teaching Strengths",
        description: "You excel at engaging presentation but could develop assessment techniques",
      },
      {
        title: "Teaching Style",
        description: "You're most effective with interactive, discussion-based approaches",
      },
      {
        title: "Productivity",
        description: "Your peak planning hours are in the evening between 6pm-9pm",
      },
    ],
    chartData: [
      { date: "Apr 24", teaching: 70, planning: 65 },
      { date: "Apr 25", teaching: 75, planning: 60 },
      { date: "Apr 26", teaching: 65, planning: 75 },
      { date: "Apr 27", teaching: 70, planning: 70 },
      { date: "Apr 28", teaching: 80, planning: 65 },
      { date: "Apr 29", teaching: 75, planning: 70 },
      { date: "Apr 30", teaching: 70, planning: 80 },
    ],
  },
  entrepreneur: {
    title: "Entrepreneur Dashboard",
    description: "Track your business journey and entrepreneurial development",
    icon: <Briefcase className="h-6 w-6" />,
    recommendations: [
      { title: "Lean Startup Methodology", type: "course", difficulty: "Intermediate" },
      { title: "Business Model Innovation", type: "course", difficulty: "Advanced" },
      { title: "Digital Marketing Strategy", type: "course", difficulty: "Intermediate" },
      { title: "Pitch Deck Development", type: "project", difficulty: "Beginner" },
      { title: "Financial Modeling for Startups", type: "course", difficulty: "Advanced" },
    ],
    activities: [
      { title: "Validate business idea", icon: <Target className="h-4 w-4" /> },
      { title: "Develop marketing strategy", icon: <LineChart className="h-4 w-4" /> },
      { title: "Practice pitch presentation", icon: <Presentation className="h-4 w-4" /> },
    ],
    skills: [
      { name: "Business Strategy", level: 6, category: "Planning" },
      { name: "Marketing", level: 5, category: "Growth" },
      { name: "Financial Management", level: 4, category: "Operations" },
      { name: "Leadership", level: 7, category: "People" },
      { name: "Product Development", level: 6, category: "Innovation" },
    ],
    projects: [
      { name: "Business Plan", progress: 85, deadline: "2 weeks" },
      { name: "Marketing Campaign", progress: 60, deadline: "1 month" },
      { name: "Investor Pitch Deck", progress: 70, deadline: "3 weeks" },
    ],
    events: [
      { name: "Startup Pitch Competition", date: "June 18, 2025" },
      { name: "Entrepreneurship Summit", date: "July 25-27, 2025" },
      { name: "Networking Mixer", date: "May 12, 2025" },
    ],
    insights: [
      {
        title: "Business Strengths",
        description: "You excel at vision and leadership but could develop financial analysis skills",
      },
      {
        title: "Working Style",
        description: "You're most effective when balancing strategic thinking with tactical execution",
      },
      {
        title: "Productivity",
        description: "Your peak strategic thinking hours are in the morning between 8am-11am",
      },
    ],
    chartData: [
      { date: "Apr 24", strategy: 75, execution: 60 },
      { date: "Apr 25", strategy: 70, execution: 65 },
      { date: "Apr 26", strategy: 65, execution: 75 },
      { date: "Apr 27", strategy: 70, execution: 70 },
      { date: "Apr 28", strategy: 80, execution: 65 },
      { date: "Apr 29", strategy: 75, execution: 70 },
      { date: "Apr 30", strategy: 70, execution: 80 },
    ],
  },
}

// Interest-based content recommendations
const interestRecommendations = {
  tech: [
    { title: "Introduction to Machine Learning", type: "course", difficulty: "Intermediate" },
    { title: "Web Development Bootcamp", type: "course", difficulty: "Beginner" },
    { title: "Data Structures & Algorithms", type: "course", difficulty: "Advanced" },
    { title: "Build a Full-Stack App", type: "project", difficulty: "Intermediate" },
    { title: "Introduction to Cybersecurity", type: "course", difficulty: "Beginner" },
  ],
  creative: [
    { title: "Digital Illustration Fundamentals", type: "course", difficulty: "Beginner" },
    { title: "Music Production Essentials", type: "course", difficulty: "Beginner" },
    { title: "Advanced UI/UX Design", type: "course", difficulty: "Intermediate" },
    { title: "Create a Digital Portfolio", type: "project", difficulty: "Beginner" },
    { title: "Animation Principles", type: "course", difficulty: "Intermediate" },
  ],
  business: [
    { title: "Entrepreneurship Basics", type: "course", difficulty: "Beginner" },
    { title: "Digital Marketing Strategy", type: "course", difficulty: "Intermediate" },
    { title: "Financial Planning for Startups", type: "course", difficulty: "Intermediate" },
    { title: "Create a Business Plan", type: "project", difficulty: "Beginner" },
    { title: "Leadership & Management", type: "course", difficulty: "Intermediate" },
  ],
  education: [
    { title: "Effective Teaching Methods", type: "course", difficulty: "Intermediate" },
    { title: "Curriculum Development", type: "course", difficulty: "Advanced" },
    { title: "Educational Psychology", type: "course", difficulty: "Intermediate" },
    { title: "Design a Learning Module", type: "project", difficulty: "Intermediate" },
    { title: "Assessment Strategies", type: "course", difficulty: "Intermediate" },
  ],
  health: [
    { title: "Nutrition Fundamentals", type: "course", difficulty: "Beginner" },
    { title: "Mental Health First Aid", type: "course", difficulty: "Beginner" },
    { title: "Exercise Science", type: "course", difficulty: "Intermediate" },
    { title: "Create a Wellness Plan", type: "project", difficulty: "Beginner" },
    { title: "Healthcare Ethics", type: "course", difficulty: "Intermediate" },
  ],
  impact: [
    { title: "Sustainable Development", type: "course", difficulty: "Intermediate" },
    { title: "Community Organizing", type: "course", difficulty: "Beginner" },
    { title: "Social Entrepreneurship", type: "course", difficulty: "Intermediate" },
    { title: "Design a Community Project", type: "project", difficulty: "Intermediate" },
    { title: "Environmental Justice", type: "course", difficulty: "Intermediate" },
  ],
}

// Mood-based activity suggestions
const moodActivities = {
  happy: [
    { title: "Take on a challenging project", icon: <Rocket className="h-4 w-4" /> },
    { title: "Mentor a peer", icon: <Users className="h-4 w-4" /> },
    { title: "Set ambitious goals", icon: <Star className="h-4 w-4" /> },
  ],
  sad: [
    { title: "Try a mindfulness exercise", icon: <Brain className="h-4 w-4" /> },
    { title: "Connect with a friend", icon: <MessageSquare className="h-4 w-4" /> },
    { title: "Work on something creative", icon: <Palette className="h-4 w-4" /> },
  ],
  focused: [
    { title: "Deep dive into a complex topic", icon: <BookOpen className="h-4 w-4" /> },
    { title: "Work on your priority task", icon: <Zap className="h-4 w-4" /> },
    { title: "Document your insights", icon: <Lightbulb className="h-4 w-4" /> },
  ],
  tired: [
    { title: "Review and organize notes", icon: <BookOpen className="h-4 w-4" /> },
    { title: "Watch an educational video", icon: <Rocket className="h-4 w-4" /> },
    { title: "Set up for tomorrow", icon: <Calendar className="h-4 w-4" /> },
  ],
  anxious: [
    { title: "Break down a big task into steps", icon: <Lightbulb className="h-4 w-4" /> },
    { title: "Try a breathing exercise", icon: <Brain className="h-4 w-4" /> },
    { title: "Organize your workspace", icon: <Briefcase className="h-4 w-4" /> },
  ],
  neutral: [
    { title: "Explore a new topic", icon: <Sparkles className="h-4 w-4" /> },
    { title: "Review your goals", icon: <BarChart3 className="h-4 w-4" /> },
    { title: "Connect with peers", icon: <Users className="h-4 w-4" /> },
  ],
}

// Interest icons
const interestIcons = {
  tech: <Code className="h-5 w-5" />,
  creative: <Palette className="h-5 w-5" />,
  business: <Briefcase className="h-5 w-5" />,
  education: <BookOpen className="h-5 w-5" />,
  health: <HeartPulse className="h-5 w-5" />,
  impact: <Sparkles className="h-5 w-5" />,
}

// Notifications
const notifications = [
  {
    id: 1,
    title: "New Course Available",
    description: "Introduction to Machine Learning is now available",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "Team Invitation",
    description: "You've been invited to join the Web Development team",
    time: "1 day ago",
    read: false,
  },
  {
    id: 3,
    title: "Achievement Unlocked",
    description: "You've earned the 'First Steps' achievement",
    time: "3 days ago",
    read: true,
  },
  {
    id: 4,
    title: "Mentor Session Scheduled",
    description: "Your session with Alex Chen is confirmed for tomorrow at 3pm",
    time: "4 hours ago",
    read: false,
  },
  {
    id: 5,
    title: "Project Deadline Approaching",
    description: "Your 'Portfolio Website' project is due in 3 days",
    time: "12 hours ago",
    read: false,
  },
]

// Function to get career-specific content
const getCareerContent = (careerType) => {
  return careerContent[careerType] || careerContent.developer
}

// Remove the duplicate definitions that appear later in the file

export default function DashboardPage() {
  const [showInterestSelector, setShowInterestSelector] = useState(false)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(notifications.filter((n) => !n.read).length)
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [careerType, setCareerType] = useState("developer")
  const [careerData, setCareerData] = useState(careerContent.developer)
  const { user } = useAuth()
  const { currentEmotion } = useEmotion()
  const router = useRouter()
  const searchParams = useSearchParams()
  const chartRef = useRef(null)

  // Simulate loading and progress
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 5
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [])

  // Check if user has selected interests and get career from URL
  useEffect(() => {
    if (!loading && user && (!user.interests || user.interests.length === 0)) {
      setShowInterestSelector(true)
    }

    // Get career from URL or localStorage
    const careerFromUrl = searchParams.get("career")
    const careerFromStorage = localStorage.getItem("selectedCareer")

    if (careerFromUrl && Object.keys(careerContent).includes(careerFromUrl)) {
      setCareerType(careerFromUrl)
      setCareerData(getCareerContent(careerFromUrl))
    } else if (careerFromStorage && Object.keys(careerContent).includes(careerFromStorage)) {
      setCareerType(careerFromStorage)
      setCareerData(getCareerContent(careerFromStorage))
    }
  }, [loading, user, searchParams])

  // Get primary interest
  const getPrimaryInterest = () => {
    if (user?.interests && user.interests.length > 0) {
      return user.interests[0]
    }
    return "tech" // Default
  }

  // Get recommendations based on primary interest
  const getRecommendations = () => {
    const primaryInterest = getPrimaryInterest()
    return interestRecommendations[primaryInterest] || interestRecommendations.tech
  }

  // Get activities based on mood
  const getActivities = () => {
    return moodActivities[currentEmotion || "neutral"] || moodActivities.neutral
  }

  // Get interest icon
  const getInterestIcon = () => {
    const primaryInterest = getPrimaryInterest()
    return interestIcons[primaryInterest] || interestIcons.tech
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setUnreadNotifications(0)
  }

  // Handle project click
  const handleProjectClick = (project) => {
    setSelectedProject(project)
  }

  // Handle skill click
  const handleSkillClick = (skill) => {
    setSelectedSkill(skill)
  }

  // Handle event click
  const handleEventClick = (event) => {
    setSelectedEvent(event)
  }

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 rounded-full border-4 border-primary/30"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-4 text-muted-foreground">Loading your personalized dashboard...</p>
        <div className="w-64 mt-4">
          <Progress value={progress} className="h-1" />
        </div>
      </div>
    )
  }

  if (showInterestSelector) {
    return (
      <div className="min-h-screen flex flex-col">
        <ResponsiveNavbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <InterestSelector onComplete={() => setShowInterestSelector(false)} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ResponsiveNavbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <AnimatePresence>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Top Bar with Notifications */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold gradient-text">{careerData.title || "Dashboard"}</h1>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <Bell className="h-5 w-5" />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                        {unreadNotifications}
                      </span>
                    )}
                  </Button>

                  {showNotifications && (
                    <Card className="absolute right-0 mt-2 w-80 z-50 border-2 border-primary/20">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">Notifications</CardTitle>
                          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                            Mark all as read
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="max-h-[300px] overflow-y-auto">
                        <div className="space-y-2">
                          {notifications.length > 0 ? (
                            notifications.map((notification) => (
                              <div
                                key={notification.id}
                                className={`p-3 rounded-lg border ${
                                  !notification.read ? "bg-primary/5 border-primary/30" : ""
                                }`}
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-medium text-sm">{notification.title}</h4>
                                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                                  </div>
                                  {!notification.read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-center text-sm text-muted-foreground py-4">No notifications</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <Button variant="outline" size="sm" className="hidden md:flex">
                  <Trophy className="mr-2 h-4 w-4" />
                  <span>Level {user?.level || 1}</span>
                </Button>
              </div>
            </div>

            {/* Welcome Section */}
            <section className="mb-8">
              <Card className="border-2 border-primary/20 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || "Student"}!</h1>
                      <p className="text-muted-foreground">
                        {currentEmotion === "happy" &&
                          "You're radiating positive energy today! Let's channel that into something amazing."}
                        {currentEmotion === "sad" &&
                          "Even on challenging days, small steps forward matter. What's one thing you'd like to accomplish today?"}
                        {currentEmotion === "focused" &&
                          "You're in a great flow state! This is perfect for deep work on complex problems."}
                        {currentEmotion === "tired" &&
                          "It's okay to pace yourself today. Even small progress is still progress."}
                        {currentEmotion === "anxious" &&
                          "Taking things one step at a time can help manage overwhelm. What's your priority today?"}
                        {(!currentEmotion || currentEmotion === "neutral") &&
                          "Today is full of possibilities. What would you like to focus on?"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-muted-foreground">Weekly Progress</p>
                        <p className="text-2xl font-bold">67%</p>
                      </div>
                      <div className="h-16 w-16 overflow-hidden rounded-full border-4 border-primary/30 bg-primary/10 p-1">
                        <div className="h-full w-full rounded-full bg-background">
                          <Progress value={67} className="h-full w-full rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Main Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 lg:w-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="learning">Learning Paths</TabsTrigger>
                <TabsTrigger value="games">Interactive Games</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Recommendations Column */}
                  <div className="md:col-span-2 space-y-6">
                    <Card className="border-2 border-primary/20">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          {careerData.icon || getInterestIcon()}
                          <span className="ml-2">Recommended for You</span>
                        </CardTitle>
                        <CardDescription>Personalized content based on your career and interests</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {careerData.recommendations.slice(0, 4).map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="border rounded-lg p-4 hover:border-primary/30 transition-colors"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-medium">{item.title}</h3>
                                <Badge variant="outline">{item.type}</Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <Badge variant="secondary">{item.difficulty}</Badge>
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                  <ArrowRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          View All Recommendations
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="border-2 border-primary/20">
                      <CardHeader>
                        <CardTitle>Your Learning Journey</CardTitle>
                        <CardDescription>Track your progress and upcoming milestones</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Tabs defaultValue="projects">
                          <TabsList className="mb-4">
                            <TabsTrigger value="projects">Projects</TabsTrigger>
                            <TabsTrigger value="skills">Skills</TabsTrigger>
                            <TabsTrigger value="events">Events</TabsTrigger>
                          </TabsList>

                          <TabsContent value="projects">
                            <div className="space-y-4">
                              {careerData.projects.map((project, index) => (
                                <div
                                  key={index}
                                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-primary/30 ${
                                    selectedProject?.name === project.name ? "border-primary bg-primary/5" : ""
                                  }`}
                                  onClick={() => handleProjectClick(project)}
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-medium">{project.name}</h3>
                                    <Badge>In Progress</Badge>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span>Progress</span>
                                      <span>{project.progress}%</span>
                                    </div>
                                    <Progress value={project.progress} className="h-2" />
                                  </div>

                                  <AnimatePresence>
                                    {selectedProject?.name === project.name && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                      >
                                        <div className="mt-4 pt-4 border-t">
                                          <div className="flex justify-between items-center">
                                            <p className="text-sm text-muted-foreground">Due in: {project.deadline}</p>
                                            <Button size="sm">Continue</Button>
                                          </div>
                                          <div className="mt-3 grid grid-cols-2 gap-2">
                                            <div className="text-sm">
                                              <span className="font-medium">Last activity:</span> 2 days ago
                                            </div>
                                            <div className="text-sm">
                                              <span className="font-medium">Collaborators:</span> 2
                                            </div>
                                            <div className="text-sm">
                                              <span className="font-medium">Priority:</span> High
                                            </div>
                                            <div className="text-sm">
                                              <span className="font-medium">Status:</span> On track
                                            </div>
                                          </div>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ))}
                            </div>
                          </TabsContent>

                          <TabsContent value="skills">
                            <div className="space-y-4">
                              {careerData.skills.map((skill, index) => (
                                <div
                                  key={index}
                                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-primary/30 ${
                                    selectedSkill?.name === skill.name ? "border-primary bg-primary/5" : ""
                                  }`}
                                  onClick={() => handleSkillClick(skill)}
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-medium">{skill.name}</h3>
                                    <Badge variant="outline">{skill.category}</Badge>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span>Proficiency</span>
                                      <span>{skill.level}/10</span>
                                    </div>
                                    <Progress value={skill.level * 10} className="h-2" />
                                  </div>

                                  <AnimatePresence>
                                    {selectedSkill?.name === skill.name && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                      >
                                        <div className="mt-4 pt-4 border-t">
                                          <div className="flex justify-between items-center mb-3">
                                            <p className="text-sm text-muted-foreground">Last practiced: 3 days ago</p>
                                            <Button size="sm">Practice Now</Button>
                                          </div>
                                          <div className="grid grid-cols-2 gap-2">
                                            <div className="bg-muted p-2 rounded-md text-center">
                                              <p className="text-xs text-muted-foreground">Next Level</p>
                                              <p className="font-medium">{skill.level + 1}/10</p>
                                            </div>
                                            <div className="bg-muted p-2 rounded-md text-center">
                                              <p className="text-xs text-muted-foreground">XP Needed</p>
                                              <p className="font-medium">{(10 - skill.level) * 100} XP</p>
                                            </div>
                                          </div>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ))}
                            </div>
                          </TabsContent>

                          <TabsContent value="events">
                            <div className="space-y-4">
                              {careerData.events.map((event, index) => (
                                <div
                                  key={index}
                                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-primary/30 ${
                                    selectedEvent?.name === event.name ? "border-primary bg-primary/5" : ""
                                  }`}
                                  onClick={() => handleEventClick(event)}
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-medium">{event.name}</h3>
                                    <Badge variant="secondary">{event.date}</Badge>
                                  </div>

                                  <AnimatePresence>
                                    {selectedEvent?.name === event.name && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                      >
                                        <div className="mt-4 pt-4 border-t">
                                          <div className="flex justify-between items-center mb-3">
                                            <p className="text-sm text-muted-foreground">Location: Virtual</p>
                                            <Button size="sm">Register</Button>
                                          </div>
                                          <p className="text-sm">
                                            Join this event to connect with peers, learn from experts, and expand your
                                            network in the field.
                                          </p>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ))}
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Sidebar Column */}
                  <div className="space-y-6">
                    <Card className="border-2 border-primary/20">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Brain className="h-5 w-5 mr-2 text-primary" />
                          Mood-Based Activities
                        </CardTitle>
                        <CardDescription>Suggested activities based on your current mood</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {getActivities().map((activity, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="flex items-center p-3 rounded-lg border hover:border-primary/30 transition-colors"
                            >
                              <div className="p-2 rounded-full bg-primary/10 mr-3">{activity.icon}</div>
                              <span>{activity.title}</span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-primary/20">
                      <CardHeader>
                        <CardTitle>Quick Links</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" className="justify-start" asChild>
                            <Link href="/skills">
                              <Brain className="h-4 w-4 mr-2" />
                              Skills
                            </Link>
                          </Button>
                          <Button variant="outline" className="justify-start" asChild>
                            <Link href="/journal">
                              <BookOpen className="h-4 w-4 mr-2" />
                              Journal
                            </Link>
                          </Button>
                          <Button variant="outline" className="justify-start" asChild>
                            <Link href="/teams">
                              <Users className="h-4 w-4 mr-2" />
                              Teams
                            </Link>
                          </Button>
                          <Button variant="outline" className="justify-start" asChild>
                            <Link href="/mentors">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Mentors
                            </Link>
                          </Button>
                          <Button variant="outline" className="justify-start" asChild>
                            <Link href="/career-simulator">
                              <Rocket className="h-4 w-4 mr-2" />
                              Careers
                            </Link>
                          </Button>
                          <Button variant="outline" className="justify-start" asChild>
                            <Link href="/missions">
                              <Zap className="h-4 w-4 mr-2" />
                              Missions
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-primary/20">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Calendar className="h-5 w-5 mr-2 text-primary" />
                          Upcoming Events
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {careerData.events.slice(0, 2).map((event, index) => (
                            <div key={index} className="border rounded-lg p-3">
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium">{event.name}</h3>
                                <Badge variant="outline">{event.date}</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          View Calendar
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Learning Paths Tab */}
              <TabsContent value="learning">
                <PersonalizedLearningPath />
              </TabsContent>

              {/* Interactive Games Tab */}
              <TabsContent value="games">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Interactive Learning Games</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InteractiveLearningGame gameType="quiz" onComplete={() => {}} />
                    <InteractiveLearningGame gameType="memory" onComplete={() => {}} />
                    <InteractiveLearningGame gameType="coding" onComplete={() => {}} />
                  </div>
                </div>
              </TabsContent>

              {/* Insights Tab */}
              <TabsContent value="insights">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Learning Insights</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-2 border-primary/20">
                      <CardHeader>
                        <CardTitle>Activity Trends</CardTitle>
                        <CardDescription>Your learning patterns over time</CardDescription>
                      </CardHeader>
                      <CardContent className="h-80">
                        <div className="h-full w-full" ref={chartRef}>
                          {/* Chart would be rendered here with actual data */}
                          <div className="h-full flex items-center justify-center">
                            <div className="text-center">
                              <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                              <p className="text-muted-foreground">
                                Activity chart showing your{" "}
                                {careerType === "developer"
                                  ? "coding"
                                  : careerType === "musician"
                                    ? "practice"
                                    : "learning"}{" "}
                                patterns
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-primary/20">
                      <CardHeader>
                        <CardTitle>Skill Development</CardTitle>
                        <CardDescription>Your progress across different skill areas</CardDescription>
                      </CardHeader>
                      <CardContent className="h-80">
                        <div className="h-full flex flex-col justify-center">
                          <div className="space-y-4">
                            {careerData.skills.map((skill, index) => (
                              <div key={index} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>{skill.name}</span>
                                  <span>{skill.level}/10</span>
                                </div>
                                <Progress value={skill.level * 10} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-primary/20 md:col-span-2">
                      <CardHeader>
                        <CardTitle>AI-Powered Recommendations</CardTitle>
                        <CardDescription>Personalized suggestions based on your learning patterns</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {careerData.insights.map((insight, index) => (
                            <div key={index} className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                              <h3 className="font-medium mb-2 flex items-center">
                                <Lightbulb className="h-4 w-4 mr-2 text-primary" />
                                {insight.title}
                              </h3>
                              <p className="text-sm">{insight.description}</p>
                            </div>
                          ))}

                          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                            <h3 className="font-medium mb-2 flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-primary" />
                              Optimal Learning Times
                            </h3>
                            <p className="text-sm">
                              Based on your activity patterns, you're most productive in the morning. Consider
                              scheduling challenging learning tasks during this time for better results.
                            </p>
                          </div>

                          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                            <h3 className="font-medium mb-2 flex items-center">
                              <Target className="h-4 w-4 mr-2 text-primary" />
                              Recommended Focus Areas
                            </h3>
                            <p className="text-sm">
                              To achieve your career goals faster, we recommend focusing on{" "}
                              {careerType === "developer"
                                ? "backend development and database skills"
                                : careerType === "musician"
                                  ? "composition and music theory"
                                  : "advanced techniques in your field"}{" "}
                              in the coming weeks.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </AnimatePresence>
      </main>

      <MoodDetector />
      <AIChatbot />
      <VoiceInteraction />
      <AchievementSystem />
    </div>
  )
}
