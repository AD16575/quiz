import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/colors";
import { useQuiz } from "../contexts/QuizContext";
import { useTheme } from "../contexts/ThemeContext";
import GradientBackground from "../components/common/GradientBackground";

export default function WithdrawalScreen() {
  const navigation = useNavigation();
  const { state } = useQuiz();
  const { state: themeState } = useTheme();
  const { user } = state;

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: "",
    accountNumber: "",
    ifscCode: "",
    paypalEmail: "",
  });

  if (!user) return null;

  const withdrawalMethods = [
    {
      id: "upi",
      name: "UPI",
      icon: "phone-portrait",
      description: "Instant transfer via UPI",
      minAmount: 100,
      color: "rgb(34, 197, 94)",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: "card",
      description: "2-3 business days",
      minAmount: 500,
      color: "rgb(59, 130, 246)",
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: "logo-paypal",
      description: "1-2 business days",
      minAmount: 1000,
      color: "rgb(249, 115, 22)",
    },
  ];

  const handleWithdraw = () => {
    if (!selectedMethod) {
      Alert.alert("Error", "Please select a withdrawal method");
      return;
    }

    if (!amount || parseInt(amount) < getMinAmount()) {
      Alert.alert("Error", `Minimum withdrawal amount is ₹${getMinAmount()}`);
      return;
    }

    if (parseInt(amount) > user.withdrawableAmount) {
      Alert.alert("Error", "Insufficient balance");
      return;
    }

    Alert.alert(
      "Withdrawal Request",
      `Your withdrawal request of ₹${amount} has been submitted. You will receive the amount within the specified time.`,
      [{ text: "OK", onPress: () => navigation.goBack() }],
    );
  };

  const getMinAmount = () => {
    const method = withdrawalMethods.find((m) => m.id === selectedMethod);
    return method?.minAmount || 100;
  };

  const MethodCard = ({ method }: { method: any }) => (
    <TouchableOpacity
      style={[
        styles.methodCard,
        {
          backgroundColor: themeState.colors.surface,
          borderColor:
            selectedMethod === method.id
              ? method.color
              : "rgba(255, 255, 255, 0.1)",
          borderWidth: selectedMethod === method.id ? 2 : 1,
        },
      ]}
      onPress={() => setSelectedMethod(method.id)}
      activeOpacity={0.8}
    >
      <View style={styles.methodLeft}>
        <View
          style={[styles.methodIcon, { backgroundColor: method.color + "20" }]}
        >
          <Ionicons name={method.icon} size={24} color={method.color} />
        </View>
        <View style={styles.methodInfo}>
          <Text style={[styles.methodName, { color: themeState.colors.text }]}>
            {method.name}
          </Text>
          <Text
            style={[
              styles.methodDescription,
              { color: themeState.colors.textSecondary },
            ]}
          >
            {method.description}
          </Text>
          <Text
            style={[
              styles.methodMinAmount,
              { color: themeState.colors.textSecondary },
            ]}
          >
            Min: ₹{method.minAmount}
          </Text>
        </View>
      </View>
      {selectedMethod === method.id && (
        <Ionicons name="checkmark-circle" size={24} color={method.color} />
      )}
    </TouchableOpacity>
  );

  const renderPaymentDetailsForm = () => {
    if (!selectedMethod) return null;

    switch (selectedMethod) {
      case "upi":
        return (
          <View style={styles.detailsForm}>
            <Text style={[styles.formLabel, { color: themeState.colors.text }]}>
              UPI ID
            </Text>
            <TextInput
              style={[
                styles.formInput,
                {
                  backgroundColor: themeState.colors.surface,
                  borderColor: themeState.colors.border,
                  color: themeState.colors.text,
                },
              ]}
              placeholder="Enter your UPI ID"
              placeholderTextColor={themeState.colors.textSecondary}
              value={paymentDetails.upiId}
              onChangeText={(text) =>
                setPaymentDetails({ ...paymentDetails, upiId: text })
              }
            />
          </View>
        );

      case "bank":
        return (
          <View style={styles.detailsForm}>
            <View style={styles.formGroup}>
              <Text
                style={[styles.formLabel, { color: themeState.colors.text }]}
              >
                Account Number
              </Text>
              <TextInput
                style={[
                  styles.formInput,
                  {
                    backgroundColor: themeState.colors.surface,
                    borderColor: themeState.colors.border,
                    color: themeState.colors.text,
                  },
                ]}
                placeholder="Enter account number"
                placeholderTextColor={themeState.colors.textSecondary}
                value={paymentDetails.accountNumber}
                onChangeText={(text) =>
                  setPaymentDetails({ ...paymentDetails, accountNumber: text })
                }
              />
            </View>
            <View style={styles.formGroup}>
              <Text
                style={[styles.formLabel, { color: themeState.colors.text }]}
              >
                IFSC Code
              </Text>
              <TextInput
                style={[
                  styles.formInput,
                  {
                    backgroundColor: themeState.colors.surface,
                    borderColor: themeState.colors.border,
                    color: themeState.colors.text,
                  },
                ]}
                placeholder="Enter IFSC code"
                placeholderTextColor={themeState.colors.textSecondary}
                value={paymentDetails.ifscCode}
                onChangeText={(text) =>
                  setPaymentDetails({ ...paymentDetails, ifscCode: text })
                }
              />
            </View>
          </View>
        );

      case "paypal":
        return (
          <View style={styles.detailsForm}>
            <Text style={[styles.formLabel, { color: themeState.colors.text }]}>
              PayPal Email
            </Text>
            <TextInput
              style={[
                styles.formInput,
                {
                  backgroundColor: themeState.colors.surface,
                  borderColor: themeState.colors.border,
                  color: themeState.colors.text,
                },
              ]}
              placeholder="Enter your PayPal email"
              placeholderTextColor={themeState.colors.textSecondary}
              value={paymentDetails.paypalEmail}
              onChangeText={(text) =>
                setPaymentDetails({ ...paymentDetails, paypalEmail: text })
              }
            />
          </View>
        );

      default:
        return null;
    }
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
            Withdrawal
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Balance Card */}
          <View style={styles.balanceSection}>
            <LinearGradient
              colors={["rgb(255, 204, 0)", "rgba(255, 204, 0, 0.8)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.balanceCard}
            >
              <View style={styles.balanceContent}>
                <Ionicons name="wallet" size={48} color="white" />
                <Text style={styles.balanceTitle}>Available Balance</Text>
                <Text style={styles.balanceValue}>
                  ₹{user.withdrawableAmount}
                </Text>
                <Text style={styles.balanceSubtitle}>Ready for withdrawal</Text>
              </View>
            </LinearGradient>
          </View>

          {/* Amount Input */}
          <View style={styles.amountSection}>
            <View
              style={[
                styles.amountCard,
                { backgroundColor: themeState.colors.surface },
              ]}
            >
              <Text
                style={[styles.amountTitle, { color: themeState.colors.text }]}
              >
                Withdrawal Amount
              </Text>
              <View
                style={[
                  styles.amountInputContainer,
                  {
                    backgroundColor: themeState.isDark
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.05)",
                  },
                ]}
              >
                <Text style={styles.currencySymbol}>₹</Text>
                <TextInput
                  style={[
                    styles.amountInput,
                    { color: themeState.colors.text },
                  ]}
                  placeholder="0"
                  placeholderTextColor={themeState.colors.textSecondary}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          {/* Withdrawal Methods */}
          <View style={styles.methodsSection}>
            <Text
              style={[styles.sectionTitle, { color: themeState.colors.text }]}
            >
              Select Withdrawal Method
            </Text>
            <View style={styles.methodsList}>
              {withdrawalMethods.map((method) => (
                <MethodCard key={method.id} method={method} />
              ))}
            </View>
          </View>

          {/* Payment Details Form */}
          {renderPaymentDetailsForm()}

          {/* Withdraw Button */}
          <View style={styles.withdrawSection}>
            <TouchableOpacity
              style={[
                styles.withdrawButton,
                {
                  backgroundColor:
                    selectedMethod && amount
                      ? "rgb(34, 197, 94)"
                      : "rgba(34, 197, 94, 0.5)",
                },
              ]}
              onPress={handleWithdraw}
              disabled={!selectedMethod || !amount}
            >
              <Ionicons name="send" size={20} color="white" />
              <Text style={styles.withdrawButtonText}>Request Withdrawal</Text>
            </TouchableOpacity>
          </View>

          {/* Terms */}
          <View style={styles.termsSection}>
            <Text
              style={[
                styles.termsText,
                { color: themeState.colors.textSecondary },
              ]}
            >
              • Minimum withdrawal varies by method
              {"\n"}• Processing time depends on selected method
              {"\n"}• No processing fees for withdrawals above ₹1000
              {"\n"}• Withdrawals are processed within 24 hours
            </Text>
          </View>
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
  balanceSection: {
    marginBottom: Spacing.xl,
  },
  balanceCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  balanceContent: {
    alignItems: "center",
  },
  balanceTitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: FontSizes.md,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  balanceValue: {
    color: "white",
    fontSize: 48,
    fontWeight: "700",
    marginBottom: Spacing.sm,
  },
  balanceSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: FontSizes.sm,
  },
  amountSection: {
    marginBottom: Spacing.xl,
  },
  amountCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  amountTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "700",
    marginBottom: Spacing.md,
    textAlign: "center",
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  currencySymbol: {
    fontSize: FontSizes.xl,
    fontWeight: "700",
    color: "rgb(238, 58, 124)",
    marginRight: Spacing.sm,
  },
  amountInput: {
    flex: 1,
    fontSize: FontSizes.xl,
    fontWeight: "700",
    textAlign: "center",
  },
  methodsSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "700",
    marginBottom: Spacing.md,
  },
  methodsList: {
    gap: Spacing.md,
  },
  methodCard: {
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
  },
  methodLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    marginBottom: 2,
  },
  methodDescription: {
    fontSize: FontSizes.sm,
    marginBottom: 2,
  },
  methodMinAmount: {
    fontSize: FontSizes.xs,
  },
  detailsForm: {
    marginBottom: Spacing.xl,
  },
  formGroup: {
    marginBottom: Spacing.md,
  },
  formLabel: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    marginBottom: Spacing.sm,
  },
  formInput: {
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    fontSize: FontSizes.md,
  },
  withdrawSection: {
    marginBottom: Spacing.xl,
  },
  withdrawButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  withdrawButtonText: {
    color: "white",
    fontSize: FontSizes.lg,
    fontWeight: "600",
  },
  termsSection: {
    padding: Spacing.md,
  },
  termsText: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
    textAlign: "left",
  },
});
