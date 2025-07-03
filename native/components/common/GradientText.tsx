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
  // For React Native, we'll use the primary color as fallback
  // since true gradient text requires more complex implementation
  return (
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
  );
}
