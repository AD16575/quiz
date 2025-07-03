import React from "react";
import { Text, TextStyle, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
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

  // For now, we'll use a strong gradient color effect
  // True gradient text clipping is complex in React Native
  return (
    <View style={{ position: "relative" }}>
      <Text
        style={[
          {
            color: "rgb(238, 58, 124)", // Primary gradient color
            textShadowColor: "rgb(24, 154, 144)",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
          },
          style,
        ]}
      >
        {children}
      </Text>
    </View>
  );
}
