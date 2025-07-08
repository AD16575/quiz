import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";
import GradientBackground from "../components/common/GradientBackground";
import GradientText from "../components/common/GradientText";

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
  const { state: themeState } = useTheme();
  const { categoryId, categoryName } = route.params as any;

  const difficultyColors = {
    Easy: { bg: "rgba(34, 197, 94, 0.1)", text: "rgb(34, 197, 94)" },
    Medium: { bg: "rgba(245, 158, 11, 0.1)", text: "rgb(245, 158, 11)" },
    Hard: { bg: "rgba(239, 68, 68, 0.1)", text: "rgb(239, 68, 68)" },
  };

  const QuizCard = ({ quiz }: { quiz: any }) => (
    <TouchableOpacity
      style={[
        styles.quizCard,
        {
          backgroundColor: themeState.colors.surfaceCard,
          borderColor: themeState.colors.borderLight,
        },
      ]}
      onPress={() =>
        navigation.navigate("QuizPlay" as never, { quizId: quiz.id } as never)
      }
    >
      <View style={styles.quizHeader}>
        <View style={styles.quizInfo}>
          <Text style={[styles.quizTitle, { color: themeState.colors.text }]}>
            {quiz.title}
          </Text>
          <View style={styles.badgeContainer}>
            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: difficultyColors[quiz.difficulty].bg },
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
            <View style={styles.rating}>
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
        <View style={styles.pointsSection}>
          <Text style={styles.pointsValue}>+{quiz.pointsReward}</Text>
          <Text
            style={[styles.pointsLabel, { color: themeState.colors.textMuted }]}
          >
            points
          </Text>
        </View>
      </View>

      <View style={styles.quizStats}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: themeState.colors.text }]}>
            {quiz.questions}
          </Text>
          <Text
            style={[styles.statLabel, { color: themeState.colors.textMuted }]}
          >
            Questions
          </Text>
        </View>
        <View style={styles.statItem}>
          <View style={styles.timeContainer}>
            <Ionicons
              name="time"
              size={16}
              color={themeState.colors.textSecondary}
            />
            <Text style={[styles.statValue, { color: themeState.colors.text }]}>
              {quiz.timeLimit}m
            </Text>
          </View>
          <Text
            style={[styles.statLabel, { color: themeState.colors.textMuted }]}
          >
            Time Limit
          </Text>
        </View>
        <View style={styles.statItem}>
          <View style={styles.timeContainer}>
            <Ionicons
              name="trophy"
              size={16}
              color={themeState.colors.textSecondary}
            />
            <Text style={[styles.statValue, { color: themeState.colors.text }]}>
              {quiz.completedBy}
            </Text>
          </View>
          <Text
            style={[styles.statLabel, { color: themeState.colors.textMuted }]}
          >
            Completed
          </Text>
        </View>
        <TouchableOpacity style={styles.playButton}>
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
    </TouchableOpacity>
  );

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
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
              size={24}
              color={themeState.colors.text}
            />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <GradientText style={styles.title}>{categoryName}</GradientText>
            <Text
              style={[
                styles.subtitle,
                { color: themeState.colors.textSecondary },
              ]}
            >
              {mockQuizzes.length} quizzes available
            </Text>
          </View>
        </View>

        <FlatList
          data={mockQuizzes}
          renderItem={({ item }) => <QuizCard quiz={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />

        {/* Footer */}
        <View style={styles.footer}>
          <Text
            style={[
              styles.footerText,
              { color: themeState.colors.textSecondary },
            ]}
          >
            Looking for more quizzes?
          </Text>
          <TouchableOpacity
            style={[styles.browseButton, { borderColor: "rgb(238, 58, 124)" }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.browseButtonText}>Browse All Categories</Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  listContainer: {
    paddingBottom: 24,
  },
  quizCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  quizHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  quizInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: "600",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
  },
  pointsSection: {
    alignItems: "flex-end",
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "rgb(238, 58, 124)",
  },
  pointsLabel: {
    fontSize: 12,
  },
  quizStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  playButton: {
    backgroundColor: "rgb(24, 154, 144)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  playButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  quizDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 16,
    marginBottom: 16,
  },
  browseButton: {
    borderWidth: 2,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  browseButtonText: {
    color: "rgb(238, 58, 124)",
    fontSize: 16,
    fontWeight: "600",
  },
});
