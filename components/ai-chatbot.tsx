"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth-provider"
import { useEmotion } from "@/components/emotion-provider"
import { Bot, Maximize2, Minimize2, Send, X, Smile, Frown, Zap, Brain } from "lucide-react"

// Mood-specific responses
const moodResponses = {
  happy: [
    "Your positive energy is contagious! Let's channel it into something amazing today.",
    "I love your enthusiasm! What would you like to focus on with this great energy?",
    "You're radiating positivity! This is a perfect time to tackle challenging projects.",
    "Your happy mood is perfect for creative work. Any exciting projects in mind?",
    "Happiness boosts learning! Let's make the most of this positive state.",
  ],
  sad: [
    "I notice you might be feeling down. Remember that it's okay to take things slow today.",
    "Sometimes we all feel a bit blue. Would you like some mood-lifting activities?",
    "I'm here for you during the tough moments. What small step could make today better?",
    "Even on difficult days, small achievements matter. Let's find something manageable to focus on.",
    "It's okay to not be okay sometimes. Would talking about it help, or would you prefer a distraction?",
  ],
  focused: [
    "I see you're in a focused state! This is perfect for deep work on complex problems.",
    "Your concentration is impressive. What important task are you working on?",
    "This focused energy is ideal for learning difficult concepts. Any topics you want to explore?",
    "When you're this focused, you can accomplish amazing things. What's your priority today?",
    "I'll help maintain your focus. What can I assist you with during this productive time?",
  ],
  tired: [
    "I notice you might be feeling tired. Remember to take breaks and be kind to yourself.",
    "Energy levels fluctuate naturally. Would you like some suggestions for low-energy activities?",
    "Rest is an important part of productivity. Maybe focus on lighter tasks today?",
    "When tired, sometimes a short break can help restore some energy. Would you like a quick mindfulness exercise?",
    "It's okay to pace yourself. What small, manageable task would feel good to complete today?",
  ],
  anxious: [
    "I notice some signs of anxiety. Remember to breathe deeply - in for 4, hold for 4, out for 4.",
    "When feeling anxious, breaking tasks into smaller steps can help. What's one small thing we could focus on?",
    "Anxiety is often about future uncertainties. Let's focus on what we can control right now.",
    "Would a grounding exercise help? Try naming 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
    "It's okay to feel anxious sometimes. Would talking about what's causing it help, or would you prefer a distraction?",
  ],
  neutral: [
    "How can I help you with your learning journey today?",
    "What would you like to focus on during our session?",
    "I'm here to assist with whatever you need. What's on your mind?",
    "Is there something specific you'd like to learn or discuss today?",
    "How can I support your growth and development right now?",
  ],
}

