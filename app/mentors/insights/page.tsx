"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  BarChart2,
  Brain,
  Calendar,
  Clock,
  Code,
  Briefcase,
  Heart,
  Download,
  LineChart,
  PieChart,
  Share2,
  Star,
  TrendingUp,
  Users,
  Lightbulb,
} from "lucide-react"

// Sample insights data
const insightsData = {
  learningProgress: {
    overall: 68,
    byCategory: {
      technical: 75,
      career: 60,
      emotional: 82,
      learning: 55,
    },
    recentMilestones: [
      {
        title: "Completed React Advanced Patterns",
        date: "2 days ago",
        mentor: "CodeMaster",
        category: "technical",
      },
      {
        title: "Mastered Active Listening Technique",
        date: "1 week ago",
        mentor: "EmpathyGuide",
        category: "emotional",
      },
      {
        title: "Created Professional Portfolio",
        date: "2 weeks ago",
        mentor: "CareerNavigator",
        category: "career",
      },
    ],
  },
  mentorInteractions: {
    totalSessions: 42,
    totalHours: 28.5,
    byMentor: [
      { name: "CodeMaster", sessions: 18, hours: 12.5, rating: 4.8 },
      { name: "CareerNavigator", sessions: 12, hours: 8, rating: 4.9 },
      { name: "EmpathyGuide", sessions: 8, hours: 5, rating: 4.7 },
      { name: "LearningArchitect", sessions: 4, hours: 3, rating: 4.6 },
    ],
    recentSessions: [
      {
        mentor: "CodeMaster",
        topic: "React Performance Optimization",
        date: "Yesterday",
        duration: 60,
        rating: 5,
      },
      {
        mentor: "CareerNavigator",
        topic: "Interview Preparation",
        date: "3 days ago",
        duration: 45,
        rating: 5,
      },
      {
        mentor: "EmpathyGuide",
        topic: "Conflict Resolution Strategies",
        date: "1 week ago",
        duration: 30,
        rating: 4,
      },
    ],
  },
  skillGrowth: {
    topGrowingSkills: [
      { name: "React", growth: 32, category: "technical" },
      { name: "Communication", growth: 28, category: "emotional" },
      { name: "System Design", growth: 24, category: "technical" },
      { name: "Interview Skills", growth: 22, category: "career" },
      { name: "Focus Techniques", growth: 18, category: "learning" },
    ],
    skillDistribution: {
      technical: 45,
      emotional: 25,
      career: 20,
      learning: 10,
    },
    recommendations: [
      {
        skill: "TypeScript",
        reason: "Complements your React expertise",
        mentor: "CodeMaster",
      },
      {
        skill: "Public Speaking",
        reason: "Will enhance your career prospects",
        mentor: "CareerNavigator",
      },
      {
        skill: "Spaced Repetition",
        reason: "Will improve your knowledge retention",
        mentor: "LearningArchitect",
      },
    ],
  },
  learningPatterns: {
    peakTimes: [
      { day: "Monday", hour: 20, productivity: 85 },
      { day: "Wednesday", hour: 19, productivity: 90 },
      { day: "Saturday", hour: 10, productivity: 95 },
    ],
    consistencyScore: 82,
    focusMetrics: {
      averageSessionLength: 42,
      distractionRate: 15,
      deepWorkPeriods: 3.2,
    },
    recommendations: [
      "Your focus is highest in the morning. Consider scheduling complex learning then.",
      "You learn technical skills best in 45-minute focused sessions.",
      "Taking a 5-minute break every 25 minutes improves your retention.",
    ],
  },
}

