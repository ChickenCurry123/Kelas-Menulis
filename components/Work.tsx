"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const projects = [
  { id: 1, img: "/1.jpeg" },
  { id: 2, img: "/2.jpeg" },
  { id: 3, img: "/3.jpeg" },
  { id: 4, img: "/4.jpg" }, 
  { id: 5, img: "/5.jpeg" },
  { id: 6, img: "/6.jpeg" },
  { id: 7, img: "/7.jpeg" },
  { id: 8, img: "/8.jpeg" },
];

export default function Work() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const active = useRef(3); 
  const startX = useRef(0);
  const dragX = useRef(0);
  const dragging = useRef(false);

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".fan-card");
    const spacing = 260;

    function draw(offsetDrag = 0) {
      cards.forEach((card, i) => {
        const offset = i - active.current + offsetDrag;

        const x = offset * spacing;
        const scale = 1 - Math.abs(offset) * 0.18;
        const rotate = offset * 9;
        const z = 100 - Math.abs(offset);
        const opacity = Math.abs(offset) > 3 ? 0 : 1;

        gsap.set(card, {
          x,
          scale,
          rotate,
          zIndex: z,
          opacity,
        });
      });
    }

    draw();

    const wrapper = wrapperRef.current!;

    function down(e: PointerEvent) {
      dragging.current = true;
      startX.current = e.clientX;
    }

    function move(e: PointerEvent) {
      if (!dragging.current) return;
      dragX.current = (e.clientX - startX.current) / spacing;
      draw(dragX.current);
    }

    function up() {
      if (!dragging.current) return;
      dragging.current = false;

      if (dragX.current > 0.35 && active.current > 0) active.current--;
      else if (dragX.current < -0.35 && active.current < cards.length - 1) active.current++;

      gsap.to({}, {
        duration: 0.55,
        ease: "power3.out",
        onUpdate: () => draw(),
      });
    }

    wrapper.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);

    return () => {
      wrapper.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <section className="relative py-40 px-6 md:px-12 bg-[#f1f1f1] overflow-hidden">

      {/* ===== DOODLES ===== */}
      <div className="absolute top-[15%] right-[10%] w-44 md:w-64 opacity-60 pointer-events-none rotate-12">
        <svg viewBox="0 0 311 161" className="w-full h-auto">
          <path
            d="M2 143.5C30 50 120 10 160 80C190 140 100 160 85 110C70 60 180 20 300 120M300 120L285 105M300 120L308 95"
            stroke="black"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      <div className="absolute top-40 left-[5%] w-64 h-40 pointer-events-none opacity-40">
        <svg viewBox="0 0 500 200" className="w-full h-full">
          <path
            d="M10,150 Q150,10 250,100 T490,50"
            stroke="black"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ===== TITLE ===== */}
      <div className="max-w-7xl mx-auto mb-28 text-center relative z-10">
        <h2 className="text-[8vw] md:text-[6vw] font-black leading-[0.85] tracking-tighter text-black uppercase">
          Tempat penulis <br />
          masa depan lahir. <br />
          <span className="font-serif italic lowercase font-normal tracking-normal normal-case bg-clip-text text-transparent bg-gradient-to-r from-[#e94d89] via-[#4a86e8] to-[#d4f05a] brightness-90">
            Dari konsep ke karya.
          </span>
        </h2>
      </div>

      {/* ===== CAROUSEL ===== */}
      <div className="relative w-full h-[520px] flex items-center justify-center">
        <div
          ref={wrapperRef}
          className="relative w-full max-w-[1400px] h-full flex items-center justify-center touch-none select-none cursor-grab active:cursor-grabbing"
        >
          {projects.map((p) => (
            <div
              key={p.id}
              className="fan-card absolute w-[320px] md:w-[420px] aspect-[4/5] rounded-[40px] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.25)] bg-white will-change-transform"
            >
              <img src={p.img} className="w-full h-full object-cover pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
