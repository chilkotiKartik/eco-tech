"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react"

interface MentorVoiceInteractionProps {
  mentorName: string
  onSpeechResult: (text: string) => void
  onSpeechStart?: () => void
  onSpeechEnd?: () => void
  isProcessing?: boolean
  responseText?: string
  voiceStyle?: "neutral" | "enthusiastic" | "calm" | "authoritative"
}

export function MentorVoiceInteraction({
  mentorName,
  onSpeechResult,
  onSpeechStart,
  onSpeechEnd,
  isProcessing = false,
  responseText = "",
  voiceStyle = "neutral",
}: MentorVoiceInteractionProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSupported, setIsSupported] = useState(true)
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  // Initialize speech recognition and synthesis
  useEffect(() => {
    // Check for browser support
    if (typeof window !== "undefined") {
      // Speech recognition setup
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = "en-US"

        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result) => result.transcript)
            .join("")
          setTranscript(transcript)
        }

        recognitionRef.current.onend = () => {
          if (isListening) {
            recognitionRef.current.start()
          }
        }
      } else {
        setIsSupported(false)
      }

      // Speech synthesis setup
      if (window.speechSynthesis) {
        synthRef.current = window.speechSynthesis
      } else {
        setIsSupported(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [])

  // Handle listening state changes
  useEffect(() => {
    if (isListening) {
      try {
        recognitionRef.current?.start()
        onSpeechStart?.()
      } catch (error) {
        console.error("Error starting speech recognition:", error)
      }
    } else {
      try {
        recognitionRef.current?.stop()
        if (transcript) {
          onSpeechResult(transcript)
          onSpeechEnd?.()
        }
      } catch (error) {
        console.error("Error stopping speech recognition:", error)
      }
    }
  }, [isListening, onSpeechResult, onSpeechEnd, onSpeechStart, transcript])

  // Speak the response text
  useEffect(() => {
    if (responseText && synthRef.current && !isSpeaking) {
      const utterance = new SpeechSynthesisUtterance(responseText)

      // Set voice based on style
      const voices = synthRef.current.getVoices()
      if (voices.length > 0) {
        // Try to find a voice that matches the style
        // This is simplified - in a real app, you'd have a more sophisticated mapping
        const selectedVoice = voices.find((voice) => voice.lang.includes("en-US"))

        // Adjust pitch and rate based on style
        switch (voiceStyle) {
          case "enthusiastic":
            utterance.pitch = 1.2
            utterance.rate = 1.1
            break
          case "calm":
            utterance.pitch = 0.9
            utterance.rate = 0.9
            break
          case "authoritative":
            utterance.pitch = 0.8
            utterance.rate = 0.95
            break
          default:
            utterance.pitch = 1
            utterance.rate = 1
        }

        if (selectedVoice) {
          utterance.voice = selectedVoice
        }
      }

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)

      synthRef.current.speak(utterance)
    }
  }, [responseText, voiceStyle])

  const toggleListening = () => {
    if (isSpeaking) {
      // Cancel speaking if currently speaking
      if (synthRef.current) {
        synthRef.current.cancel()
        setIsSpeaking(false)
      }
    }

    setIsListening((prev) => !prev)
    if (!isListening) {
      setTranscript("")
    }
  }

  const toggleSpeaking = () => {
    if (isSpeaking) {
      if (synthRef.current) {
        synthRef.current.cancel()
        setIsSpeaking(false)
      }
    } else if (responseText && synthRef.current) {
      const utterance = new SpeechSynthesisUtterance(responseText)
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      synthRef.current.speak(utterance)
    }
  }

  if (!isSupported) {
    return (
      <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md">
        <p>Voice interaction is not supported in your browser.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
        <div className="flex items-center space-x-2">
          <span className="font-medium">{mentorName} Voice Assistant</span>
          {isProcessing && <span className="text-sm text-slate-500">(Processing...)</span>}
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleListening}
            className={isListening ? "bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700" : ""}
            aria-label={isListening ? "Stop listening" : "Start listening"}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSpeaking}
            disabled={!responseText}
            className={isSpeaking ? "bg-purple-100 text-purple-600 hover:bg-purple-200 hover:text-purple-700" : ""}
            aria-label={isSpeaking ? "Stop speaking" : "Start speaking"}
          >
            {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {isListening && (
        <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-md">
          <p className="text-sm font-medium">Listening...</p>
          <p className="text-sm italic">{transcript || "Say something..."}</p>
        </div>
      )}

      {responseText && (
        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-md">
          <p className="text-sm font-medium">Response:</p>
          <p className="text-sm">{responseText}</p>
        </div>
      )}
    </div>
  )
}
