"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/components/auth-provider"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Check, Star, Sparkles, Zap, BookOpen, Code, Brain, Briefcase, Heart, Users, Trophy, Lock } from "lucide-react"
import { ChatbotAssistant } from "@/components/chatbot-assistant"

// Mentor types with their specializations and details
const mentorTypes = [
  {
    id: "technical",
    name: "Technical Mentors",
    icon: Code,
    description: "Expert guidance in programming, development, and technical skills",
    mentors: [
      {
        id: "tech-1",
        name: "CodeMaster",
        avatar: "/placeholder.svg?height=200&width=200",
        specialization: "Full-Stack Development",
        experience: "10+ years",
        rating: 4.9,
        skills: ["React", "Node.js", "Python", "System Design", "Database Architecture"],
        description:
          "Specialized in modern web development stacks and system architecture. Helps you build scalable applications and improve your coding practices.",
        premiumOnly: false,
        sampleAdvice:
          "Focus on understanding core principles rather than specific frameworks. Frameworks come and go, but the fundamentals remain valuable throughout your career.",
      },
      {
        id: "tech-2",
        name: "DataSage",
        avatar: "/placeholder.svg?height=200&width=200",
        specialization: "Data Science & ML",
        experience: "8+ years",
        rating: 4.8,
        skills: ["Machine Learning", "Data Analysis", "Python", "TensorFlow", "Statistical Modeling"],
        description:
          "Expert in data science methodologies and machine learning implementations. Guides you through complex data problems and AI model development.",
        premiumOnly: true,
        sampleAdvice:
          "Start with clean, well-understood data before jumping into complex models. The quality of your data preprocessing often determines the success of your ML projects.",
      },
      {
        id: "tech-3",
        name: "MobileGuru",
        avatar: "/placeholder.svg?height=200&width=200",
        specialization: "Mobile Development",
        experience: "7+ years",
        rating: 4.7,
        skills: ["React Native", "Flutter", "iOS", "Android", "Mobile UX"],
        description:
          "Specialized in cross-platform and native mobile development. Helps you create performant, beautiful mobile applications.",
        premiumOnly: true,
        sampleAdvice:
          "Design for touch first. Mobile interfaces have unique constraints and opportunities that differ significantly from desktop experiences.",
      },
    ],
  },
  {
    id: "career",
    name: "Career Mentors",
    icon: Briefcase,
    description: "Strategic guidance for career planning, job searching, and professional growth",
    mentors: [
      {
        id: "career-1",
        name: "PathFinder",
        avatar: "/placeholder.svg?height=200&width=200",
        specialization: "Tech Career Planning",
        experience: "12+ years",
        rating: 4.9,
        skills: [
          "Career Roadmapping",
          "Industry Trends",
          "Skill Gap Analysis",
          "Resume Building",
          "Interview Preparation",
        ],
        description:
          "Helps you navigate the tech industry landscape and build a strategic career plan tailored to your strengths and goals.",
        premiumOnly: false,
        sampleAdvice:
          "Your career is a marathon, not a sprint. Focus on building a portfolio of projects and skills that demonstrate your capabilities rather than chasing job titles.",
      },
      {
        id: "career-2",
        name: "InterviewPro",
        avatar: "/placeholder.svg?height=200&width=200",
        specialization: "Technical Interviews",
        experience: "9+ years",
        rating: 4.8,
        skills: [
          "Algorithm Coaching",
          "System Design Interviews",
          "Behavioral Questions",
          "Negotiation Tactics",
          "Mock Interviews",
        ],
        description:
          "Former tech recruiter who specializes in preparing candidates for challenging technical interviews at top companies.",
        premiumOnly: true,
        sampleAdvice:
          "Practice explaining your thought process out loud. Technical interviews assess not just your solution, but how you approach problems and communicate your reasoning.",
      },
      {
        id: "career-3",
        name: "StartupSage",
        avatar: "/placeholder.svg?height=200&width=200",
        specialization: "Entrepreneurship",
        experience: "10+ years",
        rating: 4.7,
        skills: ["Startup Strategy", "Product Development", "Funding", "Team Building", "Market Analysis"],
        description:
          "Guides aspiring entrepreneurs through the process of validating ideas, building MVPs, and launching successful tech startups.",
        premiumOnly: true,
        sampleAdvice:
          "Build something people want. The most common startup mistake is creating a solution looking for a problem rather than solving a real pain point.",
      },
    ],
  },
  {
    id: "emotional",
    name: "Emotional Intelligence Mentors",
    icon: Heart,
    description: "Support for developing emotional resilience, communication, and interpersonal skills",
    mentors: [
      {
        id: "emotional-1",
        name: "EmpathyGuide",
        avatar: "/placeholder.svg?height=200&width=200",
        specialization: "Emotional Intelligence",
        experience: "15+ years",
        rating: 4.9,
        skills: [
          "Self-awareness",
          "Empathy Development",
          "Stress Management",
          "Conflict Resolution",
          "Active Listening",
        ],
        description:
          "Helps you develop emotional intelligence skills that are crucial for leadership and teamwork in tech environments.",
        premiumOnly: false,
        sampleAdvice:
          "Technical skills get you hired, but emotional intelligence gets you promoted. Invest time in understanding yourself and others to excel in collaborative environments.",
      },
      {
        id: "emotional-2",
        name: "MindfulTech",
        avatar: "/placeholder.svg?height=200&width=200",
        specialization: "Tech Burnout Prevention",
        experience: "8+ years",
        rating: 4.8,
        skills: [
          "Mindfulness Practices",
          "Work-Life Balance",
          "Burnout Prevention",
          "Focus Techniques",
          "Digital Wellbeing",
        ],
        description:
          "Specialized in helping tech professionals maintain mental wellbeing while thriving in high-pressure environments.",
        premiumOnly: true,
        sampleAdvice:
          "Schedule regular breaks in your calendar and treat them as non-negotiable meetings with yourself. Your brain needs downtime to process and integrate learning.",
      },
      {
        id: "emotional-3",
        name: "TeamHarmony",
        avatar: "/placeholder.svg?height=200&width=200",
        specialization: "Team Dynamics",
        experience: "11+ years",
        rating: 4.7,
        skills: [
          "Team Communication",
          "Conflict Management",
          "Feedback Skills",
          "Cultural Intelligence",
          "Remote Collaboration",
        ],
        description:
          "Helps you navigate complex team dynamics and develop the interpersonal skills needed for collaborative tech environments.",
        premiumOnly: true,
        sampleAdvice:
          "Assume positive intent in team communications, especially in text-based channels where tone can be misinterpreted. Ask clarifying questions before reacting.",
      },
    ],
  },
  {
    id: "learning",
    name: "Learning Coaches",
    icon: Brain,
    description: "Personalized guidance on effective learning strategies and skill acquisition",
    mentors: [
      {
        id: "learning-1",
        name: "LearningArchitect",
        avatar: "/placeholder.svg?height=200&width=200",
        specialization: "Learning Optimization",
        experience: "14+ years",
        rating: 4.9,
        skills: [
          "Learning Strategies",
          "Knowledge Mapping",
          "Skill Acquisition",
          "Memory Techniques",
          "Deliberate Practice",
        ],
        description:
          "Helps you optimize your learning process and develop effective strategies for mastering technical skills efficiently.",
        premiumOnly: false,
        sampleAdvice:
          "Don't just read or watch tutorials. Active learning through building projects and teaching concepts to others leads to much deeper understanding.",
      },
      {
        id: "learning-2",
        name: "FocusMaster",
        avatar: "/placeholder.svg?height=200&width=200",
        specialization: "Deep Work & Focus",
        experience: "9+ years",
        rating: 4.8,
        skills: [
          "Deep Work Techniques",
          "Distraction Management",
          "Flow State",
          "Productivity Systems",
          "Habit Formation",
        ],
        description:
          "Specialized in helping tech learners develop the focus and concentration needed for mastering complex technical subjects.",
        premiumOnly: true,
        sampleAdvice:
          "Block time for deep work with no distractions. Even 90 minutes of focused coding will yield better results than 3 hours of interrupted, distracted work.",
      },
      {
        id: "learning-3",
        name: "PolyglotPro",
        avatar: "/placeholder.svg?height=200&width=200",
        specialization: "Programming Language Mastery",
        experience: "12+ years",
        rating: 4.7,
        skills: [
          "Language Acquisition",
          "Syntax Patterns",
          "Mental Models",
          "Transfer Learning",
          "Comparative Programming",
        ],
        description:
          "Helps you develop the meta-skills needed to quickly learn and switch between different programming languages and paradigms.",
        premiumOnly: true,
        sampleAdvice:
          "Focus on understanding programming paradigms rather than syntax details. Once you grasp functional, object-oriented, and procedural approaches, new languages become much easier to learn.",
      },
    ],
  },
]

