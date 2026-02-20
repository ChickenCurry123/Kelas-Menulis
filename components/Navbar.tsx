"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Navbar() {
  const [showWorkMenu, setShowWorkMenu] = useState(false);
  const [showWAModal, setShowWAModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State baru untuk mobile

  const workMenuRef = useRef<HTMLDivElement>(null);
  const waModalRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null); // Ref untuk animasi mobile menu

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

  /* ---------------- MOBILE MENU CONTROL ---------------- */
  useEffect(() => {
    if (mobileMenuOpen) {
      gsap.to(mobileMenuRef.current, { x: 0, duration: 0.6, ease: "expo.out" });
    } else {
      gsap.to(mobileMenuRef.current, { x: "100%", duration: 0.5, ease: "expo.in" });
    }
  }, [mobileMenuOpen]);

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
    <nav className="fixed top-0 left-0 w-full px-6 md:px-12 py-6 md:py-10 z-[100] flex justify-between items-center md:items-start pointer-events-none">

      {/* ================= WORK BUTTON (DESKTOP) ================= */}
      <div
        className="relative pointer-events-auto hidden md:block"
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

          <div className="space-y-6">
            {[
              { title: "Jeda", img: "/jeda.jpg" },
              { title: "Sementara", img: "/sementara.jpeg" },
              { title: "Merasa Cukup", img: "/cukup.jpeg" }
            ].map((item, i) => (
              <Link
                key={i}
                href="/work"
                onClick={() => setShowWorkMenu(false)}
                className="flex gap-6 items-center group cursor-pointer"
              >
                <div className="w-28 h-28 bg-zinc-200 rounded-[2rem] overflow-hidden flex-shrink-0">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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

          <Link
            href="/work"
            onClick={() => setShowWorkMenu(false)}
            className="block text-center w-full bg-black text-white py-6 rounded-[2.2rem] mt-10 font-black uppercase text-sm tracking-widest hover:bg-orange-600 transition-all duration-300"
          >
            semua kerjaan andre
          </Link>
        </div>
      </div>

      {/* ================= MOBILE HAMBURGER ================= */}
      <div className="md:hidden pointer-events-auto">
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className={`p-3 rounded-xl shadow-md font-black uppercase text-xs tracking-widest transition-all ${
            isScrolled ? "bg-black text-white" : "bg-[#f5efeb] text-black"
          }`}
        >
          Menu
        </button>
      </div>

      {/* ================= LOGO ================= */}
      <Link href="/" className="pointer-events-auto">
        <h2
          className={`text-xl md:text-3xl font-black lowercase transition-colors duration-500 cursor-pointer ${
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
          className={`p-3 md:p-4 rounded-full backdrop-blur-md border transition-all duration-500 ${
            isScrolled
              ? "bg-black/10 border-black/20 text-black"
              : "bg-white/10 border-white/20 text-white mix-blend-difference"
          }`}
        >
          <svg width="20" height="20" className="md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.3A10 10 0 1 0 12 2z" />
          </svg>
        </div>

        {/* WA DROPDOWN (DESKTOP ONLY) */}
        <div
          ref={waModalRef}
          className="hidden md:block absolute top-0 right-0 w-[320px] bg-[#f0ede8] rounded-[2.5rem] p-8 shadow-2xl z-50 origin-top-right text-black opacity-0 pointer-events-none"
        >
          <div className="flex flex-col items-center text-center">
            <div className="bg-white p-4 rounded-3xl mb-6 shadow-sm">
              <img src="/qr-wa.jpeg" alt="QR" className="w-32 h-32 object-contain" />
            </div>
            <h3 className="font-black uppercase text-xl mb-1">whatsapp us</h3>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6 px-4">
              Pindai kode QR untuk mengobrol melalui ponsel Anda.
            </p>
            <a href="https://wa.me/62895603005825" target="_blank" className="font-black uppercase text-sm border-b-2 border-black pb-0.5 hover:text-orange-600 transition-all">
              Chat via desktop
            </a>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU OVERLAY ================= */}
      <div 
        ref={mobileMenuRef}
        className="fixed inset-0 bg-[#f5efeb] z-[200] translate-x-full pointer-events-auto flex flex-col p-8 md:hidden text-black"
      >
        <div className="flex justify-between items-center mb-16">
          <span className="font-black uppercase tracking-tighter text-xl">Menu</span>
          <button onClick={() => setMobileMenuOpen(false)} className="font-black uppercase text-xs border-2 border-black px-4 py-2 rounded-full">Close</button>
        </div>
        
        <div className="flex flex-col gap-6">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-5xl font-black uppercase tracking-tighter">Home</Link>
          <Link href="/work" onClick={() => setMobileMenuOpen(false)} className="text-5xl font-black uppercase tracking-tighter">Work</Link>
          <a href="https://wa.me/62895603005825" className="text-5xl font-black uppercase tracking-tighter text-orange-600">Contact</a>
        </div>

        <div className="mt-auto pb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">© 2026 Writing Course</p>
        </div>
      </div>

    </nav>
  );
}
