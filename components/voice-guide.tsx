"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, X, Volume2, VolumeX } from "lucide-react"

interface VoiceGuideProps {
  message: string
  onClose: () => void
  autoPlay?: boolean
}

export function VoiceGuide({ message, onClose, autoPlay = true }: VoiceGuideProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isSpeaking, setIsSpeaking] = useState(autoPlay)
  const [isExpanded, setIsExpanded] = useState(false)
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    // Initialize speech synthesis
    if (typeof window !== "undefined" && window.speechSynthesis) {
      speechSynthesisRef.current = new SpeechSynthesisUtterance(message)

      // Set voice properties
      speechSynthesisRef.current.rate = 1
      speechSynthesisRef.current.pitch = 1

      // Try to get a female voice
      const voices = window.speechSynthesis.getVoices()
      const femaleVoice = voices.find((voice) => voice.name.includes("female") || voice.name.includes("Female"))
      if (femaleVoice) {
        speechSynthesisRef.current.voice = femaleVoice
      }

      // Speak if autoPlay is true
      if (autoPlay) {
        window.speechSynthesis.speak(speechSynthesisRef.current)
      }

      // Handle speech end
      speechSynthesisRef.current.onend = () => {
        setIsSpeaking(false)
      }
    }

    return () => {
      // Cancel speech when component unmounts
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [message, autoPlay])

  const toggleSpeech = () => {
    if (window.speechSynthesis && speechSynthesisRef.current) {
      if (isSpeaking) {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
      } else {
        speechSynthesisRef.current = new SpeechSynthesisUtterance(message)
        window.speechSynthesis.speak(speechSynthesisRef.current)
        setIsSpeaking(true)

        speechSynthesisRef.current.onend = () => {
          setIsSpeaking(false)
        }
      }
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    setTimeout(onClose, 300)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 z-50 max-w-sm"
        >
          <div className="bg-black/60 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center">
                <div className="relative w-10 h-10 mr-3">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-70 blur-sm" />
                  <div className="absolute inset-0 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  {isSpeaking && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white/50"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-white">AI Guide</h3>
                  <p className="text-xs text-white/70">Here to help you</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                  onClick={toggleSpeech}
                >
                  {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                  onClick={handleClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div
              className={`p-4 text-white/90 ${isExpanded ? "" : "max-h-24 overflow-hidden"}`}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <p>{message}</p>
              {!isExpanded && message.length > 150 && (
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              )}
            </div>

            {message.length > 150 && (
              <div className="px-4 pb-4 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/70 hover:text-white hover:bg-white/10 text-xs"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Show Less" : "Read More"}
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
