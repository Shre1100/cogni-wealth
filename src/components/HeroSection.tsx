import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Shield, Brain, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(path);
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-success/5"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="relative container mx-auto max-w-6xl">
        <div className="text-center space-y-8 fade-in">
          <div className="space-y-4">
            <Badge variant="outline" className="border-primary/20 text-primary bg-primary/10">
              <Brain className="w-3 h-3 mr-1" />
              AI-Powered Financial Intelligence
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Your{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent">
                AI Financial
              </span>
              <br />
              Assistant
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Make smarter investment decisions with real-time market data, AI-driven insights, 
              and personalized portfolio recommendations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="xl" className="group" onClick={() => handleNavigation('/signup')}>
              Start Investing Smart
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" onClick={() => handleNavigation('/portfolio')}>
              Try Demo Portfolio
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 slide-up">
            <Card className="financial-card p-6 text-center space-y-4 group">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto group-hover:bg-primary/30 transition-colors">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Real-Time Analytics</h3>
              <p className="text-muted-foreground">
                Live market data and advanced charting with AI-powered trend analysis
              </p>
            </Card>

            <Card className="financial-card p-6 text-center space-y-4 group">
              <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto group-hover:bg-success/30 transition-colors">
                <Brain className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-xl font-semibold">AI Advisor</h3>
              <p className="text-muted-foreground">
                Personalized investment recommendations based on your risk profile
              </p>
            </Card>

            <Card className="financial-card p-6 text-center space-y-4 group">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto group-hover:bg-accent/30 transition-colors">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Risk Management</h3>
              <p className="text-muted-foreground">
                Advanced portfolio analysis with diversification insights
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};