"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const workMenuRef = useRef<HTMLDivElement>(null);
  
  const [isMuted, setIsMuted] = useState(true);
  const [isOverText, setIsOverText] = useState(false);
  const [isOverVideo, setIsOverVideo] = useState(false);
  const [showWAModal, setShowWAModal] = useState(false);
  const [showWorkMenu, setShowWorkMenu] = useState(false);

  // --- LOGIKA KURSOR CUSTOM ---
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
        
        // Cek apakah mouse di dalam video
        const isInsideVideo = 
          e.clientX >= rect.left && 
          e.clientX <= rect.right && 
          e.clientY >= rect.top && 
          e.clientY <= rect.bottom;

        // Cek apakah mouse sedang di atas elemen UI (Button/Menu) agar kursor balik normal
        const target = e.target as HTMLElement;
        const isOverUI = target.closest('button') || target.closest('.pointer-events-auto');

        setIsOverVideo(isInsideVideo && !isOverUI);
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

  // --- ANIMASI MENU WORK (LEBIH HALUS & SEDIKIT LEBIH BESAR) ---
  useEffect(() => {
    if (showWorkMenu && workMenuRef.current) {
      gsap.fromTo(workMenuRef.current, 
        { opacity: 0, y: -20, scale: 0.9, filter: "blur(10px)" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.5, ease: "expo.out" }
      );
    }
  }, [showWorkMenu]);

  const toggleSound = useCallback(() => {
    if (videoRef.current && isOverVideo) {
      const nextMutedState = !videoRef.current.muted;
      videoRef.current.muted = nextMutedState;
      setIsMuted(nextMutedState);
      gsap.fromTo(cursorRef.current, { scale: 1 }, { scale: 1.3, duration: 0.1, yoyo: true, repeat: 1 });
    }
  }, [isOverVideo]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full p-4 md:p-6 bg-[#f1f1f1] overflow-hidden selection:bg-white selection:text-black"
      style={{ cursor: isOverVideo ? 'none' : 'auto' }}
      onClick={toggleSound}
    >
       
      <div 
        ref={cursorRef} 
        className={`fixed top-0 left-0 z-[100] pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference transition-opacity duration-300 
                   ${isOverVideo ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className={`relative flex items-center justify-center transition-all duration-500 ease-out ${isOverText ? 'w-12 h-12' : 'w-24 h-24'}`}>
          <div 
            className={`absolute inset-0 bg-[#d4ff70] transition-all duration-500 ${isOverText ? 'rounded-full scale-50' : ''}`}
            style={{ clipPath: isOverText ? '' : 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}
          />
          <div className="relative z-10 text-black">
            {isOverText ? <span className="text-xl font-serif italic font-bold">t</span> : (isMuted ? <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM3 9v6h4l5 5V4L7 9H3z"/></svg> : <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>)}
          </div>
        </div>
      </div>



      {/* VIDEO BOX */}
      <div 
        ref={videoBoxRef}
        className="relative w-full h-full overflow-hidden rounded-[3.5rem] bg-black shadow-2xl border-8 border-black/5"
      >
        <video ref={videoRef} src="/video-hero.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 flex items-end justify-start p-10 md:p-20 z-10 pointer-events-none">
          <h1 
            onMouseEnter={() => setIsOverText(true)}
            onMouseLeave={() => setIsOverText(false)}
            className="text-[8.5vw] leading-[0.8] font-black text-white uppercase tracking-tighter mix-blend-difference pointer-events-auto"
          >
            <div className="flex flex-wrap items-baseline gap-x-[0.2em]">
              <span>kelas</span>
              <span>menulis</span>
              <span className="italic font-light font-serif lowercase opacity-90">buku</span>
              <span className="italic font-light font-serif lowercase opacity-90">bareng</span>
            </div>
            <div className="block">andre rianda</div>
          </h1>
        </div>
      </div>
    </section>
  );
}