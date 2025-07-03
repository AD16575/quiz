import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useQuiz } from "../contexts/QuizContext";
import { useTheme } from "../contexts/ThemeContext";
import GradientBackground from "../components/common/GradientBackground";

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { state, dispatch } = useQuiz();
  const { state: themeState } = useTheme();
  const { user } = state;

  if (!user) return null;

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          dispatch({ type: "SET_USER", payload: null });
        },
      },
    ]);
  };

  const achievements = [
    {
      id: "1",
      title: "Quiz Master",
      description: "Complete 10 quizzes",
      icon: "trophy",
      earned: true,
      color: "#FFD700",
    },
    {
      id: "2",
      title: "Speed Demon",
      description: "Complete a quiz in under 2 minutes",
      icon: "flash",
      earned: true,
      color: "#3B82F6",
    },
    {
      id: "3",
      title: "Perfect Score",
      description: "Score 100% in any quiz",
      icon: "star",
      earned: false,
      color: "#10B981",
    },
    {
      id: "4",
      title: "Referral Champion",
      description: "Refer 5 friends",
      icon: "people",
      earned: false,
      color: "#E91E63",
    },
  ];

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
    <View
      style={[styles.statCard, { backgroundColor: themeState.colors.surface }]}
    >
      <View style={[styles.statIcon, { backgroundColor: color + "20" }]}>
        <Ionicons name={icon} size={28} color={color} />
      </View>
      <Text style={[styles.statValue, { color: themeState.colors.text }]}>
        {value.toLocaleString()}
      </Text>
      <Text
        style={[styles.statTitle, { color: themeState.colors.textSecondary }]}
      >
        {title}
      </Text>
    </View>
  );

  const MenuButton = ({
    title,
    icon,
    onPress,
    color = themeState.colors.text,
    destructive = false,
  }: {
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    color?: string;
    destructive?: boolean;
  }) => (
    <TouchableOpacity
      style={[
        styles.menuButton,
        { backgroundColor: themeState.colors.surface },
        destructive && styles.destructiveButton,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuLeft}>
        <View
          style={[
            styles.menuIcon,
            { backgroundColor: destructive ? "#EF444420" : color + "20" },
          ]}
        >
          <Ionicons
            name={icon}
            size={20}
            color={destructive ? "#EF4444" : color}
          />
        </View>
        <Text
          style={[
            styles.menuTitle,
            { color: destructive ? "#EF4444" : themeState.colors.text },
          ]}
        >
          {title}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={themeState.colors.textSecondary}
      />
    </TouchableOpacity>
  );

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Profile Header */}
          <View
            style={[
              styles.header,
              { backgroundColor: `${Colors.light.primary}15` },
            ]}
          >
            <View style={styles.profileContainer}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
                </View>
                <TouchableOpacity style={styles.editAvatarButton}>
                  <Ionicons name="camera" size={16} color="white" />
                </TouchableOpacity>
              </View>

              <View style={styles.userInfo}>
                <Text
                  style={[styles.userName, { color: themeState.colors.text }]}
                >
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
                <View style={styles.membershipInfo}>
                  <Ionicons
                    name="calendar"
                    size={16}
                    color={themeState.colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.memberSince,
                      { color: themeState.colors.textSecondary },
                    ]}
                  >
                    Member since {user.memberSince.toLocaleDateString()}
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.editButton}>
                <Ionicons
                  name="create"
                  size={20}
                  color={Colors.light.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsSection}>
            <Text
              style={[styles.sectionTitle, { color: themeState.colors.text }]}
            >
              Your Statistics
            </Text>
            <View style={styles.statsGrid}>
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
                title="Referrals"
                value={user.referredUsers}
                icon="people"
                color={Colors.light.accent}
              />
              <StatCard
                title="Achievements"
                value={achievements.filter((a) => a.earned).length}
                icon="trophy"
                color="#FFD700"
              />
            </View>
          </View>

          {/* Achievements */}
          <View style={styles.section}>
            <Text
              style={[styles.sectionTitle, { color: themeState.colors.text }]}
            >
              Achievements ({achievements.filter((a) => a.earned).length}/
              {achievements.length})
            </Text>
            <View style={styles.achievementsGrid}>
              {achievements.map((achievement) => (
                <View
                  key={achievement.id}
                  style={[
                    styles.achievementCard,
                    { backgroundColor: themeState.colors.surface },
                    !achievement.earned && styles.lockedAchievement,
                  ]}
                >
                  <View
                    style={[
                      styles.achievementIcon,
                      {
                        backgroundColor: achievement.earned
                          ? achievement.color + "20"
                          : themeState.colors.border + "50",
                      },
                    ]}
                  >
                    <Ionicons
                      name={achievement.icon as any}
                      size={28}
                      color={
                        achievement.earned
                          ? achievement.color
                          : themeState.colors.textSecondary
                      }
                    />
                  </View>
                  <Text
                    style={[
                      styles.achievementTitle,
                      {
                        color: achievement.earned
                          ? themeState.colors.text
                          : themeState.colors.textSecondary,
                      },
                    ]}
                  >
                    {achievement.title}
                  </Text>
                  <Text
                    style={[
                      styles.achievementDescription,
                      { color: themeState.colors.textSecondary },
                    ]}
                  >
                    {achievement.description}
                  </Text>
                  {achievement.earned && (
                    <View style={styles.achievementBadge}>
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color={achievement.color}
                      />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Menu Sections */}
          <View style={styles.section}>
            <Text
              style={[styles.sectionTitle, { color: themeState.colors.text }]}
            >
              Account
            </Text>
            <View style={styles.menuContainer}>
              <MenuButton
                title="Point History"
                icon="trending-up"
                onPress={() => navigation.navigate("PointHistory" as never)}
                color={Colors.light.secondary}
              />
              <MenuButton
                title="Referral Program"
                icon="people"
                onPress={() => navigation.navigate("Referral" as never)}
                color={Colors.light.primary}
              />
              <MenuButton
                title="Withdrawal"
                icon="wallet"
                onPress={() => navigation.navigate("Withdrawal" as never)}
                color={Colors.light.accent}
              />
              <MenuButton
                title="Settings"
                icon="settings"
                onPress={() => navigation.navigate("Settings" as never)}
                color={themeState.colors.textSecondary}
              />
            </View>
          </View>

          {/* Support */}
          <View style={styles.section}>
            <Text
              style={[styles.sectionTitle, { color: themeState.colors.text }]}
            >
              Support
            </Text>
            <View style={styles.menuContainer}>
              <MenuButton
                title="Help & FAQ"
                icon="help-circle"
                onPress={() => {}}
                color={Colors.light.secondary}
              />
              <MenuButton
                title="Contact Support"
                icon="mail"
                onPress={() => {}}
                color={Colors.light.primary}
              />
              <MenuButton
                title="Terms & Privacy"
                icon="document-text"
                onPress={() => {}}
                color={themeState.colors.textSecondary}
              />
            </View>
          </View>

          {/* Logout */}
          <View style={styles.section}>
            <MenuButton
              title="Logout"
              icon="log-out"
              onPress={handleLogout}
              destructive={true}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xl,
    borderBottomLeftRadius: BorderRadius.xl * 2,
    borderBottomRightRadius: BorderRadius.xl * 2,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginRight: Spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  avatarText: {
    fontSize: FontSizes.xxxl,
    fontWeight: "bold",
    color: "white",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.light.secondary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: FontSizes.xxl,
    fontWeight: "bold",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: FontSizes.md,
    marginBottom: Spacing.sm,
  },
  membershipInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  memberSince: {
    fontSize: FontSizes.sm,
  },
  editButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: "white",
    elevation: 2,
  },
  statsSection: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  section: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    marginBottom: Spacing.md,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    minWidth: (width - Spacing.md * 2 - Spacing.sm) / 2 - Spacing.sm,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  statValue: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statTitle: {
    fontSize: FontSizes.sm,
    textAlign: "center",
  },
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  achievementCard: {
    width: (width - Spacing.md * 2 - Spacing.sm) / 2,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: "center",
    position: "relative",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  lockedAchievement: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  achievementTitle: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: Spacing.xs,
  },
  achievementDescription: {
    fontSize: FontSizes.sm,
    textAlign: "center",
    lineHeight: 18,
  },
  achievementBadge: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  menuContainer: {
    gap: Spacing.xs,
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  destructiveButton: {
    backgroundColor: "#EF444410",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
  },
  menuTitle: {
    fontSize: FontSizes.md,
    fontWeight: "500",
  },
});
