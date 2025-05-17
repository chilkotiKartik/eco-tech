"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Rocket, Star, Zap, BookOpen, Heart, Brain, Lightbulb, Sparkles, Music, Code, Palette } from "lucide-react"

export function EnhancedWelcomeAnimation({ onComplete }) {
  const [animationStage, setAnimationStage] = useState(0)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Generate random particles
    const newParticles = []
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 10 + 5,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      })
    }
    setParticles(newParticles)

    // Animation sequence
    const stageTimers = [
      setTimeout(() => setAnimationStage(1), 1500),
      setTimeout(() => setAnimationStage(2), 3000),
      setTimeout(() => setAnimationStage(3), 4500),
      setTimeout(() => setAnimationStage(4), 6000),
      setTimeout(() => setAnimationStage(5), 7500),
      setTimeout(() => {
        onComplete()
      }, 9000),
    ]

    return () => stageTimers.forEach((timer) => clearTimeout(timer))
  }, [onComplete])

  const icons = [
    <Rocket key="rocket" className="h-6 w-6" />,
    <Star key="star" className="h-6 w-6" />,
    <Zap key="zap" className="h-6 w-6" />,
    <BookOpen key="book" className="h-6 w-6" />,
    <Heart key="heart" className="h-6 w-6" />,
    <Brain key="brain" className="h-6 w-6" />,
    <Lightbulb key="lightbulb" className="h-6 w-6" />,
    <Sparkles key="sparkles" className="h-6 w-6" />,
    <Music key="music" className="h-6 w-6" />,
    <Code key="code" className="h-6 w-6" />,
    <Palette key="palette" className="h-6 w-6" />,
  ]

  const careerIcons = [
    <Code key="code" className="h-10 w-10 text-blue-400" />,
    <Music key="music" className="h-10 w-10 text-purple-400" />,
    <Palette key="palette" className="h-10 w-10 text-orange-400" />,
    <Brain key="brain" className="h-10 w-10 text-green-400" />,
    <BookOpen key="book" className="h-10 w-10 text-red-400" />,
    <Rocket key="rocket" className="h-10 w-10 text-indigo-400" />,
  ]

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-violet-900 via-indigo-800 to-purple-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute text-white/30"
              initial={{
                x: particle.x,
                y: particle.y,
                scale: 0,
              }}
              animate={{
                y: [particle.y, particle.y - 300],
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0.5],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            >
              {icons[particle.id % icons.length]}
            </motion.div>
          ))}
        </div>

        <div className="relative flex flex-col items-center z-10">
          {/* Logo animation */}
          <motion.div
            className="mb-16 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute -inset-12 rounded-full bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 opacity-75 blur-lg"
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
            <div className="relative h-40 w-40 rounded-full bg-white p-4 shadow-xl">
              <motion.div
                className="h-full w-full rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="h-16 w-16 text-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Text animations */}
          <AnimatePresence mode="wait">
            {animationStage === 0 && (
              <motion.div
                key="welcome"
                className="text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="mb-2 text-6xl font-bold text-white">Welcome</h1>
              </motion.div>
            )}

            {animationStage === 1 && (
              <motion.div
                key="to"
                className="text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="mb-2 text-6xl font-bold text-white">to your</h1>
              </motion.div>
            )}

            {animationStage === 2 && (
              <motion.div
                key="growth"
                className="text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="mb-2 text-6xl font-bold text-white">Growth Space</h1>
              </motion.div>
            )}

            {animationStage === 3 && (
              <motion.div
                key="careers"
                className="text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-center gap-6 mb-8">
                  {careerIcons.map((icon, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/10 p-4 rounded-full backdrop-blur-sm"
                    >
                      {icon}
                    </motion.div>
                  ))}
                </div>
                <h1 className="mb-2 text-4xl font-bold text-white">Choose Your Path</h1>
              </motion.div>
            )}

            {animationStage === 4 && (
              <motion.div
                key="emotions"
                className="text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="flex justify-center gap-4 mb-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-5xl">😊</div>
                  <div className="text-5xl">😔</div>
                  <div className="text-5xl">🧠</div>
                  <div className="text-5xl">😴</div>
                  <div className="text-5xl">😰</div>
                </motion.div>
                <h1 className="mb-2 text-4xl font-bold text-white">Learn With Your Emotions</h1>
              </motion.div>
            )}

            {animationStage === 5 && (
              <motion.div
                key="final"
                className="text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="mb-2 text-6xl font-bold text-white">Em-Sphere</h1>
                <p className="mb-8 text-center text-2xl text-white/90">Your journey begins now</p>
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
    </AnimatePresence>
  )
}
