import { motion } from "framer-motion";
import { Trophy, Coins, Star } from "lucide-react";

interface PointDisplayProps {
  points: number;
  label?: string;
  variant?: "default" | "earned" | "withdrawable";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export function PointDisplay({
  points,
  label,
  variant = "default",
  size = "md",
  animated = false,
}: PointDisplayProps) {
  const icons = {
    default: Coins,
    earned: Star,
    withdrawable: Trophy,
  };

  const colors = {
    default: "from-squid-teal to-squid-teal/80",
    earned: "from-squid-yellow to-orange-400",
    withdrawable: "from-squid-pink to-purple-500",
  };

  const sizes = {
    sm: { container: "px-3 py-2", icon: "w-4 h-4", text: "text-sm" },
    md: { container: "px-4 py-3", icon: "w-5 h-5", text: "text-base" },
    lg: { container: "px-6 py-4", icon: "w-6 h-6", text: "text-lg" },
  };

  const Icon = icons[variant];
  const sizeClasses = sizes[size];

  const MotionWrapper = animated ? motion.div : "div";

  return (
    <MotionWrapper
      className={`bg-gradient-to-r ${colors[variant]} rounded-xl ${sizeClasses.container} flex items-center gap-2 text-white shadow-lg`}
      {...(animated && {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        whileHover: { scale: 1.05 },
        transition: { type: "spring", stiffness: 300 },
      })}
    >
      <Icon className={sizeClasses.icon} />
      <div className="flex flex-col">
        {label && <span className="text-xs opacity-80">{label}</span>}
        <span className={`font-bold ${sizeClasses.text}`}>
          {points.toLocaleString()}
        </span>
      </div>
    </MotionWrapper>
  );
}
