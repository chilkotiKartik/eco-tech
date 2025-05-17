"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Palette, Code, Music, Users, Zap, Rocket, Brain, Puzzle, Atom } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEmotion } from "./emotion-provider"
import { useAuth } from "./auth-provider"

type CreativeItem = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  category: "tech" | "art" | "social" | "learning" | "innovation"
  color: string
  animation: string
}

const creativeItems: CreativeItem[] = [
  {
    id: "creative-coding",
    title: "Creative Coding Challenge",
    description: "Build something beautiful with code. Combine art and technology to create interactive experiences.",
    icon: <Code className="h-6 w-6" />,
    category: "tech",
    color: "from-blue-500 to-purple-600",
    animation: "animate-float",
  },
  {
    id: "visual-storytelling",
    title: "Visual Storytelling",
    description: "Create a visual narrative that expresses a complex emotion or concept without words.",
    icon: <Palette className="h-6 w-6" />,
    category: "art",
    color: "from-pink-500 to-orange-400",
    animation: "animate-pulse-light",
  },
  {
    id: "collaborative-music",
    title: "Collaborative Music",
    description: "Start a musical piece and invite others to add their own elements to create something unique.",
    icon: <Music className="h-6 w-6" />,
    category: "social",
    color: "from-green-500 to-teal-400",
    animation: "animate-bounce-light",
  },
  {
    id: "thought-experiment",
    title: "Thought Experiment",
    description: "Explore a philosophical question through a creative thought experiment.",
    icon: <Brain className="h-6 w-6" />,
    category: "learning",
    color: "from-indigo-500 to-blue-600",
    animation: "animate-spin-slow",
  },
  {
    id: "innovation-sprint",
    title: "Innovation Sprint",
    description: "Rapidly prototype a solution to a real-world problem in just 24 hours.",
    icon: <Rocket className="h-6 w-6" />,
    category: "innovation",
    color: "from-red-500 to-amber-500",
    animation: "animate-wave",
  },
  {
    id: "puzzle-design",
    title: "Puzzle Design Challenge",
    description: "Create an original puzzle or brain teaser that challenges conventional thinking.",
    icon: <Puzzle className="h-6 w-6" />,
    category: "learning",
    color: "from-violet-500 to-purple-600",
    animation: "animate-float",
  },
  {
    id: "quantum-concepts",
    title: "Quantum Concepts Visualization",
    description: "Create a visual representation of a complex quantum physics concept.",
    icon: <Atom className="h-6 w-6" />,
    category: "tech",
    color: "from-cyan-500 to-blue-600",
    animation: "animate-spin-slow",
  },
  {
    id: "community-project",
    title: "Community Impact Project",
    description: "Design a project that brings people together to solve a local community challenge.",
    icon: <Users className="h-6 w-6" />,
    category: "social",
    color: "from-emerald-500 to-green-600",
    animation: "animate-pulse-light",
  },
]

export function MagicBox() {
  const [selectedItems, setSelectedItems] = useState<CreativeItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)
  const { currentEmotion } = useEmotion()
  const { user } = useAuth()

  // Get recommended items based on user's current emotion
  useEffect(() => {
    if (currentEmotion) {
      let recommendedCategory: string

      switch (currentEmotion) {
        case "happy":
          recommendedCategory = "social"
          break
        case "sad":
          recommendedCategory = "art"
          break
        case "angry":
          recommendedCategory = "learning"
          break
        case "anxious":
          recommendedCategory = "tech"
          break
        default:
          recommendedCategory = "innovation"
      }

      setCurrentCategory(recommendedCategory)
    }
  }, [currentEmotion])

  const toggleMagicBox = () => {
    setIsOpen(!isOpen)

    if (!isOpen) {
      // When opening, select 3 random items with preference to the current category
      const categoryItems = creativeItems.filter((item) => item.category === currentCategory)
      const otherItems = creativeItems.filter((item) => item.category !== currentCategory)

      // Shuffle arrays
      const shuffledCategory = [...categoryItems].sort(() => Math.random() - 0.5)
      const shuffledOther = [...otherItems].sort(() => Math.random() - 0.5)

      // Take 2 from category and 1 from others
      const selected = [...shuffledCategory.slice(0, 2), ...shuffledOther.slice(0, 1)].sort(() => Math.random() - 0.5)

      setSelectedItems(selected)
    }
  }

  const selectItem = (item: CreativeItem) => {
    // Here you would implement the logic to "use" the creative item
    // For now, we'll just close the magic box
    setIsOpen(false)

    // You could also trigger some notification or add to user's activities
    console.log(`Selected creative item: ${item.title}`)
  }

  return (
    <div className="relative">
      <Button
        onClick={toggleMagicBox}
        className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 p-1 text-white transition-all hover:shadow-lg"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-primary-600 via-accent-600 to-secondary-600 opacity-0 transition-opacity group-hover:opacity-100"></span>
        <span className="relative flex items-center gap-2 rounded-full bg-background/10 px-4 py-2 backdrop-blur-sm">
          <Sparkles className="h-5 w-5 animate-pulse-light" />
          Magic Box
        </span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full z-50 mt-2 w-[350px] origin-top-right"
          >
            <Card className="overflow-hidden border-2 border-primary-200 bg-white/95 shadow-xl backdrop-blur-sm dark:border-primary-800 dark:bg-gray-950/95">
              <CardHeader className="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 pb-2">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Sparkles className="h-5 w-5 text-primary-500" />
                  Creative Inspiration
                </CardTitle>
                <CardDescription>Discover creative challenges tailored to your current mood</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 p-4">
                {selectedItems.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    className={`${item.animation} cursor-pointer rounded-lg bg-gradient-to-r ${item.color} p-0.5 shadow-md transition-all hover:shadow-lg`}
                    onClick={() => selectItem(item)}
                  >
                    <div className="rounded-[7px] bg-white p-3 dark:bg-gray-900">
                      <div className="flex items-start gap-3">
                        <div className={`rounded-full bg-gradient-to-r ${item.color} p-2 text-white`}>{item.icon}</div>
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
              <CardFooter className="flex justify-between bg-gradient-to-r from-primary-500/10 to-secondary-500/10 px-4 py-2">
                <Button variant="ghost" size="sm" onClick={() => toggleMagicBox()}>
                  Close
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Refresh the suggestions
                    const shuffled = [...creativeItems].sort(() => Math.random() - 0.5)
                    setSelectedItems(shuffled.slice(0, 3))
                  }}
                  className="gap-1"
                >
                  <Zap className="h-4 w-4" />
                  Refresh
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
