"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { ArrowRight, CheckCircle, Clock, Star, BookOpen, Code, Zap, Lightbulb, Brain, Plus } from "lucide-react"

// Learning path data
const learningPaths = {
  tech: [
    {
      id: "web-dev",
      title: "Web Development",
      description: "Learn to build modern web applications",
      level: "Beginner to Intermediate",
      duration: "12 weeks",
      modules: [
        {
          id: "html-css",
          title: "HTML & CSS Fundamentals",
          description: "Learn the building blocks of the web",
          completed: false,
          duration: "2 weeks",
          icon: <Code className="h-4 w-4" />,
        },
        {
          id: "javascript",
          title: "JavaScript Essentials",
          description: "Add interactivity to your websites",
          completed: false,
          duration: "3 weeks",
          icon: <Zap className="h-4 w-4" />,
        },
        {
          id: "react",
          title: "React Framework",
          description: "Build modern user interfaces",
          completed: false,
          duration: "4 weeks",
          icon: <Lightbulb className="h-4 w-4" />,
        },
        {
          id: "backend",
          title: "Backend Development",
          description: "Create APIs and server-side logic",
          completed: false,
          duration: "3 weeks",
          icon: <BookOpen className="h-4 w-4" />,
        },
      ],
    },
    {
      id: "data-science",
      title: "Data Science",
      description: "Learn to analyze and visualize data",
      level: "Intermediate",
      duration: "16 weeks",
      modules: [
        {
          id: "python",
          title: "Python Programming",
          description: "Learn the fundamentals of Python",
          completed: false,
          duration: "3 weeks",
          icon: <Code className="h-4 w-4" />,
        },
        {
          id: "data-analysis",
          title: "Data Analysis",
          description: "Analyze data with pandas and numpy",
          completed: false,
          duration: "4 weeks",
          icon: <Zap className="h-4 w-4" />,
        },
        {
          id: "visualization",
          title: "Data Visualization",
          description: "Create compelling visualizations",
          completed: false,
          duration: "3 weeks",
          icon: <Lightbulb className="h-4 w-4" />,
        },
        {
          id: "machine-learning",
          title: "Machine Learning",
          description: "Build predictive models",
          completed: false,
          duration: "6 weeks",
          icon: <BookOpen className="h-4 w-4" />,
        },
      ],
    },
  ],
  creative: [
    {
      id: "ui-design",
      title: "UI/UX Design",
      description: "Learn to design beautiful user interfaces",
      level: "Beginner to Intermediate",
      duration: "10 weeks",
      modules: [
        {
          id: "design-principles",
          title: "Design Principles",
          description: "Learn the fundamentals of design",
          completed: false,
          duration: "2 weeks",
          icon: <Lightbulb className="h-4 w-4" />,
        },
        {
          id: "figma",
          title: "Figma Essentials",
          description: "Master the industry-standard design tool",
          completed: false,
          duration: "3 weeks",
          icon: <Code className="h-4 w-4" />,
        },
        {
          id: "prototyping",
          title: "Interactive Prototyping",
          description: "Create interactive prototypes",
          completed: false,
          duration: "2 weeks",
          icon: <Zap className="h-4 w-4" />,
        },
        {
          id: "user-research",
          title: "User Research",
          description: "Understand user needs and behaviors",
          completed: false,
          duration: "3 weeks",
          icon: <BookOpen className="h-4 w-4" />,
        },
      ],
    },
  ],
  business: [
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      description: "Learn to market products and services online",
      level: "Beginner to Intermediate",
      duration: "8 weeks",
      modules: [
        {
          id: "marketing-fundamentals",
          title: "Marketing Fundamentals",
          description: "Learn the basics of marketing",
          completed: false,
          duration: "2 weeks",
          icon: <Lightbulb className="h-4 w-4" />,
        },
        {
          id: "social-media",
          title: "Social Media Marketing",
          description: "Leverage social platforms for growth",
          completed: false,
          duration: "2 weeks",
          icon: <Zap className="h-4 w-4" />,
        },
        {
          id: "seo",
          title: "Search Engine Optimization",
          description: "Improve visibility in search results",
          completed: false,
          duration: "2 weeks",
          icon: <Code className="h-4 w-4" />,
        },
        {
          id: "analytics",
          title: "Marketing Analytics",
          description: "Measure and analyze campaign performance",
          completed: false,
          duration: "2 weeks",
          icon: <BookOpen className="h-4 w-4" />,
        },
      ],
    },
  ],
  education: [
    {
      id: "instructional-design",
      title: "Instructional Design",
      description: "Learn to create effective learning experiences",
      level: "Intermediate",
      duration: "12 weeks",
      modules: [
        {
          id: "learning-theory",
          title: "Learning Theory",
          description: "Understand how people learn",
          completed: false,
          duration: "3 weeks",
          icon: <Brain className="h-4 w-4" />,
        },
        {
          id: "curriculum-design",
          title: "Curriculum Design",
          description: "Create structured learning paths",
          completed: false,
          duration: "3 weeks",
          icon: <BookOpen className="h-4 w-4" />,
        },
        {
          id: "assessment",
          title: "Assessment Strategies",
          description: "Evaluate learning outcomes",
          completed: false,
          duration: "3 weeks",
          icon: <CheckCircle className="h-4 w-4" />,
        },
        {
          id: "educational-technology",
          title: "Educational Technology",
          description: "Leverage technology for learning",
          completed: false,
          duration: "3 weeks",
          icon: <Zap className="h-4 w-4" />,
        },
      ],
    },
  ],
  health: [
    {
      id: "health-coaching",
      title: "Health & Wellness Coaching",
      description: "Learn to coach others on health and wellness",
      level: "Beginner to Intermediate",
      duration: "14 weeks",
      modules: [
        {
          id: "nutrition",
          title: "Nutrition Fundamentals",
          description: "Understand the basics of nutrition",
          completed: false,
          duration: "4 weeks",
          icon: <Lightbulb className="h-4 w-4" />,
        },
        {
          id: "fitness",
          title: "Fitness Principles",
          description: "Learn about exercise and physical activity",
          completed: false,
          duration: "4 weeks",
          icon: <Zap className="h-4 w-4" />,
        },
        {
          id: "mental-health",
          title: "Mental Health & Wellbeing",
          description: "Understand mental health and wellness",
          completed: false,
          duration: "3 weeks",
          icon: <Brain className="h-4 w-4" />,
        },
        {
          id: "coaching",
          title: "Coaching Techniques",
          description: "Learn effective coaching methods",
          completed: false,
          duration: "3 weeks",
          icon: <BookOpen className="h-4 w-4" />,
        },
      ],
    },
  ],
}

