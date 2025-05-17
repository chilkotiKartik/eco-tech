"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/components/auth-provider"
import { VoiceGuide } from "@/components/voice-guide"
import {
  ArrowRight,
  Github,
  Mail,
  Key,
  User,
  Rocket,
  Code,
  Music,
  Palette,
  Brain,
  BookOpen,
  Sparkles,
} from "lucide-react"

// Career icons mapping
const careerIcons = {
  developer: <Code className="h-6 w-6" />,
  musician: <Music className="h-6 w-6" />,
  artist: <Palette className="h-6 w-6" />,
  researcher: <Brain className="h-6 w-6" />,
  educator: <BookOpen className="h-6 w-6" />,
  entrepreneur: <Rocket className="h-6 w-6" />,
}

// Career welcome messages
const careerWelcomeMessages = {
  developer: "Welcome, Developer! Ready to code your future?",
  musician: "Welcome, Musician! Ready to compose your journey?",
  artist: "Welcome, Artist! Ready to create your masterpiece?",
  researcher: "Welcome, Researcher! Ready to discover new knowledge?",
  educator: "Welcome, Educator! Ready to inspire the next generation?",
  entrepreneur: "Welcome, Entrepreneur! Ready to build your venture?",
  default: "Welcome to Em-Sphere! Your journey begins here.",
}

// Career-specific voice guide messages
const careerVoiceMessages = {
  developer:
    "Welcome to Em-Sphere for Developers! I'll be your coding companion, helping you master programming languages, build amazing applications, and connect with other developers. Let's start by logging in or creating an account.",
  musician:
    "Welcome to Em-Sphere for Musicians! I'll be your musical guide, helping you improve your composition skills, master your instruments, and connect with other musicians. Let's start by logging in or creating an account.",
  artist:
    "Welcome to Em-Sphere for Artists! I'll be your creative companion, helping you refine your techniques, explore new mediums, and showcase your work. Let's start by logging in or creating an account.",
  researcher:
    "Welcome to Em-Sphere for Researchers! I'll be your academic guide, helping you explore new fields, analyze data, and publish your findings. Let's start by logging in or creating an account.",
  educator:
    "Welcome to Em-Sphere for Educators! I'll be your teaching assistant, helping you develop curriculum, engage students, and implement effective teaching strategies. Let's start by logging in or creating an account.",
  entrepreneur:
    "Welcome to Em-Sphere for Entrepreneurs! I'll be your business companion, helping you develop your ideas, create business plans, and connect with investors. Let's start by logging in or creating an account.",
  default:
    "Welcome to Em-Sphere! I'm your AI guide, here to help you navigate your learning journey. Let's start by logging in or creating an account.",
}

