"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "#" },
    { name: "ABOUT", href: "#about" },
    { name: "SERVICES", href: "#services" },
    { name: "FEATURES", href: "#features" },
    { name: "TEAM", href: "#team" },
    { name: "PRICING", href: "#pricing" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-1000 transition-all duration-500 ease-in-out px-[5%] py-4",
        isScrolled
          ? "bg-[#060a08]/85 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent",
      )}
    >
      <div className="max-w-300 mx-auto flex items-center justify-between">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-3 group relative">
          <div className="relative w-8 h-8 md:w-10 md:h-10">
            <Image
              src="/logo.png"
              alt="RECYVRA Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="font-headline text-xl md:text-2xl font-bold tracking-[0.05em] text-[#f5f0e8] group-hover:text-[#c9a96e] transition-colors duration-300 uppercase">
            RECYVRA
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[#f5f0e8]/60 hover:text-[#f5f0e8] text-[0.7rem] font-bold tracking-[0.18em] transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA Button & Mobile Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              document
                .getElementById("pricing")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="hidden sm:block px-6 py-2.5 rounded-full border border-white/20 text-[0.7rem] font-bold tracking-widest text-[#f5f0e8] bg-white/5 hover:bg-[#2d5f4f] hover:border-[#2d5f4f] transition-all duration-300 backdrop-blur-md"
          >
            GET STARTED
          </button>

          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="lg:hidden p-2 text-[#f5f0e8] hover:bg-white/5 rounded-lg transition-colors">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#060a08]/95 border-white/10 text-[#f5f0e8] backdrop-blur-2xl"
            >
              <div className="flex flex-col gap-8 mt-12">
                <Link href="/" className="flex items-center gap-3 mb-4">
                  <div className="relative w-8 h-8">
                    <Image
                      src="/logo.png"
                      alt="RECYVRA Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-headline text-2xl font-bold tracking-[0.05em] text-[#f5f0e8] uppercase">
                    RECYVRA
                  </span>
                </Link>
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xl font-headline tracking-widest hover:text-[#c9a96e] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <button
                    onClick={() =>
                      document
                        .getElementById("pricing")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="w-full mt-4 px-8 py-4 rounded-full bg-[#c9a96e] text-[#060a08] font-bold tracking-[0.2em] text-[0.8rem]"
                  >
                    GET STARTED
                  </button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
