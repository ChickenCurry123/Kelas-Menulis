"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Intro() {
  // Membuat 6 kolom untuk efek staggered
  const columns = Array.from({ length: 6 });

  useEffect(() => {
    // Kunci scroll saat intro berlangsung
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 3000); // Ditambah sedikit durasinya agar teks sempat terlihat

    return () => {
      document.body.style.overflow = "auto";
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {/* Container Teks */}
      <div className="absolute inset-0 z-[10000] flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: [0, 1, 1, 0], // Muncul, diam, lalu hilang
            y: [20, 0, 0, -20]     // Geser naik sedikit demi sedikit
          }}
          transition={{
            duration: 2,           // Total durasi teks tampil
            times: [0, 0.2, 0.8, 1], // Timing kapan muncul dan hilangnya
            ease: "easeInOut"
          }}
          className="text-white text-4xl md:text-6xl font-bold tracking-tighter"
        >
          Writing Course
        </motion.h1>
      </div>

      {/* Kolom-kolom Background */}
      <div className="flex h-full w-full">
        {columns.map((_, index) => (
          <motion.div
            key={index}
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
              // Delay lebih lama (1.8s) supaya teks selesai dulu baru kolom naik
              delay: 1.8 + index * 0.1,
            }}
            className="h-full flex-1 bg-[#383838]"
          />
        ))}
      </div>
    </div>
  );
}