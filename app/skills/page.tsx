"use client"

import { useRef } from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { ResponsiveNavbar } from "@/components/responsive-navbar"
import {
  Search,
  Plus,
  Award,
  Clock,
  BarChart,
  BookOpen,
  Code,
  Palette,
  MessageSquare,
  Brain,
  Zap,
  CheckCircle,
  XCircle,
  Lightbulb,
  Sparkles,
  Heart,
} from "lucide-react"

// Skill categories with icons
const skillCategories = [
  { id: "all", name: "All Skills", icon: BarChart },
  { id: "programming", name: "Programming", icon: Code },
  { id: "design", name: "Design", icon: Palette },
  { id: "soft-skills", name: "Soft Skills", icon: MessageSquare },
  { id: "data-science", name: "Data Science", icon: Brain },
]

// Skill challenges for interactive practice
const skillChallenges = [
  {
    id: "challenge-1",
    skillId: "skill-1", // JavaScript
    title: "Array Manipulation",
    description: "Write a function that filters an array of numbers to return only even numbers.",
    difficulty: "Medium",
    timeEstimate: "10 min",
    xpReward: 50,
    questions: [
      {
        id: "q1",
        question: "Which method would you use to filter elements in an array?",
        options: [
          { id: "a", text: "array.map()" },
          { id: "b", text: "array.filter()" },
          { id: "c", text: "array.reduce()" },
          { id: "d", text: "array.forEach()" },
        ],
        correctAnswer: "b",
      },
      {
        id: "q2",
        question: "How would you check if a number is even?",
        options: [
          { id: "a", text: "num / 2 === 0" },
          { id: "b", text: "num % 2 === 0" },
          { id: "c", text: "num % 2 === 1" },
          { id: "d", text: "num / 2 === 1" },
        ],
        correctAnswer: "b",
      },
    ],
  },
  {
    id: "challenge-2",
    skillId: "skill-4", // React
    title: "Component State",
    description: "Create a counter component that increments and decrements a value.",
    difficulty: "Easy",
    timeEstimate: "15 min",
    xpReward: 40,
    questions: [
      {
        id: "q1",
        question: "Which hook would you use to manage state in a functional component?",
        options: [
          { id: "a", text: "useEffect" },
          { id: "b", text: "useContext" },
          { id: "c", text: "useState" },
          { id: "d", text: "useReducer" },
        ],
        correctAnswer: "c",
      },
      {
        id: "q2",
        question: "How would you update state in React?",
        options: [
          { id: "a", text: "Directly modify the state variable" },
          { id: "b", text: "Use the setter function returned by useState" },
          { id: "c", text: "Use this.state = newValue" },
          { id: "d", text: "Use DOM manipulation" },
        ],
        correctAnswer: "b",
      },
    ],
  },
  {
    id: "challenge-3",
    skillId: "skill-2", // UI Design
    title: "Color Theory",
    description: "Select complementary colors for a given design scenario.",
    difficulty: "Medium",
    timeEstimate: "8 min",
    xpReward: 35,
    questions: [
      {
        id: "q1",
        question: "Which colors are complementary to each other?",
        options: [
          { id: "a", text: "Red and Green" },
          { id: "b", text: "Blue and Orange" },
          { id: "c", text: "Yellow and Purple" },
          { id: "d", text: "All of the above" },
        ],
        correctAnswer: "d",
      },
      {
        id: "q2",
        question: "What color scheme uses colors that are adjacent on the color wheel?",
        options: [
          { id: "a", text: "Analogous" },
          { id: "b", text: "Triadic" },
          { id: "c", text: "Complementary" },
          { id: "d", text: "Monochromatic" },
        ],
        correctAnswer: "a",
      },
    ],
  },
]

// Learning resources for skills
const learningResources = [
  {
    id: "resource-1",
    skillId: "skill-1", // JavaScript
    title: "Modern JavaScript Fundamentals",
    type: "Course",
    provider: "CodeAcademy",
    duration: "4 hours",
    difficulty: "Beginner",
    url: "#",
  },
  {
    id: "resource-2",
    skillId: "skill-4", // React
    title: "Building Interactive UIs with React",
    type: "Tutorial",
    provider: "React Docs",
    duration: "2 hours",
    difficulty: "Intermediate",
    url: "#",
  },
  {
    id: "resource-3",
    skillId: "skill-2", // UI Design
    title: "Color Theory for Digital Designers",
    type: "Article",
    provider: "Design Weekly",
    duration: "30 minutes",
    difficulty: "Beginner",
    url: "#",
  },
]

