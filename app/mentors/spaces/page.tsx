"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Brain, Calendar, Clock, Code, Laptop, Plus, Search, Users } from "lucide-react"

// Sample learning spaces data
const learningSpaces = [
  {
    id: "space-1",
    name: "React Mastery Circle",
    description: "Deep dive into advanced React patterns and performance optimization",
    category: "technical",
    mentors: [
      {
        id: "mentor-1",
        name: "CodeMaster",
        avatar: "/placeholder.svg?height=50&width=50",
        specialization: "React Expert",
      },
      {
        id: "mentor-2",
        name: "PerformanceGuru",
        avatar: "/placeholder.svg?height=50&width=50",
        specialization: "Frontend Optimization",
      },
    ],
    participants: 24,
    nextSession: "Tomorrow, 7:00 PM",
    topics: ["Component Patterns", "State Management", "Performance", "Testing"],
    format: "Weekly live sessions with projects",
    level: "Intermediate to Advanced",
    image: "/placeholder.svg?height=200&width=350",
  },
  {
    id: "space-2",
    name: "Career Transition Workshop",
    description: "Strategic guidance for transitioning into tech roles from other fields",
    category: "career",
    mentors: [
      {
        id: "mentor-3",
        name: "CareerNavigator",
        avatar: "/placeholder.svg?height=50&width=50",
        specialization: "Career Strategy",
      },
    ],
    participants: 42,
    nextSession: "Thursday, 6:30 PM",
    topics: ["Resume Building", "Interview Prep", "Portfolio Development", "Networking"],
    format: "Biweekly sessions with 1:1 follow-ups",
    level: "All Levels",
    image: "/placeholder.svg?height=200&width=350",
  },
  {
    id: "space-3",
    name: "Tech Leadership Circle",
    description: "Developing emotional intelligence and leadership skills for tech leads",
    category: "emotional",
    mentors: [
      {
        id: "mentor-4",
        name: "LeadershipCoach",
        avatar: "/placeholder.svg?height=50&width=50",
        specialization: "Tech Leadership",
      },
      {
        id: "mentor-5",
        name: "TeamDynamics",
        avatar: "/placeholder.svg?height=50&width=50",
        specialization: "Team Psychology",
      },
    ],
    participants: 18,
    nextSession: "Monday, 5:00 PM",
    topics: ["Emotional Intelligence", "Team Management", "Conflict Resolution", "Communication"],
    format: "Monthly workshops with weekly check-ins",
    level: "Intermediate to Advanced",
    image: "/placeholder.svg?height=200&width=350",
  },
  {
    id: "space-4",
    name: "Full-Stack Project Incubator",
    description: "Build a complete full-stack application with mentor guidance",
    category: "technical",
    mentors: [
      {
        id: "mentor-6",
        name: "FullStackMaster",
        avatar: "/placeholder.svg?height=50&width=50",
        specialization: "Full-Stack Development",
      },
    ],
    participants: 15,
    nextSession: "Saturday, 10:00 AM",
    topics: ["Project Planning", "Frontend", "Backend", "Database", "Deployment"],
    format: "Weekly coding sessions with code reviews",
    level: "Intermediate",
    image: "/placeholder.svg?height=200&width=350",
  },
  {
    id: "space-5",
    name: "Learning Optimization Lab",
    description: "Techniques to accelerate your learning and knowledge retention",
    category: "learning",
    mentors: [
      {
        id: "mentor-7",
        name: "LearningArchitect",
        avatar: "/placeholder.svg?height=50&width=50",
        specialization: "Learning Optimization",
      },
      {
        id: "mentor-8",
        name: "MemoryCoach",
        avatar: "/placeholder.svg?height=50&width=50",
        specialization: "Knowledge Retention",
      },
    ],
    participants: 32,
    nextSession: "Wednesday, 7:30 PM",
    topics: ["Learning Strategies", "Memory Techniques", "Focus Methods", "Knowledge Management"],
    format: "Biweekly workshops with practice exercises",
    level: "All Levels",
    image: "/placeholder.svg?height=200&width=350",
  },
]

