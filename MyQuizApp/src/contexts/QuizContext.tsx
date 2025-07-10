import React, { createContext, useContext, useReducer, ReactNode } from "react";
import {
  User,
  Category,
  Quiz,
  QuizResult,
  Achievement,
  LeaderboardEntry,
} from "../types";

interface QuizState {
  user: User | null;
  categories: Category[];
  quizzes: Quiz[];
  results: QuizResult[];
  leaderboard: LeaderboardEntry[];
  currentQuiz: Quiz | null;
  isLoading: boolean;
}

type QuizAction =
  | { type: "SET_USER"; payload: User }
  | { type: "LOGOUT" }
  | { type: "ADD_POINTS"; payload: number }
  | { type: "SET_CATEGORIES"; payload: Category[] }
  | { type: "SET_QUIZZES"; payload: Quiz[] }
  | { type: "SET_CURRENT_QUIZ"; payload: Quiz | null }
  | { type: "ADD_RESULT"; payload: QuizResult }
  | { type: "SET_LOADING"; payload: boolean };

// Mock Data
const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  points: 1250,
  totalQuizzes: 47,
  withdrawableAmount: 125,
  referredUsers: 8,
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

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Science",
    description: "Test your scientific knowledge",
    icon: "🧪",
    color: "rgb(34, 197, 94)",
    quizCount: 25,
  },
  {
    id: "2",
    name: "History",
    description: "Journey through time",
    icon: "🏛️",
    color: "rgb(245, 158, 11)",
    quizCount: 18,
  },
  {
    id: "3",
    name: "Technology",
    description: "Digital world knowledge",
    icon: "💻",
    color: "rgb(59, 130, 246)",
    quizCount: 22,
  },
  {
    id: "4",
    name: "Sports",
    description: "Athletic achievements and records",
    icon: "⚽",
    color: "rgb(239, 68, 68)",
    quizCount: 15,
  },
  {
    id: "5",
    name: "Geography",
    description: "Explore the world",
    icon: "🌍",
    color: "rgb(168, 85, 247)",
    quizCount: 20,
  },
  {
    id: "6",
    name: "Literature",
    description: "Books and authors",
    icon: "📚",
    color: "rgb(236, 72, 153)",
    quizCount: 12,
  },
];

const mockLeaderboard: LeaderboardEntry[] = [
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
];

const initialState: QuizState = {
  user: null,
  categories: mockCategories,
  quizzes: [],
  results: [],
  leaderboard: mockLeaderboard,
  currentQuiz: null,
  isLoading: false,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "ADD_POINTS":
      return {
        ...state,
        user: state.user
          ? { ...state.user, points: state.user.points + action.payload }
          : null,
      };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_QUIZZES":
      return { ...state, quizzes: action.payload };
    case "SET_CURRENT_QUIZ":
      return { ...state, currentQuiz: action.payload };
    case "ADD_RESULT":
      return { ...state, results: [...state.results, action.payload] };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
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
