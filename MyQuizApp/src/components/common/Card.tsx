import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../contexts/ThemeContext";
import { GlobalStyles, GradientColors } from "../../styles/globalStyles";
import { BorderRadius, Spacing } from "../../styles/colors";

export type CardVariant =
  | "default"
  | "small"
  | "large"
  | "gradient"
  | "outline"
  | "elevated";
export type CardGradient =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error";

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  gradient?: CardGradient;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  onPress?: () => void;
  disabled?: boolean;
}

export default function Card({
  children,
  variant = "default",
  gradient,
  style,
  contentStyle,
  onPress,
  disabled = false,
}: CardProps) {
  const { state: themeState } = useTheme();

  const getCardStyle = () => {
    const baseStyle = [
      styles.base,
      { backgroundColor: themeState.colors.surface },
    ];

    switch (variant) {
      case "small":
        return [...baseStyle, GlobalStyles.cardSmall];
      case "large":
        return [...baseStyle, GlobalStyles.cardLarge];
      case "outline":
        return [
          ...baseStyle,
          styles.outline,
          { borderColor: themeState.colors.border },
        ];
      case "elevated":
        return [...baseStyle, GlobalStyles.card, styles.elevated];
      case "gradient":
        return [styles.gradient];
      default:
        return [...baseStyle, GlobalStyles.card];
    }
  };

  const renderContent = () => (
    <View style={[styles.content, contentStyle]}>{children}</View>
  );

  if (variant === "gradient" && gradient) {
    return (
      <LinearGradient
        colors={GradientColors[gradient] as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[getCardStyle(), style]}
      >
        {renderContent()}
      </LinearGradient>
    );
  }

  return (
    <View style={[getCardStyle(), style, disabled && styles.disabled]}>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  content: {
    // Content wrapper
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
  },
  elevated: {
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  gradient: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  disabled: {
    opacity: 0.6,
  },
});
