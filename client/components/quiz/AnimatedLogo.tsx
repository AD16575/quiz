import { motion } from "framer-motion";

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AnimatedLogo({ size = "md", className }: AnimatedLogoProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className} relative`}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1,
      }}
    >
      <motion.div
        className="w-full h-full bg-gradient-to-br from-squid-pink to-squid-teal rounded-2xl flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="text-white font-bold text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Q
        </motion.span>
      </motion.div>
      <motion.div
        className="absolute -top-1 -right-1 w-6 h-6 bg-squid-yellow rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      />
    </motion.div>
  );
}
