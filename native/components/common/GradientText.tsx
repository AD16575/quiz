import React from "react";
import { Text, TextStyle, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
  // Simulate gradient text by creating two text layers with different colors
  // This creates a visual gradient effect similar to the web app
  return (
    <View style={{ position: "relative" }}>
      {/* First layer - Pink color */}
      <Text
        style={[
          {
            color: "rgb(238, 58, 124)",
          },
          style,
        ]}
      >
        {children}
      </Text>

      {/* Second layer - Teal overlay for gradient effect */}
      <Text
        style={[
          {
            position: "absolute",
            left: 2,
            top: 0,
            color: "rgb(24, 154, 144)",
            opacity: 0.7,
          },
          style,
        ]}
      >
        {children
          .toString()
          .slice(0, Math.floor(children.toString().length / 2))}
      </Text>
    </View>
  );
}
