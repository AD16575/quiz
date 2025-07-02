import React, { createContext, useContext, useReducer, ReactNode } from "react";
import {
  User,
  Quiz,
  QuizResult,
  PointTransaction,
  QuizCategory,
} from "@shared/quiz";

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
  isLoading: boolean;
  theme: "light" | "dark";
}

type QuizAction =
  | { type: "SET_USER"; payload: User }
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

const initialState: QuizState = {
  user: null,
  currentQuiz: null,
  quizProgress: {
    currentQuestion: 0,
    answers: [],
    timeLeft: 0,
    isActive: false,
  },
  categories: [],
  recentQuizzes: [],
  pointHistory: [],
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
