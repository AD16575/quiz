import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import { GlobalStyles } from "../../styles/globalStyles";
import { BorderRadius, Spacing, FontSizes } from "../../styles/colors";

export type InputVariant = "default" | "outline" | "filled";

interface InputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  variant?: InputVariant;
  error?: string;
  helperText?: string;
  required?: boolean;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
}

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  variant = "default",
  error,
  helperText,
  required = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  autoComplete,
  autoCorrect,
  ...props
}: InputProps) {
  const { state: themeState } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const getInputStyle = () => {
    const baseStyle = [
      GlobalStyles.input,
      {
        backgroundColor: themeState.colors.surface,
        borderColor: themeState.colors.border,
        color: themeState.colors.text,
      },
    ];

    if (variant === "outline") {
      baseStyle.push(styles.outline);
    } else if (variant === "filled") {
      baseStyle.push(styles.filled, {
        backgroundColor: themeState.colors.surfaceCard,
      });
    }

    if (isFocused) {
      baseStyle.push(styles.focused, {
        borderColor: themeState.colors.primary,
      });
    }

    if (error) {
      baseStyle.push(GlobalStyles.inputError);
    }

    if (disabled) {
      baseStyle.push(styles.disabled);
    }

    if (leftIcon) {
      baseStyle.push(styles.withLeftIcon);
    }

    if (rightIcon) {
      baseStyle.push(styles.withRightIcon);
    }

    if (multiline) {
      baseStyle.push(styles.multiline);
    }

    return baseStyle;
  };

  const handleRightIconPress = () => {
    if (secureTextEntry) {
      setIsSecure(!isSecure);
    } else if (onRightIconPress) {
      onRightIconPress();
    }
  };

  const getRightIcon = () => {
    if (secureTextEntry) {
      return isSecure ? "eye-off-outline" : "eye-outline";
    }
    return rightIcon;
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text
          style={[
            GlobalStyles.inputLabel,
            { color: themeState.colors.text },
            error && { color: "rgb(239, 68, 68)" },
          ]}
        >
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <View style={styles.inputContainer}>
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            <Ionicons
              name={leftIcon}
              size={20}
              color={
                isFocused
                  ? themeState.colors.primary
                  : themeState.colors.textSecondary
              }
            />
          </View>
        )}

        <TextInput
          style={getInputStyle()}
          placeholder={placeholder}
          placeholderTextColor={themeState.colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          multiline={multiline}
          numberOfLines={numberOfLines}
          {...props}
        />

        {(rightIcon || secureTextEntry) && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={handleRightIconPress}
            disabled={!secureTextEntry && !onRightIconPress}
          >
            <Ionicons
              name={getRightIcon()!}
              size={20}
              color={
                isFocused
                  ? themeState.colors.primary
                  : themeState.colors.textSecondary
              }
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text style={[GlobalStyles.errorText, styles.errorText]}>{error}</Text>
      )}

      {helperText && !error && (
        <Text
          style={[
            GlobalStyles.helperText,
            { color: themeState.colors.textSecondary },
          ]}
        >
          {helperText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  outline: {
    borderWidth: 2,
    backgroundColor: "transparent",
  },
  filled: {
    borderWidth: 0,
  },
  focused: {
    borderWidth: 2,
  },
  disabled: {
    opacity: 0.6,
  },
  withLeftIcon: {
    paddingLeft: 48,
  },
  withRightIcon: {
    paddingRight: 48,
  },
  multiline: {
    minHeight: 80,
    paddingTop: Spacing.md,
    textAlignVertical: "top",
  },
  leftIconContainer: {
    position: "absolute",
    left: Spacing.md,
    zIndex: 1,
  },
  rightIconContainer: {
    position: "absolute",
    right: Spacing.md,
    zIndex: 1,
    padding: 4,
  },
  required: {
    color: "rgb(239, 68, 68)",
  },
  errorText: {
    marginTop: Spacing.xs,
  },
});
