import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sections
import LandingSection from "./sections/LandingSection";
import PhotoMemorySection from "./sections/PhotoMemorySection";
import BirthdayWishSection from "./sections/BirthdayWishSection";
import BirthdayCakeSection from "./sections/BirthdayCakeSection";
import MotivationSection from "./sections/MotivationSection";
import FinalSection from "./sections/FinalSection";

// Components
import NavigationDots from "./components/NavigationDots";
import MusicPlayer from "./components/MusicPlayer";


const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.6, ease: "easeInOut" },
};

function App() {
  const [started, setStarted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);

  // Register section refs
  const setSectionRef = useCallback((el, index) => {
    sectionRefs.current[index] = el;
  }, []);

  // Scroll to a specific section
  const scrollToSection = useCallback((index) => {
    const el = sectionRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Track active section on scroll
  useEffect(() => {
    if (!started) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setActiveSection(index);
            }
          }
        });
      },
      {
        threshold: 0.4,
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [started]);

  // Handle start button - transition from landing to main experience
  const handleStart = () => {
    setStarted(true);
    // Small delay to let animation complete, then scroll to first section
    setTimeout(() => {
      scrollToSection(0);
    }, 100);
  };

  // Handle replay - scroll back to top
  const handleReplay = () => {
    setStarted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-midnight font-body">
      {/* Landing page - shown before starting */}
      <AnimatePresence mode="wait">
        {!started && (
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <LandingSection onStart={handleStart} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main experience - sections flow */}
      <AnimatePresence>
        {started && (
          <motion.div
            key="experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Navigation dots */}
            <NavigationDots
              activeSection={activeSection}
              onDotClick={scrollToSection}
            />

            {/* Music player */}
            <MusicPlayer />

            {/* Section 1: Photo Memories */}
            <div ref={(el) => setSectionRef(el, 0)}>
              <motion.div {...pageTransition}>
                <PhotoMemorySection />
              </motion.div>
            </div>

            {/* Section 2: Birthday Wish */}
            <div ref={(el) => setSectionRef(el, 1)}>
              <motion.div {...pageTransition}>
                <BirthdayWishSection />
              </motion.div>
            </div>

            {/* Section 3: Birthday Cake */}
            <div ref={(el) => setSectionRef(el, 2)}>
              <motion.div {...pageTransition}>
                <BirthdayCakeSection />
              </motion.div>
            </div>

            {/* Section 4: Motivation */}
            <div ref={(el) => setSectionRef(el, 3)}>
              <motion.div {...pageTransition}>
                <MotivationSection />
              </motion.div>
            </div>

            {/* Section 5: Final Surprise */}
            <div ref={(el) => setSectionRef(el, 4)}>
              <motion.div {...pageTransition}>
                <FinalSection onReplay={handleReplay} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
