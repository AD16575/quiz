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
import GradientBackground from "../components/common/GradientBackground";

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

      {/* Improved Podium Layout */}
      <View
        style={[
          styles.podiumContainer,
          { backgroundColor: themeState.colors.surface },
        ]}
      >
        <View style={styles.podiumGrid}>
          {/* Second Place */}
          <View style={[styles.podiumCard, styles.secondPlaceCard]}>
            <View style={styles.rankBadge}>
              <Text style={styles.rankNumber}>2</Text>
            </View>
            <View style={styles.championAvatar}>
              <Text style={styles.championEmoji}>
                {mockLeaderboard[1].avatar}
              </Text>
            </View>
            <Text
              style={[styles.championName, { color: themeState.colors.text }]}
              numberOfLines={1}
            >
              {mockLeaderboard[1].name.split(" ")[0]}
            </Text>
            <View style={styles.championStats}>
              <View style={styles.statRow}>
                <Ionicons name="star" size={16} color="#C0C0C0" />
                <Text
                  style={[
                    styles.statValue,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  {mockLeaderboard[1].points.toLocaleString()}
                </Text>
              </View>
              <View style={styles.statRow}>
                <Ionicons name="flame" size={16} color={Colors.light.accent} />
                <Text
                  style={[
                    styles.statValue,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  {mockLeaderboard[1].streak} streak
                </Text>
              </View>
            </View>
          </View>

          {/* First Place */}
          <View style={[styles.podiumCard, styles.firstPlaceCard]}>
            <View style={styles.crownContainer}>
              <Ionicons name="crown" size={32} color="#FFD700" />
            </View>
            <View style={styles.rankBadge}>
              <Text style={styles.rankNumber}>1</Text>
            </View>
            <View style={[styles.championAvatar, styles.winnerAvatar]}>
              <Text style={styles.championEmoji}>
                {mockLeaderboard[0].avatar}
              </Text>
            </View>
            <Text
              style={[
                styles.championName,
                styles.winnerName,
                { color: themeState.colors.text },
              ]}
              numberOfLines={1}
            >
              {mockLeaderboard[0].name.split(" ")[0]}
            </Text>
            <View style={styles.championStats}>
              <View style={styles.statRow}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text
                  style={[
                    styles.statValue,
                    styles.winnerStat,
                    { color: themeState.colors.text },
                  ]}
                >
                  {mockLeaderboard[0].points.toLocaleString()}
                </Text>
              </View>
              <View style={styles.statRow}>
                <Ionicons name="flame" size={16} color={Colors.light.accent} />
                <Text
                  style={[
                    styles.statValue,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  {mockLeaderboard[0].streak} streak
                </Text>
              </View>
            </View>
          </View>

          {/* Third Place */}
          <View style={[styles.podiumCard, styles.thirdPlaceCard]}>
            <View style={styles.rankBadge}>
              <Text style={styles.rankNumber}>3</Text>
            </View>
            <View style={styles.championAvatar}>
              <Text style={styles.championEmoji}>
                {mockLeaderboard[2].avatar}
              </Text>
            </View>
            <Text
              style={[styles.championName, { color: themeState.colors.text }]}
              numberOfLines={1}
            >
              {mockLeaderboard[2].name.split(" ")[0]}
            </Text>
            <View style={styles.championStats}>
              <View style={styles.statRow}>
                <Ionicons name="star" size={16} color="#CD7F32" />
                <Text
                  style={[
                    styles.statValue,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  {mockLeaderboard[2].points.toLocaleString()}
                </Text>
              </View>
              <View style={styles.statRow}>
                <Ionicons name="flame" size={16} color={Colors.light.accent} />
                <Text
                  style={[
                    styles.statValue,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  {mockLeaderboard[2].streak} streak
                </Text>
              </View>
            </View>
          </View>
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
            styles.rankBadgeSmall,
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
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
      </ScrollView>
    </SafeAreaView>
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
  podiumContainer: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  podiumGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "end",
    height: 280,
  },
  podiumCard: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: Spacing.xs,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.sm,
    position: "relative",
  },
  firstPlaceCard: {
    marginBottom: 0,
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  secondPlaceCard: {
    marginBottom: 40,
    backgroundColor: "rgba(192, 192, 192, 0.1)",
    borderWidth: 2,
    borderColor: "#C0C0C0",
  },
  thirdPlaceCard: {
    marginBottom: 80,
    backgroundColor: "rgba(205, 127, 50, 0.1)",
    borderWidth: 2,
    borderColor: "#CD7F32",
  },
  crownContainer: {
    position: "absolute",
    top: -20,
    zIndex: 1,
  },
  rankBadge: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.sm,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  rankNumber: {
    fontSize: FontSizes.xs,
    fontWeight: "bold",
    color: "white",
  },
  championAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.md,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  winnerAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFD700",
  },
  championEmoji: {
    fontSize: 40,
  },
  championName: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  winnerName: {
    fontSize: FontSizes.lg,
    color: "#FFD700",
  },
  championStats: {
    alignItems: "center",
    gap: 4,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statValue: {
    fontSize: FontSizes.xs,
  },
  winnerStat: {
    fontSize: FontSizes.sm,
    fontWeight: "bold",
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
  rankBadgeSmall: {
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
});
