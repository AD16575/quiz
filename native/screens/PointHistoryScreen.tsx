import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useTheme } from "../contexts/ThemeContext";

const mockTransactions = [
  {
    id: "1",
    type: "Quiz" as const,
    amount: 75,
    description: "Science Quiz - Expert Level",
    date: new Date("2024-03-15"),
    status: "Completed" as const,
  },
  {
    id: "2",
    type: "Referral" as const,
    amount: 50,
    description: "Friend signup bonus - Alice Johnson",
    date: new Date("2024-03-14"),
    status: "Completed" as const,
  },
  {
    id: "3",
    type: "Bonus" as const,
    amount: 100,
    description: "Daily streak bonus - 7 days",
    date: new Date("2024-03-13"),
    status: "Completed" as const,
  },
  {
    id: "4",
    type: "Withdrawal" as const,
    amount: -500,
    description: "PayPal withdrawal",
    date: new Date("2024-03-12"),
    status: "Pending" as const,
  },
];

const typeIcons = {
  Quiz: "trending-up",
  Referral: "people",
  Bonus: "gift",
  Withdrawal: "wallet",
};

const typeColors = {
  Quiz: Colors.light.secondary,
  Referral: Colors.light.primary,
  Bonus: Colors.light.accent,
  Withdrawal: "#8B5CF6",
};

const statusColors = {
  Completed: Colors.light.success,
  Pending: Colors.light.warning,
  Failed: Colors.light.error,
};

const filterTypes = ["All", "Quiz", "Referral", "Bonus", "Withdrawal"];

export default function PointHistoryScreen() {
  const navigation = useNavigation();
  const { state: themeState } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredTransactions = mockTransactions.filter(
    (transaction) =>
      selectedFilter === "All" || transaction.type === selectedFilter,
  );

  const totalEarned = mockTransactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawn = Math.abs(
    mockTransactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0),
  );

  const StatCard = ({ title, value, icon, color }: any) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statContent}>
        <View style={[styles.statIcon, { backgroundColor: color + "20" }]}>
          <Ionicons name={icon as any} size={24} color={color} />
        </View>
        <View style={styles.statText}>
          <Text style={styles.statValue}>{value.toLocaleString()}</Text>
          <Text style={styles.statTitle}>{title}</Text>
        </View>
      </View>
    </View>
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
          <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Point History</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <StatCard
            title="Total Earned"
            value={totalEarned}
            icon="trending-up"
            color={Colors.light.secondary}
          />
          <StatCard
            title="Total Withdrawn"
            value={totalWithdrawn}
            icon="wallet"
            color={Colors.light.primary}
          />
          <StatCard
            title="Current Balance"
            value={totalEarned - totalWithdrawn}
            icon="star"
            color={Colors.light.accent}
          />
        </View>

        {/* Filter Tabs */}
        <View style={styles.section}>
          <View style={styles.filterContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterTabs}
            >
              {filterTypes.map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterTab,
                    selectedFilter === filter && styles.activeFilterTab,
                  ]}
                  onPress={() => setSelectedFilter(filter)}
                >
                  <Text
                    style={[
                      styles.filterText,
                      selectedFilter === filter && styles.activeFilterText,
                    ]}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Transaction List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Recent Transactions ({filteredTransactions.length})
          </Text>
          <View style={styles.transactionList}>
            {filteredTransactions.map((transaction, index) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View
                  style={[
                    styles.transactionIcon,
                    { backgroundColor: typeColors[transaction.type] + "20" },
                  ]}
                >
                  <Ionicons
                    name={typeIcons[transaction.type] as any}
                    size={24}
                    color={typeColors[transaction.type]}
                  />
                </View>

                <View style={styles.transactionInfo}>
                  <View style={styles.transactionHeader}>
                    <Text style={styles.transactionDescription}>
                      {transaction.description}
                    </Text>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor:
                            statusColors[transaction.status] + "20",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          { color: statusColors[transaction.status] },
                        ]}
                      >
                        {transaction.status}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.transactionMeta}>
                    <Text style={styles.transactionType}>
                      {transaction.type}
                    </Text>
                    <Text style={styles.transactionDate}>
                      {transaction.date.toLocaleDateString()}
                    </Text>
                  </View>
                </View>

                <View style={styles.transactionAmount}>
                  <Text
                    style={[
                      styles.amountText,
                      {
                        color:
                          transaction.amount > 0
                            ? Colors.light.success
                            : Colors.light.error,
                      },
                    ]}
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    {transaction.amount}
                  </Text>
                  <Text style={styles.amountLabel}>points</Text>
                </View>
              </View>
            ))}

            {filteredTransactions.length === 0 && (
              <View style={styles.emptyState}>
                <Ionicons
                  name="trending-up"
                  size={48}
                  color={Colors.light.textSecondary}
                />
                <Text style={styles.emptyText}>No transactions found</Text>
                <Text style={styles.emptySubtext}>
                  for the selected filter.
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={[
                styles.actionCard,
                { backgroundColor: Colors.light.secondary + "15" },
              ]}
            >
              <Ionicons
                name="trending-up"
                size={32}
                color={Colors.light.secondary}
              />
              <Text style={styles.actionTitle}>Earn More Points</Text>
              <Text style={styles.actionSubtitle}>Play more quizzes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionCard,
                { backgroundColor: Colors.light.primary + "15" },
              ]}
            >
              <Ionicons name="wallet" size={32} color={Colors.light.primary} />
              <Text style={styles.actionTitle}>Request Withdrawal</Text>
              <Text style={styles.actionSubtitle}>Convert to cash</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
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
    color: Colors.light.text,
  },
  placeholder: {
    width: 24,
  },
  summaryContainer: {
    flexDirection: "row",
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderLeftWidth: 4,
  },
  statContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
  },
  statText: {
    flex: 1,
  },
  statValue: {
    fontSize: FontSizes.lg,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  statTitle: {
    fontSize: FontSizes.xs,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: Spacing.md,
  },
  filterContainer: {
    marginBottom: Spacing.md,
  },
  filterTabs: {
    gap: Spacing.sm,
  },
  filterTab: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  activeFilterTab: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  filterText: {
    fontSize: FontSizes.sm,
    fontWeight: "600",
    color: Colors.light.textSecondary,
  },
  activeFilterText: {
    color: "white",
  },
  transactionList: {
    gap: Spacing.md,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },
  transactionDescription: {
    flex: 1,
    fontSize: FontSizes.md,
    fontWeight: "600",
    color: Colors.light.text,
    marginRight: Spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  statusText: {
    fontSize: FontSizes.xs,
    fontWeight: "600",
  },
  transactionMeta: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  transactionType: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
  },
  transactionDate: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
  },
  transactionAmount: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: FontSizes.lg,
    fontWeight: "bold",
  },
  amountLabel: {
    fontSize: FontSizes.xs,
    color: Colors.light.textSecondary,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    color: Colors.light.textSecondary,
    marginTop: Spacing.md,
  },
  emptySubtext: {
    fontSize: FontSizes.md,
    color: Colors.light.textSecondary,
    marginTop: Spacing.xs,
  },
  quickActions: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  actionCard: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
  },
  actionTitle: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    color: Colors.light.text,
    marginTop: Spacing.sm,
    textAlign: "center",
  },
  actionSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    marginTop: 2,
    textAlign: "center",
  },
});
