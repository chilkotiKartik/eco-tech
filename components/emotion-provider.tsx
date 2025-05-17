"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"

// Define the Emotion Context type
interface EmotionContextType {
  currentEmotion: string
  currentTheme: string
  getEmotionFromInput: (input: string) => string
  analyzeEmotionalState: (journalEntries: any[]) => any
  getMoodBasedRecommendations: (mood: string) => string[]
  getMoodBasedTasks: (mood: string) => any[]
  getMoodBasedMotivation: (mood: string) => string
  setEmotionMode: (mode: string) => void
}

// Create the Emotion Context
const EmotionContext = createContext<EmotionContextType | undefined>(undefined)

// Emotion Provider Component
export function EmotionProvider({ children }) {
  const { user } = useAuth()
  const [currentEmotion, setCurrentEmotion] = useState("neutral")
  const [currentTheme, setCurrentTheme] = useState("neutral")

  // Update emotion based on user mood
  useEffect(() => {
    if (user?.mood) {
      setCurrentEmotion(user.mood)
      setEmotionMode(user.mood)
    }
  }, [user?.mood])

  // Function to detect emotion from text input
  const getEmotionFromInput = (input: string): string => {
    const lowerInput = input.toLowerCase()

    // Simple keyword-based emotion detection
    if (
      lowerInput.includes("happy") ||
      lowerInput.includes("joy") ||
      lowerInput.includes("excited") ||
      lowerInput.includes("great") ||
      lowerInput.includes("wonderful") ||
      lowerInput.includes("amazing")
    ) {
      return "happy"
    }

    if (
      lowerInput.includes("focus") ||
      lowerInput.includes("concentrate") ||
      lowerInput.includes("productive") ||
      lowerInput.includes("determined") ||
      lowerInput.includes("engaged")
    ) {
      return "focused"
    }

    if (
      lowerInput.includes("tired") ||
      lowerInput.includes("exhausted") ||
      lowerInput.includes("fatigue") ||
      lowerInput.includes("sleepy") ||
      lowerInput.includes("drained")
    ) {
      return "tired"
    }

    if (
      lowerInput.includes("sad") ||
      lowerInput.includes("depressed") ||
      lowerInput.includes("down") ||
      lowerInput.includes("unhappy") ||
      lowerInput.includes("miserable") ||
      lowerInput.includes("blue")
    ) {
      return "sad"
    }

    if (
      lowerInput.includes("anxious") ||
      lowerInput.includes("worried") ||
      lowerInput.includes("stress") ||
      lowerInput.includes("nervous") ||
      lowerInput.includes("uneasy") ||
      lowerInput.includes("fear")
    ) {
      return "anxious"
    }

    return "neutral"
  }

  // Function to analyze emotional state from journal entries
  const analyzeEmotionalState = (journalEntries: any[]) => {
    if (!journalEntries || journalEntries.length === 0) {
      return {
        primaryEmotion: "neutral",
        emotionalTrends: [],
        recommendations: [],
      }
    }

    // Count emotions
    const emotionCounts = {}
    journalEntries.forEach((entry) => {
      const emotion = entry.mood || "neutral"
      emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1
    })

    // Find primary emotion
    let primaryEmotion = "neutral"
    let maxCount = 0

    Object.entries(emotionCounts).forEach(([emotion, count]) => {
      if (count > maxCount) {
        primaryEmotion = emotion
        maxCount = count as number
      }
    })

    // Generate emotional trends (simplified)
    const emotionalTrends = [
      {
        trend: "Weekly Pattern",
        description: "You tend to feel more energetic in the mornings and more reflective in the evenings.",
      },
      {
        trend: "Growth Areas",
        description: "Your entries show strong technical reflection but could benefit from more emotional awareness.",
      },
    ]

    // Generate recommendations based on primary emotion
    const recommendations = getMoodBasedRecommendations(primaryEmotion)

    return {
      primaryEmotion,
      emotionalTrends,
      recommendations,
    }
  }

  // Function to get mood-based recommendations
  const getMoodBasedRecommendations = (mood: string) => {
    const recommendations = {
      happy: [
        "This is a great time to tackle challenging projects that require creativity",
        "Consider mentoring others or contributing to community projects",
        "Document your positive experiences to reference during challenging times",
      ],
      sad: [
        "Take short breaks using the Pomodoro technique (25 min work, 5 min rest)",
        "Switch to less demanding tasks like documentation or planning",
        "Consider a brief meditation or power nap to restore energy",
      ],
      focused: [
        "Ideal time for deep work on complex technical problems",
        "Schedule uninterrupted blocks of time for coding or learning",
        "Set specific, measurable goals for your focused session",
      ],
      tired: [
        "Take short breaks using the Pomodoro technique (25 min work, 5 min rest)",
        "Switch to less demanding tasks like documentation or planning",
        "Consider a brief meditation or power nap to restore energy",
      ],
      anxious: [
        "Break down overwhelming tasks into smaller, manageable steps",
        "Practice grounding techniques like deep breathing or the 5-4-3-2-1 method",
        "Focus on what you can control and create a structured plan",
      ],
      neutral: [
        "This is a good time for balanced activities like planning and reflection",
        "Review your goals and adjust your learning path if needed",
        "Explore new areas of interest to find what energizes you",
      ],
    }

    return recommendations[mood] || recommendations.neutral
  }

  // Function to get mood-based tasks
  const getMoodBasedTasks = (mood: string) => {
    const tasks = {
      happy: [
        { title: "Tackle a challenging coding problem", xp: 50, type: "technical" },
        { title: "Mentor a peer on a topic you're strong in", xp: 75, type: "social" },
        { title: "Start a new creative project", xp: 60, type: "creative" },
      ],
      sad: [
        { title: "Complete a small, achievable task", xp: 40, type: "technical" },
        { title: "Connect with a supportive peer", xp: 45, type: "social" },
        { title: "Practice self-compassion meditation", xp: 50, type: "wellness" },
      ],
      focused: [
        { title: "Complete a deep learning session (1+ hours)", xp: 80, type: "technical" },
        { title: "Refactor and optimize existing code", xp: 65, type: "technical" },
        { title: "Document your learning process", xp: 40, type: "reflection" },
      ],
      tired: [
        { title: "Take a mindful break (15 minutes)", xp: 30, type: "wellness" },
        { title: "Review and organize notes or code", xp: 35, type: "organization" },
        { title: "Set goals for tomorrow", xp: 25, type: "planning" },
      ],
      anxious: [
        { title: "Break down a large task into smaller steps", xp: 45, type: "organization" },
        { title: "Practice a grounding technique", xp: 40, type: "wellness" },
        { title: "Create a structured plan for a project", xp: 55, type: "planning" },
      ],
      neutral: [
        { title: "Review and update your learning goals", xp: 45, type: "planning" },
        { title: "Explore a new area of technology", xp: 60, type: "learning" },
        { title: "Connect with peers in your field", xp: 50, type: "social" },
      ],
    }

    return tasks[mood] || tasks.neutral
  }

  // Function to get mood-based motivation
  const getMoodBasedMotivation = (mood: string) => {
    const motivations = {
      happy:
        "Your positive energy is contagious! This is a perfect time to tackle challenging projects and inspire others. Your enthusiasm can help you make significant progress today.",

      focused:
        "You're in an excellent flow state! This clarity of mind is perfect for deep work and solving complex problems. Make the most of this focused energy to advance your skills.",

      tired:
        "It's okay to pace yourself. Even small steps forward are still progress. Consider breaking tasks into smaller chunks and celebrating each completion. Rest is part of the productivity cycle.",

      sad: "Your emotions are valid, and it's okay to feel this way. Be gentle with yourself today. Small accomplishments can help shift your perspective, and connecting with supportive people can make a difference.",

      anxious:
        "Take a deep breath. Breaking down overwhelming tasks into smaller steps can help manage anxiety. Focus on what you can control, and remember that you've overcome challenges before.",

      neutral:
        "This balanced state is perfect for reflection and planning. You have the clarity to assess your path objectively and make adjustments. Use this equilibrium to set meaningful goals.",
    }

    return motivations[mood] || motivations.neutral
  }

  // Function to set emotion mode and update theme
  const setEmotionMode = (mode: string) => {
    if (mode) {
      setCurrentEmotion(mode)
      setCurrentTheme(mode)

      // Remove all theme classes
      document.documentElement.classList.remove(
        "theme-happy",
        "theme-sad",
        "theme-focused",
        "theme-tired",
        "theme-anxious",
        "theme-neutral",
      )

      // Add current theme class
      document.documentElement.classList.add(`theme-${mode}`)
    }
  }

  return (
    <EmotionContext.Provider
      value={{
        currentEmotion,
        currentTheme,
        getEmotionFromInput,
        analyzeEmotionalState,
        getMoodBasedRecommendations,
        getMoodBasedTasks,
        getMoodBasedMotivation,
        setEmotionMode,
      }}
    >
      {children}
    </EmotionContext.Provider>
  )
}

// Custom hook to use the Emotion Context
export function useEmotion() {
  const context = useContext(EmotionContext)
  if (context === undefined) {
    throw new Error("useEmotion must be used within an EmotionProvider")
  }
  return context
}
