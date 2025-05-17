"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Download, FileText, Plus, Trash2, Sparkles, Check, Palette } from "lucide-react"

// Resume templates
const resumeTemplates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and professional with a touch of color",
    preview: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold and unique for creative professionals",
    preview: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant with focus on content",
    preview: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "technical",
    name: "Technical",
    description: "Optimized for technical roles with skills focus",
    preview: "/placeholder.svg?height=200&width=150",
  },
]

// Color schemes
const colorSchemes = [
  { id: "blue", name: "Professional Blue", primary: "#1a73e8", secondary: "#4285f4" },
  { id: "teal", name: "Modern Teal", primary: "#009688", secondary: "#4db6ac" },
  { id: "purple", name: "Creative Purple", primary: "#673ab7", secondary: "#9575cd" },
  { id: "green", name: "Fresh Green", primary: "#4caf50", secondary: "#81c784" },
  { id: "orange", name: "Vibrant Orange", primary: "#ff5722", secondary: "#ff8a65" },
]

export default function ResumeBuilderPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("personal")
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const [selectedColorScheme, setSelectedColorScheme] = useState("blue")
  const [aiSuggestions, setAiSuggestions] = useState(true)
  const [resumeData, setResumeData] = useState({
    personal: {
      name: user?.name || "",
      title: user?.role || "",
      email: user?.email || "",
      phone: "",
      location: user?.location || "",
      website: "",
      summary: "",
    },
    experience: [
      {
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ],
    education: [
      {
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    skills: Array.isArray(user?.skills)
      ? user.skills
      : [
          { name: "JavaScript", level: 80 },
          { name: "React", level: 75 },
          { name: "Node.js", level: 70 },
          { name: "HTML/CSS", level: 85 },
        ],
    projects: [
      {
        name: "",
        description: "",
        technologies: "",
        link: "",
      },
    ],
    certifications: [
      {
        name: "",
        issuer: "",
        date: "",
        link: "",
      },
    ],
    languages: [{ name: "English", proficiency: "Native" }],
  })

  const [aiEnhancements, setAiEnhancements] = useState({
    summaryEnhanced: false,
    experienceEnhanced: false,
    skillsEnhanced: false,
  })

  // Handle input change for personal info
  const handlePersonalChange = (e) => {
    const { name, value } = e.target
    setResumeData({
      ...resumeData,
      personal: {
        ...resumeData.personal,
        [name]: value,
      },
    })
  }

  // Handle input change for array fields (experience, education, etc.)
  const handleArrayChange = (section, index, field, value) => {
    const newArray = [...resumeData[section]]
    newArray[index] = {
      ...newArray[index],
      [field]: value,
    }
    setResumeData({
      ...resumeData,
      [section]: newArray,
    })
  }

  // Add new item to array fields
  const handleAddItem = (section) => {
    const emptyItems = {
      experience: {
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
      education: {
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        description: "",
      },
      skills: { name: "", level: 50 },
      projects: {
        name: "",
        description: "",
        technologies: "",
        link: "",
      },
      certifications: {
        name: "",
        issuer: "",
        date: "",
        link: "",
      },
      languages: { name: "", proficiency: "Intermediate" },
    }

    setResumeData({
      ...resumeData,
      [section]: [...resumeData[section], emptyItems[section]],
    })
  }

  // Remove item from array fields
  const handleRemoveItem = (section, index) => {
    const newArray = [...resumeData[section]]
    newArray.splice(index, 1)
    setResumeData({
      ...resumeData,
      [section]: newArray,
    })
  }

  // Handle AI enhancement for summary
  const handleEnhanceSummary = () => {
    // Simulate AI enhancement
    setTimeout(() => {
      setResumeData({
        ...resumeData,
        personal: {
          ...resumeData.personal,
          summary: `Passionate ${resumeData.personal.title} with a strong foundation in ${resumeData.skills.map((s) => s.name).join(", ")}. Dedicated to creating efficient, user-friendly solutions that solve real-world problems. Committed to continuous learning and growth in the rapidly evolving tech landscape.`,
        },
      })
      setAiEnhancements({
        ...aiEnhancements,
        summaryEnhanced: true,
      })
    }, 1500)
  }

  // Handle AI enhancement for experience
  const handleEnhanceExperience = (index) => {
    // Simulate AI enhancement
    setTimeout(() => {
      const newExperience = [...resumeData.experience]
      const exp = newExperience[index]

      if (exp.company && exp.position) {
        newExperience[index] = {
          ...exp,
          description: `• Led development of key features that improved user engagement by 35%\n• Collaborated with cross-functional teams to optimize application performance\n• Implemented best practices for code quality and documentation\n• Mentored junior developers and conducted code reviews`,
        }

        setResumeData({
          ...resumeData,
          experience: newExperience,
        })

        setAiEnhancements({
          ...aiEnhancements,
          experienceEnhanced: true,
        })
      }
    }, 1500)
  }

  // Handle AI enhancement for skills
  const handleEnhanceSkills = () => {
    // Simulate AI enhancement
    setTimeout(() => {
      const enhancedSkills = [
        { name: "JavaScript", level: 80 },
        { name: "React", level: 75 },
        { name: "Node.js", level: 70 },
        { name: "HTML/CSS", level: 85 },
        { name: "TypeScript", level: 65 },
        { name: "Git/GitHub", level: 80 },
        { name: "RESTful APIs", level: 75 },
        { name: "Responsive Design", level: 80 },
        { name: "UI/UX Principles", level: 70 },
        { name: "Testing (Jest)", level: 65 },
      ]

      setResumeData({
        ...resumeData,
        skills: enhancedSkills,
      })

      setAiEnhancements({
        ...aiEnhancements,
        skillsEnhanced: true,
      })
    }, 1500)
  }

  // Generate and download resume
  const handleGenerateResume = () => {
    // In a real app, this would generate a PDF
    alert(
      "In a real app, this would generate a PDF with your resume data using the selected template and color scheme.",
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Resume Builder</CardTitle>
              <CardDescription>Please log in to use the resume builder</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <a href="/login">Log In</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 pt-16 pb-8">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Button variant="outline" size="sm" onClick={() => router.back()} className="mr-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <h1 className="text-3xl font-bold gradient-text">AI-Powered Resume Builder</h1>
            </div>
            <Button onClick={handleGenerateResume} className="btn-hover">
              <Download className="mr-2 h-4 w-4" />
              Generate Resume
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="card-hover mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Resume Information
                  </CardTitle>
                  <CardDescription>Fill in your details to create your professional resume</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-6 mb-4">
                      <TabsTrigger value="personal">Personal</TabsTrigger>
                      <TabsTrigger value="experience">Experience</TabsTrigger>
                      <TabsTrigger value="education">Education</TabsTrigger>
                      <TabsTrigger value="skills">Skills</TabsTrigger>
                      <TabsTrigger value="projects">Projects</TabsTrigger>
                      <TabsTrigger value="extras">Extras</TabsTrigger>
                    </TabsList>

                    {/* Personal Information */}
                    <TabsContent value="personal" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={resumeData.personal.name}
                            onChange={handlePersonalChange}
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="title">Professional Title</Label>
                          <Input
                            id="title"
                            name="title"
                            value={resumeData.personal.title}
                            onChange={handlePersonalChange}
                            placeholder="Frontend Developer"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={resumeData.personal.email}
                            onChange={handlePersonalChange}
                            placeholder="john.doe@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={resumeData.personal.phone}
                            onChange={handlePersonalChange}
                            placeholder="(123) 456-7890"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            name="location"
                            value={resumeData.personal.location}
                            onChange={handlePersonalChange}
                            placeholder="New York, NY"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Website/Portfolio</Label>
                          <Input
                            id="website"
                            name="website"
                            value={resumeData.personal.website}
                            onChange={handlePersonalChange}
                            placeholder="https://johndoe.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="summary">Professional Summary</Label>
                          {aiSuggestions && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleEnhanceSummary}
                              disabled={aiEnhancements.summaryEnhanced}
                              className="h-8"
                            >
                              {aiEnhancements.summaryEnhanced ? (
                                <>
                                  <Check className="mr-1 h-3 w-3" />
                                  Enhanced
                                </>
                              ) : (
                                <>
                                  <Sparkles className="mr-1 h-3 w-3" />
                                  Enhance with AI
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                        <Textarea
                          id="summary"
                          name="summary"
                          value={resumeData.personal.summary}
                          onChange={handlePersonalChange}
                          placeholder="Write a brief summary of your professional background and goals..."
                          className="min-h-[120px]"
                        />
                      </div>
                    </TabsContent>

                    {/* Work Experience */}
                    <TabsContent value="experience" className="space-y-6">
                      {resumeData.experience.map((exp, index) => (
                        <div key={index} className="space-y-4 border rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">Experience #{index + 1}</h3>
                            <div className="flex items-center gap-2">
                              {aiSuggestions && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEnhanceExperience(index)}
                                  disabled={!exp.company || !exp.position}
                                  className="h-8"
                                >
                                  <Sparkles className="mr-1 h-3 w-3" />
                                  Enhance
                                </Button>
                              )}
                              {resumeData.experience.length > 1 && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRemoveItem("experience", index)}
                                  className="h-8 text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`company-${index}`}>Company</Label>
                              <Input
                                id={`company-${index}`}
                                value={exp.company}
                                onChange={(e) => handleArrayChange("experience", index, "company", e.target.value)}
                                placeholder="Company Name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`position-${index}`}>Position</Label>
                              <Input
                                id={`position-${index}`}
                                value={exp.position}
                                onChange={(e) => handleArrayChange("experience", index, "position", e.target.value)}
                                placeholder="Job Title"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`exp-location-${index}`}>Location</Label>
                              <Input
                                id={`exp-location-${index}`}
                                value={exp.location}
                                onChange={(e) => handleArrayChange("experience", index, "location", e.target.value)}
                                placeholder="City, Country"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-2">
                                <Label htmlFor={`start-date-${index}`}>Start Date</Label>
                                <Input
                                  id={`start-date-${index}`}
                                  type="month"
                                  value={exp.startDate}
                                  onChange={(e) => handleArrayChange("experience", index, "startDate", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`end-date-${index}`}>End Date</Label>
                                <Input
                                  id={`end-date-${index}`}
                                  type="month"
                                  value={exp.endDate}
                                  onChange={(e) => handleArrayChange("experience", index, "endDate", e.target.value)}
                                  disabled={exp.current}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Switch
                              id={`current-job-${index}`}
                              checked={exp.current}
                              onCheckedChange={(checked) => handleArrayChange("experience", index, "current", checked)}
                            />
                            <Label htmlFor={`current-job-${index}`}>I currently work here</Label>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`description-${index}`}>Description</Label>
                            <Textarea
                              id={`description-${index}`}
                              value={exp.description}
                              onChange={(e) => handleArrayChange("experience", index, "description", e.target.value)}
                              placeholder="Describe your responsibilities and achievements..."
                              className="min-h-[120px]"
                            />
                          </div>
                        </div>
                      ))}

                      <Button variant="outline" onClick={() => handleAddItem("experience")} className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Experience
                      </Button>
                    </TabsContent>

                    {/* Education */}
                    <TabsContent value="education" className="space-y-6">
                      {resumeData.education.map((edu, index) => (
                        <div key={index} className="space-y-4 border rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">Education #{index + 1}</h3>
                            {resumeData.education.length > 1 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemoveItem("education", index)}
                                className="h-8 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`institution-${index}`}>Institution</Label>
                              <Input
                                id={`institution-${index}`}
                                value={edu.institution}
                                onChange={(e) => handleArrayChange("education", index, "institution", e.target.value)}
                                placeholder="University Name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`degree-${index}`}>Degree</Label>
                              <Input
                                id={`degree-${index}`}
                                value={edu.degree}
                                onChange={(e) => handleArrayChange("education", index, "degree", e.target.value)}
                                placeholder="Bachelor of Science"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`field-${index}`}>Field of Study</Label>
                              <Input
                                id={`field-${index}`}
                                value={edu.field}
                                onChange={(e) => handleArrayChange("education", index, "field", e.target.value)}
                                placeholder="Computer Science"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-2">
                                <Label htmlFor={`edu-start-date-${index}`}>Start Date</Label>
                                <Input
                                  id={`edu-start-date-${index}`}
                                  type="month"
                                  value={edu.startDate}
                                  onChange={(e) => handleArrayChange("education", index, "startDate", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`edu-end-date-${index}`}>End Date</Label>
                                <Input
                                  id={`edu-end-date-${index}`}
                                  type="month"
                                  value={edu.endDate}
                                  onChange={(e) => handleArrayChange("education", index, "endDate", e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`edu-description-${index}`}>Description</Label>
                            <Textarea
                              id={`edu-description-${index}`}
                              value={edu.description}
                              onChange={(e) => handleArrayChange("education", index, "description", e.target.value)}
                              placeholder="Relevant coursework, achievements, activities..."
                              className="min-h-[100px]"
                            />
                          </div>
                        </div>
                      ))}

                      <Button variant="outline" onClick={() => handleAddItem("education")} className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Education
                      </Button>
                    </TabsContent>

                    {/* Skills */}
                    <TabsContent value="skills" className="space-y-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">Technical & Professional Skills</h3>
                        {aiSuggestions && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleEnhanceSkills}
                            disabled={aiEnhancements.skillsEnhanced}
                          >
                            {aiEnhancements.skillsEnhanced ? (
                              <>
                                <Check className="mr-1 h-3 w-3" />
                                Enhanced
                              </>
                            ) : (
                              <>
                                <Sparkles className="mr-1 h-3 w-3" />
                                Enhance with AI
                              </>
                            )}
                          </Button>
                        )}
                      </div>

                      <div className="space-y-4">
                        {Array.isArray(resumeData.skills)
                          ? resumeData.skills.map((skill, index) => (
                              <div key={index} className="flex items-center gap-4">
                                <div className="flex-1">
                                  <Input
                                    value={skill.name}
                                    onChange={(e) => handleArrayChange("skills", index, "name", e.target.value)}
                                    placeholder="Skill name"
                                  />
                                </div>
                                <div className="w-32">
                                  <Select
                                    value={skill.level.toString()}
                                    onValueChange={(value) =>
                                      handleArrayChange("skills", index, "level", Number.parseInt(value))
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="20">Beginner</SelectItem>
                                      <SelectItem value="40">Elementary</SelectItem>
                                      <SelectItem value="60">Intermediate</SelectItem>
                                      <SelectItem value="80">Advanced</SelectItem>
                                      <SelectItem value="100">Expert</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveItem("skills", index)}
                                  className="h-8 text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))
                          : null}
                      </div>

                      <Button variant="outline" onClick={() => handleAddItem("skills")} className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Skill
                      </Button>
                    </TabsContent>

                    {/* Projects */}
                    <TabsContent value="projects" className="space-y-6">
                      {resumeData.projects.map((project, index) => (
                        <div key={index} className="space-y-4 border rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">Project #{index + 1}</h3>
                            {resumeData.projects.length > 1 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemoveItem("projects", index)}
                                className="h-8 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`project-name-${index}`}>Project Name</Label>
                              <Input
                                id={`project-name-${index}`}
                                value={project.name}
                                onChange={(e) => handleArrayChange("projects", index, "name", e.target.value)}
                                placeholder="Project Name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`project-link-${index}`}>Project Link</Label>
                              <Input
                                id={`project-link-${index}`}
                                value={project.link}
                                onChange={(e) => handleArrayChange("projects", index, "link", e.target.value)}
                                placeholder="https://github.com/username/project"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`technologies-${index}`}>Technologies Used</Label>
                            <Input
                              id={`technologies-${index}`}
                              value={project.technologies}
                              onChange={(e) => handleArrayChange("projects", index, "technologies", e.target.value)}
                              placeholder="React, Node.js, MongoDB"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`project-description-${index}`}>Description</Label>
                            <Textarea
                              id={`project-description-${index}`}
                              value={project.description}
                              onChange={(e) => handleArrayChange("projects", index, "description", e.target.value)}
                              placeholder="Describe the project, your role, and achievements..."
                              className="min-h-[100px]"
                            />
                          </div>
                        </div>
                      ))}

                      <Button variant="outline" onClick={() => handleAddItem("projects")} className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Project
                      </Button>
                    </TabsContent>

                    {/* Extras (Certifications & Languages) */}
                    <TabsContent value="extras" className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-4">Certifications & Licenses</h3>
                        <div className="space-y-4">
                          {resumeData.certifications.map((cert, index) => (
                            <div
                              key={index}
                              className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center border rounded-lg p-4"
                            >
                              <div className="space-y-2 md:col-span-1">
                                <Label htmlFor={`cert-name-${index}`}>Name</Label>
                                <Input
                                  id={`cert-name-${index}`}
                                  value={cert.name}
                                  onChange={(e) => handleArrayChange("certifications", index, "name", e.target.value)}
                                  placeholder="Certification Name"
                                />
                              </div>
                              <div className="space-y-2 md:col-span-1">
                                <Label htmlFor={`cert-issuer-${index}`}>Issuer</Label>
                                <Input
                                  id={`cert-issuer-${index}`}
                                  value={cert.issuer}
                                  onChange={(e) => handleArrayChange("certifications", index, "issuer", e.target.value)}
                                  placeholder="Issuing Organization"
                                />
                              </div>
                              <div className="space-y-2 md:col-span-1">
                                <Label htmlFor={`cert-date-${index}`}>Date</Label>
                                <Input
                                  id={`cert-date-${index}`}
                                  type="month"
                                  value={cert.date}
                                  onChange={(e) => handleArrayChange("certifications", index, "date", e.target.value)}
                                />
                              </div>
                              <div className="flex items-center justify-between md:justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveItem("certifications", index)}
                                  className="h-8 text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Button
                          variant="outline"
                          onClick={() => handleAddItem("certifications")}
                          className="w-full mt-4"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Certification
                        </Button>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium mb-4">Languages</h3>
                        <div className="space-y-4">
                          {resumeData.languages.map((lang, index) => (
                            <div
                              key={index}
                              className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border rounded-lg p-4"
                            >
                              <div className="space-y-2 md:col-span-1">
                                <Label htmlFor={`lang-name-${index}`}>Language</Label>
                                <Input
                                  id={`lang-name-${index}`}
                                  value={lang.name}
                                  onChange={(e) => handleArrayChange("languages", index, "name", e.target.value)}
                                  placeholder="Language Name"
                                />
                              </div>
                              <div className="space-y-2 md:col-span-1">
                                <Label htmlFor={`lang-proficiency-${index}`}>Proficiency</Label>
                                <Select
                                  value={lang.proficiency}
                                  onValueChange={(value) => handleArrayChange("languages", index, "proficiency", value)}
                                >
                                  <SelectTrigger id={`lang-proficiency-${index}`}>
                                    <SelectValue placeholder="Select proficiency" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Native">Native</SelectItem>
                                    <SelectItem value="Fluent">Fluent</SelectItem>
                                    <SelectItem value="Advanced">Advanced</SelectItem>
                                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                                    <SelectItem value="Elementary">Elementary</SelectItem>
                                    <SelectItem value="Beginner">Beginner</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex items-center justify-between md:justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveItem("languages", index)}
                                  className="h-8 text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Button variant="outline" onClick={() => handleAddItem("languages")} className="w-full mt-4">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Language
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1 space-y-6">
              {/* Resume Preview */}
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Resume Preview
                  </CardTitle>
                  <CardDescription>See how your resume will look</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="w-full max-w-[250px] h-[350px] border rounded-md overflow-hidden mb-4">
                    <div
                      className="w-full h-full bg-white flex flex-col"
                      style={{
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                        background: `linear-gradient(to bottom, ${
                          colorSchemes.find((c) => c.id === selectedColorScheme)?.primary || "#1a73e8"
                        }20 0%, white 100%)`,
                      }}
                    >
                      {/* Header */}
                      <div
                        className="p-3 text-center"
                        style={{
                          borderBottom: `2px solid ${
                            colorSchemes.find((c) => c.id === selectedColorScheme)?.primary || "#1a73e8"
                          }`,
                        }}
                      >
                        <div className="text-sm font-bold truncate">{resumeData.personal.name || "Your Name"}</div>
                        <div className="text-xs truncate">{resumeData.personal.title || "Professional Title"}</div>
                      </div>

                      {/* Content (simplified) */}
                      <div className="flex-1 p-2">
                        <div className="w-full h-3 bg-gray-200 rounded mb-2"></div>
                        <div className="w-3/4 h-3 bg-gray-200 rounded mb-4"></div>

                        <div
                          className="text-xs font-bold mb-1"
                          style={{
                            color: colorSchemes.find((c) => c.id === selectedColorScheme)?.primary || "#1a73e8",
                          }}
                        >
                          Experience
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                        <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                        <div className="w-3/4 h-2 bg-gray-200 rounded mb-3"></div>

                        <div
                          className="text-xs font-bold mb-1"
                          style={{
                            color: colorSchemes.find((c) => c.id === selectedColorScheme)?.primary || "#1a73e8",
                          }}
                        >
                          Education
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                        <div className="w-2/3 h-2 bg-gray-200 rounded mb-3"></div>

                        <div
                          className="text-xs font-bold mb-1"
                          style={{
                            color: colorSchemes.find((c) => c.id === selectedColorScheme)?.primary || "#1a73e8",
                          }}
                        >
                          Skills
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {Array.isArray(resumeData.skills)
                            ? resumeData.skills.slice(0, 6).map((skill, i) => (
                                <div
                                  key={i}
                                  className="h-2 rounded"
                                  style={{
                                    width: `${20 + Math.random() * 30}px`,
                                    backgroundColor:
                                      colorSchemes.find((c) => c.id === selectedColorScheme)?.secondary || "#4285f4",
                                    opacity: 0.7,
                                  }}
                                ></div>
                              ))
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleGenerateResume} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Generate PDF
                  </Button>
                </CardContent>
              </Card>

              {/* Template Selection */}
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Resume Template
                  </CardTitle>
                  <CardDescription>Choose a template for your resume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {resumeTemplates.map((template) => (
                      <div
                        key={template.id}
                        className={`border rounded-lg p-2 cursor-pointer transition-all ${
                          selectedTemplate === template.id
                            ? "border-primary ring-2 ring-primary/20"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <div className="aspect-[3/4] mb-2 overflow-hidden rounded-md">
                          <img
                            src={template.preview || "/placeholder.svg"}
                            alt={template.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">{template.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Color Scheme Selection */}
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="mr-2 h-5 w-5 text-primary" />
                    Color Scheme
                  </CardTitle>
                  <CardDescription>Choose a color scheme for your resume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2">
                    {colorSchemes.map((scheme) => (
                      <div
                        key={scheme.id}
                        className={`cursor-pointer ${
                          selectedColorScheme === scheme.id ? "ring-2 ring-primary/50" : ""
                        }`}
                        onClick={() => setSelectedColorScheme(scheme.id)}
                      >
                        <div
                          className="w-full aspect-square rounded-full"
                          style={{
                            background: `linear-gradient(135deg, ${scheme.primary}, ${scheme.secondary})`,
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-center text-sm text-muted-foreground">
                    {colorSchemes.find((c) => c.id === selectedColorScheme)?.name}
                  </div>
                </CardContent>
              </Card>

              {/* AI Assistant Settings */}
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="mr-2 h-5 w-5 text-primary" />
                    AI Assistant
                  </CardTitle>
                  <CardDescription>Configure AI-powered resume enhancements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="ai-suggestions">AI Suggestions</Label>
                      <p className="text-sm text-muted-foreground">Get AI-powered suggestions for your resume</p>
                    </div>
                    <Switch id="ai-suggestions" checked={aiSuggestions} onCheckedChange={setAiSuggestions} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
