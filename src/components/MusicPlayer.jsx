import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MUSIC } from "../constants";


export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  if (!MUSIC.url) return null;

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
      });
    }
    setIsPlaying(!isPlaying);
    setShowPulse(false);
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC.url} loop preload="auto" />

      <motion.button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 bg-deep-purple/80 backdrop-blur-md border border-lavender/30 text-warm-white px-4 py-2.5 rounded-full text-sm font-body shadow-lg hover:shadow-rose-glow/20 transition-all duration-300 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {showPulse && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-rose-glow"
            animate={{
              scale: [1, 1.4],
              opacity: [0.6, 0],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        <span className="relative z-10">
          {isPlaying ? MUSIC.disableText : MUSIC.enableText}
        </span>
      </motion.button>
    </>
  );
}
