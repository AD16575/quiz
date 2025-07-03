import React from "react";
import { Text, TextStyle, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../styles/colors";

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
  return (
    <View style={{ position: "relative" }}>
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
      <Text
        style={[
          {
            color: "transparent",
            textShadowColor: colors[0],
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 0,
          },
          style,
        ]}
      >
        {children}
      </Text>
      <Text
        style={[
          {
            position: "absolute",
            left: 0,
            top: 0,
            color: colors[0],
            fontWeight: "700",
          },
          style,
        ]}
      >
        {children}
      </Text>
    </View>
  );
}
