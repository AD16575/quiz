export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  totalQuizzes: number;
  withdrawableAmount: number;
  referralCode: string;
  referredUsers: number;
  memberSince: Date;
}

export interface Quiz {
  id: string;
  title: string;
  category: QuizCategory;
  difficulty: "Easy" | "Medium" | "Hard";
  questions: Question[];
  pointsReward: number;
  timeLimit?: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface QuizResult {
  quizId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  pointsEarned: number;
  timeTaken: number;
  completedAt: Date;
}

export interface PointTransaction {
  id: string;
  userId: string;
  type: "Quiz" | "Referral" | "Bonus" | "Withdrawal";
  amount: number;
  description: string;
  date: Date;
  status: "Pending" | "Completed" | "Failed";
}

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Signup: undefined;
  Login: undefined;
  Main: undefined;
  QuizPlay: { quizId: string };
  QuizResult: { result: QuizResult };
  QuizList: { categoryId: string };
};

export type BottomTabParamList = {
  Home: undefined;
  Play: undefined;
  Leaderboard: undefined;
  Profile: undefined;
};
