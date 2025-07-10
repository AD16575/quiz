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
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useQuiz } from "../contexts/QuizContext";
import { useTheme } from "../contexts/ThemeContext";
import GradientBackground from "../components/common/GradientBackground";
import Logo from "../components/common/Logo";
import GradientText from "../components/common/GradientText";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation();
  const { state } = useQuiz();
  const { state: themeState } = useTheme();
  const { user, categories } = state;

  if (!user) return null;

  const featuredCategories = categories.slice(0, 4);
  const dynamicStyles = createStyles(themeState.colors);

  const PointCard = ({
    title,
    value,
    icon,
    variant,
  }: {
    title: string;
    value: number;
    icon: keyof typeof Ionicons.glyphMap;
    variant: "default" | "earned" | "withdrawable";
  }) => {
    const gradientColors = {
      default: ["rgb(24, 154, 144)", "rgba(24, 154, 144, 0.8)"],
      earned: ["rgb(255, 204, 0)", "rgb(249, 115, 22)"],
      withdrawable: ["rgb(238, 58, 124)", "rgb(147, 51, 234)"],
    };

    return (
      <LinearGradient
        colors={gradientColors[variant]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={dynamicStyles.pointCard}
      >
        <View style={dynamicStyles.pointContent}>
          <Ionicons
            name={icon}
            size={24}
            color="white"
            style={dynamicStyles.pointIcon}
          />
          <View style={dynamicStyles.pointText}>
            <Text style={dynamicStyles.pointTitle}>{title}</Text>
            <Text style={dynamicStyles.pointValue}>
              {variant === "withdrawable"
                ? `₹${value}`
                : value.toLocaleString()}
            </Text>
          </View>
        </View>
      </LinearGradient>
    );
  };

  const CategoryCard = ({ category }: { category: any }) => (
    <TouchableOpacity
      style={[
        dynamicStyles.categoryCard,
        { backgroundColor: category.color + "15" },
      ]}
      onPress={() =>
        navigation.navigate(
          "QuizList" as never,
          { categoryId: category.id } as never,
        )
      }
    >
      <View
        style={[
          dynamicStyles.categoryIcon,
          { backgroundColor: category.color },
        ]}
      >
        <Text style={dynamicStyles.categoryEmoji}>{category.icon}</Text>
      </View>
      <Text
        style={[dynamicStyles.categoryName, { color: themeState.colors.text }]}
      >
        {category.name}
      </Text>
      <Text
        style={[
          dynamicStyles.categoryDescription,
          { color: themeState.colors.textSecondary },
        ]}
        numberOfLines={2}
      >
        {category.description}
      </Text>
    </TouchableOpacity>
  );

  const ActionCard = ({
    title,
    subtitle,
    icon,
    color,
    onPress,
  }: {
    title: string;
    subtitle: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[
        dynamicStyles.actionCard,
        { backgroundColor: themeState.colors.surface },
      ]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={48} color={color} style={styles.actionIcon} />
      <Text style={[styles.actionTitle, { color: themeState.colors.text }]}>
        {title}
      </Text>
      <Text
        style={[
          styles.actionSubtitle,
          { color: themeState.colors.textSecondary },
        ]}
      >
        {subtitle}
      </Text>
      <TouchableOpacity
        style={[styles.actionButton, { borderColor: color }]}
        onPress={onPress}
      >
        <Text style={[styles.actionButtonText, { color }]}>View Details</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <GradientBackground>
      <SafeAreaView style={dynamicStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={dynamicStyles.scrollContent}
          nestedScrollEnabled={true}
        >
          {/* Header - Matching web dashboard */}
          <View style={dynamicStyles.header}>
            <View style={dynamicStyles.headerContent}>
              <Logo size="small" />
              <View style={dynamicStyles.headerText}>
                <GradientText style={dynamicStyles.appName}>
                  MyQuiz
                </GradientText>
                <Text
                  style={[
                    dynamicStyles.greeting,
                    { color: themeState.colors.text },
                  ]}
                >
                  Hello, {user.name}! 👋
                </Text>
                <Text
                  style={[
                    dynamicStyles.subGreeting,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  Ready to play?
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                dynamicStyles.settingsButton,
                { backgroundColor: themeState.colors.surfaceCard },
              ]}
              onPress={() => navigation.navigate("Profile" as never)}
            >
              <Ionicons
                name="settings-outline"
                size={24}
                color={themeState.colors.text}
              />
            </TouchableOpacity>
          </View>

          {/* Quick Stats - Matching web version */}
          <View style={dynamicStyles.statsContainer}>
            <PointCard
              title="Total Points"
              value={user.points}
              icon="star"
              variant="default"
            />
            <PointCard
              title="Quizzes Played"
              value={user.totalQuizzes}
              icon="play-circle"
              variant="earned"
            />
            <PointCard
              title="Withdrawable"
              value={user.withdrawableAmount}
              icon="wallet"
              variant="withdrawable"
            />
          </View>

          {/* Play Now Section - Exact web match */}
          <View style={styles.playSection}>
            <View
              style={[
                styles.playCard,
                {
                  backgroundColor: "rgba(238, 58, 124, 0.1)",
                  borderColor: "rgba(238, 58, 124, 0.2)",
                },
              ]}
            >
              <View style={styles.playContent}>
                <Ionicons
                  name="flash"
                  size={64}
                  color="rgb(238, 58, 124)"
                  style={styles.playIcon}
                />
                <Text
                  style={[styles.playTitle, { color: themeState.colors.text }]}
                >
                  Ready to Play?
                </Text>
                <Text
                  style={[
                    styles.playSubtitle,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  Choose from various categories and start earning points!
                </Text>
                <TouchableOpacity
                  style={[
                    styles.playButton,
                    { backgroundColor: "rgb(238, 58, 124)" },
                  ]}
                  onPress={() => navigation.navigate("QuizCategories" as never)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="play" size={20} color="white" />
                  <Text style={styles.playButtonText}>Play Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Quick Actions - Matching web dashboard cards */}
          <View style={styles.quickActionsSection}>
            <Text
              style={[styles.sectionTitle, { color: themeState.colors.text }]}
            >
              Quick Actions
            </Text>
            <View style={styles.quickActionsGrid}>
              <ActionCard
                title="Referral Program"
                subtitle={`${user.referredUsers} Friends Referred`}
                icon="people"
                color="rgb(24, 154, 144)"
                onPress={() => navigation.navigate("Profile" as never)}
              />
              <ActionCard
                title="Withdrawal"
                subtitle={`₹${user.withdrawableAmount} Available`}
                icon="wallet"
                color="rgb(255, 204, 0)"
                onPress={() => navigation.navigate("Profile" as never)}
              />
            </View>
          </View>

          {/* Recent Activity - Matching web version */}
          <View style={styles.activitySection}>
            <Text
              style={[styles.sectionTitle, { color: themeState.colors.text }]}
            >
              Recent Achievements
            </Text>
            <View
              style={[
                styles.activityCard,
                { backgroundColor: themeState.colors.surface },
              ]}
            >
              <View
                style={[
                  styles.activityItem,
                  { backgroundColor: "rgba(238, 58, 124, 0.1)" },
                ]}
              >
                <View style={styles.activityContent}>
                  <Text
                    style={[
                      styles.activityTitle,
                      { color: themeState.colors.text },
                    ]}
                  >
                    Quiz Master
                  </Text>
                  <Text
                    style={[
                      styles.activityDescription,
                      { color: themeState.colors.textSecondary },
                    ]}
                  >
                    Completed 10 quizzes
                  </Text>
                </View>
                <View style={styles.activityPoints}>
                  <Text style={styles.activityPointsText}>+100 points</Text>
                </View>
              </View>
              <View
                style={[
                  styles.activityItem,
                  { backgroundColor: "rgba(24, 154, 144, 0.1)" },
                ]}
              >
                <View style={styles.activityContent}>
                  <Text
                    style={[
                      styles.activityTitle,
                      { color: themeState.colors.text },
                    ]}
                  >
                    First Referral
                  </Text>
                  <Text
                    style={[
                      styles.activityDescription,
                      { color: themeState.colors.textSecondary },
                    ]}
                  >
                    Referred your first friend
                  </Text>
                </View>
                <View style={styles.activityPoints}>
                  <Text
                    style={[
                      styles.activityPointsText,
                      { color: "rgb(24, 154, 144)" },
                    ]}
                  >
                    +50 points
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: 100,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.lg,
    },
    headerContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
      flex: 1,
    },
    headerText: {
      flex: 1,
    },
    appName: {
      fontSize: FontSizes.lg,
      fontWeight: "700",
      marginBottom: 2,
    },
    greeting: {
      fontSize: FontSizes.lg,
      fontWeight: "600",
      marginBottom: 2,
    },
    subGreeting: {
      fontSize: FontSizes.sm,
    },
    settingsButton: {
      padding: Spacing.sm,
      borderRadius: BorderRadius.full,
      shadowColor: "rgba(0, 0, 0, 0.1)",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 3,
    },
    statsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      paddingHorizontal: Spacing.md,
      gap: Spacing.sm,
      marginBottom: Spacing.lg,
    },
    pointCard: {
      flex: 1,
      borderRadius: BorderRadius.xl,
      padding: Spacing.lg,
      minWidth: (width - Spacing.md * 2 - Spacing.sm) / 3 - Spacing.sm,
      shadowColor: "rgba(0, 0, 0, 0.1)",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 12,
      elevation: 5,
    },
    pointContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
    },
    pointIcon: {
      marginRight: 0,
    },
    pointText: {
      flex: 1,
    },
    pointTitle: {
      fontSize: FontSizes.xs,
      color: "rgba(255, 255, 255, 0.8)",
      marginBottom: 2,
    },
    pointValue: {
      fontSize: FontSizes.lg,
      fontWeight: "700",
      color: "white",
    },
  });

const styles = StyleSheet.create({
  playSection: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xl,
  },
  playCard: {
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
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
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  playSubtitle: {
    fontSize: FontSizes.md,
    textAlign: "center",
    marginBottom: Spacing.lg,
    lineHeight: 20,
  },
  playButton: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  playButtonText: {
    color: "white",
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
  quickActionsSection: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    marginBottom: Spacing.md,
  },
  quickActionsGrid: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  actionCard: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIcon: {
    marginBottom: Spacing.sm,
  },
  actionTitle: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
  actionSubtitle: {
    fontSize: FontSizes.xs,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  actionButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: "500",
  },
  activitySection: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xl,
  },
  activityCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.sm,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    marginBottom: 2,
  },
  activityDescription: {
    fontSize: FontSizes.sm,
  },
  activityPoints: {
    alignItems: "flex-end",
  },
  activityPointsText: {
    fontSize: FontSizes.md,
    fontWeight: "bold",
    color: "rgb(238, 58, 124)",
  },
});
