import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


function Particle({ x, y, size, delay, duration, color }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0.4, 0.8, 0],
        scale: [0, 1, 0.8, 1, 0],
        y: [0, -30, -15, -40, -60],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default function ParticleField({
  count = 30,
  colors = ["#ff6b9d", "#c084fc", "#f8a4c8", "#fbbf24", "#818cf8"],
  className = "",
}) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(generated);
  }, [count]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
    </div>
  );
}
