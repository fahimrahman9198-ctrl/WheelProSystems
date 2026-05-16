"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Slide = {
  src: string;
  alt: string;
};

const slides: Slide[] = [
  {
    src: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1920&q=70",
    alt: "Close-up of an automotive alloy wheel",
  },
  {
    src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=70",
    alt: "Mechanic working under the hood of a vehicle",
  },
  {
    src: "https://images.unsplash.com/photo-1632823471565-1ecdf5c1b1f6?auto=format&fit=crop&w=1920&q=70",
    alt: "Mobile detailing service polishing a car",
  },
  {
    src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1920&q=70",
    alt: "Professional vehicle on a service lot",
  },
  {
    src: "https://images.unsplash.com/photo-1530046339915-78e95fe44b5e?auto=format&fit=crop&w=1920&q=70",
    alt: "Workshop tools on a service bench",
  },
];

const ROTATE_MS = 5000;

export function HeroBackgroundCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={slides[index].src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[index].src}
            alt={slides[index].alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-[rgba(5,7,13,0.75)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,7,13,0.4)] via-transparent to-[rgba(5,7,13,0.9)]" />
    </div>
  );
}
