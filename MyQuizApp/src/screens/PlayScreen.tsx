import React from "react";
import QuizCategoriesScreen from "./QuizCategoriesScreen";

export default function PlayScreen() {
  return <QuizCategoriesScreen />;
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
