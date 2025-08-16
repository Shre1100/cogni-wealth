import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Newspaper, 
  TrendingUp, 
  TrendingDown, 
  Clock,
  Search,
  Filter,
  BookmarkPlus,
  ExternalLink,
  Brain
} from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  impact: 'high' | 'medium' | 'low';
  category: string;
  url: string;
  relatedStocks: string[];
}

// ========== BACKEND INTEGRATION POINTS ==========
// API CALLS NEEDED:
// 1. GET /news/feed - Paginated news feed with filters
// 2. GET /news/sentiment-analysis - AI sentiment analysis for news
// 3. GET /news/market-impact - Market impact predictions
// 4. POST /news/bookmark - Save/bookmark news articles
// 5. GET /news/categories - Available news categories
// 6. GET /news/sources - Available news sources
// 7. GET /news/search - Search news articles
// 8. GET /news/related-stocks - News related to user's portfolio
//
// useEffect(() => {
//   fetchNewsData();
// }, [selectedCategory, selectedSentiment, searchTerm]);
//
// const fetchNewsData = async () => {
//   try {
//     const params = new URLSearchParams({
//       category: selectedCategory,
//       sentiment: selectedSentiment,
//       search: searchTerm,
//       page: '1',
//       limit: '20'
//     });
//     const response = await fetch(`/api/news/feed?${params}`);
//     const data = await response.json();
//     setNews(data.articles);
//   } catch (error) {
//     console.error('Failed to fetch news:', error);
//   }
// };

// MOCK DATA - Replace with API calls
const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Federal Reserve Signals Potential Interest Rate Cuts',
    summary: 'Fed officials hint at possible rate reductions in the coming months amid cooling inflation data.',
    source: 'Financial Times',
    timestamp: '2 hours ago',
    sentiment: 'positive',
    impact: 'high',
    category: 'Economy',
    url: '#',
    relatedStocks: ['SPY', 'QQQ', 'BND']
  },
  {
    id: '2',
    title: 'Apple Reports Strong Q4 Earnings, Beats Estimates',
    summary: 'iPhone maker exceeds revenue expectations with robust services growth and international expansion.',
    source: 'Reuters',
    timestamp: '4 hours ago',
    sentiment: 'positive',
    impact: 'high',
    category: 'Earnings',
    url: '#',
    relatedStocks: ['AAPL', 'QQQ']
  },
  {
    id: '3',
    title: 'Renewable Energy Sector Sees Record Investment',
    summary: 'Global clean energy investments reach new highs as governments accelerate climate commitments.',
    source: 'Bloomberg',
    timestamp: '6 hours ago',
    sentiment: 'positive',
    impact: 'medium',
    category: 'Energy',
    url: '#',
    relatedStocks: ['ICLN', 'QCLN', 'PBW']
  },
  {
    id: '4',
    title: 'Tech Stocks Face Headwinds Amid Regulatory Concerns',
    summary: 'Major technology companies under scrutiny as antitrust discussions gain momentum.',
    source: 'Wall Street Journal',
    timestamp: '8 hours ago',
    sentiment: 'negative',
    impact: 'medium',
    category: 'Technology',
    url: '#',
    relatedStocks: ['GOOGL', 'META', 'AMZN']
  },
  {
    id: '5',
    title: 'Cryptocurrency Market Shows Signs of Recovery',
    summary: 'Bitcoin and major altcoins gain ground as institutional adoption continues to grow.',
    source: 'CoinDesk',
    timestamp: '10 hours ago',
    sentiment: 'positive',
    impact: 'medium',
    category: 'Crypto',
    url: '#',
    relatedStocks: ['COIN', 'MSTR']
  }
];

const getSentimentIcon = (sentiment: string) => {
  switch (sentiment) {
    case 'positive':
      return <TrendingUp className="w-4 h-4 text-success" />;
    case 'negative':
      return <TrendingDown className="w-4 h-4 text-decline" />;
    default:
      return <div className="w-4 h-4 bg-muted rounded-full" />;
  }
};

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case 'positive':
      return 'border-success/30 text-success bg-success/10';
    case 'negative':
      return 'border-decline/30 text-decline bg-decline/10';
    default:
      return 'border-muted/30 text-muted-foreground bg-muted/10';
  }
};

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'high':
      return 'border-decline/30 text-decline bg-decline/10';
    case 'medium':
      return 'border-warning/30 text-warning bg-warning/10';
    case 'low':
      return 'border-muted/30 text-muted-foreground bg-muted/10';
    default:
      return 'border-muted/30 text-muted-foreground bg-muted/10';
  }
};

