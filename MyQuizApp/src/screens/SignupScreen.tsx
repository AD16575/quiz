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
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useQuiz } from "../contexts/QuizContext";
import { useTheme } from "../contexts/ThemeContext";
import SafeGradientBackground from "../components/common/SafeGradientBackground";
import api from "../lib/api";
import { TokenManager } from "../lib/axios";
import Logo from "../components/common/Logo";
import {
  validateEmail,
  validatePassword,
  validateName,
  validateReferralCode,
  validateForm,
  FormErrors,
} from "../utils/validation";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function SignupScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { dispatch } = useQuiz();
  const { state: themeState } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    referralCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateAndSignup = async () => {
    // Clear previous errors
    setErrors({});

    // Validate form
    const { isValid, errors: validationErrors } = validateForm(formData, {
      name: validateName,
      email: validateEmail,
      password: validatePassword,
      referralCode: validateReferralCode,
    });

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      console.log("🔧 Attempting registration with:", {
        name: formData.name,
        email: formData.email,
        referralCode: formData.referralCode,
      });

      // Call the real register API
      const response = await api.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        referralCode: formData.referralCode
      });

      console.log("✅ Registration successful:", response);

      // Store the token if provided
      if (response.token) {
        await TokenManager.setToken(response.token);
        console.log("🔐 Token saved successfully");
      }

      // Create user object from response
      const newUser = {
        id: response.user?.id || response.id,
        name: response.user?.name || response.name,
        email: response.user?.email || response.email,
        points: response.user?.points || (formData.referralCode ? 150 : 100),
        totalQuizzes: response.user?.totalQuizzes || 0,
        withdrawableAmount: response.user?.withdrawableAmount || 0,
        referralCode:
          response.user?.referralCode ||
          Math.random().toString(36).substring(2, 8).toUpperCase(),
        referredUsers: response.user?.referredUsers || 0,
        memberSince: response.user?.memberSince
          ? new Date(response.user.memberSince)
          : new Date(),
      };

      dispatch({ type: "SET_USER", payload: newUser });

      // Show welcome message with bonus points info
      const bonusMessage = formData.referralCode
        ? "Welcome! You've received 150 bonus points for using a referral code!"
        : "Welcome! You've received 100 welcome bonus points!";

      Alert.alert("Account Created!", bonusMessage, [
        { text: "OK", onPress: () => navigation.navigate("Home") },
      ]);
    } catch (error: any) {
      console.error("❌ Registration failed:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Registration failed. Please try again.";

      // Handle specific error cases
      if (
        error?.response?.status === 400 &&
        error?.response?.data?.message?.includes("email")
      ) {
        setErrors({ email: "Email already exists" });
      } else {
        Alert.alert("Registration Failed", errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // Mock Google signup
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
    navigation.navigate("Home");
  };

  const handleFieldChange = (field: string, value: string) => {
    // Format referral code to uppercase
    const formattedValue =
      field === "referralCode" ? value.toUpperCase() : value;

    setFormData({ ...formData, [field]: formattedValue });

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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
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
                <Text style={[styles.label, { color: themeState.colors.text }]}>
                  Full Name <Text style={styles.required}>*</Text>
                </Text>
                <View
                  style={[
                    styles.inputWrapper,
                    {
                      backgroundColor: themeState.colors.surface,
                      borderColor: errors.name
                        ? "rgb(239, 68, 68)"
                        : themeState.colors.border,
                    },
                  ]}
                >
                  <Ionicons
                    name="person"
                    size={16}
                    color={
                      errors.name
                        ? "rgb(239, 68, 68)"
                        : themeState.isDark
                          ? "rgb(156, 163, 175)"
                          : "rgb(100, 116, 139)"
                    }
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: themeState.colors.text }]}
                    placeholder="Enter your full name"
                    placeholderTextColor={
                      themeState.isDark
                        ? "rgb(156, 163, 175)"
                        : "rgb(100, 116, 139)"
                    }
                    value={formData.name}
                    onChangeText={(text) => handleFieldChange("name", text)}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
                {errors.name ? (
                  <Text style={styles.errorText}>{errors.name}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: themeState.colors.text }]}>
                  Email <Text style={styles.required}>*</Text>
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
                  Password <Text style={styles.required}>*</Text>
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
                    placeholder="Create a strong password"
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
                <Text
                  style={[
                    styles.helperText,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  Must contain at least 6 characters with letters and numbers
                </Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: themeState.colors.text }]}>
                  Referral Code{" "}
                  <Text
                    style={[
                      styles.optional,
                      { color: themeState.colors.textSecondary },
                    ]}
                  >
                    (Optional)
                  </Text>
                </Text>
                <View
                  style={[
                    styles.inputWrapper,
                    {
                      backgroundColor: themeState.colors.surface,
                      borderColor: errors.referralCode
                        ? "rgb(239, 68, 68)"
                        : themeState.colors.border,
                    },
                  ]}
                >
                  <Ionicons
                    name="gift"
                    size={16}
                    color={
                      errors.referralCode
                        ? "rgb(239, 68, 68)"
                        : themeState.isDark
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
                      handleFieldChange("referralCode", text)
                    }
                    autoCapitalize="characters"
                    autoCorrect={false}
                    maxLength={6}
                  />
                </View>
                {errors.referralCode ? (
                  <Text style={styles.errorText}>{errors.referralCode}</Text>
                ) : null}
                {!errors.referralCode && formData.referralCode ? (
                  <Text
                    style={[styles.helperText, { color: "rgb(34, 197, 94)" }]}
                  >
                    Get 50 extra bonus points with a valid referral code!
                  </Text>
                ) : null}
              </View>

              <TouchableOpacity
                style={[
                  styles.signupButton,
                  {
                    backgroundColor: isLoading
                      ? "rgba(238, 58, 124, 0.6)"
                      : "rgb(238, 58, 124)",
                  },
                ]}
                onPress={validateAndSignup}
                disabled={isLoading}
              >
                <Text style={styles.signupButtonText}>
                  {isLoading ? "Creating Account..." : "Create Account"}
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
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.loginLink}>Login here</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: Spacing.md,
    // paddingTop: 30,
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
    paddingBottom: 32,
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
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: FontSizes.md,
    fontWeight: "500",
  },
  required: {
    color: "rgb(239, 68, 68)",
  },
  optional: {
    fontSize: FontSizes.sm,
    fontWeight: "400",
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
  helperText: {
    fontSize: FontSizes.xs,
    marginTop: 4,
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
    marginTop: 8,
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
    marginVertical: 8,
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
    marginTop: 8,
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