// Subscription plans
const subscriptionPlans = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Basic mentorship to get you started",
    features: [
      "Access to 4 basic AI mentors",
      "5 mentor sessions per month",
      "Basic skill assessments",
      "Community forum access",
      "Limited learning resources",
    ],
    limitations: [
      "No access to premium mentors",
      "Limited session duration (15 min)",
      "Basic feedback only",
      "No personalized learning paths",
    ],
    recommended: false,
    buttonText: "Current Plan",
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹499",
    period: "per month",
    description: "Enhanced mentorship for serious learners",
    features: [
      "Access to all 12 AI mentors",
      "20 mentor sessions per month",
      "Advanced skill assessments",
      "Priority community support",
      "Expanded learning resources",
      "Personalized learning paths",
      "Session recordings and summaries",
    ],
    limitations: ["Limited advanced career simulations", "Standard response times"],
    recommended: true,
    buttonText: "Upgrade to Pro",
  },
  {
    id: "ultimate",
    name: "Ultimate",
    price: "₹999",
    period: "per month",
    description: "Comprehensive mentorship for career acceleration",
    features: [
      "Unlimited access to all AI mentors",
      "Unlimited mentor sessions",
      "Comprehensive skill assessments",
      "VIP community support",
      "Full access to all learning resources",
      "Custom learning paths with milestones",
      "Advanced career simulations",
      "Industry project opportunities",
      "Certification preparation",
      "Resume and portfolio reviews",
    ],
    limitations: [],
    recommended: false,
    buttonText: "Upgrade to Ultimate",
  },
]

