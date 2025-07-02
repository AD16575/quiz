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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useQuiz } from "../contexts/QuizContext";

export default function LoginScreen() {
  const navigation = useNavigation();
  const { dispatch } = useQuiz();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Mock login
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>Q</Text>
              <View style={styles.logoBadge} />
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Login to continue your journey</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="mail"
                  size={20}
                  color={Colors.light.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={Colors.light.textSecondary}
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
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="lock-closed"
                  size={20}
                  color={Colors.light.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={Colors.light.textSecondary}
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
                    size={20}
                    color={Colors.light.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleLogin}
            >
              <Ionicons
                name="logo-google"
                size={20}
                color={Colors.light.text}
              />
              <Text style={styles.googleButtonText}>Login with Google</Text>
            </TouchableOpacity>

            <View style={styles.signupPrompt}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Signup" as never)}
              >
                <Text style={styles.signupLink}>Sign up here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  backButton: {
    padding: Spacing.sm,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    justifyContent: "center",
  },
  logoSection: {
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: Colors.light.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
    position: "relative",
  },
  logo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  logoBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.light.accent,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.light.textSecondary,
  },
  form: {
    gap: Spacing.lg,
  },
  inputContainer: {
    gap: Spacing.sm,
  },
  label: {
    fontSize: FontSizes.md,
    fontWeight: "500",
    color: Colors.light.text,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  inputIcon: {
    marginLeft: Spacing.md,
  },
  input: {
    flex: 1,
    padding: Spacing.md,
    fontSize: FontSizes.md,
    color: Colors.light.text,
  },
  eyeIcon: {
    padding: Spacing.md,
  },
  forgotPassword: {
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    fontSize: FontSizes.sm,
    color: Colors.light.secondary,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: Colors.light.secondary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xl,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: FontSizes.lg,
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.light.border,
  },
  dividerText: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.light.border,
    gap: Spacing.sm,
  },
  googleButtonText: {
    fontSize: FontSizes.lg,
    fontWeight: "500",
    color: Colors.light.text,
  },
  signupPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: FontSizes.md,
    color: Colors.light.textSecondary,
  },
  signupLink: {
    fontSize: FontSizes.md,
    color: Colors.light.primary,
    fontWeight: "600",
  },
});
