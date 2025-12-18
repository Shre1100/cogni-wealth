import { TrendingUp, Mail, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-muted/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="space-y-3 sm:space-y-4 col-span-2 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CogniWealth
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xs">
              AI-powered financial intelligence for smarter investment decisions.
            </p>
            <div className="flex gap-1 sm:gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                <Twitter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-sm sm:text-base">Features</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li><a href="/portfolio" className="hover:text-foreground transition-colors">Portfolio Tracking</a></li>
              <li><a href="/insights" className="hover:text-foreground transition-colors">AI Insights</a></li>
              <li><a href="/insights" className="hover:text-foreground transition-colors">Risk Analysis</a></li>
              <li><a href="/news" className="hover:text-foreground transition-colors">Market Data</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-sm sm:text-base">Resources</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li><a href="/documentation" className="hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="/documentation" className="hover:text-foreground transition-colors">API Reference</a></li>
              <li><a href="/help" className="hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3 sm:space-y-4 col-span-2 sm:col-span-1">
            <h3 className="font-semibold text-sm sm:text-base">Contact</h3>
            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-muted-foreground">Get in touch with our team</p>
              <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs sm:text-sm">
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
            © 2024 CogniWealth. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="/terms" className="hover:text-foreground transition-colors">Disclaimer</a>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <p className="text-[10px] sm:text-xs text-warning">
            <strong>Investment Disclaimer:</strong> This AI assistant provides general information and analysis for educational purposes only. 
            It is not intended as personalized financial advice. Please consult with qualified financial advisors before making investment decisions. 
            Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </footer>
  );
};