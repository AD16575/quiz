import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useQuiz } from "../contexts/QuizContext";
import { useTheme } from "../contexts/ThemeContext";
import SafeGradientBackground from "../components/common/SafeGradientBackground";
import Logo from "../components/common/Logo";
import {
  validateEmail,
  validatePassword,
  validateForm,
  FormErrors,
} from "../utils/validation";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { dispatch } = useQuiz();
  const { state: themeState } = useTheme();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateAndLogin = async () => {
    // Clear previous errors
    setErrors({});

    // Validate form
    const { isValid, errors: validationErrors } = validateForm(formData, {
      email: validateEmail,
      password: validatePassword,
    });

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock login validation
      if (
        formData.email === "test@example.com" &&
        formData.password === "password123"
      ) {
        Alert.alert("Error", "Invalid email or password");
        setIsLoading(false);
        return;
      }

      // Mock successful login
      const user = {
        id: "1",
        name: "John Doe",
        email: formData.email,
        points: 2500,
        totalQuizzes: 15,
        withdrawableAmount: 1200,
        referralCode: "ABC123",
        referredUsers: 3,
        memberSince: new Date("2023-01-15"),
      };

      dispatch({ type: "SET_USER", payload: user });
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Mock Google login
    const user = {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      points: 2500,
      totalQuizzes: 15,
      withdrawableAmount: 1200,
      referralCode: "ABC123",
      referredUsers: 3,
      memberSince: new Date("2023-01-15"),
    };
    dispatch({ type: "SET_USER", payload: user });
    navigation.navigate("Home");
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <SafeGradientBackground style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
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
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <Logo size="medium" />
            <Text style={[styles.title, { color: themeState.colors.text }]}>
              Welcome Back
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
              Login to continue your quiz journey
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: themeState.colors.text }]}>
                Email
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  {
                    backgroundColor: themeState.colors.surface,
                    borderColor: errors.email
                      ? "rgb(239, 68, 68)"
                      : themeState.colors.border,
                  },
                ]}
              >
                <Ionicons
                  name="mail"
                  size={16}
                  color={
                    errors.email
                      ? "rgb(239, 68, 68)"
                      : themeState.isDark
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
                  onChangeText={(text) => handleFieldChange("email", text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: themeState.colors.text }]}>
                Password
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  {
                    backgroundColor: themeState.colors.surface,
                    borderColor: errors.password
                      ? "rgb(239, 68, 68)"
                      : themeState.colors.border,
                  },
                ]}
              >
                <Ionicons
                  name="lock-closed"
                  size={16}
                  color={
                    errors.password
                      ? "rgb(239, 68, 68)"
                      : themeState.isDark
                        ? "rgb(156, 163, 175)"
                        : "rgb(100, 116, 139)"
                  }
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: themeState.colors.text }]}
                  placeholder="Enter your password"
                  placeholderTextColor={
                    themeState.isDark
                      ? "rgb(156, 163, 175)"
                      : "rgb(100, 116, 139)"
                  }
                  value={formData.password}
                  onChangeText={(text) => handleFieldChange("password", text)}
                  secureTextEntry={!showPassword}
                  autoCorrect={false}
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
              {errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.loginButton,
                {
                  backgroundColor: isLoading
                    ? "rgba(24, 154, 144, 0.6)"
                    : "rgb(24, 154, 144)",
                },
              ]}
              onPress={validateAndLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? "Logging in..." : "Login"}
              </Text>
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
              onPress={handleGoogleLogin}
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
                Login with Google
              </Text>
            </TouchableOpacity>

            <View style={styles.signupPrompt}>
              <Text
                style={[
                  styles.signupText,
                  {
                    color: themeState.isDark
                      ? "rgb(156, 163, 175)"
                      : "rgb(100, 116, 139)",
                  },
                ]}
              >
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.signupLink}>Sign up here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeGradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: 30,
    // paddingTop: Spacing.md,
    // paddingBottom: Spacing.sm,
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
  errorText: {
    color: "rgb(239, 68, 68)",
    fontSize: FontSizes.sm,
    marginTop: 4,
  },
  forgotPassword: {
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    fontSize: FontSizes.sm,
    color: "rgb(238, 58, 124)",
    fontWeight: "500",
  },
  loginButton: {
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
  loginButtonText: {
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
    paddingVertical: 10,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: 8,
    height: 50,
  },
  googleButtonText: {
    fontSize: FontSizes.lg,
    fontWeight: "500",
  },
  signupPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  signupText: {
    fontSize: FontSizes.sm,
  },
  signupLink: {
    fontSize: FontSizes.sm,
    color: "rgb(238, 58, 124)",
    fontWeight: "600",
  },
});
