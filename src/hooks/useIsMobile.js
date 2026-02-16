import { useState, useEffect } from "react";

/* ============================================================
   useIsMobile - Detect mobile devices for performance optimization
   Reduces particle counts and disables heavy effects on mobile
   ============================================================ */

export default function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}
