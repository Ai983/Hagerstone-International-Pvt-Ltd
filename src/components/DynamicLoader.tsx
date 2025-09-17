import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DynamicLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Reset loader on route change
    setIsLoading(true);
    setAnimationComplete(false);

    // Start exit animation after 2.5 seconds
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    if (animationComplete) {
      // Remove loader from DOM after fade out animation completes
      const exitTimer = setTimeout(() => {
        setIsLoading(false);
      }, 800);

      return () => clearTimeout(exitTimer);
    }
  }, [animationComplete]);

  if (!isLoading) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="loader-overlay"
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0 
              }}
              animate={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: [0, 0.6, 0] 
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Main logo container */}
        <div className="relative flex items-center justify-center">
          {/* Pulsing glow background */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/30 blur-xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1, 1.1, 1],
              opacity: [0, 0.8, 0.6, 0.8, 0.6]
            }}
            transition={{ 
              duration: 2.5,
              ease: "easeInOut",
              times: [0, 0.3, 0.6, 0.8, 1]
            }}
          />

          {/* Logo with dynamic animations */}
          <motion.div
            className="relative z-10"
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ 
              scale: animationComplete ? 0 : [0, 1.2, 1, 1.05, 1],
              rotate: animationComplete ? 180 : [180, 0, 0, 0, 0],
              opacity: animationComplete ? 0 : [0, 1, 1, 1, 1]
            }}
            transition={{ 
              duration: animationComplete ? 0.8 : 2.5,
              ease: animationComplete ? "easeIn" : "easeOut",
              times: animationComplete ? [0, 1] : [0, 0.4, 0.6, 0.8, 1]
            }}
          >
            <motion.img
              src="/logoo.png"
              alt="Hagerstone Logo"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain filter drop-shadow-2xl"
              initial={{ opacity: 0.8 }}
              animate={{ 
                opacity: animationComplete 
                  ? 0.8 
                  : [0.8, 1, 1, 1, 1]
              }}
              transition={{ 
                duration: animationComplete ? 0.8 : 2.5,
                ease: "easeInOut",
                times: animationComplete ? [0, 1] : [0, 0.4, 0.6, 0.8, 1]
              }}
              onError={(e) => {
                // Fallback: hide image if it fails to load
                console.warn("Logo failed to load, using fallback");
                e.currentTarget.style.display = 'none';
              }}
            />
          </motion.div>

          {/* Animated ring around logo */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/40"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: animationComplete ? 2 : [0, 1.5, 1.2, 1.3, 1.2],
              opacity: animationComplete ? 0 : [0, 0.8, 0.4, 0.6, 0.4],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: animationComplete ? 0.8 : 2.5,
              ease: "easeInOut"
            }}
          />

        </div>

        {/* Loading progress indicator */}
        <motion.div
          className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: animationComplete ? 0 : [0, 1, 1, 1, 1] }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="w-48 sm:w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: animationComplete ? "100%" : "100%" }}
              transition={{ duration: 2.3, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DynamicLoader;