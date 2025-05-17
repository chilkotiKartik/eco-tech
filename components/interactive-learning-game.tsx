"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/toast"
import { Sparkles, Trophy, Check, X, ArrowRight, Lightbulb, Brain } from "lucide-react"
import confetti from "canvas-confetti"

// Game types
const gameTypes = {
  quiz: {
    name: "Knowledge Quiz",
    description: "Test your knowledge with multiple-choice questions",
    icon: <Brain className="h-5 w-5" />,
  },
  memory: {
    name: "Memory Match",
    description: "Match pairs of cards to test your memory",
    icon: <Lightbulb className="h-5 w-5" />,
  },
  coding: {
    name: "Code Challenge",
    description: "Solve coding challenges to test your skills",
    icon: <Sparkles className="h-5 w-5" />,
  },
}

// Sample quiz questions
const quizQuestions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Language",
      "Hyperlink Text Management Language",
    ],
    correctAnswer: 0,
    explanation:
      "HTML stands for Hyper Text Markup Language. It is the standard markup language for creating web pages and web applications.",
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["String", "Boolean", "Float", "Symbol"],
    correctAnswer: 2,
    explanation:
      "Float is not a JavaScript data type. JavaScript has Number (which includes integers and floating-point numbers), String, Boolean, Object, Null, Undefined, and Symbol data types.",
  },
  {
    question: "Which CSS property is used to change the text color of an element?",
    options: ["color", "text-color", "font-color", "text-style"],
    correctAnswer: 0,
    explanation: "The 'color' property is used to set the color of text in CSS.",
  },
  {
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Automated Program Integration",
      "Application Process Integration",
      "Advanced Programming Interface",
    ],
    correctAnswer: 0,
    explanation:
      "API stands for Application Programming Interface. It defines interactions between multiple software applications or mixed hardware-software intermediaries.",
  },
  {
    question: "Which of the following is a JavaScript framework?",
    options: ["Django", "Flask", "Ruby on Rails", "React"],
    correctAnswer: 3,
    explanation:
      "React is a JavaScript library/framework for building user interfaces. Django, Flask, and Ruby on Rails are backend frameworks for Python and Ruby.",
  },
]

// Memory match cards
const memoryCards = [
  { id: 1, content: "HTML", pair: 2 },
  { id: 2, content: "Markup Language", pair: 1 },
  { id: 3, content: "CSS", pair: 4 },
  { id: 4, content: "Styling", pair: 3 },
  { id: 5, content: "JavaScript", pair: 6 },
  { id: 6, content: "Interactivity", pair: 5 },
  { id: 7, content: "React", pair: 8 },
  { id: 8, content: "UI Library", pair: 7 },
  { id: 9, content: "Node.js", pair: 10 },
  { id: 10, content: "Server Runtime", pair: 9 },
  { id: 11, content: "API", pair: 12 },
  { id: 12, content: "Interface", pair: 11 },
]

// Coding challenges
const codingChallenges = [
  {
    id: 1,
    title: "Reverse a String",
    description: "Write a function that reverses a string.",
    difficulty: "Easy",
    starterCode: "function reverseString(str) {\n  // Your code here\n}",
    testCases: [
      { input: "hello", expected: "olleh" },
      { input: "world", expected: "dlrow" },
      { input: "javascript", expected: "tpircsavaj" },
    ],
    solution: "function reverseString(str) {\n  return str.split('').reverse().join('');\n}",
    hint: "Try using string methods like split(), reverse(), and join().",
  },
  {
    id: 2,
    title: "Find the Largest Number",
    description: "Write a function that finds the largest number in an array.",
    difficulty: "Easy",
    starterCode: "function findLargest(arr) {\n  // Your code here\n}",
    testCases: [
      { input: "[1, 2, 3, 4, 5]", expected: 5 },
      { input: "[10, 20, 5, 30, 15]", expected: 30 },
      { input: "[-1, -5, -3, -2]", expected: -1 },
    ],
    solution: "function findLargest(arr) {\n  return Math.max(...arr);\n}",
    hint: "Consider using Math.max() with the spread operator.",
  },
]

