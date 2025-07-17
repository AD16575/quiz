import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Share,
  // Clipboard,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useQuiz } from "../contexts/QuizContext";
import { useTheme } from "../contexts/ThemeContext";
import GradientBackground from "../components/common/GradientBackground";

export default function ReferralScreen() {
  const navigation = useNavigation();
  const { state } = useQuiz();
  const { state: themeState } = useTheme();
  const { user } = state;

  if (!user) return null;

  const referralLink = `https://myquiz.app/invite/${user.referralCode}`;

  const handleCopyCode = async () => {
    try {
      Alert.alert("Copied!", "Referral code copied to clipboard");
    } catch (error) {
      Alert.alert("Error", "Failed to copy referral code");
    }
  };

  const handleShareLink = async () => {
    try {
      await Share.share({
        message: `Join MyQuiz and start earning points by playing fun quizzes! Use my referral code: ${user.referralCode}\n\n${referralLink}`,
        title: "Join MyQuiz!",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const mockReferrals = [
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      points: 250,
      joinedAt: new Date("2024-01-15"),
      avatar: "👨‍💻",
    },
    {
      id: "2",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      points: 180,
      joinedAt: new Date("2024-01-20"),
      avatar: "👩‍🎓",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      points: 320,
      joinedAt: new Date("2024-01-25"),
      avatar: "👨‍🔬",
    },
  ];

  const ReferralItem = ({ referral }: { referral: any }) => (
    <View
      style={[
        styles.referralItem,
        { backgroundColor: themeState.colors.surface },
      ]}
    >
      <Text style={styles.avatar}>{referral.avatar}</Text>
      <View style={styles.referralInfo}>
        <Text style={[styles.referralName, { color: themeState.colors.text }]}>
          {referral.name}
        </Text>
        <Text
          style={[
            styles.referralEmail,
            { color: themeState.colors.textSecondary },
          ]}
        >
          {referral.email}
        </Text>
        <Text
          style={[
            styles.joinedDate,
            { color: themeState.colors.textSecondary },
          ]}
        >
          Joined {referral.joinedAt.toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.referralPoints}>
        <Text style={[styles.pointsEarned, { color: "rgb(34, 197, 94)" }]}>
          +{referral.points}
        </Text>
        <Text
          style={[
            styles.pointsLabel,
            { color: themeState.colors.textSecondary },
          ]}
        >
          points earned
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
            Referral Program
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Referral Stats */}
          <View style={styles.statsSection}>
            <LinearGradient
              colors={["rgb(24, 154, 115)", "rgba(24, 154, 144, 0.8)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statsCard}
            >
              <View style={styles.statsContent}>
                <Ionicons name="people" size={48} color="white" />
                <Text style={styles.statsTitle}>Friends Referred</Text>
                <Text style={styles.statsValue}>{user.referredUsers}</Text>
                <Text style={styles.statsSubtitle}>
                  Earn ₹50 for each friend you refer!
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* Referral Code */}
          <View style={styles.codeSection}>
            <View
              style={[
                styles.codeCard,
                { backgroundColor: themeState.colors.surface },
              ]}
            >
              <Text
                style={[styles.codeTitle, { color: themeState.colors.text }]}
              >
                Your Referral Code
              </Text>
              <View
                style={[
                  styles.codeContainer,
                  {
                    backgroundColor: themeState.isDark
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.05)",
                  },
                ]}
              >
                <Text style={[styles.codeText, { color: "rgb(238, 58, 124)" }]}>
                  {user.referralCode}
                </Text>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={handleCopyCode}
                >
                  <Ionicons name="copy" size={20} color="rgb(238, 58, 124)" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[
                  styles.shareButton,
                  { backgroundColor: "rgb(24, 154, 144)" },
                ]}
                onPress={handleShareLink}
              >
                <Ionicons name="share-social" size={20} color="white" />
                <Text style={styles.shareButtonText}>Share Referral Link</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* How it Works */}
          <View style={styles.howItWorksSection}>
            <View
              style={[
                styles.howItWorksCard,
                { backgroundColor: themeState.colors.surface },
              ]}
            >
              <Text
                style={[
                  styles.howItWorksTitle,
                  { color: themeState.colors.text },
                ]}
              >
                How it Works
              </Text>
              <View style={styles.stepsList}>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>1</Text>
                  </View>
                  <Text
                    style={[styles.stepText, { color: themeState.colors.text }]}
                  >
                    Share your referral code with friends
                  </Text>
                </View>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>2</Text>
                  </View>
                  <Text
                    style={[styles.stepText, { color: themeState.colors.text }]}
                  >
                    They sign up using your code
                  </Text>
                </View>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>3</Text>
                  </View>
                  <Text
                    style={[styles.stepText, { color: themeState.colors.text }]}
                  >
                    You both earn ₹50 bonus points!
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Referred Friends */}
          {mockReferrals.length > 0 && (
            <View style={styles.referralsSection}>
              <Text
                style={[styles.sectionTitle, { color: themeState.colors.text }]}
              >
                Your Referrals ({mockReferrals.length})
              </Text>
              <View style={styles.referralsList}>
                {mockReferrals.map((referral) => (
                  <ReferralItem key={referral.id} referral={referral} />
                ))}
              </View>
            </View>
          )}
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
  statsSection: {
    marginBottom: Spacing.xl,
  },
  statsCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  statsContent: {
    alignItems: "center",
  },
  statsTitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: FontSizes.md,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  statsValue: {
    color: "white",
    fontSize: 48,
    fontWeight: "700",
    marginBottom: Spacing.sm,
  },
  statsSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: FontSizes.sm,
    textAlign: "center",
  },
  codeSection: {
    marginBottom: Spacing.xl,
  },
  codeCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  codeTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  codeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
  },
  codeText: {
    fontSize: FontSizes.xl,
    fontWeight: "700",
    letterSpacing: 2,
  },
  copyButton: {
    padding: Spacing.sm,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  shareButtonText: {
    color: "white",
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
  howItWorksSection: {
    marginBottom: Spacing.xl,
  },
  howItWorksCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  howItWorksTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "700",
    marginBottom: Spacing.lg,
    textAlign: "center",
  },
  stepsList: {
    gap: Spacing.md,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgb(238, 58, 124)",
    justifyContent: "center",
    alignItems: "center",
  },
  stepNumberText: {
    color: "white",
    fontSize: FontSizes.sm,
    fontWeight: "700",
  },
  stepText: {
    flex: 1,
    fontSize: FontSizes.md,
  },
  referralsSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "700",
    marginBottom: Spacing.md,
  },
  referralsList: {
    gap: Spacing.md,
  },
  referralItem: {
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
  avatar: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  referralInfo: {
    flex: 1,
  },
  referralName: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    marginBottom: 2,
  },
  referralEmail: {
    fontSize: FontSizes.sm,
    marginBottom: 2,
  },
  joinedDate: {
    fontSize: FontSizes.xs,
  },
  referralPoints: {
    alignItems: "flex-end",
  },
  pointsEarned: {
    fontSize: FontSizes.md,
    fontWeight: "700",
  },
  pointsLabel: {
    fontSize: FontSizes.xs,
  },
});
