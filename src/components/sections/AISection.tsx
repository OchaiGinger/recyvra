"use client";

import React, { useState } from "react";
import { Sparkles, TrendingUp, Recycle, ArrowRight, Zap } from "lucide-react";

const EXAMPLE_PROMPTS = [
  "40 tonnes of mixed electronics monthly at our sorting facility...",
  "Restaurant chain generating 8 tonnes of organic waste weekly...",
  "Manufacturing plant with 20 tonnes of metal offcuts per month...",
  "Retail warehouse producing 15 tonnes of cardboard and plastics...",
];

const MOCK_PATHWAYS = [
  "Route PCB components to certified e-waste processors for precious metal recovery — est. $4,200/mo revenue",
  "Plastic housings qualify for mechanical recycling into post-consumer resin pellets",
  "Establish takeback programme with OEM partners for component refurbishment",
  "Battery packs eligible for second-life energy storage applications",
];

const MOCK_REVENUE = [
  "Precious metal extraction from circuit boards: $180–240/tonne",
  "Resin pellet sales to plastics manufacturers: $95–140/tonne",
  "Carbon offset credits from certified diversion: ~$22/tonne CO₂e",
  "Compliance cost avoidance vs landfill: $150–300/tonne saved",
];

export const AISection = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const [activePrompt, setActivePrompt] = useState<number | null>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setResult(false);
    setTimeout(() => {
      setLoading(false);
      setResult(true);
    }, 2200);
  };

  const handlePrompt = (i: number) => {
    setActivePrompt(i);
    setInput(EXAMPLE_PROMPTS[i]);
    setResult(false);
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0%,100% { box-shadow: 0 0 0 0 rgba(78,204,163,0.3); }
          50%     { box-shadow: 0 0 0 8px rgba(78,204,163,0); }
        }
        .shimmer-btn {
          background: linear-gradient(
            90deg,
            #c9a96e 0%, #e6c285 40%, #f0d49a 50%, #e6c285 60%, #c9a96e 100%
          );
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        .shimmer-btn:hover { animation-duration: 1.5s; }
        .result-card { animation: fadeUp 0.6s ease forwards; }
        .result-card:nth-child(2) { animation-delay: 0.12s; }
        .thinking-dot {
          animation: thinking 1.2s ease-in-out infinite;
        }
        .thinking-dot:nth-child(2) { animation-delay: 0.2s; }
        .thinking-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes thinking {
          0%,80%,100% { transform: scale(0.6); opacity: 0.3; }
          40%          { transform: scale(1);   opacity: 1; }
        }
        .ai-textarea:focus {
          outline: none;
          border-color: rgba(201,169,110,0.5) !important;
          box-shadow: 0 0 0 1px rgba(201,169,110,0.2), 0 0 30px rgba(201,169,110,0.08);
        }
        .prompt-chip:hover {
          border-color: rgba(78,204,163,0.35);
          background: rgba(78,204,163,0.06);
          color: rgba(232,224,208,0.75);
        }
      `}</style>

      <section className="py-32 bg-[#060a08] relative overflow-hidden">
        {/* Ambient glows */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 800,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "10%",
            left: "10%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(78,204,163,0.05) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <div
          className="max-w-275 mx-auto relative z-10"
          style={{ padding: "0 max(5%, 1.5rem)" }}
        >
          {/* Header */}
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full"
              style={{
                background: "rgba(201,169,110,0.08)",
                border: "1px solid rgba(201,169,110,0.2)",
              }}
            >
              <Zap className="w-3 h-3" style={{ color: "#c9a96e" }} />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  color: "#c9a96e",
                  textTransform: "uppercase",
                }}
              >
                CIRCULARITY ASSISTANT
              </span>
            </div>
            <h2
              style={{
                fontFamily:
                  "var(--font-display,'Cormorant Garamond',Georgia,serif)",
                fontWeight: 300,
                fontSize: "clamp(2.5rem,5.5vw,4.2rem)",
                color: "#e8e0d0",
                lineHeight: 1.06,
                margin: "0 0 1.2rem",
                letterSpacing: "-0.01em",
              }}
            >
              Test our{" "}
              <span style={{ color: "#c9a96e", fontStyle: "italic" }}>
                Intelligence
              </span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.85rem,1.1vw,0.98rem)",
                color: "rgba(232,224,208,0.42)",
                maxWidth: 520,
                margin: "0 auto",
                lineHeight: 1.75,
              }}
            >
              Describe your enterprise waste stream and let our AI identify
              immediate revenue and circularity pathways.
            </p>
          </div>

          {/* Main card */}
          <div
            style={{
              background:
                "linear-gradient(145deg, rgba(15,26,20,0.85) 0%, rgba(6,10,8,0.95) 100%)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 28,
              padding: "clamp(2rem,4vw,3.5rem)",
              boxShadow:
                "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(78,204,163,0.04)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Example prompts */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: "rgba(232,224,208,0.28)",
                  textTransform: "uppercase",
                  alignSelf: "center",
                  marginRight: 4,
                }}
              >
                Try:
              </span>
              {EXAMPLE_PROMPTS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handlePrompt(i)}
                  className="prompt-chip"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.68rem",
                    color:
                      activePrompt === i
                        ? "rgba(78,204,163,0.85)"
                        : "rgba(232,224,208,0.38)",
                    background:
                      activePrompt === i
                        ? "rgba(78,204,163,0.08)"
                        : "rgba(255,255,255,0.03)",
                    border: `1px solid ${activePrompt === i ? "rgba(78,204,163,0.3)" : "rgba(255,255,255,0.07)"}`,
                    borderRadius: 20,
                    padding: "0.35rem 0.85rem",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    maxWidth: 180,
                    textOverflow: "ellipsis",
                  }}
                >
                  {p.slice(0, 32)}…
                </button>
              ))}
            </div>

            {/* Textarea */}
            <form onSubmit={handleAnalyze}>
              <div style={{ position: "relative", marginBottom: "1.5rem" }}>
                <textarea
                  className="ai-textarea w-full"
                  placeholder="Describe your waste stream — materials, volume, current disposal method..."
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setResult(false);
                  }}
                  rows={6}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(0.88rem,1.1vw,1rem)",
                    color: "rgba(232,224,208,0.82)",
                    lineHeight: 1.75,
                    background: "rgba(0,0,0,0.35)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 18,
                    padding: "1.4rem 1.6rem",
                    resize: "none",
                    width: "100%",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                  }}
                />
                {/* Sparkle corner */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "1rem",
                    right: "1.2rem",
                  }}
                >
                  <Sparkles
                    style={{
                      width: 18,
                      height: 18,
                      color: "rgba(201,169,110,0.45)",
                    }}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className={!loading && input.trim() ? "shimmer-btn" : ""}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    letterSpacing: "0.18em",
                    color: "#060a08",
                    background:
                      loading || !input.trim()
                        ? "rgba(255,255,255,0.08)"
                        : undefined,
                    border: "none",
                    borderRadius: 9999,
                    padding: "1rem 3rem",
                    cursor:
                      loading || !input.trim() ? "not-allowed" : "pointer",
                    opacity: !input.trim() ? 0.4 : 1,
                    transition: "opacity 0.3s, transform 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    animation: loading || !input.trim() ? "none" : undefined,
                  }}
                  onMouseEnter={(e) => {
                    if (input.trim() && !loading)
                      e.currentTarget.style.transform = "scale(1.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {loading ? (
                    <>
                      <span
                        style={{
                          color: "rgba(232,224,208,0.5)",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.75rem",
                          letterSpacing: "0.18em",
                        }}
                      >
                        ANALYSING
                      </span>
                      <span className="flex gap-1 items-center">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="thinking-dot"
                            style={{
                              display: "inline-block",
                              width: 5,
                              height: 5,
                              borderRadius: "50%",
                              background: "#4ecca3",
                            }}
                          />
                        ))}
                      </span>
                    </>
                  ) : (
                    <>
                      GENERATE PATHWAYS
                      <ArrowRight style={{ width: 15, height: 15 }} />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Results */}
            {result && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
                {/* Circularity pathways */}
                <div
                  className="result-card"
                  style={{
                    background: "rgba(78,204,163,0.04)",
                    border: "1px solid rgba(78,204,163,0.12)",
                    borderRadius: 20,
                    overflow: "hidden",
                    boxShadow: "0 0 40px rgba(78,204,163,0.04)",
                  }}
                >
                  <div
                    style={{
                      padding: "1rem 1.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.7rem",
                      borderBottom: "1px solid rgba(78,204,163,0.08)",
                      background: "rgba(78,204,163,0.06)",
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 9,
                        background: "rgba(78,204,163,0.15)",
                        border: "1px solid rgba(78,204,163,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Recycle
                        style={{ width: 16, height: 16, color: "#4ecca3" }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        letterSpacing: "0.22em",
                        color: "#4ecca3",
                        textTransform: "uppercase",
                      }}
                    >
                      CIRCULARITY PATHWAYS
                    </span>
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <ul
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.1rem",
                        margin: 0,
                        padding: 0,
                        listStyle: "none",
                      }}
                    >
                      {MOCK_PATHWAYS.map((path, i) => (
                        <li
                          key={i}
                          style={{
                            display: "flex",
                            gap: "0.85rem",
                            alignItems: "flex-start",
                          }}
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "#4ecca3",
                              flexShrink: 0,
                              marginTop: "0.48em",
                              boxShadow: "0 0 8px rgba(78,204,163,0.6)",
                            }}
                          />
                          <span
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "clamp(0.8rem,0.95vw,0.88rem)",
                              color: "rgba(232,224,208,0.62)",
                              lineHeight: 1.7,
                            }}
                          >
                            {path}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Revenue opportunities */}
                <div
                  className="result-card"
                  style={{
                    background: "rgba(201,169,110,0.04)",
                    border: "1px solid rgba(201,169,110,0.12)",
                    borderRadius: 20,
                    overflow: "hidden",
                    boxShadow: "0 0 40px rgba(201,169,110,0.04)",
                  }}
                >
                  <div
                    style={{
                      padding: "1rem 1.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.7rem",
                      borderBottom: "1px solid rgba(201,169,110,0.08)",
                      background: "rgba(201,169,110,0.06)",
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 9,
                        background: "rgba(201,169,110,0.15)",
                        border: "1px solid rgba(201,169,110,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TrendingUp
                        style={{ width: 16, height: 16, color: "#c9a96e" }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        letterSpacing: "0.22em",
                        color: "#c9a96e",
                        textTransform: "uppercase",
                      }}
                    >
                      REVENUE OPPORTUNITIES
                    </span>
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <ul
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.1rem",
                        margin: 0,
                        padding: 0,
                        listStyle: "none",
                      }}
                    >
                      {MOCK_REVENUE.map((opp, i) => (
                        <li
                          key={i}
                          style={{
                            display: "flex",
                            gap: "0.85rem",
                            alignItems: "flex-start",
                          }}
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "#c9a96e",
                              flexShrink: 0,
                              marginTop: "0.48em",
                              boxShadow: "0 0 8px rgba(201,169,110,0.6)",
                            }}
                          />
                          <span
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "clamp(0.8rem,0.95vw,0.88rem)",
                              color: "rgba(232,224,208,0.62)",
                              lineHeight: 1.7,
                            }}
                          >
                            {opp}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AISection;
