"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Briefcase,
  Code,
  Palette,
  Music,
  Microscope,
  BookOpen,
  Stethoscope,
  Camera,
  ChefHat,
  Landmark,
  ArrowRight,
  Star,
  Calendar,
  Zap,
  CheckCircle,
  Play,
  Pause,
  SkipForward,
  X,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/toast"
import { VoiceGuide } from "@/components/voice-guide"
import { useAuth } from "@/components/auth-provider"
import { ResponsiveNavbar } from "@/components/responsive-navbar"

// Career categories with icons and background gradients
const careerCategories = [
  {
    id: "tech",
    name: "Technology",
    icon: Code,
    gradient: "from-blue-600 to-indigo-700",
    description: "Explore careers in software development, data science, cybersecurity, and more.",
  },
  {
    id: "music",
    name: "Music",
    icon: Music,
    gradient: "from-purple-600 to-pink-700",
    description: "Discover careers in music production, performance, composition, and education.",
  },
  {
    id: "art",
    name: "Art & Design",
    icon: Palette,
    gradient: "from-orange-600 to-red-700",
    description: "Explore careers in visual arts, graphic design, animation, and illustration.",
  },
  {
    id: "science",
    name: "Science",
    icon: Microscope,
    gradient: "from-green-600 to-teal-700",
    description: "Discover careers in research, laboratory science, and scientific innovation.",
  },
  {
    id: "education",
    name: "Education",
    icon: BookOpen,
    gradient: "from-red-600 to-yellow-700",
    description: "Explore careers in teaching, curriculum development, and educational leadership.",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: Stethoscope,
    gradient: "from-cyan-600 to-blue-700",
    description: "Discover careers in medicine, nursing, therapy, and healthcare administration.",
  },
  {
    id: "media",
    name: "Media",
    icon: Camera,
    gradient: "from-violet-600 to-purple-700",
    description: "Explore careers in film, photography, journalism, and digital media.",
  },
  {
    id: "culinary",
    name: "Culinary",
    icon: ChefHat,
    gradient: "from-amber-600 to-orange-700",
    description: "Discover careers in cooking, baking, food styling, and culinary management.",
  },
  {
    id: "business",
    name: "Business",
    icon: Briefcase,
    gradient: "from-indigo-600 to-blue-700",
    description: "Explore careers in management, marketing, finance, and entrepreneurship.",
  },
  {
    id: "law",
    name: "Law",
    icon: Landmark,
    gradient: "from-slate-600 to-gray-700",
    description: "Discover careers in legal practice, advocacy, and judicial systems.",
  },
]

// Music career options with detailed information
// Music 
const techEvents = [
  {
    id: "ai-hackathon",
    title: "Global AI Innovation Hackathon",
    date: "June 15-30, 2025",
    location: "Online",
    image: "/placeholder.svg?height=200&width=350",
    description:
      "Build cutting-edge AI solutions and pitch them to industry leaders in this high-stakes global hackathon.",
    details: {
      categories: [
        "Natural Language Processing",
        "Computer Vision",
        "Healthcare AI",
        "AI for Good",
        "Generative AI",
        "Edge AI",
      ],
      prizes: ["$50,000 Grand Prize", "Mentorship with AI Leaders", "Startup Funding Opportunities"],
      judges: ["AI Researchers", "Venture Capitalists", "Tech Entrepreneurs", "ML Engineers"],
      eligibility: "Open to developers, researchers, and students globally",
    },
    registration: {
      deadline: "May 31, 2025",
      fee: "Free",
      process: "Register on the platform, submit team details, and project proposal",
    },
  },
  {
    id: "fullstack-bootcamp",
    title: "Advanced Full-Stack Development Bootcamp",
    date: "July 8-10, 2025",
    location: "San Francisco, CA",
    image: "/placeholder.svg?height=200&width=350",
    description:
      "Level up your skills in a hands-on bootcamp featuring real-world projects using the latest web technologies.",
    details: {
      instructors: [
        "Kent C. Dodds (Remix)",
        "Lea Verou (CSS Expert)",
        "Dan Abramov (React Core Team)",
      ],
      equipment: "Mac/Linux development setup, GitHub, Docker",
      topics: [
        "Full-stack app architecture",
        "Advanced React & Tailwind",
        "Node.js API design & deployment",
      ],
      includes: ["Project reviews", "Lunch and swag", "GitHub repo feedback", "Certificate"],
    },
    registration: {
      deadline: "June 15, 2025",
      fee: "$899",
      process: "Submit resume and portfolio (GitHub/DevPost)",
      capacity: "Only 25 participants selected",
    },
  },
  {
    id: "tech-business-summit",
    title: "Future of Tech Business Summit",
    date: "August 22-24, 2025",
    location: "Austin, TX",
    image: "/placeholder.svg?height=200&width=350",
    description:
      "Join startup founders, VCs, and thought leaders to explore the evolution of tech entrepreneurship and innovation.",
    details: {
      speakers: ["YC Alumni", "Tech CEOs", "Product Managers", "Design Leaders"],
      panels: [
        "AI Startups and Funding",
        "SaaS Scalability Models",
        "Web3 and Decentralization",
        "Career Paths in Tech Leadership",
      ],
      networking: ["VC pitching arena", "Startup demo nights", "Founder meetups"],
      extras: ["Startup clinics", "Resume reviews", "Investor Q&A"],
    },
    registration: {
      deadline: "August 1, 2025",
      fee: "$375 (Early bird: $300 until June 30)",
      process: "Online registration",
      student: "Discounted ticket: $150 with valid student ID",
    },
  },
  {
    id: "quantum-computing-lab",
    title: "Quantum Computing Hands-On Lab",
    date: "September 12, 2025",
    location: "Zurich, Switzerland",
    image: "/placeholder.svg?height=200&width=350",
    description:
      "Get your hands dirty with Qiskit and IBM Quantum hardware to understand the future of computing.",
    details: {
      lab: "IBM Zurich Research Lab",
      venue: "Innovation Hall, ETH Zurich",
      includes: [
        "Quantum circuit simulation",
        "Execution on real qubits",
        "Error correction overview",
        "Networking lunch with researchers",
      ],
      requirements: "Basic Python and linear algebra knowledge required",
    },
    registration: {
      deadline: "July 31, 2025",
      fee: "$2,000 (includes stay and meals)",
      process: "Apply with statement of interest and GitHub profile",
      selection: "Only 15 applicants selected via review",
    },
  },
  {
    id: "tech-health-symposium",
    title: "Tech for Health and Wellness Symposium",
    date: "October 5-7, 2025",
    location: "Boston, MA",
    image: "/placeholder.svg?height=200&width=350",
    description:
      "Explore how technology is transforming healthcare and wellness, from wearable tech to AI diagnostics.",
    details: {
      presenters: ["Biomedical Engineers", "AI Health Startups", "UX Researchers", "Digital Health Experts"],
      topics: [
        "AI Diagnostics & Medical Imaging",
        "Mental Health Apps & UX",
        "Wearables & IoT in Healthcare",
        "Telemedicine Accessibility",
      ],
      workshops: [
        "Figma for Healthcare Apps",
        "Data Privacy in HealthTech",
        "Accessibility in Medical UX",
        "Ethical AI for Healthcare",
      ],
      certification: "Digital certificate and LinkedIn badge on completion",
    },
    registration: {
      deadline: "September 15, 2025",
      fee: "$450 (Professional), $200 (Student)",
      process: "Register via official site",
      includes: "Meals, materials, and tech wellness kit",
    },
  },
];

