"use client";

import React, { useEffect, useRef, useState } from "react";
import { Map, Brain, Rocket, BarChart3 } from "lucide-react";

const STEPS = [
  {
    num: "01",
    badge: "ONBOARD",
    icon: <Map className="w-8 h-8" />,
    headline: "Sign Up & Map",
    body: "Create your account, add locations and waste types. Recyvra maps your entire waste workflow autonomously within minutes.",
    accent: "78,204,163",
    accentHex: "#4ecca3",
  },
  {
    num: "02",
    badge: "ANALYSE",
    icon: <Brain className="w-8 h-8" />,
    headline: "AI Analysis",
    body: "ML models analyse your waste streams, identify hidden revenue opportunities, and match you with ideal certified processors.",
    accent: "201,169,110",
    accentHex: "#c9a96e",
  },
  {
    num: "03",
    badge: "ROUTE",
    icon: <Rocket className="w-8 h-8" />,
    headline: "Auto-Routing",
    body: "Scheduling, route optimisation, and processor communications handled in real-time — zero manual coordination required.",
    accent: "78,204,163",
    accentHex: "#4ecca3",
  },
  {
    num: "04",
    badge: "SCALE",
    icon: <BarChart3 className="w-8 h-8" />,
    headline: "Track & Scale",
    body: "Live dashboard with savings and carbon tracking. Every optimisation compounds monthly, growing your circular ROI.",
    accent: "201,169,110",
    accentHex: "#c9a96e",
  },
];

const STEP_SCROLL_VH = 180;
const TOTAL_VH = STEP_SCROLL_VH * STEPS.length + 80;

