import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useQuiz } from "../contexts/QuizContext";
import { useTheme } from "../contexts/ThemeContext";
import SafeGradientBackground from "../components/common/SafeGradientBackground";
import Logo from "../components/common/Logo";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { state, dispatch } = useQuiz();
  const { state: themeState, dispatch: themeDispatch } = useTheme();
  const { user } = state;

  if (!user) return null;

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const toggleTheme = () => {
    themeDispatch({ type: "TOGGLE_THEME" });
  };

  const ProfileOption = ({
    icon,
    title,
    subtitle,
    onPress,
    color = themeState.colors.text,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle?: string;
    onPress: () => void;
    color?: string;
  }) => (
    <TouchableOpacity
      style={[
        styles.profileOption,
        { backgroundColor: themeState.colors.surface },
      ]}
      onPress={onPress}
    >
      <View style={styles.optionLeft}>
        <View style={[styles.optionIcon, { borderColor: color + "20" }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <View style={styles.optionText}>
          <Text style={[styles.optionTitle, { color: themeState.colors.text }]}>
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[
                styles.optionSubtitle,
                { color: themeState.colors.textSecondary },
              ]}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={themeState.colors.textSecondary}
      />
    </TouchableOpacity>
  );

  return (
    <SafeGradientBackground style={styles.container}>
      {/* Header */}
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
            size={20}
            color={themeState.colors.text}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: themeState.colors.text }]}>
          Profile
        </Text>
        <TouchableOpacity
          style={[
            styles.themeButton,
            {
              backgroundColor: themeState.colors.surface,
              borderColor: themeState.colors.border,
            },
          ]}
          onPress={toggleTheme}
        >
          <Ionicons
            name={themeState.isDark ? "sunny" : "moon"}
            size={20}
            color={themeState.colors.text}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info */}
        <View style={styles.userSection}>
          <Logo size="large" />
          <Text style={[styles.userName, { color: themeState.colors.text }]}>
            {user.name}
          </Text>
          <Text
            style={[
              styles.userEmail,
              { color: themeState.colors.textSecondary },
            ]}
          >
            {user.email}
          </Text>
          <Text
            style={[
              styles.memberSince,
              { color: themeState.colors.textSecondary },
            ]}
          >
            Member since {user.memberSince.getFullYear()}
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <View
            style={[
              styles.statsCard,
              { backgroundColor: themeState.colors.surface },
            ]}
          >
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: "rgb(238, 58, 124)" }]}>
                {user.points}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: themeState.colors.textSecondary },
                ]}
              >
                Total Points
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: "rgb(24, 154, 144)" }]}>
                {user.totalQuizzes}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: themeState.colors.textSecondary },
                ]}
              >
                Quizzes Played
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: "rgb(255, 204, 0)" }]}>
                ₹{user.withdrawableAmount}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: themeState.colors.textSecondary },
                ]}
              >
                Withdrawable
              </Text>
            </View>
          </View>
        </View>

        {/* Profile Options */}
        <View style={styles.optionsSection}>
          <ProfileOption
            icon="people"
            title="Referral Program"
            subtitle={`${user.referredUsers} friends referred`}
            onPress={() => navigation.navigate("Referral")}
            color="rgb(24, 154, 144)"
          />
          <ProfileOption
            icon="wallet"
            title="Withdrawal"
            subtitle={`₹${user.withdrawableAmount} available`}
            onPress={() => navigation.navigate("Withdrawal")}
            color="rgb(255, 204, 0)"
          />
          <ProfileOption
            icon="list"
            title="Point History"
            subtitle="View all transactions"
            onPress={() => navigation.navigate("PointHistory")}
            color="rgb(147, 51, 234)"
          />
          <ProfileOption
            icon="trophy"
            title="Leaderboard"
            subtitle="See your ranking"
            onPress={() => navigation.navigate("Leaderboard")}
            color="rgb(249, 115, 22)"
          />
          <ProfileOption
            icon="settings"
            title="Settings"
            subtitle="App preferences"
            onPress={() => {}} // Placeholder
            color="rgb(100, 116, 139)"
          />
        </View>

        {/* Logout */}
        <View style={styles.logoutSection}>
          <TouchableOpacity
            style={[styles.logoutButton, { borderColor: "rgb(239, 68, 68)" }]}
            onPress={handleLogout}
          >
            <Ionicons name="log-out" size={20} color="rgb(239, 68, 68)" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
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
    paddingTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  backButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
  },
  themeButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingBottom: 100,
  },
  userSection: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  userName: {
    fontSize: FontSizes.xxl,
    fontWeight: "700",
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  userEmail: {
    fontSize: FontSizes.md,
    marginBottom: Spacing.sm,
  },
  memberSince: {
    fontSize: FontSizes.sm,
  },
  statsSection: {
    marginBottom: Spacing.xl,
  },
  statsCard: {
    flexDirection: "row",
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
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: FontSizes.xl,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: FontSizes.xs,
    textAlign: "center",
  },
  optionsSection: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  profileOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: FontSizes.sm,
  },
  logoutSection: {
    alignItems: "center",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.sm,
    minWidth: 120,
  },
  logoutText: {
    color: "rgb(239, 68, 68)",
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
});
