import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useQuiz } from "../contexts/QuizContext";
import { useTheme } from "../contexts/ThemeContext";
import GradientBackground from "../components/common/GradientBackground";
import Logo from "../components/common/Logo";
import GradientText from "../components/common/GradientText";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const { state, dispatch } = useQuiz();
  const { state: themeState, dispatch: themeDispatch } = useTheme();

  const toggleTheme = () => {
    themeDispatch({ type: "TOGGLE_THEME" });
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        {/* Theme Toggle */}
        <TouchableOpacity
          style={[
            styles.themeToggle,
            { backgroundColor: themeState.colors.surfaceCard },
          ]}
          onPress={toggleTheme}
        >
          <Ionicons
            name={themeState.isDark ? "sunny" : "moon"}
            size={24}
            color={themeState.colors.text}
          />
        </TouchableOpacity>

        <View style={styles.content}>
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <Logo size="large" showText={false} />
            <GradientText
              style={[styles.title, { color: themeState.colors.text }]}
            >
              MyQuiz
            </GradientText>
            <Text
              style={[
                styles.tagline,
                { color: themeState.colors.textSecondary },
              ]}
            >
              Play. Learn. Earn.
            </Text>
          </View>

          {/* Illustration */}
          <View style={styles.illustration}>
            <View style={styles.illustrationCard}>
              <Ionicons name="play" size={64} color={Colors.light.primary} />
              <Text style={styles.illustrationText}>
                Challenge yourself with fun quizzes and earn points while
                learning!
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={() => navigation.navigate("Signup" as never)}
            >
              <Ionicons name="play" size={20} color="white" />
              <Text style={styles.getStartedText}>Get Started</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate("Login" as never)}
            >
              <Ionicons
                name="log-in"
                size={20}
                color={Colors.light.secondary}
              />
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themeToggle: {
    position: "absolute",
    top: 60,
    right: Spacing.md,
    zIndex: 1,
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  logoSection: {
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.xl,
    elevation: 10,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    position: "relative",
  },
  logo: {
    fontSize: 60,
    fontWeight: "bold",
    color: "white",
  },
  logoBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.light.accent,
  },
  title: {
    fontSize: FontSizes.xxxl * 1.5,
    fontWeight: "bold",
    color: Colors.light.primary,
    marginBottom: Spacing.sm,
  },
  tagline: {
    fontSize: FontSizes.xl,
    color: Colors.light.textSecondary,
    fontWeight: "600",
  },
  illustration: {
    width: width * 0.8,
    height: 250,
    marginBottom: Spacing.xxl,
  },
  illustrationCard: {
    flex: 1,
    backgroundColor: `${Colors.light.primary}10`,
    borderRadius: BorderRadius.xl * 2,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  illustrationText: {
    fontSize: FontSizes.md,
    color: Colors.light.textSecondary,
    textAlign: "center",
    marginTop: Spacing.lg,
    lineHeight: 22,
  },
  actionContainer: {
    width: "100%",
    gap: Spacing.md,
  },
  getStartedButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.sm,
    elevation: 5,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  getStartedText: {
    color: "white",
    fontSize: FontSizes.lg,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "transparent",
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    borderColor: Colors.light.secondary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.sm,
  },
  loginText: {
    color: Colors.light.secondary,
    fontSize: FontSizes.lg,
    fontWeight: "600",
  },
});
