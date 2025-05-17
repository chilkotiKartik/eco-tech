"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sparkles, Users, Brain, Target, ArrowRight } from "lucide-react"

interface MentorMatchingAlgorithmProps {
  onMatchComplete: (mentorIds: string[]) => void
}

export function MentorMatchingAlgorithm({ onMatchComplete }: MentorMatchingAlgorithmProps) {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  // Learning preferences
  const [learningStyle, setLearningStyle] = useState<string[]>([])
  const [goals, setGoals] = useState<string[]>([])
  const [experience, setExperience] = useState<string[]>([])
  const [availability, setAvailability] = useState<string[]>([])

  const handleLearningStyleChange = (value: string) => {
    setLearningStyle((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const handleGoalsChange = (value: string) => {
    setGoals((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const handleExperienceChange = (value: string) => {
    setExperience((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const handleAvailabilityChange = (value: string) => {
    setAvailability((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const nextStep = () => {
    const newStep = step + 1
    setStep(newStep)
    setProgress((newStep - 1) * 25)
  }

  const prevStep = () => {
    const newStep = step - 1
    setStep(newStep)
    setProgress((newStep - 1) * 25)
  }

  const runMatching = () => {
    setIsProcessing(true)

    // Simulate processing time
    setTimeout(() => {
      setProgress(100)

      // In a real app, this would call an API with the collected preferences
      // For now, we'll just return some sample mentor IDs
      onMatchComplete(["mentor-1", "mentor-3", "mentor-7"])

      setIsProcessing(false)
    }, 2000)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          AI Mentor Matching
        </CardTitle>
        <CardDescription>Find the perfect mentors based on your learning style, goals, and preferences</CardDescription>
        <Progress value={progress} className="h-2 mt-2" />
      </CardHeader>

      <CardContent>
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                <Brain className="h-5 w-5 text-blue-500" />
                Your Learning Style
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: "visual", label: "Visual learner (diagrams, videos)" },
                  { id: "auditory", label: "Auditory learner (discussions, explanations)" },
                  { id: "reading", label: "Reading/writing learner (documentation, notes)" },
                  { id: "kinesthetic", label: "Hands-on learner (practice, projects)" },
                  { id: "structured", label: "Prefer structured learning paths" },
                  { id: "exploratory", label: "Prefer exploratory learning" },
                  { id: "social", label: "Enjoy learning with others" },
                  { id: "independent", label: "Prefer learning independently" },
                ].map((item) => (
                  <div key={item.id} className="flex items-start space-x-2">
                    <Checkbox
                      id={`learning-${item.id}`}
                      checked={learningStyle.includes(item.id)}
                      onCheckedChange={() => handleLearningStyleChange(item.id)}
                    />
                    <Label
                      htmlFor={`learning-${item.id}`}
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-green-500" />
                Your Learning Goals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: "career", label: "Career advancement or transition" },
                  { id: "skills", label: "Specific skill development" },
                  { id: "project", label: "Complete a specific project" },
                  { id: "certification", label: "Prepare for certification" },
                  { id: "leadership", label: "Develop leadership skills" },
                  { id: "networking", label: "Build professional network" },
                  { id: "startup", label: "Launch a startup or business" },
                  { id: "personal", label: "Personal growth and confidence" },
                ].map((item) => (
                  <div key={item.id} className="flex items-start space-x-2">
                    <Checkbox
                      id={`goal-${item.id}`}
                      checked={goals.includes(item.id)}
                      onCheckedChange={() => handleGoalsChange(item.id)}
                    />
                    <Label
                      htmlFor={`goal-${item.id}`}
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-amber-500" />
                Your Experience Level
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: "beginner", label: "Beginner - Just starting out" },
                  { id: "intermediate", label: "Intermediate - Some experience but need guidance" },
                  { id: "advanced", label: "Advanced - Looking for specialized mentorship" },
                  { id: "expert", label: "Expert - Seeking peer-level collaboration and insights" },
                ].map((item) => (
                  <div key={item.id} className="flex items-start space-x-2">
                    <Checkbox
                      id={`exp-${item.id}`}
                      checked={experience.includes(item.id)}
                      onCheckedChange={() => handleExperienceChange(item.id)}
                    />
                    <Label
                      htmlFor={`exp-${item.id}`}
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Availability & Commitment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: "weekly", label: "Weekly sessions" },
                  { id: "biweekly", label: "Bi-weekly sessions" },
                  { id: "monthly", label: "Monthly sessions" },
                  { id: "asneeded", label: "As-needed basis" },
                  { id: "shortterm", label: "Short-term (1-3 months)" },
                  { id: "longterm", label: "Long-term (6+ months)" },
                ].map((item) => (
                  <div key={item.id} className="flex items-start space-x-2">
                    <Checkbox
                      id={`avail-${item.id}`}
                      checked={availability.includes(item.id)}
                      onCheckedChange={() => handleAvailabilityChange(item.id)}
                    />
                    <Label
                      htmlFor={`avail-${item.id}`}
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Review Your Preferences</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-500">Learning Style</h4>
                  <p className="text-sm">
                    {learningStyle.length > 0
                      ? learningStyle
                          .map((style) => {
                            // Convert camelCase or kebab-case to readable text
                            return style
                              .replace(/([A-Z])/g, " $1")
                              .replace(/-/g, " ")
                              .replace(/^./, (str) => str.toUpperCase())
                          })
                          .join(", ")
                      : "No preferences selected"}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-500">Learning Goals</h4>
                  <p className="text-sm">
                    {goals.length > 0
                      ? goals
                          .map((goal) => {
                            return goal
                              .replace(/([A-Z])/g, " $1")
                              .replace(/-/g, " ")
                              .replace(/^./, (str) => str.toUpperCase())
                          })
                          .join(", ")
                      : "No goals selected"}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-500">Experience Level</h4>
                  <p className="text-sm">
                    {experience.length > 0
                      ? experience
                          .map((exp) => {
                            return exp
                              .replace(/([A-Z])/g, " $1")
                              .replace(/-/g, " ")
                              .replace(/^./, (str) => str.toUpperCase())
                          })
                          .join(", ")
                      : "No experience level selected"}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-500">Availability & Commitment</h4>
                  <p className="text-sm">
                    {availability.length > 0
                      ? availability
                          .map((avail) => {
                            return avail
                              .replace(/([A-Z])/g, " $1")
                              .replace(/-/g, " ")
                              .replace(/^./, (str) => str.toUpperCase())
                          })
                          .join(", ")
                      : "No availability preferences selected"}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button onClick={runMatching} disabled={isProcessing} className="w-full">
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Find My Perfect Mentors
                  </>
                )}
              </Button>

              <p className="text-xs text-slate-500 mt-2">
                Our AI will analyze your preferences and match you with the most compatible mentors
              </p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button variant="outline" onClick={prevStep} disabled={isProcessing}>
            Back
          </Button>
        )}

        {step < 4 && (
          <Button onClick={nextStep} className="ml-auto">
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}

        {step === 4 && !isProcessing && (
          <Button variant="outline" onClick={prevStep} className="ml-auto">
            Back
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
