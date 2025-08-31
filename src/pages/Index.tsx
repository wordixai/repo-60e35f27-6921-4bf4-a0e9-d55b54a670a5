import { useState } from "react"
import { GameCard } from "@/components/GameCard"
import { VocabularyGame } from "@/components/games/VocabularyGame"
import { GrammarGame } from "@/components/games/GrammarGame"
import { PronunciationGame } from "@/components/games/PronunciationGame"
import { GameButton } from "@/components/ui/game-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, MessageSquare, Mic, Globe, Star, Trophy, Target } from "lucide-react"

type GameType = "vocabulary" | "grammar" | "pronunciation" | null

const Index = () => {
  const [currentGame, setCurrentGame] = useState<GameType>(null)

  const games = [
    {
      title: "Word Match",
      description: "Match words with their correct translations. Perfect for building vocabulary!",
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      difficulty: "Beginner" as const,
      category: "Vocabulary" as const,
      onPlay: () => setCurrentGame("vocabulary")
    },
    {
      title: "Grammar Builder",
      description: "Fill in the blanks and master sentence structure with interactive exercises.",
      icon: <MessageSquare className="w-8 h-8 text-purple-600" />,
      difficulty: "Intermediate" as const,
      category: "Grammar" as const,
      onPlay: () => setCurrentGame("grammar")
    },
    {
      title: "Speak & Learn",
      description: "Practice pronunciation with voice recognition and get instant feedback.",
      icon: <Mic className="w-8 h-8 text-pink-600" />,
      difficulty: "Advanced" as const,
      category: "Pronunciation" as const,
      onPlay: () => setCurrentGame("pronunciation")
    }
  ]

  const stats = [
    { icon: <Globe className="w-6 h-6" />, label: "Languages", value: "5+" },
    { icon: <Star className="w-6 h-6" />, label: "Lessons", value: "100+" },
    { icon: <Trophy className="w-6 h-6" />, label: "Students", value: "10K+" },
    { icon: <Target className="w-6 h-6" />, label: "Success Rate", value: "95%" }
  ]

  if (currentGame === "vocabulary") {
    return <VocabularyGame onBack={() => setCurrentGame(null)} />
  }

  if (currentGame === "grammar") {
    return <GrammarGame onBack={() => setCurrentGame(null)} />
  }

  if (currentGame === "pronunciation") {
    return <PronunciationGame onBack={() => setCurrentGame(null)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in">
                Language Learning Games
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Master new languages through interactive games. Improve your vocabulary, grammar, and pronunciation with fun challenges!
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-6 py-2">
                🎯 Interactive Learning
              </Badge>
              <Badge variant="secondary" className="text-lg px-6 py-2">
                🏆 Progress Tracking
              </Badge>
              <Badge variant="secondary" className="text-lg px-6 py-2">
                🎮 Gamified Experience
              </Badge>
            </div>

            <GameButton variant="primary" size="game" className="text-xl px-12">
              Start Learning Now
            </GameButton>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-2 text-primary">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Games Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Choose Your Learning Adventure
          </h2>
          <p className="text-xl text-muted-foreground">
            Select a game type and start improving your language skills today
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <GameCard
              key={index}
              {...game}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` } as any}
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-muted-foreground">
            Designed with learners in mind
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle>Adaptive Learning</CardTitle>
              <CardDescription>
                Games adjust to your skill level, ensuring optimal challenge and progress
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle>Achievement System</CardTitle>
              <CardDescription>
                Earn badges and track your progress as you master new words and concepts
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-pink-600" />
              </div>
              <CardTitle>Instant Feedback</CardTitle>
              <CardDescription>
                Get real-time corrections and explanations to accelerate your learning
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Language Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of learners improving their language skills every day
          </p>
          <GameButton variant="secondary" size="game" className="text-xl px-12">
            Play Now - It's Free!
          </GameButton>
        </div>
      </div>
    </div>
  )
}

export default Index