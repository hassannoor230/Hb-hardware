import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = ({
  fullScreen = false,
  text = "",
  size = "md",
}) => {
  const sizes = {
    sm: "w-8 h-8 border-[3px]",
    md: "w-12 h-12 border-4",
    lg: "w-16 h-16 border-[5px]",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        {/* Background Ring */}
        <div
          className={`${sizes[size]} rounded-full border-gray-200`}
        />

        {/* Animated Ring */}
        <motion.div
          className={`absolute inset-0 ${sizes[size]} rounded-full border-amber-500 border-t-transparent`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 0.8,
            ease: "linear",
            repeat: Infinity,
          }}
        />

        {/* Center Dot */}
        <motion.div
          className="absolute inset-0 m-auto h-2.5 w-2.5 rounded-full bg-amber-500"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />
      </div>

      {text && (
        <motion.p
          className="text-sm font-medium text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;