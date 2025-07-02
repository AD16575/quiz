import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useQuiz } from "../contexts/QuizContext";
import { useTheme } from "../contexts/ThemeContext";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { state, dispatch } = useQuiz();
  const { state: themeState, dispatch: themeDispatch } = useTheme();
  const { user } = state;

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          dispatch({ type: "SET_USER", payload: null });
        },
      },
    ]);
  };

  const toggleTheme = () => {
    themeDispatch({ type: "TOGGLE_THEME" });
  };

  const settingsSections = [
    {
      title: "Appearance",
      items: [
        {
          icon: themeState.isDark ? "moon" : "sunny",
          label: "Dark Mode",
          description: "Toggle between light and dark theme",
          type: "toggle" as const,
          value: themeState.isDark,
          action: toggleTheme,
          color: Colors.light.primary,
        },
      ],
    },
    {
      title: "Notifications",
      items: [
        {
          icon: "notifications",
          label: "Quiz Reminders",
          description: "Get notified about new quizzes",
          type: "toggle" as const,
          value: true,
          color: Colors.light.secondary,
        },
        {
          icon: "mail",
          label: "Email Updates",
          description: "Receive email about your progress",
          type: "toggle" as const,
          value: false,
          color: Colors.light.accent,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          icon: "person",
          label: "Profile",
          description: "Manage your account information",
          type: "link" as const,
          color: Colors.light.primary,
        },
        {
          icon: "shield",
          label: "Change Password",
          description: "Update your account password",
          type: "link" as const,
          color: Colors.light.secondary,
        },
        {
          icon: "trending-up",
          label: "Point History",
          description: "View your earnings and transactions",
          type: "link" as const,
          color: Colors.light.accent,
          action: () => navigation.navigate("PointHistory" as never),
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: "help-circle",
          label: "Help & FAQ",
          description: "Get help and find answers",
          type: "link" as const,
          color: Colors.light.secondary,
        },
        {
          icon: "mail",
          label: "Contact Support",
          description: "Get in touch with our team",
          type: "link" as const,
          color: Colors.light.primary,
        },
        {
          icon: "document-text",
          label: "Terms & Privacy",
          description: "Read our terms and privacy policy",
          type: "link" as const,
          color: Colors.light.accent,
        },
      ],
    },
  ];

  const SettingItem = ({ item, isLast }: { item: any; isLast: boolean }) => (
    <TouchableOpacity
      style={[styles.settingItem, !isLast && styles.settingItemBorder]}
      onPress={item.action}
      disabled={item.type === "toggle"}
    >
      <View style={styles.settingLeft}>
        <View
          style={[styles.settingIcon, { backgroundColor: item.color + "20" }]}
        >
          <Ionicons name={item.icon as any} size={20} color={item.color} />
        </View>
        <View style={styles.settingInfo}>
          <Text style={styles.settingLabel}>{item.label}</Text>
          <Text style={styles.settingDescription}>{item.description}</Text>
        </View>
      </View>
      <View style={styles.settingRight}>
        {item.type === "toggle" ? (
          <Switch
            value={item.value}
            onValueChange={item.action}
            trackColor={{ false: Colors.light.border, true: item.color + "50" }}
            thumbColor={item.value ? item.color : Colors.light.surface}
          />
        ) : (
          <Ionicons
            name="chevron-forward"
            size={20}
            color={Colors.light.textSecondary}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: themeState.colors.background },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={themeState.colors.text}
          />
        </TouchableOpacity>
        <Text style={[styles.title, { color: themeState.colors.text }]}>
          Settings
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Info */}
        {user && (
          <View style={styles.section}>
            <View
              style={[
                styles.userCard,
                { backgroundColor: themeState.colors.surface },
              ]}
            >
              <View style={styles.userAvatar}>
                <Text style={styles.userAvatarText}>{user.name.charAt(0)}</Text>
              </View>
              <View style={styles.userInfo}>
                <Text
                  style={[styles.userName, { color: themeState.colors.text }]}
                >
                  {user.name}
                </Text>
                <Text
                  style={[
                    styles.userEmail,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  {user.email}
                </Text>
                <Text
                  style={[styles.userPoints, { color: Colors.light.primary }]}
                >
                  {user.points} points
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Settings Sections */}
        {settingsSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text
              style={[styles.sectionTitle, { color: themeState.colors.text }]}
            >
              {section.title}
            </Text>
            <View
              style={[
                styles.settingsGroup,
                { backgroundColor: themeState.colors.surface },
              ]}
            >
              {section.items.map((item, index) => (
                <SettingItem
                  key={item.label}
                  item={item}
                  isLast={index === section.items.length - 1}
                />
              ))}
            </View>
          </View>
        ))}

        {/* App Info */}
        <View style={styles.section}>
          <View
            style={[
              styles.appInfoCard,
              { backgroundColor: themeState.colors.surface },
            ]}
          >
            <Text
              style={[styles.appInfoTitle, { color: themeState.colors.text }]}
            >
              MyQuiz App
            </Text>
            <Text
              style={[
                styles.appInfoVersion,
                { color: themeState.colors.textSecondary },
              ]}
            >
              Version 1.0.0 • Built with ❤️
            </Text>
            <View style={styles.appInfoTech}>
              <Text
                style={[
                  styles.techText,
                  { color: themeState.colors.textSecondary },
                ]}
              >
                Made with React Native • TypeScript • Expo
              </Text>
            </View>
          </View>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[
              styles.logoutCard,
              { backgroundColor: Colors.light.error + "10" },
            ]}
            onPress={handleLogout}
          >
            <View style={styles.logoutContent}>
              <View
                style={[
                  styles.logoutIcon,
                  { backgroundColor: Colors.light.error + "20" },
                ]}
              >
                <Ionicons name="log-out" size={20} color={Colors.light.error} />
              </View>
              <View style={styles.logoutInfo}>
                <Text
                  style={[styles.logoutTitle, { color: Colors.light.error }]}
                >
                  Logout
                </Text>
                <Text
                  style={[
                    styles.logoutDescription,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  Sign out of your account
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.light.error}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
  },
  placeholder: {
    width: 24,
  },
  section: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    marginBottom: Spacing.md,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  userAvatarText: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: "white",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: FontSizes.lg,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: FontSizes.md,
    marginTop: 2,
  },
  userPoints: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    marginTop: 4,
  },
  settingsGroup: {
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.md,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: FontSizes.md,
    fontWeight: "500",
    color: Colors.light.text,
  },
  settingDescription: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  settingRight: {
    marginLeft: Spacing.sm,
  },
  appInfoCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
  },
  appInfoTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "bold",
    marginBottom: Spacing.sm,
  },
  appInfoVersion: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.sm,
  },
  appInfoTech: {
    alignItems: "center",
  },
  techText: {
    fontSize: FontSizes.xs,
    textAlign: "center",
  },
  logoutCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  logoutContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  logoutIcon: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
  },
  logoutInfo: {
    flex: 1,
  },
  logoutTitle: {
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
  logoutDescription: {
    fontSize: FontSizes.sm,
    marginTop: 2,
  },
});
