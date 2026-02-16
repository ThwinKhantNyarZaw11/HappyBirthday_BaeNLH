import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOTIVATION } from "../constants";
import ParticleField from "../components/ParticleField";


function QuoteCard({ quote, index, isActive, onClick }) {
  return (
    <motion.div
      className={`relative cursor-pointer ${isActive ? "z-10" : "z-0"}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      viewport={{ once: true }}
      onClick={onClick}
      layout
    >
      <motion.div
        className={`relative p-6 md:p-8 rounded-2xl border transition-all duration-500 ${
          isActive
            ? "bg-gradient-to-br from-deep-purple/80 to-[#1a0a2e]/90 border-rose-glow/40 shadow-[0_0_30px_rgba(255,107,157,0.15)]"
            : "bg-deep-purple/30 border-lavender/10 hover:border-lavender/30"
        }`}
        whileHover={{ scale: 1.02 }}
        layout
      >
        {/* Quote icon */}
        <motion.span
          className="text-2xl md:text-3xl block mb-4 opacity-60"
          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💫
        </motion.span>

        {/* Quote text */}
        <p className="font-display text-base sm:text-lg md:text-xl text-warm-white/90 leading-relaxed italic mb-4">
          &ldquo;{quote.text}&rdquo;
        </p>

        {/* Attribution */}
        <p className="font-script text-sm md:text-base text-blush/70 text-right">
          — {quote.author}
        </p>

        {/* Active indicator glow */}
        {isActive && (
          <motion.div
            className="absolute -inset-px rounded-2xl bg-gradient-to-r from-rose-glow/20 to-lavender/20 -z-10 blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

export default function MotivationSection() {
  const [activeQuote, setActiveQuote] = useState(0);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-deep-purple to-[#120820]" />

      {/* Inspirational glow */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-72 h-72 bg-gold/8 rounded-full blur-[100px]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-lavender/10 rounded-full blur-[80px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <ParticleField count={15} colors={["#fbbf24", "#c084fc", "#818cf8"]} />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.span className="text-3xl md:text-4xl mb-3 block">🎓</motion.span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gold-soft via-gold to-lavender bg-clip-text text-transparent mb-4">
            {MOTIVATION.title}
          </h2>
          <p className="font-body text-base md:text-lg text-blush/70 max-w-md mx-auto">
            {MOTIVATION.subtitle}
          </p>
        </motion.div>

        {/* Quote cards */}
        <div className="grid gap-5 md:gap-6">
          {MOTIVATION.quotes.map((quote, i) => (
            <QuoteCard
              key={i}
              quote={quote}
              index={i}
              isActive={activeQuote === i}
              onClick={() => setActiveQuote(i)}
            />
          ))}
        </div>

        {/* Closing motivational message */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block bg-gradient-to-r from-deep-purple/60 to-[#1a0a2e]/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-gold/15"
            whileHover={{ borderColor: "rgba(251, 191, 36, 0.3)" }}
            transition={{ duration: 0.4 }}
          >
            <motion.span
              className="text-4xl block mb-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🌟
            </motion.span>
            <p className="font-display text-lg sm:text-xl md:text-2xl text-warm-white/90 leading-relaxed italic max-w-lg mx-auto">
              {MOTIVATION.closingMessage}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
