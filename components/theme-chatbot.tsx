"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Send, X, Minimize2, Maximize2, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEmotion } from "./emotion-provider"
import { useAuth } from "./auth-provider"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ThemeChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { currentEmotion, currentTheme } = useEmotion()
  const { user } = useAuth()

  // Initial greeting message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage = {
        id: "initial",
        content: `Hi ${user?.name || "there"}! 👋 I'm your Growth Assistant. How can I help you today?`,
        sender: "bot" as const,
        timestamp: new Date(),
      }
      setMessages([initialMessage])
    }
  }, [isOpen, messages.length, user])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response based on current emotion/theme
    setTimeout(
      () => {
        let responseContent = ""

        // Generate response based on emotion and message content
        if (inputValue.toLowerCase().includes("help") || inputValue.toLowerCase().includes("stuck")) {
          responseContent = getHelpResponse()
        } else if (inputValue.toLowerCase().includes("idea") || inputValue.toLowerCase().includes("suggestion")) {
          responseContent = getIdeaResponse()
        } else if (inputValue.toLowerCase().includes("feel") || inputValue.toLowerCase().includes("emotion")) {
          responseContent = getEmotionResponse()
        } else {
          responseContent = getGeneralResponse()
        }

        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          content: responseContent,
          sender: "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    ) // Random delay between 1-2 seconds
  }

  // Response generators based on current emotion
  const getHelpResponse = () => {
    switch (currentEmotion) {
      case "happy":
        return "Great to see you're in a positive mood! For your question, I'd suggest trying a creative approach. Sometimes the best solutions come when we're feeling good. What specific area would you like help with?"
      case "sad":
        return "I understand things might feel challenging right now. Let's break this down into smaller steps to make it more manageable. What's the first small thing we could tackle together?"
      case "angry":
        return "I can see this might be frustrating. Let's take a step back and look at this from a different angle. Sometimes a fresh perspective can help us find solutions we didn't see before."
      case "anxious":
        return "It's okay to feel overwhelmed sometimes. Let's focus on what's in your control right now. Would it help to make a simple list of next steps together?"
      default:
        return "I'm here to help! Let's work through this together. Could you tell me a bit more about what you're trying to accomplish?"
    }
  }

  const getIdeaResponse = () => {
    switch (currentEmotion) {
      case "happy":
        return "Your positive energy is perfect for creative thinking! Have you considered combining different approaches? Sometimes unexpected combinations lead to breakthrough ideas."
      case "sad":
        return "Even when we're feeling down, our minds can still create beautiful things. Sometimes the most moving art and ideas come from these moments. What if we start with something small that brings you joy?"
      case "angry":
        return "That energy can be channeled into something powerful. Some of the most innovative solutions come from challenging the status quo. What specifically would you like to change or improve?"
      case "anxious":
        return "Let's start with some structured brainstorming to help organize your thoughts. Sometimes having a framework can help manage the overwhelm of too many ideas at once."
      default:
        return "I'd be happy to help with ideas! The Growth Space platform has several tools that might inspire you. Would you like to explore the Magic Box for creative prompts or check out what other students are working on?"
    }
  }

  const getEmotionResponse = () => {
    return `I notice you're feeling ${currentEmotion || "a certain way"} right now. That's completely valid. Our emotions can actually enhance different types of thinking and creativity. Would you like some activities that work well with how you're feeling?`
  }

  const getGeneralResponse = () => {
    const responses = [
      "I'm here to support your growth journey! Would you like help with skills development, finding teammates, or exploring creative challenges?",
      "The Growth Space platform has many tools designed to help you thrive. Is there a specific area you'd like to focus on today?",
      "Learning is most effective when it's personalized. Could you tell me more about your current goals or interests?",
      "Sometimes the best insights come from unexpected connections. Have you tried exploring areas outside your usual interests?",
      "Growth happens at the edge of your comfort zone. Is there something new you've been wanting to try but haven't yet?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Get theme-based styles
  const getChatbotTheme = () => {
    switch (currentTheme) {
      case "calm":
        return "from-calm-light to-calm-dark"
      case "happy":
        return "from-happy-light to-happy-dark"
      case "sad":
        return "from-sad-light to-sad-dark"
      case "angry":
        return "from-danger-400 to-danger-600"
      case "focused":
        return "from-focused-light to-focused-dark"
      default:
        return "from-primary-400 to-primary-600"
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Chat toggle button */}
      <Button
        onClick={toggleChat}
        className={`rounded-full bg-gradient-to-r ${getChatbotTheme()} p-3 text-white shadow-lg hover:shadow-xl`}
        size="icon"
      >
        <MessageSquare className="h-5 w-5" />
      </Button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "500px",
              width: isMinimized ? "300px" : "350px",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950"
          >
            <Card className="flex h-full flex-col">
              {/* Header */}
              <CardHeader className={`flex-shrink-0 bg-gradient-to-r ${getChatbotTheme()} py-3`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white">
                    <Bot className="h-5 w-5" />
                    <span className="font-medium">Growth Assistant</span>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-white hover:bg-white/20"
                      onClick={toggleMinimize}
                    >
                      {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-white hover:bg-white/20"
                      onClick={toggleChat}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              {!isMinimized && (
                <CardContent className="flex-grow overflow-y-auto p-4">
                  <div className="flex flex-col gap-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex max-w-[80%] gap-2 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <Avatar className="h-8 w-8">
                            {message.sender === "bot" ? (
                              <>
                                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                <AvatarFallback className={`bg-gradient-to-r ${getChatbotTheme()}`}>
                                  <Bot className="h-4 w-4 text-white" />
                                </AvatarFallback>
                              </>
                            ) : (
                              <>
                                <AvatarImage src={user?.avatar || "/placeholder.svg?height=32&width=32"} />
                                <AvatarFallback className="bg-primary-100 dark:bg-primary-900">
                                  <User className="h-4 w-4 text-primary-500" />
                                </AvatarFallback>
                              </>
                            )}
                          </Avatar>
                          <div
                            className={`rounded-lg px-3 py-2 ${
                              message.sender === "user"
                                ? "bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100"
                                : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="mt-1 text-right text-xs text-gray-500 dark:text-gray-400">
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex max-w-[80%] gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className={`bg-gradient-to-r ${getChatbotTheme()}`}>
                              <Bot className="h-4 w-4 text-white" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-800">
                            <div className="flex gap-1">
                              <span className="animate-bounce">•</span>
                              <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                                •
                              </span>
                              <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                                •
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>
              )}

              {/* Input */}
              {!isMinimized && (
                <CardFooter className="flex-shrink-0 border-t bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900">
                  <form onSubmit={handleSubmit} className="flex w-full gap-2">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Type your message..."
                      className="flex-grow"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className={`bg-gradient-to-r ${getChatbotTheme()} text-white`}
                      disabled={!inputValue.trim() || isTyping}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardFooter>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
