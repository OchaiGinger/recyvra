"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Recycle, Globe, Handshake, Settings, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SUBTITLES = [
  "An integrated ecosystem uniting intelligence and circularity.",
  "AI-powered logistics that transform waste into revenue.",
  "Where circular economy meets enterprise-grade technology.",
  "From waste streams to growth engines — intelligently.",
];

const ABOUT_TEXT =
  "We at Recyvra are focused — where AI-powered intelligence meets the circular economy, uniting logistics, data, and sustainability.";

const ORBIT_CARDS = [
  {
    id: "tl",
    pos: { top: "12%", left: "7%" },
    enterFrom: { x: -100, y: -30 },
    delay: 0,
    icon: <Recycle className="w-6 h-6 md:w-7 md:h-7" />,
    iconBg: "rgba(46,219,90,0.18)",
    iconBorder: "rgba(46,219,90,0.28)",
    accent: "78,204,163",
    bold: "Circular Intelligence",
    rest: " That Powers Smarter Recovery.",
  },
  {
    id: "bl",
    pos: { top: "60%", left: "6%" },
    enterFrom: { x: -100, y: 30 },
    delay: 0.1,
    icon: <Globe className="w-6 h-6 md:w-7 md:h-7" />,
    iconBg: "rgba(46,219,90,0.15)",
    iconBorder: "rgba(46,219,90,0.22)",
    accent: "78,204,163",
    bold: "A Sustainability Mission",
    rest: " Fusing Data With Environmental Purpose.",
  },
  {
    id: "tr",
    pos: { top: "24%", left: "57%" },
    enterFrom: { x: 100, y: -30 },
    delay: 0.06,
    icon: <Handshake className="w-6 h-6 md:w-7 md:h-7" />,
    iconBg: "rgba(212,168,83,0.18)",
    iconBorder: "rgba(212,168,83,0.28)",
    accent: "201,169,110",
    bold: "A Dedicated Team",
    rest: " Driving Success And Trusted Partnerships.",
  },
  {
    id: "br",
    pos: { top: "62%", left: "59%" },
    enterFrom: { x: 100, y: 30 },
    delay: 0.14,
    icon: <Settings className="w-6 h-6 md:w-7 md:h-7" />,
    iconBg: "rgba(212,168,83,0.15)",
    iconBorder: "rgba(212,168,83,0.22)",
    accent: "201,169,110",
    bold: "Advanced AI",
    rest: " Enabling Customization And Autonomous Operations.",
  },
];

