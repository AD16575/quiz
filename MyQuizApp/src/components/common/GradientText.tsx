import React from "react";
import { Text, TextStyle } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface GradientTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  colors?: string[];
}

export default function GradientText({
  children,
  style,
  colors = ["rgb(238, 58, 124)", "rgb(24, 154, 144)"],
}: GradientTextProps) {
  const { state: themeState } = useTheme();

  // Enhanced visibility for dark mode
  return (
    <Text
      style={[
        {
          color: "rgb(238, 58, 124)",
          textShadowColor: themeState.isDark
            ? "rgba(24, 154, 144, 0.8)"
            : "rgba(24, 154, 144, 0.5)",
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: themeState.isDark ? 4 : 3,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
