import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PieChart, BarChart3, TrendingUp, Wallet, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PortfolioAllocation {
  category: string;
  percentage: number;
  value: number;
  color: string;
}

// ========== BACKEND INTEGRATION POINTS ==========
// API CALLS NEEDED:
// 1. GET /portfolio/summary - Portfolio value, gains, risk score
// 2. GET /portfolio/allocation - Asset allocation by sector/category
// 3. GET /portfolio/diversification-score - Portfolio diversification analysis
// 4. GET /portfolio/performance/daily - Daily performance metrics
//
// useEffect(() => {
//   fetchPortfolioPreview();
// }, []);
//
// const fetchPortfolioPreview = async () => {
//   try {
//     const [summary, allocation] = await Promise.all([
//       fetch('/api/portfolio/summary'),
//       fetch('/api/portfolio/allocation')
//     ]);
//     const summaryData = await summary.json();
//     const allocationData = await allocation.json();
//     setTotalValue(summaryData.totalValue);
//     setTotalGain(summaryData.totalGain);
//     setPortfolioAllocation(allocationData.allocation);
//   } catch (error) {
//     console.error('Failed to fetch portfolio preview:', error);
//   }
// };

// MOCK DATA - Replace with API calls
const mockPortfolio: PortfolioAllocation[] = [
  { category: "Technology", percentage: 35, value: 52500, color: "hsl(var(--chart-1))" },
  { category: "Healthcare", percentage: 20, value: 30000, color: "hsl(var(--chart-2))" },
  { category: "Finance", percentage: 15, value: 22500, color: "hsl(var(--chart-3))" },
  { category: "Consumer", percentage: 15, value: 22500, color: "hsl(var(--chart-4))" },
  { category: "Energy", percentage: 10, value: 15000, color: "hsl(var(--chart-5))" },
  { category: "Real Estate", percentage: 5, value: 7500, color: "hsl(var(--accent))" },
];

const totalValue = 150000;
const totalGain = 12450;
const totalGainPercent = 9.06;

export const PortfolioPreview = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(path);
  };

  return (
    <section className="py-10 sm:py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-6 sm:space-y-8">
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Wallet className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Portfolio Overview</h2>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
              Track your investments with real-time performance metrics and AI-powered insights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Portfolio Value */}
            <Card className="financial-card p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Portfolio Value</p>
                <p className="text-2xl sm:text-3xl font-bold">${totalValue.toLocaleString()}</p>
              </div>
            </Card>

            {/* Total Gain */}
            <Card className="financial-card p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-success" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Gain</p>
                <p className="text-2xl sm:text-3xl font-bold text-success">+${totalGain.toLocaleString()}</p>
                <p className="text-xs sm:text-sm text-success">+{totalGainPercent}%</p>
              </div>
            </Card>

            {/* Risk Score */}
            <Card className="financial-card p-4 sm:p-6 text-center space-y-3 sm:space-y-4 sm:col-span-2 md:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-warning/20 rounded-lg flex items-center justify-center mx-auto">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-warning" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Risk Score</p>
                <p className="text-2xl sm:text-3xl font-bold text-warning">6.7</p>
                <Badge variant="outline" className="border-warning/30 text-warning text-xs">
                  Moderate Risk
                </Badge>
              </div>
            </Card>
          </div>

          {/* Asset Allocation */}
          <Card className="financial-card p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                  <PieChart className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  Asset Allocation
                </h3>
                <Button variant="outline" size="sm" className="w-fit text-xs sm:text-sm" onClick={() => handleNavigation('/insights')}>
                  <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  View Analytics
                </Button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {mockPortfolio.map((allocation) => (
                  <div key={allocation.category} className="space-y-1.5 sm:space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div 
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: allocation.color }}
                        />
                        <span className="font-medium">{allocation.category}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-4">
                        <span className="text-muted-foreground hidden xs:inline">
                          ${allocation.value.toLocaleString()}
                        </span>
                        <span className="font-medium w-10 sm:w-12 text-right">
                          {allocation.percentage}%
                        </span>
                      </div>
                    </div>
                    <Progress 
                      value={allocation.percentage} 
                      className="h-1.5 sm:h-2" 
                      style={{ 
                        background: 'hsl(var(--muted))',
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="pt-3 sm:pt-4 border-t border-border/40">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-medium">Diversification Score</span>
                  <div className="flex items-center gap-2">
                    <Progress value={78} className="w-16 sm:w-20 h-1.5 sm:h-2" />
                    <span className="font-medium text-primary">78/100</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="text-center">
            <Button variant="financial" size="lg" className="text-sm sm:text-base" onClick={() => handleNavigation('/portfolio')}>
              View Full Portfolio
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};