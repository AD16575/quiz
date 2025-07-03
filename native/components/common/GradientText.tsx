import React from "react";
import { Text, TextStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
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
  return (
    <MaskedView
      maskElement={
        <Text style={[{ backgroundColor: "transparent" }, style]}>
          {children}
        </Text>
      }
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[style, { opacity: 0 }]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
}
