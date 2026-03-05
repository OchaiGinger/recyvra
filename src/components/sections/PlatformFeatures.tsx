"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Smartphone,
  BarChart3,
  Link as LinkIcon,
  CreditCard,
  ClipboardCheck,
  Leaf,
  Bell,
  Zap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Concentric full circles (left tall card) ─────────────────────────────────
function ConcentricFull({ size = 420 }: { size?: number }) {
  const rings = 6;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className="absolute pointer-events-none"
    >
      {Array.from({ length: rings }).map((_, i) => {
        const r = (size / 2 - 10) * ((rings - i) / rings);
        return (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
            fill="none"
          />
        );
      })}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 10}
        stroke="rgba(78,204,163,0.12)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

// ─── Half-circle arc (right tall card) ───────────────────────────────────────
function HalfArc({ size = 360 }: { size?: number }) {
  const rings = 5;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className="absolute pointer-events-none"
    >
      {Array.from({ length: rings }).map((_, i) => {
        const r = size * 0.46 * ((rings - i) / rings);
        return (
          <path
            key={i}
            d={`M ${size / 2 - r} ${size / 2} A ${r} ${r} 0 0 1 ${size / 2 + r} ${size / 2}`}
            stroke="rgba(255,255,255,0.09)"
            strokeWidth="1"
            fill="none"
          />
        );
      })}
    </svg>
  );
}

// ─── Nested rounded-square art (middle-bottom card) ───────────────────────────
function NestedSquares() {
  const levels = 4;
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 300 300"
      fill="none"
      className="absolute inset-0 pointer-events-none"
    >
      {Array.from({ length: levels }).map((_, i) => {
        const inset = 20 + i * 30;
        const r = 36 - i * 6;
        return (
          <rect
            key={i}
            x={inset}
            y={inset}
            width={300 - inset * 2}
            height={300 - inset * 2}
            rx={r}
            ry={r}
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="1"
            fill="none"
          />
        );
      })}
      <rect
        x={90}
        y={90}
        width={120}
        height={120}
        rx={20}
        ry={20}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

// ─── Flip wrapper ─────────────────────────────────────────────────────────────
function FlipCard({
  front,
  back,
  style = {},
  className = "",
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={className}
      style={{ perspective: "1200px", cursor: "pointer", ...style }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(0.4,0.2,0.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div className="absolute inset-0 backface-hidden rounded-[inherit] overflow-hidden">
          {front}
        </div>
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[inherit] overflow-hidden">
          {back}
        </div>
      </div>
    </div>
  );
}

// ─── Shared styles ────────────────────────────────────────────────────────────
const CARD: React.CSSProperties = {
  borderRadius: 22,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "linear-gradient(145deg,#0f1e16 0%,#070c09 100%)",
  boxShadow: "0 8px 40px rgba(0,0,0,0.55)",
  overflow: "hidden",
  position: "relative",
};

const BACK_BASE = (accentRgb: string): React.CSSProperties => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
  textAlign: "center",
  background: `linear-gradient(145deg, rgba(${accentRgb},0.10) 0%, #070c09 100%)`,
});

const FEATURES = [
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile-First Interface",
    desc: "Intuitive app for photographing materials, scheduling pickups, and tracking diversions. Works offline with automatic sync.",
    accentRgb: "78,204,163",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Real-Time Analytics",
    desc: "Live dashboards showing diversion rates, cost savings, carbon impact, and revenue. Export for ESG reporting.",
    accentRgb: "201,169,110",
  },
  {
    icon: <LinkIcon className="w-6 h-6" />,
    title: "Verified Processor Network",
    desc: "Access to composters, recyclers, and specialty processors. Automated quality matching and capacity monitoring.",
    accentRgb: "78,204,163",
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Automated Payments",
    desc: "Integrated payment processing with flexible terms. Automatic invoicing and financial reconciliation.",
    accentRgb: "201,169,110",
  },
  {
    icon: <ClipboardCheck className="w-6 h-6" />,
    title: "Compliance Management",
    desc: "Built-in tracking for EPA regulations. Automated manifest and chain-of-custody docs.",
    accentRgb: "78,204,163",
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Carbon Accounting",
    desc: "Measure and verify carbon offsets from waste diversion. Integration with carbon credit marketplaces.",
    accentRgb: "201,169,110",
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: "Smart Notifications",
    desc: "Proactive alerts for schedules, quality issues, new opportunities, and price changes.",
    accentRgb: "78,204,163",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "API & Integrations",
    desc: "RESTful API for custom integrations. Pre-built connectors for ERPs, IoT sensors, and sustainability platforms.",
    accentRgb: "201,169,110",
  },
];

