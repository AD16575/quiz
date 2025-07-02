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
import { useTheme } from "../contexts/ThemeContext";

const { width } = Dimensions.get("window");

export default function PlayScreen() {
  const navigation = useNavigation();
  const { state } = useQuiz();
  const { state: themeState } = useTheme();
  const { categories, user } = state;

  const CategoryCard = ({
    category,
    index,
  }: {
    category: any;
    index: number;
  }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        { backgroundColor: themeState.colors.surface },
      ]}
      onPress={() =>
        navigation.navigate(
          "QuizList" as never,
          { categoryId: category.id } as never,
        )
      }
      activeOpacity={0.8}
    >
      <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
        <Text style={styles.categoryEmoji}>{category.icon}</Text>
      </View>
      <View style={styles.categoryContent}>
        <Text style={[styles.categoryName, { color: themeState.colors.text }]}>
          {category.name}
        </Text>
        <Text
          style={[
            styles.categoryDescription,
            { color: themeState.colors.textSecondary },
          ]}
        >
          {category.description}
        </Text>
        <View style={styles.categoryStats}>
          <View style={styles.statItem}>
            <Text
              style={[styles.statNumber, { color: themeState.colors.text }]}
            >
              {20 + index * 5}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: themeState.colors.textSecondary },
              ]}
            >
              Quizzes
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.playButton, { backgroundColor: category.color }]}
            onPress={(e) => {
              e.stopPropagation(); // Prevent parent TouchableOpacity from firing
              navigation.navigate(
                "QuizList" as never,
                { categoryId: category.id } as never,
              );
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="play" size={16} color="white" />
            <Text style={styles.playButtonText}>Play</Text>
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
                    star <= 4 ? Colors.light.accent : themeState.colors.border,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </TouchableOpacity>
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
        <View>
          <Text style={[styles.title, { color: themeState.colors.text }]}>
            Quiz Categories
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: themeState.colors.textSecondary },
            ]}
          >
            Choose your favorite topic
          </Text>
        </View>
        {user && (
          <View
            style={[
              styles.pointsContainer,
              { backgroundColor: themeState.colors.surface },
            ]}
          >
            <Ionicons name="star" size={20} color={Colors.light.accent} />
            <Text
              style={[styles.pointsText, { color: themeState.colors.text }]}
            >
              {user.points}
            </Text>
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
          <View
            style={[
              styles.randomCard,
              { backgroundColor: themeState.colors.surface },
            ]}
          >
            <View style={styles.randomIcon}>
              <Ionicons name="shuffle" size={48} color={Colors.light.primary} />
            </View>
            <Text
              style={[styles.randomTitle, { color: themeState.colors.text }]}
            >
              Can't Decide?
            </Text>
            <Text
              style={[
                styles.randomSubtitle,
                { color: themeState.colors.textSecondary },
              ]}
            >
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
              activeOpacity={0.8}
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
  },
  subtitle: {
    fontSize: FontSizes.md,
    marginTop: 4,
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    gap: Spacing.xs,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  pointsText: {
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
  categoriesContainer: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  categoryCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryIcon: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.xl,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.lg,
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
    marginBottom: Spacing.xs,
  },
  categoryDescription: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.md,
    lineHeight: 18,
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
  },
  statLabel: {
    fontSize: FontSizes.xs,
  },
  playButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
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
  difficultyIndicator: {
    flexDirection: "row",
    gap: 6,
  },
  star: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  randomSection: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  randomCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  randomIcon: {
    marginBottom: Spacing.md,
  },
  randomTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "bold",
    marginBottom: Spacing.sm,
  },
  randomSubtitle: {
    fontSize: FontSizes.sm,
    textAlign: "center",
    marginBottom: Spacing.lg,
    lineHeight: 18,
  },
  surpriseButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  surpriseButtonText: {
    color: "white",
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
});
