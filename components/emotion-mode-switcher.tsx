"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEmotion } from "./emotion-provider"
import { Smile, Frown, Zap, Brain, Coffee, Sparkles } from "lucide-react"

// Define emotion modes with icons
const emotionModesWithIcons = {
  happy: {
    name: "Happy",
    icon: <Smile className="h-4 w-4" />,
  },
  sad: {
    name: "Sad",
    icon: <Frown className="h-4 w-4" />,
  },
  energetic: {
    name: "Energetic",
    icon: <Zap className="h-4 w-4" />,
  },
  focused: {
    name: "Focused",
    icon: <Brain className="h-4 w-4" />,
  },
  tired: {
    name: "Tired",
    icon: <Coffee className="h-4 w-4" />,
  },
  neutral: {
    name: "Neutral",
    icon: <Sparkles className="h-4 w-4" />,
  },
}

export function EmotionModeSwitcher() {
  const { currentEmotion, setEmotionMode } = useEmotion()
  const [open, setOpen] = useState(false)

  // Get the current emotion icon and name, with fallbacks
  const currentIcon = emotionModesWithIcons[currentEmotion]?.icon || <Sparkles className="h-4 w-4" />
  const currentName = emotionModesWithIcons[currentEmotion]?.name || "Neutral"

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
          <div className="flex h-full w-full items-center justify-center">{currentIcon}</div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(emotionModesWithIcons).map(([key, { name, icon }]) => (
          <DropdownMenuItem
            key={key}
            className={currentEmotion === key ? "bg-accent/50" : ""}
            onClick={() => {
              setEmotionMode(key)
              setOpen(false)
            }}
          >
            <div className="flex items-center gap-2">
              {icon}
              <span>{name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
