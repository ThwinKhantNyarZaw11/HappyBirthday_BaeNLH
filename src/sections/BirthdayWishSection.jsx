import { motion } from "framer-motion";
import { WISH } from "../constants";
import ParticleField from "../components/ParticleField";
import useIsMobile from "../hooks/useIsMobile";

function Sparkle({ delay, x, y, size = 16 }) {
  return (
    <motion.svg
      className="absolute text-gold/60 pointer-events-none will-change-transform"
      style={{ left: `${x}%`, top: `${y}%` }}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 2.5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
    </motion.svg>
  );
}

// Individual paragraph with reveal animation (no filter:blur for performance)
function WishParagraph({ text, index }) {
  return (
    <motion.p
      className="text-warm-white/90 text-base sm:text-lg md:text-xl leading-relaxed md:leading-loose font-body font-light mb-6 last:mb-0"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {text}
    </motion.p>
  );
}

export default function BirthdayWishSection() {
  const isMobile = useIsMobile();

  // Fewer sparkles on mobile
  const sparkles = isMobile
    ? [
        { x: 5, y: 10, delay: 0, size: 14 },
        { x: 90, y: 15, delay: 1.2, size: 16 },
        { x: 8, y: 75, delay: 1.5, size: 18 },
        { x: 92, y: 80, delay: 0.5, size: 14 },
      ]
    : [
        { x: 5, y: 10, delay: 0, size: 14 },
        { x: 90, y: 15, delay: 1.2, size: 18 },
        { x: 15, y: 45, delay: 0.8, size: 12 },
        { x: 85, y: 50, delay: 2, size: 16 },
        { x: 8, y: 75, delay: 1.5, size: 20 },
        { x: 92, y: 80, delay: 0.5, size: 14 },
        { x: 50, y: 5, delay: 1.8, size: 16 },
        { x: 45, y: 90, delay: 2.5, size: 12 },
      ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-[#150826] to-deep-purple" />

      {/* Decorative glow — CSS only for performance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 md:w-[500px] h-80 md:h-[500px] bg-rose-glow/8 rounded-full blur-[80px] md:blur-[120px] animate-glow" />

      <ParticleField count={10} colors={["#fbbf24", "#f5d280", "#f8a4c8"]} />

      {/* Sparkle decorations */}
      {sparkles.map((s, i) => (
        <Sparkle key={i} {...s} />
      ))}

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6">
        {/* Section title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.span className="text-3xl md:text-4xl mb-3 block">💌</motion.span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gold-soft via-blush to-rose-glow bg-clip-text text-transparent">
            {WISH.title}
          </h2>
        </motion.div>

        {/* Letter container */}
        <motion.div
          className="relative bg-deep-purple/30 backdrop-blur-sm rounded-3xl p-8 sm:p-10 md:p-12 border border-lavender/10"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Top decorative line */}
          <motion.div
            className="w-16 h-0.5 bg-gradient-to-r from-transparent via-blush to-transparent mx-auto mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />

          {/* Opening quote mark */}
          <motion.span
            className="block text-5xl md:text-6xl text-rose-glow/20 font-display leading-none mb-4 select-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            &ldquo;
          </motion.span>

          {/* Message paragraphs with staggered reveal */}
          {WISH.paragraphs.map((text, i) => (
            <WishParagraph key={i} text={text} index={i} />
          ))}

          {/* Closing quote mark */}
          <motion.span
            className="block text-5xl md:text-6xl text-rose-glow/20 font-display leading-none mt-4 text-right select-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            viewport={{ once: true }}
          >
            &rdquo;
          </motion.span>

          {/* Bottom decorative line */}
          <motion.div
            className="w-16 h-0.5 bg-gradient-to-r from-transparent via-blush to-transparent mx-auto mt-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 2 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Decorative hearts below */}
        <motion.div
          className="flex justify-center gap-3 mt-8 text-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          viewport={{ once: true }}
        >
          {["💕", "✨", "💕"].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
