"use client"

import Link from "next/link"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { useEmotion } from "@/components/emotion-provider"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import {
  Book,
  Brain,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  LightbulbIcon,
  Zap,
  ArrowRight,
  BarChart3,
  Code,
  Users,
  Paintbrush,
  Heart,
  FolderKanban,
  BookOpen,
  HeartHandshake,
} from "lucide-react"

// Emotion emojis for the selector
const emotionEmojis = [
  { emoji: "😐", mood: "neutral", label: "Neutral" },
  { emoji: "😊", mood: "happy", label: "Happy" },
  { emoji: "😩", mood: "tired", label: "Tired" },
  { emoji: "🤩", mood: "energetic", label: "Energetic" },
  { emoji: "🧠", mood: "focused", label: "Focused" },
  { emoji: "😔", mood: "sad", label: "Sad" },
  { emoji: "😰", mood: "anxious", label: "Anxious" },
  { emoji: "😡", mood: "angry", label: "Angry" },
  { emoji: "💡", mood: "creative", label: "Creative" },
  { emoji: "😕", mood: "confused", label: "Confused" },
  { emoji: "😫", mood: "burnt out", label: "Burnt Out" },
]

export default function JournalPage() {
  const { user, updateUserJournal, updateUserMood } = useAuth()
  const {
    getEmotionFromInput,
    analyzeEmotionalState,
    getMoodBasedRecommendations,
    getMoodBasedTasks,
    getMoodBasedMotivation,
    setEmotionMode,
  } = useEmotion()

  const [journalEntry, setJournalEntry] = useState("")
  const [selectedMood, setSelectedMood] = useState("neutral")
  const [aiAnalysis, setAiAnalysis] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [emotionData, setEmotionData] = useState([])
  const [activeTab, setActiveTab] = useState("write")
  const [moodTasks, setMoodTasks] = useState([])
  const [moodMotivation, setMoodMotivation] = useState("")
  const [completedTasks, setCompletedTasks] = useState([])
  const [showConfetti, setShowConfetti] = useState(false)
  const confettiRef = useRef(null)

  useEffect(() => {
    if (user?.journal) {
      // Generate emotion data for the chart
      const data = generateEmotionData(user.journal)
      setEmotionData(data)
    }
  }, [user?.journal])

  // Update mood-based content when selected mood changes
  useEffect(() => {
    setMoodTasks(getMoodBasedTasks(selectedMood))
    setMoodMotivation(getMoodBasedMotivation(selectedMood))

    // Update the app's emotion mode based on selected mood
    setEmotionMode(selectedMood)
  }, [selectedMood, getMoodBasedTasks, getMoodBasedMotivation, setEmotionMode])

  // Generate mock emotion data for the chart
  const generateEmotionData = (journal) => {
    const moodValues = {
      happy: 80,
      energetic: 90,
      neutral: 50,
      tired: 30,
      sad: 20,
      focused: 70,
      anxious: 35,
      angry: 25,
      creative: 75,
      confused: 40,
      "burnt out": 15,
    }

    // Start with some base data points
    const baseData = [
      { date: "Apr 24", confidence: 65, wellbeing: 70 },
      { date: "Apr 25", confidence: 60, wellbeing: 65 },
      { date: "Apr 26", confidence: 70, wellbeing: 60 },
      { date: "Apr 27", confidence: 75, wellbeing: 75 },
    ]

    // Add data points from journal entries
    const journalData = journal.map((entry, index) => {
      const moodValue = moodValues[entry.mood] || 50
      const confidenceVariation = Math.random() * 10 - 5 // Random variation between -5 and 5
      const wellbeingVariation = Math.random() * 10 - 5

      return {
        date: entry.date.slice(5), // Format as "MM-DD"
        confidence: Math.min(100, Math.max(0, moodValue + confidenceVariation)),
        wellbeing: Math.min(100, Math.max(0, moodValue + wellbeingVariation)),
      }
    })

    // Combine and sort by date
    return [...baseData, ...journalData].slice(-14) // Last 14 days
  }

  const handleJournalSubmit = () => {
    if (!journalEntry.trim()) return

    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const detectedEmotion = getEmotionFromInput(journalEntry)

      let aiInsight = ""
      switch (detectedEmotion) {
        case "joyful":
          aiInsight =
            "Your positive energy is contagious! This is a great time to take on leadership opportunities or mentor others."
          break
        case "sad":
          aiInsight =
            "It's okay to have challenging days. Consider taking a short wellness break or connecting with supportive peers."
          break
        case "burnt out":
          aiInsight =
            "I notice signs of burnout. Consider a wellness mission and breaking your tasks into smaller, manageable chunks."
          break
        case "focused":
          aiInsight = "You're in a great flow state! This is an ideal time for deep work on complex problems."
          break
        case "creative":
          aiInsight = "Your creative energy is high! Consider brainstorming new ideas or working on design challenges."
          break
        default:
          aiInsight =
            "Reflecting regularly helps build self-awareness. Consider setting specific goals for tomorrow based on today's experiences."
      }

      

      setAiAnalysis(aiInsight)

      // Create new journal entry
      const newEntry = {
        date: new Date().toISOString().split("T")[0],
        content: journalEntry,
        mood: selectedMood,
        aiInsight,
      }

      // Update user's journal
      updateUserJournal(newEntry)

      // Update user's current mood
      updateUserMood(selectedMood)

      // Reset form
      setJournalEntry("")
      setIsAnalyzing(false)

      // Switch to history tab to show the new entry
      setActiveTab("history")
    }, 1500)
  }

  const handleTaskComplete = (taskIndex) => {
    if (completedTasks.includes(taskIndex)) return

    setCompletedTasks([...completedTasks, taskIndex])
    setShowConfetti(true)

    // Hide confetti after 3 seconds
    setTimeout(() => {
      setShowConfetti(false)
    }, 3000)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Journal Assistant</CardTitle>
              <CardDescription>Please log in to use the journal feature</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <a href="/login">Log In</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 pt-16 pb-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Emotion+AI Journal Assistant</h1>
              <p className="text-muted-foreground">Reflect on your journey with AI-powered insights</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="write">Write Journal</TabsTrigger>
                  <TabsTrigger value="history">Journal History</TabsTrigger>
                  <TabsTrigger value="tasks">Mood Tasks</TabsTrigger>
                </TabsList>

                <TabsContent value="write">
                  <Card className="card-hover">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Book className="mr-2 h-5 w-5 text-primary" />
                        Today's Reflection
                      </CardTitle>
                      <CardDescription>
                        How are you feeling today? Your AI assistant will provide personalized insights.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Select your mood:</label>
                        <div className="flex flex-wrap gap-3">
                          {emotionEmojis.map((item) => (
                            <Button
                              key={item.mood}
                              variant={selectedMood === item.mood ? "default" : "outline"}
                              className={`h-12 w-12 rounded-full p-0 text-2xl transition-all ${
                                selectedMood === item.mood ? "animate-pulse-slow" : ""
                              }`}
                              onClick={() => setSelectedMood(item.mood)}
                            >
                              {item.emoji}
                              <span className="sr-only">{item.label}</span>
                            </Button>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Current mood: {emotionEmojis.find((e) => e.mood === selectedMood)?.label}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Write your journal entry:</label>
                        <Textarea
                          placeholder="How was your day? What did you learn? What challenges did you face?"
                          className="min-h-[200px]"
                          value={journalEntry}
                          onChange={(e) => setJournalEntry(e.target.value)}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setJournalEntry("")}>
                        Clear
                      </Button>
                      <Button
                        onClick={handleJournalSubmit}
                        disabled={!journalEntry.trim() || isAnalyzing}
                        className="btn-hover"
                      >
                        {isAnalyzing ? (
                          <>
                            <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                            Analyzing...
                          </>
                        ) : (
                          "Save & Analyze"
                        )}
                      </Button>
                    </CardFooter>
                  </Card>

                  {moodMotivation && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-6"
                    >
                      <Card className="border-primary/50 card-hover">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <LightbulbIcon className="mr-2 h-5 w-5 text-primary" />
                            Mood-Based Motivation
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="italic">{moodMotivation}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {aiAnalysis && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-6"
                    >
                      <Card className="border-primary/50 card-hover">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Brain className="mr-2 h-5 w-5 text-primary" />
                            AI Assistant Insights
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{aiAnalysis}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </TabsContent>

                <TabsContent value="history">
                  <Card className="card-hover">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-primary" />
                        Your Journal History
                      </CardTitle>
                      <CardDescription>Review your past reflections and AI insights</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <AnimatePresence>
                          {user.journal && user.journal.length > 0 ? (
                            user.journal.map((entry, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="border rounded-lg p-4 card-hover"
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center">
                                    <Badge variant="outline" className="mr-2">
                                      {entry.date}
                                    </Badge>
                                    <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                                      {emotionEmojis.find((e) => e.mood === entry.mood)?.emoji || "😐"}{" "}
                                      {emotionEmojis.find((e) => e.mood === entry.mood)?.label || "Neutral"}
                                    </Badge>
                                  </div>
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <p className="mb-4">{entry.content}</p>
                                <div className="bg-primary/5 p-3 rounded-md">
                                  <div className="flex items-start">
                                    <Avatar className="h-8 w-8 mr-2">
                                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                                      <AvatarFallback>AI</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="text-sm font-medium">AI Assistant</p>
                                      <p className="text-sm text-muted-foreground">{entry.aiInsight}</p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-muted-foreground">No journal entries yet. Start writing today!</p>
                            </div>
                          )}
                        </AnimatePresence>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="tasks">
                  <Card className="card-hover">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                        Mood-Based Tasks
                      </CardTitle>
                      <CardDescription>
                        Personalized tasks based on your current mood:{" "}
                        <span className="font-medium">{emotionEmojis.find((e) => e.mood === selectedMood)?.label}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {moodTasks.map((task, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className={`border rounded-lg p-4 transition-all ${
                              completedTasks.includes(index)
                                ? "bg-primary/10 border-primary/30"
                                : "hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div
                                  className={`p-2 rounded-full mr-3 ${
                                    completedTasks.includes(index) ? "bg-primary/20" : "bg-muted"
                                  }`}
                                >
                                  {task.type === "technical" && <Code className="h-5 w-5 text-primary" />}
                                  {task.type === "social" && <Users className="h-5 w-5 text-blue-500" />}
                                  {task.type === "creative" && <Paintbrush className="h-5 w-5 text-purple-500" />}
                                  {task.type === "wellness" && <Heart className="h-5 w-5 text-pink-500" />}
                                  {task.type === "reflection" && <Brain className="h-5 w-5 text-indigo-500" />}
                                  {task.type === "organization" && <FolderKanban className="h-5 w-5 text-orange-500" />}
                                  {task.type === "planning" && <Calendar className="h-5 w-5 text-teal-500" />}
                                  {task.type === "learning" && <BookOpen className="h-5 w-5 text-emerald-500" />}
                                  {task.type === "emotional" && <HeartHandshake className="h-5 w-5 text-rose-500" />}
                                </div>
                                <div>
                                  <p
                                    className={`font-medium ${completedTasks.includes(index) ? "line-through opacity-70" : ""}`}
                                  >
                                    {task.title}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {task.type.charAt(0).toUpperCase() + task.type.slice(1)} • +{task.xp} XP
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant={completedTasks.includes(index) ? "outline" : "default"}
                                size="sm"
                                onClick={() => handleTaskComplete(index)}
                                disabled={completedTasks.includes(index)}
                              >
                                {completedTasks.includes(index) ? (
                                  <CheckCircle2 className="h-4 w-4 text-primary" />
                                ) : (
                                  "Complete"
                                )}
                              </Button>
                            </div>
                          </motion.div>
                        ))}

                        {moodTasks.length === 0 && (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">No tasks available for this mood.</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => setActiveTab("write")}>
                        Change Your Mood
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-1">
              <Card className="card-hover mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                    Emotion Graph
                  </CardTitle>
                  <CardDescription>Track your emotional wellbeing over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={emotionData}>
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 100]} hide />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="confidence"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          name="Confidence"
                        />
                        <Line
                          type="monotone"
                          dataKey="wellbeing"
                          stroke="hsl(var(--secondary))"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          name="Wellbeing"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-primary mr-2" />
                      <span className="text-sm">Confidence</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-secondary mr-2" />
                      <span className="text-sm">Wellbeing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="mr-2 h-5 w-5 text-primary" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors">
                      <h4 className="font-medium mb-1">Emotional Patterns</h4>
                      <p className="text-sm text-muted-foreground">
                        You tend to feel more energetic in the mornings. Consider scheduling creative tasks during this
                        time.
                      </p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors">
                      <h4 className="font-medium mb-1">Growth Opportunity</h4>
                      <p className="text-sm text-muted-foreground">
                        Your journal entries show strong technical reflection but could benefit from more emotional
                        awareness.
                      </p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors">
                      <h4 className="font-medium mb-1">Suggested Focus</h4>
                      <p className="text-sm text-muted-foreground">
                        Based on your recent entries, consider exploring team collaboration skills.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard">
                      View Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Confetti effect for completed tasks */}
      {showConfetti && (
        <div
          ref={confettiRef}
          className="fixed inset-0 pointer-events-none z-50"
          style={{
            background: "radial-gradient(circle, transparent 30%, rgba(0,0,0,0.1) 100%)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-6 py-3 rounded-full shadow-lg"
          >
            <div className="flex items-center">
              <Zap className="mr-2 h-5 w-5" />
              <span>+50 XP Earned!</span>
            </div>
          </motion.div>

          {/* Confetti particles */}
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                top: "50%",
                left: "50%",
                backgroundColor: [
                  "hsl(var(--primary))",
                  "hsl(var(--secondary))",
                  "hsl(var(--accent))",
                  "#FFD700",
                  "#FF6347",
                ][Math.floor(Math.random() * 5)],
              }}
              initial={{
                x: 0,
                y: 0,
                scale: 0,
              }}
              animate={{
                x: (Math.random() - 0.5) * window.innerWidth * 0.7,
                y: (Math.random() - 0.5) * window.innerHeight * 0.7,
                scale: Math.random() * 2 + 1,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