// Suggestions based on mood
const moodSuggestions = {
  happy: [
    "Tackle a challenging project",
    "Learn something new",
    "Help a peer with their work",
    "Set ambitious goals",
    "Share your knowledge",
  ],
  sad: [
    "Try a quick mindfulness exercise",
    "Work on something creative",
    "Connect with a supportive friend",
    "Set a small, achievable goal",
    "Take a short nature break",
  ],
  focused: [
    "Deep dive into a complex topic",
    "Work on your most important task",
    "Practice deliberate learning",
    "Solve challenging problems",
    "Document your insights",
  ],
  tired: [
    "Review and organize notes",
    "Watch an educational video",
    "Listen to a relevant podcast",
    "Set up for tomorrow's work",
    "Practice gentle reflection",
  ],
  anxious: [
    "Break down a big task into steps",
    "Start with something familiar",
    "Try a 5-minute breathing exercise",
    "Organize your workspace",
    "Write down your concerns",
  ],
  neutral: [
    "Explore a new topic",
    "Review your learning goals",
    "Connect with peers",
    "Reflect on recent progress",
    "Plan your next learning milestone",
  ],
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const messagesEndRef = useRef(null)
  const { user } = useAuth()
  const { currentEmotion, getEmotionFromInput, setEmotionMode } = useEmotion()

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Set initial greeting and suggestions when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const mood = currentEmotion || "neutral"
      const greeting = moodResponses[mood][Math.floor(Math.random() * moodResponses[mood].length)]

      setMessages([
        {
          id: 1,
          text: `Hi ${user?.name || "there"}! ${greeting}`,
          sender: "bot",
          timestamp: new Date(),
        },
      ])

      setSuggestions(moodSuggestions[mood])
    }
  }, [isOpen, messages.length, currentEmotion, user])

  const simulateTyping = (text) => {
    setIsTyping(true)

    // Calculate typing time based on message length (minimum 1 second, maximum 3 seconds)
    const typingTime = Math.min(Math.max(text.length * 30, 1000), 3000)

    setTimeout(() => {
      setIsTyping(false)
    }, typingTime)
  }

  const handleSendMessage = () => {
    if (!input.trim() || isTyping) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Detect emotion from input
    const detectedEmotion = getEmotionFromInput(input)

    // If emotion detected, update the app's emotion mode
    if (detectedEmotion && detectedEmotion !== "neutral") {
      setEmotionMode(detectedEmotion)
    }

    // Select response based on detected emotion
    const mood = detectedEmotion || currentEmotion || "neutral"
    const responses = moodResponses[mood] || moodResponses.neutral
    const response = responses[Math.floor(Math.random() * responses.length)]

    // Simulate typing
    simulateTyping(response)

    // Add bot response after "typing" delay
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])

      // Update suggestions based on mood
      setSuggestions(moodSuggestions[mood])
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion)
  }

  // Get mood icon
  const getMoodIcon = () => {
    switch (currentEmotion) {
      case "happy":
        return <Smile className="h-5 w-5 text-yellow-500" />
      case "sad":
        return <Frown className="h-5 w-5 text-blue-500" />
      case "focused":
        return <Zap className="h-5 w-5 text-purple-500" />
      case "tired":
        return <Frown className="h-5 w-5 text-gray-500" />
      case "anxious":
        return <Zap className="h-5 w-5 text-red-500" />
      default:
        return <Brain className="h-5 w-5 text-primary" />
    }
  }

  if (!isOpen) {
    return (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-4 right-4 z-50">
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg animate-pulse-slow"
          onClick={() => setIsOpen(true)}
        >
          <Bot className="h-6 w-6" />
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <Card className={`w-80 md:w-96 shadow-lg border-2 border-primary/20 ${isMinimized ? "h-auto" : "h-[500px]"}`}>
        <CardHeader className="p-3 flex flex-row items-center justify-between space-y-0 border-b">
          <CardTitle className="text-base font-medium flex items-center">
            <div className="relative mr-2">
              <Bot className="h-5 w-5 text-primary" />
              <span className="absolute -top-1 -right-1">{getMoodIcon()}</span>
            </div>
            AI Assistant
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMinimized(!isMinimized)}>
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="p-3 h-[380px] overflow-y-auto">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex mb-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <Avatar className={`h-8 w-8 ${message.sender === "user" ? "ml-2" : "mr-2"}`}>
                        {message.sender === "bot" ? (
                          <>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                            <AvatarFallback>AI</AvatarFallback>
                          </>
                        ) : (
                          <>
                            <AvatarImage
                              src={user?.avatar || "/placeholder.svg?height=32&width=32"}
                              alt={user?.name || "You"}
                            />
                            <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                          </>
                        )}
                      </Avatar>
                      <div>
                        <div
                          className={`rounded-lg px-3 py-2 ${
                            message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {message.sender === "bot" ? "AI" : "You"} •{" "}
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex mb-3 justify-start"
                  >
                    <div className="flex max-w-[80%] flex-row">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="rounded-lg px-3 py-2 bg-muted">
                          <div className="flex space-x-1">
                            <div
                              className="h-2 w-2 rounded-full bg-primary animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="h-2 w-2 rounded-full bg-primary animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                            <div
                              className="h-2 w-2 rounded-full bg-primary animate-bounce"
                              style={{ animationDelay: "600ms" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </AnimatePresence>
            </CardContent>

            <CardFooter className="p-3 pt-0 flex flex-col">
              {suggestions.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-1">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs py-1 h-auto"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}

              <div className="flex w-full items-center space-x-2">
                <Input
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isTyping}
                  className="border-primary/30 focus-visible:ring-primary/30"
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isTyping}
                  className="btn-shiny"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </CardFooter>
          </>
        )}
      </Card>
    </motion.div>
  )
}
