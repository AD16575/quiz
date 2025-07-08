export const Colors = {
  light: {
    // Squid Game themed colors matching web exactly
    primary: "rgb(238, 58, 124)", // squid-pink
    secondary: "rgb(24, 154, 144)", // squid-teal
    accent: "rgb(255, 204, 0)", // squid-yellow
    dark: "rgb(34, 38, 49)", // squid-dark
    background: "rgb(255, 255, 255)", // Clean white background
    backgroundGradient: {
      start: "rgba(238, 58, 124, 0.1)",
      middle: "rgb(255, 255, 255)",
      end: "rgba(24, 154, 144, 0.1)",
    },
    surface: "rgb(255, 255, 255)",
    surfaceCard: "rgba(255, 255, 255, 0.8)",
    text: "rgb(34, 38, 49)", // squid-dark for text
    textSecondary: "rgb(100, 116, 139)",
    textMuted: "rgb(148, 163, 184)",
    border: "hsl(214.3, 31.8%, 91.4%)", // Matching web border
    borderLight: "rgba(238, 58, 124, 0.1)",
    ring: "rgb(238, 58, 124)", // squid-pink for focus rings
    success: "rgb(34, 197, 94)",
    warning: "rgb(245, 158, 11)",
    error: "rgb(239, 68, 68)",
  },
  dark: {
    primary: "rgb(238, 58, 124)", // squid-pink
    secondary: "rgb(24, 154, 144)", // squid-teal
    accent: "rgb(255, 204, 0)", // squid-yellow
    dark: "rgb(34, 38, 49)", // squid-dark
    background: "rgb(34, 38, 49)", // squid-dark background
    backgroundGradient: {
      start: "rgba(238, 58, 124, 0.05)",
      middle: "rgb(34, 38, 49)",
      end: "rgba(24, 154, 144, 0.05)",
    },
    surface: "rgba(55, 65, 81, 0.8)",
    surfaceCard: "rgba(55, 65, 81, 0.9)",
    text: "rgb(248, 250, 252)", // squid-light
    textSecondary: "rgb(156, 163, 175)",
    textMuted: "rgb(107, 114, 128)",
    border: "rgba(75, 85, 99, 0.3)",
    borderLight: "rgba(238, 58, 124, 0.2)",
    ring: "rgb(238, 58, 124)", // squid-pink for focus rings
    success: "rgb(34, 197, 94)",
    warning: "rgb(245, 158, 11)",
    error: "rgb(239, 68, 68)",
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
