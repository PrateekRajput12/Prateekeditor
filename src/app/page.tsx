import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";

// Below-fold sections — lazy loaded to keep initial bundle lean
const FeaturedReel = dynamic(() => import("@/components/sections/FeaturedReel"));
const VideoShowcase = dynamic(() => import("@/components/sections/VideoShowcase"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Pricing = dynamic(() => import("@/components/sections/Pricing"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Marquee />
        <Stats />
        <Services />
        <FeaturedReel />
        <VideoShowcase />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
