import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useIsMobile from "../hooks/useIsMobile";


function Particle({ x, y, size, delay, duration, color }) {
  return (
    <motion.div
      className="absolute rounded-full will-change-transform"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size}px ${color}`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.7, 0.3, 0.7, 0],
        scale: [0, 1, 0.8, 1, 0],
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
  const isMobile = useIsMobile();
  const [particles, setParticles] = useState([]);

  const actualCount = isMobile ? Math.min(Math.floor(count / 3), 8) : count;

  useEffect(() => {
    const generated = Array.from({ length: actualCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(generated);
  }, [actualCount]);

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
