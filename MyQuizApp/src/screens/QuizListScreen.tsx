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
import { useQuiz } from "../contexts/QuizContext";
import { useTheme } from "../contexts/ThemeContext";
import GradientBackground from "../components/common/GradientBackground";

const mockQuizzes = [
  {
    id: "1",
    title: "World Capitals Challenge",
    difficulty: "Easy" as const,
    questions: 10,
    timeLimit: 10,
    pointsReward: 50,
    rating: 4.5,
    completedBy: 1250,
  },
  {
    id: "2",
    title: "Science Fundamentals",
    difficulty: "Medium" as const,
    questions: 15,
    timeLimit: 15,
    pointsReward: 75,
    rating: 4.3,
    completedBy: 890,
  },
  {
    id: "3",
    title: "Advanced Physics",
    difficulty: "Hard" as const,
    questions: 20,
    timeLimit: 25,
    pointsReward: 150,
    rating: 4.7,
    completedBy: 445,
  },
  {
    id: "4",
    title: "History Timeline",
    difficulty: "Medium" as const,
    questions: 12,
    timeLimit: 12,
    pointsReward: 60,
    rating: 4.2,
    completedBy: 1050,
  },
];

export default function QuizListScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { state } = useQuiz();
  const { state: themeState } = useTheme();

  const { categoryId } = (route.params as { categoryId?: string }) || {};

  const categoryNames: Record<string, string> = {
    general: "General Knowledge",
    "current-affairs": "Current Affairs",
    technology: "Technology",
    geography: "Geography",
    health: "Health & Fitness",
    entertainment: "Entertainment",
  };

  const difficultyColors = {
    Easy: {
      background: "rgba(34, 197, 94, 0.1)",
      text: "rgb(34, 197, 94)",
      border: "rgb(34, 197, 94)",
    },
    Medium: {
      background: "rgba(249, 115, 22, 0.1)",
      text: "rgb(249, 115, 22)",
      border: "rgb(249, 115, 22)",
    },
    Hard: {
      background: "rgba(239, 68, 68, 0.1)",
      text: "rgb(239, 68, 68)",
      border: "rgb(239, 68, 68)",
    },
  };

  const QuizCard = ({ quiz }: { quiz: any }) => (
    <View
      style={[styles.quizCard, { backgroundColor: themeState.colors.surface }]}
    >
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <Text style={[styles.quizTitle, { color: themeState.colors.text }]}>
            {quiz.title}
          </Text>
          <View style={styles.badgeContainer}>
            <View
              style={[
                styles.difficultyBadge,
                {
                  backgroundColor: difficultyColors[quiz.difficulty].background,
                  borderColor: difficultyColors[quiz.difficulty].border,
                },
              ]}
            >
              <Text
                style={[
                  styles.difficultyText,
                  { color: difficultyColors[quiz.difficulty].text },
                ]}
              >
                {quiz.difficulty}
              </Text>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="rgb(255, 204, 0)" />
              <Text
                style={[
                  styles.ratingText,
                  { color: themeState.colors.textSecondary },
                ]}
              >
                {quiz.rating}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsValue}>+{quiz.pointsReward}</Text>
          <Text
            style={[
              styles.pointsLabel,
              { color: themeState.colors.textSecondary },
            ]}
          >
            points
          </Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: themeState.colors.text }]}>
            {quiz.questions}
          </Text>
          <Text
            style={[
              styles.statLabel,
              { color: themeState.colors.textSecondary },
            ]}
          >
            Questions
          </Text>
        </View>
        <View style={styles.statItem}>
          <View style={styles.timeContainer}>
            <Ionicons
              name="time-outline"
              size={16}
              color={themeState.colors.text}
            />
            <Text style={[styles.statValue, { color: themeState.colors.text }]}>
              {quiz.timeLimit}m
            </Text>
          </View>
          <Text
            style={[
              styles.statLabel,
              { color: themeState.colors.textSecondary },
            ]}
          >
            Time Limit
          </Text>
        </View>
        <View style={styles.statItem}>
          <View style={styles.timeContainer}>
            <Ionicons
              name="trophy-outline"
              size={16}
              color={themeState.colors.text}
            />
            <Text style={[styles.statValue, { color: themeState.colors.text }]}>
              {quiz.completedBy}
            </Text>
          </View>
          <Text
            style={[
              styles.statLabel,
              { color: themeState.colors.textSecondary },
            ]}
          >
            Completed
          </Text>
        </View>
        <View style={styles.statItem}>
          <TouchableOpacity
            style={[
              styles.playButton,
              { backgroundColor: "rgb(24, 154, 144)" },
            ]}
            onPress={() =>
              navigation.navigate(
                "QuizPlay" as never,
                { quizId: quiz.id } as never,
              )
            }
          >
            <Ionicons name="play" size={16} color="white" />
            <Text style={styles.playButtonText}>Play</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Description */}
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
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={[
                styles.backButton,
                {
                  backgroundColor: themeState.colors.surface,
                  borderColor: themeState.colors.border,
                },
              ]}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="arrow-back"
                size={20}
                color={themeState.colors.text}
              />
            </TouchableOpacity>
            <View style={styles.headerText}>
              <Text
                style={[styles.headerTitle, { color: themeState.colors.text }]}
              >
                {categoryId ? categoryNames[categoryId] : "Quizzes"}
              </Text>
              <Text
                style={[
                  styles.headerSubtitle,
                  { color: themeState.colors.textSecondary },
                ]}
              >
                {mockQuizzes.length} quizzes available
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Quiz Cards */}
          <View style={styles.quizzesContainer}>
            {mockQuizzes.map((quiz, index) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </View>

          {/* Browse More Section */}
          <View style={styles.browseMoreSection}>
            <Text
              style={[
                styles.browseMoreText,
                { color: themeState.colors.textSecondary },
              ]}
            >
              Looking for more quizzes?
            </Text>
            <TouchableOpacity
              style={[
                styles.browseMoreButton,
                { borderColor: "rgb(238, 58, 124)" },
              ]}
              onPress={() => navigation.navigate("QuizCategories" as never)}
            >
              <Text style={styles.browseMoreButtonText}>
                Browse All Categories
              </Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  backButton: {
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
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
  },
  headerSubtitle: {
    fontSize: FontSizes.sm,
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingBottom: 100,
  },
  quizzesContainer: {
    gap: Spacing.lg,
  },
  quizCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.md,
  },
  cardHeaderLeft: {
    flex: 1,
    marginRight: Spacing.md,
  },
  quizTitle: {
    fontSize: FontSizes.xl,
    fontWeight: "700",
    marginBottom: Spacing.sm,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  difficultyBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
  },
  difficultyText: {
    fontSize: FontSizes.xs,
    fontWeight: "600",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: FontSizes.sm,
  },
  pointsContainer: {
    alignItems: "flex-end",
  },
  pointsValue: {
    fontSize: FontSizes.xxl,
    fontWeight: "700",
    color: "rgb(238, 58, 124)",
  },
  pointsLabel: {
    fontSize: FontSizes.xs,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statValue: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
  },
  statLabel: {
    fontSize: FontSizes.xs,
    marginTop: 2,
    textAlign: "center",
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    gap: 4,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
    minWidth: 80,
  },
  playButtonText: {
    color: "white",
    fontSize: FontSizes.sm,
    fontWeight: "600",
  },
  quizDescription: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
  },
  browseMoreSection: {
    marginTop: Spacing.xl,
    alignItems: "center",
    gap: Spacing.md,
  },
  browseMoreText: {
    fontSize: FontSizes.md,
    textAlign: "center",
  },
  browseMoreButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  browseMoreButtonText: {
    color: "rgb(238, 58, 124)",
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
});
