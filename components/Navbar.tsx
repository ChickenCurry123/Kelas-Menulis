"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Navbar() {
  const [showWorkMenu, setShowWorkMenu] = useState(false);
  const [showWAModal, setShowWAModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const workMenuRef = useRef<HTMLDivElement>(null);
  const waModalRef = useRef<HTMLDivElement>(null);

  /* ---------------- SCROLL COLOR NAV ---------------- */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- ANIMATION HELPERS ---------------- */
  const animateIn = (el: HTMLDivElement | null) => {
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.to(el, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.45,
      ease: "expo.out",
      pointerEvents: "auto"
    });
  };

  const animateOut = (el: HTMLDivElement | null) => {
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.to(el, {
      opacity: 0,
      y: -12,
      scale: 0.96,
      filter: "blur(8px)",
      duration: 0.35,
      ease: "expo.in",
      pointerEvents: "none"
    });
  };

  /* ---------------- WORK MENU CONTROL ---------------- */
  useEffect(() => {
    showWorkMenu
      ? animateIn(workMenuRef.current)
      : animateOut(workMenuRef.current);
  }, [showWorkMenu]);

  /* ---------------- WA MODAL CONTROL ---------------- */
  useEffect(() => {
    showWAModal
      ? animateIn(waModalRef.current)
      : animateOut(waModalRef.current);
  }, [showWAModal]);

  /* ---------------- HOVER SAFE LEAVE ---------------- */
  const safeLeave = (
    e: React.MouseEvent<HTMLDivElement>,
    setter: (v: boolean) => void
  ) => {
    const related = e.relatedTarget;
    if (!related || !(related instanceof Node)) {
      setter(false);
      return;
    }
    if (!e.currentTarget.contains(related)) {
      setter(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full px-12 py-10 z-[100] flex justify-between items-start pointer-events-none">

      {/* ================= WORK BUTTON ================= */}
      <div
        className="relative pointer-events-auto"
        onMouseEnter={() => setShowWorkMenu(true)}
        onMouseLeave={(e) => safeLeave(e, setShowWorkMenu)}
      >
        <div
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl shadow-md cursor-pointer transition-all duration-300 ${
            isScrolled ? "bg-black text-white" : "bg-[#f5efeb] text-black"
          }`}
        >
          <span className="text-orange-600 text-xl">★</span>
          <span className="font-black uppercase tracking-tighter text-lg">
            work
          </span>
        </div>

        {/* DROPDOWN */}
        <div
          ref={workMenuRef}
          className="absolute top-0 left-0 w-[450px] bg-[#f5efeb] rounded-[3rem] p-10 shadow-2xl z-50 origin-top-left text-black opacity-0 pointer-events-none"
        >
          <div className="flex items-center gap-3 mb-10 font-black uppercase tracking-tighter text-xl">
            <span className="text-orange-600 text-2xl">★</span> work
          </div>

          {/* ================= LIST BOOK ================= */}
          <div className="space-y-6">
            {[
              { title: "Jeda", img: "/jeda.jpg" },
              { title: "Sementara", img: "/sementara.jpeg" },
              { title: "Merasa Cukup", img: "/cukup.jpeg" }
            ].map((item, i) => (
              <Link
                key={i}
                href="/work" // Langsung mengarah ke halaman work/page.tsx
                onClick={() => setShowWorkMenu(false)}
                className="flex gap-6 items-center group cursor-pointer"
              >
                <div className="w-28 h-28 bg-zinc-200 rounded-[2rem] overflow-hidden flex-shrink-0">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>

                <div>
                  <p className="text-3xl font-black uppercase tracking-tighter group-hover:text-orange-600 transition-colors leading-none">
                    {item.title}
                  </p>
                  <p className="text-xs font-bold text-zinc-400 uppercase mt-2 tracking-widest">
                    View Project
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* ALL WORK PAGE */}
          <Link
            href="/work"
            onClick={() => setShowWorkMenu(false)}
            className="block text-center w-full bg-black text-white py-6 rounded-[2.2rem] mt-10 font-black uppercase text-sm tracking-widest hover:bg-orange-600 transition-all duration-300"
          >
            semua kerjaan andre
          </Link>

        </div>
      </div>

      {/* ================= LOGO ================= */}
      <Link href="/" className="pointer-events-auto">
        <h2
          className={`text-3xl font-black lowercase mt-1 transition-colors duration-500 cursor-pointer ${
            isScrolled ? "text-black" : "text-white mix-blend-difference"
          }`}
        >
          Writing Course
        </h2>
      </Link>

      {/* ================= WA BUTTON ================= */}
      <div
        className="relative pointer-events-auto flex flex-col items-end"
        onMouseEnter={() => setShowWAModal(true)}
        onMouseLeave={(e) => safeLeave(e, setShowWAModal)}
      >
        <div
          className={`p-4 rounded-full backdrop-blur-md border transition-all duration-500 ${
            isScrolled
              ? "bg-black/10 border-black/20 text-black"
              : "bg-white/10 border-white/20 text-white mix-blend-difference"
          }`}
        >
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.3A10 10 0 1 0 12 2z" />
          </svg>
        </div>

        <div
          ref={waModalRef}
          className="absolute top-0 right-0 w-[320px] bg-[#f0ede8] rounded-[2.5rem] p-8 shadow-2xl z-50 origin-top-right text-black opacity-0 pointer-events-none"
        >
          <div className="flex flex-col items-center text-center">
            <div className="bg-white p-4 rounded-3xl mb-6 shadow-sm">
              <img src="/qr-wa.jpeg" alt="QR" className="w-32 h-32 object-contain" />
            </div>

            <h3 className="font-black uppercase text-xl mb-1">whatsapp us</h3>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6 px-4">
              Pindai kode QR untuk mengobrol melalui ponsel Anda.
            </p>
            <a
              href="https://wa.me/62895603005825"
              target="_blank"
              className="font-black uppercase text-sm border-b-2 border-black pb-0.5 hover:text-orange-600 hover:border-orange-600 transition-all"
            >
              Chat via desktop
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}