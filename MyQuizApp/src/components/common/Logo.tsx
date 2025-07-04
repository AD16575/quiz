import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

export default function Logo({ size = "medium" }: LogoProps) {
  const logoSize = size === "small" ? 40 : size === "medium" ? 80 : 128;

  return (
    <View style={[styles.container, { width: logoSize, height: logoSize }]}>
      <LinearGradient
        colors={["rgb(238, 58, 124)", "rgb(24, 154, 144)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradientBackground, { borderRadius: 16 }]}
      />
      <View
        style={[
          styles.accentDot,
          {
            width: 24,
            height: 24,
            backgroundColor: "rgb(255, 204, 0)",
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
  accentDot: {
    position: "absolute",
    borderRadius: 50,
  },
});
