import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Lightbox = ({
  images = [],
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;

        case "ArrowLeft":
          onNavigate("prev");
          break;

        case "ArrowRight":
          onNavigate("next");
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [isOpen, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
          >
            <X size={24} />
          </button>

          {/* Previous */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate("prev");
            }}
            className="absolute left-6 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate("next");
            }}
            className="absolute right-6 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
          >
            <ChevronRight size={32} />
          </button>

          {/* Image */}
          <motion.div
            key={currentIndex}
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
            }}
            transition={{
              duration: 0.3,
            }}
            className="max-h-[85vh] max-w-6xl px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIndex]?.src}
              alt={
                images[currentIndex]?.alt ||
                "Gallery image"
              }
              className="max-h-[75vh] w-auto rounded-2xl object-contain shadow-2xl"
            />

            {/* Caption */}
            <div className="mt-6 text-center">
              <h3 className="text-lg font-semibold text-white">
                {images[currentIndex]?.title ||
                  images[currentIndex]?.alt}
              </h3>

              {images[currentIndex]?.description && (
                <p className="mt-2 text-gray-300">
                  {
                    images[currentIndex]
                      ?.description
                  }
                </p>
              )}

              {/* Counter */}
              <div className="mt-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;