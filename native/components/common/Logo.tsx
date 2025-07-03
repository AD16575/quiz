import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, BorderRadius } from "../../styles/colors";

interface LogoProps {
  size?: "small" | "medium" | "large";
  showText?: boolean;
}

export default function Logo({ size = "medium", showText = true }: LogoProps) {
  const logoSize = size === "small" ? 40 : size === "medium" ? 60 : 80;
  const textSize = size === "small" ? 16 : size === "medium" ? 24 : 32;

  return (
    <View style={styles.container}>
      <View
        style={[styles.logoContainer, { width: logoSize, height: logoSize }]}
      >
        <LinearGradient
          colors={[Colors.light.primary, Colors.light.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradientBackground, { borderRadius: BorderRadius.xl }]}
        >
          <Text style={[styles.logoText, { fontSize: textSize * 0.6 }]}>Q</Text>
          <View
            style={[
              styles.accentDot,
              {
                width: logoSize * 0.15,
                height: logoSize * 0.15,
                backgroundColor: Colors.light.accent,
              },
            ]}
          />
        </LinearGradient>
      </View>
      {showText && (
        <Text style={[styles.brandText, { fontSize: textSize }]}>MyQuiz</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  logoContainer: {
    position: "relative",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  logoText: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
  },
  accentDot: {
    position: "absolute",
    top: 8,
    right: 8,
    borderRadius: 50,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  brandText: {
    marginTop: 8,
    color: Colors.light.text,
    fontWeight: "700",
    textAlign: "center",
  },
});
