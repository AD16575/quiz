import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Filter,
  TrendingUp,
  Users,
  Gift,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { QuizLayout } from "@/components/quiz/QuizLayout";

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
  {
    id: "5",
    type: "Quiz" as const,
    amount: 60,
    description: "Geography Quiz - Medium",
    date: new Date("2024-03-11"),
    status: "Completed" as const,
  },
  {
    id: "6",
    type: "Referral" as const,
    amount: 50,
    description: "Friend signup bonus - Bob Smith",
    date: new Date("2024-03-10"),
    status: "Completed" as const,
  },
];

const typeIcons = {
  Quiz: TrendingUp,
  Referral: Users,
  Bonus: Gift,
  Withdrawal: DollarSign,
};

const typeColors = {
  Quiz: "from-squid-teal to-squid-teal/80",
  Referral: "from-squid-pink to-squid-pink/80",
  Bonus: "from-squid-yellow to-orange-500",
  Withdrawal: "from-purple-500 to-purple-600",
};

const statusColors = {
  Completed:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export default function PointHistoryScreen() {
  const [filter, setFilter] = useState("All");

  const filteredTransactions = mockTransactions.filter(
    (transaction) => filter === "All" || transaction.type === filter,
  );

  const totalEarned = mockTransactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawn = Math.abs(
    mockTransactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0),
  );

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
            <h2 className="text-lg font-semibold">Point History</h2>
            <p className="text-sm text-muted-foreground">
              Track your earnings and transactions
            </p>
          </div>
        </div>
      }
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {/* Summary Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gradient-to-br from-squid-teal/10 to-squid-teal/5">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-squid-teal" />
                <div className="text-2xl font-bold text-squid-teal">
                  {totalEarned}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Earned
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-squid-pink/10 to-squid-pink/5">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-squid-pink" />
                <div className="text-2xl font-bold text-squid-pink">
                  {totalWithdrawn}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Withdrawn
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-squid-yellow/10 to-squid-yellow/5">
              <CardContent className="p-6 text-center">
                <Gift className="w-8 h-8 mx-auto mb-2 text-squid-yellow" />
                <div className="text-2xl font-bold text-squid-yellow">
                  {totalEarned - totalWithdrawn}
                </div>
                <div className="text-sm text-muted-foreground">
                  Current Balance
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Filter */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Filter className="w-5 h-5 text-muted-foreground" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Transactions</SelectItem>
                <SelectItem value="Quiz">Quiz Earnings</SelectItem>
                <SelectItem value="Referral">Referral Bonuses</SelectItem>
                <SelectItem value="Bonus">Bonus Points</SelectItem>
                <SelectItem value="Withdrawal">Withdrawals</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Transaction List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>
                  Recent Transactions ({filteredTransactions.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTransactions.map((transaction, index) => {
                    const IconComponent = typeIcons[transaction.type];
                    return (
                      <motion.div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-full bg-gradient-to-br ${typeColors[transaction.type]} flex items-center justify-center`}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium">
                                {transaction.description}
                              </p>
                              <Badge
                                className={statusColors[transaction.status]}
                              >
                                {transaction.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{transaction.type}</span>
                              <span>•</span>
                              <span>
                                {transaction.date.toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-lg font-bold ${
                              transaction.amount > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.amount > 0 ? "+" : ""}
                            {transaction.amount}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            points
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {filteredTransactions.length === 0 && (
                    <div className="text-center py-8">
                      <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        No transactions found for the selected filter.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-squid-teal/10 to-squid-teal/5 border-squid-teal/20">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-squid-teal" />
                <h3 className="text-lg font-bold mb-2">Earn More Points</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Play more quizzes to increase your earnings
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-squid-teal to-squid-teal/80 hover:from-squid-teal/90 hover:to-squid-teal/70 text-white"
                >
                  <Link to="/quiz/categories">Play Quizzes</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-squid-pink/10 to-squid-pink/5 border-squid-pink/20">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-12 h-12 mx-auto mb-4 text-squid-pink" />
                <h3 className="text-lg font-bold mb-2">Request Withdrawal</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Convert your points to real money
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-squid-pink text-squid-pink hover:bg-squid-pink hover:text-white"
                >
                  <Link to="/quiz/withdrawal">Withdraw</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </QuizLayout>
  );
}
