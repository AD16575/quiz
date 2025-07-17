import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";
import SafeGradientBackground from "../components/common/SafeGradientBackground";
import Logo from "../components/common/Logo";
import GradientText from "../components/common/GradientText";

export default function SplashScreen() {
  const navigation = useNavigation();
  const { state: themeState } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const taglineAnim = useRef(new Animated.Value(0)).current;
  const spinnerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo animation first
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.back(1.5)),
      useNativeDriver: true,
    }).start();

    // Title animation after 500ms delay
    setTimeout(() => {
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }, 500);

    // Tagline animation after 800ms delay
    setTimeout(() => {
      Animated.timing(taglineAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }, 800);

    // Spinner animation after 1200ms delay
    setTimeout(() => {
      Animated.timing(spinnerAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }, 1200);

    // Navigate to welcome screen after 3 seconds (matching web)
    const timer = setTimeout(() => {
      navigation.navigate("Welcome" as never);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const titleTransform = titleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  const taglineTransform = taglineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  return (
    <SafeGradientBackground style={styles.container}>
      <View style={styles.content}>
        {/* Animated Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Logo size="large" />
        </Animated.View>

        {/* Title - Matching web gradient text */}
        <Animated.View
          style={[
            styles.titleContainer,
            {
              opacity: titleAnim,
              transform: [{ translateY: titleTransform }],
            },
          ]}
        >
          <GradientText style={styles.title}>MyQuiz</GradientText>
        </Animated.View>

        {/* Tagline */}
        <Animated.View
          style={[
            styles.taglineContainer,
            {
              opacity: taglineAnim,
              transform: [{ translateY: taglineTransform }],
            },
          ]}
        >
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
        </Animated.View>

        {/* Loading Spinner - Matching web design */}
        <Animated.View
          style={[
            styles.spinnerContainer,
            {
              opacity: spinnerAnim,
            },
          ]}
        >
          <ActivityIndicator size="large" color="rgb(238, 58, 124)" />
        </Animated.View>
      </View>
    </SafeGradientBackground>
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
    paddingHorizontal: 32,
  },
  logoContainer: {
    marginBottom: 32,
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: "700",
    textAlign: "center",
  },
  taglineContainer: {
    marginBottom: 48,
  },
  tagline: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  spinnerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