export default function MentorInsightsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("progress")
  const [timeRange, setTimeRange] = useState("3months")

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Mentor Insights</h1>
              <p className="text-muted-foreground">
                AI-powered analysis of your learning journey and mentor interactions
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
                    <h3 className="text-2xl font-bold">{insightsData.learningProgress.overall}%</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <Progress value={insightsData.learningProgress.overall} className="h-2 mt-4" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Sessions</p>
                    <h3 className="text-2xl font-bold">{insightsData.mentorInteractions.totalSessions}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  {insightsData.mentorInteractions.totalHours} hours of mentorship
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Top Skill Growth</p>
                    <h3 className="text-2xl font-bold">{insightsData.skillGrowth.topGrowingSkills[0].name}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  +{insightsData.skillGrowth.topGrowingSkills[0].growth}% growth in the last period
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Consistency Score</p>
                    <h3 className="text-2xl font-bold">{insightsData.learningPatterns.consistencyScore}/100</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <Progress value={insightsData.learningPatterns.consistencyScore} className="h-2 mt-4" />
              </CardContent>
            </Card>
          </div>

          {/* Main content tabs */}
          <Tabs defaultValue="progress" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <TabsTrigger value="progress" className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                <span>Learning Progress</span>
              </TabsTrigger>
              <TabsTrigger value="mentors" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Mentor Interactions</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <span>Skill Growth</span>
              </TabsTrigger>
              <TabsTrigger value="patterns" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                <span>Learning Patterns</span>
              </TabsTrigger>
            </TabsList>

            {/* Learning Progress Tab */}
            <TabsContent value="progress" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Progress by Category</CardTitle>
                    <CardDescription>Your learning progress across different skill categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center">
                      <BarChart2 className="h-60 w-60 text-muted-foreground" />
                      <div className="sr-only">
                        A bar chart showing progress by category: Technical{" "}
                        {insightsData.learningProgress.byCategory.technical}%, Career{" "}
                        {insightsData.learningProgress.byCategory.career}%, Emotional{" "}
                        {insightsData.learningProgress.byCategory.emotional}%, Learning{" "}
                        {insightsData.learningProgress.byCategory.learning}%
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Milestones</CardTitle>
                    <CardDescription>Your latest learning achievements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {insightsData.learningProgress.recentMilestones.map((milestone, index) => (
                      <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center text-white
                            ${milestone.category === "technical" ? "bg-blue-500" : ""}
                            ${milestone.category === "career" ? "bg-amber-500" : ""}
                            ${milestone.category === "emotional" ? "bg-purple-500" : ""}
                            ${milestone.category === "learning" ? "bg-green-500" : ""}
                          `}
                        >
                          {milestone.category === "technical" && <Code className="h-4 w-4" />}
                          {milestone.category === "career" && <Briefcase className="h-4 w-4" />}
                          {milestone.category === "emotional" && <Heart className="h-4 w-4" />}
                          {milestone.category === "learning" && <Brain className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium">{milestone.title}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{milestone.date}</span>
                            <span>•</span>
                            <span>with {milestone.mentor}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Milestones
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Mentor Interactions Tab */}
            <TabsContent value="mentors" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Mentor Session Distribution</CardTitle>
                    <CardDescription>Breakdown of your sessions with different mentors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center">
                      <PieChart className="h-60 w-60 text-muted-foreground" />
                      <div className="sr-only">A pie chart showing mentor session distribution</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Mentor Ratings</CardTitle>
                    <CardDescription>Your ratings for different mentors</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {insightsData.mentorInteractions.byMentor.map((mentor, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{mentor.name}</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-amber-500 fill-current" />
                            <span className="ml-1">{mentor.rating}</span>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {mentor.sessions} sessions • {mentor.hours} hours
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Sessions</CardTitle>
                    <CardDescription>Your most recent mentor interactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {insightsData.mentorInteractions.recentSessions.map((session, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{session.mentor}</span>
                                <div className="flex items-center">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 ${
                                        i < session.rating ? "text-amber-500 fill-current" : "text-muted-foreground"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm">{session.topic}</p>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{session.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{session.duration} min</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Sessions
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Skill Growth Tab */}
            <TabsContent value="skills" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Top Growing Skills</CardTitle>
                    <CardDescription>Skills with the highest growth rate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {insightsData.skillGrowth.topGrowingSkills.map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={`
                                  ${skill.category === "technical" ? "bg-blue-500/10 text-blue-500" : ""}
                                  ${skill.category === "career" ? "bg-amber-500/10 text-amber-500" : ""}
                                  ${skill.category === "emotional" ? "bg-purple-500/10 text-purple-500" : ""}
                                  ${skill.category === "learning" ? "bg-green-500/10 text-green-500" : ""}
                                `}
                              >
                                {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
                              </Badge>
                              <span className="font-medium">{skill.name}</span>
                            </div>
                            <span className="text-green-500">+{skill.growth}%</span>
                          </div>
                          <Progress value={skill.growth} max={40} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Skill Distribution</CardTitle>
                    <CardDescription>Breakdown of your skill categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60 flex items-center justify-center">
                      <PieChart className="h-40 w-40 text-muted-foreground" />
                      <div className="sr-only">A pie chart showing skill distribution</div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-blue-500" />
                          <span className="text-sm">Technical</span>
                        </div>
                        <span className="text-sm">{insightsData.skillGrowth.skillDistribution.technical}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-purple-500" />
                          <span className="text-sm">Emotional</span>
                        </div>
                        <span className="text-sm">{insightsData.skillGrowth.skillDistribution.emotional}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-amber-500" />
                          <span className="text-sm">Career</span>
                        </div>
                        <span className="text-sm">{insightsData.skillGrowth.skillDistribution.career}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-green-500" />
                          <span className="text-sm">Learning</span>
                        </div>
                        <span className="text-sm">{insightsData.skillGrowth.skillDistribution.learning}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>Skill Recommendations</CardTitle>
                    <CardDescription>AI-powered suggestions for your skill development</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {insightsData.skillGrowth.recommendations.map((rec, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <Badge variant="secondary">{rec.skill}</Badge>
                                <span className="text-sm text-muted-foreground">from {rec.mentor}</span>
                              </div>
                              <p className="text-sm">{rec.reason}</p>
                              <Button variant="outline" size="sm" className="w-full">
                                Add to Learning Path
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Learning Patterns Tab */}
            <TabsContent value="patterns" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Productivity by Time of Day</CardTitle>
                    <CardDescription>When you learn most effectively</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center">
                      <BarChart2 className="h-60 w-60 text-muted-foreground" />
                      <div className="sr-only">A chart showing productivity by time of day</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Focus Metrics</CardTitle>
                    <CardDescription>Analysis of your learning focus</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Average Session Length</span>
                        <span className="font-medium">
                          {insightsData.learningPatterns.focusMetrics.averageSessionLength} min
                        </span>
                      </div>
                      <Progress
                        value={insightsData.learningPatterns.focusMetrics.averageSessionLength}
                        max={60}
                        className="h-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Distraction Rate</span>
                        <span className="font-medium">
                          {insightsData.learningPatterns.focusMetrics.distractionRate}%
                        </span>
                      </div>
                      <Progress
                        value={100 - insightsData.learningPatterns.focusMetrics.distractionRate}
                        className="h-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Deep Work Periods</span>
                        <span className="font-medium">
                          {insightsData.learningPatterns.focusMetrics.deepWorkPeriods}/day
                        </span>
                      </div>
                      <Progress
                        value={insightsData.learningPatterns.focusMetrics.deepWorkPeriods * 20}
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>Learning Pattern Insights</CardTitle>
                    <CardDescription>AI-generated insights about your learning habits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {insightsData.learningPatterns.recommendations.map((insight, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Lightbulb className="h-4 w-4 text-primary" />
                          </div>
                          <p>{insight}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Generate Personalized Learning Schedule</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
