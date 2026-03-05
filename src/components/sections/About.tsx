"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Banknote, Compass, BarChart3, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROBLEMS = [
  {
    icon: <Banknote className="w-6 h-6" />,
    title: "Escalating Disposal Costs",
    body: "Businesses pay $150–300 per ton to landfill materials that could generate revenue instead. With tightening regulations, these costs are rising 40% year-over-year.",
    bullets: [
      "Landfill gate fees up 40% YoY",
      "Hidden transport & compliance costs",
      "Missed revenue from recyclable streams",
      "Rising carbon penalty exposure",
    ],
    accent: "#2d5f4f",
    accentRgb: "45,95,79",
    bgStat: "$300",
    bgLabel: "/ ton",
    videoPath: "/videos/video_1.mp4",
  },
  {
    icon: <Compass className="w-6 h-6" />,
    title: "Fragmented Ecosystem",
    body: "Finding the optimal processor for specific materials requires manual research, phone calls, and coordination across multiple vendors. Most businesses lack this visibility entirely.",
    bullets: [
      "No single source of processor truth",
      "Manual RFQ and phone-tag workflows",
      "Inconsistent material acceptance rules",
      "Zero real-time capacity visibility",
    ],
    accent: "#4ecca3",
    accentRgb: "78,204,163",
    bgStat: "15+",
    bgLabel: "hrs/mo",
    videoPath: "/videos/video_3.mp4",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "No Data, No Optimization",
    body: "Without tracking systems, companies can't measure diversion rates, prove ESG compliance, or identify optimization opportunities. Sustainability remains aspirational.",
    bullets: [
      "No diversion rate measurement",
      "Cannot prove ESG / Scope 3 claims",
      "Blind spots in cost optimization",
      "Audit risk from missing chain-of-custody",
    ],
    accent: "#c9a96e",
    accentRgb: "201,169,110",
    bgStat: "78%",
    bgLabel: "untracked",
    videoPath: "/videos/video_2.mp4",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Massive Environmental Impact",
    body: "2.01 billion tons of recoverable materials end up in landfills annually, generating greenhouse gases and wasting resources that could fuel circular economies.",
    bullets: [
      "2.01B tons recoverable material wasted",
      "Landfills = 5% of global GHG emissions",
      "Circular economy opportunity: $4.5T",
      "Regulatory mandates accelerating fast",
    ],
    accent: "#4ecca3",
    accentRgb: "78,204,163",
    bgStat: "2.01B",
    bgLabel: "tons/yr",
    videoPath: "/videos/video_4.mp4",
  },
];

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const CARD_VW = isMobile ? 92 : 68;
      const GAP_PX = isMobile ? 16 : 32;
      const totalPanels = PROBLEMS.length + 1;

      // Transition Grid Animation
      const gridPanels =
        gridOverlayRef.current?.querySelectorAll(".grid-panel");
      if (gridPanels) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            end: "top 10%",
            scrub: 1.2,
          },
        });

        // Ensure panels are strictly hidden and off-screen before animation
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

      // Horizontal Scroll Distance
      const scrollDistance =
        (totalPanels - 1) * (window.innerWidth * (CARD_VW / 100) + GAP_PX);

      // Horizontal Scroll
      const hTween = gsap.to(trackRef.current, {
        x: () => -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      panelRefs.current.forEach((panel) => {
        if (!panel) return;
        const videoContainer = panel.querySelector(".pi");
        const header = panel.querySelector(".ph");
        const body = panel.querySelector(".pb");
        const bullets = panel.querySelectorAll(".pl");
        const all = [
          videoContainer,
          header,
          body,
          ...Array.from(bullets),
        ].filter(Boolean);

        gsap.set(all, { opacity: 0, x: isMobile ? 15 : 36 });

        ScrollTrigger.create({
          trigger: panel,
          containerAnimation: hTween,
          start: "left 92%",
          onEnter: () => {
            gsap.to(videoContainer, {
              opacity: 1,
              x: 0,
              duration: 0.75,
              ease: "power3.out",
            });
            gsap.to(header, {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power3.out",
              delay: 0.12,
            });
            gsap.to(body, {
              opacity: 1,
              x: 0,
              duration: 0.55,
              ease: "power3.out",
              delay: 0.22,
            });
            gsap.to(Array.from(bullets), {
              opacity: 1,
              x: 0,
              duration: 0.45,
              ease: "power3.out",
              stagger: 0.08,
              delay: 0.32,
            });
          },
          onLeaveBack: () =>
            gsap.set(all, { opacity: 0, x: isMobile ? 15 : 36 }),
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-[#0b1410] relative overflow-hidden"
    >
      {/* Reveal Grid */}
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

      <div
        ref={trackRef}
        className="flex items-center will-change-transform h-screen"
        style={{
          gap: "clamp(1rem, 3vw, 2rem)",
          paddingLeft: "max(1.5rem, 5vw)",
          paddingRight: "max(1.5rem, 5vw)",
        }}
      >
        {/* Panel 0: Headline card */}
        <div
          className="shrink-0 h-[calc(100vh-8rem)] md:h-[calc(100vh-10rem)] rounded-3xl md:rounded-4xl flex flex-col items-start justify-center relative overflow-hidden"
          style={{
            width: "clamp(300px, 92vw, 68vw)",
            background: "linear-gradient(145deg, #0f1e18 0%, #080d0b 100%)",
            border: "1.5px solid rgba(255,255,255,0.18)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.10), 0 24px 80px rgba(0,0,0,0.65)",
            padding: "clamp(2rem, 6vw, 6rem)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_55%_50%_at_25%_55%,rgba(45,95,79,0.18)_0%,transparent_70%)]" />
          <div className="relative z-10">
            <p className="font-body text-[#c9a96e] text-[0.7rem] font-bold tracking-[0.24em] uppercase mb-5">
              THE PROBLEM
            </p>
            <h2
              className="font-headline text-[#f5f0e8] font-light leading-[1.1] max-w-170"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.8rem)" }}
            >
              Every business is drowning
              <br className="hidden md:block" /> in waste costs —
              <br />
              <em className="text-[#c9a96e] not-italic">
                and most don't even know it.
              </em>
            </h2>
            <p className="font-body text-white/25 mt-10 text-[0.7rem] tracking-[0.20em] uppercase">
              Scroll to explore →
            </p>
          </div>
        </div>

        {/* Panels 1–4: Problem cards */}
        {PROBLEMS.map((p, i) => {
          return (
            <div
              key={i}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className="shrink-0 h-[calc(100vh-8rem)] md:h-[calc(100vh-10rem)] rounded-3xl md:rounded-4xl relative overflow-hidden flex flex-col md:flex-row items-stretch group"
              style={{
                width: "clamp(300px, 92vw, 68vw)",
                border: "1.5px solid rgba(255,255,255,0.18)",
                boxShadow: `inset 0 1.5px 0 rgba(255,255,255,0.12), 0 24px 80px rgba(0,0,0,0.65)`,
                background: `linear-gradient(160deg, #0e1b14 0%, #080d0b 100%)`,
              }}
            >
              {/* VIDEO */}
              <div
                className="pi relative md:w-1/2 shrink-0 overflow-hidden h-[30%] md:h-full"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                    typeof window !== "undefined" && window.innerWidth < 768
                      ? "opacity-60"
                      : "opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80"
                  }`}
                >
                  <source src={p.videoPath} type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none z-10">
                  <span
                    className="font-headline font-bold leading-none tracking-tighter"
                    style={{
                      fontSize: "clamp(2.5rem, 7vw, 7rem)",
                      color: p.accent,
                      opacity: 0.28,
                    }}
                  >
                    {p.bgStat}
                  </span>
                  <span
                    className="font-body uppercase tracking-[0.20em] mt-2 text-[0.65rem] md:text-[0.75rem]"
                    style={{ color: p.accent, opacity: 0.35 }}
                  >
                    {p.bgLabel}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div
                className="flex flex-col justify-center min-w-0 relative flex-1"
                style={{
                  padding: "clamp(1.5rem, 5vw, 4rem)",
                  background: "rgba(11, 20, 16, 0.35)",
                  backdropFilter: "blur(14px)",
                }}
              >
                <div className="ph flex items-center gap-4 mb-4">
                  <div className="shrink-0w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center text-[#f5f0e8] bg-white/10 border border-white/10">
                    {p.icon}
                  </div>
                  <h3
                    className="font-headline text-[#f5f0e8] font-semibold leading-tight"
                    style={{ fontSize: "clamp(1.2rem, 2vw, 2.2rem)" }}
                  >
                    {p.title}
                  </h3>
                </div>
                <div
                  className="w-10 h-0.5 mb-6"
                  style={{ background: p.accent, opacity: 0.6 }}
                />
                <p className="pb font-body text-white/70 leading-relaxed mb-8 text-[0.8rem] md:text-[0.95rem] max-w-110">
                  {p.body}
                </p>
                <div className="flex flex-col gap-3 md:gap-4">
                  {p.bullets.map((b, j) => (
                    <div
                      key={j}
                      className="pl flex items-start gap-4 font-body text-white/60 text-[0.75rem] md:text-[0.9rem]"
                    >
                      <span
                        className="shrink-0rounded-full w-1.5 h-1.5 bg-current mt-1.5 opacity-80"
                        style={{ color: p.accent }}
                      />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default About;
