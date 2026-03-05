"use client";

import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2, MessageSquare, Download } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
          id="cta_r_main"
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
          id="cta_r_shadow"
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
          id="cta_r_gloss"
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
          id="cta_r_arrow"
          x1="95"
          y1="110"
          x2="155"
          y2="175"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#26d4c0" />
          <stop offset="100%" stopColor="#0a9980" />
        </linearGradient>
        <filter id="cta_r_glow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="14"
            floodColor="#2edb5a"
            floodOpacity="0.35"
          />
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="22"
            floodColor="#000"
            floodOpacity="0.50"
          />
        </filter>
        <filter id="cta_r_blob">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <circle
        cx="100"
        cy="100"
        r="72"
        fill="#1ecc70"
        opacity="0.12"
        filter="url(#cta_r_blob)"
      />
      <g filter="url(#cta_r_glow)">
        <circle
          cx="100"
          cy="100"
          r="72"
          stroke="url(#cta_r_main)"
          strokeWidth="22"
          fill="none"
        />
        <path
          d="M 48 55 A 60 60 0 0 1 152 55"
          stroke="url(#cta_r_gloss)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
        <rect
          x="68"
          y="55"
          width="18"
          height="82"
          rx="4"
          fill="url(#cta_r_main)"
        />
        <path
          d="M 86 55 Q 130 55 130 82 Q 130 107 86 107 Z"
          fill="url(#cta_r_shadow)"
        />
        <path
          d="M 86 55 Q 130 55 130 82 Q 130 107 86 107"
          stroke="url(#cta_r_main)"
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
          stroke="url(#cta_r_arrow)"
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

