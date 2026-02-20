"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  { week: "01", title: "Mencari Suara", desc: "Menemukan kejujuran dalam tulisan dan menentukan 'apa' yang ingin kamu sampaikan pada dunia." },
  { week: "02", title: "Arsitektur Cerita", desc: "Membangun pondasi dan outline yang kokoh agar naskahmu tidak macet di tengah jalan." },
  { week: "03", title: "Maraton Menulis", desc: "Sesi intensif mingguan untuk mengeksekusi bab demi bab dengan target yang terukur." },
  { week: "04", title: "Finalisasi & Terbit", desc: "Proses editing, bedah kover, hingga persiapan naskah masuk ke meja redaksi atau cetak." },
];

export default function CurriculumAndFooter() {
  const mainContainer = useRef(null);

  useGSAP(() => {
    // Animasi Step Items
    const items = gsap.utils.toArray(".step-item");
    items.forEach((item: any) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    });

    // Animasi Marquee (Sinkron dengan Scroll)
    gsap.to(".marquee-inner", {
      scrollTrigger: {
        trigger: mainContainer.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
      xPercent: -40,
      ease: "none",
    });
  }, { scope: mainContainer });

  return (
    <div ref={mainContainer} className="relative w-full bg-black overflow-hidden isolate">
      
      {/* SECTION: CURRICULUM */}
      <section className="relative py-32 px-6 md:px-24 text-white z-10">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xs uppercase tracking-[0.4em] text-white/40 font-bold mb-20">
            The Roadmap
          </h3>

          <div className="space-y-24">
            {steps.map((step, i) => (
              <div 
                key={i} 
                className="step-item group flex flex-col md:flex-row gap-8 md:gap-20 border-b border-white/10 pb-12 relative"
              >
                <span className="text-6xl md:text-9xl font-black text-white/10 group-hover:text-white transition-colors duration-500">
                  {step.week}
                </span>
                <div className="max-w-xl">
                  <h4 className="text-3xl md:text-6xl font-bold tracking-tighter mb-6 group-hover:italic transition-all leading-none">
                    {step.title}
                  </h4>
                  <p className="text-white/60 text-lg md:text-xl leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOUBLE KINETIC TAPE - Transisi antar section */}
      <div className="relative w-full h-0 z-50 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] mix-blend-difference">
          <div className="rotate-[-6deg] space-y-4">
            <div className="flex whitespace-nowrap overflow-hidden border-y-[4px] border-white py-5 bg-white text-black shadow-2xl">
              <div className="marquee-inner animate-marquee-slow flex items-center gap-16">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="flex items-center gap-16">
                    <span className="text-7xl md:text-8xl font-black uppercase italic">NULIS</span>
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">★</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: FOOTER */}
      <footer className="relative bg-white pt-64 pb-16 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-40">
            
            <div className="max-w-2xl text-black">
              <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter leading-[0.85] uppercase italic">
                Mari <br /> Menulis.
              </h2>
              <p className="mt-10 text-xl md:text-2xl text-black/50 leading-relaxed max-w-md tracking-tight">
                Mendampingi penulis dari ide pertama hingga naskah jadi. Mari mulai cerita kamu hari ini.
              </p>
              
              <div className="mt-12">
  <a 
    href="https://wa.me/62895603005825?text=Halo,%20saya%20ingin%20mengamankan%20slot%20kelas." 
    target="_blank" 
    rel="noopener noreferrer"
    className="inline-block"
  >
    <button className="bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-all">
      Amankan Slot
    </button>
  </a>
</div>
            </div>

            <div className="grid grid-cols-2 gap-16 md:gap-24 text-black">
             <div className="flex flex-col gap-6">
  <h4 className="text-[10px] uppercase tracking-[0.4em] text-black/30 font-bold">Navigasi</h4>
  <ul className="flex flex-col gap-4 text-lg font-bold uppercase">
    {/* Mengarah ke app/work/page.tsx */}
    <li>
      <a href="/work" className="hover:italic transition-all">
        Work
      </a>
    </li>
    
    {/* Mengarah ke WhatsApp dengan pesan otomatis */}
    <li>
      <a 
        href="https://wa.me/62895603005825?text=Halo,%20saya%20ingin%20mendaftar%20kelas." 
        target="_blank" 
        rel="noopener noreferrer" 
        className="hover:italic transition-all"
      >
        Register
      </a>
    </li>
  </ul>
</div>
              <div className="flex flex-col gap-6">
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-black/30 font-bold">Sosial</h4>
                <ul className="flex flex-col gap-4 text-lg font-bold uppercase">
                  <li><a href="https://www.instagram.com/andreerianda?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:italic transition-all">Instagram</a></li>
                  <li><a href="https://www.instagram.com/andreerianda?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:italic transition-all">Twitter</a></li>
                  <li><a href="https://www.instagram.com/andreerianda?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:italic transition-all">Threads</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-black/10 gap-8">
            <div className="flex items-center gap-5 text-black">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-sm">★</span>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">
                © 2026 Code By Raihan.R • All Rights Reserved
              </p>
            </div>
          </div>
        </div>

        {/* Background Text Decor */}
        <div className="absolute -bottom-10 -left-10 text-[30vw] font-black text-black/[0.03] select-none pointer-events-none tracking-tighter italic leading-none uppercase">
          Write
        </div>
      </footer>

      <style jsx>{`
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          animation: marquee-slow 40s linear infinite;
        }
      `}</style>
    </div>
  );
}