// Enhanced skill data with more details and interactive elements
const technicalSkills = [
  {
    id: "html",
    name: "HTML",
    level: 8,
    xp: 800,
    nextLevelXp: 1000,
    icon: <Code className="h-5 w-5" />,
    description: "Structure and semantics of web pages",
    longDescription:
      "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the structure and content of web pages.",
    children: ["css"],
    position: { x: 50, y: 50 },
    resources: [
      { name: "MDN Web Docs - HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "W3Schools HTML Tutorial", url: "https://www.w3schools.com/html/" },
      { name: "HTML5 Specification", url: "https://html.spec.whatwg.org/" },
    ],
    projects: [
      { name: "Personal Portfolio", difficulty: "Beginner" },
      { name: "Semantic Blog Layout", difficulty: "Intermediate" },
    ],
    relatedSkills: ["Accessibility", "SEO", "Web Standards"],
    masteryLevels: [
      { level: 1, description: "Basic understanding of HTML tags and document structure" },
      { level: 3, description: "Comfortable with semantic HTML and forms" },
      { level: 5, description: "Advanced knowledge of HTML5 features and APIs" },
      { level: 8, description: "Expert-level understanding of HTML specifications and best practices" },
      { level: 10, description: "Mastery of HTML optimization, accessibility, and advanced techniques" },
    ],
    quizQuestions: [
      {
        question: "Which HTML element is used to define the main content of a document?",
        options: ["<content>", "<main>", "<section>", "<article>"],
        answer: 1,
      },
      {
        question: "Which attribute is used to provide alternative text for an image?",
        options: ["alt", "title", "description", "text"],
        answer: 0,
      },
      {
        question: "Which HTML5 element represents a standalone section of content?",
        options: ["<div>", "<span>", "<article>", "<aside>"],
        answer: 2,
      },
    ],
    practiceExercises: [
      {
        title: "Create a Semantic Blog Layout",
        description: "Build a blog post layout using semantic HTML5 elements",
        steps: [
          "Create the basic HTML structure with doctype and head/body",
          "Add a header with site title and navigation",
          "Create a main section with article elements",
          "Add appropriate semantic elements like figure, aside, and footer",
        ],
      },
      {
        title: "Build an Accessible Form",
        description: "Create a form with proper accessibility features",
        steps: [
          "Create a form with appropriate form controls",
          "Add labels with 'for' attributes matching input IDs",
          "Include appropriate ARIA attributes where needed",
          "Add form validation with helpful error messages",
        ],
      },
    ],
  },
  {
    id: "css",
    name: "CSS",
    level: 7,
    xp: 700,
    nextLevelXp: 1000,
    icon: <Code className="h-5 w-5" />,
    description: "Styling and layout of web pages",
    longDescription:
      "CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML. CSS is designed to enable the separation of presentation and content.",
    children: ["javascript"],
    position: { x: 150, y: 50 },
    resources: [
      { name: "MDN Web Docs - CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { name: "CSS-Tricks", url: "https://css-tricks.com/" },
      { name: "Learn CSS", url: "https://web.dev/learn/css/" },
    ],
    projects: [
      { name: "Responsive Landing Page", difficulty: "Beginner" },
      { name: "CSS Animation Gallery", difficulty: "Intermediate" },
      { name: "Complex Layout System", difficulty: "Advanced" },
    ],
    relatedSkills: ["Design", "Animation", "Responsive Design", "Sass/SCSS"],
    masteryLevels: [
      { level: 1, description: "Basic styling and selectors" },
      { level: 3, description: "Layout techniques and responsive design" },
      { level: 5, description: "Advanced selectors and animations" },
      { level: 7, description: "Complex layouts, CSS architecture, and optimization" },
      { level: 10, description: "Mastery of CSS frameworks, preprocessors, and cutting-edge features" },
    ],
    quizQuestions: [
      {
        question: "Which CSS property is used to change the text color?",
        options: ["text-color", "font-color", "color", "text-style"],
        answer: 2,
      },
      {
        question: "Which CSS property is used to make a flexible box layout?",
        options: ["flex", "display: flex", "flexbox", "box-flex"],
        answer: 1,
      },
      {
        question: "Which CSS unit is relative to the font-size of the element?",
        options: ["px", "em", "vh", "vw"],
        answer: 1,
      },
    ],
    practiceExercises: [
      {
        title: "Create a Responsive Grid Layout",
        description: "Build a responsive grid layout using CSS Grid",
        steps: [
          "Set up the HTML structure with container and grid items",
          "Create a basic grid layout with grid-template-columns",
          "Add media queries for different screen sizes",
          "Implement grid areas for more complex layouts",
        ],
      },
      {
        title: "Build an Animated Button",
        description: "Create a button with hover animations",
        steps: [
          "Style a basic button with padding, colors, and border-radius",
          "Add a hover state with transition property",
          "Create a subtle scale effect on hover",
          "Add a more complex animation like a gradient shift",
        ],
      },
    ],
  },
  {
    id: "javascript",
    name: "JavaScript",
    level: 6,
    xp: 600,
    nextLevelXp: 1000,
    icon: <Code className="h-5 w-5" />,
    description: "Programming language for web interactivity",
    longDescription:
      "JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. JavaScript enables interactive web pages and is an essential part of web applications.",
    children: ["react"],
    position: { x: 250, y: 50 },
    resources: [
      { name: "MDN Web Docs - JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "JavaScript.info", url: "https://javascript.info/" },
      { name: "Eloquent JavaScript", url: "https://eloquentjavascript.net/" },
    ],
    projects: [
      { name: "Interactive Form Validation", difficulty: "Beginner" },
      { name: "Todo Application", difficulty: "Intermediate" },
      { name: "Real-time Data Dashboard", difficulty: "Advanced" },
    ],
    relatedSkills: ["ES6+", "DOM Manipulation", "Asynchronous Programming", "TypeScript"],
    masteryLevels: [
      { level: 1, description: "Basic syntax and simple scripts" },
      { level: 3, description: "DOM manipulation and event handling" },
      { level: 6, description: "Advanced concepts like closures, prototypes, and async programming" },
      { level: 8, description: "Complex application architecture and performance optimization" },
      { level: 10, description: "Expert-level JavaScript engineering and framework development" },
    ],
    quizQuestions: [
      {
        question: "Which method is used to add an element at the end of an array?",
        options: ["push()", "append()", "add()", "insert()"],
        answer: 0,
      },
      {
        question: "What does the 'async' keyword do in JavaScript?",
        options: [
          "Makes a function run in a separate thread",
          "Makes a function return a Promise",
          "Makes a function execute immediately",
          "Makes a function wait for user input",
        ],
        answer: 1,
      },
      {
        question: "Which operator is used for strict equality comparison?",
        options: ["==", "===", "=", "!="],
        answer: 1,
      },
    ],
    practiceExercises: [
      {
        title: "Build a Todo List App",
        description: "Create a simple todo list with add, complete, and delete functionality",
        steps: [
          "Set up the HTML structure with input field and list",
          "Add event listeners for form submission",
          "Implement adding new todo items to the list",
          "Add functionality to mark items as complete and delete them",
        ],
      },
      {
        title: "Fetch and Display Data",
        description: "Fetch data from an API and display it on the page",
        steps: [
          "Create a function to fetch data using the Fetch API",
          "Handle the Promise and convert response to JSON",
          "Create DOM elements to display the data",
          "Add error handling and loading states",
        ],
      },
    ],
  },
  {
    id: "react",
    name: "React",
    level: 5,
    xp: 500,
    nextLevelXp: 1000,
    icon: <Code className="h-5 w-5" />,
    description: "Library for building user interfaces",
    longDescription:
      "React is a JavaScript library for building user interfaces, particularly single-page applications. It's used for handling the view layer and allows you to create reusable UI components.",
    children: ["fullstack"],
    position: { x: 350, y: 50 },
    resources: [
      { name: "React Documentation", url: "https://reactjs.org/docs/getting-started.html" },
      { name: "React Patterns", url: "https://reactpatterns.com/" },
      { name: "React Hooks", url: "https://reactjs.org/docs/hooks-intro.html" },
    ],
    projects: [
      { name: "Personal Portfolio in React", difficulty: "Beginner" },
      { name: "E-commerce Product Page", difficulty: "Intermediate" },
      { name: "Full-featured SPA with Authentication", difficulty: "Advanced" },
    ],
    relatedSkills: ["Redux", "React Router", "Next.js", "React Native"],
    masteryLevels: [
      { level: 1, description: "Basic components and props" },
      { level: 3, description: "State management and lifecycle methods" },
      { level: 5, description: "Hooks, context, and performance optimization" },
      { level: 8, description: "Advanced patterns, custom hooks, and complex state management" },
      { level: 10, description: "Expert-level React architecture and framework development" },
    ],
    quizQuestions: [
      {
        question: "Which hook is used for side effects in React?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        answer: 1,
      },
      {
        question: "What is the correct way to update state in React?",
        options: [
          "this.state.count = this.state.count + 1",
          "this.setState({ count: this.state.count + 1 })",
          "setState(count + 1)",
          "count = count + 1",
        ],
        answer: 1,
      },
      {
        question: "Which lifecycle method is replaced by useEffect?",
        options: ["componentDidMount", "componentWillUnmount", "componentDidUpdate", "All of the above"],
        answer: 3,
      },
    ],
    practiceExercises: [
      {
        title: "Create a Counter Component",
        description: "Build a simple counter with increment and decrement buttons",
        steps: [
          "Create a functional component with useState hook",
          "Add buttons for increment and decrement",
          "Implement the state update functions",
          "Add a reset button and counter display",
        ],
      },
      {
        title: "Fetch Data with useEffect",
        description: "Create a component that fetches and displays data",
        steps: [
          "Set up state for data, loading, and error states",
          "Create a useEffect hook to fetch data when component mounts",
          "Display loading state while fetching",
          "Handle and display errors if they occur",
        ],
      },
    ],
  },
  {
    id: "fullstack",
    name: "Full Stack",
    level: 3,
    xp: 300,
    nextLevelXp: 1000,
    icon: <Code className="h-5 w-5" />,
    description: "End-to-end web development",
    longDescription:
      "Full Stack development involves working with both the front-end and back-end of web applications. It encompasses everything from the user interface to the server, database, and APIs.",
    children: [],
    position: { x: 450, y: 50 },
    resources: [
      { name: "The Odin Project", url: "https://www.theodinproject.com/" },
      { name: "Full Stack Open", url: "https://fullstackopen.com/en/" },
      { name: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/" },
    ],
    projects: [
      { name: "CRUD Application", difficulty: "Intermediate" },
      { name: "Social Media Platform", difficulty: "Advanced" },
      { name: "E-commerce Website", difficulty: "Advanced" },
    ],
    relatedSkills: ["Database Design", "API Development", "Authentication", "Deployment"],
    masteryLevels: [
      { level: 1, description: "Basic understanding of front-end and back-end concepts" },
      { level: 3, description: "Building simple full-stack applications with guidance" },
      { level: 5, description: "Independent development of full-stack applications" },
      { level: 8, description: "Advanced architecture, scalability, and performance optimization" },
      { level: 10, description: "Expert-level full-stack engineering and system design" },
    ],
    quizQuestions: [
      {
        question: "Which of these is NOT typically considered a back-end technology?",
        options: ["Node.js", "Django", "React", "Ruby on Rails"],
        answer: 2,
      },
      {
        question: "What does API stand for?",
        options: [
          "Application Programming Interface",
          "Application Process Integration",
          "Automated Programming Interface",
          "Application Protocol Interface",
        ],
        answer: 0,
      },
      {
        question: "Which database type stores data in tables with rows and columns?",
        options: ["NoSQL", "Graph Database", "Relational Database", "Document Database"],
        answer: 2,
      },
    ],
    practiceExercises: [
      {
        title: "Build a REST API",
        description: "Create a simple REST API with CRUD operations",
        steps: [
          "Set up a Node.js project with Express",
          "Create routes for GET, POST, PUT, and DELETE operations",
          "Implement controllers to handle the requests",
          "Connect to a database for data persistence",
        ],
      },
      {
        title: "Full Stack Todo App",
        description: "Build a todo app with front-end and back-end components",
        steps: [
          "Create a React front-end with components for todos",
          "Build a Node.js back-end with Express",
          "Implement API endpoints for todo operations",
          "Connect the front-end and back-end with fetch or axios",
        ],
      },
    ],
  },
  {
    id: "node",
    name: "Node.js",
    level: 4,
    xp: 400,
    nextLevelXp: 1000,
    icon: <Code className="h-5 w-5" />,
    description: "JavaScript runtime for server-side development",
    longDescription:
      "Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser. It allows developers to use JavaScript for server-side scripting.",
    children: [],
    position: { x: 550, y: 100 },
    resources: [
      { name: "Node.js Documentation", url: "https://nodejs.org/en/docs/" },
      { name: "Node.js Best Practices", url: "https://github.com/goldbergyoni/nodebestpractices" },
      { name: "Express.js Documentation", url: "https://expressjs.com/" },
    ],
    projects: [
      { name: "RESTful API", difficulty: "Beginner" },
      { name: "Real-time Chat Application", difficulty: "Intermediate" },
      { name: "Microservices Architecture", difficulty: "Advanced" },
    ],
    relatedSkills: ["Express.js", "MongoDB", "API Design", "WebSockets"],
    masteryLevels: [
      { level: 1, description: "Basic Node.js concepts and simple scripts" },
      { level: 3, description: "Building APIs with Express.js" },
      { level: 4, description: "Working with databases and authentication" },
      { level: 7, description: "Advanced patterns, performance, and security" },
      { level: 10, description: "Expert-level Node.js architecture and scaling" },
    ],
    quizQuestions: [
      {
        question: "What is the package manager for Node.js?",
        options: ["pip", "npm", "yarn", "Both B and C"],
        answer: 3,
      },
      {
        question: "Which module is used to create a server in Node.js?",
        options: ["fs", "http", "path", "os"],
        answer: 1,
      },
      {
        question: "What does the 'require' function do in Node.js?",
        options: ["Imports modules", "Defines variables", "Creates functions", "Exports modules"],
        answer: 0,
      },
    ],
    practiceExercises: [
      {
        title: "Create a File Server",
        description: "Build a simple file server with Node.js",
        steps: [
          "Set up a basic Node.js server with the http module",
          "Implement file reading with the fs module",
          "Add content-type headers based on file extensions",
          "Handle errors and 404 responses",
        ],
      },
      {
        title: "Build a REST API with Express",
        description: "Create a RESTful API using Express.js",
        steps: [
          "Set up an Express.js project",
          "Create routes for different endpoints",
          "Implement middleware for request processing",
          "Add error handling and validation",
        ],
      },
    ],
  },
  {
    id: "python",
    name: "Python",
    level: 2,
    xp: 200,
    nextLevelXp: 1000,
    icon: <Code className="h-5 w-5" />,
    description: "Versatile programming language for various applications",
    longDescription:
      "Python is an interpreted, high-level, general-purpose programming language. Its design philosophy emphasizes code readability with its use of significant whitespace.",
    children: [],
    position: { x: 650, y: 150 },
    resources: [
      { name: "Python Documentation", url: "https://docs.python.org/3/" },
      { name: "Real Python", url: "https://realpython.com/" },
      { name: "Python Crash Course", url: "https://ehmatthes.github.io/pcc/" },
    ],
    projects: [
      { name: "Data Analysis Script", difficulty: "Beginner" },
      { name: "Web Scraper", difficulty: "Intermediate" },
      { name: "Machine Learning Model", difficulty: "Advanced" },
    ],
    relatedSkills: ["Data Science", "Machine Learning", "Web Development", "Automation"],
    masteryLevels: [
      { level: 1, description: "Basic syntax and simple scripts" },
      { level: 2, description: "Working with libraries and data structures" },
      { level: 5, description: "Building applications and working with frameworks" },
      { level: 8, description: "Advanced Python concepts and optimization" },
      { level: 10, description: "Expert-level Python engineering and architecture" },
    ],
    quizQuestions: [
      {
        question: "Which of these is NOT a Python data type?",
        options: ["List", "Dictionary", "Array", "Tuple"],
        answer: 2,
      },
      {
        question: "What is the correct way to create a function in Python?",
        options: ["function myFunc():", "def myFunc():", "create myFunc():", "func myFunc():"],
        answer: 1,
      },
      {
        question: "Which Python library is commonly used for data analysis and manipulation?",
        options: ["NumPy", "Pandas", "Matplotlib", "TensorFlow"],
        answer: 1,
      },
    ],
    practiceExercises: [
      {
        title: "Data Analysis with Pandas",
        description: "Analyze a dataset using Pandas",
        steps: [
          "Import pandas and read a CSV file",
          "Clean and preprocess the data",
          "Perform basic statistical analysis",
          "Create visualizations of the data",
        ],
      },
      {
        title: "Build a Web Scraper",
        description: "Create a script to extract data from websites",
        steps: [
          "Set up a project with requests and BeautifulSoup",
          "Send HTTP requests to target websites",
          "Parse HTML and extract relevant data",
          "Store the data in a structured format",
        ],
      },
    ],
  },
]

const softSkills = [
  {
    id: "leadership",
    name: "Leadership",
    level: 4,
    xp: 400,
    nextLevelXp: 1000,
    icon: <Brain className="h-5 w-5" />,
    description: "Guiding and inspiring others",
    longDescription:
      "Leadership involves guiding, motivating, and inspiring others to achieve common goals. It includes decision-making, delegation, and creating a positive team environment.",
    resources: [
      { name: "Leadership Essentials", url: "#" },
      { name: "Team Management Principles", url: "#" },
    ],
    projects: [
      { name: "Team Project Leadership", difficulty: "Intermediate" },
      { name: "Mentoring Program", difficulty: "Advanced" },
    ],
    masteryLevels: [
      { level: 1, description: "Basic understanding of leadership principles" },
      { level: 4, description: "Effective team leadership in small groups" },
      { level: 7, description: "Strategic leadership and vision setting" },
      { level: 10, description: "Transformational leadership and organizational impact" },
    ],
    quizQuestions: [
      {
        question: "Which leadership style involves making decisions without consulting the team?",
        options: ["Democratic", "Laissez-faire", "Autocratic", "Transformational"],
        answer: 2,
      },
      {
        question: "What is delegation in leadership?",
        options: [
          "Avoiding responsibility",
          "Assigning tasks to team members",
          "Leading by example",
          "Making all decisions yourself",
        ],
        answer: 1,
      },
    ],
    practiceExercises: [
      {
        title: "Team Vision Exercise",
        description: "Create a compelling vision for a team project",
        steps: [
          "Identify the core purpose of the team",
          "Define clear and measurable goals",
          "Create a vision statement that inspires",
          "Develop a plan to communicate the vision",
        ],
      },
    ],
  },
  {
    id: "empathy",
    name: "Empathy",
    level: 6,
    xp: 600,
    nextLevelXp: 1000,
    icon: <Heart className="h-5 w-5" />,
    description: "Understanding others' feelings and perspectives",
    longDescription:
      "Empathy is the ability to understand and share the feelings of another person. In a professional context, it involves recognizing others' perspectives, needs, and emotions.",
    resources: [
      { name: "Developing Emotional Intelligence", url: "#" },
      { name: "Empathetic Communication", url: "#" },
    ],
    projects: [
      { name: "User Research Study", difficulty: "Beginner" },
      { name: "Inclusive Design Project", difficulty: "Intermediate" },
    ],
    masteryLevels: [
      { level: 1, description: "Basic awareness of others' emotions" },
      { level: 6, description: "Active empathetic listening and response" },
      { level: 8, description: "Deep understanding of diverse perspectives" },
      { level: 10, description: "Transformative empathy that drives positive change" },
    ],
    quizQuestions: [
      {
        question: "Which of these is NOT a component of empathy?",
        options: ["Perspective taking", "Emotional recognition", "Judging others' feelings", "Compassionate response"],
        answer: 2,
      },
      {
        question: "What is active listening?",
        options: [
          "Interrupting to share your opinion",
          "Fully concentrating on what is being said",
          "Listening only to important parts",
          "Multitasking while someone speaks",
        ],
        answer: 1,
      },
    ],
    practiceExercises: [
      {
        title: "Perspective-Taking Exercise",
        description: "Practice seeing situations from others' viewpoints",
        steps: [
          "Choose a recent disagreement or conflict",
          "Write down how the other person might have felt",
          "Identify factors that influenced their perspective",
          "Reflect on how this understanding changes your view",
        ],
      },
    ],
  },
  {
    id: "communication",
    name: "Communication",
    level: 5,
    xp: 500,
    nextLevelXp: 1000,
    icon: <MessageSquare className="h-5 w-5" />,
    description: "Clearly conveying ideas and information",
    longDescription:
      "Communication involves effectively expressing ideas and information verbally and in writing. It includes active listening, clear articulation, and adapting your message to different audiences.",
    resources: [
      { name: "Effective Technical Communication", url: "#" },
      { name: "Public Speaking Fundamentals", url: "#" },
    ],
    projects: [
      { name: "Technical Documentation", difficulty: "Beginner" },
      { name: "Presentation Workshop", difficulty: "Intermediate" },
    ],
    masteryLevels: [
      { level: 1, description: "Basic verbal and written communication" },
      { level: 5, description: "Clear and effective communication in various contexts" },
      { level: 8, description: "Strategic communication and persuasion" },
      { level: 10, description: "Masterful communication that inspires and transforms" },
    ],
    quizQuestions: [
      {
        question: "What is the primary purpose of communication?",
        options: [
          "To express yourself",
          "To exchange information and understanding",
          "To persuade others",
          "To fill silence",
        ],
        answer: 1,
      },
      {
        question: "Which of these is a barrier to effective communication?",
        options: ["Active listening", "Clear language", "Emotional awareness", "Assumptions"],
        answer: 3,
      },
    ],
    practiceExercises: [
      {
        title: "Elevator Pitch",
        description: "Create a concise explanation of a complex topic",
        steps: [
          "Choose a technical concept you understand well",
          "Identify the core elements that must be communicated",
          "Create a 30-second explanation using simple language",
          "Practice delivering it clearly and confidently",
        ],
      },
    ],
  },
  {
    id: "problemSolving",
    name: "Problem Solving",
    level: 7,
    xp: 700,
    nextLevelXp: 1000,
    icon: <Brain className="h-5 w-5" />,
    description: "Finding effective solutions to challenges",
    longDescription:
      "Problem solving is the process of identifying issues, analyzing them, and implementing effective solutions. It involves critical thinking, creativity, and analytical skills.",
    resources: [
      { name: "Critical Thinking Techniques", url: "#" },
      { name: "Structured Problem Solving", url: "#" },
    ],
    projects: [
      { name: "Debugging Challenge", difficulty: "Intermediate" },
      { name: "System Optimization", difficulty: "Advanced" },
    ],
    masteryLevels: [
      { level: 1, description: "Basic problem identification" },
      { level: 4, description: "Systematic problem analysis" },
      { level: 7, description: "Creative and effective solution development" },
      { level: 10, description: "Expert problem solving in complex domains" },
    ],
    quizQuestions: [
      {
        question: "What is the first step in the problem-solving process?",
        options: [
          "Implementing solutions",
          "Identifying the problem",
          "Evaluating alternatives",
          "Gathering resources",
        ],
        answer: 1,
      },
      {
        question: "Which technique involves breaking a problem into smaller parts?",
        options: ["Brainstorming", "Root cause analysis", "Decomposition", "Trial and error"],
        answer: 2,
      },
    ],
    practiceExercises: [
      {
        title: "Root Cause Analysis",
        description: "Identify the underlying cause of a problem",
        steps: [
          "Select a recurring problem you've encountered",
          "Ask 'why' five times to dig deeper",
          "Identify potential root causes",
          "Develop solutions that address these root causes",
        ],
      },
    ],
  },
]

// Achievements data
const achievements = [
  {
    id: 1,
    name: "HTML Master",
    description: "Reached level 8 in HTML",
    icon: <Badge className="h-8 w-8 bg-yellow-500" />,
    unlocked: true,
    unlockedAt: "2025-03-15",
    xpAwarded: 200,
  },
  {
    id: 2,
    name: "CSS Stylist",
    description: "Reached level 7 in CSS",
    icon: <Badge className="h-8 w-8 bg-blue-500" />,
    unlocked: true,
    unlockedAt: "2025-03-28",
    xpAwarded: 150,
  },
  {
    id: 3,
    name: "JavaScript Wizard",
    description: "Reached level 10 in JavaScript",
    icon: <Badge className="h-8 w-8 bg-yellow-600" />,
    unlocked: false,
    requirements: "Reach level 10 in JavaScript",
    xpReward: 500,
  },
  {
    id: 4,
    name: "React Developer",
    description: "Built 5 React applications",
    icon: <Badge className="h-8 w-8 bg-blue-600" />,
    unlocked: false,
    requirements: "Complete 5 React projects",
    progress: "2/5 completed",
    xpReward: 300,
  },
  {
    id: 5,
    name: "Team Player",
    description: "Collaborated on 3 group projects",
    icon: <Badge className="h-8 w-8 bg-green-500" />,
    unlocked: true,
    unlockedAt: "2025-04-10",
    xpAwarded: 250,
  },
  {
    id: 6,
    name: "Bug Hunter",
    description: "Found and fixed 10 critical bugs",
    icon: <Badge className="h-8 w-8 bg-red-500" />,
    unlocked: false,
    requirements: "Find and fix 10 critical bugs",
    progress: "4/10 completed",
    xpReward: 400,
  },
  {
    id: 7,
    name: "Accessibility Advocate",
    description: "Implemented WCAG standards in 3 projects",
    icon: <Badge className="h-8 w-8 bg-purple-500" />,
    unlocked: false,
    requirements: "Implement WCAG standards in 3 projects",
    progress: "1/3 completed",
    xpReward: 350,
  },
  {
    id: 8,
    name: "Performance Guru",
    description: "Optimized 5 applications for speed",
    icon: <Badge className="h-8 w-8 bg-orange-500" />,
    unlocked: false,
    requirements: "Optimize 5 applications for speed",
    progress: "2/5 completed",
    xpReward: 400,
  },
]

// Learning paths
const learningPaths = [
  {
    id: "frontend",
    name: "Frontend Developer",
    description: "Master the art of creating beautiful, interactive user interfaces",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    projects: [
      { name: "Personal Portfolio", completed: true },
      { name: "Interactive Dashboard", completed: false },
      { name: "E-commerce Frontend", completed: false },
    ],
    progress: 35,
    estimatedTime: "4 months",
  },
  {
    id: "fullstack",
    name: "Full Stack Developer",
    description: "Develop end-to-end web applications with frontend and backend expertise",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    projects: [
      { name: "Blog Platform", completed: false },
      { name: "Social Media App", completed: false },
      { name: "E-commerce Website", completed: false },
    ],
    progress: 20,
    estimatedTime: "6 months",
  },
  {
    id: "datascience",
    name: "Data Science",
    description: "Learn to analyze and visualize data to extract meaningful insights",
    skills: ["Python", "Statistics", "Machine Learning", "Data Visualization"],
    projects: [
      { name: "Data Analysis Report", completed: false },
      { name: "Predictive Model", completed: false },
      { name: "Interactive Dashboard", completed: false },
    ],
    progress: 10,
    estimatedTime: "8 months",
  },
]

export default function SkillsPage() {
  const router = useRouter()
  const { user, updateUser } = useAuth()
  const { toast } = useToast()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeChallenge, setActiveChallenge] = useState<any>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [newSkill, setNewSkill] = useState({ name: "", level: 1, category: "Programming", description: "" })
  const [showAddSkillForm, setShowAddSkillForm] = useState(false)
  const [practiceMode, setPracticeMode] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("technical")
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [showSkillDialog, setShowSkillDialog] = useState(false)
  const [showAchievementDialog, setShowAchievementDialog] = useState(false)
  const [selectedAchievement, setSelectedAchievement] = useState(null)
  const [showPathDialog, setShowPathDialog] = useState(false)
  const [selectedPath, setSelectedPath] = useState(null)
  const [showQuizDialog, setShowQuizDialog] = useState(false)
  const [showPracticeDialog, setShowPracticeDialog] = useState(false)
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [selectedPractice, setSelectedPractice] = useState(null)
  const [practiceStep, setPracticeStep] = useState(0)
  const [isSkillTreeView, setIsSkillTreeView] = useState(true)
  const [dragSkill, setDragSkill] = useState(null)
  const [skillPositions, setSkillPositions] = useState({})
  const skillTreeRef = useRef(null)

  // Filter skills based on category and search query
  const filteredSkills =
    user?.skills.filter((skill) => {
      const matchesCategory =
        selectedCategory === "all" || skill.category.toLowerCase() === selectedCategory.toLowerCase()
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    }) || []

  // Get challenges for a specific skill
  const getChallengesForSkill = (skillId: string) => {
    return skillChallenges.filter((challenge) => challenge.skillId === skillId)
  }

  // Get resources for a specific skill
  const getResourcesForSkill = (skillId: string) => {
    return learningResources.filter((resource) => resource.skillId === skillId)
  }

  // Start a challenge
  const startChallenge = (challenge: any) => {
    setActiveChallenge(challenge)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setShowResults(false)
  }

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }))
  }

  // Go to next question or show results
  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeChallenge.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  // Calculate challenge results
  const calculateResults = () => {
    if (!activeChallenge) return { correct: 0, total: 0, percentage: 0 }

    const correct = activeChallenge.questions.filter((q: any) => selectedAnswers[q.id] === q.correctAnswer).length

    const total = activeChallenge.questions.length
    const percentage = Math.round((correct / total) * 100)

    return { correct, total, percentage }
  }

  // Complete challenge and award XP
  const completeChallenge = () => {
    const results = calculateResults()

    if (results.percentage >= 70 && user) {
      // Award XP based on performance
      const xpGained = Math.round((activeChallenge.xpReward * results.percentage) / 100)

      updateUser({
        xp: user.xp + xpGained,
        // Increase skill level if performance is excellent
        skills: user.skills.map((skill) =>
          skill.id === activeChallenge.skillId && results.percentage >= 90
            ? { ...skill, level: Math.min(skill.level + 1, 10), lastPracticed: new Date().toISOString() }
            : skill.id === activeChallenge.skillId
              ? { ...skill, lastPracticed: new Date().toISOString() }
              : skill,
        ),
      })

      toast({
        title: "Challenge completed!",
        description: `You earned ${xpGained} XP. ${results.percentage >= 90 ? "Your skill level increased!" : ""}`,
      })
    }

    setActiveChallenge(null)
    setPracticeMode(null)
  }

  // Add a new skill
  const handleAddSkill = () => {
    if (!user) return

    if (!newSkill.name.trim()) {
      toast({
        title: "Error",
        description: "Skill name is required",
        variant: "destructive",
      })
      return
    }

    const newSkillObj = {
      id: `skill-${Date.now()}`,
      name: newSkill.name,
      level: newSkill.level,
      category: newSkill.category,
      description: newSkill.description || `Skills in ${newSkill.name}`,
      lastPracticed: new Date().toISOString(),
    }

    updateUser({
      skills: [...user.skills, newSkillObj],
    })

    setNewSkill({ name: "", level: 1, category: "Programming", description: "" })
    setShowAddSkillForm(false)

    toast({
      title: "Skill added",
      description: `${newSkill.name} has been added to your skills`,
    })
  }

  // Start practice mode for a skill
  const startPractice = (skillId: string, mode: string) => {
    setPracticeMode(mode)

    if (mode === "challenge") {
      const challenges = getChallengesForSkill(skillId)
      if (challenges.length > 0) {
        startChallenge(challenges[0])
      } else {
        toast({
          title: "No challenges available",
          description: "Try another skill or check back later",
        })
        setPracticeMode(null)
      }
    }
  }

  // Handle skill click
  const handleSkillClick = (skill) => {
    setSelectedSkill(skill)
    setShowSkillDialog(true)
  }

  // Handle achievement click
  const handleAchievementClick = (achievement) => {
    setSelectedAchievement(achievement)
    setShowAchievementDialog(true)
  }

  // Handle learning path click
  const handlePathClick = (path) => {
    setSelectedPath(path)
    setShowPathDialog(true)
  }

  // Handle practice skill
  const handlePracticeSkill = (skill) => {
    setSelectedSkill(skill)
    setShowPracticeDialog(true)
    setSelectedPractice(skill.practiceExercises[0])
    setPracticeStep(0)
  }

  // Handle quiz start
  const handleStartQuiz = (skill) => {
    setSelectedSkill(skill)
    setShowQuizDialog(true)
    setCurrentQuizIndex(0)
    setQuizAnswers([])
    setQuizCompleted(false)
    setQuizScore(0)
  }

  // Handle quiz answer
  const handleQuizAnswer = (answerIndex) => {
    const newAnswers = [...quizAnswers, answerIndex]
    setQuizAnswers(newAnswers)

    if (newAnswers.length === selectedSkill.quizQuestions.length) {
      // Calculate score
      let score = 0
      newAnswers.forEach((answer, index) => {
        if (answer === selectedSkill.quizQuestions[index].answer) {
          score++
        }
      })
      setQuizScore(score)
      setQuizCompleted(true)

      // Award XP based on score
      const totalQuestions = selectedSkill.quizQuestions.length
      const percentageCorrect = (score / totalQuestions) * 100
      let xpGained = 0

      if (percentageCorrect >= 80) {
        xpGained = 50
      } else if (percentageCorrect >= 60) {
        xpGained = 30
      } else if (percentageCorrect >= 40) {
        xpGained = 20
      } else {
        xpGained = 10
      }

      toast({
        title: `Quiz Completed!`,
        description: `You earned ${xpGained} XP for completing the ${selectedSkill.name} quiz.`,
      })
    } else {
      setCurrentQuizIndex(currentQuizIndex + 1)
    }
  }

  // Handle next practice step
  const handleNextPracticeStep = () => {
    if (practiceStep < selectedPractice.steps.length - 1) {
      setPracticeStep(practiceStep + 1)
    } else {
      // Practice completed
      toast({
        title: `Practice Completed!`,
        description: `You earned 30 XP for completing the ${selectedPractice.title} practice exercise.`,
      })
      setShowPracticeDialog(false)
    }
  }

  // Handle enroll in learning path
  const handleEnrollPath = (path) => {
    toast({
      title: `Enrolled in ${path.name}`,
      description: `You've successfully enrolled in the ${path.name} learning path!`,
    })
    setShowPathDialog(false)
  }

  // Handle skill drag start
  const handleSkillDragStart = (e, skill) => {
    setDragSkill(skill)
  }

  // Handle skill drag end
  const handleSkillDragEnd = (e) => {
    if (!skillTreeRef.current || !dragSkill) return

    const rect = skillTreeRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Update skill position
    setSkillPositions({
      ...skillPositions,
      [dragSkill.id]: { x, y },
    })

    setDragSkill(null)
  }

  // Get skill position
  const getSkillPosition = (skill) => {
    if (skillPositions[skill.id]) {
      return skillPositions[skill.id]
    }
    return skill.position
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <ResponsiveNavbar />
        <div className="flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Please log in to view your skills</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => (window.location.href = "/login")} className="w-full">
                Go to Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ResponsiveNavbar />
      <div className="flex-1 pt-16 pb-8">
        <div className="container px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Skills Dashboard</h1>
                <p className="text-muted-foreground">Track, practice, and improve your skills</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button
                  onClick={() => setShowAddSkillForm(true)}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add New Skill
                </Button>
              </div>
            </div>

            {/* Skill Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <Award className="h-8 w-8 text-violet-500 mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Skills</p>
                      <p className="text-2xl font-bold">{user.skills.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <BarChart className="h-8 w-8 text-indigo-500 mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">Average Level</p>
                      <p className="text-2xl font-bold">
                        {user.skills.length > 0
                          ? (user.skills.reduce((sum, skill) => sum + skill.level, 0) / user.skills.length).toFixed(1)
                          : "0"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <Zap className="h-8 w-8 text-amber-500 mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">XP Points</p>
                      <p className="text-2xl font-bold">{user.xp}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-emerald-500 mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">Last Practice</p>
                      <p className="text-2xl font-bold">
                        {user.skills.length > 0
                          ? new Date(
                              Math.max(...user.skills.map((s) => new Date(s.lastPracticed).getTime())),
                            ).toLocaleDateString()
                          : "Never"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle>Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {skillCategories.map((category) => (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          <category.icon className="mr-2 h-4 w-4" />
                          {category.name}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="relative w-full">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search skills..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </CardFooter>
                </Card>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-3">
                {/* Active Challenge */}
                <AnimatePresence>
                  {activeChallenge && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="mb-8"
                    >
                      <Card className="border-2 border-violet-500/50">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Sparkles className="mr-2 h-5 w-5 text-violet-500" />
                            {activeChallenge.title}
                          </CardTitle>
                          <CardDescription>{activeChallenge.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {!showResults ? (
                            <div className="space-y-6">
                              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                                <span>
                                  Question {currentQuestionIndex + 1} of {activeChallenge.questions.length}
                                </span>
                                <span>
                                  {activeChallenge.difficulty} • {activeChallenge.timeEstimate}
                                </span>
                              </div>

                              <Progress
                                value={((currentQuestionIndex + 1) / activeChallenge.questions.length) * 100}
                                className="h-2"
                              />

                              <div className="mt-4">
                                <h3 className="text-lg font-medium mb-4">
                                  {activeChallenge.questions[currentQuestionIndex].question}
                                </h3>

                                <div className="space-y-3">
                                  {activeChallenge.questions[currentQuestionIndex].options.map((option: any) => (
                                    <div
                                      key={option.id}
                                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                        selectedAnswers[activeChallenge.questions[currentQuestionIndex].id] ===
                                        option.id
                                          ? "border-violet-500 bg-violet-50 dark:bg-violet-950"
                                          : "border-gray-200 hover:border-violet-200 dark:border-gray-700"
                                      }`}
                                      onClick={() =>
                                        handleAnswerSelect(
                                          activeChallenge.questions[currentQuestionIndex].id,
                                          option.id,
                                        )
                                      }
                                    >
                                      {option.text}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-6">
                              <div className="text-center py-4">
                                <h3 className="text-2xl font-bold mb-2">Challenge Results</h3>
                                <div className="text-5xl font-bold my-4">{calculateResults().percentage}%</div>
                                <p className="text-muted-foreground">
                                  You got {calculateResults().correct} out of {calculateResults().total} questions
                                  correct
                                </p>
                              </div>

                              <div className="space-y-4 mt-6">
                                {activeChallenge.questions.map((question: any, index: number) => (
                                  <div key={question.id} className="border rounded-lg p-4">
                                    <div className="flex items-start">
                                      {selectedAnswers[question.id] === question.correctAnswer ? (
                                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                      ) : (
                                        <XCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                                      )}
                                      <div>
                                        <p className="font-medium">
                                          Question {index + 1}: {question.question}
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                          Your answer:{" "}
                                          {question.options.find((o: any) => o.id === selectedAnswers[question.id])
                                            ?.text || "Not answered"}
                                        </p>
                                        {selectedAnswers[question.id] !== question.correctAnswer && (
                                          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                                            Correct answer:{" "}
                                            {question.options.find((o: any) => o.id === question.correctAnswer)?.text}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setActiveChallenge(null)
                              setPracticeMode(null)
                            }}
                          >
                            {showResults ? "Close" : "Cancel"}
                          </Button>

                          {!showResults ? (
                            <Button
                              onClick={handleNextQuestion}
                              disabled={!selectedAnswers[activeChallenge.questions[currentQuestionIndex].id]}
                            >
                              {currentQuestionIndex < activeChallenge.questions.length - 1
                                ? "Next Question"
                                : "See Results"}
                            </Button>
                          ) : (
                            <Button onClick={completeChallenge}>Complete Challenge</Button>
                          )}
                        </CardFooter>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Skills List */}
                {!activeChallenge && !showAddSkillForm && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">
                      {selectedCategory === "all"
                        ? "All Skills"
                        : skillCategories.find((c) => c.id === selectedCategory)?.name}
                    </h2>

                    {filteredSkills.length === 0 ? (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <Lightbulb className="h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-xl font-medium mb-2">No skills found</h3>
                          <p className="text-muted-foreground text-center max-w-md mb-6">
                            {searchQuery
                              ? `No skills match your search for "${searchQuery}"`
                              : "You don't have any skills in this category yet"}
                          </p>
                          <Button onClick={() => setShowAddSkillForm(true)}>Add Your First Skill</Button>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="grid grid-cols-1 gap-6">
                        {filteredSkills.map((skill) => (
                          <motion.div
                            key={skill.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Card>
                              <CardHeader>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <CardTitle>{skill.name}</CardTitle>
                                    <CardDescription>{skill.description}</CardDescription>
                                  </div>
                                  <Badge variant="outline" className="ml-2">
                                    {skill.category}
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="mb-6">
                                  <div className="flex justify-between mb-2">
                                    <span className="text-sm">Skill Level</span>
                                    <span className="text-sm font-medium">{skill.level}/10</span>
                                  </div>
                                  <Progress value={skill.level * 10} className="h-2" />
                                </div>

                                <div className="text-sm text-muted-foreground mb-6">
                                  Last practiced: {new Date(skill.lastPracticed).toLocaleDateString()}
                                </div>

                                <Tabs defaultValue="practice">
                                  <TabsList className="grid grid-cols-2">
                                    <TabsTrigger value="practice">Practice</TabsTrigger>
                                    <TabsTrigger value="resources">Resources</TabsTrigger>
                                  </TabsList>

                                  <TabsContent value="practice" className="space-y-4 mt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                      <Button
                                        variant="outline"
                                        className="flex items-center justify-center h-24"
                                        onClick={() => startPractice(skill.id, "challenge")}
                                      >
                                        <div className="text-center">
                                          <Brain className="h-6 w-6 mx-auto mb-2" />
                                          <span>Take a Challenge</span>
                                        </div>
                                      </Button>

                                      <Button
                                        variant="outline"
                                        className="flex items-center justify-center h-24"
                                        onClick={() => {
                                          toast({
                                            title: "Coming Soon",
                                            description: "Interactive exercises will be available soon!",
                                          })
                                        }}
                                      >
                                        <div className="text-center">
                                          <BookOpen className="h-6 w-6 mx-auto mb-2" />
                                          <span>Interactive Exercise</span>
                                        </div>
                                      </Button>
                                    </div>

                                    <div className="mt-4">
                                      <h4 className="font-medium mb-2">Available Challenges</h4>
                                      {getChallengesForSkill(skill.id).length > 0 ? (
                                        <div className="space-y-2">
                                          {getChallengesForSkill(skill.id).map((challenge) => (
                                            <div
                                              key={challenge.id}
                                              className="flex justify-between items-center p-3 border rounded-lg hover:bg-accent cursor-pointer"
                                              onClick={() => startChallenge(challenge)}
                                            >
                                              <div>
                                                <p className="font-medium">{challenge.title}</p>
                                                <p className="text-sm text-muted-foreground">
                                                  {challenge.difficulty} • {challenge.timeEstimate}
                                                </p>
                                              </div>
                                              <Badge variant="secondary">{challenge.xpReward} XP</Badge>
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <p className="text-sm text-muted-foreground">
                                          No challenges available for this skill yet.
                                        </p>
                                      )}
                                    </div>
                                  </TabsContent>

                                  <TabsContent value="resources" className="space-y-4 mt-4">
                                    {getResourcesForSkill(skill.id).length > 0 ? (
                                      <div className="space-y-3">
                                        {getResourcesForSkill(skill.id).map((resource) => (
                                          <div key={resource.id} className="p-3 border rounded-lg">
                                            <div className="flex justify-between items-start">
                                              <div>
                                                <p className="font-medium">{resource.title}</p>
                                                <p className="text-sm text-muted-foreground">
                                                  {resource.provider} • {resource.duration} • {resource.difficulty}
                                                </p>
                                              </div>
                                              <Badge>{resource.type}</Badge>
                                            </div>
                                            <div className="mt-3">
                                              <Button variant="link" className="p-0 h-auto" asChild>
                                                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                                  View Resource
                                                </a>
                                              </Button>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-sm text-muted-foreground">
                                        No learning resources available for this skill yet.
                                      </p>
                                    )}
                                  </TabsContent>
                                </Tabs>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Add Skill Form */}
                <AnimatePresence>
                  {showAddSkillForm && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle>Add New Skill</CardTitle>
                          <CardDescription>Track and improve your abilities</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label htmlFor="skill-name" className="text-sm font-medium">
                                Skill Name
                              </label>
                              <Input
                                id="skill-name"
                                placeholder="e.g., Python, Public Speaking, Photoshop"
                                value={newSkill.name}
                                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                              />
                            </div>

                            <div className="space-y-2">
                              <label htmlFor="skill-category" className="text-sm font-medium">
                                Category
                              </label>
                              <select
                                id="skill-category"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={newSkill.category}
                                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                              >
                                <option value="Programming">Programming</option>
                                <option value="Design">Design</option>
                                <option value="Soft Skills">Soft Skills</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <label htmlFor="skill-level" className="text-sm font-medium">
                                  Current Level
                                </label>
                                <span className="text-sm">{newSkill.level}/10</span>
                              </div>
                              <Slider
                                id="skill-level"
                                min={1}
                                max={10}
                                step={1}
                                value={[newSkill.level]}
                                onValueChange={(value) => setNewSkill({ ...newSkill, level: value[0] })}
                              />
                            </div>

                            <div className="space-y-2">
                              <label htmlFor="skill-description" className="text-sm font-medium">
                                Description (Optional)
                              </label>
                              <textarea
                                id="skill-description"
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Brief description of your skill and experience"
                                value={newSkill.description}
                                onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                              />
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" onClick={() => setShowAddSkillForm(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddSkill}>Add Skill</Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
