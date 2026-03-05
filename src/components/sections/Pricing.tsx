"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
  {
    name: "Starter",
    price: "$299",
    period: "/mo",
    desc: "Perfect for single-location businesses testing resource recovery",
    features: [
      "Up to 10 tons/month",
      "AI material classification",
      "Basic routing optimization",
      "Monthly reporting",
      "Email support",
      "1 location",
    ],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$999",
    period: "/mo",
    desc: "Ideal for multi-location operations scaling waste diversion",
    features: [
      "Up to 100 tons/month",
      "Advanced ML optimization",
      "Real-time route optimization",
      "API access",
      "Priority support",
      "Up to 10 locations",
      "Carbon accounting",
      "Custom reporting",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For organizations with complex needs and compliance requirements",
    features: [
      "Unlimited volume",
      "Dedicated ML models",
      "White-label options",
      "SSO & SAML",
      "24/7 phone support",
      "Unlimited locations",
      "Custom integrations",
      "SLA guarantees",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

export const Pricing = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      className="py-20 md:py-32 bg-[#060a08] relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-[80vw] h-[80vw] bg-[#2d5f4f]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[#c9a96e]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-300 mx-auto px-[5%] relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <p className="text-[#c9a96e] text-[0.7rem] md:text-[0.8rem] font-bold tracking-[0.3em] uppercase mb-4">
            PRICING
          </p>
          <h2 className="font-headline text-[#f5f0e8] text-[2.5rem] md:text-[5rem] leading-tight mb-8">
            Plans That Scale{" "}
            <span className="text-[#c9a96e] italic">With You</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-base md:text-lg font-body px-4">
            Start free, upgrade as you grow. No hidden fees, cancel anytime.
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch"
        >
          {PLANS.map((plan, i) => (
            <div
              key={i}
              className={`pricing-card relative flex flex-col p-8 md:p-12 rounded-[24px] md:rounded-[2.5rem] border transition-all duration-500 hover:scale-[1.02] backdrop-blur-3xl ${
                plan.highlight
                  ? "bg-white/8 border-[#c9a96e]/40 shadow-[0_20px_60px_rgba(201,169,110,0.1)]"
                  : "bg-white/3 border-white/10"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c9a96e] text-[#060a08] text-[0.6rem] font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-full shadow-xl">
                  Most Popular
                </div>
              )}

              <div className="mb-8 md:mb-10">
                <h3 className="text-white font-headline text-2xl md:text-3xl mb-3 md:mb-4">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-4 md:mb-6">
                  <span className="text-4xl md:text-6xl font-headline font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-white/30 text-sm md:text-lg font-body">
                    {plan.period}
                  </span>
                </div>
                <p className="text-white/40 text-[0.85rem] md:text-sm leading-relaxed min-h-12.5">
                  {plan.desc}
                </p>
              </div>

              <div className="grow space-y-4 md:space-y-5 mb-8 md:mb-12">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3 md:gap-4">
                    <Check
                      className={`w-4 h-4 md:w-5 md:h-5 mt-0.5 shrink-0 ${plan.highlight ? "text-[#c9a96e]" : "text-white/20"}`}
                    />
                    <span className="text-white/60 text-sm md:text-base font-body">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full py-6 md:py-8 rounded-xl md:rounded-2xl font-bold tracking-[0.2em] text-[0.7rem] md:text-[0.75rem] uppercase transition-all ${
                  plan.highlight
                    ? "bg-[#c9a96e] hover:bg-[#e6c285] text-[#060a08]"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
