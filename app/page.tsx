"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { EnhancedWelcomeAnimation } from "@/components/enhanced-welcome-animation"
import { VoiceGuide } from "@/components/voice-guide"
import {
  Sparkles,
  Code,
  Music,
  Palette,
  Brain,
  BookOpen,
  Users,
  Rocket,
  ArrowRight,
  Github,
  Mail,
  Star,
  CheckCircle,
  Briefcase,
  Zap,
  Heart,
  Lightbulb,
} from "lucide-react"

const inspirationalQuotes = [
  "The future belongs to those who believe in the beauty of their dreams.",
  "Education is not the filling of a pail, but the lighting of a fire.",
  "The only way to do great work is to love what you do.",
  "Your attitude, not your aptitude, will determine your altitude.",
  "The best way to predict the future is to create it.",
  "Learning is a treasure that will follow its owner everywhere.",
  "The mind is not a vessel to be filled, but a fire to be kindled.",
  "The beautiful thing about learning is that no one can take it away from you.",
]

const careerPaths = [
  {
    id: "developer",
    name: "Developer",
    icon: <Code className="h-8 w-8" />,
    description: "Master coding, build applications, and shape the digital world",
    color: "from-blue-500 to-cyan-400",
    skills: ["JavaScript", "React", "Node.js", "Python", "Database Design"],
    tasks: [
      "Build responsive web applications",
      "Debug complex code issues",
      "Design efficient algorithms",
      "Collaborate with cross-functional teams",
      "Implement security best practices",
    ],
  },
  {
    id: "musician",
    name: "Musician",
    icon: <Music className="h-8 w-8" />,
    description: "Compose, perform, and produce music across various genres",
    color: "from-purple-500 to-pink-400",
    skills: ["Music Theory", "Composition", "Performance", "Production", "Arrangement"],
    tasks: [
      "Compose original music pieces",
      "Record and mix audio tracks",
      "Perform live for audiences",
      "Collaborate with other musicians",
      "Master instruments and vocal techniques",
    ],
  },
  {
    id: "artist",
    name: "Artist",
    icon: <Palette className="h-8 w-8" />,
    description: "Create visual art, illustrations, and designs that inspire",
    color: "from-orange-500 to-yellow-400",
    skills: ["Drawing", "Painting", "Digital Art", "Color Theory", "Composition"],
    tasks: [
      "Create concept art for projects",
      "Design visual identities for brands",
      "Illustrate books and publications",
      "Develop artistic portfolios",
      "Exhibit work in galleries and online",
    ],
  },
  {
    id: "researcher",
    name: "Researcher",
    icon: <Brain className="h-8 w-8" />,
    description: "Explore, analyze, and discover new knowledge in your field",
    color: "from-green-500 to-emerald-400",
    skills: ["Research Methods", "Data Analysis", "Critical Thinking", "Academic Writing", "Statistics"],
    tasks: [
      "Design and conduct experiments",
      "Analyze complex datasets",
      "Publish findings in journals",
      "Present at conferences",
      "Collaborate on interdisciplinary projects",
    ],
  },
  {
    id: "educator",
    name: "Educator",
    icon: <BookOpen className="h-8 w-8" />,
    description: "Teach, mentor, and inspire the next generation of learners",
    color: "from-red-500 to-orange-400",
    skills: ["Pedagogy", "Curriculum Design", "Assessment", "Educational Technology", "Communication"],
    tasks: [
      "Develop engaging lesson plans",
      "Assess student learning progress",
      "Create inclusive learning environments",
      "Implement educational technologies",
      "Mentor students in their growth journey",
    ],
  },
  {
    id: "entrepreneur",
    name: "Entrepreneur",
    icon: <Rocket className="h-8 w-8" />,
    description: "Build ventures, innovate, and create value in the market",
    color: "from-indigo-500 to-blue-400",
    skills: ["Business Strategy", "Marketing", "Finance", "Leadership", "Innovation"],
    tasks: [
      "Identify market opportunities",
      "Develop business models",
      "Pitch to investors and partners",
      "Build and lead effective teams",
      "Scale operations for growth",
    ],
  },
]

