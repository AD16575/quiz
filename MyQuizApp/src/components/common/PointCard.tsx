import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import { GradientColors } from "../../styles/globalStyles";
import { BorderRadius, Spacing, FontSizes } from "../../styles/colors";
import IconContainer from "./IconContainer";

export type PointCardVariant = keyof typeof GradientColors.pointCards;

interface PointCardProps {
  title: string;
  value: number;
  icon: keyof typeof Ionicons.glyphMap;
  variant: PointCardVariant;
  subtitle?: string;
  formatValue?: (value: number) => string;
}

export default function PointCard({
  title,
  value,
  icon,
  variant,
  subtitle,
  formatValue,
}: PointCardProps) {
  const { state: themeState } = useTheme();

  const displayValue = formatValue ? formatValue(value) : value.toString();

  return (
    <LinearGradient
      colors={GradientColors.pointCards[variant] as [string, string]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.card}
    >
      <View style={styles.content}>
        <IconContainer
          icon={icon}
          size="medium"
          variant="filled"
          backgroundColor="rgba(255, 255, 255, 0.2)"
          iconColor="white"
          style={styles.icon}
        />

        <View style={styles.textContainer}>
          <Text style={styles.value}>{displayValue}</Text>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    minHeight: 120,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    marginRight: Spacing.md,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  value: {
    fontSize: FontSizes.xxl,
    fontWeight: "700",
    color: "white",
    marginBottom: 4,
  },
  title: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: FontSizes.sm,
    color: "rgba(255, 255, 255, 0.7)",
  },
});
