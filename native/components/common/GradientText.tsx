import React from "react";
import { Text, TextStyle } from "react-native";

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
  // For React Native, we'll use a rich color with shadow to simulate gradient
  // This gives the best visual approximation of the web app's gradient text
  return (
    <Text
      style={[
        {
          color: "rgb(238, 58, 124)",
          textShadowColor: "rgba(24, 154, 144, 0.5)",
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 3,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
