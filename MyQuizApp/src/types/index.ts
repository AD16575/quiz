export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  totalQuizzes: number;
  withdrawableAmount: number;
  referredUsers: number;
  achievements: Achievement[];
  streak: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  quizCount: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  difficulty: "easy" | "medium" | "hard";
  questionCount: number;
  timeLimit: number;
  points: number;
  imageUrl?: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  imageUrl?: string;
}

export interface QuizResult {
  id: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  pointsEarned: number;
  completedAt: Date;
}

export interface LeaderboardEntry {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  points: number;
  rank: number;
  totalQuizzes: number;
  streak: number;
}

export interface PointTransaction {
  id: string;
  type: "earned" | "spent" | "withdrawn";
  amount: number;
  description: string;
  date: Date;
  relatedQuizId?: string;
}

// Navigation Types
export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Signup: undefined;
  Login: undefined;
  Main: undefined;
  QuizPlay: { quizId: string };
  QuizResult: { result: QuizResult };
  QuizList: { categoryId: string };
  Referral: undefined;
  Withdrawal: undefined;
  PointHistory: undefined;
  Settings: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Play: undefined;
  Leaderboard: undefined;
  Profile: undefined;
};
