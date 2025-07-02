import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { QuizProvider } from "./contexts/QuizContext";
import { AppNavigator } from "./navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <QuizProvider>
        <NavigationContainer>
          <AppNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </QuizProvider>
    </SafeAreaProvider>
  );
}
