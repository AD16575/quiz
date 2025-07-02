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

const mockLeaderboard = [
  {
    id: "1",
    name: "Alex Johnson",
    points: 15420,
    rank: 1,
    avatar: "👨‍💼",
    streak: 25,
  },
  {
    id: "2",
    name: "Sarah Wilson",
    points: 14890,
    rank: 2,
    avatar: "👩‍🎓",
    streak: 18,
  },
  {
    id: "3",
    name: "Mike Chen",
    points: 13650,
    rank: 3,
    avatar: "👨‍💻",
    streak: 22,
  },
  {
    id: "4",
    name: "Emma Davis",
    points: 12340,
    rank: 4,
    avatar: "👩‍🏫",
    streak: 15,
  },
  {
    id: "5",
    name: "John Smith",
    points: 11890,
    rank: 5,
    avatar: "👨‍🔬",
    streak: 12,
  },
];

export default function LeaderboardScreen() {
  const { state } = useQuiz();
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
        return Colors.light.textSecondary;
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
        isCurrentUser && styles.currentUserItem,
        item.rank <= 3 && styles.topThreeItem,
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
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.avatar}</Text>
        </View>
        <View style={styles.userDetails}>
          <Text
            style={[styles.userName, isCurrentUser && styles.currentUserName]}
          >
            {item.name} {isCurrentUser && "(You)"}
          </Text>
          <View style={styles.userStats}>
            <Ionicons name="flame" size={14} color={Colors.light.accent} />
            <Text style={styles.streakText}>{item.streak} day streak</Text>
          </View>
        </View>
      </View>

      <View style={styles.pointsContainer}>
        <Text style={styles.pointsText}>{item.points.toLocaleString()}</Text>
        <Text style={styles.pointsLabel}>points</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <Text style={styles.subtitle}>Top performers this week</Text>
      </View>

      {/* Current User Position */}
      {user && (
        <View style={styles.currentUserSection}>
          <Text style={styles.sectionTitle}>Your Position</Text>
          <LeaderboardItem
            item={{
              id: user.id,
              name: user.name,
              points: user.points,
              rank: currentUserRank,
              avatar: "👤",
              streak: 7,
            }}
            isCurrentUser={true}
          />
        </View>
      )}

      {/* Top 3 Podium */}
      <View style={styles.podiumSection}>
        <Text style={styles.sectionTitle}>Top 3 Champions</Text>
        <View style={styles.podium}>
          {/* Second Place */}
          <View style={[styles.podiumPlace, styles.secondPlace]}>
            <View style={styles.podiumAvatar}>
              <Text style={styles.podiumAvatarText}>
                {mockLeaderboard[1].avatar}
              </Text>
            </View>
            <View style={styles.podiumRank}>
              <Text style={styles.podiumRankText}>2</Text>
            </View>
            <Text style={styles.podiumName}>{mockLeaderboard[1].name}</Text>
            <Text style={styles.podiumPoints}>
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
            <View style={styles.podiumAvatar}>
              <Text style={styles.podiumAvatarText}>
                {mockLeaderboard[0].avatar}
              </Text>
            </View>
            <View style={styles.podiumRank}>
              <Text style={styles.podiumRankText}>1</Text>
            </View>
            <Text style={styles.podiumName}>{mockLeaderboard[0].name}</Text>
            <Text style={styles.podiumPoints}>
              {mockLeaderboard[0].points.toLocaleString()}
            </Text>
          </View>

          {/* Third Place */}
          <View style={[styles.podiumPlace, styles.thirdPlace]}>
            <View style={styles.podiumAvatar}>
              <Text style={styles.podiumAvatarText}>
                {mockLeaderboard[2].avatar}
              </Text>
            </View>
            <View style={styles.podiumRank}>
              <Text style={styles.podiumRankText}>3</Text>
            </View>
            <Text style={styles.podiumName}>{mockLeaderboard[2].name}</Text>
            <Text style={styles.podiumPoints}>
              {mockLeaderboard[2].points.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {/* Full Leaderboard */}
      <View style={styles.leaderboardSection}>
        <Text style={styles.sectionTitle}>All Players</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {mockLeaderboard.map((item) => (
            <LeaderboardItem key={item.id} item={item} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.light.textSecondary,
    marginTop: 4,
  },
  currentUserSection: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: Spacing.md,
  },
  currentUserItem: {
    borderColor: Colors.light.primary,
    borderWidth: 2,
    backgroundColor: `${Colors.light.primary}10`,
  },
  currentUserName: {
    color: Colors.light.primary,
    fontWeight: "bold",
  },
  podiumSection: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  podium: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "end",
    height: 200,
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
    marginBottom: 20,
  },
  thirdPlace: {
    marginBottom: 40,
  },
  crown: {
    position: "absolute",
    top: -30,
    zIndex: 1,
  },
  podiumAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.light.surface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  podiumAvatarText: {
    fontSize: 30,
  },
  podiumRank: {
    position: "absolute",
    bottom: 60,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
  },
  podiumRankText: {
    fontSize: FontSizes.sm,
    fontWeight: "bold",
    color: "white",
  },
  podiumName: {
    fontSize: FontSizes.sm,
    fontWeight: "600",
    color: Colors.light.text,
    textAlign: "center",
  },
  podiumPoints: {
    fontSize: FontSizes.xs,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  leaderboardSection: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  topThreeItem: {
    borderLeftWidth: 4,
    borderLeftColor: "#FFD700",
  },
  rankContainer: {
    alignItems: "center",
    marginRight: Spacing.md,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
  },
  avatarText: {
    fontSize: 20,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    color: Colors.light.text,
  },
  userStats: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    gap: 4,
  },
  streakText: {
    fontSize: FontSizes.xs,
    color: Colors.light.textSecondary,
  },
  pointsContainer: {
    alignItems: "flex-end",
  },
  pointsText: {
    fontSize: FontSizes.lg,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  pointsLabel: {
    fontSize: FontSizes.xs,
    color: Colors.light.textSecondary,
  },
});
