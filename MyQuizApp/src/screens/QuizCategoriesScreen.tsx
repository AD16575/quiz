import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useQuiz } from "../contexts/QuizContext";
import { useTheme } from "../contexts/ThemeContext";
import SafeGradientBackground from "../components/common/SafeGradientBackground";
import api from "../lib/api";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type NavigationProp = StackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get("window");

const categories = [
  {
    id: "general",
    name: "General Knowledge",
    icon: "library-outline",
    color: "rgb(147, 51, 234)",
    description: "Test your general knowledge",
    quizCount: 25,
  },
  {
    id: "current-affairs",
    name: "Current Affairs",
    icon: "newspaper-outline",
    color: "rgb(59, 130, 246)",
    description: "Stay updated with latest news",
    quizCount: 18,
  },
  {
    id: "technology",
    name: "Technology",
    icon: "phone-portrait-outline",
    color: "rgb(34, 197, 94)",
    description: "Tech trends and innovations",
    quizCount: 22,
  },
  {
    id: "geography",
    name: "Geography",
    icon: "earth-outline",
    color: "rgb(249, 115, 22)",
    description: "Explore the world",
    quizCount: 16,
  },
  {
    id: "health",
    name: "Health & Fitness",
    icon: "heart-outline",
    color: "rgb(239, 68, 68)",
    description: "Health and wellness topics",
    quizCount: 14,
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: "musical-notes-outline",
    color: "rgb(236, 72, 153)",
    description: "Movies, music, and pop culture",
    quizCount: 20,
  },
];

export default function QuizCategoriesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { state } = useQuiz();
  const { state: themeState } = useTheme();
  const { user } = state;

  const [categories, setCategories] = useState(categoriesData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      console.log("📚 Fetching categories...");
      setLoading(true);

      const response = await api.getCategories();
      console.log("✅ Categories fetched:", response);

      // Use API categories if available, otherwise fallback to mock data
      if (response && Array.isArray(response)) {
        setCategories(response);
      } else if (response?.data && Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        console.log("📚 Using fallback categories data");
        setCategories(categoriesData);
      }
    } catch (error: any) {
      console.error("❌ Failed to fetch categories:", error);
      setError("Failed to load categories");
      // Use fallback data on error
      setCategories(categoriesData);
    } finally {
      setLoading(false);
    }
  };

  const CategoryCard = ({ category }: { category: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        { backgroundColor: themeState.colors.surface },
      ]}
      onPress={() =>
        navigation.navigate("QuizList", { categoryId: category.id })
      }
      activeOpacity={0.8}
    >
      <View style={styles.categoryContent}>
        {/* Icon */}
        <View
          style={[
            styles.categoryIconContainer,
            { backgroundColor: category.color },
          ]}
        >
          <Ionicons
            name={category.icon as keyof typeof Ionicons.glyphMap}
            size={32}
            color="white"
          />
        </View>

        {/* Content */}
        <View style={styles.categoryTextContent}>
          <Text
            style={[styles.categoryName, { color: themeState.colors.text }]}
          >
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
        </View>

        {/* Quiz Count and Rating */}
        <View style={styles.categoryFooter}>
          <View style={styles.categoryStats}>
            <Text style={[styles.quizCount, { color: "rgb(238, 58, 124)" }]}>
              {category.quizCount}
            </Text>
            <Text
              style={[
                styles.quizLabel,
                { color: themeState.colors.textSecondary },
              ]}
            >
              Quizzes
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.playButton,
              { backgroundColor: "rgb(24, 154, 144)" },
            ]}
            onPress={() =>
              navigation.navigate("QuizList", { categoryId: category.id })
            }
          >
            <Text style={styles.playButtonText}>Play Now</Text>
          </TouchableOpacity>
        </View>

        {/* Rating Stars */}
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <View
              key={star}
              style={[
                styles.star,
                {
                  backgroundColor:
                    star <= 4
                      ? "rgb(255, 204, 0)"
                      : themeState.isDark
                        ? "rgb(55, 65, 81)"
                        : "rgb(229, 231, 235)",
                },
              ]}
            />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeGradientBackground style={styles.container}>
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
              Quiz Categories
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: themeState.colors.textSecondary },
              ]}
            >
              Choose your favorite topic
            </Text>
          </View>
        </View>
        {user && (
          <View style={styles.pointsContainer}>
            <Text
              style={[styles.pointsText, { color: themeState.colors.text }]}
            >
              {user.points} points
            </Text>
          </View>
        )}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Categories Grid */}
        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </View>

        {/* Random Quiz Card */}
        <View style={styles.randomQuizSection}>
          <View
            style={[
              styles.randomQuizCard,
              {
                backgroundColor: "rgba(238, 58, 124, 0.1)",
                borderColor: "rgba(238, 58, 124, 0.2)",
              },
            ]}
          >
            <View style={styles.randomQuizContent}>
              <Ionicons
                name="library-outline"
                size={48}
                color="rgb(238, 58, 124)"
                style={styles.randomQuizIcon}
              />
              <Text
                style={[
                  styles.randomQuizTitle,
                  { color: themeState.colors.text },
                ]}
              >
                Can't Decide?
              </Text>
              <Text
                style={[
                  styles.randomQuizDescription,
                  { color: themeState.colors.textSecondary },
                ]}
              >
                Let us pick a random quiz for you!
              </Text>
              <TouchableOpacity
                style={[
                  styles.surpriseButton,
                  { borderColor: "rgb(238, 58, 124)" },
                ]}
                onPress={() => navigation.navigate("QuizRandom")}
              >
                <Text style={styles.surpriseButtonText}>Surprise Me!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeGradientBackground>
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
    // paddingTop: 30,
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
  pointsContainer: {
    alignItems: "flex-end",
  },
  pointsText: {
    fontSize: FontSizes.sm,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingBottom: 100,
  },
  categoriesContainer: {
    gap: Spacing.md,
  },
  categoryCard: {
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
  categoryContent: {
    gap: Spacing.md,
  },
  categoryIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryTextContent: {
    gap: 4,
  },
  categoryName: {
    fontSize: FontSizes.xl,
    fontWeight: "700",
  },
  categoryDescription: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
  },
  categoryFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryStats: {
    alignItems: "flex-start",
  },
  quizCount: {
    fontSize: FontSizes.xxl,
    fontWeight: "700",
  },
  quizLabel: {
    fontSize: FontSizes.xs,
    marginTop: 2,
  },
  playButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  playButtonText: {
    color: "white",
    fontSize: FontSizes.sm,
    fontWeight: "600",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  star: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  randomQuizSection: {
    marginTop: Spacing.xl,
    alignItems: "center",
  },
  randomQuizCard: {
    maxWidth: 448,
    width: "100%",
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  randomQuizContent: {
    padding: Spacing.lg,
    alignItems: "center",
  },
  randomQuizIcon: {
    marginBottom: Spacing.md,
  },
  randomQuizTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "700",
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  randomQuizDescription: {
    fontSize: FontSizes.sm,
    textAlign: "center",
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  surpriseButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  surpriseButtonText: {
    color: "rgb(238, 58, 124)",
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
});
