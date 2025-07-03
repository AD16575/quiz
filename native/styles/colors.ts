export const Colors = {
  light: {
    primary: "rgb(238, 58, 124)", // Exact web app pink
    secondary: "rgb(24, 154, 144)", // Exact web app teal
    accent: "rgb(255, 204, 0)", // Web app yellow accent
    background: "rgb(255, 255, 255)", // Exact web app white
    backgroundGradient: {
      start: "rgba(238, 58, 124, 0.1)",
      middle: "rgb(255, 255, 255)",
      end: "rgba(24, 154, 144, 0.1)",
    },
    surface: "rgb(255, 255, 255)",
    surfaceCard: "rgba(255, 255, 255, 0.8)",
    text: "rgb(2, 8, 23)", // Exact web app dark text
    textSecondary: "rgb(100, 116, 139)", // Exact web app secondary text
    textMuted: "rgb(148, 163, 184)",
    border: "rgba(148, 163, 184, 0.2)",
    borderLight: "rgba(238, 58, 124, 0.1)",
    success: "rgb(34, 197, 94)",
    warning: "rgb(245, 158, 11)",
    error: "rgb(239, 68, 68)",
    gradient:
      "linear-gradient(to right bottom, rgb(238, 58, 124), rgb(24, 154, 144))",
  },
  dark: {
    primary: "rgb(238, 58, 124)",
    secondary: "rgb(24, 154, 144)",
    accent: "rgb(255, 204, 0)",
    background: "rgb(17, 24, 39)",
    backgroundGradient: {
      start: "rgba(238, 58, 124, 0.03)",
      middle: "rgb(17, 24, 39)",
      end: "rgba(24, 154, 144, 0.03)",
    },
    surface: "rgba(31, 41, 55, 0.6)",
    surfaceCard: "rgba(31, 41, 55, 0.8)",
    text: "rgb(243, 244, 246)",
    textSecondary: "rgb(156, 163, 175)",
    textMuted: "rgb(107, 114, 128)",
    border: "rgba(75, 85, 99, 0.3)",
    borderLight: "rgba(238, 58, 124, 0.2)",
    success: "rgb(34, 197, 94)",
    warning: "rgb(245, 158, 11)",
    error: "rgb(239, 68, 68)",
    gradient:
      "linear-gradient(to right bottom, rgb(238, 58, 124), rgb(24, 154, 144))",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 50,
};

export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};
