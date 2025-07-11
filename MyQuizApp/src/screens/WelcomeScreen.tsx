import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useQuiz } from "../contexts/QuizContext";
import { useTheme } from "../contexts/ThemeContext";
import GradientBackground from "../components/common/GradientBackground";
import Logo from "../components/common/Logo";
import GradientText from "../components/common/GradientText";

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
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <Logo size="large" />
            <View style={styles.titleContainer}>
              <GradientText style={styles.title}>MyQuiz</GradientText>
              <Text
                style={[
                  styles.tagline,
                  {
                    color: themeState.isDark
                      ? "rgb(156, 163, 175)"
                      : "rgb(100, 116, 139)",
                  },
                ]}
              >
                Play. Learn. Earn.
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
    maxWidth: 448,
    width: "100%",
    alignSelf: "center",
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 32,
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
    marginTop: 32,
    width: "100%",
    gap: 16,
  },
  getStartedButton: {
    backgroundColor: "rgb(238, 58, 124)",
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 24,
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
    paddingVertical: 24,
    paddingHorizontal: 24,
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
