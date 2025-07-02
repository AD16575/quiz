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
  const { categoryId } = route.params as any;

  const difficultyColors = {
    Easy: "#10B981",
    Medium: "#F59E0B",
    Hard: "#EF4444",
  };

  const QuizCard = ({ quiz }: { quiz: any }) => (
    <TouchableOpacity
      style={styles.quizCard}
      onPress={() =>
        navigation.navigate("QuizPlay" as never, { quizId: quiz.id } as never)
      }
    >
      <View style={styles.quizHeader}>
        <Text style={styles.quizTitle}>{quiz.title}</Text>
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
            color={Colors.light.textSecondary}
          />
          <Text style={styles.statText}>{quiz.questions} Questions</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="time" size={16} color={Colors.light.textSecondary} />
          <Text style={styles.statText}>{quiz.timeLimit}m</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="star" size={16} color={Colors.light.accent} />
          <Text style={styles.statText}>{quiz.rating}</Text>
        </View>
      </View>

      <View style={styles.quizFooter}>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>+{quiz.pointsReward}</Text>
          <Text style={styles.pointsLabel}>points</Text>
        </View>
        <TouchableOpacity style={styles.playButton}>
          <Ionicons name="play" size={16} color="white" />
          <Text style={styles.playButtonText}>Play</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Quizzes</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {mockQuizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </View>
      </ScrollView>
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  placeholder: {
    width: 24,
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  quizCard: {
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    elevation: 2,
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
    color: Colors.light.text,
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
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
  },
  quizFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pointsContainer: {
    alignItems: "center",
  },
  pointsText: {
    fontSize: FontSizes.lg,
    fontWeight: "bold",
    color: Colors.light.primary,
  },
  pointsLabel: {
    fontSize: FontSizes.xs,
    color: Colors.light.textSecondary,
  },
  playButton: {
    backgroundColor: Colors.light.secondary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  playButtonText: {
    color: "white",
    fontSize: FontSizes.sm,
    fontWeight: "600",
  },
});
