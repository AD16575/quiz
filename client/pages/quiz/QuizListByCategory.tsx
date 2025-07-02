import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Play, Clock, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuizLayout } from "@/components/quiz/QuizLayout";

const mockQuizzes = [
  {
    id: "1",
    title: "World Capitals Challenge",
    difficulty: "Easy" as const,
    questions: 10,
    timeLimit: 10,
    pointsReward: 50,
    rating: 4.5,
    completedBy: 1250,
  },
  {
    id: "2",
    title: "Science Fundamentals",
    difficulty: "Medium" as const,
    questions: 15,
    timeLimit: 15,
    pointsReward: 75,
    rating: 4.3,
    completedBy: 890,
  },
  {
    id: "3",
    title: "Advanced Physics",
    difficulty: "Hard" as const,
    questions: 20,
    timeLimit: 25,
    pointsReward: 150,
    rating: 4.7,
    completedBy: 445,
  },
  {
    id: "4",
    title: "History Timeline",
    difficulty: "Medium" as const,
    questions: 12,
    timeLimit: 12,
    pointsReward: 60,
    rating: 4.2,
    completedBy: 1050,
  },
];

export default function QuizListByCategory() {
  const { categoryId } = useParams();

  const categoryNames: Record<string, string> = {
    general: "General Knowledge",
    "current-affairs": "Current Affairs",
    technology: "Technology",
    geography: "Geography",
    health: "Health & Fitness",
    entertainment: "Entertainment",
  };

  const difficultyColors = {
    Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Medium:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <QuizLayout
      showHeader
      headerContent={
        <div className="flex items-center gap-4">
          <Link to="/quiz/categories">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h2 className="text-lg font-semibold">
              {categoryId ? categoryNames[categoryId] : "Quizzes"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {mockQuizzes.length} quizzes available
            </p>
          </div>
        </div>
      }
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {mockQuizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {quiz.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={difficultyColors[quiz.difficulty]}>
                          {quiz.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="w-4 h-4 fill-squid-yellow text-squid-yellow" />
                          <span>{quiz.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-squid-pink">
                        +{quiz.pointsReward}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        points
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold">
                        {quiz.questions}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Questions
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold flex items-center justify-center gap-1">
                        <Clock className="w-4 h-4" />
                        {quiz.timeLimit}m
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Time Limit
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold flex items-center justify-center gap-1">
                        <Trophy className="w-4 h-4" />
                        {quiz.completedBy}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Completed
                      </div>
                    </div>
                    <div className="text-center">
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-squid-teal to-squid-teal/80 hover:from-squid-teal/90 hover:to-squid-teal/70 text-white"
                      >
                        <Link to={`/quiz/play/${quiz.id}`}>
                          <Play className="w-4 h-4 mr-2" />
                          Play
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Test your knowledge in this {quiz.difficulty.toLowerCase()}{" "}
                    level quiz with {quiz.questions} carefully crafted
                    questions.
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-muted-foreground mb-4">
            Looking for more quizzes?
          </p>
          <Button
            asChild
            variant="outline"
            className="border-squid-pink text-squid-pink hover:bg-squid-pink hover:text-white"
          >
            <Link to="/quiz/categories">Browse All Categories</Link>
          </Button>
        </motion.div>
      </div>
    </QuizLayout>
  );
}
