import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedLogo } from "@/components/quiz/AnimatedLogo";
import { QuizLayout } from "@/components/quiz/QuizLayout";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/quiz/welcome");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <QuizLayout className="items-center justify-center min-h-screen">
      <div className="text-center space-y-8">
        <AnimatedLogo size="lg" className="mx-auto" />

        <motion.h1
          className="text-6xl font-bold bg-gradient-to-r from-squid-pink to-squid-teal bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          MyQuiz
        </motion.h1>

        <motion.p
          className="text-2xl font-semibold text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Play. Learn. Earn.
        </motion.p>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-squid-pink"></div>
        </motion.div>
      </div>
    </QuizLayout>
  );
}