export const HowItWorks = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef(0);
  const smoothedRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  const handleVideoPlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setVideoReady(true);
  };

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      const total = el.offsetHeight - window.innerHeight;
      progressRef.current = Math.min(Math.max(-top / total, 0), 1);

      const scrolledVh = (-top / window.innerHeight) * 100;
      const introVh = 80;
      if (scrolledVh < introVh) {
        setActiveStep(-1);
      } else {
        const idx = Math.min(
          Math.floor((scrolledVh - introVh) / STEP_SCROLL_VH),
          STEPS.length - 1,
        );
        setActiveStep(idx);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!videoReady) return;
    const v = videoRef.current;
    if (!v) return;
    type SV = HTMLVideoElement & { fastSeek?: (t: number) => void };
    const vid = v as SV;

    const tick = () => {
      const dur = vid.duration;
      if (dur && !isNaN(dur)) {
        const target = progressRef.current * dur;
        const dist = Math.abs(target - smoothedRef.current);
        const lerp = dist > 0.8 ? 0.5 : dist > 0.2 ? 0.3 : 0.12;
        smoothedRef.current += (target - smoothedRef.current) * lerp;

        const wrapper = wrapperRef.current;
        const visible = wrapper
          ? wrapper.getBoundingClientRect().bottom > 0 &&
            wrapper.getBoundingClientRect().top < window.innerHeight
          : true;

        if (
          visible &&
          Math.abs(vid.currentTime - smoothedRef.current) > 0.016
        ) {
          if (typeof vid.fastSeek === "function")
            vid.fastSeek(smoothedRef.current);
          else if (!vid.seeking) vid.currentTime = smoothedRef.current;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [videoReady]);

  return (
    <>
      <style>{`
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(7px); }
        }
        .scroll-bounce { animation: bounceDown 2s ease-in-out infinite; }

        .hiw-step {
          transition: opacity 1.4s cubic-bezier(0.4,0,0.2,1),
                      transform 1.4s cubic-bezier(0.4,0,0.2,1);
        }
        .hiw-pip {
          transition: width 0.5s ease, background 0.5s ease, box-shadow 0.5s ease;
        }
      `}</style>

      {/* ── Tall scroll wrapper ── */}
      <div
        ref={wrapperRef}
        className="relative w-full"
        style={{ height: `${TOTAL_VH}vh` }}
      >
        {/* ── Sticky viewport ── */}
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#060c09]">
          {/* Video */}
          <video
            ref={videoRef}
            src="/videos/how_it_works.mp4"
            className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000"
            style={{ opacity: videoReady ? 0.28 : 0 }}
            muted
            playsInline
            preload="auto"
            autoPlay
            loop
            onPlay={handleVideoPlay}
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 z-1 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(6,12,9,0.88) 0%, rgba(6,12,9,0.42) 35%, rgba(6,12,9,0.42) 65%, rgba(6,12,9,0.92) 100%)",
            }}
          />

          {/* Noise */}
          <div
            className="absolute inset-0 z-2 pointer-events-none opacity-[0.025] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Ambient glow — drifts left/right with step */}
          <div
            className="absolute z-1 pointer-events-none rounded-full"
            style={{
              top: "25%",
              left: activeStep % 2 === 0 ? "8%" : "55%",
              width: 640,
              height: 640,
              background:
                "radial-gradient(circle, rgba(78,204,163,0.07) 0%, transparent 70%)",
              filter: "blur(90px)",
              transition: "left 1.8s cubic-bezier(0.4,0,0.2,1)",
            }}
          />

          {/* Section label — top left */}
          <div
            className="absolute top-8 z-20"
            style={{ left: "max(6vw, 2rem)" }}
          >
            <p
              className="text-[#4ecca3]/60 text-[0.62rem] font-bold tracking-[0.28em] uppercase m-0"
              style={{ fontFamily: "var(--font-body,'DM Sans',sans-serif)" }}
            >
              HOW IT WORKS
            </p>
          </div>

          {/* ── INTRO SCREEN ── */}
          <div
            className="absolute inset-0 z-10 flex items-center hiw-step"
            style={{
              padding: "0 max(6vw, 2rem)",
              opacity: activeStep === -1 ? 1 : 0,
              transform:
                activeStep === -1 ? "translateY(0px)" : "translateY(-40px)",
              pointerEvents: activeStep === -1 ? "auto" : "none",
            }}
          >
            <div>
              <p
                className="text-[0.68rem] font-bold tracking-[0.22em] uppercase mb-5"
                style={{ fontFamily: "var(--font-body)", color: "#4ecca3" }}
              >
                INTELLIGENCE TO OPERATIONS
              </p>

              <h2
                className="text-[#e8e0d0] m-0 mb-5 leading-[1.06]"
                style={{
                  fontFamily:
                    "var(--font-display,'Cormorant Garamond',Georgia,serif)",
                  fontWeight: 300,
                  fontSize: "clamp(2.8rem,7vw,6rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                Four steps to a<br />
                <span
                  style={{
                    color: "#4ecca3",
                    fontStyle: "italic",
                    textShadow: "0 0 50px rgba(78,204,163,0.5)",
                  }}
                >
                  circular operation
                </span>
              </h2>

              <p
                className="text-[#e8e0d0]/40 leading-[1.75] m-0 mb-10"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(0.85rem,1.2vw,1rem)",
                  maxWidth: 460,
                }}
              >
                From onboarding to autonomous optimisation — scroll to walk
                through the journey.
              </p>

              {/* Scroll hint */}
              <div className="scroll-bounce flex items-center gap-3">
                <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
                  <rect
                    x="1"
                    y="1"
                    width="14"
                    height="22"
                    rx="7"
                    stroke="rgba(255,255,255,0.22)"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="6.5"
                    y="4"
                    width="3"
                    height="6"
                    rx="1.5"
                    fill="rgba(78,204,163,0.65)"
                  />
                </svg>
                <span
                  className="text-white/25 text-[0.65rem] tracking-[0.16em] uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Scroll to explore
                </span>
              </div>
            </div>
          </div>

          {/* ── STEP SLIDES ── */}
          <div className="absolute inset-0 z-10">
            {STEPS.map((step, i) => {
              const isActive = activeStep === i;
              const isPast = activeStep > i;
              return (
                <div
                  key={i}
                  className="hiw-step absolute inset-0 flex items-center"
                  style={{
                    padding: "0 max(6vw, 2rem)",
                    opacity: isActive ? 1 : 0,
                    transform: isActive
                      ? "translateY(0px)"
                      : isPast
                        ? "translateY(-40px)"
                        : "translateY(40px)",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  {/* Content */}
                  <div style={{ maxWidth: 580 }}>
                    {/* Badge */}
                    <div className="flex items-stretch h-8.5 mb-6 rounded-[7px] overflow-hidden">
                      <div
                        className="flex items-center justify-center px-4 text-[0.76rem] font-extrabold tracking-[0.08em]"
                        style={{
                          fontFamily: "var(--font-body)",
                          background: `rgba(${step.accent},0.14)`,
                          border: `1px solid rgba(${step.accent},0.32)`,
                          color: step.accentHex,
                          borderRadius: "6px 0 0 6px",
                          minWidth: "3rem",
                        }}
                      >
                        {step.num}
                      </div>
                      <div
                        className="flex items-center px-4 text-[0.65rem] font-bold tracking-[0.22em] uppercase text-[#e8e0d0]/55"
                        style={{
                          fontFamily: "var(--font-body)",
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.10)",
                          borderLeft: "none",
                          borderRadius: "0 6px 6px 0",
                        }}
                      >
                        {step.badge}
                      </div>
                    </div>

                    {/* Icon */}
                    <div
                      className="flex items-center justify-center mb-7 rounded-md"
                      style={{
                        width: 68,
                        height: 68,
                        background: `rgba(${step.accent},0.10)`,
                        border: `1px solid rgba(${step.accent},0.26)`,
                        color: step.accentHex,
                        boxShadow: `0 0 32px rgba(${step.accent},0.14)`,
                      }}
                    >
                      {step.icon}
                    </div>

                    {/* Headline */}
                    <h2
                      className="text-[#e8e0d0] m-0 mb-5 leading-[1.06]"
                      style={{
                        fontFamily:
                          "var(--font-display,'Cormorant Garamond',Georgia,serif)",
                        fontWeight: 300,
                        fontSize: "clamp(2.6rem,6.5vw,5.5rem)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {step.headline}
                    </h2>

                    {/* Accent divider */}
                    <div
                      className="mb-6 rounded-full"
                      style={{
                        width: 52,
                        height: 2,
                        background: `linear-gradient(to right, rgba(${step.accent},0.85), transparent)`,
                      }}
                    />

                    {/* Body */}
                    <p
                      className="text-[#e8e0d0]/52 leading-[1.82] m-0"
                      style={{
                        fontFamily: "var(--font-body,'DM Sans',sans-serif)",
                        fontSize: "clamp(0.9rem,1.4vw,1.1rem)",
                        maxWidth: 480,
                      }}
                    >
                      {step.body}
                    </p>
                  </div>

                  {/* Ghost step number — right side */}
                  <div
                    className="absolute select-none pointer-events-none leading-none"
                    style={{
                      right: "max(5vw, 1.5rem)",
                      fontFamily:
                        "var(--font-display,'Cormorant Garamond',Georgia,serif)",
                      fontWeight: 300,
                      fontSize: "clamp(8rem,18vw,16rem)",
                      color: `rgba(${step.accent},0.055)`,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {step.num}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Progress pips — bottom left ── */}
          <div
            className="absolute z-20 flex items-center gap-2"
            style={{
              left: "max(6vw, 2rem)",
              bottom: "clamp(2rem, 5vh, 3.5rem)",
              opacity: activeStep >= 0 ? 1 : 0,
              transition: "opacity 0.8s ease",
            }}
          >
            {STEPS.map((s, i) => (
              <div
                key={i}
                className="hiw-pip rounded-full"
                style={{
                  height: 3,
                  width: activeStep === i ? 48 : 20,
                  background:
                    activeStep === i
                      ? s.accentHex
                      : activeStep > i
                        ? `rgba(${s.accent},0.38)`
                        : "rgba(255,255,255,0.12)",
                  boxShadow:
                    activeStep === i
                      ? `0 0 12px rgba(${s.accent},0.65)`
                      : "none",
                }}
              />
            ))}
          </div>

          {/* Step counter — bottom right */}
          <div
            className="absolute z-20"
            style={{
              right: "max(6vw, 2rem)",
              bottom: "clamp(2rem, 5vh, 3.5rem)",
              opacity: activeStep >= 0 ? 1 : 0,
              transition: "opacity 0.8s ease",
            }}
          >
            <span
              className="text-[#e8e0d0]/22 tracking-widest"
              style={{
                fontFamily:
                  "var(--font-display,'Cormorant Garamond',Georgia,serif)",
                fontWeight: 300,
                fontSize: "clamp(0.9rem,1.5vw,1.2rem)",
              }}
            >
              <span
                className="text-[#e8e0d0]/65"
                style={{ fontSize: "1.15em" }}
              >
                {activeStep >= 0
                  ? String(activeStep + 1).padStart(2, "0")
                  : "01"}
              </span>
              {" / "}
              {String(STEPS.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
