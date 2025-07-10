import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useQuiz } from "../contexts/QuizContext";
import { useTheme } from "../contexts/ThemeContext";
import GradientBackground from "../components/common/GradientBackground";

const { width } = Dimensions.get("window");

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
  const navigation = useNavigation();
  const route = useRoute();
  const { state, dispatch } = useQuiz();
  const { state: themeState } = useTheme();

  const { quizId } = (route.params as { quizId?: string }) || {};

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
    if (!showFeedback) {
      setSelectedAnswer(answerIndex);
    }
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

    navigation.navigate("QuizResult" as never, { result } as never);
  };

  const handleQuitQuiz = () => {
    Alert.alert(
      "Quit Quiz",
      "Are you sure you want to quit? Your progress will be lost.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Quit",
          style: "destructive",
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  const currentQ = mockQuiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / mockQuiz.questions.length) * 100;
  const isCorrect = selectedAnswer === currentQ?.correctAnswer;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getAnswerStyle = (index: number) => {
    if (!showFeedback) {
      return selectedAnswer === index
        ? [
            styles.answerButton,
            styles.selectedAnswer,
            { backgroundColor: "rgba(238, 58, 124, 0.1)" },
          ]
        : [
            styles.answerButton,
            {
              backgroundColor: themeState.colors.surface,
              borderColor: themeState.colors.border,
            },
          ];
    }

    if (selectedAnswer === index) {
      return index === currentQ.correctAnswer
        ? [
            styles.answerButton,
            styles.correctAnswer,
            { backgroundColor: "rgba(34, 197, 94, 0.1)" },
          ]
        : [
            styles.answerButton,
            styles.incorrectAnswer,
            { backgroundColor: "rgba(239, 68, 68, 0.1)" },
          ];
    }

    if (index === currentQ.correctAnswer) {
      return [
        styles.answerButton,
        styles.correctAnswer,
        { backgroundColor: "rgba(34, 197, 94, 0.1)" },
      ];
    }

    return [
      styles.answerButton,
      {
        backgroundColor: themeState.colors.surface,
        borderColor: themeState.colors.border,
      },
    ];
  };

  const getAnswerIcon = (index: number) => {
    if (!showFeedback) return null;

    if (selectedAnswer === index) {
      return isCorrect ? (
        <Ionicons name="checkmark" size={20} color="rgb(34, 197, 94)" />
      ) : (
        <Ionicons name="close" size={20} color="rgb(239, 68, 68)" />
      );
    }

    if (index === currentQ.correctAnswer) {
      return <Ionicons name="checkmark" size={20} color="rgb(34, 197, 94)" />;
    }

    return null;
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View
          style={[
            styles.header,
            {
              backgroundColor: themeState.colors.background + "CC",
              borderBottomColor: themeState.colors.border,
            },
          ]}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <TouchableOpacity
                style={[
                  styles.quitButton,
                  {
                    backgroundColor: themeState.colors.surface,
                    borderColor: themeState.colors.border,
                  },
                ]}
                onPress={handleQuitQuiz}
              >
                <Ionicons
                  name="close"
                  size={20}
                  color={themeState.colors.text}
                />
              </TouchableOpacity>
              <View style={styles.headerText}>
                <Text
                  style={[styles.quizTitle, { color: themeState.colors.text }]}
                >
                  {mockQuiz.title}
                </Text>
                <Text
                  style={[
                    styles.questionInfo,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  Question {currentQuestion + 1} of {mockQuiz.questions.length}
                </Text>
              </View>
            </View>
            <View style={styles.timerContainer}>
              <Ionicons
                name="time-outline"
                size={16}
                color={
                  timeLeft < 60 ? "rgb(239, 68, 68)" : themeState.colors.text
                }
              />
              <Text
                style={[
                  styles.timerText,
                  {
                    color:
                      timeLeft < 60
                        ? "rgb(239, 68, 68)"
                        : themeState.colors.text,
                  },
                ]}
              >
                {formatTime(timeLeft)}
              </Text>
            </View>
          </View>
          {/* Progress Bar */}
          <View
            style={[
              styles.progressBarContainer,
              { backgroundColor: themeState.colors.border },
            ]}
          >
            <View
              style={[
                styles.progressBar,
                {
                  width: `${progress}%`,
                  backgroundColor: "rgb(238, 58, 124)",
                },
              ]}
            />
          </View>
        </View>

        {/* Quiz Content */}
        <View style={styles.content}>
          <View
            style={[
              styles.questionCard,
              { backgroundColor: themeState.colors.surface },
            ]}
          >
            {/* Question */}
            <View style={styles.questionSection}>
              <Text
                style={[styles.questionText, { color: themeState.colors.text }]}
              >
                {currentQ?.question}
              </Text>
            </View>

            {/* Answers */}
            <View style={styles.answersSection}>
              {currentQ?.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={getAnswerStyle(index)}
                  onPress={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.answerText,
                      { color: themeState.colors.text },
                    ]}
                  >
                    {option}
                  </Text>
                  {getAnswerIcon(index)}
                </TouchableOpacity>
              ))}
            </View>

            {/* Next Button or Feedback */}
            {!showFeedback ? (
              <TouchableOpacity
                style={[
                  styles.nextButton,
                  {
                    backgroundColor:
                      selectedAnswer !== null
                        ? "rgb(24, 154, 144)"
                        : "rgba(24, 154, 144, 0.5)",
                  },
                ]}
                onPress={handleNextQuestion}
                disabled={selectedAnswer === null}
              >
                <Text style={styles.nextButtonText}>
                  {currentQuestion === mockQuiz.questions.length - 1
                    ? "Finish Quiz"
                    : "Next Question"}
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.feedbackSection}>
                <Text
                  style={[
                    styles.feedbackText,
                    {
                      color: isCorrect
                        ? "rgb(34, 197, 94)"
                        : "rgb(239, 68, 68)",
                    },
                  ]}
                >
                  {isCorrect ? "Correct! 🎉" : "Incorrect 😔"}
                </Text>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  quitButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  headerText: {
    flex: 1,
  },
  quizTitle: {
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
  questionInfo: {
    fontSize: FontSizes.sm,
    marginTop: 2,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timerText: {
    fontSize: FontSizes.sm,
    fontWeight: "600",
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.md,
  },
  questionCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
  },
  questionSection: {
    marginBottom: Spacing.xl,
  },
  questionText: {
    fontSize: FontSizes.xl,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 28,
  },
  answersSection: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  answerButton: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 56,
  },
  selectedAnswer: {
    borderColor: "rgb(238, 58, 124)",
  },
  correctAnswer: {
    borderColor: "rgb(34, 197, 94)",
  },
  incorrectAnswer: {
    borderColor: "rgb(239, 68, 68)",
  },
  answerText: {
    fontSize: FontSizes.md,
    flex: 1,
    textAlign: "left",
  },
  nextButton: {
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  nextButtonText: {
    color: "white",
    fontSize: FontSizes.lg,
    fontWeight: "600",
  },
  feedbackSection: {
    alignItems: "center",
    paddingVertical: Spacing.md,
  },
  feedbackText: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    textAlign: "center",
  },
});
