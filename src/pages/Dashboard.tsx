import { MarketOverview } from "@/components/MarketOverview";
import { PortfolioPreview } from "@/components/PortfolioPreview";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, PieChart, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // ========== BACKEND INTEGRATION POINTS ==========
  // API CALLS NEEDED:
  // 1. GET /dashboard/summary - Portfolio value, P&L, positions count
  // 2. GET /portfolio/performance - Real-time performance metrics
  // 3. GET /market/overview - Market indices and trending stocks
  // 4. GET /user/profile - User preferences and settings
  // 5. GET /alerts/active - Active price alerts and notifications
  //
  // useEffect(() => {
  //   fetchDashboardData();
  // }, []);
  //
  // const fetchDashboardData = async () => {
  //   try {
  //     const [summary, performance, market] = await Promise.all([
  //       fetch('/api/dashboard/summary'),
  //       fetch('/api/portfolio/performance'),
  //       fetch('/api/market/overview')
  //     ]);
  //     // Update state with fetched data
  //   } catch (error) {
  //     console.error('Failed to fetch dashboard data:', error);
  //   }
  // };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'buy':
        // API CALL NEEDED: GET /trading/available-stocks
        console.log('Navigate to buy stocks page');
        break;
      case 'analyze':
        navigate('/insights');
        break;
      case 'rebalance':
        // API CALL NEEDED: POST /portfolio/rebalance-suggestions
        navigate('/portfolio');
        break;
      case 'ai-advice':
        navigate('/insights');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-4">
      <div className="container mx-auto px-4 space-y-8">
        {/* Dashboard Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Your financial overview at a glance</p>
            </div>
            <Badge variant="outline" className="border-primary/20 text-primary bg-primary/10">
              <Activity className="w-3 h-3 mr-1" />
              Live Updates
            </Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="financial-card p-6 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Portfolio Value</h3>
            <p className="text-2xl font-bold text-primary">$150,000</p>
            <p className="text-sm text-success">+$12,450 (9.06%)</p>
          </Card>

          <Card className="financial-card p-6 text-center">
            <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-success" />
            </div>
            <h3 className="font-semibold text-lg">Today's P&L</h3>
            <p className="text-2xl font-bold text-success">+$2,340</p>
            <p className="text-sm text-success">+1.58%</p>
          </Card>

          <Card className="financial-card p-6 text-center">
            <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <PieChart className="w-6 h-6 text-warning" />
            </div>
            <h3 className="font-semibold text-lg">Asset Classes</h3>
            <p className="text-2xl font-bold text-warning">6</p>
            <p className="text-sm text-muted-foreground">Well diversified</p>
          </Card>

          <Card className="financial-card p-6 text-center">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Activity className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold text-lg">Open Positions</h3>
            <p className="text-2xl font-bold text-accent">24</p>
            <p className="text-sm text-muted-foreground">Active trades</p>
          </Card>
        </div>

        {/* Market Overview Section */}
        <MarketOverview />

        {/* Portfolio Preview */}
        <PortfolioPreview />

        {/* Quick Actions */}
        <Card className="financial-card p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="financial" className="h-16 flex-col" onClick={() => handleQuickAction('buy')}>
              <TrendingUp className="w-5 h-5 mb-1" />
              Buy Stock
            </Button>
            <Button variant="outline" className="h-16 flex-col" onClick={() => handleQuickAction('analyze')}>
              <BarChart3 className="w-5 h-5 mb-1" />
              Analyze
            </Button>
            <Button variant="outline" className="h-16 flex-col" onClick={() => handleQuickAction('rebalance')}>
              <PieChart className="w-5 h-5 mb-1" />
              Rebalance
            </Button>
            <Button variant="success" className="h-16 flex-col" onClick={() => handleQuickAction('ai-advice')}>
              <Activity className="w-5 h-5 mb-1" />
              AI Advice
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;