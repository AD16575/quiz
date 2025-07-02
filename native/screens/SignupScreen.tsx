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

export default function SignupScreen() {
  const navigation = useNavigation();
  const { dispatch } = useQuiz();
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

    // Mock user creation
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
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
              <Text style={styles.title}>Join MyQuiz</Text>
              <Text style={styles.subtitle}>Start your learning journey</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name *</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="person"
                    size={20}
                    color={Colors.light.textSecondary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    placeholderTextColor={Colors.light.textSecondary}
                    value={formData.name}
                    onChangeText={(text) =>
                      setFormData({ ...formData, name: text })
                    }
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email *</Text>
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
                <Text style={styles.label}>Password *</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="lock-closed"
                    size={20}
                    color={Colors.light.textSecondary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Create a password"
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

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Referral Code (Optional)</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="gift"
                    size={20}
                    color={Colors.light.textSecondary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter referral code"
                    placeholderTextColor={Colors.light.textSecondary}
                    value={formData.referralCode}
                    onChangeText={(text) =>
                      setFormData({ ...formData, referralCode: text })
                    }
                    autoCapitalize="characters"
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.signupButton}
                onPress={handleSignup}
              >
                <Text style={styles.signupButtonText}>Create Account</Text>
              </TouchableOpacity>

              <View style={styles.loginPrompt}>
                <Text style={styles.loginText}>Already have an account? </Text>
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
    paddingBottom: Spacing.xl,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: Colors.light.primary,
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
  signupButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xl,
    alignItems: "center",
  },
  signupButtonText: {
    color: "white",
    fontSize: FontSizes.lg,
    fontWeight: "600",
  },
  loginPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: FontSizes.md,
    color: Colors.light.textSecondary,
  },
  loginLink: {
    fontSize: FontSizes.md,
    color: Colors.light.primary,
    fontWeight: "600",
  },
});
