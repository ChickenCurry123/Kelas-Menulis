"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";

const projects = [
  { title: "Jeda", category: "kumpulan cerita dan prosa", src: "jeda 1.jpg", color: "#EFEFEF" },
  { title: "Sementara", category: "kumpulan cerita dan prosa", src: "sementara.jpeg", color: "#8C8C8C" },
  { title: "Dua Sisi", category: "kumpulan cerita dan prosa", src: "dua sisi.jpg", color: "#1C1D20" },
  { title: "Merasa Cukup", category: "kumpulan cerita dan prosa", src: "buku-merasa-cukup.jpg", color: "#706D63" },
];

export default function RecentWork() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Digeser sedikit agar tidak langsung mentok kiri di awal
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-70%"]);

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const arrowOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);

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
  }, [mouseX, mouseY]);

  return (
    <motion.section 
      ref={targetRef} 
      /* PENTING: Tinggi ditambah ke 250vh agar scroll lebih awet dan lega.
         pt-[15vh] memberikan jarak dari section WORK di atasnya.
      */
      className="relative h-[140vh] bg-[#f2f2f2]"  
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* WATERMARK */}
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <h2 className="text-[30vw] font-black uppercase text-black/[0.03]">Work</h2>
        </motion.div>

        {/* TITLE */}
        <div className="absolute top-24 left-12 z-20">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30">
            Karya Terbaru
          </span>
        </div>

        {/* GALLERY */}
        <motion.div style={{ x }} className="flex gap-24 pl-[10vw] pr-[20vw] items-center relative z-10">
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

          <motion.div
            style={{ opacity: arrowOpacity }}
            className="flex flex-col items-center justify-center min-w-[300px]"
          >
            <p className="text-[9px] font-bold tracking-[0.5em] uppercase text-black/20 mb-8">
              Selengkapnya
            </p>
            <div className="w-12 h-[1px] bg-black/20" />
          </motion.div>
        </motion.div>
      </div>

      {/* FLOATING PREVIEW & CURSOR (Tetap Sama) */}
      {/* ... bagian modal dan cursor tidak berubah ... */}
      <motion.div
        style={{ left: smoothX, top: smoothY }}
        initial={{ scale: 0, x: "-50%", y: "-50%" }}
        animate={{ scale: modal.active ? 1 : 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } }}
        className="pointer-events-none fixed z-50 h-[280px] w-[380px] overflow-hidden rounded-xl shadow-2xl"
      >
        <div className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" style={{ transform: `translateY(${modal.index * -100}%)` }}>
          {projects.map((project, i) => (
            <div key={i} className="flex h-full w-full items-center justify-center" style={{ backgroundColor: project.color }}>
              <div className="relative h-[85%] w-[85%]">
                <Image src={`/${project.src}`} fill alt={project.title} className="object-contain" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        style={{ left: smoothX, top: smoothY }}
        initial={{ scale: 0, x: "-50%", y: "-50%" }}
        animate={{ scale: modal.active ? 1 : 0 }}
        className="pointer-events-none fixed z-[60] flex h-20 w-20 items-center justify-center rounded-full bg-white text-black mix-blend-difference"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest">Lihat</span>
      </motion.div>
    </motion.section>
  );
}