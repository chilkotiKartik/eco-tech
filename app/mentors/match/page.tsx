"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, ArrowRight, Brain, Briefcase, Code, Heart, Sparkles, Star } from "lucide-react"

// Personality assessment questions
const personalityQuestions = [
  {
    id: "learning_style",
    question: "How do you prefer to learn new concepts?",
    options: [
      { value: "visual", label: "Through visual aids and diagrams" },
      { value: "practical", label: "By doing practical exercises and projects" },
      { value: "theoretical", label: "Through detailed explanations and theory" },
      { value: "collaborative", label: "By discussing with others and group work" },
    ],
  },
  {
    id: "feedback_style",
    question: "What kind of feedback helps you grow the most?",
    options: [
      { value: "direct", label: "Direct and straightforward feedback" },
      { value: "gentle", label: "Gentle and encouraging feedback" },
      { value: "detailed", label: "Detailed and comprehensive feedback" },
      { value: "questioning", label: "Feedback that asks me questions to reflect on" },
    ],
  },
  {
    id: "challenge_response",
    question: "When faced with a difficult challenge, you typically:",
    options: [
      { value: "persistent", label: "Keep trying different approaches until you solve it" },
      { value: "research", label: "Research thoroughly before attempting a solution" },
      { value: "collaborate", label: "Seek help from others to solve it together" },
      { value: "break_down", label: "Break it down into smaller, manageable parts" },
    ],
  },
  {
    id: "work_pace",
    question: "What pace do you prefer when learning something new?",
    options: [
      { value: "fast", label: "Fast-paced with quick progression to advanced topics" },
      { value: "moderate", label: "Moderate pace with time to practice each concept" },
      { value: "thorough", label: "Thorough and methodical, mastering each step" },
      { value: "variable", label: "Variable pace depending on the difficulty of the topic" },
    ],
  },
  {
    id: "communication",
    question: "How do you prefer your mentor to communicate with you?",
    options: [
      { value: "concise", label: "Concise and to the point" },
      { value: "storytelling", label: "Using analogies and storytelling" },
      { value: "socratic", label: "Asking questions to guide my thinking" },
      { value: "encouraging", label: "Encouraging and motivational" },
    ],
  },
]

// Skill priorities section
const skillCategories = [
  {
    id: "technical",
    name: "Technical Skills",
    icon: Code,
    skills: ["Frontend Development", "Backend Development", "Mobile Development", "Data Science", "DevOps"],
  },
  {
    id: "career",
    name: "Career Development",
    icon: Briefcase,
    skills: ["Interview Preparation", "Resume Building", "Networking", "Career Planning", "Entrepreneurship"],
  },
  {
    id: "emotional",
    name: "Emotional Intelligence",
    icon: Heart,
    skills: ["Self-awareness", "Empathy", "Stress Management", "Communication", "Conflict Resolution"],
  },
  {
    id: "learning",
    name: "Learning Effectiveness",
    icon: Brain,
    skills: ["Focus Techniques", "Memory Enhancement", "Study Strategies", "Time Management", "Knowledge Retention"],
  },
]

// Sample mentor matches based on assessment
const sampleMentorMatches = [
  {
    id: "tech-mentor-1",
    name: "CodeMaster Pro",
    avatar: "/placeholder.svg?height=200&width=200",
    specialization: "Full-Stack Development",
    matchPercentage: 95,
    personalityTraits: ["Direct", "Fast-paced", "Project-based"],
    description:
      "A mentor who challenges you with practical projects and provides direct feedback to accelerate your technical growth.",
    keyStrengths: ["React Ecosystem", "System Architecture", "Code Review", "Performance Optimization"],
  },
  {
    id: "career-mentor-1",
    name: "CareerNavigator",
    avatar: "/placeholder.svg?height=200&width=200",
    specialization: "Tech Career Strategy",
    matchPercentage: 88,
    personalityTraits: ["Encouraging", "Methodical", "Research-oriented"],
    description:
      "Helps you build a strategic career plan with thorough industry research and encouraging guidance at each step.",
    keyStrengths: ["Industry Trends", "Interview Coaching", "Salary Negotiation", "Personal Branding"],
  },
  {
    id: "emotional-mentor-1",
    name: "EmpathyGuide Plus",
    avatar: "/placeholder.svg?height=200&width=200",
    specialization: "Workplace Emotional Intelligence",
    matchPercentage: 82,
    personalityTraits: ["Gentle", "Questioning", "Collaborative"],
    description:
      "Uses a Socratic approach to help you develop emotional intelligence skills through reflection and gentle guidance.",
    keyStrengths: ["Active Listening", "Conflict Resolution", "Stress Management", "Team Dynamics"],
  },
]

