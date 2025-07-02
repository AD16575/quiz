import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useTheme } from "../contexts/ThemeContext";

const mockQuizzes = [
  {
    id: "1",
    title: "World Capitals Challenge",
    difficulty: "Easy" as const,
    questions: 10,
    timeLimit: 10,
    pointsReward: 50,
    rating: 4.5,
  },
  {
    id: "2",
    title: "Science Fundamentals",
    difficulty: "Medium" as const,
    questions: 15,
    timeLimit: 15,
    pointsReward: 75,
    rating: 4.3,
  },
  {
    id: "3",
    title: "Advanced Physics",
    difficulty: "Hard" as const,
    questions: 20,
    timeLimit: 25,
    pointsReward: 150,
    rating: 4.7,
  },
];

export default function QuizListScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { state: themeState } = useTheme();
  const { categoryId } = route.params as any;

  const difficultyColors = {
    Easy: "#10B981",
    Medium: "#F59E0B",
    Hard: "#EF4444",
  };

  const QuizCard = ({ quiz }: { quiz: any }) => (
    <View
      style={[styles.quizCard, { backgroundColor: themeState.colors.surface }]}
    >
      <View style={styles.quizHeader}>
        <Text style={[styles.quizTitle, { color: themeState.colors.text }]}>
          {quiz.title}
        </Text>
        <View
          style={[
            styles.difficultyBadge,
            { backgroundColor: difficultyColors[quiz.difficulty] + "20" },
          ]}
        >
          <Text
            style={[
              styles.difficultyText,
              { color: difficultyColors[quiz.difficulty] },
            ]}
          >
            {quiz.difficulty}
          </Text>
        </View>
      </View>

      <View style={styles.quizStats}>
        <View style={styles.statItem}>
          <Ionicons
            name="help-circle"
            size={16}
            color={themeState.colors.textSecondary}
          />
          <Text
            style={[
              styles.statText,
              { color: themeState.colors.textSecondary },
            ]}
          >
            {quiz.questions} Questions
          </Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons
            name="time"
            size={16}
            color={themeState.colors.textSecondary}
          />
          <Text
            style={[
              styles.statText,
              { color: themeState.colors.textSecondary },
            ]}
          >
            {quiz.timeLimit}m
          </Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="star" size={16} color={Colors.light.accent} />
          <Text
            style={[
              styles.statText,
              { color: themeState.colors.textSecondary },
            ]}
          >
            {quiz.rating}
          </Text>
        </View>
      </View>

      <View style={styles.quizFooter}>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>+{quiz.pointsReward}</Text>
          <Text
            style={[
              styles.pointsLabel,
              { color: themeState.colors.textSecondary },
            ]}
          >
            points
          </Text>
        </View>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() =>
            navigation.navigate(
              "QuizPlay" as never,
              { quizId: quiz.id } as never,
            )
          }
          activeOpacity={0.8}
        >
          <Ionicons name="play" size={16} color="white" />
          <Text style={styles.playButtonText}>Play</Text>
        </TouchableOpacity>
      </View>

      <Text
        style={[
          styles.quizDescription,
          { color: themeState.colors.textSecondary },
        ]}
      >
        Test your knowledge in this {quiz.difficulty.toLowerCase()} level quiz
        with {quiz.questions} carefully crafted questions.
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: themeState.colors.background },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={themeState.colors.text}
          />
        </TouchableOpacity>
        <Text style={[styles.title, { color: themeState.colors.text }]}>
          Quizzes
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          {mockQuizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </View>

        <View style={styles.bottomSection}>
          <Text
            style={[
              styles.bottomText,
              { color: themeState.colors.textSecondary },
            ]}
          >
            Looking for more quizzes?
          </Text>
          <TouchableOpacity
            style={[
              styles.browseButton,
              { backgroundColor: themeState.colors.surface },
            ]}
            onPress={() => navigation.navigate("Play" as never)}
          >
            <Text style={styles.browseButtonText}>Browse All Categories</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
  },
  placeholder: {
    width: 24,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  quizCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quizHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.md,
  },
  quizTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    flex: 1,
    marginRight: Spacing.sm,
  },
  difficultyBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  difficultyText: {
    fontSize: FontSizes.xs,
    fontWeight: "600",
  },
  quizStats: {
    flexDirection: "row",
    gap: Spacing.lg,
    marginBottom: Spacing.md,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: FontSizes.sm,
  },
  quizFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  pointsContainer: {
    alignItems: "center",
  },
  pointsText: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: Colors.light.primary,
  },
  pointsLabel: {
    fontSize: FontSizes.xs,
  },
  playButton: {
    backgroundColor: Colors.light.secondary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  playButtonText: {
    color: "white",
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
  quizDescription: {
    fontSize: FontSizes.sm,
    lineHeight: 18,
  },
  bottomSection: {
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xl,
  },
  bottomText: {
    fontSize: FontSizes.md,
    marginBottom: Spacing.md,
  },
  browseButton: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.light.primary,
  },
  browseButtonText: {
    color: Colors.light.primary,
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
});
