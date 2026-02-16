import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "../components/Confetti";
import ParticleField from "../components/ParticleField";


function CandleFlame({ isLit, onBlow }) {
  return (
    <motion.g
      style={{ cursor: isLit ? "pointer" : "default" }}
      onClick={isLit ? onBlow : undefined}
    >
      {isLit && (
        <>
          {/* Outer glow */}
          <motion.ellipse
            cx="120"
            cy="38"
            rx="18"
            ry="24"
            fill="url(#flameGlow)"
            animate={{
              rx: [16, 20, 16],
              ry: [22, 28, 22],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          {/* Main flame */}
          <motion.path
            d="M120 55 Q112 40 115 28 Q117 18 120 12 Q123 18 125 28 Q128 40 120 55Z"
            fill="url(#flameGradient)"
            animate={{
              d: [
                "M120 55 Q112 40 115 28 Q117 18 120 12 Q123 18 125 28 Q128 40 120 55Z",
                "M120 55 Q110 42 114 30 Q116 20 120 14 Q124 20 126 30 Q130 42 120 55Z",
                "M120 55 Q113 38 116 26 Q118 16 120 10 Q122 16 124 26 Q127 38 120 55Z",
                "M120 55 Q112 40 115 28 Q117 18 120 12 Q123 18 125 28 Q128 40 120 55Z",
              ],
            }}
            transition={{ duration: 0.4, repeat: Infinity }}
          />
          {/* Inner flame */}
          <motion.ellipse
            cx="120"
            cy="45"
            rx="4"
            ry="8"
            fill="#ffffff"
            opacity="0.8"
            animate={{
              ry: [7, 9, 7],
              opacity: [0.7, 0.9, 0.7],
            }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
        </>
      )}
      {/* Smoke when blown out */}
      {!isLit && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={118 + i * 2}
              r={3}
              fill="rgba(200, 200, 220, 0.3)"
              initial={{ cy: 50, opacity: 0.6, r: 2 }}
              animate={{ cy: -20, opacity: 0, r: 8 }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          ))}
        </>
      )}
    </motion.g>
  );
}

export default function BirthdayCakeSection() {
  const [isLit, setIsLit] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleBlow = () => {
    setIsLit(false);
    setShowConfetti(true);
    setTimeout(() => setShowMessage(true), 500);
    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
  };

  const handleRelight = () => {
    setIsLit(true);
    setShowMessage(false);
    setShowConfetti(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-purple via-[#1a0a30] to-midnight" />

      {/* Warm glow from cake — CSS only */}
      {isLit && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-48 md:w-64 h-48 md:h-64 bg-gold/10 rounded-full blur-[50px] md:blur-[70px] animate-glow" />
      )}

      <ParticleField count={8} colors={["#fbbf24", "#f5d280"]} />

      {/* Confetti on blow — reduced count on mobile */}
      <AnimatePresence>{showConfetti && <Confetti count={40} />}</AnimatePresence>

      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
        {/* Title */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gold-soft via-gold to-blush bg-clip-text text-transparent mb-3">
            Make a Wish
          </h2>
          <p className="font-script text-lg md:text-xl text-blush/70">
            {isLit ? "Tap the flame to blow out the candle 🕯️" : "Your wish has been made! ✨"}
          </p>
        </motion.div>

        {/* Cake SVG */}
        <motion.div
          className="relative mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <svg
            viewBox="0 0 240 200"
            className="w-full max-w-[300px] md:max-w-[360px] mx-auto drop-shadow-2xl"
          >
            <defs>
              <linearGradient id="flameGradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#ff6b35" />
                <stop offset="50%" stopColor="#ffaa00" />
                <stop offset="100%" stopColor="#fff176" />
              </linearGradient>
              <radialGradient id="flameGlow">
                <stop offset="0%" stopColor="#ffaa00" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ffaa00" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="cakeTop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f8a4c8" />
                <stop offset="100%" stopColor="#e879a8" />
              </linearGradient>
              <linearGradient id="cakeMiddle" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <linearGradient id="cakeBottom" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
              <linearGradient id="frostingGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fce7f3" />
                <stop offset="50%" stopColor="#fff1f2" />
                <stop offset="100%" stopColor="#fce7f3" />
              </linearGradient>
            </defs>

            {/* Cake plate */}
            <ellipse cx="120" cy="185" rx="100" ry="10" fill="#4a2870" opacity="0.5" />

            {/* Bottom tier */}
            <rect x="40" y="145" width="160" height="40" rx="8" fill="url(#cakeBottom)" />
            {/* Middle tier */}
            <rect x="55" y="105" width="130" height="40" rx="8" fill="url(#cakeMiddle)" />
            {/* Top tier */}
            <rect x="75" y="65" width="90" height="40" rx="8" fill="url(#cakeTop)" />

            {/* Frosting drips - top tier */}
            <path
              d="M75 75 Q80 82 85 75 Q90 85 95 75 Q100 82 105 75 Q110 85 115 75 Q120 82 125 75 Q130 85 135 75 Q140 82 145 75 Q150 85 155 75 Q160 82 165 75"
              fill="url(#frostingGrad)"
              stroke="none"
            />

            {/* Frosting drips - middle tier */}
            <path
              d="M55 115 Q62 125 68 115 Q75 128 82 115 Q88 125 95 115 Q102 128 108 115 Q115 125 122 115 Q128 128 135 115 Q142 125 148 115 Q155 128 162 115 Q168 125 175 115 Q182 128 185 115"
              fill="url(#frostingGrad)"
              stroke="none"
            />

            {/* Decorative dots */}
            {[60, 80, 100, 120, 140, 160, 180].map((x, i) => (
              <circle
                key={i}
                cx={x}
                cy="165"
                r="3"
                fill={i % 2 === 0 ? "#fbbf24" : "#f8a4c8"}
              />
            ))}
            {[70, 90, 110, 130, 150, 170].map((x, i) => (
              <circle
                key={i}
                cx={x}
                cy="125"
                r="2.5"
                fill={i % 2 === 0 ? "#fbbf24" : "#e879a8"}
              />
            ))}

            {/* Candle */}
            <rect x="116" y="55" width="8" height="20" rx="2" fill="#fce7f3" />
            <rect x="118" y="55" width="4" height="20" rx="1" fill="#fff1f2" opacity="0.6" />
            {/* Candle wick */}
            <line x1="120" y1="55" x2="120" y2="50" stroke="#5b4630" strokeWidth="1.5" />

            {/* Flame */}
            <CandleFlame isLit={isLit} onBlow={handleBlow} />

            {/* Hearts on cake */}
            <text x="95" y="90" fontSize="10" fill="#fff1f2" opacity="0.8">
              ♥
            </text>
            <text x="140" y="90" fontSize="10" fill="#fff1f2" opacity="0.8">
              ♥
            </text>
          </svg>
        </motion.div>

        {/* Celebration message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <p className="text-2xl md:text-3xl font-display text-gold-soft mb-4">
                🎉 Happy Birthday! 🎉
              </p>
              <p className="text-blush/80 font-body text-sm md:text-base">
                May all your wishes come true, my love
              </p>

              <motion.button
                onClick={handleRelight}
                className="mt-6 px-6 py-2.5 rounded-full bg-deep-purple/60 backdrop-blur-sm border border-lavender/30 text-blush text-sm font-body hover:bg-lavender/20 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Light the candle again 🕯️
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
