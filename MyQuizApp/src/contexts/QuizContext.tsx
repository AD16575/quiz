import React, { createContext, useContext, useReducer, ReactNode } from "react";
import {
  User,
  Quiz,
  QuizResult,
  PointTransaction,
  QuizCategory,
  LeaderboardEntry,
} from "../types";

interface QuizState {
  user: User | null;
  currentQuiz: Quiz | null;
  quizProgress: {
    currentQuestion: number;
    answers: number[];
    timeLeft: number;
    isActive: boolean;
  };
  categories: QuizCategory[];
  recentQuizzes: Quiz[];
  pointHistory: PointTransaction[];
  leaderboard: LeaderboardEntry[];
  isLoading: boolean;
  theme: "light" | "dark";
}

type QuizAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_CURRENT_QUIZ"; payload: Quiz }
  | { type: "START_QUIZ"; payload: Quiz }
  | {
      type: "ANSWER_QUESTION";
      payload: { questionIndex: number; answer: number };
    }
  | { type: "NEXT_QUESTION" }
  | { type: "FINISH_QUIZ"; payload: QuizResult }
  | { type: "SET_CATEGORIES"; payload: QuizCategory[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "TOGGLE_THEME" }
  | { type: "ADD_POINTS"; payload: number };

// Mock Data matching web exactly
const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  points: 1250,
  totalQuizzes: 47,
  withdrawableAmount: 125,
  referralCode: "JOHN2024",
  referredUsers: 8,
  memberSince: new Date("2024-01-15"),
  streak: 5,
  achievements: [
    {
      id: "1",
      title: "First Quiz",
      description: "Complete your first quiz",
      icon: "🎯",
      color: "rgb(34, 197, 94)",
      unlocked: true,
      unlockedAt: new Date(),
    },
    {
      id: "2",
      title: "Quiz Master",
      description: "Complete 50 quizzes",
      icon: "👑",
      color: "rgb(255, 204, 0)",
      unlocked: false,
    },
  ],
};

const mockCategories: QuizCategory[] = [
  {
    id: "general",
    name: "General Knowledge",
    icon: "🧠",
    color: "rgb(168, 85, 247)",
    description: "Test your general knowledge",
    quizCount: 25,
  },
  {
    id: "current-affairs",
    name: "Current Affairs",
    icon: "📰",
    color: "rgb(59, 130, 246)",
    description: "Stay updated with latest news",
    quizCount: 18,
  },
  {
    id: "technology",
    name: "Technology",
    icon: "📱",
    color: "rgb(34, 197, 94)",
    description: "Tech trends and innovations",
    quizCount: 22,
  },
  {
    id: "geography",
    name: "Geography",
    icon: "🌍",
    color: "rgb(245, 158, 11)",
    description: "Explore the world",
    quizCount: 16,
  },
  {
    id: "health",
    name: "Health & Fitness",
    icon: "❤️",
    color: "rgb(239, 68, 68)",
    description: "Health and wellness topics",
    quizCount: 14,
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: "🎵",
    color: "rgb(236, 72, 153)",
    description: "Movies, music, and pop culture",
    quizCount: 20,
  },
];

const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: "2",
    userId: "2",
    userName: "Sarah Wilson",
    avatar: "👩‍🎓",
    points: 1580,
    rank: 1,
    totalQuizzes: 62,
    streak: 12,
  },
  {
    id: "3",
    userId: "3",
    userName: "Mike Johnson",
    avatar: "👨‍🔬",
    points: 1420,
    rank: 2,
    totalQuizzes: 55,
    streak: 8,
  },
  {
    id: "1",
    userId: "1",
    userName: "John Doe",
    avatar: "👨‍💼",
    points: 1250,
    rank: 3,
    totalQuizzes: 47,
    streak: 5,
  },
];

const initialState: QuizState = {
  user: null, // Always start with no user to show splash → welcome → auth flow
  currentQuiz: null,
  quizProgress: {
    currentQuestion: 0,
    answers: [],
    timeLeft: 0,
    isActive: false,
  },
  categories: mockCategories,
  recentQuizzes: [],
  pointHistory: [],
  leaderboard: mockLeaderboard,
  isLoading: false,
  theme: "light",
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_CURRENT_QUIZ":
      return { ...state, currentQuiz: action.payload };
    case "START_QUIZ":
      return {
        ...state,
        currentQuiz: action.payload,
        quizProgress: {
          currentQuestion: 0,
          answers: [],
          timeLeft: action.payload.timeLimit || 0,
          isActive: true,
        },
      };
    case "ANSWER_QUESTION":
      const newAnswers = [...state.quizProgress.answers];
      newAnswers[action.payload.questionIndex] = action.payload.answer;
      return {
        ...state,
        quizProgress: {
          ...state.quizProgress,
          answers: newAnswers,
        },
      };
    case "NEXT_QUESTION":
      return {
        ...state,
        quizProgress: {
          ...state.quizProgress,
          currentQuestion: state.quizProgress.currentQuestion + 1,
        },
      };
    case "FINISH_QUIZ":
      return {
        ...state,
        quizProgress: {
          ...state.quizProgress,
          isActive: false,
        },
        user: state.user
          ? {
              ...state.user,
              points: state.user.points + action.payload.pointsEarned,
              totalQuizzes: state.user.totalQuizzes + 1,
            }
          : null,
      };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    case "ADD_POINTS":
      return {
        ...state,
        user: state.user
          ? { ...state.user, points: state.user.points + action.payload }
          : null,
      };
    default:
      return state;
  }
}

const QuizContext = createContext<{
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
} | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
