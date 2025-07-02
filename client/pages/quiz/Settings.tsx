import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Moon,
  Sun,
  Bell,
  Shield,
  HelpCircle,
  FileText,
  LogOut,
  User,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { QuizLayout } from "@/components/quiz/QuizLayout";
import { useQuiz } from "@/lib/quiz-context";

export default function Settings() {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    dispatch({ type: "SET_USER", payload: null });
    navigate("/quiz/welcome");
  };

  const settingsSections = [
    {
      title: "Appearance",
      items: [
        {
          icon: state.theme === "dark" ? Moon : Sun,
          label: "Dark Mode",
          description: "Toggle between light and dark theme",
          action: toggleTheme,
          type: "toggle" as const,
          value: state.theme === "dark",
        },
      ],
    },
    {
      title: "Notifications",
      items: [
        {
          icon: Bell,
          label: "Quiz Reminders",
          description: "Get notified about new quizzes",
          type: "toggle" as const,
          value: true,
        },
        {
          icon: Mail,
          label: "Email Updates",
          description: "Receive email about your progress",
          type: "toggle" as const,
          value: false,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          icon: User,
          label: "Profile",
          description: "Manage your account information",
          type: "link" as const,
          href: "/quiz/profile",
        },
        {
          icon: Shield,
          label: "Change Password",
          description: "Update your account password",
          type: "link" as const,
          href: "/quiz/change-password",
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: HelpCircle,
          label: "Help & FAQ",
          description: "Get help and find answers",
          type: "link" as const,
          href: "/quiz/help",
        },
        {
          icon: Mail,
          label: "Contact Support",
          description: "Get in touch with our team",
          type: "link" as const,
          href: "/quiz/contact",
        },
        {
          icon: FileText,
          label: "Terms & Privacy",
          description: "Read our terms and privacy policy",
          type: "link" as const,
          href: "/quiz/terms",
        },
      ],
    },
  ];

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
            <h2 className="text-lg font-semibold">Settings</h2>
            <p className="text-sm text-muted-foreground">
              Manage your preferences
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
          {settingsSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {section.items.map((item, itemIndex) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={itemIndex}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-squid-pink/20 to-squid-teal/20 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-medium">{item.label}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <div>
                            {item.type === "toggle" && (
                              <Switch
                                checked={item.value}
                                onCheckedChange={item.action}
                              />
                            )}
                            {item.type === "link" && (
                              <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="text-squid-pink hover:text-squid-pink hover:bg-squid-pink/10"
                              >
                                <Link to={item.href!}>View</Link>
                              </Button>
                            )}
                          </div>
                        </div>
                        {itemIndex < section.items.length - 1 && (
                          <Separator className="mt-4" />
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* App Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-muted/50">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">MyQuiz App</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Version 1.0.0 • Built with ❤️
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
                  <span>Made with React</span>
                  <span>•</span>
                  <span>TypeScript</span>
                  <span>•</span>
                  <span>TailwindCSS</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Logout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-red-200 dark:border-red-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                      <LogOut className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-red-600">Logout</p>
                      <p className="text-sm text-muted-foreground">
                        Sign out of your account
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </QuizLayout>
  );
}
