"use client"

import { useState } from "react"
import { CheckCircle2, Circle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface LearningPathStep {
  id: string
  title: string
  description: string
  duration: string
  status: "completed" | "current" | "locked"
  isPremium?: boolean
}

interface MentorLearningPathProps {
  mentorName: string
  mentorSpecialty: string
  steps: LearningPathStep[]
  progress: number
  isPremiumUser: boolean
  onStartStep: (stepId: string) => void
  onUnlockPremium?: () => void
}

export function MentorLearningPath({
  mentorName,
  mentorSpecialty,
  steps,
  progress,
  isPremiumUser,
  onStartStep,
  onUnlockPremium,
}: MentorLearningPathProps) {
  const [expandedStep, setExpandedStep] = useState<string | null>(
    steps.find((step) => step.status === "current")?.id || null,
  )

  const toggleStep = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Your Learning Path with {mentorName}</h3>
        <p className="text-slate-500 dark:text-slate-400">
          Personalized {mentorSpecialty} learning journey designed to help you grow systematically
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Progress value={progress} className="h-2 flex-1" />
          <span className="text-sm font-medium">{progress}% Complete</span>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const isExpanded = expandedStep === step.id
          const isLocked = step.status === "locked"
          const isPremiumLocked = step.isPremium && !isPremiumUser

          return (
            <div key={step.id} className="relative">
              {index > 0 && (
                <div className="absolute left-4 top-0 h-full w-0.5 -translate-x-1/2 bg-slate-200 dark:bg-slate-700" />
              )}

              <div className="relative">
                <div
                  className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-colors ${
                    isExpanded ? "bg-slate-100 dark:bg-slate-800" : ""
                  } ${isLocked ? "opacity-70" : ""}`}
                  onClick={() => !isLocked && toggleStep(step.id)}
                >
                  <div className="flex-shrink-0 mt-1">
                    {step.status === "completed" ? (
                      <CheckCircle2 className="h-8 w-8 text-green-500" />
                    ) : step.status === "current" ? (
                      <Circle className="h-8 w-8 text-blue-500 fill-blue-100" />
                    ) : (
                      <Lock className="h-8 w-8 text-slate-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold">{step.title}</h4>
                      <span className="text-sm text-slate-500">{step.duration}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{step.description}</p>

                    {isPremiumLocked && (
                      <div className="mt-2 flex items-center text-amber-600 text-sm">
                        <Lock className="h-3 w-3 mr-1" /> Premium content
                      </div>
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="ml-12 mt-2 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                    {isPremiumLocked ? (
                      <div className="space-y-3">
                        <p className="text-sm">
                          This premium content is locked. Upgrade to access this and all premium learning paths.
                        </p>
                        <Button onClick={onUnlockPremium} className="w-full">
                          Unlock Premium
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-sm">Ready to start this step in your learning journey with {mentorName}?</p>
                        <Button
                          onClick={() => onStartStep(step.id)}
                          disabled={step.status === "locked"}
                          className="w-full"
                        >
                          {step.status === "completed" ? "Review Step" : "Start Step"}
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
