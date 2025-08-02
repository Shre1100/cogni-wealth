import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { MarketOverview } from "@/components/MarketOverview";
import { AIInsights } from "@/components/AIInsights";
import { PortfolioPreview } from "@/components/PortfolioPreview";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <MarketOverview />
        <PortfolioPreview />
        <AIInsights />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
