import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";
import GradientBackground from "../components/common/GradientBackground";
import Logo from "../components/common/Logo";
import GradientText from "../components/common/GradientText";

export default function SplashScreen() {
  const navigation = useNavigation();
  const { state: themeState } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const titleFadeAnim = useRef(new Animated.Value(0)).current;
  const taglineFadeAnim = useRef(new Animated.Value(0)).current;
  const loaderFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequential animations matching web app
    Animated.sequence([
      // Logo appears first
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      // Title appears after logo
      Animated.timing(titleFadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      // Tagline appears
      Animated.timing(taglineFadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      // Loading spinner appears
      Animated.timing(loaderFadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to welcome screen after total delay
    const timer = setTimeout(() => {
      navigation.navigate("Welcome" as never);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Logo Section */}
          <Animated.View style={[styles.logoSection, { opacity: fadeAnim }]}>
            <Logo size="large" />
          </Animated.View>

          {/* Title */}
          <Animated.View
            style={[styles.titleSection, { opacity: titleFadeAnim }]}
          >
            <GradientText style={styles.title}>MyQuiz</GradientText>
          </Animated.View>

          {/* Tagline */}
          <Animated.View
            style={[styles.taglineSection, { opacity: taglineFadeAnim }]}
          >
            <Text
              style={[
                styles.tagline,
                { color: themeState.colors.textSecondary },
              ]}
            >
              Play. Learn. Earn.
            </Text>
          </Animated.View>

          {/* Loading Spinner */}
          <Animated.View
            style={[styles.loaderSection, { opacity: loaderFadeAnim }]}
          >
            <View style={styles.spinner}>
              <View
                style={[
                  styles.spinnerOuter,
                  { borderColor: themeState.colors.border },
                ]}
              />
              <View
                style={[
                  styles.spinnerInner,
                  { borderTopColor: "rgb(238, 58, 124)" },
                ]}
              />
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logoSection: {
    marginBottom: 32,
  },
  titleSection: {
    marginBottom: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: "700",
    textAlign: "center",
  },
  taglineSection: {
    marginBottom: 48,
  },
  tagline: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "600",
  },
  loaderSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    width: 32,
    height: 32,
    position: "relative",
  },
  spinnerOuter: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderRadius: 16,
    borderStyle: "solid",
    opacity: 0.3,
  },
  spinnerInner: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 32,
    height: 32,
    borderWidth: 2,
    borderRadius: 16,
    borderStyle: "solid",
    borderColor: "transparent",
    borderTopWidth: 2,
  },
});
