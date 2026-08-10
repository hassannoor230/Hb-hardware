import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  X,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
} from "lucide-react";

const Toast = ({
  message,
  type = "info",
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-6 h-6 flex-shrink-0" />,
    error: <AlertCircle className="w-6 h-6 flex-shrink-0" />,
    warning: <AlertTriangle className="w-6 h-6 flex-shrink-0" />,
    info: <Info className="w-6 h-6 flex-shrink-0" />,
  };

  const colors = {
    success: "bg-emerald-600",
    error: "bg-red-600",
    warning: "bg-amber-500 text-black",
    info: "bg-slate-900",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className={`fixed top-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl shadow-2xl backdrop-blur-md ${colors[type]}`}
      role="alert"
    >
      {/* Progress Bar */}
      <motion.div
        className="absolute left-0 top-0 h-1 bg-white/70"
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
      />

      <div className="flex items-start gap-3 p-5">
        <div>{icons[type]}</div>

        <div className="flex-1">
          <p className="font-medium">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="rounded-lg p-1 transition hover:bg-white/20"
        >
          <X size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default Toast;