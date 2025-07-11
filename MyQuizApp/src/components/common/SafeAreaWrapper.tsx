import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  backgroundColor?: string;
  style?: any;
  excludeTop?: boolean;
  excludeBottom?: boolean;
  excludeLeft?: boolean;
  excludeRight?: boolean;
  customTopPadding?: number;
  customBottomPadding?: number;
}

export default function SafeAreaWrapper({
  children,
  backgroundColor = "transparent",
  style,
  excludeTop = false,
  excludeBottom = false,
  excludeLeft = false,
  excludeRight = false,
  customTopPadding,
  customBottomPadding,
}: SafeAreaWrapperProps) {
  const insets = useSafeAreaInsets();

  const safeAreaStyle = {
    paddingTop: excludeTop ? 0 : (customTopPadding ?? insets.top),
    paddingBottom: excludeBottom ? 0 : (customBottomPadding ?? insets.bottom),
    paddingLeft: excludeLeft ? 0 : insets.left,
    paddingRight: excludeRight ? 0 : insets.right,
    backgroundColor,
  };

  return (
    <View style={[styles.container, safeAreaStyle, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
