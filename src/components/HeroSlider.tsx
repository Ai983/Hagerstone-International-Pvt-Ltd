import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const slides = [
    "/hero-images/office.avif",
    "/hero-images/PEBbackground.jpg", 
    "/hero-images/interior.avif"
  ];

  const slideInterval = 3000; // 2 seconds per slide

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
          return 0;
        }
        return prevProgress + (100 / (slideInterval / 100));
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentSlide, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
         key={currentSlide}
         className="relative w-full h-screen"  // fill screen and hold everything
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.5, ease: "easeInOut" }}
        > 
          {/* Background Image */}
          <img 
            src={slides[currentSlide]} 
            alt="Hero slide" 
            className="w-full h-full object-cover"  // cover prevents distortion
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Progress Bars (overlay on image, not pushing section down) */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            <div className="flex gap-4">
              {slides.map((_, index) => (
                <button   
                 key={index}
                 onClick={() => goToSlide(index)}
                 className="relative group cursor-pointer"
                 aria-label={`Go to slide ${index + 1}`}
                >
                  {/* Background bar */}
                  <div className="w-16 md:w-20 lg:w-24 h-1 bg-white/30 rounded-full overflow-hidden">
                    {/* Progress fill */}
                    <motion.div
                      className="h-full bg-white rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: index === currentSlide ? `${progress}%` : index < currentSlide ? '100%' : '0%'
                      }}
                      transition={{ duration: 0.1, ease: "linear" }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>


      {/* Static Text Overlay - Left Aligned */}
      <div className="absolute inset-0 z-10 flex flex-col items-start pl-12 md:pl-24 lg:pl-32 pr-4">
        <div className="max-w-4xl lg:mt-40 mt-20">
          {/* Static bold text */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2 
            }}
          >
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-2xl"
              style={{
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              Design & <span className="font-black">Build.</span>
              <br />
              Tommorow's <span className="font-black">Workspace</span><span className="text-red-500">.</span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex gap-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative group cursor-pointer"
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Background bar */}
              <div className="w-16 md:w-20 lg:w-24 h-1 bg-white/30 rounded-full overflow-hidden">
                {/* Progress fill */}
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: index === currentSlide ? `${progress}%` : index < currentSlide ? '100%' : '0%'
                  }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="flex flex-col items-center text-white/70">
          <div className="text-xs uppercase tracking-wider mb-2 rotate-90 origin-center whitespace-nowrap">
            Scroll
          </div>
          <motion.div
            className="w-px h-8 bg-white/50"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSlider;