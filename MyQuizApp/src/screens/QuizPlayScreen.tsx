import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";
import { useQuiz } from "../contexts/QuizContext";
import GradientBackground from "../components/common/GradientBackground";

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
  const { state: themeState } = useTheme();
  const { state, dispatch } = useQuiz();
  const { quizId } = route.params as any;

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

  const handleExit = () => {
    Alert.alert(
      "Exit Quiz",
      "Are you sure you want to exit? Your progress will be lost.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Exit",
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

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View
          style={[
            styles.header,
            {
              backgroundColor: themeState.colors.surface,
              borderBottomColor: themeState.colors.border,
            },
          ]}
        >
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
              <Ionicons name="close" size={24} color={themeState.colors.text} />
            </TouchableOpacity>
            <View style={styles.quizInfo}>
              <Text
                style={[styles.quizTitle, { color: themeState.colors.text }]}
              >
                {mockQuiz.title}
              </Text>
              <Text
                style={[
                  styles.questionCounter,
                  { color: themeState.colors.textSecondary },
                ]}
              >
                Question {currentQuestion + 1} of {mockQuiz.questions.length}
              </Text>
            </View>
            <View style={styles.timerContainer}>
              <Ionicons
                name="time"
                size={20}
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
              styles.progressContainer,
              { backgroundColor: themeState.colors.border },
            ]}
          >
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
        </View>

        {/* Question Content */}
        <View style={styles.content}>
          <View
            style={[
              styles.questionCard,
              {
                backgroundColor: themeState.colors.surfaceCard,
                borderColor: themeState.colors.borderLight,
              },
            ]}
          >
            <Text
              style={[styles.questionText, { color: themeState.colors.text }]}
            >
              {currentQ?.question}
            </Text>

            <View style={styles.optionsContainer}>
              {currentQ?.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    {
                      backgroundColor: getOptionBackgroundColor(index),
                      borderColor: getOptionBorderColor(index),
                    },
                  ]}
                  onPress={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: themeState.colors.text },
                    ]}
                  >
                    {option}
                  </Text>
                  {showFeedback && selectedAnswer === index && (
                    <Text style={styles.feedbackIcon}>
                      {isCorrect ? "✓" : "✗"}
                    </Text>
                  )}
                  {showFeedback &&
                    selectedAnswer !== index &&
                    index === currentQ.correctAnswer && (
                      <Text style={styles.correctIcon}>✓</Text>
                    )}
                </TouchableOpacity>
              ))}
            </View>

            {!showFeedback && (
              <TouchableOpacity
                style={[
                  styles.nextButton,
                  {
                    opacity: selectedAnswer !== null ? 1 : 0.5,
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
            )}

            {showFeedback && (
              <View style={styles.feedbackContainer}>
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

  function getOptionBackgroundColor(index: number) {
    if (!showFeedback) {
      return selectedAnswer === index
        ? "rgba(238, 58, 124, 0.1)"
        : themeState.colors.surface;
    }

    if (selectedAnswer === index) {
      return index === currentQ.correctAnswer
        ? "rgba(34, 197, 94, 0.1)"
        : "rgba(239, 68, 68, 0.1)";
    }

    if (index === currentQ.correctAnswer) {
      return "rgba(34, 197, 94, 0.1)";
    }

    return themeState.colors.surface;
  }

  function getOptionBorderColor(index: number) {
    if (!showFeedback) {
      return selectedAnswer === index
        ? "rgb(238, 58, 124)"
        : themeState.colors.border;
    }

    if (selectedAnswer === index) {
      return index === currentQ.correctAnswer
        ? "rgb(34, 197, 94)"
        : "rgb(239, 68, 68)";
    }

    if (index === currentQ.correctAnswer) {
      return "rgb(34, 197, 94)";
    }

    return themeState.colors.border;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  exitButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  quizInfo: {
    flex: 1,
    alignItems: "center",
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 2,
  },
  questionCounter: {
    fontSize: 14,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timerText: {
    fontSize: 16,
    fontWeight: "600",
  },
  progressContainer: {
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "rgb(238, 58, 124)",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  questionCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  optionButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  feedbackIcon: {
    fontSize: 20,
    color: "rgb(239, 68, 68)",
  },
  correctIcon: {
    fontSize: 20,
    color: "rgb(34, 197, 94)",
  },
  nextButton: {
    backgroundColor: "rgb(24, 154, 144)",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  feedbackContainer: {
    alignItems: "center",
    paddingVertical: 16,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
