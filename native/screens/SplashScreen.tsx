import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors, Spacing, FontSizes } from "../styles/colors";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const navigation = useNavigation();
  const logoScale = new Animated.Value(0);
  const logoRotate = new Animated.Value(0);
  const titleOpacity = new Animated.Value(0);
  const taglineOpacity = new Animated.Value(0);

  useEffect(() => {
    // Logo animation
    Animated.sequence([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 800,
        easing: Easing.back(1.7),
        useNativeDriver: true,
      }),
      Animated.timing(logoRotate, {
        toValue: 1,
        duration: 600,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
    ]).start();

    // Title animation
    setTimeout(() => {
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 500);

    // Tagline animation
    setTimeout(() => {
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 800);

    // Navigate to welcome screen
    setTimeout(() => {
      navigation.navigate("Welcome" as never);
    }, 3000);
  }, [navigation]);

  const logoRotateInterpolate = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [
                { scale: logoScale },
                { rotate: logoRotateInterpolate },
              ],
            },
          ]}
        >
          <Text style={styles.logo}>Q</Text>
          <View style={styles.logoBadge} />
        </Animated.View>

        <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
          MyQuiz
        </Animated.Text>

        <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
          Play. Learn. Earn.
        </Animated.Text>

        <View style={styles.loadingContainer}>
          <View style={styles.loadingDot} />
          <View style={[styles.loadingDot, { animationDelay: 0.2 }]} />
          <View style={[styles.loadingDot, { animationDelay: 0.4 }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: Spacing.md,
  },
  tagline: {
    fontSize: FontSizes.xl,
    color: Colors.light.textSecondary,
    fontWeight: "600",
    marginBottom: Spacing.xxl,
  },
  loadingContainer: {
    flexDirection: "row",
    gap: 8,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.primary,
  },
});
