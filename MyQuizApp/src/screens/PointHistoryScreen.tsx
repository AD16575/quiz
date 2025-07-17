import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useQuiz } from "../contexts/QuizContext";
import { useTheme } from "../contexts/ThemeContext";
import GradientBackground from "../components/common/GradientBackground";

export default function PointHistoryScreen() {
  const navigation = useNavigation();
  const { state } = useQuiz();
  const { state: themeState } = useTheme();
  const { user } = state;

  const [filter, setFilter] = useState<
    "all" | "earned" | "spent" | "withdrawn"
  >("all");

  if (!user) return null;

  // Mock transaction data
  const mockTransactions = [
    {
      id: "1",
      type: "earned" as const,
      amount: 50,
      description: "Completed Quiz: World Capitals",
      date: new Date("2024-01-30"),
      icon: "trophy",
      color: "rgb(34, 197, 94)",
    },
    {
      id: "2",
      type: "earned" as const,
      amount: 100,
      description: "Referral Bonus - John Smith joined",
      date: new Date("2024-01-29"),
      icon: "people",
      color: "rgb(34, 197, 94)",
    },
    {
      id: "3",
      type: "earned" as const,
      amount: 75,
      description: "Completed Quiz: Science Fundamentals",
      date: new Date("2024-01-28"),
      icon: "trophy",
      color: "rgb(34, 197, 94)",
    },
    {
      id: "4",
      type: "withdrawn" as const,
      amount: 500,
      description: "Withdrawal to UPI",
      date: new Date("2024-01-27"),
      icon: "send",
      color: "rgb(239, 68, 68)",
    },
    {
      id: "5",
      type: "earned" as const,
      amount: 25,
      description: "Daily Login Bonus",
      date: new Date("2024-01-26"),
      icon: "star",
      color: "rgb(34, 197, 94)",
    },
    {
      id: "6",
      type: "earned" as const,
      amount: 150,
      description: "Weekly Challenge Completed",
      date: new Date("2024-01-25"),
      icon: "medal",
      color: "rgb(34, 197, 94)",
    },
    {
      id: "7",
      type: "spent" as const,
      amount: 200,
      description: "Premium Quiz Unlock",
      date: new Date("2024-01-24"),
      icon: "lock-open",
      color: "rgb(249, 115, 22)",
    },
    {
      id: "8",
      type: "earned" as const,
      amount: 80,
      description: "Completed Quiz: Geography Masters",
      date: new Date("2024-01-23"),
      icon: "trophy",
      color: "rgb(34, 197, 94)",
    },
  ];

  const filteredTransactions = mockTransactions.filter((transaction) => {
    if (filter === "all") return true;
    return transaction.type === filter;
  });

  const filterOptions = [
    { key: "all", label: "All", count: mockTransactions.length },
    {
      key: "earned",
      label: "Earned",
      count: mockTransactions.filter((t) => t.type === "earned").length,
    },
    {
      key: "spent",
      label: "Spent",
      count: mockTransactions.filter((t) => t.type === "spent").length,
    },
    {
      key: "withdrawn",
      label: "Withdrawn",
      count: mockTransactions.filter((t) => t.type === "withdrawn").length,
    },
  ];

  const FilterTab = ({ option }: { option: any }) => (
    <TouchableOpacity
      style={[
        styles.filterTab,
        {
          backgroundColor:
            filter === option.key
              ? "rgb(238, 58, 124)"
              : themeState.colors.surface,
          borderColor:
            filter === option.key
              ? "rgb(238, 58, 124)"
              : themeState.colors.border,
        },
      ]}
      onPress={() => setFilter(option.key)}
    >
      <Text
        style={[
          styles.filterLabel,
          {
            color: filter === option.key ? "white" : themeState.colors.text,
          },
        ]}
      >
        {option.label}
      </Text>
      <View
        style={[
          styles.filterCount,
          {
            backgroundColor:
              filter === option.key
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(238, 58, 124, 0.1)",
          },
        ]}
      >
        <Text
          style={[
            styles.filterCountText,
            {
              color: filter === option.key ? "white" : "rgb(238, 58, 124)",
            },
          ]}
        >
          {option.count}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const TransactionItem = ({ transaction }: { transaction: any }) => (
    <View
      style={[
        styles.transactionItem,
        { backgroundColor: themeState.colors.surface },
      ]}
    >
      <View style={styles.transactionLeft}>
        <View
          style={[
            styles.transactionIcon,
            { borderColor: transaction.color + "20" },
          ]}
        >
          <Ionicons
            name={transaction.icon}
            size={24}
            color={transaction.color}
          />
        </View>
        <View style={styles.transactionInfo}>
          <Text
            style={[
              styles.transactionDescription,
              { color: themeState.colors.text },
            ]}
          >
            {transaction.description}
          </Text>
          <Text
            style={[
              styles.transactionDate,
              { color: themeState.colors.textSecondary },
            ]}
          >
            {transaction.date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <Text
          style={[
            styles.transactionAmount,
            {
              color:
                transaction.type === "earned"
                  ? "rgb(34, 197, 94)"
                  : transaction.type === "withdrawn"
                    ? "rgb(239, 68, 68)"
                    : "rgb(249, 115, 22)",
            },
          ]}
        >
          {transaction.type === "earned" ? "+" : "-"}₹{transaction.amount}
        </Text>
        <Text
          style={[
            styles.transactionType,
            { color: themeState.colors.textSecondary },
          ]}
        >
          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
        </Text>
      </View>
    </View>
  );

  const getTotalByType = (type: string) => {
    return mockTransactions
      .filter((t) => t.type === type)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={[
              styles.backButton,
              {
                backgroundColor: themeState.colors.surface,
                borderColor: themeState.colors.border,
              },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={20}
              color={themeState.colors.text}
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: themeState.colors.text }]}>
            Point History
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Summary Cards */}
          <View style={styles.summarySection}>
            <View style={styles.summaryGrid}>
              <View
                style={[
                  styles.summaryCard,
                  { backgroundColor: "rgba(34, 197, 94, 0.1)" },
                ]}
              >
                <Ionicons
                  name="trending-up"
                  size={24}
                  color="rgb(34, 197, 94)"
                />
                <Text style={styles.summaryValue}>
                  ₹{getTotalByType("earned")}
                </Text>
                <Text
                  style={[
                    styles.summaryLabel,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  Total Earned
                </Text>
              </View>
              <View
                style={[
                  styles.summaryCard,
                  { backgroundColor: "rgba(249, 115, 22, 0.1)" },
                ]}
              >
                <Ionicons
                  name="trending-down"
                  size={24}
                  color="rgb(249, 115, 22)"
                />
                <Text style={styles.summaryValue}>
                  ₹{getTotalByType("spent")}
                </Text>
                <Text
                  style={[
                    styles.summaryLabel,
                    { color: themeState.colors.textSecondary },
                  ]}
                >
                  Total Spent
                </Text>
              </View>
            </View>
          </View>

          {/* Filter Tabs */}
          <View style={styles.filterSection}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterTabs}
            >
              {filterOptions.map((option) => (
                <FilterTab key={option.key} option={option} />
              ))}
            </ScrollView>
          </View>

          {/* Transactions List */}
          <View style={styles.transactionsSection}>
            <Text
              style={[styles.sectionTitle, { color: themeState.colors.text }]}
            >
              {filter === "all"
                ? "All Transactions"
                : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Transactions`}
              ({filteredTransactions.length})
            </Text>
            <View style={styles.transactionsList}>
              {filteredTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </View>
          </View>

          {/* Empty State */}
          {filteredTransactions.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons
                name="receipt-outline"
                size={64}
                color={themeState.colors.textSecondary}
              />
              <Text
                style={[styles.emptyTitle, { color: themeState.colors.text }]}
              >
                No transactions found
              </Text>
              <Text
                style={[
                  styles.emptySubtitle,
                  { color: themeState.colors.textSecondary },
                ]}
              >
                Start playing quizzes to earn your first points!
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    // paddingTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  backButton: {
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
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingBottom: 100,
  },
  summarySection: {
    marginBottom: Spacing.xl,
  },
  summaryGrid: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  summaryCard: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  summaryValue: {
    fontSize: FontSizes.xl,
    fontWeight: "700",
    color: "rgb(238, 58, 124)",
    marginVertical: Spacing.sm,
  },
  summaryLabel: {
    fontSize: FontSizes.sm,
    textAlign: "center",
  },
  filterSection: {
    marginBottom: Spacing.xl,
  },
  filterTabs: {
    flexDirection: "row",
    gap: Spacing.sm,
    paddingHorizontal: 4,
  },
  filterTab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  filterLabel: {
    fontSize: FontSizes.sm,
    fontWeight: "600",
  },
  filterCount: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    minWidth: 24,
    alignItems: "center",
  },
  filterCountText: {
    fontSize: FontSizes.xs,
    fontWeight: "700",
  },
  transactionsSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "700",
    marginBottom: Spacing.md,
  },
  transactionsList: {
    gap: Spacing.md,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: FontSizes.sm,
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: FontSizes.lg,
    fontWeight: "700",
    marginBottom: 2,
  },
  transactionType: {
    fontSize: FontSizes.xs,
    textTransform: "capitalize",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: Spacing.xxl,
  },
  emptyTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "700",
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontSize: FontSizes.md,
    textAlign: "center",
  },
});