const techMicroTasks = [
  {
    id: "task-1",
    title: "Debug the API Response",
    career: "Full-Stack Developer",
    description: "Resolve issues in the API response that's returning undefined values for user data.",
    content: `
Issue:
- GET /users/123 returns 200 OK, but 'name' and 'email' are undefined.

Code snippet (Node.js):
const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    name: user.name,
    email: user.email,
  });
};
    `,
    solution: `
Issue: Mongoose's .findById may not return a lean object or may be returning null.

Fix:
1. Check if user is null before accessing properties.
2. Use .lean() if needed: const user = await User.findById(req.params.id).lean();
3. Add error handling to return 404 if not found.

Final Code:
const getUser = async (req, res) => {
  const user = await User.findById(req.params.id).lean();
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ name: user.name, email: user.email });
};
    `,
    hint: "Check for null values and ensure you’re accessing valid object properties. Consider using .lean() with Mongoose.",
  },
  {
    id: "task-2",
    title: "Optimize Frontend Performance",
    career: "Frontend Engineer",
    description: "Improve the performance of a React web page that loads slowly on mobile devices.",
    content: `
Symptoms:
- High Time to Interactive (TTI)
- Large bundle size
- Layout shift when loading images
- Low Lighthouse score on mobile

Tools: Chrome DevTools, Lighthouse
    `,
    solution: `
Optimization Steps:
1. Code Splitting: Use React.lazy and Suspense for route-based splitting.
2. Reduce Bundle Size: Remove unused libraries and use tree-shaking.
3. Lazy Load Images: Use loading="lazy" and provide width/height to prevent layout shifts.
4. Compress Images: Use WebP formats for better compression.
5. Preload Critical Assets: Use <link rel="preload"> for fonts and above-the-fold assets.
6. Minify JS/CSS and enable gzip compression on server.
    `,
    hint: "Use Lighthouse audit suggestions, and prioritize reducing bundle size and improving image handling.",
  },
  {
    id: "task-3",
    title: "Design a NoSQL Schema",
    career: "Backend Developer",
    description: "Design a NoSQL (MongoDB) schema for an e-commerce product catalog with nested reviews.",
    content: `
Requirements:
- Products have title, description, price, category
- Each product can have multiple reviews with user, rating, and comment
- Reviews should be embedded
    `,
    solution: `
MongoDB Schema Design:
{
  title: String,
  description: String,
  price: Number,
  category: String,
  reviews: [
    {
      userId: ObjectId,
      rating: Number,
      comment: String,
      createdAt: Date
    }
  ]
}

Why embed?
- Reviews are tightly coupled with products
- Better read performance for product with reviews
    `,
    hint: "Use embedding for tightly coupled data like reviews. Use referencing for users if needed.",
  },
  {
    id: "task-4",
    title: "Build a Lesson Plan: Intro to Git",
    career: "Tech Educator",
    description: "Create a 45-minute beginner Git lesson plan for high school students.",
    content: `
Audience: High school coders (age 15-18)
Tools: GitHub, Git CLI, Visual Studio Code

Learning Goals:
- Understand version control
- Use basic Git commands: init, add, commit, status
- Push to GitHub
    `,
    solution: `
Lesson Plan:
1. Intro (5 min): Why use version control? Real-life analogy: Save states in video games
2. Demo (10 min): Initialize Git, make changes, commit them
3. Activity (15 min): Students create a local repo, make changes, and commit
4. GitHub Push (10 min): Connect local repo to GitHub and push
5. Review + Q&A (5 min): Recap commands and real-world applications
    `,
    hint: "Use real-world analogies to explain Git concepts, like saving progress in games or undoing text edits.",
  },
];


