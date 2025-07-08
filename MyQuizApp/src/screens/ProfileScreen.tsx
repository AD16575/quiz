import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";
import { useQuiz } from "../contexts/QuizContext";
import GradientBackground from "../components/common/GradientBackground";
import GradientText from "../components/common/GradientText";

export default function ProfileScreen() {
  const { state: themeState, dispatch: themeDispatch } = useTheme();
  const { state, dispatch } = useQuiz();
  const user = state.user;

  if (!user) {
    return null;
  }

  const toggleTheme = () => {
    themeDispatch({ type: "TOGGLE_THEME" });
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          dispatch({ type: "SET_USER", payload: null as any });
        },
      },
    ]);
  };

  const ProfileStat = ({
    icon,
    value,
    label,
    color,
  }: {
    icon: string;
    value: number | string;
    label: string;
    color: string;
  }) => (
    <View style={styles.statItem}>
      <View style={[styles.statIcon, { backgroundColor: `${color}20` }]}>
        <Ionicons name={icon as any} size={20} color={color} />
      </View>
      <View style={styles.statContent}>
        <Text style={[styles.statValue, { color: themeState.colors.text }]}>
          {value}
        </Text>
        <Text
          style={[styles.statLabel, { color: themeState.colors.textSecondary }]}
        >
          {label}
        </Text>
      </View>
    </View>
  );

  const MenuOption = ({
    icon,
    title,
    onPress,
    showArrow = true,
    color = themeState.colors.text,
  }: {
    icon: string;
    title: string;
    onPress: () => void;
    showArrow?: boolean;
    color?: string;
  }) => (
    <TouchableOpacity
      style={[
        styles.menuOption,
        {
          backgroundColor: themeState.colors.surfaceCard,
          borderColor: themeState.colors.borderLight,
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.menuOptionLeft}>
        <Ionicons name={icon as any} size={20} color={color} />
        <Text style={[styles.menuOptionText, { color }]}>{title}</Text>
      </View>
      {showArrow && (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={themeState.colors.textMuted}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}>👨‍💼</Text>
            </View>
            <GradientText style={styles.userName}>{user.name}</GradientText>
            <Text
              style={[
                styles.userEmail,
                { color: themeState.colors.textSecondary },
              ]}
            >
              {user.email}
            </Text>
          </View>

          {/* Stats Grid */}
          <View
            style={[
              styles.statsContainer,
              {
                backgroundColor: themeState.colors.surfaceCard,
                borderColor: themeState.colors.borderLight,
              },
            ]}
          >
            <ProfileStat
              icon="trophy"
              value={user.points}
              label="Total Points"
              color="rgb(238, 58, 124)"
            />
            <ProfileStat
              icon="play-circle"
              value={user.totalQuizzes}
              label="Quizzes Played"
              color="rgb(24, 154, 144)"
            />
            <ProfileStat
              icon="flame"
              value={user.streak}
              label="Current Streak"
              color="rgb(255, 204, 0)"
            />
            <ProfileStat
              icon="people"
              value={user.referredUsers}
              label="Referrals"
              color="rgb(34, 197, 94)"
            />
          </View>

          {/* Menu Options */}
          <View style={styles.menuContainer}>
            <MenuOption
              icon="wallet"
              title="Withdrawal History"
              onPress={() => {}}
            />
            <MenuOption icon="time" title="Point History" onPress={() => {}} />
            <MenuOption
              icon="people"
              title="Referral Program"
              onPress={() => {}}
            />
            <MenuOption
              icon="notifications"
              title="Notifications"
              onPress={() => {}}
            />
            <MenuOption
              icon={themeState.isDark ? "sunny" : "moon"}
              title={`Switch to ${themeState.isDark ? "Light" : "Dark"} Mode`}
              onPress={toggleTheme}
              showArrow={false}
            />
            <MenuOption
              icon="help-circle"
              title="Help & Support"
              onPress={() => {}}
            />
            <MenuOption
              icon="log-out"
              title="Logout"
              onPress={handleLogout}
              showArrow={false}
              color="rgb(239, 68, 68)"
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 32,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    fontSize: 64,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
  },
  statsContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 14,
  },
  menuContainer: {
    marginBottom: 24,
  },
  menuOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  menuOptionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuOptionText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
  },
});
