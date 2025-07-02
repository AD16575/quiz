import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from "@/lib/quiz-context";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Quiz App Pages
import SplashScreen from "./pages/quiz/SplashScreen";
import WelcomeScreen from "./pages/quiz/WelcomeScreen";
import SignupScreen from "./pages/quiz/SignupScreen";
import LoginScreen from "./pages/quiz/LoginScreen";
import HomeDashboard from "./pages/quiz/HomeDashboard";
import QuizCategories from "./pages/quiz/QuizCategories";
import QuizListByCategory from "./pages/quiz/QuizListByCategory";
import QuizPlayScreen from "./pages/quiz/QuizPlayScreen";
import QuizResultScreen from "./pages/quiz/QuizResultScreen";
import ReferralScreen from "./pages/quiz/ReferralScreen";
import PointHistoryScreen from "./pages/quiz/PointHistoryScreen";
import WithdrawalScreen from "./pages/quiz/WithdrawalScreen";
import UserProfile from "./pages/quiz/UserProfile";
import Settings from "./pages/quiz/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <QuizProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/quiz/welcome" element={<WelcomeScreen />} />
            <Route path="/quiz/signup" element={<SignupScreen />} />
            <Route path="/quiz/login" element={<LoginScreen />} />
            <Route path="/quiz/dashboard" element={<HomeDashboard />} />
            <Route path="/quiz/categories" element={<QuizCategories />} />
            <Route
              path="/quiz/category/:categoryId"
              element={<QuizListByCategory />}
            />
            <Route path="/quiz/play/:quizId" element={<QuizPlayScreen />} />
            <Route path="/quiz/result" element={<QuizResultScreen />} />
            <Route path="/quiz/referral" element={<ReferralScreen />} />
            <Route path="/quiz/history" element={<PointHistoryScreen />} />
            <Route path="/quiz/withdrawal" element={<WithdrawalScreen />} />
            <Route path="/quiz/profile" element={<UserProfile />} />
            <Route path="/quiz/settings" element={<Settings />} />
            <Route path="/old" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QuizProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
