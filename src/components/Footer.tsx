import { TrendingUp, Mail, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-muted/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CogniWealth
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              AI-powered financial intelligence for smarter investment decisions.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/portfolio" className="hover:text-foreground transition-colors">Portfolio Tracking</a></li>
              <li><a href="/insights" className="hover:text-foreground transition-colors">AI Insights</a></li>
              <li><a href="/insights" className="hover:text-foreground transition-colors">Risk Analysis</a></li>
              <li><a href="/news" className="hover:text-foreground transition-colors">Market Data</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/documentation" className="hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="/documentation" className="hover:text-foreground transition-colors">API Reference</a></li>
              <li><a href="/help" className="hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Get in touch with our team</p>
              <Button variant="outline" size="sm" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 CogniWealth. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="/terms" className="hover:text-foreground transition-colors">Disclaimer</a>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <p className="text-xs text-warning">
            <strong>Investment Disclaimer:</strong> This AI assistant provides general information and analysis for educational purposes only. 
            It is not intended as personalized financial advice. Please consult with qualified financial advisors before making investment decisions. 
            Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </footer>
  );
};