export function PersonalizedLearningPath() {
  const [selectedPath, setSelectedPath] = useState(null)
  const [activePaths, setActivePaths] = useState([])
  const { user } = useAuth()

  // Initialize active paths based on user interests
  useEffect(() => {
    if (user?.interests && user.interests.length > 0) {
      const userInterests = user.interests
      const paths = []

      userInterests.forEach((interest) => {
        if (learningPaths[interest] && learningPaths[interest].length > 0) {
          // Add first path from each interest
          paths.push({
            ...learningPaths[interest][0],
            interest,
            progress: 0,
          })
        }
      })

      // If no paths found, add default path
      if (paths.length === 0) {
        paths.push({
          ...learningPaths.tech[0],
          interest: "tech",
          progress: 0,
        })
      }

      setActivePaths(paths)
    } else {
      // Default path if no interests
      setActivePaths([
        {
          ...learningPaths.tech[0],
          interest: "tech",
          progress: 0,
        },
      ])
    }
  }, [user?.interests])

  // Calculate path progress
  const calculateProgress = (path) => {
    if (!path || !path.modules) return 0

    const completedModules = path.modules.filter((module) => module.completed).length
    return (completedModules / path.modules.length) * 100
  }

  // Mark module as completed
  const completeModule = (pathId, moduleId) => {
    setActivePaths((prevPaths) =>
      prevPaths.map((path) => {
        if (path.id === pathId) {
          const updatedModules = path.modules.map((module) => {
            if (module.id === moduleId) {
              return { ...module, completed: true }
            }
            return module
          })

          const completedModules = updatedModules.filter((module) => module.completed).length
          const progress = (completedModules / updatedModules.length) * 100

          return { ...path, modules: updatedModules, progress }
        }
        return path
      }),
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Learning Paths</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activePaths.map((path) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="h-full border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{path.title}</CardTitle>
                    <CardDescription>{path.description}</CardDescription>
                  </div>
                  <Badge variant="outline">{path.level}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{path.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    <span>
                      {path.modules.filter((module) => module.completed).length} of {path.modules.length} completed
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{Math.round(calculateProgress(path))}%</span>
                  </div>
                  <Progress value={calculateProgress(path)} className="h-2" />
                </div>

                <div className="space-y-3">
                  {path.modules.slice(0, 2).map((module) => (
                    <div
                      key={module.id}
                      className={`p-3 rounded-lg border ${
                        module.completed
                          ? "bg-primary/5 border-primary/30"
                          : "hover:border-primary/30 transition-colors"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className={`p-1.5 rounded-full mr-2 ${module.completed ? "bg-primary/10" : "bg-muted"}`}>
                            {module.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{module.title}</h4>
                            <p className="text-xs text-muted-foreground">{module.description}</p>
                          </div>
                        </div>
                        {module.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            {module.duration}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}

                  {path.modules.length > 2 && (
                    <p className="text-xs text-center text-muted-foreground">+{path.modules.length - 2} more modules</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => setSelectedPath(path)}
                  variant={calculateProgress(path) === 100 ? "outline" : "default"}
                >
                  {calculateProgress(path) === 100 ? "Completed" : "Continue Learning"}
                  {calculateProgress(path) !== 100 && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="h-full border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="p-4 rounded-full bg-primary/10 mb-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Discover New Paths</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Explore more learning paths tailored to your interests and goals
              </p>
              <Button variant="outline">Browse Paths</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {selectedPath && (
        <Card className="border-2 border-primary/20 mt-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{selectedPath.title}</CardTitle>
                <CardDescription>{selectedPath.description}</CardDescription>
              </div>
              <Badge variant="outline">{selectedPath.level}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{selectedPath.duration}</span>
                </div>
                <div className="space-y-1 w-64">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{Math.round(calculateProgress(selectedPath))}%</span>
                  </div>
                  <Progress value={calculateProgress(selectedPath)} className="h-2" />
                </div>
              </div>

              <div className="space-y-3 mt-6">
                {selectedPath.modules.map((module, index) => (
                  <div
                    key={module.id}
                    className={`p-4 rounded-lg border ${
                      module.completed ? "bg-primary/5 border-primary/30" : "hover:border-primary/30 transition-colors"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <div className={`p-2 rounded-full mr-3 ${module.completed ? "bg-primary/10" : "bg-muted"}`}>
                          {module.icon}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-2">
                              Module {index + 1}
                            </Badge>
                            <h4 className="font-medium">{module.title}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2">
                          {module.duration}
                        </Badge>
                        {module.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Button size="sm" onClick={() => completeModule(selectedPath.id, module.id)}>
                            {index === 0 || selectedPath.modules[index - 1].completed ? "Start" : "Locked"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setSelectedPath(null)}>
              Back to Paths
            </Button>
            <Button disabled={calculateProgress(selectedPath) !== 100}>
              {calculateProgress(selectedPath) === 100 ? "Get Certificate" : "Complete All Modules"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
