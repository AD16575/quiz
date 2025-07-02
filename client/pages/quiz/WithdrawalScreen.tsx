import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  DollarSign,
  AlertCircle,
  CreditCard,
  Smartphone,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import { QuizLayout } from "@/components/quiz/QuizLayout";
import { useQuiz } from "@/lib/quiz-context";

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
  {
    id: "3",
    amount: 200,
    method: "Bank Transfer",
    requestDate: new Date("2024-02-28"),
    status: "Completed" as const,
    details: "****1234",
  },
];

const paymentMethods = [
  { id: "paypal", name: "PayPal", icon: CreditCard, min: 100 },
  { id: "upi", name: "UPI", icon: Smartphone, min: 50 },
  { id: "bank", name: "Bank Transfer", icon: Building, min: 200 },
];

const statusColors = {
  Completed:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export default function WithdrawalScreen() {
  const { state } = useQuiz();
  const user = state.user;
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");

  if (!user) return null;

  const selectedMethod = paymentMethods.find((m) => m.id === paymentMethod);
  const minAmount = selectedMethod?.min || 100;
  const requestedAmount = parseInt(amount) || 0;
  const canWithdraw =
    requestedAmount >= minAmount && requestedAmount <= user.withdrawableAmount;

  const handleWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canWithdraw) return;

    // Mock withdrawal request
    toast({
      title: "Withdrawal Requested",
      description: `Your withdrawal request for ${requestedAmount} points has been submitted.`,
    });

    setAmount("");
    setPaymentMethod("");
    setPaymentDetails("");
  };

  return (
    <QuizLayout
      showHeader
      headerContent={
        <div className="flex items-center gap-4">
          <Link to="/quiz/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h2 className="text-lg font-semibold">Withdrawal</h2>
            <p className="text-sm text-muted-foreground">
              Convert your points to cash
            </p>
          </div>
        </div>
      }
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="max-w-2xl mx-auto space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {/* Available Balance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gradient-to-br from-squid-pink/10 to-squid-teal/10 border-2 border-squid-pink/20">
              <CardContent className="p-8 text-center">
                <DollarSign className="w-16 h-16 mx-auto mb-4 text-squid-pink" />
                <h3 className="text-2xl font-bold mb-2">Available Balance</h3>
                <div className="text-4xl font-bold bg-gradient-to-r from-squid-pink to-squid-teal bg-clip-text text-transparent">
                  {user.withdrawableAmount} Points
                </div>
                <p className="text-muted-foreground mt-2">
                  ≈ ₹{user.withdrawableAmount} (1 point = ₹1)
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Withdrawal Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Request Withdrawal</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWithdrawal} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (Points)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min={minAmount}
                      max={user.withdrawableAmount}
                      required
                    />
                    {requestedAmount > 0 && (
                      <p className="text-sm text-muted-foreground">
                        ≈ ₹{requestedAmount}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="method">Payment Method</Label>
                    <Select
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map((method) => {
                          const IconComponent = method.icon;
                          return (
                            <SelectItem key={method.id} value={method.id}>
                              <div className="flex items-center gap-2">
                                <IconComponent className="w-4 h-4" />
                                <span>{method.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  (Min: {method.min})
                                </span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  {paymentMethod && (
                    <div className="space-y-2">
                      <Label htmlFor="details">
                        {paymentMethod === "paypal"
                          ? "PayPal Email"
                          : paymentMethod === "upi"
                            ? "UPI ID"
                            : "Bank Account Number"}
                      </Label>
                      <Input
                        id="details"
                        type={paymentMethod === "paypal" ? "email" : "text"}
                        placeholder={
                          paymentMethod === "paypal"
                            ? "your@email.com"
                            : paymentMethod === "upi"
                              ? "yourname@upi"
                              : "Account number"
                        }
                        value={paymentDetails}
                        onChange={(e) => setPaymentDetails(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  {selectedMethod && requestedAmount > 0 && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {requestedAmount < minAmount
                          ? `Minimum withdrawal amount for ${selectedMethod.name} is ${minAmount} points.`
                          : requestedAmount > user.withdrawableAmount
                            ? "Insufficient balance for this withdrawal amount."
                            : `Your withdrawal request will be processed within 3-5 business days.`}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-squid-pink to-squid-pink/80 hover:from-squid-pink/90 hover:to-squid-pink/70 text-white"
                    disabled={!canWithdraw || !paymentDetails}
                  >
                    Request Withdrawal
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Withdrawal History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockWithdrawalHistory.map((withdrawal, index) => (
                    <motion.div
                      key={withdrawal.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-squid-pink to-squid-pink/80 rounded-full flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{withdrawal.method}</p>
                            <Badge className={statusColors[withdrawal.status]}>
                              {withdrawal.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{withdrawal.details}</span>
                            <span>•</span>
                            <span>
                              {withdrawal.requestDate.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-squid-pink">
                          {withdrawal.amount} pts
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ₹{withdrawal.amount}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {mockWithdrawalHistory.length === 0 && (
                    <div className="text-center py-8">
                      <DollarSign className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        No withdrawal history yet.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Withdrawal Terms</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Minimum withdrawal varies by payment method</p>
                  <p>• Processing time: 3-5 business days</p>
                  <p>• 1 point = ₹1 (no conversion fees)</p>
                  <p>• Withdrawals are processed Monday to Friday</p>
                  <p>• Ensure payment details are correct to avoid delays</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </QuizLayout>
  );
}
