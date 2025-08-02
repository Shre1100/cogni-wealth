import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: string;
}

const mockMarketData: MarketData[] = [
  { symbol: "AAPL", name: "Apple Inc.", price: 175.43, change: 2.15, changePercent: 1.24, volume: "52.3M" },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 345.67, change: -1.23, changePercent: -0.35, volume: "28.1M" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 128.92, change: 0.87, changePercent: 0.68, volume: "31.8M" },
  { symbol: "TSLA", name: "Tesla Inc.", price: 238.45, change: -5.21, changePercent: -2.14, volume: "89.2M" },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 432.10, change: 8.34, changePercent: 1.97, volume: "45.6M" },
  { symbol: "SPY", name: "SPDR S&P 500", price: 428.73, change: 1.45, changePercent: 0.34, volume: "67.4M" },
];

const getTrendIcon = (change: number) => {
  if (change > 0) return <TrendingUp className="w-4 h-4 text-success" />;
  if (change < 0) return <TrendingDown className="w-4 h-4 text-decline" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
};

const getChangeColor = (change: number) => {
  if (change > 0) return "text-success";
  if (change < 0) return "text-decline";
  return "text-muted-foreground";
};

export const MarketOverview = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Market Overview</h2>
              <p className="text-muted-foreground mt-2">Real-time market data and trends</p>
            </div>
            <Badge variant="outline" className="border-primary/20 text-primary bg-primary/10">
              Live Data
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockMarketData.map((stock) => (
              <Card key={stock.symbol} className="financial-card p-4 hover:border-primary/30 transition-all">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{stock.symbol}</span>
                      {getTrendIcon(stock.change)}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${stock.price.toFixed(2)}</p>
                    <div className="flex items-center gap-1">
                      <span className={`text-sm font-medium ${getChangeColor(stock.change)}`}>
                        {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}
                      </span>
                      <span className={`text-xs ${getChangeColor(stock.change)}`}>
                        ({stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </div>
                {stock.volume && (
                  <div className="mt-3 pt-3 border-t border-border/40">
                    <p className="text-xs text-muted-foreground">
                      Volume: <span className="font-medium">{stock.volume}</span>
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};