const musicCareers = [
  {
    id: "music-producer",
    name: "Music Producer",
    description: "Create, arrange, and produce music for artists, films, games, and more",
    icon: "/placeholder.svg?height=80&width=80",
    skills: ["Audio Engineering", "Music Theory", "DAW Proficiency", "Arrangement", "Mixing & Mastering"],
    averageSalary: "$68,000",
    growthRate: "+8% (2020-2030)",
    workEnvironment: "Studio, Remote, Freelance",
    education: "Bachelor's in Music Production or equivalent experience",
    dailyTasks: [
      "Record and edit audio tracks",
      "Arrange musical compositions",
      "Mix and master recordings",
      "Collaborate with artists and musicians",
      "Manage recording sessions",
      "Select and set up equipment",
      "Create beats and instrumental tracks",
    ],
    tools: ["Pro Tools", "Logic Pro", "Ableton Live", "FL Studio", "Studio Hardware", "MIDI Controllers"],
    challenges: [
      "Meeting tight deadlines",
      "Balancing artistic vision with commercial appeal",
      "Staying current with technology and trends",
      "Managing client expectations",
      "Building a professional network",
    ],
    successStories: [
      {
        name: "Rick Rubin",
        achievement: "Produced for artists across genres, founded Def Jam Records",
      },
      {
        name: "Quincy Jones",
        achievement: "Produced Michael Jackson's 'Thriller', the best-selling album of all time",
      },
      {
        name: "Linda Perry",
        achievement: "Transitioned from artist to producer, worked with Pink, Christina Aguilera",
      },
    ],
  },
  {
    id: "composer",
    name: "Composer",
    description: "Create original music for films, TV shows, video games, and other media",
    icon: "/placeholder.svg?height=80&width=80",
    skills: ["Music Composition", "Orchestration", "Music Theory", "Notation Software", "MIDI Programming"],
    averageSalary: "$53,000",
    growthRate: "+2% (2020-2030)",
    workEnvironment: "Studio, Remote, Freelance",
    education: "Bachelor's or Master's in Music Composition",
    dailyTasks: [
      "Write original music compositions",
      "Create themes and motifs for characters or scenes",
      "Orchestrate compositions for different instruments",
      "Collaborate with directors and producers",
      "Record and edit compositions",
      "Sync music to visual media",
      "Revise compositions based on feedback",
    ],
    tools: ["Sibelius", "Finale", "Digital Audio Workstations", "Sample Libraries", "MIDI Controllers"],
    challenges: [
      "Creating music that enhances storytelling",
      "Working with tight deadlines",
      "Adapting to different styles and genres",
      "Balancing creative vision with client needs",
      "Building a portfolio and reputation",
    ],
    successStories: [
      {
        name: "Hans Zimmer",
        achievement: "Composed for over 150 films including 'The Lion King' and 'Inception'",
      },
      {
        name: "Hildur Guðnadóttir",
        achievement: "Won Oscar for 'Joker' soundtrack, breaking barriers for women composers",
      },
      {
        name: "Koji Kondo",
        achievement: "Created iconic themes for Nintendo franchises like Mario and Zelda",
      },
    ],
  },
  {
    id: "music-teacher",
    name: "Music Teacher",
    description: "Educate students in music theory, performance, and appreciation",
    icon: "/placeholder.svg?height=80&width=80",
    skills: ["Music Theory", "Instrument Proficiency", "Pedagogy", "Curriculum Development", "Assessment"],
    averageSalary: "$61,000",
    growthRate: "+11% (2020-2030)",
    workEnvironment: "Schools, Private Studios, Online",
    education: "Bachelor's in Music Education, Teaching Certification",
    dailyTasks: [
      "Teach music theory and performance techniques",
      "Plan and deliver lessons for different skill levels",
      "Conduct ensembles and orchestras",
      "Assess student progress and provide feedback",
      "Organize recitals and performances",
      "Develop curriculum and lesson plans",
      "Communicate with parents and administrators",
    ],
    tools: ["Instruments", "Sheet Music", "Music Education Software", "Recording Equipment", "Assessment Tools"],
    challenges: [
      "Adapting teaching methods to different learning styles",
      "Motivating students to practice regularly",
      "Managing classroom behavior",
      "Balancing technical instruction with creative expression",
      "Working within budget constraints for music programs",
    ],
    successStories: [
      {
        name: "Shinichi Suzuki",
        achievement: "Developed the Suzuki method, revolutionizing music education",
      },
      {
        name: "Nadia Boulanger",
        achievement: "Taught many of the leading composers of the 20th century",
      },
      {
        name: "José Antonio Abreu",
        achievement: "Founded El Sistema, bringing music education to underprivileged children",
      },
    ],
  },
  {
    id: "performing-musician",
    name: "Performing Musician",
    description: "Perform music live as a soloist or in ensembles for audiences",
    icon: "/placeholder.svg?height=80&width=80",
    skills: ["Instrument Mastery", "Performance Techniques", "Stage Presence", "Improvisation", "Collaboration"],
    averageSalary: "$43,000 (varies widely)",
    growthRate: "+1% (2020-2030)",
    workEnvironment: "Venues, Studios, Tours, Orchestras",
    education: "Formal training or self-taught, often with Bachelor's or Master's in Music Performance",
    dailyTasks: [
      "Practice instrument or vocal techniques",
      "Rehearse with bands or ensembles",
      "Perform at concerts and events",
      "Travel between venues and locations",
      "Set up and test equipment",
      "Learn new music and repertoire",
      "Network with industry professionals",
    ],
    tools: ["Instruments", "Amplifiers", "Effects", "Performance Software", "Recording Equipment"],
    challenges: [
      "Maintaining consistent income",
      "Managing performance anxiety",
      "Balancing touring with personal life",
      "Physical demands and potential injuries",
      "Building and maintaining an audience",
    ],
    successStories: [
      {
        name: "Yo-Yo Ma",
        achievement: "World-renowned cellist who has recorded over 90 albums",
      },
      {
        name: "Lizzo",
        achievement: "Classically trained flutist who became a pop superstar",
      },
      {
        name: "Jacob Collier",
        achievement: "Self-taught multi-instrumentalist who won multiple Grammy awards",
      },
    ],
  },
  {
    id: "music-therapist",
    name: "Music Therapist",
    description: "Use music interventions to address physical, emotional, cognitive, and social needs",
    icon: "/placeholder.svg?height=80&width=80",
    skills: ["Music Performance", "Psychology", "Therapeutic Techniques", "Assessment", "Clinical Documentation"],
    averageSalary: "$48,000",
    growthRate: "+7% (2020-2030)",
    workEnvironment: "Hospitals, Schools, Rehabilitation Centers, Private Practice",
    education: "Bachelor's or Master's in Music Therapy, Board Certification",
    dailyTasks: [
      "Assess client needs and develop treatment plans",
      "Conduct individual and group therapy sessions",
      "Play instruments and sing with clients",
      "Document progress and outcomes",
      "Collaborate with healthcare teams",
      "Adapt music interventions for different conditions",
      "Educate families and caregivers",
    ],
    tools: ["Various Instruments", "Therapeutic Equipment", "Assessment Tools", "Documentation Software"],
    challenges: [
      "Working with clients with complex needs",
      "Measuring and demonstrating clinical outcomes",
      "Advocating for music therapy as a legitimate treatment",
      "Managing emotional demands of therapeutic work",
      "Adapting to different clinical settings",
    ],
    successStories: [
      {
        name: "Dr. Deforia Lane",
        achievement: "Pioneered music therapy in oncology and palliative care",
      },
      {
        name: "Concetta Tomaino",
        achievement: "Co-founded the Institute for Music and Neurologic Function with Oliver Sacks",
      },
      {
        name: "Nordoff and Robbins",
        achievement: "Developed creative music therapy approach for children with disabilities",
      },
    ],
  },
]

