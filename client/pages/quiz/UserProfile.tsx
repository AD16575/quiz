import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Edit,
  Trophy,
  Target,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PointDisplay } from "@/components/quiz/PointDisplay";
import { QuizLayout } from "@/components/quiz/QuizLayout";
import { useQuiz } from "@/lib/quiz-context";

const achievements = [
  {
    id: "1",
    title: "Quiz Master",
    description: "Complete 10 quizzes",
    icon: Trophy,
    earned: true,
    date: new Date("2024-03-01"),
  },
  {
    id: "2",
    title: "Speed Demon",
    description: "Complete a quiz in under 2 minutes",
    icon: TrendingUp,
    earned: true,
    date: new Date("2024-03-05"),
  },
  {
    id: "3",
    title: "Perfect Score",
    description: "Score 100% in any quiz",
    icon: Target,
    earned: false,
    date: null,
  },
  {
    id: "4",
    title: "Referral Champion",
    description: "Refer 5 friends",
    icon: User,
    earned: false,
    date: null,
  },
];

export default function UserProfile() {
  const { state, dispatch } = useQuiz();
  const user = state.user;
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  if (!user) return null;

  const handleSave = () => {
    dispatch({
      type: "SET_USER",
      payload: { ...user, name: editForm.name, email: editForm.email },
    });
    setIsEditing(false);
  };

  const earnedAchievements = achievements.filter((a) => a.earned);
  const totalAchievements = achievements.length;

  return (
    <QuizLayout
      showHeader
      headerContent={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/quiz/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h2 className="text-lg font-semibold">Profile</h2>
              <p className="text-sm text-muted-foreground">
                Manage your account
              </p>
            </div>
          </div>
          <Button
            variant={isEditing ? "default" : "outline"}
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className={
              isEditing
                ? "bg-gradient-to-r from-squid-pink to-squid-pink/80 hover:from-squid-pink/90 hover:to-squid-pink/70 text-white"
                : ""
            }
          >
            <Edit className="w-4 h-4 mr-2" />
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>
      }
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="max-w-4xl mx-auto space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gradient-to-br from-squid-pink/10 to-squid-teal/10 border-2 border-squid-pink/20">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <Avatar className="w-24 h-24 bg-gradient-to-br from-squid-pink to-squid-teal">
                    <AvatarFallback className="text-white text-2xl font-bold">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 text-center md:text-left">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={editForm.name}
                            onChange={(e) =>
                              setEditForm({ ...editForm, name: e.target.value })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={editForm.email}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                email: e.target.value,
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                        <div className="flex flex-col md:flex-row items-center gap-4 text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Member since{" "}
                              {user.memberSince.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-squid-pink/10 text-squid-pink">
                            Quiz Master
                          </Badge>
                          <Badge className="bg-squid-teal/10 text-squid-teal">
                            Active Player
                          </Badge>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
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
              points={user.referredUsers}
              label="Referrals"
              variant="withdrawable"
              size="lg"
              animated
            />
            <PointDisplay
              points={earnedAchievements.length}
              label="Achievements"
              variant="earned"
              size="lg"
              animated
            />
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-squid-yellow" />
                  Achievements ({earnedAchievements.length}/{totalAchievements})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => {
                    const IconComponent = achievement.icon;
                    return (
                      <motion.div
                        key={achievement.id}
                        className={`p-4 border rounded-lg ${
                          achievement.earned
                            ? "bg-squid-yellow/10 border-squid-yellow/20"
                            : "bg-muted/50 opacity-60"
                        }`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              achievement.earned
                                ? "bg-gradient-to-br from-squid-yellow to-orange-500"
                                : "bg-muted"
                            }`}
                          >
                            <IconComponent
                              className={`w-6 h-6 ${
                                achievement.earned
                                  ? "text-white"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <h3
                              className={`font-semibold ${
                                achievement.earned
                                  ? ""
                                  : "text-muted-foreground"
                              }`}
                            >
                              {achievement.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {achievement.description}
                            </p>
                            {achievement.earned && achievement.date && (
                              <p className="text-xs text-squid-yellow mt-1">
                                Earned {achievement.date.toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          {achievement.earned && (
                            <div className="text-squid-yellow">✓</div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-squid-teal" />
                <h3 className="font-semibold mb-2">Point History</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  View your earning history
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-squid-teal text-squid-teal hover:bg-squid-teal hover:text-white"
                >
                  <Link to="/quiz/history">View History</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <User className="w-12 h-12 mx-auto mb-4 text-squid-pink" />
                <h3 className="font-semibold mb-2">Referrals</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Invite friends and earn
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-squid-pink text-squid-pink hover:bg-squid-pink hover:text-white"
                >
                  <Link to="/quiz/referral">Invite Friends</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-squid-yellow" />
                <h3 className="font-semibold mb-2">Play Quiz</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Continue your streak
                </p>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-squid-yellow to-orange-500 hover:from-squid-yellow/90 hover:to-orange-500/90 text-white"
                >
                  <Link to="/quiz/categories">Play Now</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </QuizLayout>
  );
}
