"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Brain, Network, Zap } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

gsap.registerPlugin(ScrollTrigger);

const TECH_STACK = [
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Edge Neural Units",
    desc: "Low-latency computer vision models deployed directly at sorting facilities for instant material identification.",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Cognitive Forecasting",
    desc: "Proprietary ML algorithms that process 500+ global data points to predict commodity price fluctuations.",
  },
  {
    icon: <Network className="w-6 h-6" />,
    title: "Graph-Based Routing",
    desc: "High-performance logistics engine using graph theory to solve complex multi-stop optimization problems.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Immutable Ledger",
    desc: "Blockchain-backed chain of custody ensuring that every gram of material is 100% audit-traceable.",
  },
];

export const Technology = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        },
      );

      gsap.fromTo(
        ".tech-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  const techImage = PlaceHolderImages.find((img) => img.id === "tech-neural");

  return (
    <section
      ref={sectionRef}
      id="technology"
      className="py-32 bg-[#060a08] overflow-hidden"
    >
      <div className="max-w-300 mx-auto px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div ref={contentRef} className="order-2 lg:order-1">
            <p className="text-[#c9a96e] text-[0.75rem] font-bold tracking-[0.2em] mb-4 uppercase">
              OUR ENGINE
            </p>
            <h2 className="font-headline text-[3rem] text-[#f5f0e8] mb-8 leading-tight">
              The Stack Powering <br />{" "}
              <span className="text-[#4ecca3]">Circular Logic</span>
            </h2>
            <p className="font-body text-[#f5f0e8]/60 mb-12 text-lg leading-relaxed">
              We've built a cognitive infrastructure for the physical world. Our
              stack translates raw waste streams into digital assets with
              cryptographic certainty.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TECH_STACK.map((feature, i) => (
                <div
                  key={i}
                  className="tech-card p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-[#4ecca3]/30 transition-all group"
                >
                  <div className="text-[#4ecca3] mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h4 className="font-headline text-lg text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 relative group">
            <div className="absolute -inset-4 bg-[#4ecca3]/10 blur-[60px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity" />
            <div
              ref={imageRef}
              className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              {techImage && (
                <Image
                  src={techImage.imageUrl}
                  alt={techImage.description}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  data-ai-hint={techImage.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-[#060a08] via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
