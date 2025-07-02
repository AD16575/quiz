import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useQuiz } from "../contexts/QuizContext";
import { useTheme } from "../contexts/ThemeContext";

const mockLeaderboard = [
  {
    id: "1",
    name: "Alex Johnson",
    points: 15420,
    rank: 1,
    avatar: "👨‍💼",
    streak: 25,
    quizzes: 145,
  },
  {
    id: "2",
    name: "Sarah Wilson",
    points: 14890,
    rank: 2,
    avatar: "👩‍🎓",
    streak: 18,
    quizzes: 132,
  },
  {
    id: "3",
    name: "Mike Chen",
    points: 13650,
    rank: 3,
    avatar: "👨‍💻",
    streak: 22,
    quizzes: 128,
  },
  {
    id: "4",
    name: "Emma Davis",
    points: 12340,
    rank: 4,
    avatar: "👩‍🏫",
    streak: 15,
    quizzes: 98,
  },
  {
    id: "5",
    name: "John Smith",
    points: 11890,
    rank: 5,
    avatar: "👨‍🔬",
    streak: 12,
    quizzes: 87,
  },
  {
    id: "6",
    name: "Lisa Brown",
    points: 10540,
    rank: 6,
    avatar: "👩‍⚕️",
    streak: 9,
    quizzes: 76,
  },
];

