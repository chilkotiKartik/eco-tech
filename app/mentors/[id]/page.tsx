"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MentorVoiceInteraction } from "@/components/mentor-voice-interaction"
import { MentorLearningPath } from "@/components/mentor-learning-path"
import { MentorSkillVisualization } from "@/components/mentor-skill-visualization"
import { MentorPersonalityCustomizer } from "@/components/mentor-personality-customizer"
import { SubscriptionBanner } from "@/components/subscription-banner"
import { Calendar, MessageSquare, BookOpen, Award, Star, Clock, Users, Sparkles, Zap } from "lucide-react"

// Sample data - in a real app, this would come from an API
const getMentorData = (id: string) => {
  return {
    id,
    name: "Dr. Ada Lovelace",
    title: "Technical AI Mentor",
    specialty: "Machine Learning & Algorithm Design",
    rating: 4.9,
    reviews: 128,
    students: 1243,
    experience: "15+ years",
    isPremium: true,
    isAvailable: true,
    avatarUrl: "/placeholder.svg?height=400&width=400",
    coverUrl: "/placeholder.svg?height=400&width=1200",
    bio: "Dr. Ada Lovelace is a renowned AI researcher and educator with expertise in machine learning algorithms and computational thinking. With over 15 years of experience in both industry and academia, she specializes in making complex technical concepts accessible to learners at all levels.",
    expertise: ["Machine Learning", "Algorithm Design", "Python", "Data Structures", "Neural Networks"],
    achievements: [
      "Published 30+ research papers on AI and ML",
      "Former Lead AI Researcher at TechCorp",
      "PhD in Computer Science from MIT",
      "Author of 'Algorithmic Thinking for Everyone'",
    ],
    learningPath: [
      {
        id: "step1",
        title: "Foundations of Algorithmic Thinking",
        description: "Master the core concepts of computational thinking and problem-solving",
        duration: "2 weeks",
        status: "completed",
      },
      {
        id: "step2",
        title: "Data Structures Deep Dive",
        description: "Explore advanced data structures and their applications",
        duration: "3 weeks",
        status: "current",
      },
      {
        id: "step3",
        title: "Machine Learning Fundamentals",
        description: "Build your first ML models and understand key principles",
        duration: "4 weeks",
        status: "locked",
      },
      {
        id: "step4",
        title: "Neural Network Architecture",
        description: "Design and implement neural networks for complex problems",
        duration: "4 weeks",
        status: "locked",
        isPremium: true,
      },
    ],
    sessions: [
      {
        id: "session1",
        title: "Introduction to Algorithmic Thinking",
        date: "2023-04-15",
        duration: "45 minutes",
        summary:
          "Covered the basics of computational thinking and problem decomposition. Worked through several example problems.",
      },
      {
        id: "session2",
        title: "Array Manipulation Techniques",
        date: "2023-04-22",
        duration: "60 minutes",
        summary: "Explored efficient array manipulation strategies and solved coding challenges together.",
      },
    ],
    insights: [
      "You excel at breaking down complex problems into manageable parts",
      "Consider practicing more with recursive algorithms to build confidence",
      "Your visual learning style responds well to diagrams and flowcharts",
    ],
    skills: [
      { id: "ml", name: "ML", level: 5, category: "technical" },
      { id: "algorithms", name: "Algorithms", level: 5, category: "technical" },
      { id: "python", name: "Python", level: 4, category: "technical" },
      { id: "math", name: "Math", level: 5, category: "technical" },
      { id: "teaching", name: "Teaching", level: 4, category: "soft" },
      { id: "research", name: "Research", level: 5, category: "industry" },
      { id: "mentoring", name: "Mentoring", level: 4, category: "leadership" },
      { id: "communication", name: "Communication", level: 3, category: "soft" },
    ],
    skillConnections: [
      { source: "ml", target: "algorithms", strength: 8 },
      { source: "ml", target: "math", strength: 9 },
      { source: "ml", target: "python", strength: 7 },
      { source: "algorithms", target: "python", strength: 6 },
      { source: "teaching", target: "communication", strength: 8 },
      { source: "teaching", target: "mentoring", strength: 9 },
      { source: "research", target: "math", strength: 7 },
      { source: "mentoring", target: "communication", strength: 8 },
    ],
  }
}

