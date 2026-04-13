import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Technology } from "@/components/sections/Technology";
import { Philosophy } from "@/components/sections/Philosophy";
import { PlatformFeatures } from "@/components/sections/PlatformFeatures";
import { AISection } from "@/components/sections/AISection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { PageLoader } from "@/components/sections/PageLoader";
import { Team } from "@/components/sections/Team";

export default function Home() {
  return (
    <main className="relative bg-[#060a08] min-h-screen">
      <PageLoader />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Technology />
      <Philosophy />
      <PlatformFeatures />
      <AISection />
      <HowItWorks />
      <Team />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
