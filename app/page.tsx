"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollingText from "@/components/ScrollingText";
import Intro from "@/components/Intro";
import Work from "@/components/Work";
import RecentWork from "@/components/RecentWork";
import AboutClass from "@/components/AboutClass";
import Curriculum from "@/components/Curriculum";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <main className="bg-[#f2f2f2] relative overflow-x-hidden min-h-screen">

      {/* INTRO */}
      <Intro />

      {/* NAVBAR */}
      <Navbar />

      {/* Main Wrapper */}
      <div className="relative z-10 flex flex-col items-stretch">

        {/* ================= HERO ================= */}
        <div className="relative w-full">
          <motion.img
            src="/11.png"
            className="absolute top-10 right-10 w-24 md:w-36 z-50 pointer-events-none opacity-80"
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.img
            src="/13.png"
            className="absolute top-[20%] -left-6 w-20 md:w-32 z-50 pointer-events-none rotate-[-20deg]"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <Hero />
        </div>

        {/* ================= SCROLLING TEXT ================= */}
        <div className="relative bg-[#f2f2f2] w-full">
          <motion.img
            src="/12.png"
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 md:w-24 z-50 pointer-events-none grayscale opacity-40"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <ScrollingText />
        </div>

        {/* ================= WORK ================= */}
        {/* PERBAIKAN JARAK: pb-40 memberikan ruang agar tidak langsung menabrak RecentWork */}
        <div className="relative w-full pb-16 md:pb-60 bg-[#f2f2f2]">
          <Work />
          <motion.img
            src="/13.png"
            className="absolute bottom-10 -right-6 w-40 md:w-56 z-50 pointer-events-none rotate-[15deg]"
            whileInView={{ x: [-40, 0], opacity: [0, 1] }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          />
        </div>

        {/* ================= RECENT WORK ================= */}
        {/* RecentWork memiliki h-[250vh] di dalamnya untuk durasi scroll yang lega */}
        <RecentWork />

        {/* ================= ABOUT CLASS ================= */}
        <div className="relative w-full z-20 mt-[-2px] bg-[#f2f2f2]">
          <motion.img
            src="/11.png"
            className="absolute top-24 right-[15%] w-20 md:w-28 z-50 pointer-events-none"
            whileInView={{ scale: [0.8, 1], rotate: [-10, 0] }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          />

          <motion.img
            src="/12.png"
            className="absolute bottom-10 -left-8 w-32 md:w-48 z-50 pointer-events-none"
            animate={{ x: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          <AboutClass />
        </div>

        {/* ================= CURRICULUM ================= */}
        <div className="relative w-full bg-[#f2f2f2] mt-[-1px]">
          <motion.img
            src="/13.png"
            className="absolute top-0 left-[20%] w-14 md:w-20 z-50 opacity-30 pointer-events-none"
          />

          <Curriculum />

          <motion.img
            src="/12.png"
            className="absolute bottom-20 right-[10%] w-32 md:w-44 z-50 rotate-[-10deg] pointer-events-none"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <motion.img
            src="/13.png"
            className="absolute bottom-0 -left-6 w-24 md:w-36 z-50 pointer-events-none brightness-50"
          />
        </div>

      </div>
    </main>
  );
}