// Music courses with detailed information
const musicCourses = [
  {
    id: "music-theory-101",
    title: "Music Theory Fundamentals",
    instructor: "Dr. Sarah Chen",
    image: "/placeholder.svg?height=200&width=350",
    rating: 4.8,
    students: 12453,
    duration: "8 weeks",
    level: "Beginner",
    description: "Master the building blocks of music including notes, scales, intervals, chords, and basic harmony.",
    topics: [
      "Notes and the staff",
      "Major and minor scales",
      "Intervals and ear training",
      "Chord construction and progressions",
      "Rhythm and time signatures",
      "Basic harmonic analysis",
      "Introduction to form and structure",
    ],
    projects: [
      "Analyze chord progressions in popular songs",
      "Compose a simple melody with accompaniment",
      "Transcribe a short musical passage by ear",
    ],
    testimonials: [
      {
        name: "Michael T.",
        comment:
          "This course finally helped me understand how music works! The interactive exercises were especially helpful.",
      },
      {
        name: "Jasmine L.",
        comment: "Dr. Chen explains complex concepts in such a clear way. I'm now able to analyze my favorite songs.",
      },
    ],
  },
  {
    id: "music-production-masterclass",
    title: "Music Production Masterclass",
    instructor: "David Rodriguez",
    image: "/placeholder.svg?height=200&width=350",
    rating: 4.9,
    students: 8762,
    duration: "12 weeks",
    level: "Intermediate",
    description: "Learn professional music production techniques from recording to mixing and mastering.",
    topics: [
      "DAW setup and workflow optimization",
      "Recording techniques for various instruments",
      "MIDI programming and virtual instruments",
      "Mixing fundamentals and advanced techniques",
      "Mastering essentials",
      "Sound design and synthesis",
      "Arrangement and production strategies",
    ],
    projects: [
      "Produce a complete track from start to finish",
      "Mix a multi-track recording",
      "Create a mastered EP of 3-5 songs",
    ],
    testimonials: [
      {
        name: "Alex W.",
        comment: "This course took my productions to the next level. The feedback on my projects was invaluable.",
      },
      {
        name: "Taylor J.",
        comment: "David's insights from his years in the industry made this course exceptional. Worth every penny!",
      },
    ],
  },
  {
    id: "songwriting-workshop",
    title: "Songwriting Workshop",
    instructor: "Emma Thompson",
    image: "/placeholder.svg?height=200&width=350",
    rating: 4.7,
    students: 6321,
    duration: "6 weeks",
    level: "All Levels",
    description: "Develop your songwriting skills and learn to craft compelling lyrics and memorable melodies.",
    topics: [
      "Finding inspiration and overcoming writer's block",
      "Lyric writing techniques and storytelling",
      "Melody composition and development",
      "Song structure and arrangement",
      "Harmony and chord progressions for songwriters",
      "Collaboration techniques",
      "Refining and editing your songs",
    ],
    projects: [
      "Write lyrics for a verse and chorus",
      "Compose a complete song with lyrics and music",
      "Collaborate on a co-written song with peers",
    ],
    testimonials: [
      {
        name: "Jordan P.",
        comment:
          "Emma's feedback helped me find my unique voice as a songwriter. I've written my best material after taking this course.",
      },
      {
        name: "Sam K.",
        comment:
          "The collaborative aspects of this workshop pushed me out of my comfort zone in the best way possible.",
      },
    ],
  },
  {
    id: "orchestration-techniques",
    title: "Orchestration Techniques",
    instructor: "Dr. James Wilson",
    image: "/placeholder.svg?height=200&width=350",
    rating: 4.9,
    students: 3845,
    duration: "10 weeks",
    level: "Advanced",
    description: "Master the art of orchestration for film, games, and concert music with professional techniques.",
    topics: [
      "Instrument ranges and characteristics",
      "String writing and techniques",
      "Woodwind and brass orchestration",
      "Percussion and rhythm section",
      "Orchestral textures and colors",
      "Virtual orchestration with samples",
      "Score preparation and notation",
    ],
    projects: [
      "Orchestrate a piano piece for small ensemble",
      "Create an orchestral cue for a film scene",
      "Compose and orchestrate an original concert piece",
    ],
    testimonials: [
      {
        name: "Olivia M.",
        comment:
          "Dr. Wilson's deep knowledge of orchestration transformed my compositions. The detailed analysis of master works was particularly enlightening.",
      },
      {
        name: "Daniel R.",
        comment: "This course taught me how to bring my MIDI mockups to life with realistic orchestration techniques.",
      },
    ],
  },
  {
    id: "music-business-essentials",
    title: "Music Business Essentials",
    instructor: "Marcus Johnson",
    image: "/placeholder.svg?height=200&width=350",
    rating: 4.6,
    students: 5678,
    duration: "8 weeks",
    level: "Beginner to Intermediate",
    description:
      "Navigate the music industry with confidence by understanding contracts, royalties, marketing, and more.",
    topics: [
      "Copyright and intellectual property",
      "Publishing and royalties",
      "Record deals and distribution",
      "Music marketing and promotion",
      "Live performance and touring",
      "Social media and brand building",
      "Financial management for musicians",
    ],
    projects: [
      "Create a marketing plan for a music release",
      "Analyze and negotiate a sample contract",
      "Develop a business plan for a music career",
    ],
    testimonials: [
      {
        name: "Sophia L.",
        comment:
          "This course saved me from signing a terrible contract! The knowledge I gained is priceless for my career.",
      },
      {
        name: "Ryan T.",
        comment:
          "Marcus breaks down complex business concepts in an accessible way. I finally understand how royalties work!",
      },
    ],
  },
]