export default function LeaderboardScreen() {
  const { state } = useQuiz();
  const { state: themeState } = useTheme();
  const { user } = state;

  const currentUserRank = 8; // Mock user rank

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "#FFD700"; // Gold
      case 2:
        return "#C0C0C0"; // Silver
      case 3:
        return "#CD7F32"; // Bronze
      default:
        return themeState.colors.textSecondary;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "trophy";
      case 2:
        return "medal";
      case 3:
        return "medal";
      default:
        return "person";
    }
  };

  const TopThreePodium = () => (
    <View style={styles.podiumSection}>
      <Text style={[styles.sectionTitle, { color: themeState.colors.text }]}>
        🏆 Top Champions
      </Text>
      <View style={styles.podium}>
        {/* Second Place */}
        <View style={[styles.podiumPlace, styles.secondPlace]}>
          <View
            style={[
              styles.podiumAvatar,
              { backgroundColor: themeState.colors.surface },
            ]}
          >
            <Text style={styles.podiumAvatarText}>
              {mockLeaderboard[1].avatar}
            </Text>
          </View>
          <View style={[styles.podiumRank, { backgroundColor: "#C0C0C0" }]}>
            <Text style={styles.podiumRankText}>2</Text>
          </View>
          <Text
            style={[styles.podiumName, { color: themeState.colors.text }]}
            numberOfLines={1}
          >
            {mockLeaderboard[1].name.split(" ")[0]}
          </Text>
          <Text
            style={[
              styles.podiumPoints,
              { color: themeState.colors.textSecondary },
            ]}
          >
            {mockLeaderboard[1].points.toLocaleString()}
          </Text>
        </View>

        {/* First Place */}
        <View style={[styles.podiumPlace, styles.firstPlace]}>
          <Ionicons
            name="crown"
            size={24}
            color="#FFD700"
            style={styles.crown}
          />
          <View
            style={[
              styles.podiumAvatar,
              styles.firstPlaceAvatar,
              { backgroundColor: themeState.colors.surface },
            ]}
          >
            <Text style={styles.podiumAvatarText}>
              {mockLeaderboard[0].avatar}
            </Text>
          </View>
          <View style={[styles.podiumRank, { backgroundColor: "#FFD700" }]}>
            <Text style={styles.podiumRankText}>1</Text>
          </View>
          <Text
            style={[styles.podiumName, { color: themeState.colors.text }]}
            numberOfLines={1}
          >
            {mockLeaderboard[0].name.split(" ")[0]}
          </Text>
          <Text
            style={[
              styles.podiumPoints,
              { color: themeState.colors.textSecondary },
            ]}
          >
            {mockLeaderboard[0].points.toLocaleString()}
          </Text>
        </View>

        {/* Third Place */}
        <View style={[styles.podiumPlace, styles.thirdPlace]}>
          <View
            style={[
              styles.podiumAvatar,
              { backgroundColor: themeState.colors.surface },
            ]}
          >
            <Text style={styles.podiumAvatarText}>
              {mockLeaderboard[2].avatar}
            </Text>
          </View>
          <View style={[styles.podiumRank, { backgroundColor: "#CD7F32" }]}>
            <Text style={styles.podiumRankText}>3</Text>
          </View>
          <Text
            style={[styles.podiumName, { color: themeState.colors.text }]}
            numberOfLines={1}
          >
            {mockLeaderboard[2].name.split(" ")[0]}
          </Text>
          <Text
            style={[
              styles.podiumPoints,
              { color: themeState.colors.textSecondary },
            ]}
          >
            {mockLeaderboard[2].points.toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );

  const LeaderboardItem = ({
    item,
    isCurrentUser = false,
  }: {
    item: any;
    isCurrentUser?: boolean;
  }) => (
    <View
      style={[
        styles.leaderboardItem,
        { backgroundColor: themeState.colors.surface },
        isCurrentUser && {
          borderColor: Colors.light.primary,
          borderWidth: 2,
          backgroundColor: Colors.light.primary + "10",
        },
      ]}
    >
      <View style={styles.rankContainer}>
        <View
          style={[
            styles.rankBadge,
            { backgroundColor: getRankColor(item.rank) + "20" },
          ]}
        >
          <Ionicons
            name={getRankIcon(item.rank) as any}
            size={20}
            color={getRankColor(item.rank)}
          />
        </View>
        <Text style={[styles.rankText, { color: getRankColor(item.rank) }]}>
          #{item.rank}
        </Text>
      </View>

      <View style={styles.userInfo}>
        <View
          style={[
            styles.avatar,
            { backgroundColor: themeState.colors.background },
          ]}
        >
          <Text style={styles.avatarText}>{item.avatar}</Text>
        </View>
        <View style={styles.userDetails}>
          <Text
            style={[
              styles.userName,
              { color: themeState.colors.text },
              isCurrentUser && {
                color: Colors.light.primary,
                fontWeight: "bold",
              },
            ]}
          >
            {item.name} {isCurrentUser && "(You)"}
          </Text>
          <View style={styles.userStats}>
            <View style={styles.statItem}>
              <Ionicons name="flame" size={14} color={Colors.light.accent} />
              <Text
                style={[
                  styles.statText,
                  { color: themeState.colors.textSecondary },
                ]}
              >
                {item.streak} streak
              </Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons
                name="play-circle"
                size={14}
                color={Colors.light.secondary}
              />
              <Text
                style={[
                  styles.statText,
                  { color: themeState.colors.textSecondary },
                ]}
              >
                {item.quizzes} quizzes
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.pointsContainer}>
        <Text
          style={[
            styles.pointsText,
            {
              color: isCurrentUser
                ? Colors.light.primary
                : themeState.colors.text,
            },
          ]}
        >
          {item.points.toLocaleString()}
        </Text>
        <Text
          style={[
            styles.pointsLabel,
            { color: themeState.colors.textSecondary },
          ]}
        >
          points
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: themeState.colors.background },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: themeState.colors.text }]}>
          🏆 Leaderboard
        </Text>
        <Text
          style={[styles.subtitle, { color: themeState.colors.textSecondary }]}
        >
          Top performers this week
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Current User Position */}
        {user && (
          <View style={styles.currentUserSection}>
            <Text
              style={[styles.sectionTitle, { color: themeState.colors.text }]}
            >
              Your Position
            </Text>
            <LeaderboardItem
              item={{
                id: user.id,
                name: user.name,
                points: user.points,
                rank: currentUserRank,
                avatar: "👤",
                streak: 7,
                quizzes: user.totalQuizzes,
              }}
              isCurrentUser={true}
            />
          </View>
        )}

        {/* Top 3 Podium */}
        <TopThreePodium />

        {/* Full Leaderboard */}
        <View style={styles.leaderboardSection}>
          <Text
            style={[styles.sectionTitle, { color: themeState.colors.text }]}
          >
            All Players
          </Text>
          <View style={styles.leaderboardList}>
            {mockLeaderboard.map((item) => (
              <LeaderboardItem key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* Weekly Stats */}
        <View style={styles.statsSection}>
          <Text
            style={[styles.sectionTitle, { color: themeState.colors.text }]}
          >
            This Week's Stats
          </Text>
          <View style={styles.statsGrid}>
            <View
              style={[
                styles.statCard,
                { backgroundColor: themeState.colors.surface },
              ]}
            >
              <Ionicons
                name="people"
                size={32}
                color={Colors.light.primary}
                style={styles.statIcon}
              />
              <Text
                style={[styles.statValue, { color: themeState.colors.text }]}
              >
                1,234
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: themeState.colors.textSecondary },
                ]}
              >
                Active Players
              </Text>
            </View>

            <View
              style={[
                styles.statCard,
                { backgroundColor: themeState.colors.surface },
              ]}
            >
              <Ionicons
                name="play-circle"
                size={32}
                color={Colors.light.secondary}
                style={styles.statIcon}
              />
              <Text
                style={[styles.statValue, { color: themeState.colors.text }]}
              >
                5,678
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    alignItems: "center",
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: FontSizes.md,
    marginTop: 4,
  },
  currentUserSection: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    marginBottom: Spacing.md,
  },
  podiumSection: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  podium: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "end",
    height: 220,
    paddingHorizontal: Spacing.md,
  },
  podiumPlace: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: Spacing.xs,
  },
  firstPlace: {
    marginBottom: 0,
  },
  secondPlace: {
    marginBottom: 30,
  },
  thirdPlace: {
    marginBottom: 60,
  },
  crown: {
    position: "absolute",
    top: -35,
    zIndex: 1,
  },
  podiumAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  firstPlaceAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  podiumAvatarText: {
    fontSize: 36,
  },
  podiumRank: {
    position: "absolute",
    bottom: 60,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  podiumRankText: {
    fontSize: FontSizes.sm,
    fontWeight: "bold",
    color: "white",
  },
  podiumName: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 4,
  },
  podiumPoints: {
    fontSize: FontSizes.sm,
    textAlign: "center",
  },
  leaderboardSection: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  leaderboardList: {
    gap: Spacing.sm,
  },
  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  rankContainer: {
    alignItems: "center",
    marginRight: Spacing.md,
    minWidth: 50,
  },
  rankBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  rankText: {
    fontSize: FontSizes.xs,
    fontWeight: "600",
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  avatarText: {
    fontSize: 24,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    marginBottom: 4,
  },
  userStats: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: FontSizes.xs,
  },
  pointsContainer: {
    alignItems: "flex-end",
  },
  pointsText: {
    fontSize: FontSizes.lg,
    fontWeight: "bold",
  },
  pointsLabel: {
    fontSize: FontSizes.xs,
  },
  statsSection: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  statsGrid: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statIcon: {
    marginBottom: Spacing.sm,
  },
  statValue: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    textAlign: "center",
  },
});
