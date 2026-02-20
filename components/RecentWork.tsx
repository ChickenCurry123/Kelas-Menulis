"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  { title: "Jeda", category: "kumpulan cerita dan prosa", src: "jeda 1.jpg", color: "#EFEFEF" },
  { title: "Sementara", category: "kumpulan cerita dan prosa", src: "sementara.jpeg", color: "#8C8C8C" },
  { title: "Dua Sisi", category: "kumpulan cerita dan prosa", src: "dua sisi.jpg", color: "#1C1D20" },
  { title: "Merasa Cukup", category: "kumpulan cerita dan prosa", src: "buku-merasa-cukup.jpg", color: "#706D63" },
];

export default function RecentWork() {
  const [modal, setModal] = useState({ active: false, index: 0 });

  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  /* ========================= GSAP SCROLL LOCK ========================= */

useEffect(() => {
  if (!sectionRef.current || !trackRef.current) return;

  const ctx = gsap.context(() => {
    const totalWidth = trackRef.current!.scrollWidth;
    const viewportWidth = window.innerWidth;

    // jarak horizontal asli
    const horizontalDistance = totalWidth - viewportWidth;

    // tambahkan buffer supaya tidak naik duluan
    const scrollDistance = horizontalDistance + window.innerHeight;

    gsap.to(trackRef.current, {
      x: -horizontalDistance,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${scrollDistance}`, // 🔥 lebih panjang
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  }, sectionRef);

  return () => ctx.revert();
}, []);

  /* ========================= CURSOR FLOATING ========================= */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveMouse);
    return () => window.removeEventListener("mousemove", moveMouse);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-[#f2f2f2] overflow-hidden"
    >
      <div className="flex h-screen items-center overflow-hidden">

        {/* WATERMARK */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <h2 className="text-[30vw] font-black uppercase text-black/[0.03]">
            Work
          </h2>
        </div>

        {/* TITLE */}
        <div className="absolute top-24 left-12 z-20">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30">
            Karya Terbaru
          </span>
        </div>

        {/* HORIZONTAL TRACK */}
        <div
          ref={trackRef}
          className="flex gap-24 pl-[10vw] pr-[20vw] items-center relative z-10"
        >
          {projects.map((project, index) => (
            <Link
              href="/work"
              key={index}
              onMouseEnter={() => setModal({ active: true, index })}
              onMouseLeave={() => setModal({ active: false, index })}
              className="group relative flex w-[75vw] md:w-[26vw] flex-col cursor-none"
            >
              <div className="relative rounded-2xl bg-white p-4 shadow-[0_15px_50px_rgba(0,0,0,0.04)] border border-black/5 transition-all duration-700 ease-out group-hover:shadow-[0_30px_70px_rgba(0,0,0,0.1)] group-hover:-translate-y-3">
                <div className="relative aspect-[3/4.5] w-full overflow-hidden rounded-lg bg-neutral-100">
                  <Image
                    src={`/${project.src}`}
                    fill
                    alt={project.title}
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />
                </div>
              </div>

              <div className="mt-8 px-2">
                <h2 className="text-2xl font-bold uppercase tracking-tighter">
                  {project.title}
                </h2>
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-black/40 mt-3">
                  {project.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* FLOATING PREVIEW */}
      <motion.div
        style={{ left: smoothX, top: smoothY }}
        initial={{ scale: 0, x: "-50%", y: "-50%" }}
        animate={{ scale: modal.active ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="pointer-events-none fixed z-50 h-[280px] w-[380px] overflow-hidden rounded-xl shadow-2xl"
      >
        <div
          className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ transform: `translateY(${modal.index * -100}%)` }}
        >
          {projects.map((project, i) => (
            <div
              key={i}
              className="flex h-full w-full items-center justify-center"
              style={{ backgroundColor: project.color }}
            >
              <div className="relative h-[85%] w-[85%]">
                <Image
                  src={`/${project.src}`}
                  fill
                  alt={project.title}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* BULAT LIHAT */}
      <motion.div
        style={{ left: smoothX, top: smoothY }}
        initial={{ scale: 0, x: "-50%", y: "-50%" }}
        animate={{ scale: modal.active ? 1 : 0 }}
        className="pointer-events-none fixed z-[60] flex h-20 w-20 items-center justify-center rounded-full bg-white text-black mix-blend-difference"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest">
          Lihat
        </span>
      </motion.div>
    </section>
  );
}
