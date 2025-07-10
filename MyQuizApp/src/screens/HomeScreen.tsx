import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";
import { useQuiz } from "../contexts/QuizContext";
import GradientBackground from "../components/common/GradientBackground";
import GradientText from "../components/common/GradientText";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { state: themeState } = useTheme();
  const { state } = useQuiz();
  const user = state.user;

  if (!user) {
    return null;
  }

  const StatCard = ({
    icon,
    value,
    label,
    color,
  }: {
    icon: string;
    value: number;
    label: string;
    color: string;
  }) => (
    <View
      style={[
        styles.statCard,
        {
          backgroundColor: themeState.colors.surfaceCard,
          borderColor: themeState.colors.borderLight,
        },
      ]}
    >
      <View style={[styles.statIcon, { backgroundColor: `${color}20` }]}>
        <Ionicons name={icon as any} size={24} color={color} />
      </View>
      <Text style={[styles.statValue, { color: themeState.colors.text }]}>
        {value}
      </Text>
      <Text
        style={[styles.statLabel, { color: themeState.colors.textSecondary }]}
      >
        {label}
      </Text>
    </View>
  );

  const QuickActionCard = ({
    icon,
    title,
    description,
    color,
    onPress,
  }: {
    icon: string;
    title: string;
    description: string;
    color: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[
        styles.actionCard,
        {
          backgroundColor: themeState.colors.surfaceCard,
          borderColor: themeState.colors.borderLight,
        },
      ]}
      onPress={onPress}
    >
      <View style={[styles.actionIcon, { backgroundColor: `${color}20` }]}>
        <Ionicons name={icon as any} size={32} color={color} />
      </View>
      <Text style={[styles.actionTitle, { color: themeState.colors.text }]}>
        {title}
      </Text>
      <Text
        style={[
          styles.actionDescription,
          { color: themeState.colors.textSecondary },
        ]}
      >
        {description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
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

          {/* Stats Grid */}
          <View style={styles.statsContainer}>
            <StatCard
              icon="trophy"
              value={user.points}
              label="Total Points"
              color="rgb(238, 58, 124)"
            />
            <StatCard
              icon="play-circle"
              value={user.totalQuizzes}
              label="Quizzes Played"
              color="rgb(24, 154, 144)"
            />
            <StatCard
              icon="cash"
              value={user.withdrawableAmount}
              label="Withdrawable"
              color="rgb(255, 204, 0)"
            />
          </View>

          {/* Play Now Section */}
          <View
            style={[
              styles.playNowCard,
              {
                backgroundColor: themeState.colors.surfaceCard,
                borderColor: "rgba(238, 58, 124, 0.2)",
              },
            ]}
          >
            <View style={styles.playNowIcon}>
              <Ionicons name="flash" size={48} color="rgb(238, 58, 124)" />
            </View>
            <GradientText style={styles.playNowTitle}>
              Ready to Play?
            </GradientText>
            <Text
              style={[
                styles.playNowDescription,
                { color: themeState.colors.textSecondary },
              ]}
            >
              Choose from various categories and start earning points!
            </Text>
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => navigation.navigate("Categories" as never)}
            >
              <Ionicons name="play" size={20} color="white" />
              <Text style={styles.playButtonText}>Play Now</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsContainer}>
            <QuickActionCard
              icon="people"
              title="Referral Program"
              description={`${user.referredUsers} friends referred`}
              color="rgb(24, 154, 144)"
              onPress={() => {}}
            />
            <QuickActionCard
              icon="wallet"
              title="Withdrawal"
              description={`₹${user.withdrawableAmount} available`}
              color="rgb(255, 204, 0)"
              onPress={() => {}}
            />
          </View>

          {/* Recent Activity */}
          <View
            style={[
              styles.activityCard,
              {
                backgroundColor: themeState.colors.surfaceCard,
                borderColor: themeState.colors.borderLight,
              },
            ]}
          >
            <View style={styles.activityHeader}>
              <Ionicons name="trophy" size={20} color="rgb(238, 58, 124)" />
              <Text
                style={[
                  styles.activityTitle,
                  { color: themeState.colors.text },
                ]}
              >
                Recent Achievements
              </Text>
            </View>
            <View style={styles.achievementItem}>
              <View
                style={[
                  styles.achievementContent,
                  { backgroundColor: "rgba(238, 58, 124, 0.1)" },
                ]}
              >
                <View>
                  <Text
                    style={[
                      styles.achievementName,
                      { color: themeState.colors.text },
                    ]}
                  >
                    Quiz Master
                  </Text>
                  <Text
                    style={[
                      styles.achievementDescription,
                      { color: themeState.colors.textSecondary },
                    ]}
                  >
                    Completed 10 quizzes
                  </Text>
                </View>
                <Text style={styles.achievementPoints}>+100 points</Text>
              </View>
            </View>
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
  header: {
    paddingVertical: 24,
    paddingHorizontal: 8,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  playNowCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: "center",
    marginBottom: 24,
  },
  playNowIcon: {
    marginBottom: 16,
  },
  playNowTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  playNowDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: "rgb(238, 58, 124)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  playButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  actionCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  actionDescription: {
    fontSize: 14,
    textAlign: "center",
  },
  activityCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  activityHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  achievementItem: {
    marginBottom: 12,
  },
  achievementContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
  },
  achievementPoints: {
    fontSize: 16,
    fontWeight: "700",
    color: "rgb(238, 58, 124)",
  },
});
