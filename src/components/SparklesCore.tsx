"use client";
import React from "react";
import { motion } from "framer-motion";

export const SparklesCore = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* The Grid Base */}
      <svg className="absolute inset-0 h-full w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(16, 185, 129, 0.1)" strokeWidth="1" />
            {/* Green Dots at intersections */}
            <circle cx="0" cy="0" r="1" fill="#10b981" fillOpacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Animated Beams */}
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        
        {/* We generate several random paths for the beams */}
        {[...Array(6)].map((_, i) => (
          <motion.path
            key={i}
            d={`M ${-200 + (i * 400)} ${200 + (i * 100)} L ${1200 + (i * 400)} ${800 + (i * 100)}`}
            stroke="url(#beamGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0], 
              opacity: [0, 1, 0],
              pathOffset: [0, 1] 
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
          />
        ))}
      </svg>

      {/* Vignette Overlay to keep content readable */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)]" />
    </div>
  );
};