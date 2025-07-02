import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Moon, Sun, Play, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedLogo } from "@/components/quiz/AnimatedLogo";
import { QuizLayout } from "@/components/quiz/QuizLayout";
import { useQuiz } from "@/lib/quiz-context";

export default function WelcomeScreen() {
  const { state, dispatch } = useQuiz();

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
    document.documentElement.classList.toggle("dark");
  };

  return (
    <QuizLayout className="min-h-screen">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          className="absolute top-6 right-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {state.theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </motion.div>

        <motion.div
          className="text-center space-y-8 max-w-md w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatedLogo size="lg" className="mx-auto" />

          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-squid-pink to-squid-teal bg-clip-text text-transparent">
              MyQuiz
            </h1>
            <p className="text-xl text-muted-foreground">Play. Learn. Earn.</p>
          </div>

          <motion.div
            className="w-64 h-64 mx-auto bg-gradient-to-br from-squid-pink/20 to-squid-teal/20 rounded-3xl flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-center space-y-4">
              <Play className="w-16 h-16 mx-auto text-squid-pink" />
              <p className="text-sm text-muted-foreground px-4">
                Challenge yourself with fun quizzes and earn points while
                learning!
              </p>
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button
              asChild
              size="lg"
              className="w-full bg-gradient-to-r from-squid-pink to-squid-pink/80 hover:from-squid-pink/90 hover:to-squid-pink/70 text-white font-semibold text-lg py-6 rounded-xl"
            >
              <Link to="/quiz/signup">
                <Play className="w-5 h-5 mr-2" />
                Get Started
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full border-2 border-squid-teal text-squid-teal hover:bg-squid-teal hover:text-white font-semibold text-lg py-6 rounded-xl"
            >
              <Link to="/quiz/login">
                <LogIn className="w-5 h-5 mr-2" />
                Login
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </QuizLayout>
  );
}
