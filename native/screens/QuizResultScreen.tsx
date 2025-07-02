import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Share,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useTheme } from "../contexts/ThemeContext";

export default function QuizResultScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { state: themeState } = useTheme();
  const { result } = route.params as any;

  const percentage = (result.score / result.totalQuestions) * 100;

  const getPerformanceMessage = () => {
    if (percentage === 100) return "Perfect! 🎉";
    if (percentage >= 80) return "Excellent! 🌟";
    if (percentage >= 60) return "Good Job! 👍";
    return "Keep Trying! ���";
  };

  const getPerformanceColor = () => {
    if (percentage >= 80) return "#10B981";
    if (percentage >= 60) return "#3B82F6";
    if (percentage >= 40) return "#F59E0B";
    return "#EF4444";
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I just scored ${result.score}/${result.totalQuestions} (${percentage.toFixed(0)}%) in MyQuiz! 🎉`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: themeState.colors.background },
      ]}
    >
      <View style={styles.content}>
        {/* Trophy */}
        <View style={styles.trophyContainer}>
          <View
            style={[
              styles.trophyCircle,
              { backgroundColor: Colors.light.primary + "20" },
            ]}
          >
            <Ionicons name="trophy" size={80} color={Colors.light.primary} />
          </View>
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: themeState.colors.text }]}>
          Quiz Complete!
        </Text>
        <Text style={[styles.message, { color: getPerformanceColor() }]}>
          {getPerformanceMessage()}
        </Text>

        {/* Score Card */}
        <View
          style={[
            styles.scoreCard,
            { backgroundColor: themeState.colors.surface },
          ]}
        >
          <Text style={[styles.scoreTitle, { color: themeState.colors.text }]}>
            Your Score
          </Text>
          <Text style={styles.score}>
            {result.score}/{result.totalQuestions}
          </Text>
          <Text
            style={[
              styles.percentage,
              { color: themeState.colors.textSecondary },
            ]}
          >
            {percentage.toFixed(0)}% Correct
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: Colors.light.accent + "20" },
                ]}
              >
                <Ionicons name="star" size={24} color={Colors.light.accent} />
              </View>
              <Text style={[styles.statValue, { color: Colors.light.accent }]}>
                {result.pointsEarned}
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
          <Text
            style={[styles.analysisTitle, { color: themeState.colors.text }]}
          >
            Performance Analysis
          </Text>
          <View style={styles.analysisGrid}>
            <View style={styles.analysisItem}>
              <Text
                style={[
                  styles.analysisLabel,
                  { color: themeState.colors.textSecondary },
                ]}
              >
                Accuracy
              </Text>
              <Text
                style={[styles.analysisValue, { color: getPerformanceColor() }]}
              >
                {percentage.toFixed(1)}%
              </Text>
            </View>
            <View style={styles.analysisItem}>
              <Text
                style={[
                  styles.analysisLabel,
                  { color: themeState.colors.textSecondary },
                ]}
              >
                Points
              </Text>
              <Text
                style={[styles.analysisValue, { color: Colors.light.primary }]}
              >
                +{result.pointsEarned}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.feedbackContainer,
              { backgroundColor: themeState.colors.background },
            ]}
          >
            <Text
              style={[
                styles.feedbackText,
                { color: themeState.colors.textSecondary },
              ]}
            >
              {percentage >= 80
                ? "Outstanding performance! You have excellent knowledge in this area."
                : percentage >= 60
                  ? "Good work! Keep practicing to improve your score."
                  : "Don't give up! Review the topics and try again."}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Main" as never)}
            activeOpacity={0.8}
          >
            <Ionicons name="home" size={20} color="white" />
            <Text style={styles.primaryButtonText}>Go Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.secondaryButton,
              { backgroundColor: themeState.colors.surface },
            ]}
            onPress={() => navigation.navigate("Play" as never)}
            activeOpacity={0.8}
          >
            <Ionicons name="play" size={20} color={Colors.light.primary} />
            <Text style={styles.secondaryButtonText}>Play Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.shareButton,
              { backgroundColor: themeState.colors.surface },
            ]}
            onPress={handleShare}
            activeOpacity={0.8}
          >
            <Ionicons name="share" size={20} color={Colors.light.secondary} />
            <Text style={styles.shareButtonText}>Share Result</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  trophyContainer: {
    marginBottom: Spacing.xl,
  },
  trophyCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: "bold",
    marginBottom: Spacing.sm,
  },
  message: {
    fontSize: FontSizes.xl,
    fontWeight: "600",
    marginBottom: Spacing.xxl,
  },
  scoreCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: "center",
    width: "100%",
    marginBottom: Spacing.lg,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  scoreTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    marginBottom: Spacing.md,
  },
  score: {
    fontSize: 72,
    fontWeight: "bold",
    color: Colors.light.primary,
    marginBottom: Spacing.sm,
  },
  percentage: {
    fontSize: FontSizes.xl,
    marginBottom: Spacing.lg,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  statItem: {
    alignItems: "center",
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  statValue: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: FontSizes.sm,
    marginTop: 4,
    textAlign: "center",
  },
  analysisCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    width: "100%",
    marginBottom: Spacing.lg,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  analysisTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    marginBottom: Spacing.md,
    textAlign: "center",
  },
  analysisGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: Spacing.md,
  },
  analysisItem: {
    alignItems: "center",
  },
  analysisLabel: {
    fontSize: FontSizes.sm,
    marginBottom: 4,
  },
  analysisValue: {
    fontSize: FontSizes.xxl,
    fontWeight: "bold",
  },
  feedbackContainer: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  feedbackText: {
    fontSize: FontSizes.sm,
    textAlign: "center",
    lineHeight: 18,
  },
  actionContainer: {
    width: "100%",
    gap: Spacing.md,
  },
  primaryButton: {
    backgroundColor: Colors.light.secondary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  primaryButtonText: {
    color: "white",
    fontSize: FontSizes.lg,
    fontWeight: "600",
  },
  secondaryButton: {
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  secondaryButtonText: {
    color: Colors.light.primary,
    fontSize: FontSizes.lg,
    fontWeight: "600",
  },
  shareButton: {
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    borderColor: Colors.light.secondary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  shareButtonText: {
    color: Colors.light.secondary,
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
});
