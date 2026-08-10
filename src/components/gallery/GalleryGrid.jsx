import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Lightbox from "./Lightbox";

const GalleryGrid = ({ images = [], columns = 3 }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const gridCols = {
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
  };

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateImage = (direction) => {
    setCurrentIndex((prev) => {
      if (direction === "prev") {
        return prev === 0 ? images.length - 1 : prev - 1;
      }

      return prev === images.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <>
      <div
        className={`grid grid-cols-1 gap-5 md:grid-cols-2 ${gridCols[columns] || "lg:grid-cols-3"
          }`}
      >
        {images.map((image, index) => (
          <motion.div
            key={image.id || index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
            }}
            onClick={() => openLightbox(index)}
            className={`group relative cursor-pointer overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${index === 0
                ? "md:col-span-2 md:row-span-2"
                : ""
              }`}
            style={{
              aspectRatio: index === 0 ? "16 / 9" : "4 / 3",
            }}
          >
            <img
              src={image.src}
              alt={image.alt || "Gallery image"}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
              <motion.div
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                className="rounded-full bg-white p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                <Search className="h-6 w-6 text-slate-900" />
              </motion.div>
            </div>

            {/* Caption */}
            {image.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="font-semibold text-white">
                  {image.title}
                </h3>

                {image.description && (
                  <p className="mt-1 text-sm text-gray-200">
                    {image.description}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <Lightbox
        images={images}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNavigate={navigateImage}
      />
    </>
  );
};

export default GalleryGrid;