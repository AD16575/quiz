import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import { GlobalStyles } from "../../styles/globalStyles";
import { Spacing, FontSizes } from "../../styles/colors";
import Button from "./Button";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
  onBackPress?: () => void;
  style?: ViewStyle;
  centerTitle?: boolean;
}

export default function Header({
  title,
  subtitle,
  showBackButton = true,
  rightComponent,
  onBackPress,
  style,
  centerTitle = false,
}: HeaderProps) {
  const navigation = useNavigation();
  const { state: themeState } = useTheme();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View
      style={[
        GlobalStyles.header,
        { borderBottomColor: themeState.colors.border },
        style,
      ]}
    >
      <View style={GlobalStyles.headerLeft}>
        {showBackButton && (
          <Button
            variant="icon"
            icon="arrow-back"
            onPress={handleBackPress}
            style={[
              styles.backButton,
              {
                backgroundColor: themeState.colors.surface,
                borderColor: themeState.colors.border,
              },
            ]}
          />
        )}

        <View style={[styles.titleContainer, centerTitle && styles.centered]}>
          <Text
            style={[
              GlobalStyles.headerTitle,
              { color: themeState.colors.text },
            ]}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[
                GlobalStyles.headerSubtitle,
                { color: themeState.colors.textSecondary },
              ]}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {rightComponent && (
        <View style={styles.rightComponent}>{rightComponent}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginRight: Spacing.md,
  },
  titleContainer: {
    flex: 1,
  },
  centered: {
    alignItems: "center",
  },
  rightComponent: {
    alignItems: "flex-end",
  },
});
