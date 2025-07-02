import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuizLayout } from "@/components/quiz/QuizLayout";
import { useQuiz } from "@/lib/quiz-context";

const mockQuiz = {
  id: "1",
  title: "World Capitals Challenge",
  questions: [
    {
      id: "1",
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: 2,
    },
    {
      id: "2",
      question: "Which city is the capital of Japan?",
      options: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
      correctAnswer: 1,
    },
    {
      id: "3",
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      correctAnswer: 2,
    },
  ],
  timeLimit: 10,
  pointsReward: 50,
};

export default function QuizPlayScreen() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(mockQuiz.timeLimit * 60);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);

      setShowFeedback(true);
      setTimeout(() => {
        setShowFeedback(false);
        if (currentQuestion < mockQuiz.questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
        } else {
          handleFinishQuiz();
        }
      }, 1500);
    }
  };

  const handleFinishQuiz = () => {
    const finalAnswers =
      selectedAnswer !== null ? [...answers, selectedAnswer] : answers;

    const correctAnswers = finalAnswers.filter(
      (answer, index) => answer === mockQuiz.questions[index]?.correctAnswer,
    ).length;

    const result = {
      quizId: mockQuiz.id,
      userId: state.user?.id || "",
      score: correctAnswers,
      totalQuestions: mockQuiz.questions.length,
      pointsEarned: Math.floor(
        (correctAnswers / mockQuiz.questions.length) * mockQuiz.pointsReward,
      ),
      timeTaken: mockQuiz.timeLimit * 60 - timeLeft,
      completedAt: new Date(),
    };

    navigate("/quiz/result", { state: { result } });
  };

  const currentQ = mockQuiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / mockQuiz.questions.length) * 100;
  const isCorrect = selectedAnswer === currentQ?.correctAnswer;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <QuizLayout>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-background/80 backdrop-blur-sm border-b p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/quiz/categories")}
              >
                <X className="h-5 w-5" />
              </Button>
              <div>
                <h2 className="font-semibold">{mockQuiz.title}</h2>
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {mockQuiz.questions.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span className={timeLeft < 60 ? "text-red-500" : ""}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
          <div className="container mx-auto mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Quiz Content */}
        <div className="flex-1 container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-xl text-center">
                    {currentQ?.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentQ?.options.map((option, index) => (
                    <motion.button
                      key={index}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        selectedAnswer === index
                          ? showFeedback
                            ? index === currentQ.correctAnswer
                              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                              : "border-red-500 bg-red-50 dark:bg-red-900/20"
                            : "border-squid-pink bg-squid-pink/10"
                          : showFeedback && index === currentQ.correctAnswer
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-squid-pink/50"
                      }`}
                      onClick={() => !showFeedback && handleAnswerSelect(index)}
                      disabled={showFeedback}
                      whileHover={!showFeedback ? { scale: 1.02 } : {}}
                      whileTap={!showFeedback ? { scale: 0.98 } : {}}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showFeedback && selectedAnswer === index && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={
                              isCorrect ? "text-green-600" : "text-red-600"
                            }
                          >
                            {isCorrect ? "✓" : "✗"}
                          </motion.span>
                        )}
                        {showFeedback &&
                          selectedAnswer !== index &&
                          index === currentQ.correctAnswer && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-green-600"
                            >
                              ✓
                            </motion.span>
                          )}
                      </div>
                    </motion.button>
                  ))}

                  {!showFeedback && (
                    <motion.div
                      className="pt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Button
                        onClick={handleNextQuestion}
                        disabled={selectedAnswer === null}
                        className="w-full bg-gradient-to-r from-squid-teal to-squid-teal/80 hover:from-squid-teal/90 hover:to-squid-teal/70 text-white py-3"
                      >
                        {currentQuestion === mockQuiz.questions.length - 1
                          ? "Finish Quiz"
                          : "Next Question"}
                      </Button>
                    </motion.div>
                  )}

                  {showFeedback && (
                    <motion.div
                      className="text-center text-lg font-semibold"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {isCorrect ? (
                        <span className="text-green-600">Correct! 🎉</span>
                      ) : (
                        <span className="text-red-600">Incorrect 😔</span>
                      )}
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </QuizLayout>
  );
}
