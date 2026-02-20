"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* -------------------------------------------------------------------------- */
/*                                   CONFIG                                   */
/* -------------------------------------------------------------------------- */

const SENTENCE = "belajar menulis bersama kami";
const SCROLL_DISTANCE = 3000;
const CHAR_DELAY = 0.01;
const CHAR_DURATION = 0.3;

export default function ScrollingText() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const letters = SENTENCE.split("");

  /* -------------------------------------------------------------------------- */
  /*                                 ANIMATION                                  */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (!triggerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      const chars = textRef.current!.querySelectorAll(".char");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `+=${SCROLL_DISTANCE}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      /* ------------------------ Horizontal movement ------------------------ */
      tl.fromTo(
        textRef.current,
        { x: "100vw" },
        { x: "-100%", ease: "none" },
        0
      );

      /* ------------------------ Character unification ---------------------- */
      chars.forEach((char, i) => {
        const randomY = Math.random() * 400 - 200;

        tl.fromTo(
          char,
          {
            y: randomY,
            opacity: 0,
            filter: "blur(0.5px)",
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            ease: "power2.out",
            duration: CHAR_DURATION,
          },
          i * CHAR_DELAY
        );
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div ref={triggerRef} className="w-full overflow-hidden bg-[#f1f1f1]">
      <style jsx>{`
        .custom-selection::selection {
          background-color: black;
          color: white;
        }
      `}</style>

      <section className="relative flex h-screen w-full flex-col justify-center overflow-hidden">
        
        {/* TEXT */}
        <div className="flex w-full items-center">
          <div
            ref={textRef}
            className="custom-selection flex whitespace-nowrap will-change-transform"
          >
            {letters.map((char, index) => (
              <span
                key={index}
                className="char inline-block text-[12vw] font-black uppercase tracking-tighter text-black leading-none"
                style={{ minWidth: char === " " ? "3vw" : "auto" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="custom-selection absolute bottom-16 left-0 flex w-full justify-center px-10">
          <p className="max-w-2xl text-center text-lg font-medium leading-snug tracking-tight text-black/80 md:text-xl">
            Audiens kini lebih tersebar <em className="font-serif italic">dan</em>{" "}
            lebih mudah dijangkau. Kami membantu penulis berkembang dan menonjol
            di ruang belajar menulis modern.
          </p>
        </div>

      </section>
    </div>
  );
}

