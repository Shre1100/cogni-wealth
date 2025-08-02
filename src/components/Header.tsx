import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, User, Menu, Bell } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CogniWealth
            </h1>
            <Badge variant="secondary" className="ml-2 hidden sm:inline-flex">
              AI-Powered
            </Badge>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </a>
          <a href="#portfolio" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Portfolio
          </a>
          <a href="#insights" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            AI Insights
          </a>
          <a href="#news" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            News
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full animate-pulse"></span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};