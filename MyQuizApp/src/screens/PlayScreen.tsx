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
import { useTheme } from "../contexts/ThemeContext";
import { useQuiz } from "../contexts/QuizContext";
import GradientBackground from "../components/common/GradientBackground";
import GradientText from "../components/common/GradientText";

export default function PlayScreen() {
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
      </View>
    </TouchableOpacity>
  );

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <GradientText style={styles.title}>Choose Category</GradientText>
          <Text
            style={[
              styles.subtitle,
              { color: themeState.colors.textSecondary },
            ]}
          >
            Select a category to start playing
          </Text>
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
    paddingVertical: 24,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
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
    minHeight: 180,
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
});
