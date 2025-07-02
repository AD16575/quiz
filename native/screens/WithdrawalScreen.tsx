import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useQuiz } from "../contexts/QuizContext";
import { useTheme } from "../contexts/ThemeContext";

const paymentMethods = [
  { id: "paypal", name: "PayPal", icon: "card", min: 100 },
  { id: "upi", name: "UPI", icon: "phone-portrait", min: 50 },
  { id: "bank", name: "Bank Transfer", icon: "business", min: 200 },
];

const mockWithdrawalHistory = [
  {
    id: "1",
    amount: 500,
    method: "PayPal",
    requestDate: new Date("2024-03-10"),
    status: "Completed" as const,
    details: "john@example.com",
  },
  {
    id: "2",
    amount: 300,
    method: "UPI",
    requestDate: new Date("2024-03-05"),
    status: "Pending" as const,
    details: "john@paytm",
  },
];

const statusColors = {
  Completed: Colors.light.success,
  Pending: Colors.light.warning,
  Rejected: Colors.light.error,
};

export default function WithdrawalScreen() {
  const navigation = useNavigation();
  const { state } = useQuiz();
  const { state: themeState } = useTheme();
  const user = state.user;
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");

  if (!user) return null;

  const method = paymentMethods.find((m) => m.id === selectedMethod);
  const minAmount = method?.min || 100;
  const requestedAmount = parseInt(amount) || 0;
  const canWithdraw =
    requestedAmount >= minAmount && requestedAmount <= user.withdrawableAmount;

  const handleWithdrawal = () => {
    if (!canWithdraw || !paymentDetails) {
      Alert.alert("Error", "Please fill all fields and meet minimum amount");
      return;
    }

    Alert.alert(
      "Withdrawal Requested",
      `Your withdrawal request for ${requestedAmount} points has been submitted.`,
      [{ text: "OK", onPress: () => navigation.goBack() }],
    );
  };

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
        <Text style={styles.title}>Withdrawal</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Available Balance */}
        <View style={styles.section}>
          <View style={styles.balanceCard}>
            <Ionicons
              name="wallet"
              size={64}
              color={Colors.light.primary}
              style={styles.balanceIcon}
            />
            <Text style={styles.balanceTitle}>Available Balance</Text>
            <Text style={styles.balanceAmount}>
              {user.withdrawableAmount} Points
            </Text>
            <Text style={styles.balanceSubtext}>
              ≈ ₹{user.withdrawableAmount} (1 point = ₹1)
            </Text>
          </View>
        </View>

        {/* Withdrawal Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Request Withdrawal</Text>
          <View style={styles.form}>
            {/* Amount Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Amount (Points)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                placeholderTextColor={Colors.light.textSecondary}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />
              {requestedAmount > 0 && (
                <Text style={styles.conversionText}>≈ ₹{requestedAmount}</Text>
              )}
            </View>

            {/* Payment Method Selection */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Payment Method</Text>
              <View style={styles.methodsContainer}>
                {paymentMethods.map((method) => (
                  <TouchableOpacity
                    key={method.id}
                    style={[
                      styles.methodCard,
                      selectedMethod === method.id && styles.selectedMethod,
                    ]}
                    onPress={() => setSelectedMethod(method.id)}
                  >
                    <Ionicons
                      name={method.icon as any}
                      size={24}
                      color={
                        selectedMethod === method.id
                          ? Colors.light.primary
                          : Colors.light.textSecondary
                      }
                    />
                    <Text
                      style={[
                        styles.methodName,
                        selectedMethod === method.id &&
                          styles.selectedMethodText,
                      ]}
                    >
                      {method.name}
                    </Text>
                    <Text style={styles.methodMin}>Min: {method.min}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Payment Details */}
            {selectedMethod && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  {selectedMethod === "paypal"
                    ? "PayPal Email"
                    : selectedMethod === "upi"
                      ? "UPI ID"
                      : "Bank Account Number"}
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder={
                    selectedMethod === "paypal"
                      ? "your@email.com"
                      : selectedMethod === "upi"
                        ? "yourname@upi"
                        : "Account number"
                  }
                  placeholderTextColor={Colors.light.textSecondary}
                  value={paymentDetails}
                  onChangeText={setPaymentDetails}
                  keyboardType={
                    selectedMethod === "paypal" ? "email-address" : "default"
                  }
                />
              </View>
            )}

            {/* Withdrawal Button */}
            <TouchableOpacity
              style={[
                styles.withdrawButton,
                (!canWithdraw || !paymentDetails) && styles.disabledButton,
              ]}
              onPress={handleWithdrawal}
              disabled={!canWithdraw || !paymentDetails}
            >
              <Text style={styles.withdrawButtonText}>Request Withdrawal</Text>
            </TouchableOpacity>

            {/* Validation Message */}
            {method && requestedAmount > 0 && (
              <View style={styles.validationContainer}>
                <Ionicons
                  name="information-circle"
                  size={16}
                  color={Colors.light.textSecondary}
                />
                <Text style={styles.validationText}>
                  {requestedAmount < minAmount
                    ? `Minimum withdrawal amount for ${method.name} is ${minAmount} points.`
                    : requestedAmount > user.withdrawableAmount
                      ? "Insufficient balance for this withdrawal amount."
                      : "Your withdrawal request will be processed within 3-5 business days."}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Withdrawal History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Withdrawal History</Text>
          <View style={styles.historyContainer}>
            {mockWithdrawalHistory.map((withdrawal) => (
              <View key={withdrawal.id} style={styles.historyItem}>
                <View style={styles.historyIcon}>
                  <Ionicons
                    name="wallet"
                    size={24}
                    color={Colors.light.primary}
                  />
                </View>
                <View style={styles.historyInfo}>
                  <View style={styles.historyHeader}>
                    <Text style={styles.historyMethod}>
                      {withdrawal.method}
                    </Text>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor:
                            statusColors[withdrawal.status] + "20",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          { color: statusColors[withdrawal.status] },
                        ]}
                      >
                        {withdrawal.status}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.historyDetails}>
                    {withdrawal.details}
                  </Text>
                  <Text style={styles.historyDate}>
                    {withdrawal.requestDate.toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.historyAmount}>
                  <Text style={styles.amountText}>{withdrawal.amount} pts</Text>
                  <Text style={styles.amountSubtext}>₹{withdrawal.amount}</Text>
                </View>
              </View>
            ))}

            {mockWithdrawalHistory.length === 0 && (
              <View style={styles.emptyState}>
                <Ionicons
                  name="wallet"
                  size={48}
                  color={Colors.light.textSecondary}
                />
                <Text style={styles.emptyText}>No withdrawals yet</Text>
              </View>
            )}
          </View>
        </View>

        {/* Terms */}
        <View style={styles.section}>
          <View style={styles.termsCard}>
            <Text style={styles.termsTitle}>Withdrawal Terms</Text>
            <View style={styles.termsList}>
              <Text style={styles.termItem}>
                • Minimum withdrawal varies by payment method
              </Text>
              <Text style={styles.termItem}>
                • Processing time: 3-5 business days
              </Text>
              <Text style={styles.termItem}>
                • 1 point = ₹1 (no conversion fees)
              </Text>
              <Text style={styles.termItem}>
                • Withdrawals are processed Monday to Friday
              </Text>
            </View>
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
  balanceCard: {
    backgroundColor: `${Colors.light.primary}10`,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: "center",
    borderWidth: 2,
    borderColor: `${Colors.light.primary}30`,
  },
  balanceIcon: {
    marginBottom: Spacing.md,
  },
  balanceTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: Spacing.sm,
  },
  balanceAmount: {
    fontSize: FontSizes.xxxl,
    fontWeight: "bold",
    color: Colors.light.primary,
    marginBottom: Spacing.xs,
  },
  balanceSubtext: {
    fontSize: FontSizes.md,
    color: Colors.light.textSecondary,
  },
  form: {
    gap: Spacing.lg,
  },
  inputContainer: {
    gap: Spacing.sm,
  },
  label: {
    fontSize: FontSizes.md,
    fontWeight: "500",
    color: Colors.light.text,
  },
  input: {
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.light.border,
    padding: Spacing.md,
    fontSize: FontSizes.md,
    color: Colors.light.text,
  },
  conversionText: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    marginTop: Spacing.xs,
  },
  methodsContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  methodCard: {
    flex: 1,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.light.border,
  },
  selectedMethod: {
    borderColor: Colors.light.primary,
    backgroundColor: `${Colors.light.primary}10`,
  },
  methodName: {
    fontSize: FontSizes.sm,
    fontWeight: "600",
    color: Colors.light.text,
    marginTop: Spacing.xs,
  },
  selectedMethodText: {
    color: Colors.light.primary,
  },
  methodMin: {
    fontSize: FontSizes.xs,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  withdrawButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xl,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: Colors.light.textSecondary,
    opacity: 0.5,
  },
  withdrawButtonText: {
    color: "white",
    fontSize: FontSizes.lg,
    fontWeight: "600",
  },
  validationContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
    padding: Spacing.md,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
  },
  validationText: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    lineHeight: 18,
  },
  historyContainer: {
    gap: Spacing.md,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  historyIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    backgroundColor: `${Colors.light.primary}20`,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  historyInfo: {
    flex: 1,
  },
  historyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },
  historyMethod: {
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
  historyDetails: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    marginBottom: 2,
  },
  historyDate: {
    fontSize: FontSizes.xs,
    color: Colors.light.textSecondary,
  },
  historyAmount: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: FontSizes.md,
    fontWeight: "bold",
    color: Colors.light.primary,
  },
  amountSubtext: {
    fontSize: FontSizes.xs,
    color: Colors.light.textSecondary,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    fontSize: FontSizes.lg,
    color: Colors.light.textSecondary,
    marginTop: Spacing.md,
  },
  termsCard: {
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  termsTitle: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: Spacing.md,
  },
  termsList: {
    gap: Spacing.sm,
  },
  termItem: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    lineHeight: 18,
  },
});
