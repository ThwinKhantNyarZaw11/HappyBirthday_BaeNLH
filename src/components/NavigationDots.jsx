import { motion } from "framer-motion";
import { SECTIONS } from "../constants";


export default function NavigationDots({ activeSection, onDotClick }) {
  return (
    <motion.nav
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      {SECTIONS.map((name, i) => (
        <button
          key={name}
          onClick={() => onDotClick(i)}
          className="group relative flex items-center justify-end"
          aria-label={`Go to ${name} section`}
        >
          {/* Tooltip label */}
          <span className="absolute right-6 md:right-8 bg-deep-purple/80 backdrop-blur-sm text-warm-white text-xs px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none border border-lavender/20">
            {name}
          </span>

          {/* Dot */}
          <motion.div
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border-2 transition-all duration-500 ${
              activeSection === i
                ? "bg-rose-glow border-rose-glow shadow-[0_0_12px_rgba(255,107,157,0.6)]"
                : "bg-transparent border-lavender/40 hover:border-blush"
            }`}
            animate={
              activeSection === i
                ? { scale: [1, 1.3, 1], transition: { duration: 1.5, repeat: Infinity } }
                : { scale: 1 }
            }
          />
        </button>
      ))}
    </motion.nav>
  );
}
