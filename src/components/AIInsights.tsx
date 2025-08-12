import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, MessageSquare, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface InsightItem {
  id: string;
  type: 'recommendation' | 'warning' | 'opportunity';
  title: string;
  description: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
}

const mockInsights: InsightItem[] = [
  {
    id: '1',
    type: 'recommendation',
    title: 'Consider Tech Diversification',
    description: 'Your portfolio is 65% tech-heavy. Consider adding healthcare or consumer staples for better risk distribution.',
    confidence: 87,
    priority: 'high'
  },
  {
    id: '2',
    type: 'opportunity',
    title: 'Green Energy Sector Surge',
    description: 'AI analysis shows 73% probability of renewable energy ETFs outperforming in Q2 2024.',
    confidence: 73,
    priority: 'medium'
  },
  {
    id: '3',
    type: 'warning',
    title: 'Market Volatility Alert',
    description: 'Increased volatility detected in semiconductor stocks. Consider setting stop-loss orders.',
    confidence: 91,
    priority: 'high'
  }
];

const getInsightIcon = (type: string) => {
  switch (type) {
    case 'recommendation':
      return <Lightbulb className="w-5 h-5 text-primary" />;
    case 'warning':
      return <AlertTriangle className="w-5 h-5 text-warning" />;
    case 'opportunity':
      return <TrendingUp className="w-5 h-5 text-success" />;
    default:
      return <Brain className="w-5 h-5 text-muted-foreground" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-decline/20 text-decline border-decline/30';
    case 'medium':
      return 'bg-warning/20 text-warning border-warning/30';
    case 'low':
      return 'bg-muted/20 text-muted-foreground border-muted/30';
    default:
      return 'bg-muted/20 text-muted-foreground border-muted/30';
  }
};

export const AIInsights = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(path);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-transparent to-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Brain className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">AI Financial Insights</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI analyzes market trends, your portfolio, and global financial data to provide 
              personalized insights and recommendations.
            </p>
          </div>

          <div className="grid gap-6">
            {mockInsights.map((insight) => (
              <Card key={insight.id} className="financial-card p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-lg">{insight.title}</h3>
                        <p className="text-muted-foreground mt-1">{insight.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getPriorityColor(insight.priority)}>
                          {insight.priority} priority
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                          AI Confidence: 
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary to-success transition-all duration-500"
                              style={{ width: `${insight.confidence}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{insight.confidence}%</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="premium" size="lg" className="group" onClick={() => handleNavigation('/insights')}>
              <MessageSquare className="w-5 h-5 mr-2" />
              Chat with AI Advisor
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};