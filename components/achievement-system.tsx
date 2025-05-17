"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Zap, BookOpen, Users, Brain, Sparkles, Award } from "lucide-react"
import confetti from "canvas-confetti"

// Achievement definitions
const achievements = [
  {
    id: "first_login",
    title: "First Steps",
    description: "Log in to the platform for the first time",
    icon: <Trophy className="h-5 w-5 text-yellow-500" />,
    type: "milestone",
    xp: 50,
  },
  {
    id: "profile_complete",
    title: "Identity Established",
    description: "Complete your profile information",
    icon: <Star className="h-5 w-5 text-blue-500" />,
    type: "milestone",
    xp: 100,
  },
  {
    id: "first_course",
    title: "Learning Begins",
    description: "Start your first course",
    icon: <BookOpen className="h-5 w-5 text-green-500" />,
    type: "milestone",
    xp: 75,
  },
  {
    id: "first_team",
    title: "Team Player",
    description: "Join your first team",
    icon: <Users className="h-5 w-5 text-purple-500" />,
    type: "milestone",
    xp: 100,
  },
  {
    id: "first_mentor",
    title: "Guided Path",
    description: "Connect with your first mentor",
    icon: <Brain className="h-5 w-5 text-indigo-500" />,
    type: "milestone",
    xp: 125,
  },
  {
    id: "first_mission",
    title: "Mission Accepted",
    description: "Complete your first mission",
    icon: <Zap className="h-5 w-5 text-orange-500" />,
    type: "milestone",
    xp: 150,
  },
  {
    id: "first_journal",
    title: "Reflective Mind",
    description: "Write your first journal entry",
    icon: <Sparkles className="h-5 w-5 text-pink-500" />,
    type: "milestone",
    xp: 75,
  },
]

export function AchievementSystem() {
  const [unlockedAchievements, setUnlockedAchievements] = useState([])
  const [recentAchievement, setRecentAchievement] = useState(null)
  const [showNotification, setShowNotification] = useState(false)
  const confettiRef = useRef(null)

  // Check for achievements on mount
  useEffect(() => {
    // In a real app, this would check against user data
    // For demo purposes, we'll unlock some achievements automatically
    const storedAchievements = localStorage.getItem("achievements")
    if (storedAchievements) {
      setUnlockedAchievements(JSON.parse(storedAchievements))
    } else {
      // Unlock first login achievement automatically
      unlockAchievement("first_login")
    }

    // Check URL to determine if we should unlock other achievements
    const pathname = window.location.pathname
    if (pathname.includes("/journal") && !isAchievementUnlocked("first_journal")) {
      setTimeout(() => unlockAchievement("first_journal"), 2000)
    }
    if (pathname.includes("/teams") && !isAchievementUnlocked("first_team")) {
      setTimeout(() => unlockAchievement("first_team"), 2000)
    }
    if (pathname.includes("/mentors") && !isAchievementUnlocked("first_mentor")) {
      setTimeout(() => unlockAchievement("first_mentor"), 2000)
    }
    if (pathname.includes("/missions") && !isAchievementUnlocked("first_mission")) {
      setTimeout(() => unlockAchievement("first_mission"), 2000)
    }
  }, [])

  // Check if achievement is unlocked
  const isAchievementUnlocked = (achievementId) => {
    return unlockedAchievements.includes(achievementId)
  }

  // Unlock achievement
  const unlockAchievement = (achievementId) => {
    if (isAchievementUnlocked(achievementId)) {
      return
    }

    const achievement = achievements.find((a) => a.id === achievementId)
    if (!achievement) {
      return
    }

    // Add to unlocked achievements
    const newUnlocked = [...unlockedAchievements, achievementId]
    setUnlockedAchievements(newUnlocked)
    localStorage.setItem("achievements", JSON.stringify(newUnlocked))

    // Show notification
    setRecentAchievement(achievement)
    setShowNotification(true)

    // Trigger confetti
    if (confettiRef.current) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }

    // Hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false)
    }, 5000)
  }

  // Calculate level based on XP
  const calculateLevel = () => {
    const totalXp = unlockedAchievements.reduce((total, achievementId) => {
      const achievement = achievements.find((a) => a.id === achievementId)
      return total + (achievement?.xp || 0)
    }, 0)

    // Simple level calculation: 100 XP per level
    return Math.floor(totalXp / 100) + 1
  }

  // Calculate progress to next level
  const calculateProgress = () => {
    const totalXp = unlockedAchievements.reduce((total, achievementId) => {
      const achievement = achievements.find((a) => a.id === achievementId)
      return total + (achievement?.xp || 0)
    }, 0)

    const level = calculateLevel()
    const xpForCurrentLevel = (level - 1) * 100
    const xpForNextLevel = level * 100
    const xpProgress = totalXp - xpForCurrentLevel
    const xpNeeded = xpForNextLevel - xpForCurrentLevel

    return (xpProgress / xpNeeded) * 100
  }

  return (
    <div ref={confettiRef}>
      <AnimatePresence>
        {showNotification && recentAchievement && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-1/2 z-50 transform -translate-x-1/2"
          >
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10 animate-pulse-slow">{recentAchievement.icon}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-yellow-500 text-white">Achievement Unlocked!</Badge>
                      <Badge variant="outline">+{recentAchievement.xp} XP</Badge>
                    </div>
                    <h3 className="font-bold text-lg">{recentAchievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{recentAchievement.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed top-20 right-4 z-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-2 border-primary/20 shadow-lg">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-yellow-500 text-xs flex items-center justify-center text-white font-bold">
                    {unlockedAchievements.length}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">Level {calculateLevel()}</span>
                    <Badge variant="outline" className="text-xs">
                      {unlockedAchievements.reduce((total, achievementId) => {
                        const achievement = achievements.find((a) => a.id === achievementId)
                        return total + (achievement?.xp || 0)
                      }, 0)}{" "}
                      XP
                    </Badge>
                  </div>
                  <Progress value={calculateProgress()} className="h-1.5 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
