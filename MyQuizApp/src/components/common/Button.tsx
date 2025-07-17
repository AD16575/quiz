import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import { GlobalStyles, GradientColors } from "../../styles/globalStyles";
import { BorderRadius, Spacing, FontSizes } from "../../styles/colors";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "icon"
  | "gradient";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonGradient =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error";

interface ButtonProps {
  title?: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  gradient?: ButtonGradient;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  gradient,
  icon,
  iconPosition = "left",
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}: ButtonProps) {
  const { state: themeState } = useTheme();

  const getButtonStyle = (): ViewStyle[] => {
    const baseStyle = [styles.base];

    // Size styles
    switch (size) {
      case "small":
        baseStyle.push(styles.small);
        break;
      case "large":
        baseStyle.push(styles.large);
        break;
      default:
        baseStyle.push(styles.medium);
    }

    // Variant styles
    switch (variant) {
      case "primary":
        baseStyle.push(styles.primary);
        break;
      case "secondary":
        baseStyle.push(styles.secondary, {
          backgroundColor: themeState.colors.surface,
          borderColor: themeState.colors.border,
        });
        break;
      case "outline":
        baseStyle.push(styles.outline, {
          borderColor: themeState.colors.primary,
        });
        break;
      case "ghost":
        baseStyle.push(styles.ghost);
        break;
      case "icon":
        baseStyle.push(styles.icon, {
          backgroundColor: themeState.colors.surface,
          borderColor: themeState.colors.border,
        });
        break;
      case "gradient":
        baseStyle.push(styles.gradient);
        break;
    }

    if (fullWidth) {
      baseStyle.push(styles.fullWidth);
    }

    if (disabled || loading) {
      baseStyle.push(styles.disabled);
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle[] => {
    const baseTextStyle = [styles.text, { color: themeState.colors.text }];

    switch (variant) {
      case "primary":
      case "gradient":
        baseTextStyle.push(styles.primaryText);
        break;
      case "outline":
        baseTextStyle.push({ color: themeState.colors.primary });
        break;
      case "ghost":
        baseTextStyle.push({ color: themeState.colors.textSecondary });
        break;
    }

    switch (size) {
      case "small":
        baseTextStyle.push(styles.smallText);
        break;
      case "large":
        baseTextStyle.push(styles.largeText);
        break;
      default:
        baseTextStyle.push(styles.mediumText);
    }

    return baseTextStyle;
  };

  const getIconSize = (): number => {
    switch (size) {
      case "small":
        return 16;
      case "large":
        return 24;
      default:
        return 20;
    }
  };

  const getIconColor = (): string => {
    if (variant === "primary" || variant === "gradient") {
      return "white";
    }
    if (variant === "outline") {
      return themeState.colors.primary;
    }
    return themeState.colors.text;
  };

  const renderContent = () => (
    <>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "primary" ? "white" : themeState.colors.primary}
        />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <Ionicons
              name={icon}
              size={getIconSize()}
              color={getIconColor()}
              style={title ? styles.iconLeft : undefined}
            />
          )}
          {title && <Text style={[getTextStyle(), textStyle]}>{title}</Text>}
          {icon && iconPosition === "right" && (
            <Ionicons
              name={icon}
              size={getIconSize()}
              color={getIconColor()}
              style={styles.iconRight}
            />
          )}
        </>
      )}
    </>
  );

  if (variant === "gradient" && gradient) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={style}
      >
        <LinearGradient
          colors={GradientColors[gradient] as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={getButtonStyle()}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BorderRadius.lg,
  },
  small: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    minHeight: 48,
  },
  large: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    minHeight: 56,
  },
  primary: {
    backgroundColor: "rgb(238, 58, 124)",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  secondary: {
    borderWidth: 1,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  gradient: {
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  fullWidth: {
    width: "100%",
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontWeight: "600",
    textAlign: "center",
  },
  primaryText: {
    color: "white",
  },
  smallText: {
    fontSize: FontSizes.sm,
  },
  mediumText: {
    fontSize: FontSizes.md,
  },
  largeText: {
    fontSize: FontSizes.lg,
  },
  iconLeft: {
    marginRight: Spacing.sm,
  },
  iconRight: {
    marginLeft: Spacing.sm,
  },
});
