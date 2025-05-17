"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useEmotion } from "@/components/emotion-provider"
import { useAuth } from "@/components/auth-provider"
import { Smile, Frown, Zap, Brain, Heart, Coffee, AlertCircle } from "lucide-react"

const moodEmojis = [
  { id: "happy", emoji: "😊", name: "Happy", icon: <Smile className="h-5 w-5" /> },
  { id: "sad", emoji: "😔", name: "Sad", icon: <Frown className="h-5 w-5" /> },
  { id: "focused", emoji: "🧠", name: "Focused", icon: <Brain className="h-5 w-5" /> },
  { id: "tired", emoji: "😴", name: "Tired", icon: <Coffee className="h-5 w-5" /> },
  { id: "anxious", emoji: "😰", name: "Anxious", icon: <AlertCircle className="h-5 w-5" /> },
  { id: "neutral", emoji: "😐", name: "Neutral", icon: <Heart className="h-5 w-5" /> },
]

export function MoodDetector() {
  const [isOpen, setIsOpen] = useState(false)
  const [journalEntry, setJournalEntry] = useState("")
  const [selectedMood, setSelectedMood] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { getEmotionFromInput, setEmotionMode } = useEmotion()
  const { updateUserMood } = useAuth()
  const timeoutRef = useRef(null)

  // Auto-close confirmation after 3 seconds
  useEffect(() => {
    if (showConfirmation) {
      timeoutRef.current = setTimeout(() => {
        setShowConfirmation(false)
        setIsOpen(false)
      }, 3000)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [showConfirmation])

  const handleJournalChange = (e) => {
    setJournalEntry(e.target.value)

    // Auto-detect mood from text if more than 20 characters
    if (e.target.value.length > 20) {
      const detectedMood = getEmotionFromInput(e.target.value)
      if (detectedMood && !selectedMood) {
        setSelectedMood(detectedMood)
      }
    }
  }

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood)
  }

  const handleSubmit = () => {
    setIsAnalyzing(true)

    // Simulate analysis
    setTimeout(() => {
      // Update user's mood
      updateUserMood(selectedMood)

      // Apply theme based on mood
      setEmotionMode(selectedMood)

      setIsAnalyzing(false)
      setShowConfirmation(true)
    }, 1500)
  }

  if (showConfirmation) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed bottom-20 right-4 z-40"
      >
        <Card className="w-64 border-2 border-primary/20">
          <CardContent className="p-4 text-center">
            <div className="flex justify-center mb-2">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Zap className="h-5 w-5" />
              </div>
            </div>
            <p className="font-medium">Mood Updated!</p>
            <p className="text-sm text-muted-foreground">Your experience has been personalized</p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  if (!isOpen) {
    return (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-20 right-4 z-40">
        <Button
          size="sm"
          variant="outline"
          className="h-10 rounded-full shadow-md border-2 border-primary/20"
          onClick={() => setIsOpen(true)}
        >
          <Heart className="h-4 w-4 mr-2 text-primary" />
          How are you feeling?
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-20 right-4 z-40"
    >
      <Card className="w-80 shadow-lg border-2 border-primary/20">
        <CardHeader className="p-3 space-y-1">
          <CardTitle className="text-base font-medium">How are you feeling today?</CardTitle>
          <CardDescription>Your mood helps us personalize your experience</CardDescription>
        </CardHeader>
        <CardContent className="p-3 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {moodEmojis.map((mood) => (
              <motion.button
                key={mood.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-lg flex flex-col items-center ${
                  selectedMood === mood.id
                    ? `bg-${mood.id === "neutral" ? "primary" : mood.id}-primary/20 border-2 border-${mood.id === "neutral" ? "primary" : mood.id}-primary/50`
                    : "border border-border hover:border-primary/30"
                }`}
                onClick={() => handleMoodSelect(mood.id)}
              >
                <span className="text-2xl mb-1">{mood.emoji}</span>
                <span className="text-xs">{mood.name}</span>
              </motion.button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Share more (optional):</label>
            <Textarea
              placeholder="How are you feeling today? What's on your mind?"
              value={journalEntry}
              onChange={handleJournalChange}
              className="min-h-[80px] resize-none"
            />
          </div>
        </CardContent>
        <CardFooter className="p-3 pt-0 flex justify-between">
          <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSubmit} disabled={!selectedMood || isAnalyzing} className="btn-shiny">
            {isAnalyzing ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                Analyzing...
              </>
            ) : (
              "Update Mood"
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
