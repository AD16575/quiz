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
 const gradientColors = {
      default: ["rgb(24, 154, 144)", "rgba(24, 154, 144, 0.8)"],
      earned: ["rgb(255, 204, 0)", "rgb(249, 115, 22)"],
      withdrawable: ["rgb(238, 58, 124)", "rgb(147, 51, 234)"],
      defaultDark: ["rgba(24, 154, 144, 0.2)", "rgba(24, 154, 144, 0.5)"],
      earnedDark: ["rgba(255, 204, 0, 0.2)", "rgba(255, 204, 0, 0.5)"],
      withdrawableDark: ["rgba(238, 58, 124, 0.2)", "rgba(147, 51, 234, 0.5)"],
    };
  return (
    <LinearGradient
      colors={gradientColors[variant] as [string, string]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.card}
    >
      <View style={styles.content}>
        <Ionicons name={icon} size={20} color="white" />
        <Text style={styles.value}>
          {variant === "withdrawable" ? `₹${value}` : value.toLocaleString()}
        </Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </LinearGradient>
    // <LinearGradient
    //   colors={GradientColors.pointCards[variant] as [string, string]}
    //   start={{ x: 0, y: 0 }}
    //   end={{ x: 1, y: 0 }}
    //   style={styles.card}
    // >
    //   <View style={styles.content}>
    //     <IconContainer
    //       icon={icon}
    //       size="large"
    //       variant="gradient"
    //       backgroundColor="rgba(255, 255, 255, 0.2)"
    //       iconColor="white"
    //       style={styles.icon}
    //     />

    //     {/* <View style={styles.textContainer}> */}
    //       <Text style={styles.value}>{displayValue}</Text>
    //       <Text style={styles.title}>{title}</Text>
    //       {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    //     {/* </View> */}
    //   </View>
    // </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  content: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xs,
  },
  icon: {
    marginRight: Spacing.md,
  },
  // textContainer: {
  //   flex: 1,
  //   justifyContent: "center",
  // },
  value: {
    fontSize: FontSizes.md,
    fontWeight: "700",
    color: "white",
  },
  title: {
    fontSize: FontSizes.xs,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  subtitle: {
    fontSize: FontSizes.sm,
    color: "rgba(255, 255, 255, 0.7)",
  },
});
