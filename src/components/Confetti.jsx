import { motion } from "framer-motion";
import useIsMobile from "../hooks/useIsMobile";

const CONFETTI_COLORS = [
  "#ff6b9d", "#c084fc", "#fbbf24", "#f8a4c8",
  "#818cf8", "#34d399", "#fb923c", "#f472b6",
];

function ConfettiPiece({ delay, x, color, rotation, size, heightFactor }) {
  const shapes = ["rounded-full", "rounded-sm"];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];

  return (
    <motion.div
      className={`absolute will-change-transform ${shape}`}
      style={{
        left: "50%",
        top: "40%",
        width: size,
        height: size * heightFactor,
        backgroundColor: color,
      }}
      initial={{ opacity: 1, scale: 0 }}
      animate={{
        x: x,
        y: [0, -150 - Math.random() * 200, 500],
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 0.8, 0],
        rotate: rotation,
      }}
      transition={{
        duration: 2.5,
        delay,
        ease: "easeOut",
      }}
    />
  );
}

export default function Confetti({ count = 40 }) {
  const isMobile = useIsMobile();
  const actualCount = isMobile ? Math.min(count, 25) : count;

  const pieces = Array.from({ length: actualCount }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.4,
    x: (Math.random() - 0.5) * 500,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    rotation: Math.random() * 720 - 360,
    size: 6 + Math.random() * 6,
    heightFactor: 0.5 + Math.random() * 0.5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {pieces.map((p) => (
        <ConfettiPiece key={p.id} {...p} />
      ))}
    </div>
  );
}
