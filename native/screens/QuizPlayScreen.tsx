import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useTheme } from "../contexts/ThemeContext";

const mockQuestion = {
  id: "1",
  question: "What is the capital of France?",
  options: ["Berlin", "Madrid", "Paris", "Rome"],
  correctAnswer: 2,
};

export default function QuizPlayScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { state: themeState } = useTheme();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    setShowResult(true);
    setTimeout(() => {
      navigation.navigate(
        "QuizResult" as never,
        {
          result: {
            score: selectedAnswer === mockQuestion.correctAnswer ? 1 : 0,
            totalQuestions: 1,
            pointsEarned:
              selectedAnswer === mockQuestion.correctAnswer ? 50 : 0,
          },
        } as never,
      );
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const isCorrect = selectedAnswer === mockQuestion.correctAnswer;

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: themeState.colors.background },
      ]}
    >
      {/* Header */}
      <View
        style={[styles.header, { backgroundColor: themeState.colors.surface }]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={themeState.colors.text} />
        </TouchableOpacity>
        <Text
          style={[styles.questionNumber, { color: themeState.colors.text }]}
        >
          Question 1 of 1
        </Text>
        <View style={styles.timer}>
          <Ionicons name="time" size={16} color={Colors.light.accent} />
          <Text style={[styles.timerText, { color: themeState.colors.text }]}>
            {formatTime(timeLeft)}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar} />
      </View>

      {/* Question */}
      <View style={styles.content}>
        <View
          style={[
            styles.questionContainer,
            { backgroundColor: themeState.colors.surface },
          ]}
        >
          <Text style={[styles.question, { color: themeState.colors.text }]}>
            {mockQuestion.question}
          </Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {mockQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                { backgroundColor: themeState.colors.surface },
                { borderColor: themeState.colors.border },
                selectedAnswer === index && {
                  borderColor: Colors.light.primary,
                  backgroundColor: Colors.light.primary + "10",
                },
                showResult && {
                  backgroundColor:
                    index === mockQuestion.correctAnswer
                      ? "#10B98120"
                      : selectedAnswer === index
                        ? "#EF444420"
                        : themeState.colors.surface,
                  borderColor:
                    index === mockQuestion.correctAnswer
                      ? "#10B981"
                      : selectedAnswer === index
                        ? "#EF4444"
                        : themeState.colors.border,
                },
              ]}
              onPress={() => !showResult && handleAnswerSelect(index)}
              disabled={showResult}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.optionText,
                  { color: themeState.colors.text },
                  selectedAnswer === index && { fontWeight: "600" },
                ]}
              >
                {option}
              </Text>
              {showResult && (
                <View style={styles.resultIcon}>
                  {index === mockQuestion.correctAnswer ? (
                    <Ionicons name="checkmark" size={20} color="#10B981" />
                  ) : selectedAnswer === index ? (
                    <Ionicons name="close" size={20} color="#EF4444" />
                  ) : null}
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Submit Button */}
        {!showResult && (
          <TouchableOpacity
            style={[
              styles.submitButton,
              selectedAnswer === null && styles.disabledButton,
            ]}
            onPress={handleSubmit}
            disabled={selectedAnswer === null}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>Submit Answer</Text>
          </TouchableOpacity>
        )}

        {/* Result Feedback */}
        {showResult && (
          <View style={styles.feedback}>
            <Text
              style={[
                styles.feedbackText,
                { color: isCorrect ? "#10B981" : "#EF4444" },
              ]}
            >
              {isCorrect ? "Correct! 🎉" : "Incorrect 😔"}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  questionNumber: {
    fontSize: FontSizes.md,
    fontWeight: "500",
  },
  timer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timerText: {
    fontSize: FontSizes.sm,
    fontWeight: "600",
  },
  progressContainer: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.light.primary,
    borderRadius: 2,
    width: "100%",
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  questionContainer: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  question: {
    fontSize: FontSizes.xl,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 28,
  },
  optionsContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  option: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  optionText: {
    fontSize: FontSizes.md,
    flex: 1,
  },
  resultIcon: {
    marginLeft: Spacing.sm,
  },
  submitButton: {
    backgroundColor: Colors.light.secondary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xl,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  disabledButton: {
    backgroundColor: Colors.light.textSecondary,
    opacity: 0.5,
  },
  submitButtonText: {
    color: "white",
    fontSize: FontSizes.lg,
    fontWeight: "600",
  },
  feedback: {
    alignItems: "center",
    paddingVertical: Spacing.lg,
  },
  feedbackText: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
  },
});