const News = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSentiment, setSelectedSentiment] = useState("all");

  const filteredNews = mockNews.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSentiment = selectedSentiment === "all" || item.sentiment === selectedSentiment;
    
    return matchesSearch && matchesCategory && matchesSentiment;
  });

  return (
    <div className="min-h-screen bg-background pt-4">
      <div className="container mx-auto px-4 space-y-8">
        {/* News Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Newspaper className="w-8 h-8 text-primary" />
                Financial News
              </h1>
              <p className="text-muted-foreground">AI-powered news analysis and market sentiment</p>
            </div>
            <Badge variant="outline" className="border-primary/20 text-primary bg-primary/10">
              <Brain className="w-3 h-3 mr-1" />
              AI Analyzed
            </Badge>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search financial news..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Popover open={showFilters} onOpenChange={setShowFilters}>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="earnings">Earnings</SelectItem>
                        <SelectItem value="economy">Economy</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="energy">Energy</SelectItem>
                        <SelectItem value="crypto">Crypto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sentiment</label>
                    <Select value={selectedSentiment} onValueChange={setSelectedSentiment}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sentiment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sentiment</SelectItem>
                        <SelectItem value="positive">Positive</SelectItem>
                        <SelectItem value="negative">Negative</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedSentiment("all");
                      setSearchTerm("");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* News Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="financial-card p-6 text-center">
            <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <h3 className="font-semibold text-lg">Market Sentiment</h3>
            <p className="text-2xl font-bold text-success">Bullish</p>
            <p className="text-sm text-muted-foreground">68% positive news</p>
          </Card>

          <Card className="financial-card p-6 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Latest Updates</h3>
            <p className="text-2xl font-bold text-primary">24</p>
            <p className="text-sm text-muted-foreground">Last 24 hours</p>
          </Card>

          <Card className="financial-card p-6 text-center">
            <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Newspaper className="w-6 h-6 text-warning" />
            </div>
            <h3 className="font-semibold text-lg">High Impact</h3>
            <p className="text-2xl font-bold text-warning">7</p>
            <p className="text-sm text-muted-foreground">Market moving news</p>
          </Card>
        </div>

        {/* News Content */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All News</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="economy">Economy</TabsTrigger>
            <TabsTrigger value="technology">Tech</TabsTrigger>
            <TabsTrigger value="energy">Energy</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="space-y-4">
              {filteredNews.map((item) => (
                <Card key={item.id} className="financial-card p-6 hover:border-primary/30 transition-all">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg hover:text-primary cursor-pointer transition-colors">
                            {item.title}
                          </h3>
                          <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer" />
                        </div>
                        <p className="text-muted-foreground">{item.summary}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="font-medium">{item.source}</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.timestamp}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3 items-end">
                        <Button variant="ghost" size="icon">
                          <BookmarkPlus className="w-4 h-4" />
                        </Button>
                        
                        <div className="flex gap-2">
                          <Badge variant="outline" className={getSentimentColor(item.sentiment)}>
                            {getSentimentIcon(item.sentiment)}
                            <span className="ml-1 capitalize">{item.sentiment}</span>
                          </Badge>
                          
                          <Badge variant="outline" className={getImpactColor(item.impact)}>
                            {item.impact} impact
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {item.relatedStocks.length > 0 && (
                      <div className="pt-3 border-t border-border/40">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Related:</span>
                          <div className="flex gap-2">
                            {item.relatedStocks.map((stock) => (
                              <Badge key={stock} variant="secondary" className="text-xs">
                                {stock}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            <div className="space-y-4">
              {mockNews.filter(item => item.category === 'Earnings').map((item) => (
                <Card key={item.id} className="financial-card p-6 hover:border-primary/30 transition-all">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg hover:text-primary cursor-pointer transition-colors">
                            {item.title}
                          </h3>
                          <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer" />
                        </div>
                        <p className="text-muted-foreground">{item.summary}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="font-medium">{item.source}</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.timestamp}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3 items-end">
                        <Button variant="ghost" size="icon">
                          <BookmarkPlus className="w-4 h-4" />
                        </Button>
                        
                        <div className="flex gap-2">
                          <Badge variant="outline" className={getSentimentColor(item.sentiment)}>
                            {getSentimentIcon(item.sentiment)}
                            <span className="ml-1 capitalize">{item.sentiment}</span>
                          </Badge>
                          
                          <Badge variant="outline" className={getImpactColor(item.impact)}>
                            {item.impact} impact
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {item.relatedStocks.length > 0 && (
                      <div className="pt-3 border-t border-border/40">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Related:</span>
                          <div className="flex gap-2">
                            {item.relatedStocks.map((stock) => (
                              <Badge key={stock} variant="secondary" className="text-xs">
                                {stock}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Economy Tab */}
          <TabsContent value="economy" className="space-y-6">
            <div className="space-y-4">
              {mockNews.filter(item => item.category === 'Economy').map((item) => (
                <Card key={item.id} className="financial-card p-6 hover:border-primary/30 transition-all">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg hover:text-primary cursor-pointer transition-colors">
                            {item.title}
                          </h3>
                          <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer" />
                        </div>
                        <p className="text-muted-foreground">{item.summary}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="font-medium">{item.source}</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.timestamp}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3 items-end">
                        <Button variant="ghost" size="icon">
                          <BookmarkPlus className="w-4 h-4" />
                        </Button>
                        
                        <div className="flex gap-2">
                          <Badge variant="outline" className={getSentimentColor(item.sentiment)}>
                            {getSentimentIcon(item.sentiment)}
                            <span className="ml-1 capitalize">{item.sentiment}</span>
                          </Badge>
                          
                          <Badge variant="outline" className={getImpactColor(item.impact)}>
                            {item.impact} impact
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {item.relatedStocks.length > 0 && (
                      <div className="pt-3 border-t border-border/40">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Related:</span>
                          <div className="flex gap-2">
                            {item.relatedStocks.map((stock) => (
                              <Badge key={stock} variant="secondary" className="text-xs">
                                {stock}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Technology Tab */}
          <TabsContent value="technology" className="space-y-6">
            <div className="space-y-4">
              {mockNews.filter(item => item.category === 'Technology').map((item) => (
                <Card key={item.id} className="financial-card p-6 hover:border-primary/30 transition-all">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg hover:text-primary cursor-pointer transition-colors">
                            {item.title}
                          </h3>
                          <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer" />
                        </div>
                        <p className="text-muted-foreground">{item.summary}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="font-medium">{item.source}</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.timestamp}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3 items-end">
                        <Button variant="ghost" size="icon">
                          <BookmarkPlus className="w-4 h-4" />
                        </Button>
                        
                        <div className="flex gap-2">
                          <Badge variant="outline" className={getSentimentColor(item.sentiment)}>
                            {getSentimentIcon(item.sentiment)}
                            <span className="ml-1 capitalize">{item.sentiment}</span>
                          </Badge>
                          
                          <Badge variant="outline" className={getImpactColor(item.impact)}>
                            {item.impact} impact
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {item.relatedStocks.length > 0 && (
                      <div className="pt-3 border-t border-border/40">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Related:</span>
                          <div className="flex gap-2">
                            {item.relatedStocks.map((stock) => (
                              <Badge key={stock} variant="secondary" className="text-xs">
                                {stock}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Energy Tab */}
          <TabsContent value="energy" className="space-y-6">
            <div className="space-y-4">
              {mockNews.filter(item => item.category === 'Energy').map((item) => (
                <Card key={item.id} className="financial-card p-6 hover:border-primary/30 transition-all">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg hover:text-primary cursor-pointer transition-colors">
                            {item.title}
                          </h3>
                          <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer" />
                        </div>
                        <p className="text-muted-foreground">{item.summary}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="font-medium">{item.source}</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.timestamp}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3 items-end">
                        <Button variant="ghost" size="icon">
                          <BookmarkPlus className="w-4 h-4" />
                        </Button>
                        
                        <div className="flex gap-2">
                          <Badge variant="outline" className={getSentimentColor(item.sentiment)}>
                            {getSentimentIcon(item.sentiment)}
                            <span className="ml-1 capitalize">{item.sentiment}</span>
                          </Badge>
                          
                          <Badge variant="outline" className={getImpactColor(item.impact)}>
                            {item.impact} impact
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {item.relatedStocks.length > 0 && (
                      <div className="pt-3 border-t border-border/40">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Related:</span>
                          <div className="flex gap-2">
                            {item.relatedStocks.map((stock) => (
                              <Badge key={stock} variant="secondary" className="text-xs">
                                {stock}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default News;
