import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useQuiz } from "../contexts/QuizContext";

const { width } = Dimensions.get("window");

export default function PlayScreen() {
  const navigation = useNavigation();
  const { state } = useQuiz();
  const { categories, user } = state;

  const CategoryCard = ({
    category,
    index,
  }: {
    category: any;
    index: number;
  }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: category.color + "15" }]}
      onPress={() =>
        navigation.navigate(
          "QuizList" as never,
          { categoryId: category.id } as never,
        )
      }
    >
      <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
        <Text style={styles.categoryEmoji}>{category.icon}</Text>
      </View>
      <View style={styles.categoryContent}>
        <Text style={styles.categoryName}>{category.name}</Text>
        <Text style={styles.categoryDescription}>{category.description}</Text>
        <View style={styles.categoryStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{20 + index * 5}</Text>
            <Text style={styles.statLabel}>Quizzes</Text>
          </View>
          <TouchableOpacity
            style={[styles.playButton, { backgroundColor: category.color }]}
          >
            <Text style={styles.playButtonText}>Play Now</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.difficultyIndicator}>
          {[1, 2, 3, 4, 5].map((star) => (
            <View
              key={star}
              style={[
                styles.star,
                {
                  backgroundColor:
                    star <= 4 ? Colors.light.accent : Colors.light.border,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Quiz Categories</Text>
          <Text style={styles.subtitle}>Choose your favorite topic</Text>
        </View>
        {user && (
          <View style={styles.pointsContainer}>
            <Ionicons name="star" size={20} color={Colors.light.accent} />
            <Text style={styles.pointsText}>{user.points}</Text>
          </View>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories Grid */}
        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </View>

        {/* Random Quiz Section */}
        <View style={styles.randomSection}>
          <View style={styles.randomCard}>
            <View style={styles.randomIcon}>
              <Ionicons name="shuffle" size={48} color={Colors.light.primary} />
            </View>
            <Text style={styles.randomTitle}>Can't Decide?</Text>
            <Text style={styles.randomSubtitle}>
              Let us pick a random quiz for you!
            </Text>
            <TouchableOpacity
              style={styles.surpriseButton}
              onPress={() => {
                const randomCategory =
                  categories[Math.floor(Math.random() * categories.length)];
                navigation.navigate(
                  "QuizList" as never,
                  { categoryId: randomCategory.id } as never,
                );
              }}
            >
              <Text style={styles.surpriseButtonText}>Surprise Me!</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.light.textSecondary,
    marginTop: 4,
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    gap: Spacing.xs,
  },
  pointsText: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    color: Colors.light.text,
  },
  categoriesContainer: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  categoryCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIcon: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.xl,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  categoryEmoji: {
    fontSize: 40,
  },
  categoryContent: {
    flex: 1,
  },
  categoryName: {
    fontSize: FontSizes.lg,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  categoryDescription: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.md,
  },
  categoryStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: Colors.light.primary,
  },
  statLabel: {
    fontSize: FontSizes.xs,
    color: Colors.light.textSecondary,
  },
  playButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  playButtonText: {
    color: "white",
    fontSize: FontSizes.sm,
    fontWeight: "600",
  },
  difficultyIndicator: {
    flexDirection: "row",
    gap: 4,
  },
  star: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  randomSection: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  randomCard: {
    backgroundColor: `${Colors.light.primary}15`,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: "center",
    borderWidth: 2,
    borderColor: `${Colors.light.primary}30`,
  },
  randomIcon: {
    marginBottom: Spacing.md,
  },
  randomTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: Spacing.sm,
  },
  randomSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  surpriseButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
  },
  surpriseButtonText: {
    color: "white",
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
});
