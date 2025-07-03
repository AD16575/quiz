import React from "react";
import { Text, TextStyle, View, Platform } from "react-native";
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
  // Create a gradient text effect by overlaying multiple text elements
  return (
    <View style={{ position: "relative" }}>
      {/* Background gradient */}
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          borderRadius: 4,
        }}
      />

      {/* Invisible text for layout */}
      <Text
        style={[
          {
            color: "transparent",
          },
          style,
        ]}
      >
        {children}
      </Text>

      {/* Visible gradient text overlay */}
      <Text
        style={[
          {
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            color: "rgb(238, 58, 124)",
            textShadowColor: "rgb(24, 154, 144)",
            textShadowOffset: { width: 0.5, height: 0.5 },
            textShadowRadius: 1,
          },
          style,
        ]}
      >
        {children}
      </Text>
    </View>
  );
}
