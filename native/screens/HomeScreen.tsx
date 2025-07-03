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
import GradientBackground from "../components/common/GradientBackground";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation();
  const { state } = useQuiz();
  const { state: themeState } = useTheme();
  const { user, categories } = state;

  if (!user) return null;

  const featuredCategories = categories.slice(0, 4); // Show first 4 categories

  const StatCard = ({
    title,
    value,
    icon,
    color,
  }: {
    title: string;
    value: number;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
  }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statContent}>
        <View style={[styles.statIcon, { backgroundColor: color + "20" }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <View style={styles.statText}>
          <Text style={styles.statValue}>{value.toLocaleString()}</Text>
          <Text style={styles.statTitle}>{title}</Text>
        </View>
      </View>
    </View>
  );

  const CategoryCard = ({ category }: { category: any }) => (
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
      <Text style={styles.categoryName}>{category.name}</Text>
      <Text style={styles.categoryDescription} numberOfLines={2}>
        {category.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: themeState.colors.background },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        nestedScrollEnabled={true}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user.name}! 👋</Text>
            <Text style={styles.subGreeting}>Ready to play today?</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={Colors.light.text}
            />
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <StatCard
            title="Total Points"
            value={user.points}
            icon="star"
            color={Colors.light.primary}
          />
          <StatCard
            title="Quizzes Played"
            value={user.totalQuizzes}
            icon="play-circle"
            color={Colors.light.secondary}
          />
          <StatCard
            title="Withdrawable"
            value={user.withdrawableAmount}
            icon="wallet"
            color={Colors.light.accent}
          />
          <StatCard
            title="Referrals"
            value={user.referredUsers}
            icon="people"
            color="#8B5CF6"
          />
        </View>

        {/* Play Now Section */}
        <View style={styles.playSection}>
          <View style={styles.playCard}>
            <View style={styles.playContent}>
              <Ionicons
                name="flash"
                size={48}
                color={Colors.light.primary}
                style={styles.playIcon}
              />
              <Text style={styles.playTitle}>Ready to Play?</Text>
              <Text style={styles.playSubtitle}>
                Choose from various categories and start earning points!
              </Text>
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => navigation.navigate("Play" as never)}
                activeOpacity={0.8}
              >
                <Ionicons name="play" size={20} color="white" />
                <Text style={styles.playButtonText}>Play Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Play" as never)}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.categoriesGrid}>
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate("Referral" as never)}
            >
              <Ionicons
                name="people"
                size={32}
                color={Colors.light.secondary}
              />
              <Text style={styles.quickActionTitle}>Refer Friends</Text>
              <Text style={styles.quickActionSubtitle}>
                {user.referredUsers} referred
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate("Withdrawal" as never)}
            >
              <Ionicons name="wallet" size={32} color={Colors.light.accent} />
              <Text style={styles.quickActionTitle}>Withdraw</Text>
              <Text style={styles.quickActionSubtitle}>
                ₹{user.withdrawableAmount} available
              </Text>
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  greeting: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  subGreeting: {
    fontSize: FontSizes.md,
    color: Colors.light.textSecondary,
    marginTop: 4,
  },
  notificationButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.light.surface,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderLeftWidth: 4,
    minWidth: (width - Spacing.md * 2 - Spacing.sm) / 2 - Spacing.sm,
  },
  statContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
  },
  statText: {
    flex: 1,
  },
  statValue: {
    fontSize: FontSizes.lg,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  statTitle: {
    fontSize: FontSizes.xs,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  playSection: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  playCard: {
    backgroundColor: `${Colors.light.primary}15`,
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    borderColor: `${Colors.light.primary}30`,
  },
  playContent: {
    padding: Spacing.xl,
    alignItems: "center",
  },
  playIcon: {
    marginBottom: Spacing.md,
  },
  playTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: Spacing.sm,
  },
  playSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.light.textSecondary,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  playButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  playButtonText: {
    color: "white",
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
  section: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  seeAllText: {
    fontSize: FontSizes.md,
    color: Colors.light.primary,
    fontWeight: "600",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  categoryCard: {
    width: (width - Spacing.md * 2 - Spacing.sm) / 2,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.xl,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  categoryEmoji: {
    fontSize: 30,
  },
  categoryName: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: Spacing.xs,
  },
  categoryDescription: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    textAlign: "center",
  },
  quickActions: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: Colors.light.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
  },
  quickActionTitle: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    color: Colors.light.text,
    marginTop: Spacing.sm,
  },
  quickActionSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
});
