import BgGradient from "@/components/common/bg-gradient";
import CTA from "@/components/home/cta";
import Demo from "@/components/home/demo";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";
import Pricing from "@/components/home/pricing";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
        <Hero />
      </div>
      <Demo />
      <HowItWorks />
      <Pricing />
      <CTA />
    </div>
  );
}
