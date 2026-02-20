"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isOverText, setIsOverText] = useState(false);
  const [isOverVideo, setIsOverVideo] = useState(false);

  // -------------------------------
  // CUSTOM CURSOR
  // -------------------------------
  useEffect(() => {
    if (!cursorRef.current) return;

    const cursor = cursorRef.current;
    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    const speed = 0.15;

    const xSetter = gsap.quickSetter(cursor, "x", "px");
    const ySetter = gsap.quickSetter(cursor, "y", "px");

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (videoBoxRef.current) {
        const rect = videoBoxRef.current.getBoundingClientRect();

        const isInsideVideo =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        setIsOverVideo(isInsideVideo);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const loop = () => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSetter(pos.x);
      ySetter(pos.y);
    };

    gsap.ticker.add(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(loop);
    };
  }, []);

  // -------------------------------
  // TOGGLE SOUND
  // -------------------------------
  const toggleSound = useCallback(() => {
    if (videoRef.current && isOverVideo) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);

      if (cursorRef.current) {
        gsap.fromTo(
          cursorRef.current,
          { scale: 1 },
          { scale: 1.3, duration: 0.15, yoyo: true, repeat: 1 }
        );
      }
    }
  }, [isOverVideo]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full p-4 md:p-6 bg-[#f1f1f1] overflow-hidden"
      style={{ cursor: isOverVideo ? "none" : "auto" }}
      onClick={toggleSound}
    >
      {/* ================= CURSOR ================= */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 z-[100] pointer-events-none 
        -translate-x-1/2 -translate-y-1/2 flex items-center justify-center 
        mix-blend-difference transition-opacity duration-300
        ${isOverVideo ? "opacity-100" : "opacity-0"}`}
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-500
          ${isOverText ? "w-12 h-12" : "w-24 h-24"}`}
        >
          <div
            className={`absolute inset-0 bg-[#d4ff70] transition-all duration-500 
            ${isOverText ? "rounded-full scale-50" : ""}`}
            style={{
              clipPath: isOverText
                ? ""
                : "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
          />

          <div className="relative z-10 text-black">
            {isMuted ? (
              <span className="text-xs font-bold uppercase">Sound</span>
            ) : (
              <span className="text-xs font-bold uppercase">Mute</span>
            )}
          </div>
        </div>
      </div>

      {/* ================= VIDEO BOX ================= */}
      <div
        ref={videoBoxRef}
        className="relative w-full h-full overflow-hidden rounded-[3.5rem] bg-black shadow-2xl border-8 border-black/5"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          <source
            src="https://res.cloudinary.com/dwggcbvfr/video/upload/v1771568800/video-hero_ortc3k.mp4"
            type="video/mp4"
          />
        </video>

        {/* ================= HERO TEXT ================= */}
        <div className="absolute inset-0 flex items-end justify-start p-10 md:p-20 z-10 pointer-events-none">
          <h1
            onMouseEnter={() => setIsOverText(true)}
            onMouseLeave={() => setIsOverText(false)}
            className="text-[8.5vw] leading-[0.8] font-black text-white uppercase tracking-tighter mix-blend-difference pointer-events-auto"
          >
            <div className="flex flex-wrap items-baseline gap-x-[0.2em]">
              <span>kelas</span>
              <span>menulis</span>
              <span className="italic font-light font-serif lowercase opacity-90">
                buku
              </span>
              <span className="italic font-light font-serif lowercase opacity-90">
                bareng
              </span>
            </div>
            <div className="block">andre rianda</div>
          </h1>
        </div>
      </div>
    </section>
  );
}
