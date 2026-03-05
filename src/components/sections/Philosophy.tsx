"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Brain, Recycle, TrendingUp, Search } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    id: "01",
    title: "Intelligence First",
    desc: "AI is the foundation of Recyvra, not an add-on. We build cognitive layers into physical waste movement for absolute efficiency.",
    icon: <Brain className="w-8 h-8" />,
    accentRgb: "78,204,163",
    imageId: "phil-intelligence",
    bg: "linear-gradient(135deg, #0e2a1f 0%, #061209 100%)",
  },
  {
    id: "02",
    title: "Loop Integrity",
    desc: "A linear system is a broken system. We design and enforce loop integrity across complex enterprise supply chains.",
    icon: <Recycle className="w-8 h-8" />,
    accentRgb: "45,95,79",
    imageId: "phil-loop",
    bg: "linear-gradient(135deg, #0a1f17 0%, #040c08 100%)",
  },
  {
    id: "03",
    title: "Economic Symbiosis",
    desc: "Sustainability and profit are not at odds. We create symbiotic models where environmental health drives enterprise value.",
    icon: <TrendingUp className="w-8 h-8" />,
    accentRgb: "201,169,110",
    imageId: "phil-economic",
    bg: "linear-gradient(135deg, #1a1407 0%, #0a0904 100%)",
  },
  {
    id: "04",
    title: "Radical Transparency",
    desc: "Every tonne moved is tracked with cryptographic certainty. We provide the truth needed for authentic global impact.",
    icon: <Search className="w-8 h-8" />,
    accentRgb: "78,204,163",
    imageId: "phil-transparency",
    bg: "linear-gradient(135deg, #0e2a1f 0%, #061209 100%)",
  },
];

export const Philosophy = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power4.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="py-20 md:py-32 bg-[#0b1410] relative overflow-hidden"
    >
      <div className="absolute top-[18%] left-[8%] w-130 h-130 rounded-full bg-[#4ecca3]/5 blur-[60px] pointer-events-none" />

      <div className="max-w-300 mx-auto px-[5%] relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <p className="text-[#c9a96e] text-[0.7rem] md:text-[0.75rem] font-bold tracking-[0.24em] uppercase mb-4">
            OUR PHILOSOPHY
          </p>
          <h2
            className="font-headline text-[#f5f0e8] font-light leading-[1.1]"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
          >
            Built for Global{" "}
            <span className="text-[#c9a96e] italic">Mastery</span>
          </h2>
          <p className="text-white/40 mt-6 max-w-xl mx-auto font-body text-sm md:text-base px-4">
            We operate at the intersection of enterprise intelligence and
            environmental stewardship.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {PILLARS.map((p, i) => {
            const imageData = PlaceHolderImages.find(
              (img) => img.id === p.imageId,
            );
            return (
              <div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="group relative rounded-4xl md:rounded-[24px] overflow-hidden cursor-pointer"
                style={{
                  height: "clamp(300px, 40vh, 480px)",
                  border: "1.5px solid rgba(255,255,255,0.12)",
                }}
              >
                <div className="phil-image absolute inset-0">
                  {imageData ? (
                    <Image
                      src={imageData.imageUrl}
                      alt={imageData.description}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                      data-ai-hint={imageData.imageHint}
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{ background: p.bg }}
                    />
                  )}
                </div>

                <div className="absolute inset-0 z-2 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                <div className="relative h-full flex flex-col p-6 md:p-10 justify-between z-10">
                  <div className="flex justify-between items-start">
                    <div
                      className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-[#f5f0e8] bg-black/50 backdrop-blur-md border border-white/10 shadow-xl"
                      style={{
                        boxShadow: `0 0 20px rgba(${p.accentRgb},0.15)`,
                      }}
                    >
                      {p.icon}
                    </div>
                    <span
                      className="font-headline font-bold select-none pointer-events-none text-5xl md:text-7xl opacity-10"
                      style={{ color: `rgb(${p.accentRgb})` }}
                    >
                      {p.id}
                    </span>
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <h3 className="font-headline text-[#f5f0e8] font-semibold leading-tight text-xl md:text-3xl">
                      {p.title}
                    </h3>
                    <div className="overflow-hidden transition-all duration-500 max-h-25 sm:max-h-0 sm:opacity-0 group-hover:max-h-50 group-hover:opacity-100">
                      <p className="font-body text-white/70 leading-relaxed text-[0.8rem] md:text-[0.96rem]">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute bottom-0 left-0 h-2px w-0 group-hover:w-full transition-all duration-700 ease-out z-20"
                  style={{
                    background: `rgb(${p.accentRgb})`,
                    boxShadow: `0 0 10px rgb(${p.accentRgb})`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
