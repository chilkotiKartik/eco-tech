"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useAuth } from "./auth-provider"
import { Sparkles, Rocket, Star, Zap, BookOpen, Heart, Brain, Lightbulb } from "lucide-react"

export function WelcomeAnimation() {
  const [showAnimation, setShowAnimation] = useState(true)
  const [animationStage, setAnimationStage] = useState(0)
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    // Check if this is the first visit
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore")

    if (hasVisitedBefore === "true") {
      setShowAnimation(false)
      return
    }

    // Animation sequence
    const stageTimers = [
      setTimeout(() => setAnimationStage(1), 1500),
      setTimeout(() => setAnimationStage(2), 3000),
      
      setTimeout(() => {
        setShowAnimation(false)
        localStorage.setItem("hasVisitedBefore", "true")
      }, 6000),
    ]

    return () => stageTimers.forEach((timer) => clearTimeout(timer))
  }, [])

  if (!showAnimation) return null

  const icons = [
    <Rocket key="rocket" className="h-6 w-6" />,
    <Star key="star" className="h-6 w-6" />,
    <Zap key="zap" className="h-6 w-6" />,
    <BookOpen key="book" className="h-6 w-6" />,
    <Heart key="heart" className="h-6 w-6" />,
    <Brain key="brain" className="h-6 w-6" />,
    <Lightbulb key="lightbulb" className="h-6 w-6" />,
    <Sparkles key="sparkles" className="h-6 w-6" />,
  ]

  return (
    <AnimatePresence>
      {showAnimation && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary/90 via-secondary/80 to-accent/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative flex flex-col items-center">
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-white/30"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    scale: Math.random() * 0.5 + 0.5,
                  }}
                  animate={{
                    y: [null, Math.random() * -100 - 50],
                    opacity: [0, 0.7, 0],
                  }}
                  transition={{
                    duration: Math.random() * 2 + 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                >
                  {icons[i % icons.length]}
                </motion.div>
              ))}
            </div>

            {/* Logo animation */}
            <motion.div
              className="mb-8 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="absolute -inset-8 rounded-full bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 opacity-75 blur-lg"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.9, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <div className="relative h-32 w-32 rounded-full bg-white p-4 shadow-xl">
                <motion.div
                  className="h-full w-full rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Rocket className="h-12 w-12 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Text animations */}
            <AnimatePresence mode="wait">
              {animationStage === 0 && (
                <motion.h1
                  key="welcome"
                  className="mb-2 text-4xl font-bold text-white"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Welcome
                </motion.h1>
              )}

              {animationStage === 1 && (
                <motion.h1
                  key="to"
                  className="mb-2 text-4xl font-bold text-white"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  to your
                </motion.h1>
              )}

              {animationStage === 2 && (
                <motion.h1
                  key="growth"
                  className="mb-2 text-4xl font-bold text-white"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Growth Space
                </motion.h1>
              )}

              {animationStage === 3 && (
                <motion.div
                  key="final"
                  className="text-center"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="mb-2 text-4xl font-bold text-white">Growth Space</h1>
                  <p className="mb-8 text-center text-xl text-white/90">Your journey begins now</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading dots */}
            <motion.div
              className="flex space-x-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  className="h-3 w-3 rounded-full bg-white"
                  animate={{
                    y: [-5, 5, -5],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