function RecyvraR() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <defs>
        <linearGradient
          id="r_main"
          x1="30"
          y1="20"
          x2="170"
          y2="180"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#5eff6e" />
          <stop offset="35%" stopColor="#2edb5a" />
          <stop offset="70%" stopColor="#12b878" />
          <stop offset="100%" stopColor="#0a9980" />
        </linearGradient>
        <linearGradient
          id="r_shadow"
          x1="100"
          y1="0"
          x2="100"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1a6644" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0a2218" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient
          id="r_gloss"
          x1="30"
          y1="20"
          x2="90"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.00" />
        </linearGradient>
        <linearGradient
          id="r_arrow"
          x1="95"
          y1="110"
          x2="155"
          y2="175"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#26d4c0" />
          <stop offset="100%" stopColor="#0a9980" />
        </linearGradient>
        <filter id="r_glow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="12"
            floodColor="#2edb5a"
            floodOpacity="0.30"
          />
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="20"
            floodColor="#000"
            floodOpacity="0.50"
          />
        </filter>
        <filter id="r_blob">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <circle
        cx="100"
        cy="100"
        r="72"
        fill="#1ecc70"
        opacity="0.10"
        filter="url(#r_blob)"
      />
      <g filter="url(#r_glow)">
        <circle
          cx="100"
          cy="100"
          r="72"
          stroke="url(#r_main)"
          strokeWidth="22"
          fill="none"
        />
        <path
          d="M 48 55 A 60 60 0 0 1 152 55"
          stroke="url(#r_gloss)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
        <rect x="68" y="55" width="18" height="82" rx="4" fill="url(#r_main)" />
        <path
          d="M 86 55 Q 130 55 130 82 Q 130 107 86 107 Z"
          fill="url(#r_shadow)"
        />
        <path
          d="M 86 55 Q 130 55 130 82 Q 130 107 86 107"
          stroke="url(#r_main)"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 86 68 Q 116 68 116 82 Q 116 96 86 96"
          stroke="#0d1c14"
          strokeWidth="6"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M 86 107 L 138 165"
          stroke="url(#r_arrow)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d="M 130 158 L 142 168 L 148 152"
          stroke="#26d4c0"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLButtonElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const introHeadlineChars = useRef<(HTMLSpanElement | null)[]>([]);
  const mobileStripRef = useRef<HTMLDivElement>(null);

  const [subtitleIdx, setSubtitleIdx] = useState(0);
  const [mobileCardsVisible, setMobileCardsVisible] = useState(false);

  const cycleSubtitle = useCallback(() => {
    const el = subtitleRef.current;
    if (!el) return;
    gsap.to(el, {
      opacity: 0,
      y: -14,
      duration: 0.45,
      onComplete: () => {
        setSubtitleIdx((prev) => (prev + 1) % SUBTITLES.length);
        gsap.fromTo(
          el,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55 },
        );
      },
    });
  }, []);

  useEffect(() => {
    const id = setInterval(cycleSubtitle, 3400);
    return () => clearInterval(id);
  }, [cycleSubtitle]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Intro entrance ──
      const introTl = gsap.timeline();
      const headlineChars = introHeadlineChars.current.filter(Boolean);
      introTl.fromTo(
        headlineChars,
        { opacity: 0, y: 40, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.02,
          ease: "power4.out",
        },
      );
      introTl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6",
      );
      introTl.fromTo(
        ctaBtnRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.4",
      );

      // ── Scroll timeline ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=520%",
          scrub: 1.4,
          pin: pinRef.current,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Show mobile cards strip after typewriter phase
            if (self.progress > 0.6) {
              setMobileCardsVisible(true);
            } else {
              setMobileCardsVisible(false);
            }
          },
        },
      });

      tl.to(
        [headlineRef.current, subtitleRef.current],
        { opacity: 0, y: -55, duration: 0.15 },
        0,
      );
      tl.to(ctaBtnRef.current, { opacity: 0, scale: 0.9, duration: 0.12 }, 0);
      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 0.2, scale: 1, duration: 0.2, ease: "power2.out" },
        0.05,
      );

      const chars = charRefs.current.filter(Boolean);
      if (chars.length) {
        tl.fromTo(
          aboutRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.03 },
          0.18,
        );
        const charWindow = 0.28;
        const charStep = charWindow / chars.length;
        chars.forEach((el, i) => {
          tl.fromTo(
            el,
            { opacity: 0, filter: "blur(5px)" },
            {
              opacity: 1,
              filter: "blur(0px)",
              duration: charStep * 1.6,
              ease: "power1.out",
            },
            0.19 + i * charStep,
          );
        });
      }

      tl.to(aboutRef.current, { opacity: 0, y: -35, duration: 0.08 }, 0.52);
      tl.to(logoRef.current, { opacity: 0.13, duration: 0.15 }, 0.6);

      // Desktop orbit cards
      ORBIT_CARDS.forEach((card, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        tl.fromTo(
          el,
          { opacity: 0, x: card.enterFrom.x, y: card.enterFrom.y },
          { opacity: 1, x: 0, y: 0, duration: 0.18, ease: "power3.out" },
          0.63 + card.delay,
        );
      });

      tl.to(
        [logoRef.current, ...cardRefs.current.filter(Boolean)],
        { opacity: 0, duration: 0.08 },
        0.93,
      );
    }, containerRef);

    return () => {
      ctx.revert();
      introHeadlineChars.current = [];
    };
  }, []);

  // Animate mobile strip when it becomes visible
  useEffect(() => {
    if (mobileCardsVisible && mobileStripRef.current) {
      gsap.fromTo(
        mobileStripRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
      );
    }
  }, [mobileCardsVisible]);

  const SplitHeadline = ({
    text,
    isGold,
  }: {
    text: string;
    isGold?: boolean;
  }) => (
    <span className="inline-block whitespace-nowrap">
      {text.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el) introHeadlineChars.current.push(el);
          }}
          className={`inline-block ${isGold ? "text-[#d4a853] italic drop-shadow-[0_0_20px_rgba(212,168,83,0.4)]" : "text-[#e8e0d0]"}`}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );

  return (
    <>
      <style>{`
        /* Mobile horizontal scroll strip */
        .mobile-cards-strip {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          overflow-y: visible;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 0 20px 8px;
          width: 100%;
        }
        .mobile-cards-strip::-webkit-scrollbar { display: none; }

        .mobile-orbit-card {
          flex-shrink: 0;
          scroll-snap-align: start;
          width: 75vw;
          max-width: 300px;
          background: linear-gradient(145deg, rgba(17,30,24,0.85) 0%, rgba(6,10,8,0.92) 100%);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 18px;
          padding: 1.2rem 1.3rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.45);
          transition: border-color 0.3s;
        }

        /* Scroll hint fade on right edge */
        .mobile-strip-wrap {
          position: relative;
        }
        .mobile-strip-wrap::after {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 8px;
          width: 48px;
          background: linear-gradient(to right, transparent, rgba(6,10,8,0.85));
          pointer-events: none;
          border-radius: 0 18px 18px 0;
        }

        /* Scroll dots */
        .scroll-dots {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 8px;
        }
        .scroll-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          transition: background 0.3s, width 0.3s;
        }
        .scroll-dot.active {
          width: 16px;
          border-radius: 3px;
          background: rgba(78,204,163,0.7);
        }
      `}</style>

      <section ref={containerRef} className="relative w-full h-[620vh]">
        <div
          ref={pinRef}
          className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[radial-gradient(ellipse_70%_55%_at_50%_42%,rgba(74,82,40,0.4)_0%,rgba(45,74,48,0.3)_28%,rgba(18,36,24,0.2)_55%,#060a08_100%)]"
        >
          {/* Ambient glow */}
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[60vw] h-[90vw] md:h-[60vw] bg-[#c9a96e]/10 blur-[120px] rounded-full pointer-events-none z-1" />

          {/* SVG Logo */}
          <div
            ref={logoRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(200px,50vw,600px)] aspect-square z-2 pointer-events-none opacity-0"
          >
            <RecyvraR />
          </div>

          {/* Headline */}
          <div ref={headlineRef} className="relative z-40 text-center px-[5%]">
            <h1 className="font-headline font-light leading-[1.1] m-0">
              <span className="block text-[clamp(1.8rem,7vw,6rem)]">
                <SplitHeadline text="Where Intelligence" />
              </span>
              <span className="block text-[clamp(1.8rem,7vw,6rem)]">
                <SplitHeadline text="Meets " />
                <SplitHeadline text="Circularity" isGold />
              </span>
            </h1>
            <div ref={subtitleRef} className="mt-4 md:mt-8 opacity-0">
              <p className="font-body text-[clamp(0.72rem,1.2vw,1.1rem)] text-[#e8e0d0]/50 tracking-wider px-4">
                {SUBTITLES[subtitleIdx]}
              </p>
            </div>
          </div>

          {/* CTA */}
          <button
            ref={ctaBtnRef}
            className="absolute bottom-[8%] md:bottom-[15%] left-1/2 -translate-x-1/2 z-50 px-8 md:px-12 py-3 md:py-4 text-[#e8e0d0] font-bold tracking-[0.2em] text-[0.72rem] md:text-[0.85rem] uppercase rounded-full bg-white/5 backdrop-blur-[32px] border border-white/10 hover:bg-[#c9a96e]/20 hover:border-[#c9a96e]/40 transition-all duration-500 shadow-2xl opacity-0 pointer-events-auto cursor-pointer"
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#c9a96e]" />
              Initialize
            </span>
          </button>

          {/* Typewriter about text */}
          <div
            ref={aboutRef}
            className="absolute inset-0 flex items-center justify-center opacity-0 z-15 pointer-events-none px-[8%]"
          >
            <p className="font-headline text-[clamp(1.1rem,3.5vw,3rem)] text-[#e8e0d0] text-center leading-relaxed max-w-220 mx-auto">
              {(() => {
                const goldPhrase = "where AI-powered intelligence";
                const idx = ABOUT_TEXT.indexOf(goldPhrase);
                const before = ABOUT_TEXT.slice(0, idx);
                const gold = ABOUT_TEXT.slice(idx, idx + goldPhrase.length);
                const after = ABOUT_TEXT.slice(idx + goldPhrase.length);
                let n = 0;
                const spans = (str: string, isGold: boolean) =>
                  str.split("").map((ch) => {
                    const i = n++;
                    return (
                      <span
                        key={i}
                        className={isGold ? "text-[#c9a96e]" : ""}
                        ref={(el) => {
                          charRefs.current[i] = el;
                        }}
                      >
                        {ch}
                      </span>
                    );
                  });
                return (
                  <>
                    {spans(before, false)}
                    {spans(gold, true)}
                    {spans(after, false)}
                  </>
                );
              })()}
            </p>
          </div>

          {/* ── DESKTOP orbit cards ── */}
          <div className="hidden lg:block">
            {ORBIT_CARDS.map((card, i) => (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute flex items-center gap-5 backdrop-blur-[32px] border border-white/10 rounded-2xl p-6 opacity-0 w-[clamp(280px,30vw,400px)] hover:border-[#4ecca3]/30 hover:-translate-y-1 transition-all duration-300 z-25"
                style={{
                  top: card.pos.top,
                  left: card.pos.left,
                  background:
                    "linear-gradient(145deg, rgba(17,30,24,0.75) 0%, rgba(6,10,8,0.88) 100%)",
                  boxShadow: `0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(${card.accent},0.06)`,
                }}
              >
                <div
                  className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-[#f5f0e8]"
                  style={{
                    backgroundColor: card.iconBg,
                    border: `1px solid ${card.iconBorder}`,
                  }}
                >
                  {card.icon}
                </div>
                <p className="text-sm text-white/75 leading-relaxed m-0">
                  <strong className="text-white block mb-0.5 font-headline tracking-wide text-base">
                    {card.bold}
                  </strong>
                  {card.rest}
                </p>
              </div>
            ))}
          </div>

          {/* ── MOBILE horizontal scroll cards ── */}
          <div
            className="lg:hidden absolute z-25 w-full"
            style={{
              bottom: "clamp(5rem, 14vh, 9rem)",
              opacity: mobileCardsVisible ? 1 : 0,
              transition: "opacity 0.5s ease",
              pointerEvents: mobileCardsVisible ? "auto" : "none",
            }}
          >
            <div className="mobile-strip-wrap">
              <div ref={mobileStripRef} className="mobile-cards-strip">
                {/* Leading spacer */}
                <div style={{ flexShrink: 0, width: 4 }} />

                {ORBIT_CARDS.map((card, i) => (
                  <div
                    key={card.id}
                    className="mobile-orbit-card"
                    style={{
                      borderColor: `rgba(${card.accent},0.18)`,
                      boxShadow: `0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(${card.accent},0.06)`,
                    }}
                  >
                    {/* Icon + title row */}
                    <div className="flex items-center gap-3">
                      <div
                        className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-[#f5f0e8]"
                        style={{
                          backgroundColor: card.iconBg,
                          border: `1px solid ${card.iconBorder}`,
                        }}
                      >
                        {card.icon}
                      </div>
                      <strong
                        className="font-headline tracking-wide leading-tight"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(0.9rem,3.5vw,1.05rem)",
                          color: "#f0ece4",
                        }}
                      >
                        {card.bold}
                      </strong>
                    </div>
                    {/* Divider */}
                    <div
                      style={{
                        height: 1,
                        background: `rgba(${card.accent},0.2)`,
                      }}
                    />
                    {/* Body */}
                    <p
                      style={{
                        fontFamily: "var(--font-body,'DM Sans',sans-serif)",
                        fontSize: "clamp(0.75rem,3vw,0.85rem)",
                        color: "rgba(232,224,208,0.55)",
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {card.rest.trim()}
                    </p>
                  </div>
                ))}

                {/* Trailing spacer */}
                <div style={{ flexShrink: 0, width: 4 }} />
              </div>
            </div>

            {/* Scroll indicator dots */}
            <div className="scroll-dots">
              {ORBIT_CARDS.map((_, i) => (
                <div
                  key={i}
                  className={`scroll-dot ${i === 0 ? "active" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
