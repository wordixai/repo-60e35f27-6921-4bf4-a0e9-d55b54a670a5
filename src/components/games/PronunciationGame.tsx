import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GameButton } from "@/components/ui/game-button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Volume2, ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface PronunciationWord {
  word: string
  phonetic: string
  audioText: string
  difficulty: "Easy" | "Medium" | "Hard"
}

const pronunciationData: PronunciationWord[] = [
  { word: "Hello", phonetic: "/həˈloʊ/", audioText: "Hello", difficulty: "Easy" },
  { word: "Beautiful", phonetic: "/ˈbjuːtɪfəl/", audioText: "Beautiful", difficulty: "Medium" },
  { word: "Pronunciation", phonetic: "/prəˌnʌnsiˈeɪʃən/", audioText: "Pronunciation", difficulty: "Hard" },
  { word: "Water", phonetic: "/ˈwɔːtər/", audioText: "Water", difficulty: "Easy" },
  { word: "Comfortable", phonetic: "/ˈkʌmftərbəl/", audioText: "Comfortable", difficulty: "Hard" }
]

interface PronunciationGameProps {
  onBack: () => void
}

export function PronunciationGame({ onBack }: PronunciationGameProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [hasRecorded, setHasRecorded] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null)
  const [gameComplete, setGameComplete] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  const currentWord = pronunciationData[currentWordIndex]
  const progress = ((currentWordIndex + 1) / pronunciationData.length) * 100

  const playAudio = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord.audioText)
      utterance.rate = 0.8
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      
      mediaRecorder.start()
      setIsRecording(true)
      
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop()
          stream.getTracks().forEach(track => track.stop())
          setIsRecording(false)
          setHasRecorded(true)
        }
      }, 3000)
      
    } catch (error) {
      console.error('Error accessing microphone:', error)
      // Simulate recording for demo purposes
      setIsRecording(true)
      setTimeout(() => {
        setIsRecording(false)
        setHasRecorded(true)
      }, 3000)
    }
  }

  const submitPronunciation = () => {
    // Simulate pronunciation scoring (in a real app, this would use speech recognition)
    const simulatedScore = Math.floor(Math.random() * 40) + 60 // 60-100%
    setPronunciationScore(simulatedScore)
    setShowResult(true)
    
    if (simulatedScore >= 80) {
      setScore(score + 1)
    }
    
    setTimeout(() => {
      if (currentWordIndex < pronunciationData.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1)
        setHasRecorded(false)
        setShowResult(false)
        setPronunciationScore(null)
      } else {
        setGameComplete(true)
      }
    }, 3000)
  }

  const resetGame = () => {
    setCurrentWordIndex(0)
    setScore(0)
    setIsRecording(false)
    setHasRecorded(false)
    setShowResult(false)
    setPronunciationScore(null)
    setGameComplete(false)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800"
      case "Medium": return "bg-yellow-100 text-yellow-800"
      case "Hard": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4">
        <div className="max-w-2xl mx-auto pt-20">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">
                Pronunciation Complete! 🎤
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl font-bold text-primary">
                {score}/{pronunciationData.length}
              </div>
              <p className="text-xl text-muted-foreground">
                {score === pronunciationData.length ? "Perfect pronunciation!" : 
                 score >= pronunciationData.length * 0.8 ? "Great speaking!" :
                 score >= pronunciationData.length * 0.6 ? "Good effort!" : "Keep practicing!"}
              </p>
              <div className="flex gap-4 justify-center">
                <GameButton variant="primary" onClick={resetGame}>
                  Practice Again
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="flex items-center justify-between mb-8">
          <GameButton variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </GameButton>
          <Badge variant="outline" className="text-lg px-4 py-2">
            Score: {score}/{pronunciationData.length}
          </Badge>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Word {currentWordIndex + 1} of {pronunciationData.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <Card className="border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">Pronunciation Challenge</CardTitle>
              <p className="text-muted-foreground">Listen and repeat the word</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <h3 className="text-5xl font-bold text-primary">
                    {currentWord.word}
                  </h3>
                  <Badge className={getDifficultyColor(currentWord.difficulty)}>
                    {currentWord.difficulty}
                  </Badge>
                </div>
                
                <p className="text-xl text-muted-foreground font-mono">
                  {currentWord.phonetic}
                </p>

                <GameButton
                  variant="secondary"
                  size="lg"
                  onClick={playAudio}
                  className="flex items-center gap-2"
                >
                  <Volume2 className="w-5 h-5" />
                  Listen to Pronunciation
                </GameButton>
              </div>

              <div className="text-center space-y-4">
                <p className="text-lg font-medium">Now record yourself saying the word:</p>
                
                <div className="flex justify-center">
                  <GameButton
                    variant={isRecording ? "error" : "primary"}
                    size="game"
                    onClick={startRecording}
                    disabled={isRecording || hasRecorded}
                    className={cn(
                      "w-32 h-32 rounded-full flex flex-col items-center justify-center gap-2",
                      isRecording && "animate-pulse-soft"
                    )}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="w-8 h-8" />
                        <span className="text-sm">Recording...</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-8 h-8" />
                        <span className="text-sm">
                          {hasRecorded ? "Recorded!" : "Record"}
                        </span>
                      </>
                    )}
                  </GameButton>
                </div>

                {isRecording && (
                  <p className="text-sm text-muted-foreground animate-pulse">
                    Recording for 3 seconds...
                  </p>
                )}

                {hasRecorded && !showResult && (
                  <GameButton variant="success" size="lg" onClick={submitPronunciation}>
                    Submit Pronunciation
                  </GameButton>
                )}
              </div>

              {showResult && pronunciationScore !== null && (
                <div className="text-center animate-slide-up space-y-4">
                  <div className={cn(
                    "text-6xl font-bold",
                    pronunciationScore >= 80 ? "text-game-success" : "text-game-warning"
                  )}>
                    {pronunciationScore}%
                  </div>
                  
                  <div className="flex items-center justify-center gap-2">
                    {pronunciationScore >= 80 ? (
                      <CheckCircle className="w-6 h-6 text-game-success" />
                    ) : (
                      <XCircle className="w-6 h-6 text-game-warning" />
                    )}
                    <p className={cn(
                      "text-lg font-semibold",
                      pronunciationScore >= 80 ? "text-game-success" : "text-game-warning"
                    )}>
                      {pronunciationScore >= 90 ? "Excellent pronunciation!" :
                       pronunciationScore >= 80 ? "Good pronunciation!" :
                       pronunciationScore >= 70 ? "Not bad, keep practicing!" :
                       "Try again - focus on the sounds!"}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}