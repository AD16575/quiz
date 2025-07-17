import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useQuiz } from "../contexts/QuizContext";
import { useTheme } from "../contexts/ThemeContext";
import GradientBackground from "../components/common/GradientBackground";

const mockLeaderboard = [
  {
    id: "1",
    name: "John Doe",
    points: 2500,
    rank: 1,
    totalQuizzes: 15,
    avatar: "👨‍💻",
  },
  {
    id: "2",
    name: "Jane Smith",
    points: 2300,
    rank: 2,
    totalQuizzes: 12,
    avatar: "👩‍🎓",
  },
  {
    id: "3",
    name: "Mike Johnson",
    points: 2100,
    rank: 3,
    totalQuizzes: 14,
    avatar: "👨‍🔬",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    points: 1900,
    rank: 4,
    totalQuizzes: 11,
    avatar: "👩‍💼",
  },
  {
    id: "5",
    name: "Alex Brown",
    points: 1750,
    rank: 5,
    totalQuizzes: 13,
    avatar: "👨‍🎨",
  },
];

export default function LeaderboardScreen() {
  const navigation = useNavigation();
  const { state } = useQuiz();
  const { state: themeState } = useTheme();
  const { user } = state;

  const getRankColor = (rank: number) => {
    if (rank === 1) return "rgb(255, 204, 0)";
    if (rank === 2) return "rgb(192, 192, 192)";
    if (rank === 3) return "rgb(205, 127, 50)";
    return "rgb(100, 116, 139)";
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return "trophy";
    if (rank === 2) return "medal";
    if (rank === 3) return "medal";
    return "person";
  };

  const LeaderboardItem = ({
    player,
    index,
  }: {
    player: any;
    index: number;
  }) => (
    <View
      style={[
        styles.leaderboardItem,
        { backgroundColor: themeState.colors.surface },
        index < 3 && { borderColor: getRankColor(player.rank), borderWidth: 2 },
      ]}
    >
      <View style={styles.rankSection}>
        <Ionicons
          name={getRankIcon(player.rank)}
          size={24}
          color={getRankColor(player.rank)}
        />
        <Text
          style={[
            styles.rankText,
            {
              color: getRankColor(player.rank),
              fontWeight: index < 3 ? "700" : "600",
            },
          ]}
        >
          #{player.rank}
        </Text>
      </View>

      <View style={styles.playerInfo}>
        <Text style={styles.avatar}>{player.avatar}</Text>
        <View style={styles.playerDetails}>
          <Text
            style={[
              styles.playerName,
              { color: themeState.colors.text },
              index < 3 && { fontWeight: "700" },
            ]}
          >
            {player.name}
          </Text>
          <Text
            style={[
              styles.quizCount,
              { color: themeState.colors.textSecondary },
            ]}
          >
            {player.totalQuizzes} quizzes completed
          </Text>
        </View>
      </View>

      <View style={styles.pointsSection}>
        <Text
          style={[
            styles.points,
            {
              color: "rgb(238, 58, 124)",
              fontWeight: index < 3 ? "700" : "600",
            },
          ]}
        >
          {player.points.toLocaleString()}
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
    <GradientBackground>
      <SafeAreaView style={styles.container}>
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
            Leaderboard
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Your Rank */}
          {user && (
            <View style={styles.yourRankSection}>
              <View
                style={[
                  styles.yourRankCard,
                  {
                    backgroundColor: "rgba(238, 58, 124, 0.1)",
                    borderColor: "rgba(238, 58, 124, 0.2)",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.yourRankTitle,
                    { color: themeState.colors.text },
                  ]}
                >
                  Your Rank
                </Text>
                <View style={styles.yourRankContent}>
                  <View style={styles.yourRankLeft}>
                    <Text style={styles.yourAvatar}>👤</Text>
                    <View>
                      <Text
                        style={[
                          styles.yourName,
                          { color: themeState.colors.text },
                        ]}
                      >
                        {user.name}
                      </Text>
                      <Text
                        style={[
                          styles.yourQuizzes,
                          { color: themeState.colors.textSecondary },
                        ]}
                      >
                        {user.totalQuizzes} quizzes
                      </Text>
                    </View>
                  </View>
                  <View style={styles.yourRankRight}>
                    <Text style={styles.yourRankNumber}>#15</Text>
                    <Text style={styles.yourPoints}>
                      {user.points.toLocaleString()} pts
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Top Players */}
          <View style={styles.topPlayersSection}>
            <Text
              style={[styles.sectionTitle, { color: themeState.colors.text }]}
            >
              🏆 Top Players
            </Text>
            <View style={styles.leaderboardList}>
              {mockLeaderboard.map((player, index) => (
                <LeaderboardItem
                  key={player.id}
                  player={player}
                  index={index}
                />
              ))}
            </View>
          </View>

          {/* Coming Soon */}
          <View style={styles.comingSoonSection}>
            <View
              style={[
                styles.comingSoonCard,
                { backgroundColor: themeState.colors.surface },
              ]}
            >
              <Ionicons
                name="trophy-outline"
                size={48}
                color="rgb(255, 204, 0)"
              />
              <Text
                style={[
                  styles.comingSoonTitle,
                  { color: themeState.colors.text },
                ]}
              >
                Weekly Tournaments
              </Text>
              <Text
                style={[
                  styles.comingSoonText,
                  { color: themeState.colors.textSecondary },
                ]}
              >
                Compete with other players in weekly quiz tournaments for
                amazing prizes!
              </Text>
              <Text
                style={[styles.comingSoonBadge, { color: "rgb(255, 204, 0)" }]}
              >
                Coming Soon
              </Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    // paddingTop: 30,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingBottom: 100,
  },
  yourRankSection: {
    marginBottom: Spacing.xl,
  },
  yourRankCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    padding: Spacing.lg,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  yourRankTitle: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    marginBottom: Spacing.md,
    textAlign: "center",
  },
  yourRankContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  yourRankLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  yourAvatar: {
    fontSize: 32,
  },
  yourName: {
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
  yourQuizzes: {
    fontSize: FontSizes.sm,
  },
  yourRankRight: {
    alignItems: "flex-end",
  },
  yourRankNumber: {
    fontSize: FontSizes.xl,
    fontWeight: "700",
    color: "rgb(238, 58, 124)",
  },
  yourPoints: {
    fontSize: FontSizes.sm,
    color: "rgb(24, 154, 144)",
    fontWeight: "600",
  },
  topPlayersSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "700",
    marginBottom: Spacing.md,
  },
  leaderboardList: {
    gap: Spacing.md,
  },
  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
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
  rankSection: {
    alignItems: "center",
    marginRight: Spacing.md,
    minWidth: 60,
  },
  rankText: {
    fontSize: FontSizes.sm,
    fontWeight: "600",
    marginTop: 2,
  },
  playerInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  avatar: {
    fontSize: 32,
  },
  playerDetails: {
    flex: 1,
  },
  playerName: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    marginBottom: 2,
  },
  quizCount: {
    fontSize: FontSizes.sm,
  },
  pointsSection: {
    alignItems: "flex-end",
  },
  points: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
  },
  pointsLabel: {
    fontSize: FontSizes.xs,
  },
  comingSoonSection: {
    alignItems: "center",
  },
  comingSoonCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  comingSoonTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "700",
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  comingSoonText: {
    fontSize: FontSizes.sm,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  comingSoonBadge: {
    fontSize: FontSizes.sm,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
