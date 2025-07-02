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

const mockQuestion = {
  id: "1",
  question: "What is the capital of France?",
  options: ["Berlin", "Madrid", "Paris", "Rome"],
  correctAnswer: 2,
};

export default function QuizPlayScreen() {
  const navigation = useNavigation();
  const route = useRoute();
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
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={Colors.light.text} />
        </TouchableOpacity>
        <Text style={styles.questionNumber}>Question 1 of 1</Text>
        <View style={styles.timer}>
          <Ionicons name="time" size={16} color={Colors.light.accent} />
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: "100%" }]} />
      </View>

      {/* Question */}
      <View style={styles.content}>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{mockQuestion.question}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {mockQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedAnswer === index && styles.selectedOption,
                showResult && {
                  backgroundColor:
                    index === mockQuestion.correctAnswer
                      ? "#10B98120"
                      : selectedAnswer === index
                        ? "#EF444420"
                        : Colors.light.surface,
                  borderColor:
                    index === mockQuestion.correctAnswer
                      ? "#10B981"
                      : selectedAnswer === index
                        ? "#EF4444"
                        : Colors.light.border,
                },
              ]}
              onPress={() => !showResult && handleAnswerSelect(index)}
              disabled={showResult}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedAnswer === index && styles.selectedOptionText,
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
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  questionNumber: {
    fontSize: FontSizes.md,
    fontWeight: "500",
    color: Colors.light.text,
  },
  timer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timerText: {
    fontSize: FontSizes.sm,
    fontWeight: "600",
    color: Colors.light.text,
  },
  progressContainer: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.light.primary,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  questionContainer: {
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  question: {
    fontSize: FontSizes.xl,
    fontWeight: "600",
    color: Colors.light.text,
    textAlign: "center",
    lineHeight: 28,
  },
  optionsContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  option: {
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 2,
    borderColor: Colors.light.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedOption: {
    borderColor: Colors.light.primary,
    backgroundColor: `${Colors.light.primary}10`,
  },
  optionText: {
    fontSize: FontSizes.md,
    color: Colors.light.text,
    flex: 1,
  },
  selectedOptionText: {
    fontWeight: "600",
  },
  resultIcon: {
    marginLeft: Spacing.sm,
  },
  submitButton: {
    backgroundColor: Colors.light.secondary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xl,
    alignItems: "center",
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
