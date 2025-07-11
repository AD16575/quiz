import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { registerRootComponent } from "expo";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { QuizProvider } from "./src/contexts/QuizContext";
import { ThemeProvider } from "./src/contexts/ThemeContext";

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <QuizProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <AppNavigator />
          </NavigationContainer>
        </QuizProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default registerRootComponent(App);
