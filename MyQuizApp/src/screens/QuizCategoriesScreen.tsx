import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";
import { useQuiz } from "../contexts/QuizContext";
import GradientBackground from "../components/common/GradientBackground";
import GradientText from "../components/common/GradientText";

export default function QuizCategoriesScreen() {
  const navigation = useNavigation();
  const { state: themeState } = useTheme();
  const { state } = useQuiz();

  const CategoryCard = ({ category }: { category: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        {
          backgroundColor: themeState.colors.surfaceCard,
          borderColor: themeState.colors.borderLight,
        },
      ]}
      onPress={() =>
        navigation.navigate(
          "QuizList" as never,
          {
            categoryId: category.id,
            categoryName: category.name,
          } as never,
        )
      }
    >
      <View
        style={[
          styles.categoryIcon,
          { backgroundColor: `${category.color}20` },
        ]}
      >
        <Text style={styles.categoryEmoji}>{category.icon}</Text>
      </View>
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
        <View
          style={[
            styles.quizCountBadge,
            { backgroundColor: `${category.color}15` },
          ]}
        >
          <Text style={[styles.quizCount, { color: category.color }]}>
            {category.quizCount} quizzes
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.playButton, { backgroundColor: category.color }]}
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
                  star <= 4 ? "rgb(255, 204, 0)" : themeState.colors.border,
              },
            ]}
          />
        ))}
      </View>
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
            <GradientText style={styles.title}>Quiz Categories</GradientText>
            <Text
              style={[
                styles.subtitle,
                { color: themeState.colors.textSecondary },
              ]}
            >
              Choose your favorite topic
            </Text>
          </View>
          {state.user && (
            <View style={styles.pointsContainer}>
              <Text
                style={[styles.pointsText, { color: themeState.colors.text }]}
              >
                {state.user.points} points
              </Text>
            </View>
          )}
        </View>

        <FlatList
          data={state.categories}
          renderItem={({ item }) => <CategoryCard category={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.categoriesContainer}
          showsVerticalScrollIndicator={false}
        />

        {/* Random Quiz Card */}
        <View style={styles.randomQuizContainer}>
          <View
            style={[
              styles.randomQuizCard,
              {
                backgroundColor: themeState.colors.surfaceCard,
                borderColor: "rgba(238, 58, 124, 0.2)",
              },
            ]}
          >
            <Ionicons name="shuffle" size={48} color="rgb(238, 58, 124)" />
            <Text
              style={[styles.randomTitle, { color: themeState.colors.text }]}
            >
              Can't Decide?
            </Text>
            <Text
              style={[
                styles.randomDescription,
                { color: themeState.colors.textSecondary },
              ]}
            >
              Let us pick a random quiz for you!
            </Text>
            <TouchableOpacity style={styles.surpriseButton}>
              <Text style={styles.surpriseButtonText}>Surprise Me!</Text>
            </TouchableOpacity>
          </View>
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
  pointsContainer: {
    alignItems: "flex-end",
  },
  pointsText: {
    fontSize: 14,
    fontWeight: "600",
  },
  categoriesContainer: {
    paddingBottom: 24,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  categoryCard: {
    flex: 1,
    marginHorizontal: 4,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    minHeight: 220,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryEmoji: {
    fontSize: 32,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  categoryDescription: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 20,
  },
  categoryStats: {
    marginTop: "auto",
    width: "100%",
    alignItems: "center",
    gap: 8,
  },
  quizCountBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  quizCount: {
    fontSize: 12,
    fontWeight: "600",
  },
  playButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  playButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: 8,
    gap: 4,
  },
  star: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  randomQuizContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  randomQuizCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: "center",
  },
  randomTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
  },
  randomDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  surpriseButton: {
    backgroundColor: "rgb(238, 58, 124)",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgb(238, 58, 124)",
  },
  surpriseButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
