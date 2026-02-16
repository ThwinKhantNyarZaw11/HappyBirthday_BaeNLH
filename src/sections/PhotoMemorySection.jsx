import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PHOTOS } from "../constants";
import ParticleField from "../components/ParticleField";

export default function PhotoMemorySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return PHOTOS.length - 1;
      if (next >= PHOTOS.length) return 0;
      return next;
    });
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.9,
      rotateY: dir > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (dir) => ({
      x: dir < 0 ? 400 : -400,
      opacity: 0,
      scale: 0.9,
      rotateY: dir < 0 ? 15 : -15,
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e0533] via-deep-purple to-midnight" />

      {/* Decorative glow — CSS only */}
      <div className="absolute top-1/3 left-1/3 w-64 md:w-80 h-64 md:h-80 bg-lavender/15 rounded-full blur-[60px] md:blur-[80px] animate-glow" />

      <ParticleField count={10} colors={["#c084fc", "#f8a4c8", "#818cf8"]} />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        {/* Section title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.span className="text-3xl md:text-4xl mb-3 block">📸</motion.span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blush to-lavender bg-clip-text text-transparent">
            Our Memories
          </h2>
          <p className="font-script text-lg md:text-xl text-blush/70 mt-3">
            Every moment with you is a treasure
          </p>
        </motion.div>

        {/* Photo Carousel */}
        <div className="relative flex flex-col items-center">
          {/* Main photo display */}
          <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden mb-8">
            {/* Photo frame glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-glow/30 via-lavender/30 to-blush/30 rounded-2xl blur-sm" />
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-lavender/20 bg-deep-purple/50">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 200, damping: 30 },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 },
                  }}
                  className="absolute inset-0"
                >
                  {/* ⬇️ REPLACE PHOTO URLS IN constants.js ⬇️ */}
                  <img
                    src={PHOTOS[currentIndex].url}
                    alt={PHOTOS[currentIndex].caption}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Photo overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent" />

                  {/* Caption */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <p className="font-script text-lg md:text-xl text-warm-white drop-shadow-lg">
                      {PHOTOS[currentIndex].caption}
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-6">
            <motion.button
              onClick={() => paginate(-1)}
              className="w-12 h-12 rounded-full bg-deep-purple/60 backdrop-blur-sm border border-lavender/30 flex items-center justify-center text-blush hover:bg-lavender/20 transition-colors duration-300 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {PHOTOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-400 cursor-pointer ${
                    i === currentIndex
                      ? "bg-rose-glow w-6 shadow-[0_0_8px_rgba(255,107,157,0.5)]"
                      : "bg-lavender/30 hover:bg-lavender/60"
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={() => paginate(1)}
              className="w-12 h-12 rounded-full bg-deep-purple/60 backdrop-blur-sm border border-lavender/30 flex items-center justify-center text-blush hover:bg-lavender/20 transition-colors duration-300 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Photo counter */}
          <motion.p
            className="text-lavender/50 text-sm mt-4 font-body"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {currentIndex + 1} / {PHOTOS.length}
          </motion.p>
        </div>

        {/* Mini photo strip */}
        <motion.div
          className="flex gap-3 justify-center mt-8 flex-wrap"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {PHOTOS.map((photo, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                i === currentIndex
                  ? "border-rose-glow shadow-[0_0_12px_rgba(255,107,157,0.4)] scale-110"
                  : "border-lavender/20 opacity-50 hover:opacity-80"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
