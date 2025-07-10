import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useQuiz } from "../contexts/QuizContext";
import { useTheme } from "../contexts/ThemeContext";
import GradientBackground from "../components/common/GradientBackground";
import Logo from "../components/common/Logo";

export default function SignupScreen() {
  const navigation = useNavigation();
  const { dispatch } = useQuiz();
  const { state: themeState } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    referralCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    if (!formData.name || !formData.email || !formData.password) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    // Mock user creation - matching web version
    const newUser = {
      id: "1",
      name: formData.name,
      email: formData.email,
      points: 100, // Welcome bonus
      totalQuizzes: 0,
      withdrawableAmount: 0,
      referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      referredUsers: 0,
      memberSince: new Date(),
    };
    dispatch({ type: "SET_USER", payload: newUser });
    navigation.navigate("Home" as never);
  };

  const handleGoogleSignup = () => {
    // Mock Google signup - matching web version
    const newUser = {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      points: 100,
      totalQuizzes: 0,
      withdrawableAmount: 0,
      referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      referredUsers: 0,
      memberSince: new Date(),
    };
    dispatch({ type: "SET_USER", payload: newUser });
    navigation.navigate("Home" as never);
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
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
            </View>

            <View style={styles.content}>
              {/* Logo Section - Matching web version */}
              <View style={styles.logoSection}>
                <Logo size="medium" />
                <Text style={[styles.title, { color: themeState.colors.text }]}>
                  Join MyQuiz
                </Text>
                <Text
                  style={[
                    styles.subtitle,
                    {
                      color: themeState.isDark
                        ? "rgb(156, 163, 175)"
                        : "rgb(100, 116, 139)",
                    },
                  ]}
                >
                  Start your learning journey today!
                </Text>
              </View>

              {/* Form */}
              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Text
                    style={[styles.label, { color: themeState.colors.text }]}
                  >
                    Full Name
                  </Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      {
                        backgroundColor: themeState.colors.surface,
                        borderColor: themeState.colors.border,
                      },
                    ]}
                  >
                    <Ionicons
                      name="person"
                      size={16}
                      color={
                        themeState.isDark
                          ? "rgb(156, 163, 175)"
                          : "rgb(100, 116, 139)"
                      }
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, { color: themeState.colors.text }]}
                      placeholder="Enter your name"
                      placeholderTextColor={
                        themeState.isDark
                          ? "rgb(156, 163, 175)"
                          : "rgb(100, 116, 139)"
                      }
                      value={formData.name}
                      onChangeText={(text) =>
                        setFormData({ ...formData, name: text })
                      }
                      autoCapitalize="words"
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text
                    style={[styles.label, { color: themeState.colors.text }]}
                  >
                    Email
                  </Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      {
                        backgroundColor: themeState.colors.surface,
                        borderColor: themeState.colors.border,
                      },
                    ]}
                  >
                    <Ionicons
                      name="mail"
                      size={16}
                      color={
                        themeState.isDark
                          ? "rgb(156, 163, 175)"
                          : "rgb(100, 116, 139)"
                      }
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, { color: themeState.colors.text }]}
                      placeholder="Enter your email"
                      placeholderTextColor={
                        themeState.isDark
                          ? "rgb(156, 163, 175)"
                          : "rgb(100, 116, 139)"
                      }
                      value={formData.email}
                      onChangeText={(text) =>
                        setFormData({ ...formData, email: text })
                      }
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text
                    style={[styles.label, { color: themeState.colors.text }]}
                  >
                    Password
                  </Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      {
                        backgroundColor: themeState.colors.surface,
                        borderColor: themeState.colors.border,
                      },
                    ]}
                  >
                    <Ionicons
                      name="lock-closed"
                      size={16}
                      color={
                        themeState.isDark
                          ? "rgb(156, 163, 175)"
                          : "rgb(100, 116, 139)"
                      }
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, { color: themeState.colors.text }]}
                      placeholder="Create a password"
                      placeholderTextColor={
                        themeState.isDark
                          ? "rgb(156, 163, 175)"
                          : "rgb(100, 116, 139)"
                      }
                      value={formData.password}
                      onChangeText={(text) =>
                        setFormData({ ...formData, password: text })
                      }
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeIcon}
                    >
                      <Ionicons
                        name={showPassword ? "eye" : "eye-off"}
                        size={16}
                        color={
                          themeState.isDark
                            ? "rgb(156, 163, 175)"
                            : "rgb(100, 116, 139)"
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text
                    style={[styles.label, { color: themeState.colors.text }]}
                  >
                    Referral Code (Optional)
                  </Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      {
                        backgroundColor: themeState.colors.surface,
                        borderColor: themeState.colors.border,
                      },
                    ]}
                  >
                    <Ionicons
                      name="gift"
                      size={16}
                      color={
                        themeState.isDark
                          ? "rgb(156, 163, 175)"
                          : "rgb(100, 116, 139)"
                      }
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, { color: themeState.colors.text }]}
                      placeholder="Enter referral code"
                      placeholderTextColor={
                        themeState.isDark
                          ? "rgb(156, 163, 175)"
                          : "rgb(100, 116, 139)"
                      }
                      value={formData.referralCode}
                      onChangeText={(text) =>
                        setFormData({ ...formData, referralCode: text })
                      }
                      autoCapitalize="characters"
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.signupButton,
                    { backgroundColor: "rgb(238, 58, 124)" },
                  ]}
                  onPress={handleSignup}
                >
                  <Text style={styles.signupButtonText}>Create Account</Text>
                </TouchableOpacity>

                <View style={styles.divider}>
                  <View
                    style={[
                      styles.dividerLine,
                      { backgroundColor: themeState.colors.border },
                    ]}
                  />
                  <Text
                    style={[
                      styles.dividerText,
                      {
                        color: themeState.isDark
                          ? "rgb(156, 163, 175)"
                          : "rgb(100, 116, 139)",
                        backgroundColor: themeState.colors.background,
                      },
                    ]}
                  >
                    Or continue with
                  </Text>
                  <View
                    style={[
                      styles.dividerLine,
                      { backgroundColor: themeState.colors.border },
                    ]}
                  />
                </View>

                <TouchableOpacity
                  style={[
                    styles.googleButton,
                    {
                      borderColor: themeState.colors.border,
                      backgroundColor: themeState.colors.surface,
                    },
                  ]}
                  onPress={handleGoogleSignup}
                >
                  <Ionicons
                    name="logo-google"
                    size={16}
                    color={themeState.colors.text}
                  />
                  <Text
                    style={[
                      styles.googleButtonText,
                      { color: themeState.colors.text },
                    ]}
                  >
                    Sign up with Google
                  </Text>
                </TouchableOpacity>

                <View style={styles.loginPrompt}>
                  <Text
                    style={[
                      styles.loginText,
                      {
                        color: themeState.isDark
                          ? "rgb(156, 163, 175)"
                          : "rgb(100, 116, 139)",
                      },
                    ]}
                  >
                    Already have an account?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login" as never)}
                  >
                    <Text style={styles.loginLink}>Login here</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
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
  content: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    justifyContent: "center",
    maxWidth: 448,
    width: "100%",
    alignSelf: "center",
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  form: {
    gap: 24,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: FontSizes.md,
    fontWeight: "500",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    height: 48,
  },
  inputIcon: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: FontSizes.md,
    height: "100%",
  },
  eyeIcon: {
    padding: 12,
  },
  signupButton: {
    paddingVertical: 12,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    height: 48,
    justifyContent: "center",
  },
  signupButtonText: {
    color: "white",
    fontSize: FontSizes.lg,
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 12,
    paddingHorizontal: 8,
    textTransform: "uppercase",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: 8,
    height: 48,
  },
  googleButtonText: {
    fontSize: FontSizes.lg,
    fontWeight: "500",
  },
  loginPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  loginText: {
    fontSize: FontSizes.sm,
  },
  loginLink: {
    fontSize: FontSizes.sm,
    color: "rgb(238, 58, 124)",
    fontWeight: "600",
  },
});
