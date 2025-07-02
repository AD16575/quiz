import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Brain,
  BookOpen,
  Smartphone,
  Globe,
  Heart,
  Music,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QuizLayout } from "@/components/quiz/QuizLayout";
import { useQuiz } from "@/lib/quiz-context";

const categories = [
  {
    id: "general",
    name: "General Knowledge",
    icon: Brain,
    color: "from-purple-500 to-purple-600",
    description: "Test your general knowledge",
    quizCount: 25,
  },
  {
    id: "current-affairs",
    name: "Current Affairs",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600",
    description: "Stay updated with latest news",
    quizCount: 18,
  },
  {
    id: "technology",
    name: "Technology",
    icon: Smartphone,
    color: "from-green-500 to-green-600",
    description: "Tech trends and innovations",
    quizCount: 22,
  },
  {
    id: "geography",
    name: "Geography",
    icon: Globe,
    color: "from-orange-500 to-orange-600",
    description: "Explore the world",
    quizCount: 16,
  },
  {
    id: "health",
    name: "Health & Fitness",
    icon: Heart,
    color: "from-red-500 to-red-600",
    description: "Health and wellness topics",
    quizCount: 14,
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: Music,
    color: "from-pink-500 to-pink-600",
    description: "Movies, music, and pop culture",
    quizCount: 20,
  },
];

export default function QuizCategories() {
  const { state } = useQuiz();
  const user = state.user;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <QuizLayout
      showHeader
      headerContent={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/quiz/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h2 className="text-lg font-semibold">Quiz Categories</h2>
              <p className="text-sm text-muted-foreground">
                Choose your favorite topic
              </p>
            </div>
          </div>
          {user && (
            <div className="text-right">
              <p className="text-sm font-medium">{user.points} points</p>
            </div>
          )}
        </div>
      }
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <motion.div key={category.id} variants={itemVariants}>
                <Link to={`/quiz/category/${category.id}`}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                    <CardContent className="p-6">
                      <motion.div
                        className="text-center space-y-4"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div
                          className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>

                        <div>
                          <h3 className="text-xl font-bold mb-2">
                            {category.name}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            {category.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-left">
                            <p className="text-2xl font-bold text-squid-pink">
                              {category.quizCount}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Quizzes
                            </p>
                          </div>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-squid-teal to-squid-teal/80 hover:from-squid-teal/90 hover:to-squid-teal/70 text-white"
                          >
                            Play Now
                          </Button>
                        </div>

                        <div className="flex justify-center">
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <div
                                key={star}
                                className={`w-3 h-3 rounded-full ${
                                  star <= 4
                                    ? "bg-squid-yellow"
                                    : "bg-gray-200 dark:bg-gray-700"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="max-w-md mx-auto bg-gradient-to-br from-squid-pink/10 to-squid-teal/10 border-2 border-squid-pink/20">
            <CardContent className="p-6 text-center">
              <Brain className="w-12 h-12 mx-auto mb-4 text-squid-pink" />
              <h3 className="text-lg font-bold mb-2">Can't Decide?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Let us pick a random quiz for you!
              </p>
              <Button
                asChild
                variant="outline"
                className="border-squid-pink text-squid-pink hover:bg-squid-pink hover:text-white"
              >
                <Link to="/quiz/random">Surprise Me!</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </QuizLayout>
  );
}
