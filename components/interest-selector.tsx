"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Code, Palette, Briefcase, BookOpen, HeartPulse, Sparkles } from "lucide-react"

const interests = [
  {
    id: "tech",
    name: "Technology",
    description: "Programming, AI, data science, and other technical fields",
    icon: <Code className="h-6 w-6" />,
    color: "bg-tech-primary/10 text-tech-primary border-tech-primary/30",
    theme: "theme-tech",
  },
  {
    id: "creative",
    name: "Creative Arts",
    description: "Design, music, digital art, and creative expression",
    icon: <Palette className="h-6 w-6" />,
    color: "bg-creative-primary/10 text-creative-primary border-creative-primary/30",
    theme: "theme-creative",
  },
  {
    id: "business",
    name: "Business",
    description: "Entrepreneurship, marketing, finance, and management",
    icon: <Briefcase className="h-6 w-6" />,
    color: "bg-business-primary/10 text-business-primary border-business-primary/30",
    theme: "theme-business",
  },
  {
    id: "education",
    name: "Education",
    description: "Teaching, learning sciences, and educational technology",
    icon: <BookOpen className="h-6 w-6" />,
    color: "bg-education-primary/10 text-education-primary border-education-primary/30",
    theme: "theme-education",
  },
  {
    id: "health",
    name: "Health & Wellness",
    description: "Healthcare, fitness, nutrition, and mental wellbeing",
    icon: <HeartPulse className="h-6 w-6" />,
    color: "bg-health-primary/10 text-health-primary border-health-primary/30",
    theme: "theme-health",
  },
  {
    id: "impact",
    name: "Social Impact",
    description: "Sustainability, community service, and social innovation",
    icon: <Sparkles className="h-6 w-6" />,
    color: "bg-accent/10 text-accent border-accent/30",
    theme: "theme-neutral",
  },
]

export function InterestSelector({ onComplete }) {
  const [selectedInterests, setSelectedInterests] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()
  const { updateUserInterests } = useAuth()

  const toggleInterest = (interestId) => {
    if (selectedInterests.includes(interestId)) {
      setSelectedInterests(selectedInterests.filter((id) => id !== interestId))
    } else {
      setSelectedInterests([...selectedInterests, interestId])
    }
  }

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    } else {
      // Save selected interests
      updateUserInterests(selectedInterests)

      // Apply theme based on primary interest
      if (selectedInterests.length > 0) {
        const primaryInterest = interests.find((i) => i.id === selectedInterests[0])
        if (primaryInterest) {
          document.documentElement.className = primaryInterest.theme
        }
      }

      // Complete the onboarding
      onComplete()
    }
  }

  const steps = [
    {
      title: "Select Your Interests",
      description: "Choose the areas you're most interested in learning about",
    },
    {
      title: "Personalize Your Experience",
      description: "Your selections help us tailor content to your preferences",
    },
    {
      title: "Almost Done!",
      description: "Confirm your choices to customize your dashboard",
    },
  ]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-3xl mx-auto"
      >
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl gradient-text">{steps[currentStep].title}</CardTitle>
            <CardDescription>{steps[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {interests.map((interest) => (
                <motion.div
                  key={interest.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedInterests.includes(interest.id)
                      ? `${interest.color} border-2`
                      : "border-border hover:border-primary/30"
                  }`}
                  onClick={() => toggleInterest(interest.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`p-3 rounded-full ${selectedInterests.includes(interest.id) ? interest.color : "bg-muted"} mb-3`}
                    >
                      {interest.icon}
                    </div>
                    <h3 className="font-medium mb-1">{interest.name}</h3>
                    <p className="text-sm text-muted-foreground">{interest.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentStep > 0 ? (
              <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                Back
              </Button>
            ) : (
              <div></div>
            )}
            <Button onClick={handleNext} disabled={selectedInterests.length === 0} className="btn-shiny">
              {currentStep < 2 ? "Next" : "Complete"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