// Educational institution partners
const institutionPartners = [
  {
    name: "Tech University",
    logo: "/placeholder.svg?height=60&width=180",
    courses: 45,
    discount: "20%",
  },
  {
    name: "Innovation Institute",
    logo: "/placeholder.svg?height=60&width=180",
    courses: 32,
    discount: "15%",
  },
  {
    name: "Digital Academy",
    logo: "/placeholder.svg?height=60&width=180",
    courses: 28,
    discount: "25%",
  },
  {
    name: "Code College",
    logo: "/placeholder.svg?height=60&width=180",
    courses: 50,
    discount: "10%",
  },
]

export default function MentorsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [selectedMentor, setSelectedMentor] = useState(null)
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("technical")
  const [chatOpen, setChatOpen] = useState(false)
  const [currentMentorForChat, setCurrentMentorForChat] = useState(null)

  // Determine user's current plan (in a real app, this would come from the user's data)
  const userPlan = "free"

  const handleStartSession = (mentor) => {
    if (mentor.premiumOnly && userPlan === "free") {
      setShowSubscriptionDialog(true)
    } else {
      setCurrentMentorForChat(mentor)
      setChatOpen(true)
    }
  }

  const handleUpgrade = (plan) => {
    // In a real app, this would initiate the payment process
    alert(`Upgrading to ${plan} plan. This would connect to a payment processor in a real application.`)
    setShowSubscriptionDialog(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Hero section */}
          <section className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">AI Mentors</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Personalized guidance from specialized AI mentors to accelerate your growth in technical skills, career
              development, and emotional intelligence.
            </p>
          </section>

          {/* Mentor types tabs */}
          <Tabs defaultValue="technical" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {mentorTypes.map((type) => (
                <TabsTrigger key={type.id} value={type.id} className="flex items-center gap-2">
                  <type.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{type.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {mentorTypes.map((type) => (
              <TabsContent key={type.id} value={type.id} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {type.mentors.map((mentor) => (
                    <Card key={mentor.id} className="overflow-hidden transition-all hover:shadow-lg">
                      <CardHeader className="relative pb-0">
                        {mentor.premiumOnly && (
                          <Badge
                            variant="premium"
                            className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                          >
                            <Sparkles className="h-3 w-3 mr-1" /> Premium
                          </Badge>
                        )}
                        <div className="flex justify-center">
                          <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-primary/10">
                            <Image
                              src={mentor.avatar || "/placeholder.svg"}
                              alt={mentor.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <CardTitle className="text-center mt-4">{mentor.name}</CardTitle>
                        <div className="flex items-center justify-center gap-2 mt-1">
                          <Badge variant="outline" className="font-normal">
                            {mentor.specialization}
                          </Badge>
                          <div className="flex items-center text-amber-500">
                            <Star className="h-3 w-3 fill-current" />
                            <span className="text-xs ml-1">{mentor.rating}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">{mentor.description}</p>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Expertise</h4>
                            <div className="flex flex-wrap gap-1">
                              {mentor.skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="font-normal">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="bg-muted p-3 rounded-md italic text-sm">"{mentor.sampleAdvice}"</div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full"
                          onClick={() => handleStartSession(mentor)}
                          variant={mentor.premiumOnly && userPlan === "free" ? "outline" : "default"}
                        >
                          {mentor.premiumOnly && userPlan === "free" ? (
                            <>
                              <Lock className="h-4 w-4 mr-2" /> Unlock Mentor
                            </>
                          ) : (
                            "Start Session"
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Subscription plans */}
          <section className="py-12 space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Subscription Plans</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Choose the plan that best fits your learning journey and career goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {subscriptionPlans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative overflow-hidden ${plan.recommended ? "border-primary shadow-lg" : ""}`}
                >
                  {plan.recommended && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                      Recommended
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <div className="flex items-baseline mt-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-sm text-muted-foreground ml-1">/{plan.period}</span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">What's included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Limitations:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-start">
                              <span className="h-4 w-4 text-muted-foreground mr-2 mt-1 shrink-0">•</span>
                              <span className="text-sm text-muted-foreground">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={plan.id === userPlan ? "outline" : "default"}
                      onClick={() => plan.id !== userPlan && handleUpgrade(plan.id)}
                      disabled={plan.id === userPlan}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* Educational partners */}
          <section className="py-12 space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Educational Partners</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Get exclusive discounts on courses from our partner institutions to complement your mentorship.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {institutionPartners.map((partner) => (
                <Card key={partner.name} className="text-center">
                  <CardHeader className="pb-2">
                    <div className="h-16 flex items-center justify-center">
                      <Image src={partner.logo || "/placeholder.svg"} alt={partner.name} width={180} height={60} />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="font-medium">{partner.name}</p>
                    <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                      <span>{partner.courses} Courses</span>
                      <span>{partner.discount} Discount</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 justify-center">
                    <Button variant="outline" size="sm">
                      Browse Courses
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* Business value proposition */}
          <section className="py-12 bg-muted rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">For Educational Institutions</h2>
                <p className="text-lg">
                  Partner with Carrer to provide your students with AI-powered mentorship that complements your
                  curriculum and improves learning outcomes.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Enhanced Learning Experience</h3>
                      <p className="text-sm text-muted-foreground">
                        Provide 24/7 personalized mentorship to supplement classroom learning.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Improved Retention</h3>
                      <p className="text-sm text-muted-foreground">
                        Students with mentors are more likely to complete courses and programs.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4">
                      <Trophy className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Better Outcomes</h3>
                      <p className="text-sm text-muted-foreground">
                        Graduates with mentorship experience higher placement rates and career satisfaction.
                      </p>
                    </div>
                  </li>
                </ul>
                <Button>Partner With Us</Button>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Educational partnership"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Subscription dialog */}
      <Dialog open={showSubscriptionDialog} onOpenChange={setShowSubscriptionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upgrade to Access Premium Mentors</DialogTitle>
            <DialogDescription>
              Premium mentors are available exclusively to Pro and Ultimate subscribers. Upgrade your plan to unlock all
              mentors and features.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Pro Plan</h4>
                <p className="text-sm text-muted-foreground">₹499/month - Access all mentors and 20 sessions/month</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Ultimate Plan</h4>
                <p className="text-sm text-muted-foreground">₹999/month - Unlimited access and advanced features</p>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowSubscriptionDialog(false)}>
              Maybe Later
            </Button>
            <Button onClick={() => handleUpgrade("pro")}>Upgrade to Pro</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mentor chat dialog */}
      {chatOpen && currentMentorForChat && (
        <Dialog open={chatOpen} onOpenChange={setChatOpen}>
          <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src={currentMentorForChat.avatar || "/placeholder.svg"}
                    alt={currentMentorForChat.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <DialogTitle>{currentMentorForChat.name}</DialogTitle>
                  <DialogDescription>{currentMentorForChat.specialization}</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="flex-1 overflow-auto">
              <ChatbotAssistant
                initialMessage={`Hello! I'm ${currentMentorForChat.name}, your ${currentMentorForChat.specialization} mentor. How can I help you today?`}
                persona={currentMentorForChat.name}
                specialization={currentMentorForChat.specialization}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
