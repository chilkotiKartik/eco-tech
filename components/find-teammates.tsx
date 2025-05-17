"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Users,
  Star,
  MessageSquare,
  Code,
  Palette,
  PieChart,
  Lightbulb,
  Zap,
  BookOpen,
  Sparkles,
} from "lucide-react"

// Sample data for teammates
const sampleTeammates = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["React", "Node.js", "UI/UX"],
    interests: ["Web Development", "AI", "Mobile Apps"],
    availability: "Evenings & Weekends",
    compatibilityScore: 92,
    bio: "Full-stack developer passionate about creating intuitive user experiences and solving complex problems.",
    recentProjects: ["E-commerce Platform", "AI Chatbot"],
    lookingFor: ["Frontend Developers", "UI/UX Designers", "Project Managers"],
  },
  {
    id: "2",
    name: "Jamie Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Python", "Data Science", "Machine Learning"],
    interests: ["AI", "Data Visualization", "Research"],
    availability: "Weekdays",
    compatibilityScore: 85,
    bio: "Data scientist with a background in research and a passion for turning data into actionable insights.",
    recentProjects: ["Predictive Analytics Tool", "Data Visualization Dashboard"],
    lookingFor: ["Data Engineers", "Frontend Developers", "Domain Experts"],
  },
  {
    id: "3",
    name: "Taylor Wong",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["UI/UX Design", "Figma", "User Research"],
    interests: ["Design Systems", "Accessibility", "Mobile Design"],
    availability: "Flexible",
    compatibilityScore: 78,
    bio: "Designer focused on creating accessible and beautiful user interfaces that solve real problems.",
    recentProjects: ["Design System", "Mobile App Redesign"],
    lookingFor: ["Frontend Developers", "Product Managers", "Other Designers"],
  },
  {
    id: "4",
    name: "Jordan Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Product Management", "Agile", "Market Research"],
    interests: ["EdTech", "Productivity Tools", "SaaS"],
    availability: "Weekday Evenings",
    compatibilityScore: 88,
    bio: "Product manager with experience in EdTech and a passion for building tools that help people learn and grow.",
    recentProjects: ["Learning Management System", "Productivity App"],
    lookingFor: ["Developers", "Designers", "Content Creators"],
  },
  {
    id: "5",
    name: "Riley Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Mobile Development", "Swift", "Kotlin"],
    interests: ["AR/VR", "Mobile Games", "Health Tech"],
    availability: "Weekends",
    compatibilityScore: 82,
    bio: "Mobile developer specializing in AR experiences and health applications.",
    recentProjects: ["AR Fitness App", "Health Tracking Tool"],
    lookingFor: ["Backend Developers", "3D Artists", "Health Experts"],
  },
  {
    id: "6",
    name: "Casey Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Content Creation", "Video Editing", "Social Media"],
    interests: ["Educational Content", "Storytelling", "Digital Marketing"],
    availability: "Flexible",
    compatibilityScore: 75,
    bio: "Content creator focused on educational videos and engaging storytelling.",
    recentProjects: ["Educational YouTube Series", "Social Media Campaign"],
    lookingFor: ["Designers", "Subject Matter Experts", "Marketers"],
  },
]

// Skill categories with icons
const skillIcons = {
  "Web Development": <Code className="h-4 w-4" />,
  "Data Science": <PieChart className="h-4 w-4" />,
  "UI/UX Design": <Palette className="h-4 w-4" />,
  "Product Management": <Lightbulb className="h-4 w-4" />,
  "Mobile Development": <Zap className="h-4 w-4" />,
  "Content Creation": <BookOpen className="h-4 w-4" />,
  Other: <Sparkles className="h-4 w-4" />,
}

// Availability options
const availabilityOptions = ["Any Availability", "Weekdays", "Weekends", "Evenings", "Flexible"]

// Skill categories
const skillCategories = [
  "All Skills",
  "Web Development",
  "Data Science",
  "UI/UX Design",
  "Product Management",
  "Mobile Development",
  "Content Creation",
]

