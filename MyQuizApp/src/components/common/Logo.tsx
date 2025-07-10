import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface LogoProps {
  size?: "small" | "medium" | "large";
  showText?: boolean;
}

export default function Logo({ size = "medium", showText = true }: LogoProps) {
  const logoSize = size === "small" ? 60 : size === "medium" ? 100 : 128;
  const fontSize = size === "small" ? 32 : size === "medium" ? 48 : 64;
  const dotSize = size === "small" ? 16 : size === "medium" ? 20 : 24;

  return (
    <View style={[styles.container, { width: logoSize, height: logoSize }]}>
      <LinearGradient
        colors={["rgb(238, 58, 124)", "rgb(24, 154, 144)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradientBackground, { borderRadius: 16 }]}
      >
        {showText && <Text style={[styles.logoText, { fontSize }]}>Q</Text>}
      </LinearGradient>
      <View
        style={[
          styles.accentDot,
          {
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            right: -4,
            top: -4,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 10,
  },
  gradientBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
  },
  accentDot: {
    position: "absolute",
    backgroundColor: "rgb(255, 204, 0)",
  },
});
