import React from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GradientBackground from "./GradientBackground";

interface SafeGradientBackgroundProps {
  children: React.ReactNode;
  style?: any;
  excludeTop?: boolean;
  excludeBottom?: boolean;
  excludeLeft?: boolean;
  excludeRight?: boolean;
  customTopPadding?: number;
  customBottomPadding?: number;
}

export default function SafeGradientBackground({
  children,
  style,
  excludeTop = false,
  excludeBottom = false,
  excludeLeft = false,
  excludeRight = false,
  customTopPadding,
  customBottomPadding,
}: SafeGradientBackgroundProps) {
  const insets = useSafeAreaInsets();

  const safeAreaStyle = {
    paddingTop: excludeTop ? 0 : (customTopPadding ?? insets.top),
    paddingBottom: excludeBottom ? 0 : (customBottomPadding ?? insets.bottom),
    paddingLeft: excludeLeft ? 0 : insets.left,
    paddingRight: excludeRight ? 0 : insets.right,
  };

  return (
    <GradientBackground>
      <View style={[styles.container, safeAreaStyle, style]}>{children}</View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
