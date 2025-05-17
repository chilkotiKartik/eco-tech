"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { useEmotion } from "@/components/emotion-provider"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
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
  X,
  Heart,
  Smile,
  Frown,
  Coffee,
  AlertCircle,
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
]

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

const moodIcons = {
  happy: <Smile className="h-4 w-4 text-yellow-500" />,
  sad: <Frown className="h-4 w-4 text-blue-500" />,
  focused: <Brain className="h-4 w-4 text-purple-500" />,
  tired: <Coffee className="h-4 w-4 text-gray-500" />,
  anxious: <AlertCircle className="h-4 w-4 text-red-500" />,
  neutral: <Heart className="h-4 w-4 text-primary" />,
}

export function ResponsiveNavbar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { currentEmotion } = useEmotion()
  const [isMounted, setIsMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  if (!isMounted) {
    return null
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="mr-2 h-9 w-9 rounded-full" aria-label="Toggle Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[350px] pr-0">
              <SheetHeader className="pb-6">
                <SheetTitle className="flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary/10">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <span className="font-bold text-xl">Growth Space</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 py-2 h-[calc(100vh-80px)] overflow-y-auto">
                <div className="space-y-2">
                  <h3 className="px-4 text-sm font-medium text-muted-foreground">Main Navigation</h3>
                  <nav className="flex flex-col gap-1">
                    {mainNavItems.map((item, index) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-2.5 text-base transition-colors rounded-md ${
                          pathname === item.href
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="space-y-2">
                  <h3 className="px-4 text-sm font-medium text-muted-foreground">Mentors & Learning</h3>
                  <nav className="flex flex-col gap-1">
                    {mentorNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-2.5 text-base transition-colors rounded-md ${
                          pathname === item.href
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="space-y-2">
                  <h3 className="px-4 text-sm font-medium text-muted-foreground">Personal</h3>
                  <nav className="flex flex-col gap-1">
                    {userNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-2.5 text-base transition-colors rounded-md ${
                          pathname === item.href
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>

                {user && (
                  <div className="mt-auto border-t pt-4">
                    <div className="flex items-center gap-3 px-4 py-2">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium leading-none truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => {
                          logout()
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">Growth Space</span>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={pathname.startsWith("/mentors") ? "secondary" : "ghost"}
                className="flex items-center gap-2 px-3 py-2 h-9"
              >
                <Brain className="h-4 w-4" />
                <span className="text-sm font-medium">Mentors</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {mentorNavItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full" aria-label="User menu">
                  <div className="relative">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-0.5">
                      {moodIcons[currentEmotion] || moodIcons.neutral}
                    </div>
                  </div>
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
                  <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/journal" className="flex items-center gap-2 cursor-pointer">
                    <MessageSquare className="h-4 w-4" />
                    Journal
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/mentors" className="flex items-center gap-2 cursor-pointer">
                    <Brain className="h-4 w-4" />
                    AI Mentors
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" />
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
            <Button size="sm" asChild>
              <Link href="/login">
                <User className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