// Career background gradients
const careerBackgrounds = {
  developer: "from-blue-900 via-indigo-800 to-purple-900",
  musician: "from-purple-900 via-pink-800 to-indigo-900",
  artist: "from-orange-900 via-red-800 to-pink-900",
  researcher: "from-green-900 via-teal-800 to-blue-900",
  educator: "from-red-900 via-orange-800 to-yellow-900",
  entrepreneur: "from-indigo-900 via-blue-800 to-cyan-900",
  default: "from-violet-900 via-indigo-800 to-purple-900",
}

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [showReset, setShowReset] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const [showVoiceGuide, setShowVoiceGuide] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const career = searchParams.get("career") || localStorage.getItem("selectedCareer") || "default"
  const { login, demoLogin } = useAuth()

  useEffect(() => {
    // Show voice guide after 1 second
    const timer = setTimeout(() => {
      setShowVoiceGuide(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Call the login function from AuthProvider
      await login(email, password)

      // Navigate to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Call the login function from AuthProvider with the new user
      await login(email, password)

      // Navigate to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Signup failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordReset = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setResetSent(true)
    } catch (error) {
      console.error("Password reset failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setIsLoading(true)

    try {
      await demoLogin()
      router.push("/dashboard")
    } catch (error) {
      console.error("Demo login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`flex min-h-screen flex-col bg-gradient-to-br ${careerBackgrounds[career] || careerBackgrounds.default}`}
    >
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-24 h-24"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-70 blur-lg" />
              <div className="absolute inset-4 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                {careerIcons[career] || <Sparkles className="h-10 w-10 text-white" />}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-white">
              {careerWelcomeMessages[career] || careerWelcomeMessages.default}
            </h1>
          </motion.div>

          <AnimatePresence mode="wait">
            {showReset ? (
              <motion.div
                key="reset"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-2 border-white/20 bg-black/30 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Reset Password</CardTitle>
                    <CardDescription className="text-white/70">
                      {resetSent
                        ? "Check your email for a password reset link"
                        : "Enter your email to receive a password reset link"}
                    </CardDescription>
                  </CardHeader>
                  {!resetSent ? (
                    <form onSubmit={handlePasswordReset}>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="reset-email" className="text-white">
                            Email
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                            <Input
                              id="reset-email"
                              type="email"
                              placeholder="your.email@example.com"
                              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                              value={resetEmail}
                              onChange={(e) => setResetEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col space-y-2">
                        <Button
                          type="submit"
                          className="w-full bg-white/20 hover:bg-white/30 text-white"
                          disabled={isLoading}
                        >
                          {isLoading ? "Sending..." : "Send Reset Link"}
                        </Button>
                        <Button
                          variant="ghost"
                          type="button"
                          className="w-full text-white hover:bg-white/10"
                          onClick={() => {
                            setShowReset(false)
                            setResetSent(false)
                          }}
                          disabled={isLoading}
                        >
                          Back to Login
                        </Button>
                      </CardFooter>
                    </form>
                  ) : (
                    <CardContent className="space-y-4">
                      <div className="rounded-lg bg-white/10 p-4 text-center">
                        <p className="text-sm text-white">
                          We've sent a password reset link to <strong>{resetEmail}</strong>. Please check your inbox.
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full text-white hover:bg-white/10"
                        onClick={() => {
                          setShowReset(false)
                          setResetSent(false)
                        }}
                      >
                        Back to Login
                      </Button>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="auth"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-2 border-white/20 bg-black/30 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-center text-2xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500">
                      Em-Sphere
                    </CardTitle>
                    <CardDescription className="text-center text-white/70">
                      Your platform for personal and professional growth
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-2 bg-white/10">
                        <TabsTrigger value="login" className="text-white data-[state=active]:bg-white/20">
                          Login
                        </TabsTrigger>
                        <TabsTrigger value="signup" className="text-white data-[state=active]:bg-white/20">
                          Sign Up
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="login" className="mt-4">
                        <form onSubmit={handleLogin} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-white">
                              Email
                            </Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                              <Input
                                id="email"
                                type="email"
                                placeholder="your.email@example.com"
                                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="password" className="text-white">
                                Password
                              </Label>
                              <Button
                                variant="link"
                                className="h-auto p-0 text-xs text-white/70 hover:text-white"
                                onClick={(e) => {
                                  e.preventDefault()
                                  setShowReset(true)
                                }}
                              >
                                Forgot password?
                              </Button>
                            </div>
                            <div className="relative">
                              <Key className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                              <Input
                                id="password"
                                type="password"
                                className="pl-10 bg-white/10 border-white/20 text-white"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="remember"
                              className="border-white/50 data-[state=checked]:bg-white/80 data-[state=checked]:text-black"
                            />
                            <Label htmlFor="remember" className="text-sm text-white">
                              Remember me
                            </Label>
                          </div>
                          <Button
                            type="submit"
                            className="w-full bg-white/20 hover:bg-white/30 text-white"
                            disabled={isLoading}
                          >
                            {isLoading ? "Logging in..." : "Login"}
                          </Button>
                        </form>
                      </TabsContent>
                      <TabsContent value="signup" className="mt-4">
                        <form onSubmit={handleSignup} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-white">
                              Name
                            </Label>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                              <Input
                                id="name"
                                placeholder="Your Name"
                                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="signup-email" className="text-white">
                              Email
                            </Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                              <Input
                                id="signup-email"
                                type="email"
                                placeholder="your.email@example.com"
                                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="signup-password" className="text-white">
                              Password
                            </Label>
                            <div className="relative">
                              <Key className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                              <Input
                                id="signup-password"
                                type="password"
                                className="pl-10 bg-white/10 border-white/20 text-white"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <Button
                            type="submit"
                            className="w-full bg-white/20 hover:bg-white/30 text-white"
                            disabled={isLoading}
                          >
                            {isLoading ? "Creating account..." : "Create Account"}
                          </Button>
                        </form>
                      </TabsContent>
                    </Tabs>

                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-white/20"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-black/30 px-2 text-white/70">Or continue with</span>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          className="w-full border-white/20 bg-white/10 text-white hover:bg-white/20"
                          disabled={isLoading}
                        >
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-white/20 bg-white/10 text-white hover:bg-white/20"
                          onClick={handleDemoLogin}
                          disabled={isLoading}
                        >
                          <Rocket className="mr-2 h-4 w-4" />
                          Demo
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="link" asChild className="text-white/70 hover:text-white">
                      <a href="/home" className="flex items-center text-xs">
                        <ArrowRight className="mr-1 h-3 w-3" />
                        Back to Home
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 text-center">
            <p className="text-sm text-white/70">
              By signing in, you agree to our{" "}
              <a href="#" className="underline underline-offset-2 hover:text-white">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-2 hover:text-white">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Voice Guide */}
      {showVoiceGuide && (
        <VoiceGuide
          message={careerVoiceMessages[career] || careerVoiceMessages.default}
          onClose={() => setShowVoiceGuide(false)}
        />
      )}
    </div>
  )
}
