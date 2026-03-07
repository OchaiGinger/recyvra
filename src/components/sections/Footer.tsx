"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Twitter,
  Linkedin,
  Github,
  Instagram,
  ArrowUpRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const gridOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const gridPanels =
        gridOverlayRef.current?.querySelectorAll(".grid-panel");
      if (!gridPanels) return;

      gsap.set(gridPanels, { opacity: 0, visibility: "hidden", y: "-100vh" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          // Start earlier and give much more scroll room on mobile
          start: "top 98%",
          end: () => `+=${Math.max(window.innerHeight * 1.8, 600)}`,
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      const colCount = 5;

      const animateRow = (row: number, startTime: number) => {
        for (let col = colCount - 1; col >= 0; col--) {
          const idx = row * colCount + col;
          const panel = gridPanels[idx];
          const delay = startTime + (colCount - 1 - col) * 0.04;

          // Slide in from top
          tl.to(
            panel,
            {
              opacity: 1,
              visibility: "visible",
              y: 0,
              duration: 0.25,
              ease: "power2.inOut",
            },
            delay,
          );

          // Slide out to bottom — ensure this always completes
          tl.to(
            panel,
            {
              y: "110vh",
              duration: 0.25,
              ease: "power2.inOut",
            },
            delay + 0.28,
          );

          tl.to(
            panel,
            {
              opacity: 0,
              visibility: "hidden",
              duration: 0.01,
            },
            delay + 0.53,
          );
        }
      };

      animateRow(2, 0);
      animateRow(1, 0.12);
      animateRow(0, 0.24);

      // Pad the end so the last panel always finishes before scrub ends
      tl.to({}, { duration: 0.5 });

      ScrollTrigger.refresh();
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-[#0b1410] pt-16 md:pt-24 pb-12 border-t border-white/5 relative overflow-hidden"
    >
      {/* Grid overlay */}
      <div
        ref={gridOverlayRef}
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 100 }}
      >
        <div className="w-full h-full grid grid-cols-5 grid-rows-3">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="grid-panel bg-white border border-white/5 will-change-transform opacity-0 invisible"
            />
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full pointer-events-none"
        style={{
          height: "18rem",
          background:
            "linear-gradient(to top, rgba(45,95,79,0.05), transparent)",
        }}
      />

      <div className="max-w-300 mx-auto px-[5%] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 mb-16 md:mb-24 text-center md:text-left">
          {/* Brand */}
          <div className="md:col-span-2 space-y-6 md:space-y-8 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 md:w-11 md:h-11">
                <Image
                  src="/logo.png"
                  alt="Recyvra"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-headline text-2xl md:text-3xl font-bold tracking-[0.05em] text-[#f5f0e8] uppercase">
                RECYVRA
              </span>
            </div>
            <p className="text-[#f5f0e8]/40 text-xs md:text-sm leading-relaxed max-w-sm font-body">
              The intelligence layer for circular waste management. We transform
              physical waste streams into high-performance growth engines.
            </p>
            <div className="flex gap-4">
              {[Linkedin, Twitter, Instagram, Github].map((Icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[#f5f0e8]/30 hover:bg-[#2d5f4f]/20 hover:text-[#f5f0e8] transition-all cursor-pointer"
                >
                  <Icon size={16} />
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 md:col-span-3">
            {[
              {
                label: "Product",
                links: ["Features", "Pricing", "Technology", "Case Studies"],
              },
              {
                label: "Company",
                links: ["About", "Careers", "Blog", "Contact"],
              },
              {
                label: "Resources",
                links: ["Docs", "Help Center", "Community", "API"],
              },
            ].map((col, ci) => (
              <div
                key={ci}
                className={`space-y-4 md:space-y-6 ${ci === 2 ? "hidden sm:block" : ""}`}
              >
                <h4 className="text-[0.6rem] md:text-[0.65rem] font-bold text-[#f5f0e8] tracking-[0.25em] uppercase opacity-40">
                  {col.label}
                </h4>
                <ul className="space-y-3 md:space-y-4 text-xs md:text-sm font-body">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link
                        href="#"
                        className="text-[#f5f0e8]/40 hover:text-[#f5f0e8] transition-colors inline-flex items-center group"
                      >
                        {l}
                        <ArrowUpRight
                          size={10}
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-all"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center">
          <p className="text-[0.55rem] md:text-[0.65rem] text-[#f5f0e8]/20 tracking-[0.15em] uppercase font-bold">
            © 2026 RECYVRA TECHNOLOGIES INC. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[0.55rem] md:text-[0.65rem] text-[#f5f0e8]/20 tracking-[0.15em] uppercase font-bold">
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <Link
                key={l}
                href="#"
                className="hover:text-[#f5f0e8] transition-colors"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
