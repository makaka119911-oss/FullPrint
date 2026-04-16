import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MaxelCTA } from "@/components/home/maxel-cta";
import { MaxelFeatures } from "@/components/home/maxel-features";
import { MaxelHero } from "@/components/home/maxel-hero";
import { MaxelHowItWorks } from "@/components/home/maxel-how-it-works";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      <main>
        <MaxelHero />
        <MaxelFeatures />
        <MaxelHowItWorks />
        <MaxelCTA />
      </main>
      <Footer />
    </div>
  );
}
