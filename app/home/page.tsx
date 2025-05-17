"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { VoiceGuide } from "@/components/voice-guide"
import { Sparkles, Code, Music, Palette, Brain, BookOpen, Users, Rocket, ArrowRight, Github, Mail } from "lucide-react"

const inspirationalQuotes = [
  "The future belongs to those who believe in the beauty of their dreams.",
  "Education is not the filling of a pail, but the lighting of a fire.",
  "The only way to do great work is to love what you do.",
  "Your attitude, not your aptitude, will determine your altitude.",
  "The best way to predict the future is to create it.",
]

const careerPaths = [
  {
    id: "developer",
    name: "Developer",
    icon: <Code className="h-8 w-8" />,
    description: "Master coding, build applications, and shape the digital world",
    color: "from-blue-500 to-cyan-400",
    skills: ["JavaScript", "React", "Node.js", "Python", "Database Design"],
  },
  {
    id: "musician",
    name: "Musician",
    icon: <Music className="h-8 w-8" />,
    description: "Compose, perform, and produce music across various genres",
    color: "from-purple-500 to-pink-400",
    skills: ["Music Theory", "Composition", "Performance", "Production", "Arrangement"],
  },
  {
    id: "artist",
    name: "Artist",
    icon: <Palette className="h-8 w-8" />,
    description: "Create visual art, illustrations, and designs that inspire",
    color: "from-orange-500 to-yellow-400",
    skills: ["Drawing", "Painting", "Digital Art", "Color Theory", "Composition"],
  },
  {
    id: "researcher",
    name: "Researcher",
    icon: <Brain className="h-8 w-8" />,
    description: "Explore, analyze, and discover new knowledge in your field",
    color: "from-green-500 to-emerald-400",
    skills: ["Research Methods", "Data Analysis", "Critical Thinking", "Academic Writing", "Statistics"],
  },
  {
    id: "educator",
    name: "Educator",
    icon: <BookOpen className="h-8 w-8" />,
    description: "Teach, mentor, and inspire the next generation of learners",
    color: "from-red-500 to-orange-400",
    skills: ["Pedagogy", "Curriculum Design", "Assessment", "Educational Technology", "Communication"],
  },
  {
    id: "entrepreneur",
    name: "Entrepreneur",
    icon: <Rocket className="h-8 w-8" />,
    description: "Build ventures, innovate, and create value in the market",
    color: "from-indigo-500 to-blue-400",
    skills: ["Business Strategy", "Marketing", "Finance", "Leadership", "Innovation"],
  },
]

export default function HomePage() {
  const [quote, setQuote] = useState(inspirationalQuotes[0])
  const [showVoiceGuide, setShowVoiceGuide] = useState(false)
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Rotate quotes
    const quoteInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * inspirationalQuotes.length)
      setQuote(inspirationalQuotes[randomIndex])
    }, 8000)

    // Show voice guide after 2 seconds
    const voiceGuideTimer = setTimeout(() => {
      setShowVoiceGuide(true)
    }, 2000)

    return () => {
      clearInterval(quoteInterval)
      clearTimeout(voiceGuideTimer)
    }
  }, [])

  const handleCareerSelect = (careerId: string) => {
    setSelectedCareer(careerId)
    localStorage.setItem("selectedCareer", careerId)
  }

  const handleGetStarted = () => {
    if (selectedCareer) {
      router.push(`/login?career=${selectedCareer}`)
    } else {
      router.push("/login")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-indigo-800 to-purple-900 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 15 + 5 + "px",
                height: Math.random() * 15 + 5 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-70 blur-lg" />
              <div className="absolute inset-2 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 mb-6">
            Em-Sphere
          </h1>

          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-8"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            Where Emotions Meet Learning
          </motion.p>

          <motion.p
            className="text-lg text-white/80 max-w-2xl mx-auto mb-12 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            "{quote}"
          </motion.p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => router.push("/about")}
            >
              Learn More
            </Button>
          </div>
        </motion.div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Choose Your Career Path</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerPaths.map((career) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: careerPaths.indexOf(career) * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`cursor-pointer ${selectedCareer === career.id ? "ring-4 ring-white/30" : ""}`}
                onClick={() => handleCareerSelect(career.id)}
              >
                <Card className="bg-black/30 backdrop-blur-md border-white/10 overflow-hidden h-full">
                  <div className={`h-2 bg-gradient-to-r ${career.color}`}></div>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className={`p-4 rounded-full bg-gradient-to-r ${career.color} mb-4`}>{career.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{career.name}</h3>
                      <p className="text-white/70 mb-4">{career.description}</p>
                      <div className="flex flex-wrap justify-center gap-2 mt-auto">
                        {career.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Why Em-Sphere?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Emotional Learning",
                description: "Learn based on your emotional state for maximum effectiveness",
                icon: <Brain className="h-10 w-10" />,
                color: "from-blue-500 to-cyan-400",
              },
              {
                title: "Career-Specific",
                description: "Personalized content tailored to your career path",
                icon: <Rocket className="h-10 w-10" />,
                color: "from-purple-500 to-pink-400",
              },
              {
                title: "AI Guidance",
                description: "Intelligent voice assistant to help you on your journey",
                icon: <Sparkles className="h-10 w-10" />,
                color: "from-green-500 to-emerald-400",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index + 0.5 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/15 border border-white/10"
              >
                <div
                  className={`p-4 rounded-full bg-gradient-to-r ${feature.color} mx-auto mb-4 w-20 h-20 flex items-center justify-center`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Join Our Community</h2>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Mail className="mr-2 h-5 w-5" />
              Newsletter
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Users className="mr-2 h-5 w-5" />
              Community
            </Button>
          </div>
        </div>
      </div>

      {/* Voice Guide */}
      {showVoiceGuide && (
        <VoiceGuide
          message="Welcome to Em-Sphere! I'm your AI guide. Choose a career path to get personalized learning content, or click Get Started to begin your journey."
          onClose={() => setShowVoiceGuide(false)}
        />
      )}
    </div>
  )
}
