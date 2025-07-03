import React from "react";
import { Text, TextStyle } from "react-native";
import { Colors } from "../../styles/colors";

interface GradientTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  colors?: string[];
}

export default function GradientText({
  children,
  style,
  colors = [Colors.light.primary, Colors.light.secondary],
}: GradientTextProps) {
  // Fallback to primary color since masked view isn't available
  return (
    <Text style={[{ color: Colors.light.primary }, style]}>{children}</Text>
  );
}
