import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GameButton } from "@/components/ui/game-button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface Word {
  word: string
  translation: string
  options: string[]
}

const vocabularyData: Word[] = [
  { word: "Hello", translation: "Hola", options: ["Hola", "Adiós", "Gracias", "Por favor"] },
  { word: "Goodbye", translation: "Adiós", options: ["Hola", "Adiós", "Gracias", "Buenas noches"] },
  { word: "Thank you", translation: "Gracias", options: ["De nada", "Gracias", "Disculpe", "Lo siento"] },
  { word: "Please", translation: "Por favor", options: ["Por favor", "Perdón", "Excuse me", "De nada"] },
  { word: "Water", translation: "Agua", options: ["Leche", "Agua", "Café", "Té"] }
]

interface VocabularyGameProps {
  onBack: () => void
}

export function VocabularyGame({ onBack }: VocabularyGameProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)

  const currentWord = vocabularyData[currentWordIndex]
  const progress = ((currentWordIndex + 1) / vocabularyData.length) * 100

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return
    
    setSelectedAnswer(answer)
    setShowResult(true)
    
    if (answer === currentWord.translation) {
      setScore(score + 1)
    }
    
    setTimeout(() => {
      if (currentWordIndex < vocabularyData.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setGameComplete(true)
      }
    }, 2000)
  }

  const resetGame = () => {
    setCurrentWordIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameComplete(false)
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-2xl mx-auto pt-20">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">
                Game Complete! 🎉
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl font-bold text-primary">
                {score}/{vocabularyData.length}
              </div>
              <p className="text-xl text-muted-foreground">
                {score === vocabularyData.length ? "Perfect score!" : 
                 score >= vocabularyData.length * 0.8 ? "Great job!" :
                 score >= vocabularyData.length * 0.6 ? "Good effort!" : "Keep practicing!"}
              </p>
              <div className="flex gap-4 justify-center">
                <GameButton variant="primary" onClick={resetGame}>
                  Play Again
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="flex items-center justify-between mb-8">
          <GameButton variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </GameButton>
          <Badge variant="outline" className="text-lg px-4 py-2">
            Score: {score}/{vocabularyData.length}
          </Badge>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {currentWordIndex + 1} of {vocabularyData.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <Card className="border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">Vocabulary Challenge</CardTitle>
              <p className="text-muted-foreground">Choose the correct translation</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">
                  {currentWord.word}
                </h3>
                <p className="text-muted-foreground">What does this mean in Spanish?</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentWord.options.map((option, index) => {
                  const isCorrect = option === currentWord.translation
                  const isSelected = selectedAnswer === option
                  const showCorrect = showResult && isCorrect
                  const showIncorrect = showResult && isSelected && !isCorrect

                  return (
                    <GameButton
                      key={index}
                      variant={showCorrect ? "success" : showIncorrect ? "error" : "outline"}
                      size="lg"
                      className={cn(
                        "h-16 text-lg transition-all duration-300",
                        showResult && "pointer-events-none",
                        showCorrect && "animate-bounce-gentle",
                        showIncorrect && "animate-pulse"
                      )}
                      onClick={() => handleAnswerSelect(option)}
                    >
                      <span className="flex items-center gap-2">
                        {showCorrect && <CheckCircle className="w-5 h-5" />}
                        {showIncorrect && <XCircle className="w-5 h-5" />}
                        {option}
                      </span>
                    </GameButton>
                  )
                })}
              </div>

              {showResult && (
                <div className="text-center animate-slide-up">
                  <p className={cn(
                    "text-lg font-semibold",
                    selectedAnswer === currentWord.translation ? "text-game-success" : "text-game-error"
                  )}>
                    {selectedAnswer === currentWord.translation ? 
                      "Correct! Well done!" : 
                      `Incorrect. The correct answer is "${currentWord.translation}"`
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