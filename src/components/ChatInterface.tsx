import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    type: 'ai',
    content: "Hello! I'm your AI Financial Advisor. I can help you with investment decisions, portfolio analysis, risk assessment, and market insights. What would you like to know?",
    timestamp: new Date()
  }
];

const suggestedQuestions = [
  "Should I invest in Apple stock?",
  "What's a good low-risk ETF?",
  "Analyze my portfolio risk",
  "Market outlook for tech stocks"
];

export const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('apple') || input.includes('aapl')) {
      return "Apple (AAPL) is currently trading well with strong fundamentals. The company shows solid revenue growth, strong cash position, and continued innovation in services. Consider your risk tolerance and portfolio diversification before investing. Current technical indicators suggest moderate bullish sentiment.";
    } else if (input.includes('tesla') || input.includes('tsla')) {
      return "Tesla (TSLA) remains volatile but has strong long-term potential in the EV market. The stock shows high volatility and should be considered a growth investment with higher risk. Monitor production numbers and market expansion for key indicators.";
    } else if (input.includes('etf') && input.includes('low risk')) {
      return "For low-risk ETF options, consider: VTI (Total Stock Market), SPY (S&P 500), or BND (Total Bond Market). These provide broad diversification with lower volatility. Bond ETFs like BND offer stability, while VTI/SPY provide market exposure with historical steady growth.";
    } else if (input.includes('portfolio') && input.includes('risk')) {
      return "Portfolio risk analysis suggests diversifying across asset classes. For conservative investors: 60% stocks, 40% bonds. Moderate: 70% stocks, 30% bonds. Aggressive: 80-90% stocks, 10-20% bonds. Consider your age, goals, and timeline for retirement.";
    } else if (input.includes('market') && (input.includes('outlook') || input.includes('trend'))) {
      return "Current market outlook shows mixed signals. Tech stocks face headwinds from interest rates, while value stocks show resilience. Inflation concerns persist but are moderating. Consider dollar-cost averaging for long-term positions and maintain diversification across sectors.";
    } else if (input.includes('crypto') || input.includes('bitcoin')) {
      return "Cryptocurrency remains highly volatile and speculative. Only invest what you can afford to lose (typically 5-10% of portfolio maximum). Bitcoin and Ethereum are the most established, but regulatory uncertainty persists. Consider it a high-risk, high-reward asset class.";
    } else {
      return `Thank you for your question about "${userInput}". Based on current market conditions and financial principles, I recommend: conducting thorough research, considering your risk tolerance, and maintaining a diversified portfolio. This is educational information only - please consult with a qualified financial advisor for personalized advice.`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    // Generate contextual AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(currentInput),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleSuggestionClick = (question: string) => {
    setInputValue(question);
  };

  return (
    <Card className="financial-card h-[600px] flex flex-col">
      <div className="p-4 border-b border-border/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">AI Financial Advisor</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Online</span>
            </div>
          </div>
          <Badge variant="outline" className="ml-auto border-primary/20 text-primary bg-primary/10">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Powered
          </Badge>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.type === 'ai' && (
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted'
              }`}>
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
              {message.type === 'user' && (
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Suggested Questions */}
      <div className="p-4 border-t border-border/40">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(question)}
                className="text-xs"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border/40">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me about investments, risks, or market trends..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};