import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import { GlobalStyles, GradientColors } from "../../styles/globalStyles";

export type IconContainerSize = "small" | "medium" | "large" | "extra-large";
export type IconContainerVariant = "filled" | "outline" | "gradient";

interface IconContainerProps {
  icon: keyof typeof Ionicons.glyphMap;
  size?: IconContainerSize;
  variant?: IconContainerVariant;
  color?: string;
  backgroundColor?: string;
  gradient?: keyof typeof GradientColors;
  style?: ViewStyle;
  iconColor?: string;
}

export default function IconContainer({
  icon,
  size = "medium",
  variant = "filled",
  color,
  backgroundColor,
  gradient,
  style,
  iconColor,
}: IconContainerProps) {
  const { state: themeState } = useTheme();

  const getContainerSize = () => {
    switch (size) {
      case "small":
        return { width: 32, height: 32, borderRadius: 16 };
      case "large":
        return { width: 64, height: 64, borderRadius: 32 };
      case "extra-large":
        return { width: 80, height: 80, borderRadius: 40 };
      default:
        return { width: 48, height: 48, borderRadius: 24 };
    }
  };

  const getIconSize = () => {
    switch (size) {
      case "small":
        return 16;
      case "large":
        return 32;
      case "extra-large":
        return 40;
      default:
        return 24;
    }
  };

  const getIconColor = () => {
    if (iconColor) return iconColor;
    if (variant === "gradient" || (variant === "filled" && color)) {
      return "white";
    }
    if (variant === "outline") {
      return color || themeState.colors.primary;
    }
    return themeState.colors.text;
  };

  const getContainerStyle = () => {
    const baseStyle = [
      GlobalStyles.iconContainer,
      getContainerSize(),
      styles.container,
    ];

    switch (variant) {
      case "filled":
        baseStyle.push({
          backgroundColor:
            backgroundColor || color || themeState.colors.primary,
        });
        break;
      case "outline":
        baseStyle.push(styles.outline, {
          borderColor: color || themeState.colors.primary,
          backgroundColor: "transparent",
        });
        break;
      case "gradient":
        // Gradient style will be applied by LinearGradient
        break;
    }

    return baseStyle;
  };

  const renderIcon = () => (
    <Ionicons name={icon} size={getIconSize()} color={getIconColor()} />
  );

  if (variant === "gradient" && gradient) {
    return (
      <LinearGradient
        colors={GradientColors[gradient] as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[getContainerStyle(), style]}
      >
        {renderIcon()}
      </LinearGradient>
    );
  }

  return <View style={[getContainerStyle(), style]}>{renderIcon()}</View>;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  outline: {
    borderWidth: 2,
  },
});
