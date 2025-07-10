import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Share,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useQuiz } from "../contexts/QuizContext";
import { useTheme } from "../contexts/ThemeContext";
import GradientBackground from "../components/common/GradientBackground";

export default function QuizResultScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { dispatch } = useQuiz();
  const { state: themeState } = useTheme();

  const { result } = (route.params as { result?: any }) || {};

  useEffect(() => {
    // Update user points when component mounts
    if (result?.pointsEarned > 0) {
      dispatch({ type: "ADD_POINTS", payload: result.pointsEarned });
    }
  }, [result]);

  if (!result) {
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, { color: themeState.colors.text }]}>
              No quiz result found.
            </Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "rgb(238, 58, 124)" }]}
              onPress={() => navigation.navigate("QuizCategories" as never)}
            >
              <Text style={styles.buttonText}>Back to Quizzes</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </GradientBackground>
    );
  }

  const percentage = (result.score / result.totalQuestions) * 100;

  const getPerformanceMessage = () => {
    if (percentage === 100) return "Perfect! 🎉";
    if (percentage >= 80) return "Excellent! 🌟";
    if (percentage >= 60) return "Good Job! 👍";
    if (percentage >= 40) return "Not Bad! 💪";
    return "Keep Trying! 📚";
  };

  const getPerformanceColor = () => {
    if (percentage >= 80) return "rgb(34, 197, 94)";
    if (percentage >= 60) return "rgb(59, 130, 246)";
    if (percentage >= 40) return "rgb(249, 115, 22)";
    return "rgb(239, 68, 68)";
  };

  const getAnalysisMessage = () => {
    if (percentage >= 80) {
      return "Outstanding performance! You have excellent knowledge in this area.";
    }
    if (percentage >= 60) {
      return "Good work! Keep practicing to improve your score.";
    }
    return "Don't give up! Review the topics and try again.";
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I just scored ${result.score}/${result.totalQuestions} (${percentage.toFixed(0)}%) in MyQuiz! 🎉`,
        title: "MyQuiz Result",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Result Header */}
          <View style={styles.headerSection}>
            <LinearGradient
              colors={["rgb(238, 58, 124)", "rgb(24, 154, 144)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.trophyContainer}
            >
              <Ionicons name="trophy" size={64} color="white" />
            </LinearGradient>
            <Text
              style={[styles.headerTitle, { color: themeState.colors.text }]}
            >
              Quiz Complete!
            </Text>
            <Text
              style={[
                styles.performanceMessage,
                { color: getPerformanceColor() },
              ]}
            >
              {getPerformanceMessage()}
            </Text>
          </View>

          {/* Score Card */}
          <View
            style={[
              styles.scoreCard,
              {
                backgroundColor: "rgba(238, 58, 124, 0.1)",
                borderColor: "rgba(238, 58, 124, 0.2)",
              },
            ]}
          >
            <Text style={[styles.cardTitle, { color: themeState.colors.text }]}>
              Your Score
            </Text>

            <Text style={styles.scoreText}>
              {result.score}/{result.totalQuestions}
            </Text>

            <Text
              style={[
                styles.percentageText,
                { color: themeState.colors.textSecondary },
              ]}
            >
              {percentage.toFixed(0)}% Correct
            </Text>

            {/* Stats Grid */}
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text
                  style={[styles.statValue, { color: "rgb(24, 154, 144)" }]}
                >
                  {result.score}
                </Text>
                <Text
                  style={[
                    styles.statLabel,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  Correct Answers
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text
                  style={[styles.statValue, { color: "rgb(238, 58, 124)" }]}
                >
                  {formatTime(result.timeTaken)}
                </Text>
                <Text
                  style={[
                    styles.statLabel,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  Time Taken
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: "rgb(255, 204, 0)" }]}>
                  +{result.pointsEarned}
                </Text>
                <Text
                  style={[
                    styles.statLabel,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  Points Earned
                </Text>
              </View>
            </View>
          </View>

          {/* Performance Analysis */}
          <View
            style={[
              styles.analysisCard,
              { backgroundColor: themeState.colors.surface },
            ]}
          >
            <View style={styles.analysisHeader}>
              <Ionicons name="star" size={20} color="rgb(255, 204, 0)" />
              <Text
                style={[styles.cardTitle, { color: themeState.colors.text }]}
              >
                Performance Analysis
              </Text>
            </View>

            <View style={styles.analysisStats}>
              <View style={styles.analysisStatItem}>
                <Text
                  style={[
                    styles.analysisStatLabel,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  Accuracy
                </Text>
                <Text
                  style={[
                    styles.analysisStatValue,
                    { color: "rgb(238, 58, 124)" },
                  ]}
                >
                  {percentage.toFixed(1)}%
                </Text>
              </View>
              <View style={styles.analysisStatItem}>
                <Text
                  style={[
                    styles.analysisStatLabel,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  Speed (per question)
                </Text>
                <Text
                  style={[
                    styles.analysisStatValue,
                    { color: "rgb(24, 154, 144)" },
                  ]}
                >
                  {Math.floor(result.timeTaken / result.totalQuestions)}s
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.analysisMessage,
                {
                  backgroundColor: themeState.isDark
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.05)",
                },
              ]}
            >
              <Text
                style={[
                  styles.analysisMessageText,
                  { color: themeState.colors.textSecondary },
                ]}
              >
                {getAnalysisMessage()}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <View style={styles.primaryActions}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: "rgb(24, 154, 144)" },
                ]}
                onPress={() =>
                  navigation.navigate(
                    "QuizPlay" as never,
                    { quizId: result.quizId } as never,
                  )
                }
              >
                <Ionicons name="refresh" size={20} color="white" />
                <Text style={styles.actionButtonText}>Retry Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.outlineButton,
                  { borderColor: "rgb(238, 58, 124)" },
                ]}
                onPress={() => navigation.navigate("Home" as never)}
              >
                <Ionicons name="home" size={20} color="rgb(238, 58, 124)" />
                <Text
                  style={[
                    styles.actionButtonText,
                    { color: "rgb(238, 58, 124)" },
                  ]}
                >
                  Go to Dashboard
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.shareButton,
                {
                  borderColor: themeState.colors.border,
                  backgroundColor: themeState.colors.surface,
                },
              ]}
              onPress={handleShare}
            >
              <Ionicons
                name="share-social"
                size={20}
                color={themeState.colors.text}
              />
              <Text
                style={[
                  styles.shareButtonText,
                  { color: themeState.colors.text },
                ]}
              >
                Share Result
              </Text>
            </TouchableOpacity>
          </View>

          {/* Next Quiz Suggestion */}
          <View
            style={[
              styles.suggestionCard,
              {
                backgroundColor: "rgba(255, 204, 0, 0.1)",
                borderColor: "rgba(255, 204, 0, 0.2)",
              },
            ]}
          >
            <Text
              style={[
                styles.suggestionTitle,
                { color: themeState.colors.text },
              ]}
            >
              Ready for More?
            </Text>
            <Text
              style={[
                styles.suggestionText,
                { color: themeState.colors.textSecondary },
              ]}
            >
              Try another quiz to keep your streak going!
            </Text>
            <TouchableOpacity
              style={[
                styles.suggestionButton,
                { backgroundColor: "rgb(255, 204, 0)" },
              ]}
              onPress={() => navigation.navigate("QuizCategories" as never)}
            >
              <Text style={styles.suggestionButtonText}>Browse Quizzes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingBottom: 100,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
  },
  errorText: {
    fontSize: FontSizes.lg,
    marginBottom: Spacing.lg,
    textAlign: "center",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  trophyContainer: {
    width: 128,
    height: 128,
    borderRadius: 64,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  performanceMessage: {
    fontSize: FontSizes.xxl,
    fontWeight: "600",
    textAlign: "center",
  },
  scoreCard: {
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    padding: Spacing.xl,
    alignItems: "center",
    marginBottom: Spacing.xl,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardTitle: {
    fontSize: FontSizes.xl,
    fontWeight: "700",
    marginBottom: Spacing.lg,
    textAlign: "center",
  },
  scoreText: {
    fontSize: 48,
    fontWeight: "700",
    color: "rgb(238, 58, 124)",
    marginBottom: Spacing.sm,
  },
  percentageText: {
    fontSize: FontSizes.xl,
    marginBottom: Spacing.lg,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: FontSizes.xl,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: FontSizes.xs,
    textAlign: "center",
  },
  analysisCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  analysisHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  analysisStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: Spacing.md,
  },
  analysisStatItem: {
    alignItems: "center",
    flex: 1,
  },
  analysisStatLabel: {
    fontSize: FontSizes.sm,
    marginBottom: 4,
    textAlign: "center",
  },
  analysisStatValue: {
    fontSize: FontSizes.xl,
    fontWeight: "700",
  },
  analysisMessage: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  analysisMessageText: {
    fontSize: FontSizes.sm,
    textAlign: "center",
    lineHeight: 20,
  },
  actionsContainer: {
    marginBottom: Spacing.xl,
  },
  primaryActions: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  actionButtonText: {
    color: "white",
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  shareButtonText: {
    fontSize: FontSizes.md,
    fontWeight: "500",
  },
  suggestionCard: {
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    padding: Spacing.lg,
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  suggestionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "700",
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  suggestionText: {
    fontSize: FontSizes.sm,
    textAlign: "center",
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  suggestionButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  suggestionButtonText: {
    color: "white",
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
  button: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
});
