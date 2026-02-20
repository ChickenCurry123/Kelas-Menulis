"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutClass() {
  const container = useRef(null);

  useGSAP(() => {
    // Animasi untuk teks
    gsap.from(".reveal-text", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });

    // Animasi khusus untuk container foto (Scale up & Reveal)
    gsap.from(".image-reveal", {
      scrollTrigger: {
        trigger: ".image-reveal",
        start: "top 80%",
      },
      scale: 0.9,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-32 px-6 md:px-24 bg-[#f1f1f1] text-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          
          {/* Kolom Kiri: Headline & Foto */}
          <div className="flex flex-col gap-12">
            <div className="reveal-text">
              <h3 className="text-sm uppercase tracking-[0.3em] text-black/40 font-bold mb-6">
                The Methodology
              </h3>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
                Ide Bagus Saja <br />
                <span className="italic font-serif text-black/40">Tidak Cukup.</span>
              </h2>
            </div>

            {/* AREA FOTO (Tempat yang kamu lingkari merah) */}
            <div className="image-reveal relative w-full aspect-[4/3] md:aspect-square bg-zinc-300 rounded-3xl overflow-hidden shadow-2xl">
              {/* Overlay Label ala Truus */}
              <div className="absolute top-6 left-6 z-10 bg-black text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest">
                Mentor: Andre Rianda
              </div>
              
              {/* Gambar (Ganti src dengan path fotomu nanti) */}
              <img 
                src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop" 
                alt="Proses Menulis" 
                className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-1000 hover:scale-110"
              />

              {/* Speech Bubble / Coretan Tambahan (Optional biar makin mirip Work) */}
              <div className="absolute bottom-8 right-8 bg-[#ff5c00] text-black font-bold px-4 py-2 -rotate-3 rounded-lg text-sm shadow-xl">
                Bikin buku bareng!
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Deskripsi Detail */}
          <div className="reveal-text space-y-10 mt-4 md:mt-24">
            <p className="text-xl md:text-2xl leading-relaxed font-medium text-black/80">
              Banyak yang bermimpi menulis buku, tapi terjebak di bab pertama. Bersama <span className="underline decoration-2 text-black">Andre Rianda</span>, kita tidak hanya belajar teori, tapi langsung mengeksekusi naskah setiap minggu sampai tuntas.
            </p>

            <div className="grid grid-cols-1 gap-8 border-t border-black/10 pt-10">
              <div>
                <h4 className="font-black uppercase text-xs tracking-[0.2em] mb-3">Live Mentoring</h4>
                <p className="text-black/60 text-sm leading-relaxed">Sesi tatap muka mingguan untuk bedah naskah secara personal. Bukan rekaman video, tapi interaksi langsung.</p>
              </div>
              <div>
                <h4 className="font-black uppercase text-xs tracking-[0.2em] mb-3">Community Access</h4>
                <p className="text-black/60 text-sm leading-relaxed">Bergabung dengan ekosistem penulis yang saling mendukung. Menulis tidak lagi menjadi perjalanan yang sepi.</p>
              </div>
              <div>
                <h4 className="font-black uppercase text-xs tracking-[0.2em] mb-3">Publishing Support</h4>
                <p className="text-black/60 text-sm leading-relaxed">Kami bimbing proses editing hingga naskahmu siap dikirim ke penerbit mayor atau terbit mandiri secara profesional.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}