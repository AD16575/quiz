import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";
import { useQuiz } from "../contexts/QuizContext";
import GradientBackground from "../components/common/GradientBackground";
import GradientText from "../components/common/GradientText";

export default function QuizResultScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { state: themeState } = useTheme();
  const { state, dispatch } = useQuiz();
  const { result } = route.params as any;

  useEffect(() => {
    // Update user points when result screen loads
    if (result && state.user) {
      dispatch({
        type: "FINISH_QUIZ",
        payload: result,
      });
    }
  }, [result, state.user, dispatch]);

  const getScoreColor = () => {
    const percentage = (result.score / result.totalQuestions) * 100;
    if (percentage >= 80) return "rgb(34, 197, 94)";
    if (percentage >= 60) return "rgb(255, 204, 0)";
    return "rgb(239, 68, 68)";
  };

  const getScoreEmoji = () => {
    const percentage = (result.score / result.totalQuestions) * 100;
    if (percentage >= 80) return "🎉";
    if (percentage >= 60) return "👍";
    return "😔";
  };

  const getPerformanceText = () => {
    const percentage = (result.score / result.totalQuestions) * 100;
    if (percentage >= 80) return "Excellent!";
    if (percentage >= 60) return "Good Job!";
    return "Keep Trying!";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Result Header */}
          <View style={styles.resultHeader}>
            <View
              style={[
                styles.scoreCircle,
                {
                  backgroundColor: `${getScoreColor()}20`,
                  borderColor: getScoreColor(),
                },
              ]}
            >
              <Text style={[styles.scoreEmoji]}>{getScoreEmoji()}</Text>
              <Text style={[styles.scoreText, { color: getScoreColor() }]}>
                {result.score}/{result.totalQuestions}
              </Text>
            </View>
            <GradientText style={styles.performanceText}>
              {getPerformanceText()}
            </GradientText>
            <Text
              style={[
                styles.congratsText,
                { color: themeState.colors.textSecondary },
              ]}
            >
              Quiz completed successfully!
            </Text>
          </View>

          {/* Stats Grid */}
          <View
            style={[
              styles.statsContainer,
              {
                backgroundColor: themeState.colors.surfaceCard,
                borderColor: themeState.colors.borderLight,
              },
            ]}
          >
            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Ionicons name="trophy" size={24} color="rgb(238, 58, 124)" />
                <Text
                  style={[styles.statValue, { color: themeState.colors.text }]}
                >
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
              <View style={styles.statItem}>
                <Ionicons name="time" size={24} color="rgb(24, 154, 144)" />
                <Text
                  style={[styles.statValue, { color: themeState.colors.text }]}
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
            </View>
            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color="rgb(34, 197, 94)"
                />
                <Text
                  style={[styles.statValue, { color: themeState.colors.text }]}
                >
                  {Math.round((result.score / result.totalQuestions) * 100)}%
                </Text>
                <Text
                  style={[
                    styles.statLabel,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  Accuracy
                </Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons
                  name="help-circle"
                  size={24}
                  color="rgb(255, 204, 0)"
                />
                <Text
                  style={[styles.statValue, { color: themeState.colors.text }]}
                >
                  {result.totalQuestions - result.score}
                </Text>
                <Text
                  style={[
                    styles.statLabel,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  Incorrect
                </Text>
              </View>
            </View>
          </View>

          {/* Achievement */}
          <View
            style={[
              styles.achievementContainer,
              {
                backgroundColor: themeState.colors.surfaceCard,
                borderColor: "rgba(238, 58, 124, 0.2)",
              },
            ]}
          >
            <Ionicons name="medal" size={32} color="rgb(255, 204, 0)" />
            <Text
              style={[
                styles.achievementTitle,
                { color: themeState.colors.text },
              ]}
            >
              Achievement Unlocked!
            </Text>
            <Text
              style={[
                styles.achievementDescription,
                { color: themeState.colors.textSecondary },
              ]}
            >
              Quiz Completed - Earned {result.pointsEarned} points
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.playAgainButton}
              onPress={() => navigation.navigate("Categories" as never)}
            >
              <Ionicons name="refresh" size={20} color="white" />
              <Text style={styles.playAgainText}>Play Again</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.homeButton,
                {
                  borderColor: "rgb(24, 154, 144)",
                  backgroundColor: themeState.isDark
                    ? "rgba(24, 154, 144, 0.15)"
                    : "transparent",
                },
              ]}
              onPress={() => navigation.navigate("Home" as never)}
            >
              <Ionicons name="home" size={20} color="rgb(24, 154, 144)" />
              <Text style={[styles.homeText, { color: "rgb(24, 154, 144)" }]}>
                Home
              </Text>
            </TouchableOpacity>
          </View>

          {/* Share Results */}
          <TouchableOpacity
            style={[
              styles.shareButton,
              { borderColor: themeState.colors.border },
            ]}
          >
            <Ionicons
              name="share-social"
              size={20}
              color={themeState.colors.textSecondary}
            />
            <Text
              style={[
                styles.shareText,
                { color: themeState.colors.textSecondary },
              ]}
            >
              Share Results
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 32,
  },
  resultHeader: {
    alignItems: "center",
    marginBottom: 32,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  scoreEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "700",
  },
  performanceText: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
  },
  congratsText: {
    fontSize: 16,
    textAlign: "center",
  },
  statsContainer: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  achievementContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: "center",
    marginBottom: 32,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    textAlign: "center",
  },
  buttonContainer: {
    gap: 16,
    marginBottom: 24,
  },
  playAgainButton: {
    backgroundColor: "rgb(238, 58, 124)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  playAgainText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  homeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 2,
    gap: 8,
  },
  homeText: {
    fontSize: 18,
    fontWeight: "600",
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  shareText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
