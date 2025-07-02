import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, Users, DollarSign, Settings, Trophy, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PointDisplay } from "@/components/quiz/PointDisplay";
import { QuizLayout } from "@/components/quiz/QuizLayout";
import { useQuiz } from "@/lib/quiz-context";

export default function HomeDashboard() {
  const { state } = useQuiz();
  const user = state.user;

  if (!user) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <QuizLayout
      showHeader
      headerContent={
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Hello, {user.name}! 👋</h2>
            <p className="text-sm text-muted-foreground">Ready to play?</p>
          </div>
          <Link to="/quiz/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      }
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={itemVariants}
          >
            <PointDisplay
              points={user.points}
              label="Total Points"
              variant="default"
              size="lg"
              animated
            />
            <PointDisplay
              points={user.totalQuizzes}
              label="Quizzes Played"
              variant="earned"
              size="lg"
              animated
            />
            <PointDisplay
              points={user.withdrawableAmount}
              label="Withdrawable"
              variant="withdrawable"
              size="lg"
              animated
            />
          </motion.div>

          {/* Play Now Section */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-squid-pink/10 to-squid-teal/10 border-2 border-squid-pink/20">
              <CardContent className="p-8 text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Zap className="w-16 h-16 mx-auto mb-4 text-squid-pink" />
                  <h3 className="text-2xl font-bold mb-2">Ready to Play?</h3>
                  <p className="text-muted-foreground mb-6">
                    Choose from various categories and start earning points!
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-squid-pink to-squid-pink/80 hover:from-squid-pink/90 hover:to-squid-pink/70 text-white font-semibold px-8 py-3"
                  >
                    <Link to="/quiz/categories">
                      <Play className="w-5 h-5 mr-2" />
                      Play Now
                    </Link>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={itemVariants}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Users className="w-12 h-12 mx-auto mb-2 text-squid-teal" />
                <CardTitle>Referral Program</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div>
                  <p className="text-2xl font-bold text-squid-teal">
                    {user.referredUsers}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Friends Referred
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-squid-teal text-squid-teal hover:bg-squid-teal hover:text-white"
                >
                  <Link to="/quiz/referral">View Details</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <DollarSign className="w-12 h-12 mx-auto mb-2 text-squid-yellow" />
                <CardTitle>Withdrawal</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div>
                  <p className="text-2xl font-bold text-squid-yellow">
                    ₹{user.withdrawableAmount}
                  </p>
                  <p className="text-sm text-muted-foreground">Available</p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-squid-yellow text-squid-yellow hover:bg-squid-yellow hover:text-white"
                >
                  <Link to="/quiz/withdrawal">Withdraw Now</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-squid-pink" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-squid-pink/10 rounded-lg">
                    <div>
                      <p className="font-medium">Quiz Master</p>
                      <p className="text-sm text-muted-foreground">
                        Completed 10 quizzes
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-squid-pink">+100 points</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-squid-teal/10 rounded-lg">
                    <div>
                      <p className="font-medium">First Referral</p>
                      <p className="text-sm text-muted-foreground">
                        Referred your first friend
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-squid-teal">+50 points</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </QuizLayout>
  );
}