export function InteractiveLearningGame({ gameType = "quiz", onComplete }) {
  const [gameState, setGameState] = useState("intro") // intro, playing, completed
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [memoryState, setMemoryState] = useState({
    cards: [],
    flipped: [],
    matched: [],
    moves: 0,
  })
  const [codingState, setCodingState] = useState({
    challenge: codingChallenges[0],
    code: codingChallenges[0].starterCode,
    results: null,
    showHint: false,
    showSolution: false,
  })
  const confettiRef = useRef(null)
  const { toast } = useToast()

  // Initialize memory game
  useEffect(() => {
    if (gameType === "memory") {
      // Shuffle cards
      const shuffledCards = [...memoryCards].sort(() => Math.random() - 0.5)
      setMemoryState({
        ...memoryState,
        cards: shuffledCards,
      })
    }
  }, [gameType])

  // Handle quiz answer selection
  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)

    // Check if answer is correct
    const isCorrect = answerIndex === quizQuestions[currentQuestion].correctAnswer

    if (isCorrect) {
      setScore(score + 1)
      // Trigger confetti for correct answer
      if (confettiRef.current) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      }
    }

    // Show explanation
    setShowExplanation(true)
  }

  // Handle next question
  const handleNextQuestion = () => {
    setSelectedAnswer(null)
    setShowExplanation(false)

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Game completed
      setGameState("completed")

      // Trigger confetti for game completion
      if (confettiRef.current) {
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
        })
      }

      // Call onComplete callback
      if (onComplete) {
        onComplete({
          type: gameType,
          score,
          totalQuestions: quizQuestions.length,
        })
      }
    }
  }

  // Handle memory card flip
  const handleCardFlip = (cardId) => {
    // If already matched or already flipped, do nothing
    if (memoryState.matched.includes(cardId) || memoryState.flipped.includes(cardId)) {
      return
    }

    // If already have 2 cards flipped, do nothing
    if (memoryState.flipped.length === 2) {
      return
    }

    // Add card to flipped
    const newFlipped = [...memoryState.flipped, cardId]

    // Update state
    setMemoryState({
      ...memoryState,
      flipped: newFlipped,
      moves: memoryState.moves + 1,
    })

    // If we have 2 cards flipped, check for match
    if (newFlipped.length === 2) {
      const [firstId, secondId] = newFlipped
      const firstCard = memoryState.cards.find((card) => card.id === firstId)
      const secondCard = memoryState.cards.find((card) => card.id === secondId)

      // Check if cards match
      if (firstCard.pair === secondId) {
        // Match found
        const newMatched = [...memoryState.matched, firstId, secondId]

        // Small delay to show the match
        setTimeout(() => {
          setMemoryState({
            ...memoryState,
            flipped: [],
            matched: newMatched,
            moves: memoryState.moves + 1,
          })

          // Check if all cards are matched
          if (newMatched.length === memoryCards.length) {
            // Game completed
            setGameState("completed")

            // Trigger confetti for game completion
            if (confettiRef.current) {
              confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 },
              })
            }

            // Call onComplete callback
            if (onComplete) {
              onComplete({
                type: gameType,
                moves: memoryState.moves + 1,
                totalCards: memoryCards.length,
              })
            }
          }
        }, 500)
      } else {
        // No match, flip cards back after delay
        setTimeout(() => {
          setMemoryState({
            ...memoryState,
            flipped: [],
            moves: memoryState.moves + 1,
          })
        }, 1000)
      }
    }
  }

  // Handle coding challenge submission
  const handleCodeSubmit = () => {
    try {
      // Create a function from the code
      const userFunction = new Function(`return ${codingState.code}`)()

      // Test the function against test cases
      const results = codingState.challenge.testCases.map((testCase) => {
        try {
          const input = JSON.parse(testCase.input)
          const output = userFunction(input)
          const passed = JSON.stringify(output) === JSON.stringify(testCase.expected)

          return {
            input: testCase.input,
            expected: testCase.expected,
            output,
            passed,
          }
        } catch (error) {
          return {
            input: testCase.input,
            expected: testCase.expected,
            error: error.message,
            passed: false,
          }
        }
      })

      // Update state with results
      setCodingState({
        ...codingState,
        results,
      })

      // Check if all tests passed
      const allPassed = results.every((result) => result.passed)

      if (allPassed) {
        // Trigger confetti for success
        if (confettiRef.current) {
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
          })
        }

        toast({
          title: "Success!",
          description: "All test cases passed. Great job!",
        })

        // Move to next challenge or complete
        if (codingState.challenge.id < codingChallenges.length) {
          setTimeout(() => {
            const nextChallenge = codingChallenges[codingState.challenge.id]
            setCodingState({
              challenge: nextChallenge,
              code: nextChallenge.starterCode,
              results: null,
              showHint: false,
              showSolution: false,
            })
          }, 2000)
        } else {
          // Game completed
          setGameState("completed")

          // Call onComplete callback
          if (onComplete) {
            onComplete({
              type: gameType,
              challengesCompleted: codingState.challenge.id,
              totalChallenges: codingChallenges.length,
            })
          }
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `There was an error in your code: ${error.message}`,
        variant: "destructive",
      })
    }
  }

  // Render game content based on type and state
  const renderGameContent = () => {
    if (gameState === "intro") {
      return (
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-primary/10 animate-pulse-slow">{gameTypes[gameType].icon}</div>
          </div>
          <div>
            <h2 className="text-xl font-bold">{gameTypes[gameType].name}</h2>
            <p className="text-muted-foreground">{gameTypes[gameType].description}</p>
          </div>
          <Button onClick={() => setGameState("playing")} className="btn-shiny">
            Start Game
          </Button>
        </div>
      )
    }

    if (gameState === "completed") {
      return (
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-primary/10 animate-pulse-slow">
              <Trophy className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">Game Completed!</h2>
            {gameType === "quiz" && (
              <p className="text-muted-foreground">
                You scored {score} out of {quizQuestions.length} questions!
              </p>
            )}
            {gameType === "memory" && (
              <p className="text-muted-foreground">You completed the memory game in {memoryState.moves} moves!</p>
            )}
            {gameType === "coding" && (
              <p className="text-muted-foreground">You completed {codingState.challenge.id} coding challenges!</p>
            )}
          </div>
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Play Again
            </Button>
            <Button onClick={() => onComplete && onComplete()}>Continue Learning</Button>
          </div>
        </div>
      )
    }

    // Quiz game
    if (gameType === "quiz") {
      const question = quizQuestions[currentQuestion]
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Badge variant="outline">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </Badge>
            <Badge variant="secondary">Score: {score}</Badge>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">{question.question}</h3>
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedAnswer === index
                      ? index === question.correctAnswer
                        ? "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500"
                        : "bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-500"
                      : "hover:border-primary/50"
                  } ${selectedAnswer !== null ? "cursor-default" : "cursor-pointer"}`}
                  onClick={() => selectedAnswer === null && handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {selectedAnswer === index && (
                      <span>
                        {index === question.correctAnswer ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-red-500" />
                        )}
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg bg-primary/5 border border-primary/20"
            >
              <h4 className="font-medium flex items-center mb-2">
                <Lightbulb className="h-4 w-4 mr-2 text-primary" />
                Explanation
              </h4>
              <p className="text-sm">{question.explanation}</p>
            </motion.div>
          )}

          {selectedAnswer !== null && (
            <div className="flex justify-end">
              <Button onClick={handleNextQuestion}>
                {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Complete Quiz"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )
    }

    // Memory game
    if (gameType === "memory") {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Badge variant="outline">Moves: {memoryState.moves}</Badge>
            <Badge variant="secondary">
              Matches: {memoryState.matched.length / 2} of {memoryCards.length / 2}
            </Badge>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {memoryState.cards.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`aspect-square flex items-center justify-center rounded-lg border-2 text-center p-2 cursor-pointer transition-all ${
                  memoryState.flipped.includes(card.id) || memoryState.matched.includes(card.id)
                    ? "bg-primary/10 border-primary/50"
                    : "bg-muted border-muted-foreground/20 hover:border-primary/30"
                } ${memoryState.matched.includes(card.id) ? "opacity-50" : ""}`}
                onClick={() => handleCardFlip(card.id)}
              >
                {memoryState.flipped.includes(card.id) || memoryState.matched.includes(card.id) ? (
                  <span className="font-medium text-sm">{card.content}</span>
                ) : (
                  <span className="text-2xl">?</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )
    }

    // Coding challenge
    if (gameType === "coding") {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Badge variant="outline">Challenge: {codingState.challenge.id}</Badge>
            <Badge variant={codingState.challenge.difficulty === "Easy" ? "secondary" : "destructive"}>
              {codingState.challenge.difficulty}
            </Badge>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">{codingState.challenge.title}</h3>
            <p className="text-sm text-muted-foreground">{codingState.challenge.description}</p>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-2 border-b text-xs font-mono">Code Editor</div>
              <textarea
                className="w-full h-40 p-3 font-mono text-sm bg-muted/50 focus:outline-none"
                value={codingState.code}
                onChange={(e) => setCodingState({ ...codingState, code: e.target.value })}
              />
            </div>

            {codingState.showHint && (
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                <h4 className="font-medium flex items-center mb-1">
                  <Lightbulb className="h-4 w-4 mr-2 text-primary" />
                  Hint
                </h4>
                <p className="text-sm">{codingState.challenge.hint}</p>
              </div>
            )}

            {codingState.results && (
              <div className="space-y-3">
                <h4 className="font-medium">Test Results</h4>
                {codingState.results.map((result, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      result.passed
                        ? "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500"
                        : "bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-500"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">Test Case {index + 1}</span>
                      {result.passed ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="text-xs space-y-1">
                      <p>
                        <span className="font-medium">Input:</span> {result.input}
                      </p>
                      <p>
                        <span className="font-medium">Expected:</span> {JSON.stringify(result.expected)}
                      </p>
                      {result.error ? (
                        <p>
                          <span className="font-medium">Error:</span> {result.error}
                        </p>
                      ) : (
                        <p>
                          <span className="font-medium">Output:</span> {JSON.stringify(result.output)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {codingState.showSolution && (
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                <h4 className="font-medium flex items-center mb-1">
                  <Sparkles className="h-4 w-4 mr-2 text-primary" />
                  Solution
                </h4>
                <pre className="text-xs font-mono whitespace-pre-wrap">{codingState.challenge.solution}</pre>
              </div>
            )}

            <div className="flex justify-between">
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCodingState({ ...codingState, showHint: !codingState.showHint })}
                >
                  {codingState.showHint ? "Hide Hint" : "Show Hint"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCodingState({ ...codingState, showSolution: !codingState.showSolution })}
                >
                  {codingState.showSolution ? "Hide Solution" : "Show Solution"}
                </Button>
              </div>
              <Button onClick={handleCodeSubmit}>Run Tests</Button>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div ref={confettiRef}>
      <Card className="border-2 border-primary/20 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            {gameTypes[gameType].icon}
            <span className="ml-2">{gameTypes[gameType].name}</span>
          </CardTitle>
          <CardDescription>{gameTypes[gameType].description}</CardDescription>
        </CardHeader>
        <CardContent>{renderGameContent()}</CardContent>
      </Card>
    </div>
  )
}
