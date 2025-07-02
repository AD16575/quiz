import React from "react";
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

export default function QuizResultScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { result } = route.params as any;

  const percentage = (result.score / result.totalQuestions) * 100;

  const getPerformanceMessage = () => {
    if (percentage === 100) return "Perfect! 🎉";
    if (percentage >= 80) return "Excellent! 🌟";
    if (percentage >= 60) return "Good Job! 👍";
    return "Keep Trying! 📚";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Trophy */}
        <View style={styles.trophyContainer}>
          <Ionicons name="trophy" size={80} color={Colors.light.accent} />
        </View>

        {/* Title */}
        <Text style={styles.title}>Quiz Complete!</Text>
        <Text style={styles.message}>{getPerformanceMessage()}</Text>

        {/* Score Card */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreTitle}>Your Score</Text>
          <Text style={styles.score}>
            {result.score}/{result.totalQuestions}
          </Text>
          <Text style={styles.percentage}>
            {percentage.toFixed(0)}% Correct
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{result.pointsEarned}</Text>
              <Text style={styles.statLabel}>Points Earned</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Main" as never)}
          >
            <Ionicons name="home" size={20} color="white" />
            <Text style={styles.primaryButtonText}>Go Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("Play" as never)}
          >
            <Ionicons name="play" size={20} color={Colors.light.primary} />
            <Text style={styles.secondaryButtonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
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
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: Spacing.sm,
  },
  message: {
    fontSize: FontSizes.xl,
    color: Colors.light.primary,
    fontWeight: "600",
    marginBottom: Spacing.xxl,
  },
  scoreCard: {
    backgroundColor: `${Colors.light.primary}10`,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: "center",
    width: "100%",
    marginBottom: Spacing.xxl,
    borderWidth: 2,
    borderColor: `${Colors.light.primary}30`,
  },
  scoreTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: Spacing.md,
  },
  score: {
    fontSize: 60,
    fontWeight: "bold",
    color: Colors.light.primary,
    marginBottom: Spacing.sm,
  },
  percentage: {
    fontSize: FontSizes.xl,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.lg,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: Colors.light.accent,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    marginTop: 4,
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
  },
  primaryButtonText: {
    color: "white",
    fontSize: FontSizes.lg,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "transparent",
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
});
