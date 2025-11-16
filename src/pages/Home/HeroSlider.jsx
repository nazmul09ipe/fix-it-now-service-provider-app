import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import local images
import bg1 from "../../assets/Screenshot 2025-11-05 143500.png";
import bg2 from "../../assets/Screenshot 2025-11-05 143600.png";
import bg3 from "../../assets/Screenshot 2025-11-05 143706.png";

const slides = [bg1, bg2, bg3];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 15 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden -mt-32 z-0">
      {/* Animated background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${slides[current]})`,
          }}
        />
      </AnimatePresence>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index ? "bg-white scale-125" : "bg-gray-400/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
