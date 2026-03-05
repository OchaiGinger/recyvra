"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export const PageLoader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 1. Progress count animation
    const countInterval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(countInterval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 1;
        return Math.min(prev + step, 100);
      });
    }, 50);

    return () => clearInterval(countInterval);
  }, []);

  useEffect(() => {
    if (count === 100) {
      const tl = gsap.timeline({
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = "none";
          }
          // Enable scrolling once loader is gone
          document.body.style.overflow = "auto";
        },
      });

      tl.to(
        [
          logoRef.current,
          textRef.current,
          progressLineRef.current?.parentElement,
        ],
        {
          opacity: 0,
          y: -20,
          duration: 0.8,
          ease: "power4.inOut",
          stagger: 0.1,
        },
      );

      tl.to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 1.2,
          ease: "expo.inOut",
        },
        "-=0.4",
      );
    }
  }, [count]);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    // Initial entrance for elements
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8, filter: "blur(10px)" },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
      },
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 bg-[#060a08] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#2d5f4f]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container */}
        <div ref={logoRef} className="relative w-20 h-20 md:w-24 md:h-24 mb-12">
          <Image
            src="/logo.png"
            alt="RECYVRA Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Brand Text */}
        <div ref={textRef} className="text-center mb-8">
          <h1 className="font-headline text-[#f5f0e8] text-2xl md:text-3xl font-bold tracking-[0.3em] uppercase mb-2">
            RECYVRA
          </h1>
          <p className="font-body text-[#c9a96e] text-[0.65rem] font-bold tracking-[0.25em] uppercase opacity-60">
            Initializing Intelligence
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-50 h-0.5 bg-white/5 rounded-full overflow-hidden relative">
          <div
            ref={progressLineRef}
            className="absolute top-0 left-0 h-full bg-[#c9a96e] transition-all duration-300 ease-out shadow-[0_0_10px_#c9a96e]"
            style={{ width: `${count}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="mt-4 font-body text-[#f5f0e8]/20 text-[0.7rem] font-bold tracking-[0.2em] tabular-nums">
          {String(count).padStart(3, "0")}%
        </div>
      </div>

      {/* Grid Overlay for Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
};