type TeammateCardProps = {
  teammate: (typeof sampleTeammates)[0]
  onConnect: (id: string) => void
}

const TeammateCard = ({ teammate, onConnect }: TeammateCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full border-2 border-primary/10 transition-all hover:border-primary/30 card-hover">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={teammate.avatar || "/placeholder.svg"} alt={teammate.name} />
                <AvatarFallback>{teammate.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{teammate.name}</CardTitle>
                <CardDescription className="line-clamp-1">{teammate.bio.substring(0, 60)}...</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="flex items-center gap-1 bg-primary/5">
              <Star className="h-3 w-3 fill-primary text-primary" />
              {teammate.compatibilityScore}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Skills</p>
              <div className="flex flex-wrap gap-1">
                {teammate.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Interests</p>
              <div className="flex flex-wrap gap-1">
                {teammate.interests.map((interest) => (
                  <Badge key={interest} variant="outline" className="text-xs bg-accent/5">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Availability</p>
              <Badge variant="outline" className="text-xs bg-secondary/5">
                {teammate.availability}
              </Badge>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Compatibility</p>
              <div className="space-y-1">
                <Progress value={teammate.compatibilityScore} className="h-2" />
                <p className="text-xs text-muted-foreground">Based on skills, interests, and availability</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <MessageSquare className="mr-1 h-4 w-4" />
              Message
            </Button>
            <Button size="sm" className="flex-1" onClick={() => onConnect(teammate.id)}>
              <Users className="mr-1 h-4 w-4" />
              Connect
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export function FindTeammates() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkill, setSelectedSkill] = useState("All Skills")
  const [selectedAvailability, setSelectedAvailability] = useState("Any Availability")
  const [filteredTeammates, setFilteredTeammates] = useState(sampleTeammates)
  const [connectionRequests, setConnectionRequests] = useState<string[]>([])

  // Filter teammates based on search query and filters
  useEffect(() => {
    let filtered = sampleTeammates

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (teammate) =>
          teammate.name.toLowerCase().includes(query) ||
          teammate.skills.some((skill) => skill.toLowerCase().includes(query)) ||
          teammate.interests.some((interest) => interest.toLowerCase().includes(query)) ||
          teammate.bio.toLowerCase().includes(query),
      )
    }

    // Filter by skill category
    if (selectedSkill !== "All Skills") {
      filtered = filtered.filter(
        (teammate) =>
          teammate.skills.some((skill) => skill.toLowerCase().includes(selectedSkill.toLowerCase())) ||
          teammate.interests.some((interest) => interest.toLowerCase().includes(selectedSkill.toLowerCase())),
      )
    }

    // Filter by availability
    if (selectedAvailability !== "Any Availability") {
      filtered = filtered.filter(
        (teammate) =>
          teammate.availability.toLowerCase().includes(selectedAvailability.toLowerCase()) ||
          teammate.availability === "Flexible",
      )
    }

    setFilteredTeammates(filtered)
  }, [searchQuery, selectedSkill, selectedAvailability])

  const handleConnect = (id: string) => {
    if (!connectionRequests.includes(id)) {
      setConnectionRequests([...connectionRequests, id])
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border-2 border-primary/10 p-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, skills, or interests..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedSkill} onValueChange={setSelectedSkill}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by skill" />
            </SelectTrigger>
            <SelectContent>
              {skillCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  <div className="flex items-center">
                    {category !== "All Skills" && skillIcons[category] && (
                      <span className="mr-2">{skillIcons[category]}</span>
                    )}
                    {category}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by availability" />
            </SelectTrigger>
            <SelectContent>
              {availabilityOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredTeammates.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <Users className="mb-2 h-10 w-10 text-muted-foreground" />
          <h3 className="mb-1 text-lg font-medium">No teammates found</h3>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters to find more teammates</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTeammates.map((teammate) => (
            <TeammateCard key={teammate.id} teammate={teammate} onConnect={handleConnect} />
          ))}
        </div>
      )}
    </div>
  )
}
