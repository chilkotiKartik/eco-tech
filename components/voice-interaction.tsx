"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/toast"
import { useEmotion } from "@/components/emotion-provider"
import { Mic, MicOff, Play, Pause } from "lucide-react"

export function VoiceInteraction() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [isSupported, setIsSupported] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const recognitionRef = useRef(null)
  const synthRef = useRef(null)
  const { toast } = useToast()
  const { getEmotionFromInput, setEmotionMode } = useEmotion()

  // Initialize speech recognition and synthesis
  useEffect(() => {
    // Check if browser supports speech recognition
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const SpeechSynthesis = window.speechSynthesis

      if (SpeechRecognition && SpeechSynthesis) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = "en-US"

        recognitionRef.current.onresult = (event) => {
          const current = event.resultIndex
          const transcriptText = event.results[current][0].transcript
          setTranscript(transcriptText)

          // Process the transcript
          processVoiceCommand(transcriptText)
        }

        recognitionRef.current.onerror = (event) => {
          console.error("Speech recognition error", event.error)
          setIsListening(false)
          toast({
            title: "Error",
            description: `Speech recognition error: ${event.error}`,
            variant: "destructive",
          })
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }

        synthRef.current = SpeechSynthesis
      } else {
        setIsSupported(false)
        toast({
          title: "Not Supported",
          description: "Speech recognition is not supported in your browser.",
          variant: "destructive",
        })
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
      if (synthRef.current && synthRef.current.speaking) {
        synthRef.current.cancel()
      }
    }
  }, [toast])

  // Process voice command
  const processVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase()

    // Detect emotion from command
    const detectedEmotion = getEmotionFromInput(lowerCommand)
    if (detectedEmotion && detectedEmotion !== "neutral") {
      setEmotionMode(detectedEmotion)
    }

    // Handle navigation commands
    if (lowerCommand.includes("go to") || lowerCommand.includes("navigate to") || lowerCommand.includes("open")) {
      if (lowerCommand.includes("dashboard")) {
        setResponse("Navigating to dashboard...")
        setTimeout(() => (window.location.href = "/dashboard"), 1500)
        return
      }
      if (lowerCommand.includes("skills")) {
        setResponse("Navigating to skills page...")
        setTimeout(() => (window.location.href = "/skills"), 1500)
        return
      }
      if (lowerCommand.includes("missions")) {
        setResponse("Navigating to missions page...")
        setTimeout(() => (window.location.href = "/missions"), 1500)
        return
      }
      if (lowerCommand.includes("teams")) {
        setResponse("Navigating to teams page...")
        setTimeout(() => (window.location.href = "/teams"), 1500)
        return
      }
      if (lowerCommand.includes("career") || lowerCommand.includes("simulator")) {
        setResponse("Navigating to career simulator...")
        setTimeout(() => (window.location.href = "/career-simulator"), 1500)
        return
      }
      if (lowerCommand.includes("mentor")) {
        setResponse("Navigating to mentors page...")
        setTimeout(() => (window.location.href = "/mentors"), 1500)
        return
      }
      if (lowerCommand.includes("journal")) {
        setResponse("Navigating to journal page...")
        setTimeout(() => (window.location.href = "/journal"), 1500)
        return
      }
      if (lowerCommand.includes("home")) {
        setResponse("Navigating to home page...")
        setTimeout(() => (window.location.href = "/"), 1500)
        return
      }
    }

    // Handle mood commands
    if (lowerCommand.includes("i feel") || lowerCommand.includes("i am") || lowerCommand.includes("i'm")) {
      if (detectedEmotion) {
        setResponse(`I've detected that you're feeling ${detectedEmotion}. I've updated your experience accordingly.`)
        return
      }
    }

    // Handle help commands
    if (lowerCommand.includes("help") || lowerCommand.includes("what can you do")) {
      setResponse(
        "I can help you navigate the platform, update your mood, or answer questions. Try saying 'Go to dashboard' or 'I feel happy'.",
      )
      return
    }

    // Default response
    setResponse(`I heard: "${command}". How can I help you with that?`)
  }

  // Start listening
  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript("")
      setResponse("")
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  // Stop listening
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  // Speak response
  const speakResponse = () => {
    if (synthRef.current && response) {
      if (synthRef.current.speaking) {
        synthRef.current.cancel()
        setIsSpeaking(false)
        return
      }

      const utterance = new SpeechSynthesisUtterance(response)
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      synthRef.current.speak(utterance)
    }
  }

  if (!isSupported) {
    return null
  }

  return (
    <div className="fixed bottom-20 left-4 z-40">
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="w-80 border-2 border-primary/20">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium flex items-center">
                    <Mic className="h-4 w-4 mr-2 text-primary" />
                    Voice Assistant
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setIsExpanded(false)}
                  >
                    <MicOff className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Speak to navigate or control the platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {isListening && (
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                        <div className="relative rounded-full bg-primary/50 p-2">
                          <Mic className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className={`p-4 rounded-lg border min-h-[100px] flex items-center justify-center text-center transition-colors ${
                      isListening ? "bg-primary/5 border-primary/30" : "bg-muted/50"
                    }`}
                  >
                    {transcript ? (
                      <p className="text-sm">{transcript}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {isListening ? "Listening..." : "Press the microphone button and speak"}
                      </p>
                    )}
                  </div>
                </div>

                {response && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-primary/5 border border-primary/20"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm">{response}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full ml-2 flex-shrink-0"
                        onClick={speakResponse}
                      >
                        {isSpeaking ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  className={`w-full ${isListening ? "bg-red-500 hover:bg-red-600" : ""}`}
                  onClick={isListening ? stopListening : startListening}
                >
                  {isListening ? (
                    <>
                      <MicOff className="mr-2 h-4 w-4" />
                      Stop Listening
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-4 w-4" />
                      Start Listening
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full shadow-md border-2 border-primary/20"
              onClick={() => setIsExpanded(true)}
            >
              <Mic className="h-5 w-5 text-primary" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