const testimonials = [
  {
    name: "Alex Chen",
    role: "Software Developer",
    image: "/placeholder.svg?height=80&width=80",
    quote:
      "Em-Sphere completely transformed my learning journey. The emotion-based approach helped me overcome coding challenges I'd been stuck on for months!",
    career: "developer",
    rating: 5,
  },
  {
    name: "Maya Johnson",
    role: "Music Producer",
    image: "/placeholder.svg?height=80&width=80",
    quote:
      "As a musician, I love how the platform adapts to my creative moods. The career-specific tasks have given me real-world experience I couldn't get elsewhere.",
    career: "musician",
    rating: 5,
  },
  {
    name: "Jamal Williams",
    role: "Digital Artist",
    image: "/placeholder.svg?height=80&width=80",
    quote:
      "The AI mentors understand exactly when I need technical guidance versus creative encouragement. It's like having a studio of professional artists guiding me.",
    career: "artist",
    rating: 4,
  },
  {
    name: "Dr. Sarah Kim",
    role: "Research Scientist",
    image: "/placeholder.svg?height=80&width=80",
    quote:
      "The platform's ability to adapt to my analytical moods has significantly improved my research productivity. The data visualization tools are exceptional.",
    career: "researcher",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "High School Teacher",
    image: "/placeholder.svg?height=80&width=80",
    quote:
      "Em-Sphere has revolutionized how I approach education. The emotional intelligence features have helped me better connect with my students.",
    career: "educator",
    rating: 4,
  },
  {
    name: "Priya Patel",
    role: "Tech Startup Founder",
    image: "/placeholder.svg?height=80&width=80",
    quote:
      "The entrepreneurship simulations prepared me for real-world challenges in ways traditional education never could. The mood-based learning paths are brilliant.",
    career: "entrepreneur",
    rating: 5,
  },
]

const features = [
  {
    title: "Emotional Learning",
    description: "Adaptive content based on your emotional state for maximum effectiveness",
    icon: <Heart className="h-10 w-10" />,
    color: "from-pink-500 to-rose-400",
    details: [
      "Mood detection through text and voice analysis",
      "Personalized learning paths based on emotional state",
      "Adaptive difficulty based on confidence levels",
      "Emotional intelligence development exercises",
    ],
  },
  {
    title: "Career Simulation",
    description: "Experience real-world scenarios tailored to your career path",
    icon: <Briefcase className="h-10 w-10" />,
    color: "from-blue-500 to-indigo-400",
    details: [
      "Industry-specific micro-tasks and challenges",
      "Virtual mentorship from career professionals",
      "Portfolio-building projects with feedback",
      "Networking opportunities with peers and experts",
    ],
  },
  {
    title: "AI Guidance",
    description: "Intelligent assistance that adapts to your learning style and needs",
    icon: <Sparkles className="h-10 w-10" />,
    color: "from-violet-500 to-purple-400",
    details: [
      "Personalized learning recommendations",
      "24/7 AI mentorship and support",
      "Adaptive feedback on your progress",
      "Custom resource curation based on your goals",
    ],
  },
  {
    title: "Skill Visualization",
    description: "Track and visualize your growth across different skill domains",
    icon: <Zap className="h-10 w-10" />,
    color: "from-amber-500 to-orange-400",
    details: [
      "Interactive skill trees and growth maps",
      "Progress tracking with detailed analytics",
      "Skill gap identification and recommendations",
      "Achievement system with meaningful milestones",
    ],
  },
  {
    title: "Community Learning",
    description: "Connect with peers and mentors in collaborative learning spaces",
    icon: <Users className="h-10 w-10" />,
    color: "from-emerald-500 to-green-400",
    details: [
      "Peer-to-peer learning and feedback",
      "Collaborative projects and challenges",
      "Community events and workshops",
      "Mentorship matching based on goals and skills",
    ],
  },
  {
    title: "Insight Generation",
    description: "Gain deep insights into your learning patterns and opportunities",
    icon: <Lightbulb className="h-10 w-10" />,
    color: "from-cyan-500 to-teal-400",
    details: [
      "Learning style analysis and recommendations",
      "Productivity pattern identification",
      "Personalized growth opportunities",
      "Long-term career path visualization",
    ],
  },
]

