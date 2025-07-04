import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import GradientBackground from "../components/common/GradientBackground";

export default function ProfileScreen() {
  const { state: themeState } = useTheme();

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: themeState.colors.text }]}>
            ProfileScreen
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: themeState.colors.textSecondary },
            ]}
          >
            Coming soon - User profile and settings
          </Text>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
  },
});
