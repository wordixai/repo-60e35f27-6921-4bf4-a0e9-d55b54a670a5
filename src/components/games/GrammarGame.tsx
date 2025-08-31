import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GameButton } from "@/components/ui/game-button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface GrammarQuestion {
  sentence: string
  blanks: string[]
  options: string[][]
  correct: string[]
}

const grammarData: GrammarQuestion[] = [
  {
    sentence: "I _____ to the store yesterday.",
    blanks: ["went"],
    options: [["go", "went", "going", "goes"]],
    correct: ["went"]
  },
  {
    sentence: "She _____ been studying English _____ three years.",
    blanks: ["has", "for"],
    options: [["has", "have", "had", "having"], ["for", "since", "during", "while"]],
    correct: ["has", "for"]
  },
  {
    sentence: "The book _____ on the table.",
    blanks: ["is"],
    options: [["is", "are", "was", "were"]],
    correct: ["is"]
  },
  {
    sentence: "They _____ playing soccer when it _____ to rain.",
    blanks: ["were", "started"],
    options: [["was", "were", "are", "is"], ["start", "started", "starting", "starts"]],
    correct: ["were", "started"]
  },
  {
    sentence: "If I _____ rich, I _____ travel the world.",
    blanks: ["were", "would"],
    options: [["am", "was", "were", "be"], ["will", "would", "can", "could"]],
    correct: ["were", "would"]
  }
]

interface GrammarGameProps {
  onBack: () => void
}

export function GrammarGame({ onBack }: GrammarGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)

  const currentQuestion = grammarData[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / grammarData.length) * 100

  const handleAnswerSelect = (blankIndex: number, answer: string) => {
    if (showResult) return
    
    const newAnswers = [...selectedAnswers]
    newAnswers[blankIndex] = answer
    setSelectedAnswers(newAnswers)
  }

  const submitAnswers = () => {
    if (selectedAnswers.length !== currentQuestion.blanks.length) return
    
    setShowResult(true)
    
    const isCorrect = selectedAnswers.every((answer, index) => 
      answer === currentQuestion.correct[index]
    )
    
    if (isCorrect) {
      setScore(score + 1)
    }
    
    setTimeout(() => {
      if (currentQuestionIndex < grammarData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswers([])
        setShowResult(false)
      } else {
        setGameComplete(true)
      }
    }, 3000)
  }

  const resetGame = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setSelectedAnswers([])
    setShowResult(false)
    setGameComplete(false)
  }

  const renderSentenceWithBlanks = () => {
    const parts = currentQuestion.sentence.split("_____")
    const result = []
    
    for (let i = 0; i < parts.length; i++) {
      result.push(<span key={`text-${i}`}>{parts[i]}</span>)
      
      if (i < parts.length - 1) {
        const isCorrect = showResult && selectedAnswers[i] === currentQuestion.correct[i]
        const isIncorrect = showResult && selectedAnswers[i] !== currentQuestion.correct[i]
        
        result.push(
          <span
            key={`blank-${i}`}
            className={cn(
              "inline-block min-w-[100px] px-3 py-1 mx-1 border-2 border-dashed border-primary rounded text-center font-semibold",
              isCorrect && "bg-green-100 border-green-500 text-green-800",
              isIncorrect && "bg-red-100 border-red-500 text-red-800",
              !selectedAnswers[i] && "bg-gray-100"
            )}
          >
            {selectedAnswers[i] || "___"}
          </span>
        )
      }
    }
    
    return result
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="max-w-2xl mx-auto pt-20">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">
                Grammar Master! 📝
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl font-bold text-primary">
                {score}/{grammarData.length}
              </div>
              <p className="text-xl text-muted-foreground">
                {score === grammarData.length ? "Perfect grammar!" : 
                 score >= grammarData.length * 0.8 ? "Excellent work!" :
                 score >= grammarData.length * 0.6 ? "Good progress!" : "Keep studying!"}
              </p>
              <div className="flex gap-4 justify-center">
                <GameButton variant="primary" onClick={resetGame}>
                  Try Again
                </GameButton>
                <GameButton variant="outline" onClick={onBack}>
                  Back to Games
                </GameButton>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="flex items-center justify-between mb-8">
          <GameButton variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </GameButton>
          <Badge variant="outline" className="text-lg px-4 py-2">
            Score: {score}/{grammarData.length}
          </Badge>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestionIndex + 1} of {grammarData.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <Card className="border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">Grammar Challenge</CardTitle>
              <p className="text-muted-foreground">Fill in the blanks with the correct words</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-2xl leading-relaxed p-6 bg-gray-50 rounded-lg">
                  {renderSentenceWithBlanks()}
                </div>
              </div>

              <div className="space-y-4">
                {currentQuestion.options.map((optionGroup, blankIndex) => (
                  <div key={blankIndex} className="space-y-2">
                    <p className="font-medium text-sm text-muted-foreground">
                      Blank {blankIndex + 1}:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {optionGroup.map((option, optionIndex) => {
                        const isSelected = selectedAnswers[blankIndex] === option
                        const isCorrect = showResult && option === currentQuestion.correct[blankIndex]
                        const isIncorrect = showResult && isSelected && option !== currentQuestion.correct[blankIndex]

                        return (
                          <GameButton
                            key={optionIndex}
                            variant={isCorrect ? "success" : isIncorrect ? "error" : isSelected ? "primary" : "outline"}
                            className={cn(
                              "transition-all duration-300",
                              showResult && "pointer-events-none"
                            )}
                            onClick={() => handleAnswerSelect(blankIndex, option)}
                          >
                            <span className="flex items-center gap-2">
                              {isCorrect && <CheckCircle className="w-4 h-4" />}
                              {isIncorrect && <XCircle className="w-4 h-4" />}
                              {option}
                            </span>
                          </GameButton>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {selectedAnswers.length === currentQuestion.blanks.length && !showResult && (
                <div className="text-center">
                  <GameButton variant="primary" size="lg" onClick={submitAnswers}>
                    Submit Answer
                  </GameButton>
                </div>
              )}

              {showResult && (
                <div className="text-center animate-slide-up">
                  <p className={cn(
                    "text-lg font-semibold",
                    selectedAnswers.every((answer, index) => answer === currentQuestion.correct[index]) ? 
                      "text-game-success" : "text-game-error"
                  )}>
                    {selectedAnswers.every((answer, index) => answer === currentQuestion.correct[index]) ? 
                      "Correct! Excellent grammar!" : 
                      `Incorrect. The correct answers are: ${currentQuestion.correct.join(", ")}`
                    }
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}