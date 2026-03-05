"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "Waste Intelligence & Classification",
    tag: "01 — AI INTELLIGENCE",
    icon: "🧠",
    accent: "text-[#4ecca3]",
    glow: "bg-[#4ecca3]",
    desc: "Advanced machine learning for automatic material detection and value forecasting.",
    bullets: [
      "ML Material Classification",
      "Predictive Supply Forecasting",
      "Real-time Price Optimization",
      "Contamination Detection",
    ],
  },
  {
    title: "Autonomous Routing & Recovery",
    tag: "02 — LOGISTICS",
    icon: "🚚",
    accent: "text-[#c9a96e]",
    glow: "bg-[#c9a96e]",
    desc: "Optimized logistics networks that eliminate empty miles and maximize recovery rates.",
    bullets: [
      "Dynamic Route Optimization",
      "Verified Processor Network",
      "Live Capacity Monitoring",
      "Automated Manifesting",
    ],
  },
  {
    title: "ESG Analytics & Carbon Accounting",
    tag: "03 — COMPLIANCE",
    icon: "📉",
    accent: "text-[#2d5f4f]",
    glow: "bg-[#2d5f4f]",
    desc: "Turn your waste diversion stats into audit-ready ESG reports and carbon credits.",
    bullets: [
      "Live Impact Dashboards",
      "Verified Carbon Offset",
      "ESG Data Export Engine",
      "Credit Marketplace Access",
    ],
  },
];

export const Services = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 82%",
          },
        },
      );
    }
  }, []);

  return (
    <section id="services" className="py-32 bg-[#060a08]">
      <div className="max-w-300 mx-auto px-[5%]">
        <div className="text-center mb-20">
          <p className="text-[#c9a96e] text-[0.75rem] font-bold tracking-[0.2em] mb-4">
            WHAT WE DO
          </p>
          <h2 className="font-headline text-[3rem] md:text-[3.5rem] text-[#f5f0e8]">
            We Recover with Mastery
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((item, i) => (
            <div
              key={i}
              className="group relative bg-[#111e18] border border-white/10 rounded-2xl p-8 transition-all duration-350 hover:-translate-y-2 hover:border-white/20"
            >
              <div
                className={cn(
                  "absolute top-0 left-0 w-full h-2 rounded-t-2xl opacity-50",
                  item.glow,
                )}
              />

              <div className="w-14 h-14 bg-[#2d5f4f]/10 rounded-xl flex items-center justify-center text-3xl mb-8">
                {item.icon}
              </div>

              <span
                className={cn(
                  "text-[0.65rem] font-bold tracking-[0.15em] mb-4 block",
                  item.accent,
                )}
              >
                {item.tag}
              </span>

              <h3 className="font-headline text-[1.55rem] text-[#f5f0e8] mb-4 leading-tight">
                {item.title}
              </h3>
              <p className="font-body text-[0.88rem] text-[#f5f0e8]/60 mb-8 leading-[1.75]">
                {item.desc}
              </p>

              <ul className="space-y-3">
                {item.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-3 text-[0.8rem] text-[#f5f0e8]/80"
                  >
                    <div
                      className={cn("w-1.5 h-1.5 rounded-full", item.glow)}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