export default function MentorMatchPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState({})
  const [skillPriorities, setSkillPriorities] = useState({})
  const [mentorMatches, setMentorMatches] = useState([])
  const [isAssessing, setIsAssessing] = useState(false)
  const [activeTab, setActiveTab] = useState("personality")

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handleAnswerSelect = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value })
  }

  const handleSkillPriorityChange = (categoryId, skillIndex, value) => {
    setSkillPriorities({
      ...skillPriorities,
      [`${categoryId}_${skillIndex}`]: value[0],
    })
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // Final step - calculate matches
      calculateMentorMatches()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const calculateMentorMatches = () => {
    setIsAssessing(true)

    // In a real app, this would be an API call to match with mentors
    // For demo, we'll simulate a delay and return sample matches
    setTimeout(() => {
      setMentorMatches(sampleMentorMatches)
      setIsAssessing(false)
    }, 2000)
  }

  const handleSelectMentor = (mentorId) => {
    // In a real app, this would assign the mentor to the user
    router.push(`/mentors/${mentorId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Find Your Perfect AI Mentor</h1>
            <p className="text-muted-foreground mt-2">
              Answer a few questions to help us match you with the ideal AI mentor for your learning style and goals.
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span>
                Step {currentStep} of {totalSteps}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step 1: Personality Assessment */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Your Learning Personality</CardTitle>
                <CardDescription>
                  Help us understand how you learn best so we can match you with a compatible mentor.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {personalityQuestions.map((question, index) => (
                  <div key={question.id} className="space-y-3">
                    <h3 className="font-medium">
                      {index + 1}. {question.question}
                    </h3>
                    <RadioGroup
                      value={answers[question.id] || ""}
                      onValueChange={(value) => handleAnswerSelect(question.id, value)}
                    >
                      {question.options.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                          <Label htmlFor={`${question.id}-${option.value}`}>{option.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleNext}>
                  Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 2: Skill Priorities */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Your Skill Priorities</CardTitle>
                <CardDescription>
                  Rate the importance of different skills you want to develop with your mentor.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="technical" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 mb-6">
                    {skillCategories.map((category) => (
                      <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                        <category.icon className="h-4 w-4" />
                        <span className="hidden sm:inline">{category.name}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {skillCategories.map((category) => (
                    <TabsContent key={category.id} value={category.id} className="space-y-6">
                      {category.skills.map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <Label>{skill}</Label>
                            <span className="text-sm text-muted-foreground">
                              Priority: {skillPriorities[`${category.id}_${index}`] || 5}
                            </span>
                          </div>
                          <Slider
                            defaultValue={[5]}
                            max={10}
                            min={1}
                            step={1}
                            value={[skillPriorities[`${category.id}_${index}`] || 5]}
                            onValueChange={(value) => handleSkillPriorityChange(category.id, index, value)}
                          />
                        </div>
                      ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleNext}>
                  Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 3: Goals and Timeline */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Your Learning Goals</CardTitle>
                <CardDescription>Tell us about what you want to achieve with your mentor.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="primary-goal">What is your primary learning goal?</Label>
                  <select
                    id="primary-goal"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select your primary goal</option>
                    <option value="new-job">Prepare for a new job or career change</option>
                    <option value="skill-up">Improve specific technical skills</option>
                    <option value="leadership">Develop leadership abilities</option>
                    <option value="project">Complete a specific project</option>
                    <option value="startup">Launch a startup or business</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">What is your timeline for achieving this goal?</Label>
                  <select
                    id="timeline"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select your timeline</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="3-months">Within 3 months</option>
                    <option value="6-months">Within 6 months</option>
                    <option value="1-year">Within 1 year</option>
                    <option value="ongoing">Ongoing learning, no specific deadline</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time-commitment">How much time can you commit weekly?</Label>
                  <select
                    id="time-commitment"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select your weekly time commitment</option>
                    <option value="1-2">1-2 hours per week</option>
                    <option value="3-5">3-5 hours per week</option>
                    <option value="6-10">6-10 hours per week</option>
                    <option value="10+">More than 10 hours per week</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience-level">What is your current experience level?</Label>
                  <select
                    id="experience-level"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select your experience level</option>
                    <option value="beginner">Beginner - Just starting out</option>
                    <option value="intermediate">Intermediate - Some experience</option>
                    <option value="advanced">Advanced - Significant experience</option>
                    <option value="expert">Expert - Deep expertise in some areas</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleNext}>
                  Find My Mentor Match <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Results: Mentor Matches */}
          {currentStep > totalSteps && (
            <>
              {isAssessing ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <div className="space-y-4">
                      <Sparkles className="h-12 w-12 mx-auto text-primary" />
                      <h2 className="text-2xl font-bold">Analyzing Your Responses</h2>
                      <p className="text-muted-foreground">
                        Our AI is finding the perfect mentor matches based on your learning style and goals...
                      </p>
                      <Progress value={65} className="h-2 max-w-md mx-auto" />
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Your Mentor Matches</h2>
                  <p className="text-muted-foreground">
                    Based on your responses, we've found these AI mentors that match your learning style and goals.
                  </p>

                  <div className="space-y-6">
                    {mentorMatches.map((mentor, index) => (
                      <motion.div
                        key={mentor.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                              <div className="flex flex-col items-center space-y-2">
                                <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-primary/10">
                                  <img
                                    src={mentor.avatar || "/placeholder.svg"}
                                    alt={mentor.name}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                                <div className="text-center">
                                  <Badge
                                    variant="outline"
                                    className="bg-green-500/10 text-green-600 flex items-center gap-1"
                                  >
                                    <Star className="h-3 w-3 fill-current" />
                                    <span>{mentor.matchPercentage}% Match</span>
                                  </Badge>
                                </div>
                              </div>

                              <div className="flex-1 space-y-4">
                                <div>
                                  <h3 className="text-xl font-bold">{mentor.name}</h3>
                                  <p className="text-muted-foreground">{mentor.specialization}</p>
                                </div>

                                <p>{mentor.description}</p>

                                <div>
                                  <h4 className="text-sm font-medium mb-2">Personality Traits</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {mentor.personalityTraits.map((trait) => (
                                      <Badge key={trait} variant="secondary">
                                        {trait}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="text-sm font-medium mb-2">Key Strengths</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {mentor.keyStrengths.map((strength) => (
                                      <Badge key={strength} variant="outline">
                                        {strength}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <Button className="w-full md:w-auto" onClick={() => handleSelectMentor(mentor.id)}>
                                  Select This Mentor
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>
                      Retake Assessment
                    </Button>
                    <Button variant="outline" onClick={() => router.push("/mentors")}>
                      Browse All Mentors
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
