"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function WorkIntro({ onFinish }: { onFinish: () => void }) {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement[]>([]);
  const hasRun = useRef(false);

  // Membuat array untuk 6 kolom
  const columns = Array.from({ length: 6 });

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const tl = gsap.timeline({
      onComplete: onFinish
    });

    // 1. Teks "WORK" muncul dengan halus
    tl.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
      }
    );

    // 2. Hold sejenak agar teks terbaca
    tl.to({}, { duration: 0.8 });

    // 3. Teks "WORK" menghilang ke atas sedikit
    tl.to(textRef.current, {
      y: -40,
      opacity: 0,
      duration: 0.8,
      ease: "power4.in",
    });

    // 4. EFEK UTAMA: Kolom-kolom naik satu per satu (Staggered)
    tl.to(columnsRef.current, {
      yPercent: -100,
      duration: 1.2,
      stagger: 0.1, // Jeda antar kolom
      ease: "power4.inOut",
    }, "-=0.2"); // Mulai sedikit lebih awal sebelum teks benar-benar hilang

  }, [onFinish]);

  return (
    <div ref={container} className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Container Teks di atas kolom */}
      <div className="absolute inset-0 z-[100] flex items-center justify-center">
        <div
          ref={textRef}
          className="text-white text-7xl md:text-9xl font-black tracking-tighter"
        >
          WORK
        </div>
      </div>

      {/* Layer Kolom-kolom */}
      <div className="flex h-full w-full">
        {columns.map((_, i) => (
          <div
            key={i}
            ref={(el) => { if (el) columnsRef.current[i] = el; }}
            className="h-full flex-1 bg-[#a3a0a0]" // Warna hitam elegan untuk Work
            style={{ transform: "translateY(0%)" }}
          />
        ))}
      </div>
    </div>
  );
}