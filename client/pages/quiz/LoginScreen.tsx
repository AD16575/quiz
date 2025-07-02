import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Lock, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedLogo } from "@/components/quiz/AnimatedLogo";
import { QuizLayout } from "@/components/quiz/QuizLayout";
import { useQuiz } from "@/lib/quiz-context";

export default function LoginScreen() {
  const navigate = useNavigate();
  const { dispatch } = useQuiz();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    const user = {
      id: "1",
      name: "John Doe",
      email: formData.email,
      points: 2500,
      totalQuizzes: 15,
      withdrawableAmount: 1200,
      referralCode: "ABC123",
      referredUsers: 3,
      memberSince: new Date("2023-01-15"),
    };
    dispatch({ type: "SET_USER", payload: user });
    navigate("/quiz/dashboard");
  };

  const handleGoogleLogin = () => {
    // Mock Google login
    const user = {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      points: 2500,
      totalQuizzes: 15,
      withdrawableAmount: 1200,
      referralCode: "ABC123",
      referredUsers: 3,
      memberSince: new Date("2023-01-15"),
    };
    dispatch({ type: "SET_USER", payload: user });
    navigate("/quiz/dashboard");
  };

  return (
    <QuizLayout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/quiz/welcome">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        <div className="max-w-md mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatedLogo size="md" className="mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Login to continue your quiz journey
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-12"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10 h-12"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="text-right">
              <Link
                to="/quiz/forgot-password"
                className="text-sm text-squid-pink hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-squid-teal to-squid-teal/80 hover:from-squid-teal/90 hover:to-squid-teal/70 text-white font-semibold h-12"
            >
              Login
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full h-12"
              onClick={handleGoogleLogin}
            >
              <Chrome className="w-4 h-4 mr-2" />
              Login with Google
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/quiz/signup"
                className="text-squid-pink hover:underline font-medium"
              >
                Sign up here
              </Link>
            </p>
          </motion.form>
        </div>
      </div>
    </QuizLayout>
  );
}
