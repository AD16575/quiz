import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Trophy, RotateCcw, Home, Share2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PointDisplay } from "@/components/quiz/PointDisplay";
import { QuizLayout } from "@/components/quiz/QuizLayout";
import { useQuiz } from "@/lib/quiz-context";

export default function QuizResultScreen() {
  const location = useLocation();
  const { dispatch } = useQuiz();
  const result = location.state?.result;

  if (!result) {
    return (
      <QuizLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          <p>No quiz result found.</p>
          <Link to="/quiz/categories">
            <Button className="mt-4">Back to Quizzes</Button>
          </Link>
        </div>
      </QuizLayout>
    );
  }

  // Update user points
  if (result.pointsEarned > 0) {
    dispatch({ type: "ADD_POINTS", payload: result.pointsEarned });
  }

  const percentage = (result.score / result.totalQuestions) * 100;
  const getPerformanceMessage = () => {
    if (percentage === 100) return "Perfect! 🎉";
    if (percentage >= 80) return "Excellent! 🌟";
    if (percentage >= 60) return "Good Job! 👍";
    if (percentage >= 40) return "Not Bad! 💪";
    return "Keep Trying! 📚";
  };

  const getPerformanceColor = () => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <QuizLayout className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="max-w-2xl mx-auto space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Result Header */}
          <motion.div
            className="text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-squid-pink to-squid-teal rounded-full flex items-center justify-center shadow-xl">
              <Trophy className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Quiz Complete!</h1>
            <p className={`text-2xl font-semibold ${getPerformanceColor()}`}>
              {getPerformanceMessage()}
            </p>
          </motion.div>

          {/* Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-squid-pink/10 to-squid-teal/10 border-2 border-squid-pink/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Your Score</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="text-6xl font-bold bg-gradient-to-r from-squid-pink to-squid-teal bg-clip-text text-transparent">
                  {result.score}/{result.totalQuestions}
                </div>
                <div className="text-xl text-muted-foreground">
                  {percentage.toFixed(0)}% Correct
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-squid-teal">
                      {result.score}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Correct Answers
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-squid-pink">
                      {Math.floor(result.timeTaken / 60)}m{" "}
                      {result.timeTaken % 60}s
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Time Taken
                    </div>
                  </div>
                  <div className="text-center">
                    <PointDisplay
                      points={result.pointsEarned}
                      label="Points Earned"
                      variant="earned"
                      animated
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Performance Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-squid-yellow" />
                  Performance Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                    <p className="text-2xl font-bold text-squid-pink">
                      {percentage.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Speed (per question)
                    </p>
                    <p className="text-2xl font-bold text-squid-teal">
                      {Math.floor(result.timeTaken / result.totalQuestions)}s
                    </p>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-center">
                    {percentage >= 80
                      ? "Outstanding performance! You have excellent knowledge in this area."
                      : percentage >= 60
                        ? "Good work! Keep practicing to improve your score."
                        : "Don't give up! Review the topics and try again."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-squid-teal to-squid-teal/80 hover:from-squid-teal/90 hover:to-squid-teal/70 text-white"
              >
                <Link to="/quiz/play/1">
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Retry Quiz
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-squid-pink text-squid-pink hover:bg-squid-pink hover:text-white"
              >
                <Link to="/quiz/dashboard">
                  <Home className="w-5 h-5 mr-2" />
                  Go to Dashboard
                </Link>
              </Button>
            </div>

            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => {
                navigator.share?.({
                  title: "MyQuiz Result",
                  text: `I just scored ${result.score}/${result.totalQuestions} (${percentage.toFixed(0)}%) in MyQuiz! 🎉`,
                  url: window.location.origin,
                });
              }}
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share Result
            </Button>
          </motion.div>

          {/* Next Quiz Suggestion */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Card className="bg-gradient-to-br from-squid-yellow/10 to-squid-pink/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Ready for More?</h3>
                <p className="text-muted-foreground mb-4">
                  Try another quiz to keep your streak going!
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-squid-yellow to-orange-500 hover:from-squid-yellow/90 hover:to-orange-500/90 text-white"
                >
                  <Link to="/quiz/categories">Browse Quizzes</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </QuizLayout>
  );
}