// Music events with detailed information
const musicEvents = [
  {
    id: "songwriting-contest",
    title: "International Songwriting Competition",
    date: "June 15-30, 2025",
    location: "Online",
    image: "/placeholder.svg?height=200&width=350",
    description:
      "Showcase your original compositions and get feedback from industry professionals in this prestigious competition.",
    details: {
      categories: [
        "Pop/Rock",
        "Folk/Singer-Songwriter",
        "R&B/Hip-Hop",
        "Electronic",
        "Instrumental",
        "Jazz",
        "Classical",
      ],
      prizes: ["$25,000 Grand Prize", "Recording Contract Opportunity", "Distribution Deal", "Gear Packages"],
      judges: ["Grammy-winning producers", "Record label executives", "Established songwriters", "Music supervisors"],
      eligibility: "Open to songwriters worldwide, all experience levels",
    },
    registration: {
      deadline: "May 31, 2025",
      fee: "$35 per entry",
      process: "Submit through online portal with MP3 and lyrics",
    },
  },
  {
    id: "music-production-workshop",
    title: "Advanced Music Production Workshop",
    date: "July 8-10, 2025",
    location: "Los Angeles, CA",
    image: "/placeholder.svg?height=200&width=350",
    description: "Hands-on workshop with top producers covering advanced production techniques, mixing, and mastering.",
    details: {
      instructors: [
        "Rick Rubin (Def Jam co-founder)",
        "Andrew Scheps (Grammy-winning engineer)",
        "Sylvia Massy (Tool, System of a Down)",
      ],
      equipment: "Professional studio with state-of-the-art gear",
      topics: [
        "Advanced mixing techniques",
        "Creative production approaches",
        "Analog and digital workflow integration",
      ],
      includes: ["Studio time", "Lunch and refreshments", "Recording of final projects", "Certificate of completion"],
    },
    registration: {
      deadline: "June 15, 2025",
      fee: "$1,200",
      process: "Application with portfolio review",
      capacity: "Limited to 20 participants",
    },
  },
  {
    id: "music-industry-conference",
    title: "Future of Music Conference",
    date: "August 22-24, 2025",
    location: "Nashville, TN",
    image: "/placeholder.svg?height=200&width=350",
    description:
      "Connect with industry leaders and explore emerging trends in music technology, distribution, and business models.",
    details: {
      speakers: ["Spotify executives", "Independent label founders", "Music tech entrepreneurs", "Successful artists"],
      panels: [
        "AI in Music Creation",
        "NFTs and Music Ownership",
        "Streaming Economics",
        "Building a Sustainable Career",
      ],
      networking: ["Speed mentoring sessions", "Nightly showcase concerts", "Industry mixers"],
      extras: ["Demo listening sessions", "One-on-one consultations", "Career development workshops"],
    },
    registration: {
      deadline: "August 1, 2025",
      fee: "$350 (Early bird: $275 before June 30)",
      process: "Online registration",
      student: "Discounted rate of $175 with valid ID",
    },
  },
  {
    id: "orchestral-recording-session",
    title: "Live Orchestral Recording Experience",
    date: "September 12, 2025",
    location: "Vienna, Austria",
    image: "/placeholder.svg?height=200&width=350",
    description: "Have your composition recorded by a professional orchestra in a world-class concert hall.",
    details: {
      orchestra: "Vienna Session Orchestra (45 pieces)",
      venue: "Historic Musikverein",
      includes: [
        "Professional recording",
        "Video documentation",
        "Score preparation assistance",
        "Mixing and mastering",
      ],
      requirements: "Compositions must be fully orchestrated and notated",
    },
    registration: {
      deadline: "July 31, 2025",
      fee: "$3,500 for up to 5 minutes of music",
      process: "Application with score and MIDI mockup submission",
      selection: "Limited slots available, juried selection process",
    },
  },
  {
    id: "music-therapy-symposium",
    title: "Music Therapy and Wellness Symposium",
    date: "October 5-7, 2025",
    location: "Boston, MA",
    image: "/placeholder.svg?height=200&width=350",
    description: "Explore the healing power of music with leading researchers and practitioners in music therapy.",
    details: {
      presenters: ["Neurologists", "Music therapists", "Psychology researchers", "Healthcare innovators"],
      topics: [
        "Music and Brain Development",
        "Therapeutic Applications in Healthcare",
        "Community Music Therapy",
        "Technology in Music Therapy",
      ],
      workshops: ["Drum Circle Facilitation", "Clinical Improvisation", "Assessment Techniques", "Research Methods"],
      certification: "Continuing education credits available",
    },
    registration: {
      deadline: "September 15, 2025",
      fee: "$425 (Professional), $225 (Student)",
      process: "Online registration",
      includes: "Materials, lunches, and evening concert",
    },
  },
]

// Music micro-tasks with detailed information
const musicMicroTasks = [
  {
    id: "task-1",
    title: "Chord Progression Analysis",
    career: "Music Producer",
    description: "Analyze the chord progression in this popular song and identify the key and chord functions.",
    content: `
Song: "Someone Like You" by Adele
Intro/Verse Chords: A - E/G# - F#m - D - A - E/G# - F#m - D - A
Chorus Chords: E - F#m - D - A - E - F#m - D - A
Bridge Chords: F#m - D - A - E
    `,
    solution: `
Key: A major
Chord Functions:
- A: I (Tonic)
- E/G#: V (Dominant with 3rd in bass)
- F#m: vi (Submediant)
- D: IV (Subdominant)
- E: V (Dominant)

The progression follows a common I-V-vi-IV pattern that creates a strong emotional pull. The use of the E/G# inversion creates a smooth bass line movement. The chorus emphasizes the dominant-tonic relationship with the E to A resolution.
    `,
    hint: "Start by identifying the key signature and analyzing the relationship between chords. Roman numerals indicate chord functions within the key.",
  },
  {
    id: "task-2",
    title: "Mix Evaluation",
    career: "Music Producer",
    description: "Identify mixing issues in this audio track and suggest improvements.",
    content: `
Issues in the mix:
- Vocals seem buried at times
- Bass and kick drum lack definition
- Overall mix sounds muddy
- Stereo image feels narrow
- Cymbals are harsh
    `,
    solution: `
Mixing Improvements:
1. Vocals: Apply a gentle 2-3dB boost around 2-3kHz to improve clarity. Use automation to bring up quieter passages.
2. Bass/Kick: Apply high-pass filter to other instruments below 100Hz to clear mud. Use sidechain compression on bass when kick hits.
3. Muddy mix: Cut frequencies around 200-300Hz on multiple tracks where mud accumulates. Add high-shelf boost around 10kHz for air.
4. Stereo image: Use stereo widening on overhead drums and background elements. Keep bass, kick, and vocals centered.
5. Harsh cymbals: Apply a de-esser or dynamic EQ around 6-8kHz to tame harshness. Consider a gentle low-pass filter above 16kHz.
    `,
    hint: "Consider frequency masking, dynamic range, stereo placement, and tonal balance when evaluating a mix.",
  },
  {
    id: "task-3",
    title: "Melody Composition",
    career: "Composer",
    description: "Compose a memorable 8-bar melody for this chord progression in the style of a film theme.",
    content: `
Chord Progression (in C major):
C - Am - F - G - C - Am - Dm - G

Style: Emotional film theme
Tempo: Moderately slow (around 80 BPM)
Instrumentation: Piano or orchestral
    `,
    solution: `
Melody Composition Approach:
1. Start on the root (C) to establish the key
2. Use longer notes (half notes, dotted quarters) to create an emotional quality
3. Create an arch shape with the melody (rising, then falling)
4. Include a distinctive motif that repeats with variation
5. Use passing tones and suspensions over chord changes for tension
6. Resolve to the tonic at the end for closure
7. Consider using the 6th scale degree (A) over the C chord for a bittersweet quality
8. Add a chromatic approach tone before the final G chord for drama
    `,
    hint: "Focus on creating a memorable motif and using the chord tones as anchor points for your melody. Consider the emotional arc of the melody.",
  },
  {
    id: "task-4",
    title: "Lesson Plan Development",
    career: "Music Teacher",
    description: "Create a 45-minute lesson plan for teaching basic rhythm to elementary school students.",
    content: `
Student Age: 8-10 years old
Previous Knowledge: Basic understanding of quarter and half notes
Learning Objectives: Introduce eighth notes and basic rhythmic patterns
Available Resources: Classroom percussion instruments, piano, whiteboard
    `,
    solution: `
45-Minute Rhythm Lesson Plan:

1. Warm-up (5 minutes):
   - Echo clapping patterns using quarter and half notes
   - Body percussion sequence to engage students physically

2. Introduction to Eighth Notes (10 minutes):
   - Visual representation on whiteboard (compare to quarter notes)
   - Counting system: "1 & 2 & 3 & 4 &"
   - Teacher demonstration on piano or percussion

3. Guided Practice (15 minutes):
   - Group echo clapping with eighth note patterns
   - "Pass the rhythm" circle game with increasing complexity
   - Simple rhythm reading from whiteboard notation

4. Application Activity (10 minutes):
   - Small groups create 4-beat rhythm patterns using cards
   - Groups perform their patterns for the class
   - Combine patterns to create a class composition

5. Assessment & Closure (5 minutes):
   - Individual quick-checks: teacher plays, student identifies
   - Review key concepts about eighth notes
   - Preview next lesson on combining note values

Extensions:
- Add simple lyrics to rhythm patterns
- Incorporate movement for kinesthetic learners
- Connect to familiar songs that use eighth notes
    `,
    hint: "Consider multiple learning modalities (visual, auditory, kinesthetic) and balance teacher instruction with student practice and application.",
  },
  {
    id: "task-5",
    title: "Performance Technique Analysis",
    career: "Performing Musician",
    description: "Analyze the vocal technique in this performance and identify strengths and areas for improvement.",
    content: `
Performance: Female vocalist performing a pop ballad
Observations:
- Strong head voice in chorus
- Some pitch issues in the bridge
- Occasional breathiness in lower register
- Good emotional expression
- Runs sound somewhat uncontrolled
    `,
    solution: `
Vocal Technique Analysis:

Strengths:
1. Head voice/upper register shows good resonance and control
2. Emotional connection to lyrics comes through clearly
3. Phrasing choices serve the song well
4. Tone color variations add interest to repeated sections

Areas for Improvement:
1. Pitch accuracy in bridge: Likely due to challenging intervals and register shifts. Recommend targeted interval practice and slow, deliberate practice with piano.
2. Lower register breathiness: Suggests need for better breath support. Recommend diaphragmatic breathing exercises and focused practice on lower range with proper support.
3. Vocal runs control: Runs sound improvised rather than planned. Recommend practicing runs slowly with metronome, gradually increasing speed until each note is distinct and intentional.
4. Dynamic contrast: Could use more variation between verses and chorus. Recommend mapping out dynamic plan for emotional build.

Technical exercises to address these issues:
- Sirens for register transitions
- Staccato exercises for breath support
- Slow-to-fast scale patterns for run precision
- Targeted pitch-matching exercises for the bridge section
    `,
    hint: "Consider both technical elements (pitch, breath support, registration) and interpretive elements (expression, phrasing, dynamics) in your analysis.",
  },
]

