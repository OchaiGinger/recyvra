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
      if (gridPanels) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            end: "top 20%",
            scrub: 1.2,
          },
        });

        // Ensure panels are hidden and off-screen before animation starts
        gsap.set(gridPanels, { opacity: 0, visibility: "hidden" });

        const colCount = 5;
        const getIndex = (row: number, col: number) => row * colCount + col;

        const animateRow = (row: number, startTime: number) => {
          for (let col = colCount - 1; col >= 0; col--) {
            const idx = getIndex(row, col);
            const panel = gridPanels[idx];
            const delay = startTime + (colCount - 1 - col) * 0.05;

            tl.to(
              panel,
              {
                opacity: 1,
                visibility: "visible",
                y: 0,
                duration: 0.3,
                ease: "power2.inOut",
              },
              delay,
            );

            tl.to(
              panel,
              {
                y: "100vh",
                duration: 0.3,
                ease: "power2.inOut",
              },
              delay + 0.25,
            );

            tl.to(
              panel,
              {
                opacity: 0,
                visibility: "hidden",
                duration: 0.01,
              },
              delay + 0.55,
            );
          }
        };

        animateRow(2, 0); // Bottom row
        animateRow(1, 0.15); // Middle row
        animateRow(0, 0.3); // Top row
      }
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-[#0b1410] pt-16 md:pt-24 pb-12 border-t border-white/5 relative overflow-hidden"
    >
      {/* Cinematic Reveal Grid */}
      <div
        ref={gridOverlayRef}
        className="fixed inset-0 z-100 grid grid-cols-5 grid-rows-3 pointer-events-none overflow-hidden"
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="grid-panel bg-white border border-white/5 will-change-transform opacity-0 invisible"
            style={{ transform: "translateY(-100vh)" }}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-75 bg-linear-to-t from-[#2d5f4f]/5 to-transparent pointer-events-none" />

      <div className="max-w-300 mx-auto px-[5%] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 mb-16 md:mb-24 text-center md:text-left">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-6 md:space-y-8 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 md:w-11 md:h-11">
                <Image
                  src="/logo.png"
                  alt="RECYVRA Logo"
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

          {/* Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 md:col-span-3">
            <div className="space-y-4 md:space-y-6">
              <h4 className="text-[0.6rem] md:text-[0.65rem] font-bold text-[#f5f0e8] tracking-[0.25em] uppercase opacity-40">
                Product
              </h4>
              <ul className="space-y-3 md:space-y-4 text-xs md:text-sm font-body">
                {["Features", "Pricing", "Technology", "Case Studies"].map(
                  (l) => (
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
                  ),
                )}
              </ul>
            </div>
            <div className="space-y-4 md:space-y-6">
              <h4 className="text-[0.6rem] md:text-[0.65rem] font-bold text-[#f5f0e8] tracking-[0.25em] uppercase opacity-40">
                Company
              </h4>
              <ul className="space-y-3 md:space-y-4 text-xs md:text-sm font-body">
                {["About", "Careers", "Blog", "Contact"].map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="text-[#f5f0e8]/40 hover:text-[#f5f0e8] transition-colors"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4 md:space-y-6 hidden sm:block">
              <h4 className="text-[0.6rem] md:text-[0.65rem] font-bold text-[#f5f0e8] tracking-[0.25em] uppercase opacity-40">
                Resources
              </h4>
              <ul className="space-y-3 md:space-y-4 text-xs md:text-sm font-body">
                {["Docs", "Help Center", "Community", "API"].map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="text-[#f5f0e8]/40 hover:text-[#f5f0e8] transition-colors"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center">
          <p className="text-[0.55rem] md:text-[0.65rem] text-[#f5f0e8]/20 tracking-[0.15em] uppercase font-bold">
            © 2026 RECYVRA TECHNOLOGIES INC. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[0.55rem] md:text-[0.65rem] text-[#f5f0e8]/20 tracking-[0.15em] uppercase font-bold">
            <Link href="#" className="hover:text-[#f5f0e8] transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-[#f5f0e8] transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-[#f5f0e8] transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
