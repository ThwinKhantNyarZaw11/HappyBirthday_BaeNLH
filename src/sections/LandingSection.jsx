import { motion } from "framer-motion";
import { LANDING } from "../constants";
import ParticleField from "../components/ParticleField";
import useIsMobile from "../hooks/useIsMobile";

export default function LandingSection({ onStart }) {
  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-midnight via-deep-purple to-[#1e0533]" />

      {/* Radial glow orbs — CSS only, no Framer Motion, GPU-friendly */}
      <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-rose-glow/20 rounded-full blur-[60px] md:blur-[100px] animate-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 md:w-80 h-64 md:h-80 bg-lavender/20 rounded-full blur-[50px] md:blur-[80px] animate-glow" style={{ animationDelay: "2s" }} />
      {!isMobile && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blush/10 rounded-full blur-[100px] animate-glow" style={{ animationDelay: "4s" }} />
      )}

      {/* Particles — count auto-reduced on mobile */}
      <ParticleField count={25} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Decorative top sparkle */}
        <motion.div
          className="text-4xl md:text-5xl mb-6"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
        >
          ✨
        </motion.div>

        {/* Main title */}
        <motion.h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
        >
          <span className="bg-gradient-to-r from-blush via-rose-glow to-lavender bg-clip-text text-transparent">
            {LANDING.title}
          </span>
        </motion.h1>

        {/* Heart emoji */}
        <motion.div
          className="text-5xl md:text-6xl my-6"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6, type: "spring", bounce: 0.5 }}
        >
          <span className="inline-block animate-heartbeat">
            {LANDING.emoji}
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="font-script text-xl sm:text-2xl md:text-3xl text-blush/90 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          {LANDING.subtitle}
        </motion.p>

        {/* Start button */}
        <motion.button
          onClick={onStart}
          className="group relative px-10 py-4 rounded-full text-lg font-body font-medium overflow-hidden cursor-pointer"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Button gradient background */}
          <span className="absolute inset-0 bg-gradient-to-r from-rose-glow via-blush to-lavender opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

          <span className="relative z-10 text-white drop-shadow-lg">
            {LANDING.buttonText}
          </span>
        </motion.button>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5, y: [0, 8, 0] }}
          transition={{ delay: 3, duration: 2, repeat: Infinity }}
        >
          <svg className="w-6 h-6 text-blush/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
