"use client"

import { useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SubscriptionBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-gradient-to-r from-primary/20 to-primary/10 p-4 rounded-lg mb-6">
      <button
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-medium">Unlock Premium AI Mentors</h3>
          <p className="text-sm text-muted-foreground">
            Upgrade to Pro for access to all specialized mentors and unlimited sessions.
          </p>
        </div>
        <Button size="sm" asChild>
          <Link href="/mentors">Explore Mentors</Link>
        </Button>
      </div>
    </div>
  )
}
