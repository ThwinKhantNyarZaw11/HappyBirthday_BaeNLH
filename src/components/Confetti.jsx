import { motion } from "framer-motion";

const CONFETTI_COLORS = [
  "#ff6b9d", "#c084fc", "#fbbf24", "#f8a4c8",
  "#818cf8", "#34d399", "#fb923c", "#f472b6",
  "#a78bfa", "#fcd34d", "#67e8f9", "#f87171",
];

function ConfettiPiece({ delay, x, color, rotation, size }) {
  const shapes = ["rounded-full", "rounded-sm", "rounded-none"];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];

  return (
    <motion.div
      className={`absolute ${shape}`}
      style={{
        left: "50%",
        top: "40%",
        width: size,
        height: size * (0.5 + Math.random()),
        backgroundColor: color,
      }}
      initial={{ opacity: 1, scale: 0 }}
      animate={{
        x: x,
        y: [0, -200 - Math.random() * 300, 600],
        opacity: [0, 1, 1, 0],
        scale: [0, 1.2, 1, 0.5],
        rotate: rotation,
      }}
      transition={{
        duration: 2.5 + Math.random(),
        delay,
        ease: "easeOut",
      }}
    />
  );
}

export default function Confetti({ count = 60 }) {
  const pieces = Array.from({ length: count }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.5,
    x: (Math.random() - 0.5) * 600,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    rotation: Math.random() * 1080 - 540,
    size: 6 + Math.random() * 8,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {pieces.map((p) => (
        <ConfettiPiece key={p.id} {...p} />
      ))}
    </div>
  );
}
