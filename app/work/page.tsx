"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import WorkIntro from "@/components/WorkIntro";

const books = [
  { slug: "jeda", title: "Jeda", cover: "/jeda.jpg", category: "kumpulan cerita dan prosa" },
  { slug: "sementara", title: "Sementara", cover: "/sementara.jpeg", category: "kumpulan cerita dan prosa" },
  { slug: "merasa-cukup", title: "Merasa Cukup", cover: "/cukup.jpeg", category: "kumpulan cerita dan prosa" },
  { slug: "rumah", title: "Rumah", cover: "/dua sisi.jpg", category: "kumpulan cerita dan prosa" },
];

export default function WorkPage() {
  const [introDone, setIntroDone] = useState(false);

  const finishIntro = () => {
    setIntroDone(true);
  };

  // 🔒 disable scroll saat intro
  useEffect(() => {
    document.body.style.overflow = introDone ? "auto" : "hidden";
  }, [introDone]);

  return (
    <>
      {!introDone && <WorkIntro onFinish={finishIntro} />}

      {introDone && <Navbar />}

      <main className="min-h-screen bg-[#111] text-white px-8 md:px-20 py-40">
        <div className="max-w-7xl mx-auto mb-24">
          <p className="uppercase tracking-[0.4em] text-xs opacity-50 mb-6">
            our works
          </p>

          <h1 className="text-6xl md:text-8xl font-black leading-none">
            books we published
          </h1>
        </div>

        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14">
          {books.map((book) => (
            <Link
              key={book.slug}
              href={`/work/${book.slug}`}
              className="group block"
            >
              <div className="relative w-full aspect-[3/4.5] overflow-hidden rounded-2xl bg-neutral-800">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="mt-5">
                <p className="text-xs uppercase tracking-widest opacity-50 mb-2">
                  {book.category}
                </p>

                <h3 className="text-2xl font-bold group-hover:opacity-70 transition">
                  {book.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}