function StatDisplay({
  value,
  label,
  sublabel,
  size = "lg",
}: {
  value: string;
  label: string;
  sublabel?: string;
  size?: "sm" | "lg";
}) {
  return (
    <div className="text-center relative z-2">
      <div
        style={{
          fontFamily: "var(--font-display,'Cormorant Garamond',Georgia,serif)",
          fontWeight: 300,
          fontSize:
            size === "lg"
              ? "clamp(3rem,5.5vw,5rem)"
              : "clamp(2rem,3.5vw,3.2rem)",
          color: "#d8d0c4",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "var(--font-body,'DM Sans',sans-serif)",
          fontSize: size === "lg" ? "clamp(0.8rem,1.1vw,0.95rem)" : "0.78rem",
          color: "rgba(216,208,196,0.5)",
          marginTop: "0.5rem",
          letterSpacing: "0.04em",
          lineHeight: 1.4,
        }}
      >
        {label}
      </div>
      {sublabel && (
        <div className="font-body text-[0.65rem] text-[#d8d0c4]/30 mt-1 tracking-widest uppercase">
          {sublabel}
        </div>
      )}
    </div>
  );
}

function FeatBack({ f }: { f: (typeof FEATURES)[0] }) {
  return (
    <div style={BACK_BASE(f.accentRgb)}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 13,
          background: `rgba(${f.accentRgb},0.15)`,
          border: `1px solid rgba(${f.accentRgb},0.30)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: `rgb(${f.accentRgb})`,
          marginBottom: "1rem",
        }}
      >
        {f.icon}
      </div>
      <h3 className="font-headline text-lg md:text-xl text-[#e8e0d0] font-medium mb-3">
        {f.title}
      </h3>
      <p className="font-body text-xs md:text-sm text-[#e8e0d0]/60 leading-relaxed">
        {f.desc}
      </p>
    </div>
  );
}

export const PlatformFeatures = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gc",
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-32 bg-[#0b1410] relative overflow-hidden"
    >
      <div className="absolute top-[8%] left-[2%] w-125 h-125 rounded-full bg-[#4ecca3]/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[8%] right-[2%] w-125 h-125 rounded-full bg-[#c9a96e]/5 blur-[80px] pointer-events-none" />

      <div className="max-w-315 mx-auto px-[4%] relative z-10">
        <div className="text-center mb-16">
          <p className="font-body text-[0.7rem] font-bold tracking-[0.22em] text-[#c9a96e] uppercase mb-4">
            PLATFORM FEATURES
          </p>
          <h2 className="font-headline text-[#e8e0d0] text-[3rem] md:text-[5rem] font-light leading-tight">
            Details That <span className="text-[#4ecca3] italic">Matter</span>
          </h2>
          <p className="font-body text-sm text-white/40 mt-4">
            Hover any card to explore the core architecture.
          </p>
        </div>

        {/* Desktop Grid Layout */}
        <div
          className="hidden lg:grid gap-3.5"
          style={{
            gridTemplateColumns: "1.25fr 1fr 1fr",
            gridTemplateRows: "260px 260px 300px",
          }}
        >
          {/* A: Big circle card */}
          <FlipCard
            className="gc"
            style={{ ...CARD, gridColumn: "1", gridRow: "1 / 3" }}
            front={
              <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-linear-to-br from-[#0f221a] to-[#060c08]">
                <ConcentricFull size={480} />
                <div className="absolute w-40 h-40 rounded-full bg-[#4ecca3]/20 blur-[28px]" />
                <StatDisplay value="40+" label="Enterprise Clients" />
              </div>
            }
            back={
              <div
                style={{
                  ...BACK_BASE("78,204,163"),
                  background:
                    "linear-gradient(160deg, rgba(78,204,163,0.09) 0%, #060c08 100%)",
                }}
              >
                <div className="text-4xl mb-4">♻️</div>
                <h3 className="font-headline text-2xl text-[#e8e0d0] font-normal mb-4">
                  Circular Intelligence
                </h3>
                <p className="font-body text-sm text-[#e8e0d0]/60 leading-relaxed max-w-70">
                  40+ enterprise clients trust Recyvra to power their circular
                  economy operations with AI-first logistics and real-time
                  intelligence.
                </p>
              </div>
            }
          />

          {/* B: Stat card 1 */}
          <FlipCard
            className="gc"
            style={{ ...CARD, gridColumn: "2", gridRow: "1" }}
            front={
              <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-linear-to-br from-[#0f1e16] to-[#070c09]">
                <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-[#4ecca3]/10 blur-[30px]" />
                <StatDisplay
                  value="98%"
                  label="Diversion Rate"
                  sublabel="Industry avg: 42%"
                />
              </div>
            }
            back={<FeatBack f={FEATURES[1]} />}
          />

          {/* C: Stat card 2 */}
          <FlipCard
            className="gc"
            style={{ ...CARD, gridColumn: "2", gridRow: "2" }}
            front={
              <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-linear-to-br from-[#181408] to-[#090804]">
                <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-[#c9a96e]/15 blur-[30px]" />
                <StatDisplay
                  value="2.4M"
                  label="Tonnes Diverted"
                  sublabel="And counting"
                />
              </div>
            }
            back={<FeatBack f={FEATURES[3]} />}
          />

          {/* D: Half-arc card */}
          <FlipCard
            className="gc"
            style={{ ...CARD, gridColumn: "3", gridRow: "1 / 3" }}
            front={
              <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-8 bg-linear-to-br from-[#0f1e16] to-[#060c08]">
                <div className="text-right relative z-2">
                  <div className="font-headline font-light text-[3rem] text-[#d8d0c4] leading-none">
                    $18M+
                  </div>
                  <div className="font-body text-[0.72rem] text-[#d8d0c4]/50 mt-1 tracking-widest uppercase">
                    Revenue Recovered
                  </div>
                </div>
                <div className="absolute -bottom-[8%] left-1/2 -translate-x-1/2">
                  <HalfArc size={400} />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-24 bg-[#4ecca3]/15 blur-xl" />
              </div>
            }
            back={
              <div style={BACK_BASE("78,204,163")}>
                <div className="text-4xl mb-4">💰</div>
                <h3 className="font-headline text-xl text-[#e8e0d0] font-normal mb-4">
                  Revenue Recovery
                </h3>
                <p className="font-body text-sm text-[#e8e0d0]/60 leading-relaxed max-w-60">
                  Our clients have collectively recovered over $18M in value
                  from materials that would otherwise have been landfilled.
                </p>
              </div>
            }
          />

          {/* E: Text card */}
          <FlipCard
            className="gc"
            style={{ ...CARD, gridColumn: "1", gridRow: "3" }}
            front={
              <div className="w-full h-full relative overflow-hidden flex flex-col justify-end p-9 bg-linear-to-br from-[#0f1e16] to-[#060c08]">
                <div className="absolute -bottom-[8%] left-[-5%] font-headline font-bold text-[14rem] text-white/5 leading-none select-none pointer-events-none">
                  R
                </div>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {FEATURES.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-[#e8e0d0]">
                        {React.isValidElement(f.icon) &&
                          React.cloneElement(
                            f.icon as React.ReactElement<any>,
                            { className: "w-3.5 h-3.5" },
                          )}
                      </div>
                      <span className="font-body text-[0.65rem] text-[#e8e0d0]/50">
                        {f.title}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="relative z-2">
                  <p className="font-headline text-2xl text-[#e8e0d0] leading-tight m-0">
                    A Unified Intelligence & Circularity Ecosystem
                  </p>
                  <p className="font-body text-[0.75rem] text-[#e8e0d0]/30 mt-2 uppercase tracking-widest">
                    Limitless Customization
                  </p>
                </div>
              </div>
            }
            back={
              <div
                style={{
                  ...BACK_BASE("78,204,163"),
                  alignItems: "flex-start",
                  textAlign: "left",
                  padding: "2.2rem",
                }}
              >
                <p className="font-body text-[0.68rem] font-bold tracking-[0.2em] text-[#4ecca3] uppercase mb-4">
                  8 Core Modules
                </p>
                <div className="flex flex-col gap-2.5 w-full">
                  {FEATURES.map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4ecca3] shrink-0" />
                      <span className="font-body text-sm text-[#e8e0d0]/70">
                        {f.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            }
          />

          {/* F: Nested Squares Card */}
          <FlipCard
            className="gc"
            style={{ ...CARD, gridColumn: "2", gridRow: "3" }}
            front={
              <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-linear-to-br from-[#0f1e16] to-[#070c09]">
                <NestedSquares />
                <div className="absolute w-32 h-32 rounded-full bg-white/5 blur-lg" />
                <div className="relative z-2 text-center bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                  <div className="font-headline font-light text-[2.8rem] text-[#d8d0c4] leading-none">
                    1,200 <span className="text-xl align-super">t</span>
                  </div>
                  <div className="font-body text-[0.72rem] text-[#d8d0c4]/50 mt-2 uppercase tracking-widest">
                    Of Waste Diverted Monthly
                  </div>
                </div>
              </div>
            }
            back={<FeatBack f={FEATURES[5]} />}
          />

          {/* G: Large Stat Card */}
          <FlipCard
            className="gc"
            style={{ ...CARD, gridColumn: "3", gridRow: "3" }}
            front={
              <div className="w-full h-full relative overflow-hidden flex flex-col justify-end p-9 bg-linear-to-br from-[#0f1e16] to-[#060c08]">
                <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 text-[12rem] opacity-[0.05] select-none pointer-events-none">
                  🌿
                </div>
                <div className="relative z-2">
                  <div className="font-headline font-light text-[4.5rem] text-[#d8d0c4] leading-none">
                    18K+
                  </div>
                  <div className="font-body text-[0.8rem] text-[#d8d0c4]/50 mt-2 uppercase tracking-widest">
                    Waste Streams Processed
                  </div>
                </div>
              </div>
            }
            back={<FeatBack f={FEATURES[7]} />}
          />
        </div>

        {/* Mobile/Tablet Stacked Layout */}
        <div className="grid lg:hidden grid-cols-1 md:grid-cols-1 gap-6">
          <div className="gc h-80 w-full" style={CARD}>
            <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-linear-to-br from-[#0f221a] to-[#060c08]">
              <ConcentricFull size={300} />
              <StatDisplay value="40+" label="Enterprise Clients" />
            </div>
          </div>
          <div className="gc h-65 w-full" style={CARD}>
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#0f1e16] to-[#070c09]">
              <StatDisplay value="98%" label="Diversion Rate" size="sm" />
            </div>
          </div>
          <div className="gc h-65 w-full" style={CARD}>
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#181408] to-[#090804]">
              <StatDisplay value="2.4M" label="Tonnes Diverted" size="sm" />
            </div>
          </div>
          <div className="gc h-80 w-full" style={CARD}>
            <div className="w-full h-full relative overflow-hidden flex flex-col justify-center items-center p-8 bg-linear-to-br from-[#0f1e16] to-[#060c08]">
              <StatDisplay value="$18M+" label="Revenue Recovered" />
            </div>
          </div>
          {FEATURES.map((f, i) => (
            <div key={i} className="gc h-65 w-full" style={CARD}>
              <FeatBack f={f} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformFeatures;
