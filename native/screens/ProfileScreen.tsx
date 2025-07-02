import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useQuiz } from "../contexts/QuizContext";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { state, dispatch } = useQuiz();
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
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color + "20" }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.statValue}>{value.toLocaleString()}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  const MenuButton = ({
    title,
    icon,
    onPress,
    color = Colors.light.text,
    destructive = false,
  }: {
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    color?: string;
    destructive?: boolean;
  }) => (
    <TouchableOpacity
      style={[styles.menuButton, destructive && styles.destructiveButton]}
      onPress={onPress}
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
            { color: destructive ? "#EF4444" : Colors.light.text },
          ]}
        >
          {title}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={Colors.light.textSecondary}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <Text style={styles.memberSince}>
                Member since {user.memberSince.toLocaleDateString()}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create" size={20} color={Colors.light.primary} />
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
            title="Referrals"
            value={user.referredUsers}
            icon="people"
            color={Colors.light.accent}
          />
          <StatCard
            title="Achievements"
            value={achievements.filter((a) => a.earned).length}
            icon="trophy"
            color="#8B5CF6"
          />
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsContainer}>
            {achievements.map((achievement) => (
              <View
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  !achievement.earned && styles.lockedAchievement,
                ]}
              >
                <View
                  style={[
                    styles.achievementIcon,
                    {
                      backgroundColor: achievement.earned
                        ? achievement.color + "20"
                        : Colors.light.border + "50",
                    },
                  ]}
                >
                  <Ionicons
                    name={achievement.icon as any}
                    size={24}
                    color={
                      achievement.earned
                        ? achievement.color
                        : Colors.light.textSecondary
                    }
                  />
                </View>
                <View style={styles.achievementInfo}>
                  <Text
                    style={[
                      styles.achievementTitle,
                      !achievement.earned && styles.lockedText,
                    ]}
                  >
                    {achievement.title}
                  </Text>
                  <Text style={styles.achievementDescription}>
                    {achievement.description}
                  </Text>
                </View>
                {achievement.earned && (
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={achievement.color}
                  />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Menu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
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
              color={Colors.light.textSecondary}
            />
          </View>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
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
              color={Colors.light.textSecondary}
            />
          </View>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <View style={styles.menuContainer}>
            <MenuButton
              title="Logout"
              icon="log-out"
              onPress={handleLogout}
              destructive={true}
            />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.md,
    backgroundColor: `${Colors.light.primary}10`,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  userEmail: {
    fontSize: FontSizes.md,
    color: Colors.light.textSecondary,
    marginTop: 4,
  },
  memberSince: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  editButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.light.background,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: "center",
    minWidth: "45%",
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  statValue: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  statTitle: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    textAlign: "center",
    marginTop: 4,
  },
  section: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: Spacing.md,
  },
  achievementsContainer: {
    gap: Spacing.sm,
  },
  achievementCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  lockedAchievement: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    color: Colors.light.text,
  },
  lockedText: {
    color: Colors.light.textSecondary,
  },
  achievementDescription: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  menuContainer: {
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  destructiveButton: {
    borderBottomWidth: 0,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
  },
  menuTitle: {
    fontSize: FontSizes.md,
    fontWeight: "500",
  },
});