export default function HomePage() {
  const [quote, setQuote] = useState(inspirationalQuotes[0])
  const [showVoiceGuide, setShowVoiceGuide] = useState(false)
  const [selectedCareer, setSelectedCareer] = useState(null)
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(true)
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [filteredTestimonials, setFilteredTestimonials] = useState(testimonials)
  const router = useRouter()

  useEffect(() => {
    // Rotate quotes
    const quoteInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * inspirationalQuotes.length)
      setQuote(inspirationalQuotes[randomIndex])
    }, 8000)

    // Show voice guide after welcome animation
    const voiceGuideTimer = setTimeout(() => {
      setShowVoiceGuide(true)
    }, 6000)

    // Check if user has visited before
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore")
    if (hasVisitedBefore === "true") {
      setShowWelcomeAnimation(false)
    }

    return () => {
      clearInterval(quoteInterval)
      clearTimeout(voiceGuideTimer)
    }
  }, [])

  const handleCareerSelect = (career) => {
    setSelectedCareer(career)
    localStorage.setItem("selectedCareer", career.id)

    // Filter testimonials based on selected career
    if (career) {
      setFilteredTestimonials(testimonials.filter((t) => t.career === career.id))
    } else {
      setFilteredTestimonials(testimonials)
    }
  }

  const handleFeatureSelect = (feature) => {
    setSelectedFeature(feature)
  }

  const handleGetStarted = () => {
    if (selectedCareer) {
      router.push(`/dashboard?career=${selectedCareer.id}`)
    } else {
      router.push("/dashboard")
    }
  }

  const handleWelcomeComplete = () => {
    setShowWelcomeAnimation(false)
    localStorage.setItem("hasVisitedBefore", "true")
  }

  return (
    <>
      {showWelcomeAnimation && <EnhancedWelcomeAnimation onComplete={handleWelcomeComplete} />}

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
                  className={`cursor-pointer ${selectedCareer?.id === career.id ? "ring-4 ring-white/30" : ""}`}
                  onClick={() => handleCareerSelect(career)}
                >
                  <Card className="bg-black/30 backdrop-blur-md border-white/10 overflow-hidden h-full">
                    <div className={`h-2 bg-gradient-to-r ${career.color}`}></div>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className={`p-4 rounded-full bg-gradient-to-r ${career.color} mb-4`}>{career.icon}</div>
                        <h3 className="text-xl font-bold text-white mb-2">{career.name}</h3>
                        <p className="text-white/70 mb-4">{career.description}</p>

                        <AnimatePresence>
                          {selectedCareer?.id === career.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="w-full"
                            >
                              <div className="mt-4 border-t border-white/10 pt-4">
                                <h4 className="text-sm font-medium text-white/80 mb-2">Key Tasks:</h4>
                                <ul className="space-y-1 text-left">
                                  {career.tasks.map((task, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                      <span>{task}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="flex flex-wrap justify-center gap-2 mt-4">
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

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Platform Features</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * index + 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`cursor-pointer ${selectedFeature?.title === feature.title ? "ring-4 ring-white/30" : ""}`}
                  onClick={() => handleFeatureSelect(feature)}
                >
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/15 border border-white/10 h-full">
                    <div
                      className={`p-4 rounded-full bg-gradient-to-r ${feature.color} mx-auto mb-4 w-20 h-20 flex items-center justify-center`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 text-center">{feature.title}</h3>
                    <p className="text-white/80 text-center mb-4">{feature.description}</p>

                    <AnimatePresence>
                      {selectedFeature?.title === feature.title && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="w-full"
                        >
                          <div className="mt-4 border-t border-white/10 pt-4">
                            <ul className="space-y-1">
                              {feature.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-white/70">
                                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-8">What Our Users Say</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTestimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/10"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gradient-to-br from-purple-500 to-pink-500">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-white/70">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-white/80 italic">"{testimonial.quote}"</p>
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
        {showVoiceGuide && !showWelcomeAnimation && (
          <VoiceGuide
            message="Welcome to Em-Sphere! I'm your AI guide. Choose a career path to get personalized learning content tailored to your goals. Our platform adapts to your emotional state to optimize your learning experience."
            onClose={() => setShowVoiceGuide(false)}
          />
        )}
      </div>
    </>
  )
}
