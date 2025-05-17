"use client"

import type React from "react"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Sparkles, Save, RotateCcw, MessageSquare, Zap, Brain, Heart, Award } from "lucide-react"

interface PersonalityTrait {
  name: string
  description: string
  value: number
  icon: React.ReactNode
}

interface CommunicationStyle {
  id: string
  name: string
  description: string
}

interface MentorPersonalityCustomizerProps {
  mentorId: string
  mentorName: string
  onSave: (personality: any) => void
  isPremium: boolean
}

export function MentorPersonalityCustomizer({
  mentorId,
  mentorName,
  onSave,
  isPremium,
}: MentorPersonalityCustomizerProps) {
  const [traits, setTraits] = useState<PersonalityTrait[]>([
    {
      name: "Directness",
      description: "How straightforward the mentor is with feedback",
      value: 60,
      icon: <Zap className="h-5 w-5" />,
    },
    {
      name: "Patience",
      description: "How much time the mentor takes to explain concepts",
      value: 75,
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      name: "Technical Depth",
      description: "How detailed the technical explanations are",
      value: 80,
      icon: <Brain className="h-5 w-5" />,
    },
    {
      name: "Encouragement",
      description: "How much positive reinforcement the mentor provides",
      value: 70,
      icon: <Heart className="h-5 w-5" />,
    },
    {
      name: "Challenge Level",
      description: "How challenging the mentor makes your learning journey",
      value: 65,
      icon: <Award className="h-5 w-5" />,
    },
  ])

  const [communicationStyle, setCommunicationStyle] = useState<string>("balanced")
  const [useHumor, setUseHumor] = useState<boolean>(true)
  const [useRealWorldExamples, setUseRealWorldExamples] = useState<boolean>(true)
  const [adaptToMood, setAdaptToMood] = useState<boolean>(true)

  const communicationStyles: CommunicationStyle[] = [
    {
      id: "concise",
      name: "Concise",
      description: "Brief and to-the-point communication",
    },
    {
      id: "detailed",
      name: "Detailed",
      description: "Thorough explanations with examples",
    },
    {
      id: "socratic",
      name: "Socratic",
      description: "Guiding through questions rather than direct answers",
    },
    {
      id: "balanced",
      name: "Balanced",
      description: "Mix of direct guidance and questioning",
    },
  ]

  const handleTraitChange = (index: number, newValue: number[]) => {
    const newTraits = [...traits]
    newTraits[index].value = newValue[0]
    setTraits(newTraits)
  }

  const handleReset = () => {
    setTraits([
      {
        name: "Directness",
        description: "How straightforward the mentor is with feedback",
        value: 60,
        icon: <Zap className="h-5 w-5" />,
      },
      {
        name: "Patience",
        description: "How much time the mentor takes to explain concepts",
        value: 75,
        icon: <MessageSquare className="h-5 w-5" />,
      },
      {
        name: "Technical Depth",
        description: "How detailed the technical explanations are",
        value: 80,
        icon: <Brain className="h-5 w-5" />,
      },
      {
        name: "Encouragement",
        description: "How much positive reinforcement the mentor provides",
        value: 70,
        icon: <Heart className="h-5 w-5" />,
      },
      {
        name: "Challenge Level",
        description: "How challenging the mentor makes your learning journey",
        value: 65,
        icon: <Award className="h-5 w-5" />,
      },
    ])
    setCommunicationStyle("balanced")
    setUseHumor(true)
    setUseRealWorldExamples(true)
    setAdaptToMood(true)
  }

  const handleSave = () => {
    const personalitySettings = {
      mentorId,
      traits: traits.map((t) => ({ name: t.name, value: t.value })),
      communicationStyle,
      preferences: {
        useHumor,
        useRealWorldExamples,
        adaptToMood,
      },
    }

    onSave(personalitySettings)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          Customize {mentorName}'s Personality
        </CardTitle>
        <CardDescription>
          Tailor how your mentor interacts with you to optimize your learning experience
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="traits">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="traits">Personality Traits</TabsTrigger>
            <TabsTrigger value="communication">Communication Style</TabsTrigger>
          </TabsList>

          <TabsContent value="traits" className="space-y-6 pt-4">
            {traits.map((trait, index) => (
              <div key={trait.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {trait.icon}
                    <Label htmlFor={`trait-${index}`} className="font-medium">
                      {trait.name}
                    </Label>
                  </div>
                  <span className="text-sm font-medium">{trait.value}%</span>
                </div>
                <Slider
                  id={`trait-${index}`}
                  min={0}
                  max={100}
                  step={5}
                  value={[trait.value]}
                  onValueChange={(value) => handleTraitChange(index, value)}
                  disabled={!isPremium}
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">{trait.description}</p>
              </div>
            ))}

            {!isPremium && (
              <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md text-sm text-amber-800 dark:text-amber-200">
                <p className="font-medium">Premium Feature</p>
                <p>Upgrade to customize personality traits of your mentors.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="communication" className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="communication-style">Communication Style</Label>
              <Select value={communicationStyle} onValueChange={setCommunicationStyle} disabled={!isPremium}>
                <SelectTrigger id="communication-style">
                  <SelectValue placeholder="Select a communication style" />
                </SelectTrigger>
                <SelectContent>
                  {communicationStyles.map((style) => (
                    <SelectItem key={style.id} value={style.id}>
                      {style.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {communicationStyles.find((s) => s.id === communicationStyle)?.description}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium">Preferences</h4>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="use-humor">Use Humor</Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Incorporate appropriate humor in explanations
                  </p>
                </div>
                <Switch id="use-humor" checked={useHumor} onCheckedChange={setUseHumor} disabled={!isPremium} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="real-world-examples">Real-world Examples</Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Use practical examples from industry</p>
                </div>
                <Switch
                  id="real-world-examples"
                  checked={useRealWorldExamples}
                  onCheckedChange={setUseRealWorldExamples}
                  disabled={!isPremium}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="adapt-to-mood">Adapt to Your Mood</Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Adjust teaching style based on your emotional state
                  </p>
                </div>
                <Switch
                  id="adapt-to-mood"
                  checked={adaptToMood}
                  onCheckedChange={setAdaptToMood}
                  disabled={!isPremium}
                />
              </div>
            </div>

            {!isPremium && (
              <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md text-sm text-amber-800 dark:text-amber-200">
                <p className="font-medium">Premium Feature</p>
                <p>Upgrade to customize communication styles of your mentors.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleReset} disabled={!isPremium}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
        <Button onClick={handleSave} disabled={!isPremium}>
          <Save className="h-4 w-4 mr-2" />
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  )
}
