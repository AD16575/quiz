import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useQuiz } from "../contexts/QuizContext";
import { useTheme } from "../contexts/ThemeContext";
import GradientBackground from "../components/common/GradientBackground";
import GradientText from "../components/common/GradientText";
import Logo from "../components/common/Logo";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const { state, dispatch } = useQuiz();
  const { state: themeState, dispatch: themeDispatch } = useTheme();

  const toggleTheme = () => {
    themeDispatch({ type: "TOGGLE_THEME" });
    // Also update quiz context theme
    dispatch({ type: "TOGGLE_THEME" });
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        {/* Theme Toggle Button - Exact position as web */}
        <TouchableOpacity
          style={[
            styles.themeToggle,
            {
              backgroundColor: themeState.colors.surface,
              borderColor: themeState.colors.border,
            },
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
          {/* Logo and Title Section - Matching web layout */}
          <View style={styles.logoSection}>
            <Logo size="large" />
            <View style={styles.titleContainer}>
              <GradientText style={styles.title}>MyQuiz</GradientText>
              <Text
                style={[
                  styles.tagline,
                  { color: themeState.colors.textSecondary },
                ]}
              >
                Play. Learn. Earn.
              </Text>
            </View>
          </View>

          {/* Feature Preview Card - Like web version */}
          <View
            style={[
              styles.featureCard,
              {
                backgroundColor: themeState.colors.surfaceCard,
                borderColor: themeState.colors.borderLight,
              },
            ]}
          >
            <Ionicons name="play-circle" size={64} color="rgb(238, 58, 124)" />
            <Text
              style={[styles.featureTitle, { color: themeState.colors.text }]}
            >
              Ready to Start?
            </Text>
            <Text
              style={[
                styles.featureDescription,
                { color: themeState.colors.textSecondary },
              ]}
            >
              Challenge yourself with fun quizzes and earn points while
              learning!
            </Text>
          </View>

          {/* Action Buttons - Exact styling as web */}
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={() => navigation.navigate("Signup" as never)}
            >
              <Ionicons name="play" size={20} color="white" />
              <Text style={styles.getStartedText}>Get Started</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.loginButton,
                {
                  borderColor: "rgb(24, 154, 144)",
                  backgroundColor: themeState.isDark
                    ? "rgba(24, 154, 144, 0.15)"
                    : "transparent",
                },
              ]}
              onPress={() => navigation.navigate("Login" as never)}
            >
              <Ionicons name="log-in" size={20} color="rgb(24, 154, 144)" />
              <Text style={[styles.loginText, { color: "rgb(24, 154, 144)" }]}>
                Login
              </Text>
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
    borderWidth: 1,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  logoSection: {
    alignItems: "center",
    maxWidth: 448,
    width: "100%",
    marginBottom: 48,
  },
  logoContainer: {
    height: 128,
    width: 128,
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
  },
  logoBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 10,
  },
  logoText: {
    color: "rgb(255, 255, 255)",
    fontSize: 64,
    fontWeight: "700",
    textAlign: "center",
  },
  logoAccentDot: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    backgroundColor: "rgb(255, 204, 0)",
    borderRadius: 12,
  },
  titleContainer: {
    marginTop: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "700",
    lineHeight: 48,
    textAlign: "center",
  },
  tagline: {
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 28,
    marginTop: 16,
    textAlign: "center",
  },
  actionContainer: {
    marginTop: 48,
    maxWidth: 448,
    width: "100%",
    gap: 16,
  },
  getStartedButton: {
    backgroundColor: "rgb(238, 58, 124)",
    borderRadius: 12,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  getStartedText: {
    color: "rgb(255, 255, 255)",
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 28,
  },
  loginButton: {
    backgroundColor: "transparent",
    borderRadius: 12,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    borderWidth: 2,
  },
  loginText: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 28,
  },
});
