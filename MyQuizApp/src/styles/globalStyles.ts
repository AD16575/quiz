import { StyleSheet } from "react-native";
import { Spacing, BorderRadius, FontSizes } from "./colors";

export const GlobalStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingBottom: 100,
  },

  // Header Styles
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
  },
  headerSubtitle: {
    fontSize: FontSizes.sm,
    marginTop: 2,
  },

  // Button Styles
  backButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  secondaryButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },

  // Card Styles
  card: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  cardSmall: {
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  cardLarge: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },

  // Text Styles
  primaryButtonText: {
    color: "white",
    fontSize: FontSizes.lg,
    fontWeight: "600",
  },
  secondaryButtonText: {
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
  titleText: {
    fontSize: FontSizes.xxl,
    fontWeight: "700",
  },
  subtitleText: {
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
  bodyText: {
    fontSize: FontSizes.md,
    lineHeight: 22,
  },
  captionText: {
    fontSize: FontSizes.sm,
    lineHeight: 18,
  },

  // Form Styles
  input: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    fontSize: FontSizes.md,
    minHeight: 50,
  },
  inputLabel: {
    fontSize: FontSizes.sm,
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  inputError: {
    borderWidth: 2,
    borderColor: "rgb(239, 68, 68)",
  },
  errorText: {
    color: "rgb(239, 68, 68)",
    fontSize: FontSizes.xs,
    marginTop: Spacing.xs,
  },
  helperText: {
    fontSize: FontSizes.xs,
    marginTop: Spacing.xs,
  },

  // Layout Styles
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
  },
  columnCenter: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  flex1: {
    flex: 1,
  },
  selfCenter: {
    alignSelf: "center",
  },
  textCenter: {
    textAlign: "center",
  },

  // Spacing Utilities
  marginXS: { margin: Spacing.xs },
  marginSM: { margin: Spacing.sm },
  marginMD: { margin: Spacing.md },
  marginLG: { margin: Spacing.lg },
  marginXL: { margin: Spacing.xl },
  paddingXS: { padding: Spacing.xs },
  paddingSM: { padding: Spacing.sm },
  paddingMD: { padding: Spacing.md },
  paddingLG: { padding: Spacing.lg },
  paddingXL: { padding: Spacing.xl },

  // Icon Container Styles
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainerSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainerLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  // Badge Styles
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: FontSizes.xs,
    fontWeight: "600",
  },

  // Loading Styles
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

// Common gradient colors for different states
export const GradientColors = {
  primary: ["rgb(238, 58, 124)", "rgb(147, 51, 234)"],
  secondary: ["rgb(24, 154, 144)", "rgba(24, 154, 144, 0.8)"],
  accent: ["rgb(255, 204, 0)", "rgb(249, 115, 22)"],
  success: ["rgb(34, 197, 94)", "rgba(34, 197, 94, 0.8)"],
  warning: ["rgb(245, 158, 11)", "rgba(245, 158, 11, 0.8)"],
  error: ["rgb(239, 68, 68)", "rgba(239, 68, 68, 0.8)"],

  // Theme-specific gradients
  light: {
    background: [
      "rgba(238, 58, 124, 0.1)",
      "rgb(255, 255, 255)",
      "rgba(24, 154, 144, 0.1)",
    ],
    card: ["rgba(255, 255, 255, 0.9)", "rgba(255, 255, 255, 0.6)"],
  },
  dark: {
    background: ["rgba(0, 0, 0, 1)", "rgb(0, 0, 0)", "rgba(0, 0, 0, 1)"],
    card: ["rgba(17, 24, 39, 0.9)", "rgba(17, 24, 39, 0.6)"],
  },

  // Point card variants
  pointCards: {
    default: ["rgb(24, 154, 144)", "rgba(24, 154, 144, 0.8)"],
    earned: ["rgb(255, 204, 0)", "rgb(249, 115, 22)"],
    withdrawable: ["rgb(238, 58, 124)", "rgb(147, 51, 234)"],
    defaultDark: ["rgba(24, 154, 144, 0.2)", "rgba(24, 154, 144, 0.5)"],
    earnedDark: ["rgba(255, 204, 0, 0.2)", "rgba(255, 204, 0, 0.5)"],
    withdrawableDark: ["rgba(238, 58, 124, 0.2)", "rgba(147, 51, 234, 0.5)"],
  },
};

// Difficulty colors for quiz categories
export const DifficultyColors = {
  Easy: {
    background: "rgba(34, 197, 94, 0.1)",
    text: "rgb(34, 197, 94)",
    border: "rgb(34, 197, 94)",
  },
  Medium: {
    background: "rgba(249, 115, 22, 0.1)",
    text: "rgb(249, 115, 22)",
    border: "rgb(249, 115, 22)",
  },
  Hard: {
    background: "rgba(239, 68, 68, 0.1)",
    text: "rgb(239, 68, 68)",
    border: "rgb(239, 68, 68)",
  },
};
