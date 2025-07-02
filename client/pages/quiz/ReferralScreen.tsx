import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Copy,
  Share2,
  Gift,
  Trophy,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { PointDisplay } from "@/components/quiz/PointDisplay";
import { QuizLayout } from "@/components/quiz/QuizLayout";
import { useQuiz } from "@/lib/quiz-context";

const mockReferredUsers = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    joinedDate: new Date("2024-01-15"),
    pointsEarned: 250,
    status: "active",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    joinedDate: new Date("2024-02-10"),
    pointsEarned: 180,
    status: "active",
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol@example.com",
    joinedDate: new Date("2024-02-20"),
    pointsEarned: 95,
    status: "pending",
  },
];

export default function ReferralScreen() {
  const { state } = useQuiz();
  const user = state.user;

  if (!user) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  const handleShare = () => {
    const shareText = `Join MyQuiz with my referral code ${user.referralCode} and earn bonus points! 🎉`;
    const shareUrl = `${window.location.origin}/quiz/signup?ref=${user.referralCode}`;

    if (navigator.share) {
      navigator.share({
        title: "Join MyQuiz",
        text: shareText,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      });
    }
  };

  const totalEarned = mockReferredUsers.reduce(
    (sum, user) => sum + user.pointsEarned * 0.1,
    0,
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
            <h2 className="text-lg font-semibold">Referral Program</h2>
            <p className="text-sm text-muted-foreground">
              Invite friends and earn rewards
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
          {/* Stats Overview */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <PointDisplay
              points={user.referredUsers}
              label="Friends Referred"
              variant="default"
              size="lg"
              animated
            />
            <PointDisplay
              points={totalEarned}
              label="Total Earned"
              variant="earned"
              size="lg"
              animated
            />
            <PointDisplay
              points={50}
              label="Per Referral"
              variant="withdrawable"
              size="lg"
              animated
            />
          </motion.div>

          {/* Referral Code Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-squid-pink/10 to-squid-teal/10 border-2 border-squid-pink/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  <Gift className="w-6 h-6 text-squid-pink" />
                  Your Referral Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-squid-pink to-squid-teal bg-clip-text text-transparent mb-2">
                    {user.referralCode}
                  </div>
                  <p className="text-muted-foreground">
                    Share this code with your friends
                  </p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="referral-link">Referral Link</Label>
                  <div className="flex gap-2">
                    <Input
                      id="referral-link"
                      value={`${window.location.origin}/quiz/signup?ref=${user.referralCode}`}
                      readOnly
                      className="bg-background/50"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCopyCode}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={handleCopyCode}
                    className="bg-gradient-to-r from-squid-teal to-squid-teal/80 hover:from-squid-teal/90 hover:to-squid-teal/70 text-white"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="border-squid-pink text-squid-pink hover:bg-squid-pink hover:text-white"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* How it Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-squid-pink to-squid-pink/80 rounded-full flex items-center justify-center">
                      <Share2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold">1. Share Your Code</h3>
                    <p className="text-sm text-muted-foreground">
                      Send your referral code to friends and family
                    </p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-squid-teal to-squid-teal/80 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold">2. Friend Joins</h3>
                    <p className="text-sm text-muted-foreground">
                      They sign up using your referral code
                    </p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-squid-yellow to-orange-500 rounded-full flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold">3. Earn Rewards</h3>
                    <p className="text-sm text-muted-foreground">
                      Both you and your friend get bonus points
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Referred Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-squid-teal" />
                  Your Referrals ({mockReferredUsers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockReferredUsers.map((referredUser, index) => (
                    <motion.div
                      key={referredUser.id}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-squid-pink to-squid-teal rounded-full flex items-center justify-center text-white font-bold">
                          {referredUser.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{referredUser.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Joined{" "}
                            {referredUser.joinedDate.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-bold text-squid-pink">
                            +{Math.floor(referredUser.pointsEarned * 0.1)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            points earned
                          </p>
                        </div>
                        {referredUser.status === "active" ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-yellow-500" />
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {mockReferredUsers.length === 0 && (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        No referrals yet. Start sharing your code!
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </QuizLayout>
  );
}
