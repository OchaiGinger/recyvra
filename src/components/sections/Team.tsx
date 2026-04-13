"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  {
    name: "Adai John",
    role: "Chief Executive Officer",
    specialty: "Vision and Strategy",
    image: "/johnadai.jpeg",
  },
  {
    name: "Morgan Uche",
    role: "Head of Operation",
    specialty: "Logistics and Circulation Veteran",
    image: "/morganuche.jpeg",
  },
  {
    name: "Obande Comfort",
    role: "CTO",
    specialty: "AI/ML Specialist",
    image: "/obandecomfort.jpeg",
  },
  {
    name: "Uchenna Okafor",
    role: "Business Dev & Partnership Manager",
    specialty: "Strategic Growth",
    image: "/uchennaokafor.jpg",
  },
];

export const Team = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".team-member",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="team" className="py-24 md:py-32 bg-[#060a08] relative">
      <div className="max-w-7xl mx-auto px-[5%]">
        <div className="mb-16 md:mb-24">
          <p className="text-[#4ecca3] text-[0.7rem] font-bold tracking-[0.3em] uppercase mb-4">
            OUR LEADERSHIP
          </p>
          <h2 className="font-headline text-[#f5f0e8] text-[2.5rem] md:text-[5rem] leading-tight">
            The Minds Behind{" "}
            <span className="text-[#c9a96e] italic">Recyvra</span>
          </h2>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
        >
          {TEAM.map((member, i) => (
            <div key={i} className="team-member group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6 bg-white/5 border border-white/10">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060a08] via-transparent to-transparent opacity-60" />
              </div>

              <h3 className="text-[#f5f0e8] font-headline text-2xl mb-1">
                {member.name}
              </h3>
              <p className="text-[#c9a96e] text-[0.65rem] font-bold tracking-widest uppercase mb-3">
                {member.role}
              </p>
              <div className="w-8 h-[1px] bg-[#4ecca3]/30 mb-3 group-hover:w-16 transition-all duration-500" />
              <p className="text-white/40 text-sm font-body leading-relaxed">
                {member.specialty}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