// Sample upcoming sessions
const upcomingSessions = [
  {
    id: "session-1",
    spaceName: "React Mastery Circle",
    title: "Advanced Component Composition",
    date: "May 10, 2025",
    time: "7:00 PM - 8:30 PM",
    mentors: [
      {
        id: "mentor-1",
        name: "CodeMaster",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
    participants: 18,
    description: "Learn advanced techniques for component composition and reusability in React applications.",
  },
  {
    id: "session-2",
    spaceName: "Career Transition Workshop",
    title: "Technical Interview Preparation",
    date: "May 12, 2025",
    time: "6:30 PM - 8:00 PM",
    mentors: [
      {
        id: "mentor-3",
        name: "CareerNavigator",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
    participants: 24,
    description:
      "Strategies and practice for technical interviews, including coding challenges and system design questions.",
  },
  {
    id: "session-3",
    spaceName: "Learning Optimization Lab",
    title: "Spaced Repetition Systems",
    date: "May 13, 2025",
    time: "7:30 PM - 9:00 PM",
    mentors: [
      {
        id: "mentor-7",
        name: "LearningArchitect",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
    participants: 15,
    description: "How to implement spaced repetition systems to maximize knowledge retention and minimize forgetting.",
  },
]

export default function LearningSpacesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  // Filter spaces based on active tab and search query
  const filteredSpaces = learningSpaces.filter((space) => {
    const matchesCategory = activeTab === "all" || space.category === activeTab
    const matchesSearch =
      space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Learning Spaces</h1>
              <p className="text-muted-foreground">Collaborative learning environments guided by AI mentors</p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Create Space</span>
            </Button>
          </div>

          {/* Search and filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search learning spaces..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-5 w-full md:w-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="technical" className="flex items-center gap-1">
                  <Code className="h-3 w-3" />
                  <span className="hidden sm:inline">Technical</span>
                </TabsTrigger>
                <TabsTrigger value="career" className="flex items-center gap-1">
                  <Laptop className="h-3 w-3" />
                  <span className="hidden sm:inline">Career</span>
                </TabsTrigger>
                <TabsTrigger value="emotional" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span className="hidden sm:inline">Leadership</span>
                </TabsTrigger>
                <TabsTrigger value="learning" className="flex items-center gap-1">
                  <Brain className="h-3 w-3" />
                  <span className="hidden sm:inline">Learning</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Learning spaces grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpaces.map((space) => (
              <motion.div
                key={space.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-48">
                    <Image src={space.image || "/placeholder.svg"} alt={space.name} fill className="object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant="secondary"
                        className={`
                          ${space.category === "technical" ? "bg-blue-500/10 text-blue-500" : ""}
                          ${space.category === "career" ? "bg-amber-500/10 text-amber-500" : ""}
                          ${space.category === "emotional" ? "bg-purple-500/10 text-purple-500" : ""}
                          ${space.category === "learning" ? "bg-green-500/10 text-green-500" : ""}
                        `}
                      >
                        {space.category === "technical" && <Code className="h-3 w-3 mr-1" />}
                        {space.category === "career" && <Laptop className="h-3 w-3 mr-1" />}
                        {space.category === "emotional" && <Users className="h-3 w-3 mr-1" />}
                        {space.category === "learning" && <Brain className="h-3 w-3 mr-1" />}
                        <span>{space.category.charAt(0).toUpperCase() + space.category.slice(1)}</span>
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>{space.name}</CardTitle>
                    <CardDescription>{space.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{space.nextSession}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{space.participants} participants</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Mentors</h4>
                      <div className="flex -space-x-2">
                        {space.mentors.map((mentor) => (
                          <Avatar key={mentor.id} className="border-2 border-background h-8 w-8">
                            <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                            <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Topics</h4>
                      <div className="flex flex-wrap gap-1">
                        {space.topics.map((topic) => (
                          <Badge key={topic} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/mentors/spaces/${space.id}`}>Join Space</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Upcoming sessions */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Upcoming Sessions</h2>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <Card key={session.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-64 space-y-2">
                        <Badge variant="outline" className="mb-2">
                          {session.spaceName}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{session.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{session.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{session.participants} participants</span>
                        </div>
                      </div>

                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold">{session.title}</h3>
                          <p className="text-muted-foreground">{session.description}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Led by</h4>
                          <div className="flex items-center gap-2">
                            {session.mentors.map((mentor) => (
                              <div key={mentor.id} className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                                  <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{mentor.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 justify-center md:w-48">
                        <Button>Register</Button>
                        <Button variant="outline">Add to Calendar</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Create space dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create a Learning Space</DialogTitle>
            <DialogDescription>
              Create a collaborative learning environment with AI mentors and other learners.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Space Name
              </label>
              <Input id="name" placeholder="Enter a name for your learning space" />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Input id="description" placeholder="Describe what learners will gain from this space" />
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <select
                id="category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a category</option>
                <option value="technical">Technical Skills</option>
                <option value="career">Career Development</option>
                <option value="emotional">Leadership & Emotional Intelligence</option>
                <option value="learning">Learning Optimization</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="format" className="text-sm font-medium">
                Learning Format
              </label>
              <select
                id="format"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a format</option>
                <option value="weekly">Weekly live sessions</option>
                <option value="biweekly">Biweekly workshops</option>
                <option value="project">Project-based collaboration</option>
                <option value="self-paced">Self-paced with mentor support</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Select AI Mentors</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="mentor-1" className="rounded border-gray-300" />
                  <label htmlFor="mentor-1" className="text-sm">
                    CodeMaster (Technical)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="mentor-3" className="rounded border-gray-300" />
                  <label htmlFor="mentor-3" className="text-sm">
                    CareerNavigator (Career)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="mentor-4" className="rounded border-gray-300" />
                  <label htmlFor="mentor-4" className="text-sm">
                    LeadershipCoach (Leadership)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="mentor-7" className="rounded border-gray-300" />
                  <label htmlFor="mentor-7" className="text-sm">
                    LearningArchitect (Learning)
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowCreateDialog(false)}>Create Space</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
