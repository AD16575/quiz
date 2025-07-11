import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../contexts/ThemeContext";

interface GradientBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function GradientBackground({
  children,
  style,
}: GradientBackgroundProps) {
  const { state: themeState } = useTheme();

  const gradientColors = themeState.isDark
    ? [
        "rgba(238, 58, 124, 0.015)",
        "rgb(11, 17, 30)",
        "rgba(24, 154, 144, 0.015)",
      ]
    : [
        "rgba(238, 58, 124, 0.1)",
        "rgb(255, 255, 255)",
        "rgba(24, 154, 144, 0.1)",
      ];

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={gradientColors as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
