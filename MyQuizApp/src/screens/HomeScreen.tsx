import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { GlobalStyles, GradientColors } from "../styles/globalStyles";
import {
  PointCard,
  Card,
  Button,
  Header,
  IconContainer,
} from "../components/common";
import { useQuiz } from "../contexts/QuizContext";
import { useTheme } from "../contexts/ThemeContext";
import SafeGradientBackground from "../components/common/SafeGradientBackground";
import Logo from "../components/common/Logo";
import GradientText from "../components/common/GradientText";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type NavigationProp = StackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { state } = useQuiz();
  const { state: themeState } = useTheme();
  const { user, categories } = state;

  if (!user) return null;

  // Using the global PointCard component

  const ActionCard = ({
    title,
    value,
    subtitle,
    icon,
    color,
    onPress,
    bgcolor,
  }: {
    title: string;
    value: number;
    subtitle: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
    onPress: () => void;
    bgcolor: string;
  }) => (
    <TouchableOpacity
      style={[
        styles.actionCard,
        { backgroundColor: bgcolor, borderColor: color },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.actionHeader}>
        <View
          style={[styles.actionIconContainer, { borderColor: color + "20" }]}
        >
          <Ionicons name={icon} size={48} color={color} />
        </View>
        <Text style={[styles.actionTitle, { color: themeState.colors.text }]}>
          {title}
        </Text>
      </View>
      <View style={styles.actionContent}>
        <Text style={[styles.actionValue, { color }]}>
          {title === "Withdrawal" ? `₹${value}` : value}
        </Text>
        <Text
          style={[
            styles.actionSubtitle,
            { color: themeState.colors.textSecondary },
          ]}
        >
          {subtitle}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.actionButton, { borderColor: color }]}
        onPress={onPress}
      >
        <Text style={[styles.actionButtonText, { color }]}>
          {title === "Referral Program"
            ? "View Details"
            : title === "Withdrawal"
              ? "Withdraw Now"
              : "View History"}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeGradientBackground style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerText}>
              <Text
                style={[styles.greeting, { color: themeState.colors.text }]}
              >
                Hello, {user.name}! 👋
              </Text>
              <Text
                style={[
                  styles.subGreeting,
                  { color: themeState.colors.textSecondary },
                ]}
              >
                Ready to play?
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.settingsButton,
              { backgroundColor: themeState.colors.surfaceCard },
            ]}
            onPress={() => navigation.navigate("Profile")}
          >
            <Ionicons
              name="settings-outline"
              size={24}
              color={themeState.colors.text}
            />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <PointCard
            title="Total Points"
            value={user.points}
            icon="star"
            variant={themeState.isDark ? "defaultDark" : "default"}
          />
          <PointCard
            title="Quizzes Played"
            value={user.totalQuizzes}
            icon="play-circle"
            variant={themeState.isDark ? "earnedDark" : "earned"}
          />
          <PointCard
            title="Withdraw"
            value={user.withdrawableAmount}
            icon="wallet"
            variant={themeState.isDark ? "withdrawableDark" : "withdrawable"}
          />
        </View>

                {/* Play Now Section */}
        <View style={styles.playSection}>
          <Card
            variant="outline"
            style={{
              backgroundColor: "rgba(238, 58, 124, 0.1)",
              borderColor: "rgba(238, 58, 124, 0.2)",
            }}
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
                onPress={() => navigation.navigate("QuizCategories")}
                activeOpacity={0.8}
              >
                <Ionicons name="play" size={20} color="white" />
                <Text style={styles.playButtonText}>Play Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text
            style={[styles.sectionTitle, { color: themeState.colors.text }]}
          >
            Quick Actions
          </Text>
          <View style={styles.quickActionsGrid}>
            <ActionCard
              title="Referral Program"
              value={user.referredUsers}
              subtitle="Friends Referred"
              icon="people"
              color="rgb(24, 154, 144)"
              bgcolor="rgba(24, 154, 144, 0.2)"
              onPress={() => navigation.navigate("Referral")}
            />
            <ActionCard
              title="Withdrawal"
              value={user.withdrawableAmount}
              subtitle="Available"
              icon="wallet"
              color="rgb(249, 115, 22)"
              bgcolor="rgba(249, 115, 22, 0.2)"
              onPress={() => navigation.navigate("Withdrawal")}
            />
          </View>
        </View>

        {/* Recent Activity */}
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
    </SafeGradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    // flexGrow: 1,
    // paddingHorizontal: Spacing.md,
    // paddingVertical: Spacing.lg,
    // paddingBottom: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
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
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  pointCard: {
    flex: 1,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  pointContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xs,
  },
  pointValue: {
    fontSize: FontSizes.md,
    fontWeight: "700",
    color: "white",
  },
  pointTitle: {
    fontSize: FontSizes.xs,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
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
    flexDirection: "column",
    gap: Spacing.sm,
  },
  actionCard: {
    flex: 1,
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
  actionHeader: {
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  actionIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm,
    borderWidth: 2,
  },
  actionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "700",
    textAlign: "center",
  },
  actionContent: {
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  actionValue: {
    fontSize: FontSizes.xxl,
    fontWeight: "700",
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: FontSizes.sm,
    textAlign: "center",
  },
  actionButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    alignSelf: "stretch",
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: FontSizes.md,
    fontWeight: "600",
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