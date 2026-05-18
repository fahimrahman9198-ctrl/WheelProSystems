"use client";

import { motion } from "framer-motion";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "h-12 w-auto" }: LogoProps) {
  return (
    <div className={`${className} relative group`} aria-hidden="true">
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full drop-shadow-[0_0_8px_rgba(47,128,255,0.5)]"
      >
        <circle cx="50" cy="50" r="48" fill="none" stroke="#2F80FF" strokeWidth="0.5" strokeOpacity="0.2" />
        <circle cx="50" cy="50" r="45" fill="none" stroke="#2F80FF" strokeWidth="2" strokeDasharray="10 5" />

        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
        >
          <circle cx="50" cy="50" r="35" fill="none" stroke="#00D4FF" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
          <path d="M50 15 A35 35 0 0 1 85 50" fill="none" stroke="#00D4FF" strokeWidth="3" strokeLinecap="round" />
          <path d="M50 85 A35 35 0 0 1 15 50" fill="none" stroke="#00D4FF" strokeWidth="3" strokeLinecap="round" />
        </motion.g>

        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <rect
              key={angle}
              x="48"
              y="25"
              width="4"
              height="8"
              fill="#2F80FF"
              transform={`rotate(${angle} 50 50)`}
              rx="1"
            />
          ))}
          <circle cx="50" cy="50" r="22" fill="none" stroke="#2F80FF" strokeWidth="4" />
        </motion.g>

        <path
          d="M35 40 L42.5 65 L50 45 L57.5 65 L65 40"
          fill="none"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
