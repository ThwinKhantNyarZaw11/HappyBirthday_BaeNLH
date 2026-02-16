import { useState } from "react";
import { motion } from "framer-motion";
import { FINALE } from "../constants";
import FloatingHearts from "../components/FloatingHearts";
import ParticleField from "../components/ParticleField";


export default function FinalSection({ onReplay }) {
  const [showFullMessage, setShowFullMessage] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background with special warm glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#120820] via-midnight to-deep-purple" />

      {/* Large warm center glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,157,0.15) 0%, rgba(192,132,252,0.08) 50%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Top glow */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-b from-rose-glow/5 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <ParticleField count={25} colors={["#ff6b9d", "#f8a4c8", "#c084fc", "#fbbf24"]} />
      <FloatingHearts count={20} />

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Grand heart icon */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="text-6xl md:text-7xl inline-block"
            animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ❤️
          </motion.span>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-blush via-rose-glow to-lavender bg-clip-text text-transparent">
            {FINALE.title}
          </span>
        </motion.h2>

        {/* Decorative divider */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-blush/50" />
          <span className="text-blush/60">✦</span>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-blush/50" />
        </motion.div>

        {/* Main message */}
        <motion.div
          className="relative bg-deep-purple/20 backdrop-blur-sm rounded-3xl p-8 sm:p-10 md:p-12 border border-rose-glow/10"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Glow border */}
          <motion.div
            className="absolute -inset-px rounded-3xl bg-gradient-to-r from-rose-glow/10 via-lavender/10 to-rose-glow/10 -z-10 blur-sm"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <motion.p
            className="font-body text-lg sm:text-xl md:text-2xl text-warm-white/90 leading-relaxed md:leading-loose font-light"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, delay: 1 }}
            viewport={{ once: true }}
          >
            {FINALE.message}
          </motion.p>
        </motion.div>

        {/* Signature */}
        <motion.p
          className="font-script text-xl sm:text-2xl md:text-3xl text-blush/80 mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          viewport={{ once: true }}
        >
          {FINALE.signature}
        </motion.p>

        {/* Decorative emojis */}
        <motion.div
          className="flex justify-center gap-4 mt-8 text-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          viewport={{ once: true }}
        >
          {["✨", "💕", "🌙", "💕", "✨"].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, delay: i * 0.2, repeat: Infinity }}
              className="inline-block"
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        {/* Replay button */}
        <motion.button
          onClick={onReplay}
          className="mt-12 px-8 py-3.5 rounded-full text-base font-body font-medium cursor-pointer relative group overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-rose-glow/20 to-lavender/20 group-hover:from-rose-glow/30 group-hover:to-lavender/30 transition-all duration-300" />
          <span className="absolute inset-0 border border-blush/30 rounded-full group-hover:border-blush/50 transition-all duration-300" />
          <span className="relative z-10 text-blush">
            {FINALE.replayText}
          </span>
        </motion.button>

        {/* Bottom spacer for mobile */}
        <div className="h-16" />
      </div>
    </section>
  );
}
