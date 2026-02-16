import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useIsMobile from "../hooks/useIsMobile";

const HEART_CHARS = ["❤️", "💕", "💖", "💗", "💓", "♥", "🤍", "💜"];

function FloatingHeart({ delay, duration, startX, size, char }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none will-change-transform"
      style={{ left: `${startX}%`, fontSize: `${size}rem`, bottom: "-10%" }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: "-110vh",
        opacity: [0, 1, 1, 0.8, 0],
        rotate: [0, -10, 10, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    >
      {char}
    </motion.div>
  );
}

export default function FloatingHearts({ count = 15, className = "" }) {
  const isMobile = useIsMobile();
  const [hearts, setHearts] = useState([]);

  // Reduce count significantly on mobile
  const actualCount = isMobile ? Math.min(count, 6) : count;

  const generateHearts = useCallback(() => {
    return Array.from({ length: actualCount }, (_, i) => ({
      id: i,
      delay: Math.random() * 8,
      duration: 10 + Math.random() * 5,
      startX: Math.random() * 100,
      size: 0.8 + Math.random() * 1,
      char: HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)],
    }));
  }, [actualCount]);

  useEffect(() => {
    setHearts(generateHearts());
  }, [generateHearts]);

  return (
    <div
      className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
    >
      {hearts.map((heart) => (
        <FloatingHeart key={heart.id} {...heart} />
      ))}
    </div>
  );
}