export default function MentorDetailPage() {
  const params = useParams()
  const mentorId = params.id as string

  const [mentor, setMentor] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isPremiumUser, setIsPremiumUser] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([
    {
      role: "assistant",
      content: "Hello! I'm Dr. Ada Lovelace, your AI mentor. How can I help you with your learning journey today?",
    },
  ])
  const [isProcessingChat, setIsProcessingChat] = useState(false)
  const [responseText, setResponseText] = useState("")

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMentor(getMentorData(mentorId))
      setLoading(false)
    }, 500)
  }, [mentorId])

  const handleStartLearningStep = (stepId: string) => {
    // In a real app, this would update the user's progress
    console.log(`Starting learning step: ${stepId}`)
  }

  const handleUnlockPremium = () => {
    // In a real app, this would redirect to subscription page
    console.log("Redirecting to premium subscription page")
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatMessage.trim()) return

    // Add user message to chat
    const newMessage = { role: "user", content: chatMessage }
    setChatHistory((prev) => [...prev, newMessage])

    // Clear input and show processing
    setChatMessage("")
    setIsProcessingChat(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: "assistant",
        content: `I understand you're asking about "${chatMessage}". As your AI mentor, I'd suggest approaching this by breaking down the problem into smaller parts. Let's start by understanding the core concepts and then build from there. Would you like me to explain more about this topic?`,
      }
      setChatHistory((prev) => [...prev, aiResponse])
      setResponseText(aiResponse.content)
      setIsProcessingChat(false)
    }, 1500)
  }

  const handleSpeechResult = (text: string) => {
    setChatMessage(text)
  }

  const handleSavePersonality = (personalitySettings: any) => {
    // In a real app, this would save to the user's preferences
    console.log("Saving personality settings:", personalitySettings)
    // Show success message or update UI
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 animate-pulse">
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-xl mb-6"></div>
        <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-md mb-4"></div>
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
          <div className="md:col-span-2 h-64 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        </div>
      </div>
    )
  }

  if (!mentor) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Mentor not found</h1>
        <p className="mb-6">The mentor you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/mentors">Back to Mentors</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      {/* Cover Image and Profile */}
      <div className="relative mb-8">
        <div className="h-64 w-full rounded-xl overflow-hidden">
          <Image
            src={mentor.coverUrl || "/placeholder.svg"}
            alt="Cover background"
            className="object-cover"
            fill
            priority
          />
        </div>

        <div className="absolute -bottom-16 left-8 flex items-end">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src={mentor.avatarUrl || "/placeholder.svg"} alt={mentor.name} />
            <AvatarFallback>
              {mentor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="ml-4 mb-4 bg-background/80 backdrop-blur-sm p-2 rounded-lg">
            <h1 className="text-2xl font-bold">{mentor.name}</h1>
            <div className="flex items-center gap-2">
              <Badge variant={mentor.isPremium ? "default" : "outline"}>
                {mentor.isPremium ? "Premium Mentor" : "Standard Mentor"}
              </Badge>
              <div className="flex items-center text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1 text-sm font-medium">{mentor.rating}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="outline" className="bg-background/80 backdrop-blur-sm">
            <Users className="h-4 w-4 mr-2" />
            {mentor.students.toLocaleString()} Students
          </Button>
          <Button variant="outline" className="bg-background/80 backdrop-blur-sm">
            <Clock className="h-4 w-4 mr-2" />
            {mentor.experience}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-20">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 w-full max-w-4xl mx-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="learning-path">Learning Path</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {mentor.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium text-lg">{mentor.title}</h3>
                      <p className="text-sm text-slate-500">{mentor.specialty}</p>
                    </div>

                    <p>{mentor.bio}</p>

                    <div>
                      <h4 className="font-medium mb-2">Areas of Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {mentor.expertise.map((skill: string) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Achievements & Credentials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {mentor.achievements.map((achievement: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Award className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Personalized Insights</CardTitle>
                    <CardDescription>Based on your interactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {mentor.insights.map((insight: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Sparkles className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Zap className="h-4 w-4 mr-2" />
                      Get More Insights
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Session History</CardTitle>
                    <CardDescription>Your previous learning sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {mentor.sessions.length > 0 ? (
                      <div className="space-y-4">
                        {mentor.sessions.map((session: any) => (
                          <div key={session.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium">{session.title}</h4>
                              <div className="flex items-center text-sm text-slate-500">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(session.date).toLocaleDateString()}
                              </div>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{session.summary}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-slate-500">
                                <Clock className="h-3 w-3 inline mr-1" />
                                {session.duration}
                              </span>
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                        <h3 className="font-medium mb-1">No sessions yet</h3>
                        <p className="text-sm text-slate-500 mb-4">Start your learning journey with {mentor.name}</p>
                        <Button>Schedule First Session</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {!isPremiumUser && mentor.isPremium && (
                <SubscriptionBanner
                  title="Unlock Premium Mentorship"
                  description={`Get unlimited access to ${mentor.name} and all premium mentors`}
                  buttonText="Upgrade Now"
                  onButtonClick={handleUnlockPremium}
                />
              )}
            </TabsContent>

            <TabsContent value="learning-path">
              <MentorLearningPath
                mentorName={mentor.name}
                mentorSpecialty={mentor.specialty}
                steps={mentor.learningPath}
                progress={35}
                isPremiumUser={isPremiumUser}
                onStartStep={handleStartLearningStep}
                onUnlockPremium={handleUnlockPremium}
              />
            </TabsContent>

            <TabsContent value="chat">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Chat with {mentor.name}</CardTitle>
                    <CardDescription>Ask questions, get guidance, and deepen your understanding</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] overflow-y-auto border rounded-md p-4 mb-4">
                      {chatHistory.map((msg, index) => (
                        <div key={index} className={`mb-4 ${msg.role === "user" ? "text-right" : ""}`}>
                          <div
                            className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
                              msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            <p>{msg.content}</p>
                          </div>
                        </div>
                      ))}
                      {isProcessingChat && (
                        <div className="mb-4">
                          <div className="inline-block max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                            <p>Thinking...</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder={`Ask ${mentor.name} a question...`}
                        className="flex-1 px-3 py-2 border rounded-md"
                      />
                      <Button type="submit" disabled={isProcessingChat || !chatMessage.trim()}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Voice Interaction</CardTitle>
                    <CardDescription>Speak with your mentor using voice commands</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MentorVoiceInteraction
                      mentorName={mentor.name}
                      onSpeechResult={handleSpeechResult}
                      isProcessing={isProcessingChat}
                      responseText={responseText}
                      voiceStyle="enthusiastic"
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="skills">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Skill Network</CardTitle>
                    <CardDescription>Visualize how {mentor.name}'s skills interconnect</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <MentorSkillVisualization
                      mentorName={mentor.name}
                      skills={mentor.skills}
                      connections={mentor.skillConnections}
                      width={600}
                      height={400}
                      onSkillClick={(skillId) => console.log(`Clicked skill: ${skillId}`)}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Expertise Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mentor.skills.map((skill: any) => (
                        <div key={skill.id}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-sm text-slate-500">{skill.level}/5</span>
                          </div>
                          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${(skill.level / 5) * 100}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="customize">
              <div className="max-w-3xl mx-auto">
                <MentorPersonalityCustomizer
                  mentorId={mentor.id}
                  mentorName={mentor.name}
                  onSave={handleSavePersonality}
                  isPremium={isPremiumUser}
                />

                {!isPremiumUser && (
                  <div className="mt-6">
                    <SubscriptionBanner
                      title="Unlock Mentor Customization"
                      description="Personalize your mentor's teaching style and personality with a premium subscription"
                      buttonText="Upgrade to Premium"
                      onButtonClick={handleUnlockPremium}
                    />
                  </div>
                )}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