export const CTA = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      el.style.transform = `translate(-20%, -50%) translate(${dx * 10}px, ${dy * 7}px)`;
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <>
      <style>{`
        .cta-section {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          background:
            radial-gradient(ellipse 65% 55% at 60% 50%,
              #1a3d28 0%, #0d2418 30%, #071410 60%, #050d09 100%);
        }
        .cta-section::before {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 1; mix-blend-mode: overlay;
        }

        .cta-btn-primary {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 0.9rem 2.4rem;
          border-radius: 9999px;
          background: linear-gradient(145deg, #e8e0d0 0%, #c4bba8 100%);
          color: #0b1410;
          font-weight: 700;
          font-size: clamp(0.78rem, 1vw, 0.88rem);
          letter-spacing: 0.06em;
          border: none; cursor: pointer;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.6);
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          white-space: nowrap;
        }
        .cta-btn-primary:hover {
          background: linear-gradient(145deg, #f0e8d8 0%, #d4cbb8 100%);
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 28px rgba(0,0,0,0.45);
        }

        .cta-btn-secondary {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
          padding: 0.9rem 2.2rem;
          border-radius: 9999px;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(16px);
          color: rgba(232,224,208,0.82);
          font-weight: 500;
          font-size: clamp(0.78rem, 1vw, 0.88rem);
          letter-spacing: 0.06em;
          border: 1px solid rgba(255,255,255,0.18);
          cursor: pointer;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 16px rgba(0,0,0,0.3);
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          white-space: nowrap;
        }
        .cta-btn-secondary:hover {
          background: rgba(255,255,255,0.10);
          border-color: rgba(255,255,255,0.28);
          color: #e8e0d0;
          transform: translateY(-2px);
        }

        .cta-btn-icon {
          display: inline-flex; align-items: center; justify-content: center;
          width: 52px; height: 52px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.18);
          color: rgba(232,224,208,0.75);
          cursor: pointer;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 16px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .cta-btn-icon:hover {
          background: rgba(255,255,255,0.13);
          border-color: rgba(255,255,255,0.30);
          transform: translateY(-2px) scale(1.05);
          color: #e8e0d0;
        }

        .glow-teal {
          color: #4ecca3;
          text-shadow:
            0 0 24px rgba(78,204,163,0.85),
            0 0 55px rgba(78,204,163,0.45),
            0 0 100px rgba(78,204,163,0.22);
        }
      `}</style>

      <section ref={sectionRef} className="cta-section">
        <div
          className="absolute pointer-events-none"
          style={{
            top: "50%",
            right: "5%",
            transform: "translateY(-50%)",
            width: "clamp(380px,50vw,700px)",
            height: "clamp(380px,50vw,700px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(46,219,90,0.03) 0%, rgba(18,184,120,0.02) 40%, transparent 70%)",
            filter: "blur(70px)",
            zIndex: 1,
          }}
        />

        <div
          className="absolute pointer-events-none"
          style={{
            top: "-8%",
            left: "-4%",
            width: "clamp(280px,35vw,500px)",
            height: "clamp(280px,35vw,500px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
            zIndex: 1,
          }}
        />

        <div
          ref={logoRef}
          style={{
            position: "absolute",
            top: "50%",
            right: "-4%",
            transform: "translate(-20%, -50%)",
            width: "clamp(400px,52vw,760px)",
            aspectRatio: "1 / 1",
            zIndex: 1,
            transition: "transform 0.18s ease-out",
            opacity: 0.06,
            pointerEvents: "none",
          }}
        >
          <RecyvraR />
        </div>

        <div
          className="relative w-full max-w-300 mx-auto px-[5%]"
          style={{ zIndex: 10 }}
        >
          <div style={{ maxWidth: "clamp(380px, 48%, 600px)" }}>
            <p
              style={{
                fontFamily: "var(--font-body,'DM Sans',sans-serif)",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                color: "#c9a96e",
                textTransform: "uppercase",
                marginBottom: "1.4rem",
              }}
            >
              GET STARTED
            </p>

            <h2
              style={{
                fontFamily:
                  "var(--font-display,'Cormorant Garamond',Georgia,serif)",
                fontWeight: 350,
                fontSize: "clamp(2.8rem, 6.5vw, 5.8rem)",
                lineHeight: 1.06,
                color: "#e8e0d0",
                margin: "0 0 1.6rem",
                letterSpacing: "-0.01em",
              }}
            >
              Where Your Idea
              <br />
              Becomes An <span className="glow-teal">Experience</span>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body,'DM Sans',sans-serif)",
                fontSize: "clamp(0.85rem, 1.2vw, 1.02rem)",
                color: "rgba(232,224,208,0.55)",
                lineHeight: 1.7,
                maxWidth: 460,
                marginBottom: "2.6rem",
              }}
            >
              Let's craft something that carries meaning, reflects your
              identity, and leaves a lasting impression.
            </p>

            {!submitted ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.9rem",
                  flexWrap: "wrap",
                }}
              >
                <button
                  className="cta-btn-primary"
                  onClick={() =>
                    document
                      .getElementById("about")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Start Your Journey
                </button>
                <button className="cta-btn-secondary">
                  <Download size={15} />
                  Download Our Catalogue
                </button>
                <button className="cta-btn-icon" aria-label="Contact">
                  <MessageSquare size={20} />
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  color: "#4ecca3",
                }}
              >
                <CheckCircle2 size={22} />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                  }}
                >
                  Thanks! We'll be in touch within 24 hours.
                </span>
              </div>
            )}

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1.4rem",
                marginTop: "2.2rem",
              }}
            >
              {[
                "No credit card required",
                "30-day free trial",
                "Cancel anytime",
              ].map((t, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    fontFamily: "var(--font-body,'DM Sans',sans-serif)",
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    color: "rgba(232,224,208,0.35)",
                    textTransform: "uppercase",
                  }}
                >
                  <CheckCircle2 size={13} color="rgba(45,95,79,0.9)" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "22%",
            background:
              "linear-gradient(to top, rgba(5,13,9,0.55) 0%, transparent 100%)",
            zIndex: 6,
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: "16%",
            background:
              "linear-gradient(to bottom, rgba(5,13,9,0.38) 0%, transparent 100%)",
            zIndex: 6,
          }}
        />
      </section>
    </>
  );
};
