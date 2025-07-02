import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Clipboard,
  Alert,
  Share,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useQuiz } from "../contexts/QuizContext";

const mockReferredUsers = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    joinedDate: new Date("2024-01-15"),
    pointsEarned: 250,
    status: "active",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    joinedDate: new Date("2024-02-10"),
    pointsEarned: 180,
    status: "active",
  },
];

export default function ReferralScreen() {
  const navigation = useNavigation();
  const { state } = useQuiz();
  const user = state.user;

  if (!user) return null;

  const handleCopyCode = () => {
    Clipboard.setString(user.referralCode);
    Alert.alert("Copied!", "Referral code copied to clipboard");
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join MyQuiz with my referral code ${user.referralCode} and earn bonus points! 🎉`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const totalEarned = mockReferredUsers.reduce(
    (sum, user) => sum + user.pointsEarned * 0.1,
    0,
  );

  const StatCard = ({ title, value, color }: any) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Referral Program</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <StatCard
            title="Friends Referred"
            value={user.referredUsers}
            color={Colors.light.primary}
          />
          <StatCard
            title="Total Earned"
            value={`${totalEarned} pts`}
            color={Colors.light.secondary}
          />
          <StatCard
            title="Per Referral"
            value="50 pts"
            color={Colors.light.accent}
          />
        </View>

        {/* Referral Code Card */}
        <View style={styles.section}>
          <View style={styles.referralCard}>
            <View style={styles.referralHeader}>
              <Ionicons name="gift" size={32} color={Colors.light.primary} />
              <Text style={styles.referralTitle}>Your Referral Code</Text>
            </View>

            <View style={styles.codeContainer}>
              <Text style={styles.referralCode}>{user.referralCode}</Text>
              <Text style={styles.codeDescription}>
                Share this code with your friends
              </Text>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={handleCopyCode}
              >
                <Ionicons name="copy" size={20} color="white" />
                <Text style={styles.copyButtonText}>Copy Code</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.shareButton}
                onPress={handleShare}
              >
                <Ionicons name="share" size={20} color={Colors.light.primary} />
                <Text style={styles.shareButtonText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* How it Works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.stepsContainer}>
            <View style={styles.stepItem}>
              <View
                style={[
                  styles.stepIcon,
                  { backgroundColor: Colors.light.primary + "20" },
                ]}
              >
                <Ionicons name="share" size={24} color={Colors.light.primary} />
              </View>
              <Text style={styles.stepTitle}>1. Share Your Code</Text>
              <Text style={styles.stepDescription}>
                Send your referral code to friends and family
              </Text>
            </View>

            <View style={styles.stepItem}>
              <View
                style={[
                  styles.stepIcon,
                  { backgroundColor: Colors.light.secondary + "20" },
                ]}
              >
                <Ionicons
                  name="people"
                  size={24}
                  color={Colors.light.secondary}
                />
              </View>
              <Text style={styles.stepTitle}>2. Friend Joins</Text>
              <Text style={styles.stepDescription}>
                They sign up using your referral code
              </Text>
            </View>

            <View style={styles.stepItem}>
              <View
                style={[
                  styles.stepIcon,
                  { backgroundColor: Colors.light.accent + "20" },
                ]}
              >
                <Ionicons name="trophy" size={24} color={Colors.light.accent} />
              </View>
              <Text style={styles.stepTitle}>3. Earn Rewards</Text>
              <Text style={styles.stepDescription}>
                Both you and your friend get bonus points
              </Text>
            </View>
          </View>
        </View>

        {/* Referred Users */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Your Referrals ({mockReferredUsers.length})
          </Text>
          <View style={styles.referredList}>
            {mockReferredUsers.map((referredUser) => (
              <View key={referredUser.id} style={styles.referredItem}>
                <View style={styles.referredAvatar}>
                  <Text style={styles.referredAvatarText}>
                    {referredUser.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.referredInfo}>
                  <Text style={styles.referredName}>{referredUser.name}</Text>
                  <Text style={styles.referredDate}>
                    Joined {referredUser.joinedDate.toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.referredEarnings}>
                  <Text style={styles.earningsText}>
                    +{Math.floor(referredUser.pointsEarned * 0.1)}
                  </Text>
                  <Text style={styles.earningsLabel}>points</Text>
                </View>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.light.success}
                />
              </View>
            ))}

            {mockReferredUsers.length === 0 && (
              <View style={styles.emptyState}>
                <Ionicons
                  name="people"
                  size={48}
                  color={Colors.light.textSecondary}
                />
                <Text style={styles.emptyText}>No referrals yet</Text>
                <Text style={styles.emptySubtext}>
                  Start sharing your code!
                </Text>
              </View>
            )}
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
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  placeholder: {
    width: 24,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderLeftWidth: 4,
    alignItems: "center",
  },
  statValue: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
  },
  statTitle: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    textAlign: "center",
    marginTop: 4,
  },
  section: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: Spacing.md,
  },
  referralCard: {
    backgroundColor: `${Colors.light.primary}10`,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    borderWidth: 2,
    borderColor: `${Colors.light.primary}30`,
  },
  referralHeader: {
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  referralTitle: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: Colors.light.text,
    marginTop: Spacing.sm,
  },
  codeContainer: {
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  referralCode: {
    fontSize: FontSizes.xxxl,
    fontWeight: "bold",
    color: Colors.light.primary,
    marginBottom: Spacing.sm,
  },
  codeDescription: {
    fontSize: FontSizes.md,
    color: Colors.light.textSecondary,
    textAlign: "center",
  },
  actionButtons: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  copyButton: {
    flex: 1,
    backgroundColor: Colors.light.secondary,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  copyButtonText: {
    color: "white",
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
  shareButton: {
    flex: 1,
    backgroundColor: "transparent",
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  shareButtonText: {
    color: Colors.light.primary,
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stepItem: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: Spacing.sm,
  },
  stepIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  stepTitle: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: Spacing.xs,
  },
  stepDescription: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
  referredList: {
    gap: Spacing.md,
  },
  referredItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  referredAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  referredAvatarText: {
    color: "white",
    fontSize: FontSizes.lg,
    fontWeight: "bold",
  },
  referredInfo: {
    flex: 1,
  },
  referredName: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    color: Colors.light.text,
  },
  referredDate: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  referredEarnings: {
    alignItems: "flex-end",
    marginRight: Spacing.sm,
  },
  earningsText: {
    fontSize: FontSizes.md,
    fontWeight: "bold",
    color: Colors.light.primary,
  },
  earningsLabel: {
    fontSize: FontSizes.xs,
    color: Colors.light.textSecondary,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    color: Colors.light.textSecondary,
    marginTop: Spacing.md,
  },
  emptySubtext: {
    fontSize: FontSizes.md,
    color: Colors.light.textSecondary,
    marginTop: Spacing.xs,
  },
});
