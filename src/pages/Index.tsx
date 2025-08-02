import { HeroSection } from "@/components/HeroSection";
import { MarketOverview } from "@/components/MarketOverview";
import { AIInsights } from "@/components/AIInsights";
import { PortfolioPreview } from "@/components/PortfolioPreview";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <MarketOverview />
      <PortfolioPreview />
      <AIInsights />
    </main>
  );
};

export default Index;
