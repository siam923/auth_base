import { FloatingParticles } from "@/components/landing/FloatingParticles";
import { HeroSection } from "@/components/landing/HeroSection";


export default async function LandingPage() {
  return (
    <div className=" ">
      <FloatingParticles />
      <div className="container mx-auto px-4 pt-20 pb-12 relative z-10">
        <HeroSection />
      </div>
    </div>
  );
}
