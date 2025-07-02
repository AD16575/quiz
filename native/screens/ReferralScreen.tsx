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
import { useTheme } from "../contexts/ThemeContext";

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
  const { state: themeState } = useTheme();
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

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: themeState.colors.background },
      ]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: themeState.colors.background },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={themeState.colors.text}
          />
        </TouchableOpacity>
        <Text style={[styles.title, { color: themeState.colors.text }]}>
          Referral Program
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Referral Code Card */}
        <View style={styles.section}>
          <View
            style={[
              styles.referralCard,
              { backgroundColor: themeState.colors.surface },
            ]}
          >
            <View style={styles.referralHeader}>
              <Ionicons name="gift" size={32} color={Colors.light.primary} />
              <Text
                style={[
                  styles.referralTitle,
                  { color: themeState.colors.text },
                ]}
              >
                Your Referral Code
              </Text>
            </View>

            <View style={styles.codeContainer}>
              <Text style={styles.referralCode}>{user.referralCode}</Text>
              <Text
                style={[
                  styles.codeDescription,
                  { color: themeState.colors.textSecondary },
                ]}
              >
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

        {/* Stats Overview - Improved Layout */}
        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: themeState.colors.text }]}
          >
            Your Statistics
          </Text>
          <View style={styles.statsGrid}>
            <View
              style={[
                styles.statCard,
                { backgroundColor: themeState.colors.surface },
              ]}
            >
              <View
                style={[
                  styles.statIconContainer,
                  { backgroundColor: Colors.light.primary + "20" },
                ]}
              >
                <Ionicons
                  name="people"
                  size={28}
                  color={Colors.light.primary}
                />
              </View>
              <View style={styles.statInfo}>
                <Text
                  style={[styles.statValue, { color: Colors.light.primary }]}
                >
                  {user.referredUsers}
                </Text>
                <Text
                  style={[
                    styles.statLabel,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  Friends Referred
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.statCard,
                { backgroundColor: themeState.colors.surface },
              ]}
            >
              <View
                style={[
                  styles.statIconContainer,
                  { backgroundColor: Colors.light.secondary + "20" },
                ]}
              >
                <Ionicons
                  name="star"
                  size={28}
                  color={Colors.light.secondary}
                />
              </View>
              <View style={styles.statInfo}>
                <Text
                  style={[styles.statValue, { color: Colors.light.secondary }]}
                >
                  {totalEarned}
                </Text>
                <Text
                  style={[
                    styles.statLabel,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  Points Earned
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.statCard,
                { backgroundColor: themeState.colors.surface },
              ]}
            >
              <View
                style={[
                  styles.statIconContainer,
                  { backgroundColor: Colors.light.accent + "20" },
                ]}
              >
                <Ionicons name="trophy" size={28} color={Colors.light.accent} />
              </View>
              <View style={styles.statInfo}>
                <Text
                  style={[styles.statValue, { color: Colors.light.accent }]}
                >
                  50
                </Text>
                <Text
                  style={[
                    styles.statLabel,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  Per Referral
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* How it Works - Vertical Layout */}
        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: themeState.colors.text }]}
          >
            How It Works
          </Text>
          <View style={styles.stepsVerticalContainer}>
            <View
              style={[
                styles.stepVerticalItem,
                { backgroundColor: themeState.colors.surface },
              ]}
            >
              <View
                style={[
                  styles.stepNumber,
                  { backgroundColor: Colors.light.primary },
                ]}
              >
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <View
                  style={[
                    styles.stepIconContainer,
                    { backgroundColor: Colors.light.primary + "20" },
                  ]}
                >
                  <Ionicons
                    name="share"
                    size={24}
                    color={Colors.light.primary}
                  />
                </View>
                <View style={styles.stepTextContainer}>
                  <Text
                    style={[
                      styles.stepTitle,
                      { color: themeState.colors.text },
                    ]}
                  >
                    Share Your Code
                  </Text>
                  <Text
                    style={[
                      styles.stepDescription,
                      { color: themeState.colors.textSecondary },
                    ]}
                  >
                    Send your referral code to friends and family via social
                    media, messaging apps, or email.
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.stepVerticalItem,
                { backgroundColor: themeState.colors.surface },
              ]}
            >
              <View
                style={[
                  styles.stepNumber,
                  { backgroundColor: Colors.light.secondary },
                ]}
              >
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <View
                  style={[
                    styles.stepIconContainer,
                    { backgroundColor: Colors.light.secondary + "20" },
                  ]}
                >
                  <Ionicons
                    name="person-add"
                    size={24}
                    color={Colors.light.secondary}
                  />
                </View>
                <View style={styles.stepTextContainer}>
                  <Text
                    style={[
                      styles.stepTitle,
                      { color: themeState.colors.text },
                    ]}
                  >
                    Friend Joins
                  </Text>
                  <Text
                    style={[
                      styles.stepDescription,
                      { color: themeState.colors.textSecondary },
                    ]}
                  >
                    Your friend signs up using your referral code and starts
                    playing quizzes.
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.stepVerticalItem,
                { backgroundColor: themeState.colors.surface },
              ]}
            >
              <View
                style={[
                  styles.stepNumber,
                  { backgroundColor: Colors.light.accent },
                ]}
              >
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <View
                  style={[
                    styles.stepIconContainer,
                    { backgroundColor: Colors.light.accent + "20" },
                  ]}
                >
                  <Ionicons name="gift" size={24} color={Colors.light.accent} />
                </View>
                <View style={styles.stepTextContainer}>
                  <Text
                    style={[
                      styles.stepTitle,
                      { color: themeState.colors.text },
                    ]}
                  >
                    Earn Rewards
                  </Text>
                  <Text
                    style={[
                      styles.stepDescription,
                      { color: themeState.colors.textSecondary },
                    ]}
                  >
                    Both you and your friend receive bonus points! Keep
                    referring for more rewards.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Referred Users */}
        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: themeState.colors.text }]}
          >
            Your Referrals ({mockReferredUsers.length})
          </Text>
          <View style={styles.referredList}>
            {mockReferredUsers.map((referredUser) => (
              <View
                key={referredUser.id}
                style={[
                  styles.referredItem,
                  { backgroundColor: themeState.colors.surface },
                ]}
              >
                <View style={styles.referredAvatar}>
                  <Text style={styles.referredAvatarText}>
                    {referredUser.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.referredInfo}>
                  <Text
                    style={[
                      styles.referredName,
                      { color: themeState.colors.text },
                    ]}
                  >
                    {referredUser.name}
                  </Text>
                  <Text
                    style={[
                      styles.referredDate,
                      { color: themeState.colors.textSecondary },
                    ]}
                  >
                    Joined {referredUser.joinedDate.toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.referredEarnings}>
                  <Text style={styles.earningsText}>
                    +{Math.floor(referredUser.pointsEarned * 0.1)}
                  </Text>
                  <Text
                    style={[
                      styles.earningsLabel,
                      { color: themeState.colors.textSecondary },
                    ]}
                  >
                    points
                  </Text>
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
                  color={themeState.colors.textSecondary}
                />
                <Text
                  style={[
                    styles.emptyText,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  No referrals yet
                </Text>
                <Text
                  style={[
                    styles.emptySubtext,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
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
  },
  placeholder: {
    width: 24,
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
  referralCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  referralHeader: {
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  referralTitle: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
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
    letterSpacing: 2,
  },
  codeDescription: {
    fontSize: FontSizes.md,
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
  // Improved Stats Layout
  statsGrid: {
    gap: Spacing.md,
  },
  statCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: FontSizes.xxl,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: FontSizes.md,
    fontWeight: "500",
  },
  // Vertical Steps Layout
  stepsVerticalContainer: {
    gap: Spacing.lg,
  },
  stepVerticalItem: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  stepNumber: {
    position: "absolute",
    top: -10,
    left: Spacing.lg,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  stepNumberText: {
    color: "white",
    fontSize: FontSizes.md,
    fontWeight: "bold",
  },
  stepContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.sm,
  },
  stepIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  stepDescription: {
    fontSize: FontSizes.md,
    lineHeight: 20,
  },
  // Referred Users
  referredList: {
    gap: Spacing.md,
  },
  referredItem: {
    flexDirection: "row",
    alignItems: "center",
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
  },
  referredDate: {
    fontSize: FontSizes.sm,
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
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    marginTop: Spacing.md,
  },
  emptySubtext: {
    fontSize: FontSizes.md,
    marginTop: Spacing.xs,
  },
});
