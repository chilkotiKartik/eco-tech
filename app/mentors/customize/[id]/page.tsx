"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, Paintbrush, Settings, Sliders, UserCog, Wand2 } from "lucide-react"

// Sample mentor data
const getMentorData = (id) => {
  return {
    id,
    name: "CodeMaster",
    avatar: "/placeholder.svg?height=200&width=200",
    specialization: "Full-Stack Development",
    description:
      "Specialized in modern web development stacks and system architecture. Helps you build scalable applications and improve your coding practices.",
    personality: {
      directness: 7,
      encouragement: 5,
      detail: 8,
      pace: 6,
      humor: 4,
    },
    communication: {
      messageLength: "medium",
      exampleFrequency: "high",
      questionFrequency: "medium",
      technicalDepth: "high",
    },
    focus: {
      theory: 40,
      practice: 60,
    },
    specialties: ["React", "Node.js", "System Design", "Performance Optimization", "TypeScript", "API Design"],
    teachingStyle: "project-based",
    voiceOptions: ["neutral", "enthusiastic", "calm", "authoritative"],
    currentVoice: "neutral",
    avatarOptions: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
  }
}

export default function CustomizeMentorPage({ params }) {
  const router = useRouter()
  const [mentor, setMentor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [customizedMentor, setCustomizedMentor] = useState(null)
  const [activeTab, setActiveTab] = useState("personality")
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    // In a real app, this would be an API call
    const mentorData = getMentorData(params.id)
    setMentor(mentorData)
    setCustomizedMentor(mentorData)
    setLoading(false)
  }, [params.id])

  const handlePersonalityChange = (trait, value) => {
    setCustomizedMentor({
      ...customizedMentor,
      personality: {
        ...customizedMentor.personality,
        [trait]: value[0],
      },
    })
  }

  const handleCommunicationChange = (aspect, value) => {
    setCustomizedMentor({
      ...customizedMentor,
      communication: {
        ...customizedMentor.communication,
        [aspect]: value,
      },
    })
  }

  const handleFocusChange = (value) => {
    setCustomizedMentor({
      ...customizedMentor,
      focus: {
        theory: value[0],
        practice: 100 - value[0],
      },
    })
  }

  const handleNameChange = (name) => {
    setCustomizedMentor({
      ...customizedMentor,
      name,
    })
  }

  const handleSpecializationChange = (specialization) => {
    setCustomizedMentor({
      ...customizedMentor,
      specialization,
    })
  }

  const handleDescriptionChange = (description) => {
    setCustomizedMentor({
      ...customizedMentor,
      description,
    })
  }

  const handleVoiceChange = (voice) => {
    setCustomizedMentor({
      ...customizedMentor,
      currentVoice: voice,
    })
  }

  const handleAvatarChange = (avatar) => {
    setCustomizedMentor({
      ...customizedMentor,
      avatar,
    })
  }

  const handleTeachingStyleChange = (style) => {
    setCustomizedMentor({
      ...customizedMentor,
      teachingStyle: style,
    })
  }

  const handleSpecialtiesChange = (specialty, isAdding) => {
    if (isAdding) {
      setCustomizedMentor({
        ...customizedMentor,
        specialties: [...customizedMentor.specialties, specialty],
      })
    } else {
      setCustomizedMentor({
        ...customizedMentor,
        specialties: customizedMentor.specialties.filter((s) => s !== specialty),
      })
    }
  }

  const handleSave = () => {
    setIsSaving(true)

    // In a real app, this would be an API call to save the customized mentor
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccess(true)

      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1500)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Loading mentor data...</h1>
          </div>
        </main>
      </div>
    )
  }

  if (!mentor) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Mentor not found</h1>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header with back button */}
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Customize Your AI Mentor</h1>
              <p className="text-muted-foreground">
                Personalize {customizedMentor.name} to match your learning preferences
              </p>
            </div>
          </div>

          {/* Mentor preview card */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-primary/10">
                  <Image
                    src={customizedMentor.avatar || "/placeholder.svg"}
                    alt={customizedMentor.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold">{customizedMentor.name}</h2>
                  <p className="text-muted-foreground">{customizedMentor.specialization}</p>
                  <p className="mt-2">{customizedMentor.description}</p>

                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {customizedMentor.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Teaching Style:</span>
                      <Badge variant="outline">
                        {customizedMentor.teachingStyle === "project-based"
                          ? "Project-Based"
                          : customizedMentor.teachingStyle === "concept-first"
                            ? "Concept-First"
                            : customizedMentor.teachingStyle === "challenge-driven"
                              ? "Challenge-Driven"
                              : customizedMentor.teachingStyle}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Voice:</span>
                      <Badge variant="outline">{customizedMentor.currentVoice}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Focus:</span>
                      <Badge variant="outline">
                        {customizedMentor.focus.theory}% Theory / {customizedMentor.focus.practice}% Practice
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customization tabs */}
          <Tabs defaultValue="personality" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <TabsTrigger value="personality" className="flex items-center gap-2">
                <UserCog className="h-4 w-4" />
                <span>Personality</span>
              </TabsTrigger>
              <TabsTrigger value="communication" className="flex items-center gap-2">
                <Sliders className="h-4 w-4" />
                <span>Communication</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Paintbrush className="h-4 w-4" />
                <span>Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="expertise" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Expertise</span>
              </TabsTrigger>
            </TabsList>

            {/* Personality Tab */}
            <TabsContent value="personality" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personality Traits</CardTitle>
                  <CardDescription>Adjust how your mentor interacts with you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Directness</Label>
                        <span className="text-sm text-muted-foreground">
                          {customizedMentor.personality.directness}/10
                        </span>
                      </div>
                      <Slider
                        value={[customizedMentor.personality.directness]}
                        min={1}
                        max={10}
                        step={1}
                        onValueChange={(value) => handlePersonalityChange("directness", value)}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Gentle & Diplomatic</span>
                        <span>Direct & Straightforward</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Encouragement</Label>
                        <span className="text-sm text-muted-foreground">
                          {customizedMentor.personality.encouragement}/10
                        </span>
                      </div>
                      <Slider
                        value={[customizedMentor.personality.encouragement]}
                        min={1}
                        max={10}
                        step={1}
                        onValueChange={(value) => handlePersonalityChange("encouragement", value)}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Challenging</span>
                        <span>Highly Encouraging</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Detail Level</Label>
                        <span className="text-sm text-muted-foreground">{customizedMentor.personality.detail}/10</span>
                      </div>
                      <Slider
                        value={[customizedMentor.personality.detail]}
                        min={1}
                        max={10}
                        step={1}
                        onValueChange={(value) => handlePersonalityChange("detail", value)}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Concise & Brief</span>
                        <span>Detailed & Thorough</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Learning Pace</Label>
                        <span className="text-sm text-muted-foreground">{customizedMentor.personality.pace}/10</span>
                      </div>
                      <Slider
                        value={[customizedMentor.personality.pace]}
                        min={1}
                        max={10}
                        step={1}
                        onValueChange={(value) => handlePersonalityChange("pace", value)}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Methodical & Thorough</span>
                        <span>Fast-Paced & Challenging</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Humor Level</Label>
                        <span className="text-sm text-muted-foreground">{customizedMentor.personality.humor}/10</span>
                      </div>
                      <Slider
                        value={[customizedMentor.personality.humor]}
                        min={1}
                        max={10}
                        step={1}
                        onValueChange={(value) => handlePersonalityChange("humor", value)}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Serious & Formal</span>
                        <span>Lighthearted & Humorous</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Teaching Approach</CardTitle>
                  <CardDescription>Set your preferred learning method</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block">Teaching Style</Label>
                      <Select value={customizedMentor.teachingStyle} onValueChange={handleTeachingStyleChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select teaching style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="project-based">Project-Based Learning</SelectItem>
                          <SelectItem value="concept-first">Concept-First Approach</SelectItem>
                          <SelectItem value="challenge-driven">Challenge-Driven Learning</SelectItem>
                          <SelectItem value="socratic">Socratic Method</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Theory vs. Practice Balance</Label>
                        <span className="text-sm text-muted-foreground">
                          {customizedMentor.focus.theory}% Theory / {customizedMentor.focus.practice}% Practice
                        </span>
                      </div>
                      <Slider
                        value={[customizedMentor.focus.theory]}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={handleFocusChange}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>All Practice</span>
                        <span>Balanced</span>
                        <span>All Theory</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Communication Tab */}
            <TabsContent value="communication" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Communication Preferences</CardTitle>
                  <CardDescription>Customize how your mentor communicates with you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label>Message Length</Label>
                      <Select
                        value={customizedMentor.communication.messageLength}
                        onValueChange={(value) => handleCommunicationChange("messageLength", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select message length" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="concise">Concise - Brief and to the point</SelectItem>
                          <SelectItem value="medium">Medium - Balanced explanations</SelectItem>
                          <SelectItem value="detailed">Detailed - Comprehensive explanations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Example Frequency</Label>
                      <Select
                        value={customizedMentor.communication.exampleFrequency}
                        onValueChange={(value) => handleCommunicationChange("exampleFrequency", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select example frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - Minimal examples</SelectItem>
                          <SelectItem value="medium">Medium - Occasional examples</SelectItem>
                          <SelectItem value="high">High - Frequent examples</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Question Frequency</Label>
                      <Select
                        value={customizedMentor.communication.questionFrequency}
                        onValueChange={(value) => handleCommunicationChange("questionFrequency", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select question frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - Minimal questions</SelectItem>
                          <SelectItem value="medium">Medium - Occasional questions</SelectItem>
                          <SelectItem value="high">High - Socratic approach with many questions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Technical Depth</Label>
                      <Select
                        value={customizedMentor.communication.technicalDepth}
                        onValueChange={(value) => handleCommunicationChange("technicalDepth", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select technical depth" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner - Simplified explanations</SelectItem>
                          <SelectItem value="intermediate">Intermediate - Balanced technical detail</SelectItem>
                          <SelectItem value="high">Advanced - Deep technical explanations</SelectItem>
                          <SelectItem value="adaptive">Adaptive - Adjusts based on the topic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Voice Style</Label>
                      <Select value={customizedMentor.currentVoice} onValueChange={handleVoiceChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select voice style" />
                        </SelectTrigger>
                        <SelectContent>
                          {customizedMentor.voiceOptions.map((voice) => (
                            <SelectItem key={voice} value={voice}>
                              {voice.charAt(0).toUpperCase() + voice.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Advanced Communication Settings</CardTitle>
                  <CardDescription>Fine-tune additional communication preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="code-snippets">Include Code Snippets</Label>
                      <p className="text-sm text-muted-foreground">
                        Mentor will include code examples when explaining concepts
                      </p>
                    </div>
                    <Switch id="code-snippets" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="follow-up">Automatic Follow-up Questions</Label>
                      <p className="text-sm text-muted-foreground">
                        Mentor will ask follow-up questions to deepen understanding
                      </p>
                    </div>
                    <Switch id="follow-up" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="progress-check">Regular Progress Checks</Label>
                      <p className="text-sm text-muted-foreground">Mentor will periodically check your understanding</p>
                    </div>
                    <Switch id="progress-check" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="resources">Include Additional Resources</Label>
                      <p className="text-sm text-muted-foreground">
                        Mentor will suggest relevant articles, videos, and tutorials
                      </p>
                    </div>
                    <Switch id="resources" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visual Appearance</CardTitle>
                  <CardDescription>Customize how your mentor looks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Avatar Selection</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {customizedMentor.avatarOptions.map((avatar, index) => (
                        <div
                          key={index}
                          className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                            customizedMentor.avatar === avatar ? "border-primary" : "border-transparent"
                          }`}
                          onClick={() => handleAvatarChange(avatar)}
                        >
                          <div className="aspect-square relative">
                            <Image
                              src={avatar || "/placeholder.svg"}
                              alt={`Avatar option ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          {customizedMentor.avatar === avatar && (
                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mentor-name">Mentor Name</Label>
                    <Input
                      id="mentor-name"
                      value={customizedMentor.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mentor-specialization">Specialization Title</Label>
                    <Input
                      id="mentor-specialization"
                      value={customizedMentor.specialization}
                      onChange={(e) => handleSpecializationChange(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mentor-description">Description</Label>
                    <Textarea
                      id="mentor-description"
                      value={customizedMentor.description}
                      onChange={(e) => handleDescriptionChange(e.target.value)}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>UI Preferences</CardTitle>
                  <CardDescription>Customize the mentor interface</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode for Chat Interface</Label>
                      <p className="text-sm text-muted-foreground">Use dark background for mentor conversations</p>
                    </div>
                    <Switch id="dark-mode" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="compact-view">Compact View</Label>
                      <p className="text-sm text-muted-foreground">Use more compact layout for mentor conversations</p>
                    </div>
                    <Switch id="compact-view" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="show-avatar">Show Avatar in Chat</Label>
                      <p className="text-sm text-muted-foreground">Display mentor avatar in conversation bubbles</p>
                    </div>
                    <Switch id="show-avatar" defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label>Chat Accent Color</Label>
                    <div className="grid grid-cols-5 gap-2">
                      {["#7C3AED", "#2563EB", "#059669", "#DC2626", "#D97706"].map((color) => (
                        <div
                          key={color}
                          className="h-8 rounded-md cursor-pointer border"
                          style={{ backgroundColor: color }}
                          onClick={() => {}}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Expertise Tab */}
            <TabsContent value="expertise" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Expertise and Knowledge Areas</CardTitle>
                  <CardDescription>Customize your mentor's areas of expertise</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Current Specialties</Label>
                    <div className="flex flex-wrap gap-2">
                      {customizedMentor.specialties.map((specialty) => (
                        <Badge
                          key={specialty}
                          variant="secondary"
                          className="flex items-center gap-1 cursor-pointer"
                          onClick={() => handleSpecialtiesChange(specialty, false)}
                        >
                          {specialty}
                          <span className="text-xs ml-1">×</span>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="add-specialty">Add Specialty</Label>
                    <div className="flex gap-2">
                      <Input id="add-specialty" placeholder="Enter a new specialty" />
                      <Button
                        variant="outline"
                        onClick={() => {
                          const input = document.getElementById("add-specialty") as HTMLInputElement
                          if (input.value) {
                            handleSpecialtiesChange(input.value, true)
                            input.value = ""
                          }
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Suggested Specialties</Label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "GraphQL",
                        "Docker",
                        "AWS",
                        "Testing",
                        "CI/CD",
                        "Database Design",
                        "Security",
                        "Microservices",
                      ].map((specialty) => (
                        <Badge
                          key={specialty}
                          variant="outline"
                          className="cursor-pointer hover:bg-secondary"
                          onClick={() => {
                            if (!customizedMentor.specialties.includes(specialty)) {
                              handleSpecialtiesChange(specialty, true)
                            }
                          }}
                        >
                          + {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Resources</CardTitle>
                  <CardDescription>Customize the resources your mentor can reference</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="official-docs">Official Documentation</Label>
                      <p className="text-sm text-muted-foreground">Reference official documentation for technologies</p>
                    </div>
                    <Switch id="official-docs" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="video-tutorials">Video Tutorials</Label>
                      <p className="text-sm text-muted-foreground">Recommend video tutorials for visual learning</p>
                    </div>
                    <Switch id="video-tutorials" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="blog-articles">Blog Articles</Label>
                      <p className="text-sm text-muted-foreground">Reference blog articles and tutorials</p>
                    </div>
                    <Switch id="blog-articles" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="academic-papers">Academic Papers</Label>
                      <p className="text-sm text-muted-foreground">Reference academic research papers</p>
                    </div>
                    <Switch id="academic-papers" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="community-resources">Community Resources</Label>
                      <p className="text-sm text-muted-foreground">
                        Reference Stack Overflow, GitHub discussions, etc.
                      </p>
                    </div>
                    <Switch id="community-resources" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Save button */}
          <div className="flex justify-end mt-6">
            <Button onClick={handleSave} disabled={isSaving} className="relative">
              {isSaving ? (
                "Saving..."
              ) : showSuccess ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Saved Successfully
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" /> Save Customizations
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