export default function CareerSimulatorPage() {
  const [selectedCategory, setSelectedCategory] = useState("music")
  const [selectedCareer, setSelectedCareer] = useState(musicCareers[0])
  const [activeTab, setActiveTab] = useState("overview")
  const [currentTask, setCurrentTask] = useState(null)
  const [userSolution, setUserSolution] = useState("")
  const [showSolution, setShowSolution] = useState(false)
  const [showVoiceGuide, setShowVoiceGuide] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showSuccessStory, setShowSuccessStory] = useState(false)
  const [selectedStory, setSelectedStory] = useState(null)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const { toast } = useToast()
  const router = useRouter()
  const { user } = useAuth()

  // Voice guide messages for different career categories
  const voiceGuideMessages = {
    music:
      "Welcome to the Music Career Simulator! Here you can explore various careers in the music industry, from production to performance, education, and therapy. Try out micro-tasks to experience what these professionals do day-to-day, browse courses to develop your skills, and discover upcoming events to connect with the music community.",
    tech: "Welcome to the Technology Career Simulator! Explore careers in software development, data science, cybersecurity, and more. Complete coding challenges, system design tasks, and other tech-related activities to get a feel for these professions.",
    art: "Welcome to the Art & Design Career Simulator! Discover careers in visual arts, graphic design, animation, and illustration. Try your hand at design challenges, composition exercises, and other creative tasks to experience these artistic professions.",
    default:
      "Welcome to the Career Simulator! Select a career category to explore different professions, try out related tasks, and discover learning opportunities. This immersive experience will help you understand what it's like to work in various fields.",
  }

  // Simulate loading and progress
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 5
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [])

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setActiveTab("overview")
    setCurrentTask(null)
    setShowSolution(false)
    setShowVoiceGuide(true)

    // Reset audio if playing
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }

    // Show toast notification
    toast({
      title: `${careerCategories.find((c) => c.id === category)?.name} Careers`,
      description: `Exploring careers in ${careerCategories.find((c) => c.id === category)?.name.toLowerCase()}.`,
    })
  }

  // Handle career selection
  const handleCareerSelect = (career) => {
    setSelectedCareer(career)
    setActiveTab("overview")
    setCurrentTask(null)
    setShowSolution(false)

    // Show toast notification
    toast({
      title: `${career.name} Selected`,
      description: `Exploring the ${career.name} career path.`,
    })
  }

  // Handle task selection
  const handleTaskSelect = (task) => {
    setCurrentTask(task)
    setUserSolution("")
    setShowSolution(false)

    // Show toast notification
    toast({
      title: `${task.title}`,
      description: `Try this ${task.career} micro-task to experience the profession.`,
    })
  }

  // Handle solution submission
  const handleSubmitSolution = () => {
    if (userSolution.trim() === "") {
      toast({
        title: "Empty Solution",
        description: "Please provide a solution before submitting.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Solution Submitted",
      description: "Your solution has been recorded. Check the expert solution below.",
    })
    setShowSolution(true)
  }

  // Handle success story selection
  const handleSuccessStoryClick = (story) => {
    setSelectedStory(story)
    setShowSuccessStory(true)
  }

  // Handle course selection
  const handleCourseSelect = (course) => {
    setSelectedCourse(course)
  }

  // Handle event selection
  const handleEventSelect = (event) => {
    setSelectedEvent(event)
  }

  // Handle audio playback
  const toggleAudio = () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        // Check if the audio can be played
        const playPromise = audioRef.current.play()

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Audio playback failed:", error)
            setIsPlaying(false)
            toast({
              title: "Audio Unavailable",
              description: "Demo audio track could not be loaded.",
            })
          })
        }
      }
      setIsPlaying(!isPlaying)
    } catch (error) {
      console.log("Audio error:", error)
      setIsPlaying(false)
    }
  }

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Career Simulator</h1>
            <p className="text-xl text-white/80">Preparing your immersive career experience...</p>
          </motion.div>

          <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mb-8">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="flex justify-center">
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
              className="text-white text-6xl"
            >
              {selectedCategory === "music"
                ? "🎵"
                : selectedCategory === "tech"
                  ? "💻"
                  : selectedCategory === "art"
                    ? "🎨"
                    : "🚀"}
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <ResponsiveNavbar />

      <main className="container mx-auto py-8 px-4 pt-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl mb-8"
        >
          <div
            className={`bg-gradient-to-r ${careerCategories.find((c) => c.id === selectedCategory)?.gradient || "from-violet-600 to-indigo-700"} p-8 md:p-12`}
          >
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Career Simulator</h1>
              <p className="text-xl text-white/90 max-w-2xl mb-6">
                Experience different careers through immersive simulations, micro-tasks, and expert insights.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
                  onClick={() => setActiveTab("tasks")}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Try Micro-Tasks
                </Button>
                <Button
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
                  onClick={() => setActiveTab("courses")}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Explore Courses
                </Button>
                <Button
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
                  onClick={() => setActiveTab("events")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Discover Events
                </Button>
              </div>
            </div>

            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-20">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 50 + 10,
                    height: Math.random() * 50 + 10,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 100 - 50],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Career Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Explore Career Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {careerCategories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`cursor-pointer rounded-xl overflow-hidden ${
                  selectedCategory === category.id
                    ? `ring-2 ring-offset-2 ring-${category.gradient.split("-")[1].split(" ")[0]}`
                    : ""
                }`}
                onClick={() => handleCategoryChange(category.id)}
              >
                <div
                  className={`bg-gradient-to-br ${category.gradient} p-6 h-full flex flex-col items-center justify-center text-center`}
                >
                  <category.icon className="h-8 w-8 text-white mb-3" />
                  <h3 className="font-bold text-white">{category.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Micro-Tasks</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Career List */}
              <div className="lg:col-span-1">
                <h3 className="text-xl font-bold mb-4">
                  {careerCategories.find((c) => c.id === selectedCategory)?.name || "Music"} Careers
                </h3>
                <div className="space-y-4">
                  {musicCareers.map((career) => (
                    <motion.div
                      key={career.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`cursor-pointer rounded-xl overflow-hidden border ${
                        selectedCareer.id === career.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                      onClick={() => handleCareerSelect(career)}
                    >
                      <div className="p-4 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl overflow-hidden">
                          {career.id === "music-producer"
                            ? "🎧"
                            : career.id === "composer"
                              ? "🎼"
                              : career.id === "music-teacher"
                                ? "👨‍🏫"
                                : career.id === "performing-musician"
                                  ? "🎸"
                                  : "🎵"}
                        </div>
                        <div>
                          <h4 className="font-bold">{career.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {career.averageSalary} • {career.growthRate}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Career Details */}
              <div className="lg:col-span-2">
                <Card className="border-2 border-primary/10">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl overflow-hidden">
                          {selectedCareer.id === "music-producer"
                            ? "🎧"
                            : selectedCareer.id === "composer"
                              ? "🎼"
                              : selectedCareer.id === "music-teacher"
                                ? "👨‍🏫"
                                : selectedCareer.id === "performing-musician"
                                  ? "🎸"
                                  : "🎵"}
                        </div>
                        <div>
                          <CardTitle className="text-2xl">{selectedCareer.name}</CardTitle>
                          <CardDescription>{selectedCareer.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        {selectedCareer.workEnvironment}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Career Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-primary/5 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Average Salary</h4>
                        <p className="text-2xl font-bold">{selectedCareer.averageSalary}</p>
                      </div>
                      <div className="bg-primary/5 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Growth Rate</h4>
                        <p className="text-2xl font-bold">{selectedCareer.growthRate}</p>
                      </div>
                      <div className="bg-primary/5 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Education</h4>
                        <p className="text-sm font-medium">{selectedCareer.education}</p>
                      </div>
                    </div>

                    {/* Key Skills */}
                    <div>
                      <h4 className="font-medium mb-3">Key Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCareer.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Daily Tasks */}
                    <div>
                      <h4 className="font-medium mb-3">Daily Tasks</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedCareer.dailyTasks.map((task, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tools */}
                    <div>
                      <h4 className="font-medium mb-3">Tools & Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCareer.tools.map((tool, index) => (
                          <div key={index} className="bg-secondary/50 px-3 py-1 rounded-full text-sm">
                            {tool}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Challenges */}
                    <div>
                      <h4 className="font-medium mb-3">Common Challenges</h4>
                      <div className="space-y-2">
                        {selectedCareer.challenges.map((challenge, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <span className="text-orange-500">•</span>
                            <span>{challenge}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Success Stories */}
                    <div>
                      <h4 className="font-medium mb-3">Success Stories</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {selectedCareer.successStories.map((story, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-primary/5 p-4 rounded-lg cursor-pointer"
                            onClick={() => handleSuccessStoryClick(story)}
                          >
                            <h5 className="font-bold mb-1">{story.name}</h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{story.achievement}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab("tasks")}>
                      Try Micro-Tasks
                    </Button>
                    <Button onClick={() => setActiveTab("courses")}>Explore Courses</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Micro-Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Task List */}
              <div>
                <h3 className="text-xl font-bold mb-4">Available Micro-Tasks</h3>
                <div className="space-y-4">
                  {musicMicroTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`cursor-pointer rounded-xl overflow-hidden border ${
                        currentTask?.id === task.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                      onClick={() => handleTaskSelect(task)}
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold">{task.title}</h4>
                          <Badge>{task.career}</Badge>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
                        <div className="mt-3 flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleTaskSelect(task)
                            }}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Current Task */}
              <div className="lg:col-span-2">
                {currentTask ? (
                  <Card className="border-2 border-primary/10">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{currentTask.title}</CardTitle>
                          <CardDescription>Experience a real-world task for a {currentTask.career}</CardDescription>
                        </div>
                        <Badge variant="outline">{currentTask.career}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">Task Description:</h4>
                        <p>{currentTask.description}</p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Task Details:</h4>
                        <div className="bg-muted p-4 rounded-md whitespace-pre-wrap font-mono text-sm">
                          {currentTask.content}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Your Solution:</h4>
                        <textarea
                          className="w-full min-h-[150px] p-3 border rounded-md font-mono text-sm"
                          value={userSolution}
                          onChange={(e) => setUserSolution(e.target.value)}
                          placeholder="Type your solution here..."
                        />
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <Button onClick={handleSubmitSolution}>Submit Solution</Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            toast({
                              title: "Hint",
                              description: currentTask.hint,
                            })
                          }}
                        >
                          Get Hint
                        </Button>
                      </div>

                      <AnimatePresence>
                        {showSolution && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4"
                          >
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-md">
                              <h4 className="font-medium text-green-800 dark:text-green-400 mb-2">Expert Solution:</h4>
                              <div className="bg-white dark:bg-gray-800 p-3 rounded-md whitespace-pre-wrap font-mono text-sm">
                                {currentTask.solution}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Zap className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Select a Micro-Task</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Choose a task from the list to experience what professionals do in their daily work.
                      </p>
                      <Button variant="outline" onClick={() => handleTaskSelect(musicMicroTasks[0])}>
                        Try First Task
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Course List */}
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold mb-4">Recommended Courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {musicCourses.map((course) => (
                    <motion.div
                      key={course.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`cursor-pointer rounded-xl overflow-hidden border ${
                        selectedCourse?.id === course.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                      onClick={() => handleCourseSelect(course)}
                    >
                      <div className="relative h-40 bg-gray-200 dark:bg-gray-700">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <Badge className="bg-white/90 text-black hover:bg-white/80">{course.level}</Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-lg mb-1">{course.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          {course.instructor} • {course.duration}
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1 text-sm font-medium">{course.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            ({course.students.toLocaleString()} students)
                          </span>
                        </div>
                        <p className="text-sm line-clamp-2">{course.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Course Details */}
              <div>
                {selectedCourse ? (
                  <Card className="border-2 border-primary/10 sticky top-24">
                    <div className="relative h-40 bg-gray-200 dark:bg-gray-700">
                      <Image
                        src={selectedCourse.image || "/placeholder.svg"}
                        alt={selectedCourse.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                        <Badge className="bg-white/90 text-black hover:bg-white/80">{selectedCourse.level}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{selectedCourse.title}</CardTitle>
                      <CardDescription>
                        {selectedCourse.instructor} • {selectedCourse.duration}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="ml-1 font-medium">{selectedCourse.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {selectedCourse.students.toLocaleString()} students
                        </span>
                      </div>

                      <p>{selectedCourse.description}</p>

                      <div>
                        <h4 className="font-medium mb-2">What You'll Learn</h4>
                        <ul className="space-y-1">
                          {selectedCourse.topics.slice(0, 4).map((topic, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                        {selectedCourse.topics.length > 4 && (
                          <Button variant="link" size="sm" className="mt-1 h-auto p-0">
                            Show all {selectedCourse.topics.length} topics
                          </Button>
                        )}
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Projects</h4>
                        <ul className="space-y-1">
                          {selectedCourse.projects.map((project, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-primary">•</span>
                              <span>{project}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Student Testimonials</h4>
                        <div className="space-y-3">
                          {selectedCourse.testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-muted p-3 rounded-md">
                              <p className="text-sm italic mb-1">"{testimonial.comment}"</p>
                              <p className="text-sm font-medium">- {testimonial.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Enroll Now</Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Select a Course</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Choose a course from the list to view details and curriculum.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Events List */}
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
                <div className="space-y-6">
                  {musicEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`cursor-pointer rounded-xl overflow-hidden border ${
                        selectedEvent?.id === event.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                      onClick={() => handleEventSelect(event)}
                    >
                      <div className="md:flex">
                        <div className="relative h-48 md:h-auto md:w-1/3 bg-gray-200 dark:bg-gray-700">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4 md:w-2/3">
                          <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                            <h4 className="font-bold text-lg">{event.title}</h4>
                            <Badge variant="outline">
                              <Calendar className="h-3 w-3 mr-1" />
                              {event.date}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{event.location}</p>
                          <p className="text-sm mb-4">{event.description}</p>
                          <div className="flex justify-between items-center">
                            <Badge variant="secondary">Registration: {event.registration.deadline}</Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEventSelect(event)
                              }}
                            >
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Event Details */}
              <div>
                {selectedEvent ? (
                  <Card className="border-2 border-primary/10 sticky top-24">
                    <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                      <Image
                        src={selectedEvent.image || "/placeholder.svg"}
                        alt={selectedEvent.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                        <Badge className="bg-white/90 text-black hover:bg-white/80">{selectedEvent.location}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{selectedEvent.title}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {selectedEvent.date}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>{selectedEvent.description}</p>

                      <div>
                        <h4 className="font-medium mb-2">Event Details</h4>
                        <div className="space-y-3">
                          {Object.entries(selectedEvent.details).map(([key, value]) => (
                            <div key={key}>
                              <h5 className="text-sm font-medium capitalize">{key}</h5>
                              {Array.isArray(value) ? (
                                <ul className="mt-1 space-y-1">
                                  {value.map((item, index) => (
                                    <li key={index} className="text-sm flex items-start gap-2">
                                      <span className="text-primary">•</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-sm">{value}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Registration Information</h4>
                        <div className="space-y-2">
                          {Object.entries(selectedEvent.registration).map(([key, value]) => (
                            <div key={key} className="flex items-start gap-2">
                              <span className="text-sm font-medium capitalize">{key}:</span>
                              <span className="text-sm">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Register Now</Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Calendar className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Select an Event</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Choose an event from the list to view details and registration information.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Audio Player (hidden but functional) */}
      <audio
        ref={audioRef}
        src="/placeholder.mp3"
        onEnded={() => setIsPlaying(false)}
        onError={(e) => {
          console.log("Audio error: Source not available")
          setIsPlaying(false)
        }}
        className="hidden"
      />

      {/* Fixed Audio Controls */}
      {selectedCategory === "music" && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20"
        >
          <Card className="border-2 border-primary/20 bg-black/80 backdrop-blur-md text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Music className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Experience Music</h4>
                  <p className="text-xs text-white/70">Listen while you explore</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
                    onClick={toggleAudio}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Success Story Dialog */}
      {showSuccessStory && selectedStory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{selectedStory.name}</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowSuccessStory(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl mx-auto mb-4">
                🏆
              </div>
              <h4 className="text-center font-medium mb-2">Success Story</h4>
              <p className="text-center">{selectedStory.achievement}</p>
            </div>
            <div className="text-center">
              <Button onClick={() => setShowSuccessStory(false)}>Close</Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Voice Guide */}
      {showVoiceGuide && (
        <VoiceGuide
          message={voiceGuideMessages[selectedCategory] || voiceGuideMessages.default}
          onClose={() => setShowVoiceGuide(false)}
        />
      )}
    </div>
  )
}
