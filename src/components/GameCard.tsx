import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GameButton } from "@/components/ui/game-button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface GameCardProps {
  title: string
  description: string
  icon: React.ReactNode
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  category: "Vocabulary" | "Grammar" | "Pronunciation"
  onPlay: () => void
  className?: string
}

const difficultyColors = {
  Beginner: "bg-green-100 text-green-800",
  Intermediate: "bg-yellow-100 text-yellow-800", 
  Advanced: "bg-red-100 text-red-800"
}

const categoryColors = {
  Vocabulary: "bg-blue-100 text-blue-800",
  Grammar: "bg-purple-100 text-purple-800",
  Pronunciation: "bg-pink-100 text-pink-800"
}

export function GameCard({ title, description, icon, difficulty, category, onPlay, className }: GameCardProps) {
  return (
    <Card className={cn(
      "group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-2 border-2 hover:border-primary/50 bg-gradient-to-br from-white to-gray-50",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 group-hover:from-primary/20 group-hover:to-primary/30 transition-all">
            {icon}
          </div>
          <div className="flex flex-col gap-1">
            <Badge className={categoryColors[category]}>
              {category}
            </Badge>
            <Badge variant="outline" className={difficultyColors[difficulty]}>
              {difficulty}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GameButton 
          variant="game" 
          size="game" 
          className="w-full"
          onClick={onPlay}
        >
          Start Playing
        </GameButton>
      </CardContent>
    </Card>
  )
}