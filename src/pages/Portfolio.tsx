import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target,
  Plus,
  Settings,
  Download,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Portfolio = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // ========== BACKEND INTEGRATION POINTS ==========
  // API CALLS NEEDED:
  // 1. GET /portfolio/holdings - User's current stock holdings
  // 2. GET /portfolio/performance - Historical performance data
  // 3. GET /portfolio/allocation - Asset allocation breakdown
  // 4. GET /market/prices - Real-time price updates for holdings
  // 5. POST /portfolio/export - Export portfolio data to PDF/CSV
  // 6. POST /portfolio/positions - Add new stock position
  // 7. PUT /portfolio/positions/{id} - Update existing position
  // 8. DELETE /portfolio/positions/{id} - Remove position
  //
  // const [holdings, setHoldings] = useState([]);
  // const [loading, setLoading] = useState(true);
  //
  // useEffect(() => {
  //   fetchPortfolioData();
  // }, []);
  //
  // const fetchPortfolioData = async () => {
  //   try {
  //     const response = await fetch('/api/portfolio/holdings');
  //     const data = await response.json();
  //     setHoldings(data.holdings);
  //   } catch (error) {
  //     toast({ title: "Error", description: "Failed to load portfolio data" });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  // MOCK DATA - Replace with API calls
  const holdings = [
    { symbol: "AAPL", name: "Apple Inc.", shares: 50, avgPrice: 145.30, currentPrice: 175.43, value: 8771.50 },
    { symbol: "MSFT", name: "Microsoft Corp.", shares: 25, avgPrice: 320.50, currentPrice: 345.67, value: 8641.75 },
    { symbol: "GOOGL", name: "Alphabet Inc.", shares: 15, avgPrice: 118.75, currentPrice: 128.92, value: 1933.80 },
    { symbol: "TSLA", name: "Tesla Inc.", shares: 20, avgPrice: 245.80, currentPrice: 238.45, value: 4769.00 },
    { symbol: "VOO", name: "Vanguard S&P 500 ETF", shares: 100, avgPrice: 380.25, currentPrice: 428.73, value: 42873.00 },
  ];

  const getTotalValue = () => holdings.reduce((sum, holding) => sum + holding.value, 0);
  const getTotalGainLoss = () => holdings.reduce((sum, holding) => 
    sum + ((holding.currentPrice - holding.avgPrice) * holding.shares), 0);

  const getHoldingGainLoss = (holding: typeof holdings[0]) => {
    const gainLoss = (holding.currentPrice - holding.avgPrice) * holding.shares;
    const percentage = ((holding.currentPrice - holding.avgPrice) / holding.avgPrice) * 100;
    return { gainLoss, percentage };
  };

  const handleExport = async () => {
    // ========== BACKEND INTEGRATION POINT ==========
    // API CALL NEEDED: POST /portfolio/export
    // PAYLOAD: { format: 'pdf' | 'csv', includeCharts: boolean }
    // EXPECTED RESPONSE: { downloadUrl: string } or direct file stream
    //
    // try {
    //   const response = await fetch('/api/portfolio/export', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ format: 'pdf', includeCharts: true })
    //   });
    //   const blob = await response.blob();
    //   const url = window.URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   a.href = url;
    //   a.download = 'portfolio-export.pdf';
    //   a.click();
    // } catch (error) {
    //   toast({ title: "Export Failed", description: error.message, variant: "destructive" });
    // }
    
    toast({
      title: "Exporting Portfolio",
      description: "Your portfolio data is being exported...",
    });
  };

  const handleAddPosition = () => {
    // ========== BACKEND INTEGRATION POINT ==========
    // API CALL NEEDED: POST /portfolio/positions
    // PAYLOAD: { symbol: string, shares: number, purchasePrice: number, purchaseDate: string }
    // EXPECTED RESPONSE: { position: {...}, portfolio: {...} }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/dashboard');
  };

  const handleViewCharts = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/insights');
  };

  return (
    <div className="min-h-screen bg-background pt-4">
      <div className="container mx-auto px-4 space-y-8">
        {/* Portfolio Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Portfolio</h1>
            <p className="text-muted-foreground">Track and manage your investments</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="financial" onClick={handleAddPosition}>
              <Plus className="w-4 h-4 mr-2" />
              Add Position
            </Button>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="financial-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total Value</span>
            </div>
            <p className="text-3xl font-bold">${getTotalValue().toLocaleString()}</p>
          </Card>

          <Card className="financial-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-success" />
              <span className="text-sm text-muted-foreground">Total Gain/Loss</span>
            </div>
            <p className="text-3xl font-bold text-success">+${getTotalGainLoss().toLocaleString()}</p>
            <p className="text-sm text-success">+{((getTotalGainLoss() / getTotalValue()) * 100).toFixed(2)}%</p>
          </Card>

          <Card className="financial-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-warning" />
              <span className="text-sm text-muted-foreground">Risk Score</span>
            </div>
            <p className="text-3xl font-bold text-warning">6.7</p>
            <Badge variant="outline" className="border-warning/30 text-warning mt-1">
              Moderate
            </Badge>
          </Card>

          <Card className="financial-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <PieChart className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">Positions</span>
            </div>
            <p className="text-3xl font-bold text-accent">{holdings.length}</p>
            <p className="text-sm text-muted-foreground">Active holdings</p>
          </Card>
        </div>

        {/* Portfolio Tabs */}
        <Tabs defaultValue="holdings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="holdings" className="space-y-4">
            <Card className="financial-card">
              <div className="p-6 border-b border-border/40">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Current Holdings</h3>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {holdings.map((holding) => {
                    const { gainLoss, percentage } = getHoldingGainLoss(holding);
                    const isPositive = gainLoss >= 0;
                    
                    return (
                      <div key={holding.symbol} className="p-4 border border-border/40 rounded-lg hover:bg-card-hover transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-lg">{holding.symbol}</span>
                              {isPositive ? (
                                <TrendingUp className="w-4 h-4 text-success" />
                              ) : (
                                <TrendingDown className="w-4 h-4 text-decline" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{holding.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {holding.shares} shares @ ${holding.avgPrice.toFixed(2)} avg
                            </p>
                          </div>
                          
                          <div className="text-right space-y-1">
                            <p className="font-bold text-lg">${holding.value.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">
                              ${holding.currentPrice.toFixed(2)}
                            </p>
                            <div className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-decline'}`}>
                              {isPositive ? '+' : ''}${gainLoss.toFixed(2)} ({percentage.toFixed(2)}%)
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="allocation" className="space-y-4">
            <Card className="financial-card p-6">
              <h3 className="text-xl font-semibold mb-6">Asset Allocation</h3>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Individual Stocks</span>
                    <span className="text-sm text-muted-foreground">68.2%</span>
                  </div>
                  <Progress value={68.2} className="h-3" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">ETFs</span>
                    <span className="text-sm text-muted-foreground">28.6%</span>
                  </div>
                  <Progress value={28.6} className="h-3" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Cash</span>
                    <span className="text-sm text-muted-foreground">3.2%</span>
                  </div>
                  <Progress value={3.2} className="h-3" />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card className="financial-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Performance Analytics</h3>
                <Button variant="outline" size="sm" onClick={handleViewCharts}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Charts
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border border-border/40 rounded-lg">
                  <p className="text-sm text-muted-foreground">1 Day Return</p>
                  <p className="text-2xl font-bold text-success">+1.24%</p>
                </div>
                
                <div className="text-center p-4 border border-border/40 rounded-lg">
                  <p className="text-sm text-muted-foreground">1 Month Return</p>
                  <p className="text-2xl font-bold text-success">+5.67%</p>
                </div>
                
                <div className="text-center p-4 border border-border/40 rounded-lg">
                  <p className="text-sm text-muted-foreground">YTD Return</p>
                  <p className="text-2xl font-bold text-success">+18.92%</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Portfolio;