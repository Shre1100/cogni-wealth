import { AIInsights } from "@/components/AIInsights";
import { ChatInterface } from "@/components/ChatInterface";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  MessageSquare, 
  TrendingUp, 
  BarChart3,
  Target,
  Lightbulb,
  Zap,
  Eye
} from "lucide-react";

const Insights = () => {
  return (
    <div className="min-h-screen bg-background pt-4">
      <div className="container mx-auto px-4 space-y-8">
        {/* Insights Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Brain className="w-8 h-8 text-primary" />
                AI Insights
              </h1>
              <p className="text-muted-foreground">Intelligent analysis and personalized recommendations</p>
            </div>
            <Badge variant="outline" className="border-primary/20 text-primary bg-primary/10">
              <Zap className="w-3 h-3 mr-1" />
              Real-time Analysis
            </Badge>
          </div>
        </div>

        {/* AI Capabilities Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="financial-card p-6 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold">Smart Analysis</h3>
            <p className="text-sm text-muted-foreground mt-2">AI-powered market and portfolio analysis</p>
          </Card>

          <Card className="financial-card p-6 text-center">
            <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-success" />
            </div>
            <h3 className="font-semibold">Risk Assessment</h3>
            <p className="text-sm text-muted-foreground mt-2">Personalized risk profiling and recommendations</p>
          </Card>

          <Card className="financial-card p-6 text-center">
            <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-warning" />
            </div>
            <h3 className="font-semibold">Market Trends</h3>
            <p className="text-sm text-muted-foreground mt-2">Real-time sentiment and trend analysis</p>
          </Card>

          <Card className="financial-card p-6 text-center">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold">Opportunities</h3>
            <p className="text-sm text-muted-foreground mt-2">AI-discovered investment opportunities</p>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="chat">AI Advisor</TabsTrigger>
            <TabsTrigger value="explainable">Explainable AI</TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-6">
            <AIInsights />
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ChatInterface />
              </div>
              
              <div className="space-y-6">
                <Card className="financial-card p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    AI Advisor Features
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Investment Recommendations</p>
                        <p className="text-sm text-muted-foreground">Get personalized stock and ETF suggestions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Risk Analysis</p>
                        <p className="text-sm text-muted-foreground">Understand portfolio risk and diversification</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Market Insights</p>
                        <p className="text-sm text-muted-foreground">Get real-time market analysis and trends</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Educational Support</p>
                        <p className="text-sm text-muted-foreground">Learn about financial concepts and strategies</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="financial-card p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Analyze My Portfolio
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Target className="w-4 h-4 mr-2" />
                      Risk Assessment
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Market Outlook
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Investment Ideas
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="explainable" className="space-y-6">
            <Card className="financial-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Explainable AI (XAI)</h3>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 border border-border/40 rounded-lg">
                  <h4 className="font-semibold mb-3">Why did AI recommend Apple (AAPL)?</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-2 bg-success rounded-full"></div>
                      <span className="text-sm">Strong financial metrics (35% weight)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Positive market sentiment (25% weight)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-2 bg-warning rounded-full"></div>
                      <span className="text-sm">Technical indicators (20% weight)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm">Industry growth potential (20% weight)</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-border/40 rounded-lg">
                  <h4 className="font-semibold mb-3">Model Confidence Factors</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">87%</p>
                      <p className="text-sm text-muted-foreground">Overall Confidence</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-success">92%</p>
                      <p className="text-sm text-muted-foreground">Data Quality</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <h4 className="font-semibold text-warning mb-2">Important Disclaimers</h4>
                  <ul className="text-sm space-y-1 text-warning">
                    <li>• AI predictions are based on historical data and may not predict future performance</li>
                    <li>• Market conditions can change rapidly, affecting recommendation validity</li>
                    <li>• Always consult with qualified financial advisors before making investment decisions</li>
                    <li>• Consider your personal financial situation and risk tolerance</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Insights;