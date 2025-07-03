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

  return (
    <Text
      style={[
        {
          color: themeState.colors.primary,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
