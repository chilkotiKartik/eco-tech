"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { EmotionModeSwitcher } from "@/components/emotion-mode-switcher"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Home,
  LayoutDashboard,
  BookOpen,
  Users,
  Briefcase,
  Zap,
  Menu,
  LogOut,
  Settings,
  User,
  MessageSquare,
  Clock,
  Brain,
  Sparkles,
  LineChart,
  Globe,
  Lightbulb,
} from "lucide-react"

const mainNavItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Skills",
    href: "/skills",
    icon: Zap,
  },
  {
    name: "Missions",
    href: "/missions",
    icon: BookOpen,
  },
  {
    name: "Teams",
    href: "/teams",
    icon: Users,
  },
  {
    name: "Career Simulator",
    href: "/career-simulator",
    icon: Briefcase,
  },
  {
    name: "Incubation",
    href: "/incubation",
    icon: Lightbulb,
  },
]

// Add new mentor-related nav items
const mentorNavItems = [
  {
    name: "AI Mentors",
    href: "/mentors",
    icon: Brain,
  },
  {
    name: "Find Your Match",
    href: "/mentors/match",
    icon: Sparkles,
  },
  {
    name: "Learning Spaces",
    href: "/mentors/spaces",
    icon: Globe,
  },
  {
    name: "Mentor Insights",
    href: "/mentors/insights",
    icon: LineChart,
  },
]

const userNavItems = [
  {
    name: "Journal",
    href: "/journal",
    icon: MessageSquare,
  },
  {
    name: "Time Capsule",
    href: "/time-capsule",
    icon: Clock,
  },
]

export function Navbar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [isMounted, setIsMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold">Career AI</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {mainNavItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center transition-colors hover:text-foreground/80 ${
                  pathname === item.href ? "text-foreground" : "text-foreground/60"
                }`}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            ))}

            {/* Add Mentors dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 -ml-4 px-4">
                  <Brain className="h-4 w-4 mr-1" />
                  Mentors
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {mentorNavItems.map((item, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link href={item.href} className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SheetHeader>
              <SheetTitle className="text-left">eco </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 py-4">
              {mainNavItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center py-2 text-base ${
                    pathname === item.href ? "font-medium" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.name}
                </Link>
              ))}

              <div className="py-2">
                <h3 className="mb-2 text-sm font-semibold">Mentors</h3>
                {mentorNavItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`flex items-center py-2 text-base ${
                      pathname === item.href ? "font-medium" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="py-2">
                <h3 className="mb-2 text-sm font-semibold">Personal</h3>
                {userNavItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`flex items-center py-2 text-base ${
                      pathname === item.href ? "font-medium" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-6 flex items-center md:hidden">
          <span className="text-xl font-bold">IGNITE</span>
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <LanguageSwitcher />
            <EmotionModeSwitcher />
            <ModeToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/journal">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Journal
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/mentors">
                      <Brain className="mr-2 h-4 w-4" />
                      AI Mentors
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      logout()
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="default" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
