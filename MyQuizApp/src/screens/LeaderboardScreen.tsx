import React from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";
import { useQuiz } from "../contexts/QuizContext";
import GradientBackground from "../components/common/GradientBackground";
import GradientText from "../components/common/GradientText";

export default function LeaderboardScreen() {
  const { state: themeState } = useTheme();
  const { state } = useQuiz();

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "rgb(255, 204, 0)";
      case 2:
        return "rgb(192, 192, 192)";
      case 3:
        return "rgb(205, 127, 50)";
      default:
        return themeState.colors.textMuted;
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

  const LeaderboardItem = ({ item, index }: { item: any; index: number }) => {
    const isCurrentUser = item.userId === state.user?.id;

    return (
      <View
        style={[
          styles.leaderboardItem,
          {
            backgroundColor: isCurrentUser
              ? "rgba(238, 58, 124, 0.1)"
              : themeState.colors.surfaceCard,
            borderColor: isCurrentUser
              ? "rgba(238, 58, 124, 0.3)"
              : themeState.colors.borderLight,
            borderWidth: isCurrentUser ? 2 : 1,
          },
        ]}
      >
        <View style={styles.rankSection}>
          <View
            style={[
              styles.rankBadge,
              {
                backgroundColor: `${getRankColor(item.rank)}20`,
              },
            ]}
          >
            <Ionicons
              name={getRankIcon(item.rank) as any}
              size={24}
              color={getRankColor(item.rank)}
            />
          </View>
          <Text style={[styles.rankNumber, { color: getRankColor(item.rank) }]}>
            #{item.rank}
          </Text>
        </View>

        <View style={styles.userSection}>
          <Text style={styles.userAvatar}>{item.avatar}</Text>
          <View style={styles.userInfo}>
            <Text
              style={[
                styles.userName,
                {
                  color: themeState.colors.text,
                  fontWeight: isCurrentUser ? "700" : "600",
                },
              ]}
            >
              {item.userName}
              {isCurrentUser && " (You)"}
            </Text>
            <Text
              style={[
                styles.userStats,
                { color: themeState.colors.textSecondary },
              ]}
            >
              {item.totalQuizzes} quizzes • {item.streak} streak
            </Text>
          </View>
        </View>

        <View style={styles.pointsSection}>
          <Text
            style={[
              styles.points,
              {
                color: isCurrentUser
                  ? "rgb(238, 58, 124)"
                  : themeState.colors.text,
                fontWeight: "700",
              },
            ]}
          >
            {item.points}
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
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <GradientText style={styles.title}>Leaderboard</GradientText>
          <Text
            style={[
              styles.subtitle,
              { color: themeState.colors.textSecondary },
            ]}
          >
            See how you rank against other players
          </Text>
        </View>

        <FlatList
          data={state.leaderboard}
          renderItem={({ item, index }) => (
            <LeaderboardItem item={item} index={index} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 24,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 24,
  },
  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  rankSection: {
    alignItems: "center",
    marginRight: 16,
    minWidth: 60,
  },
  rankBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  rankNumber: {
    fontSize: 12,
    fontWeight: "600",
  },
  userSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    marginBottom: 2,
  },
  userStats: {
    fontSize: 14,
  },
  pointsSection: {
    alignItems: "flex-end",
  },
  points: {
    fontSize: 18,
    marginBottom: 2,
  },
  pointsLabel: {
    fontSize: 12,
  },
});
