import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, User, Menu, Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CogniWealth
            </h1>
            <Badge variant="secondary" className="ml-2 hidden sm:inline-flex">
              AI-Powered
            </Badge>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/dashboard" 
            className={`text-sm font-medium transition-colors ${
              isActive('/dashboard') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Dashboard
          </Link>
          <Link 
            to="/portfolio" 
            className={`text-sm font-medium transition-colors ${
              isActive('/portfolio') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Portfolio
          </Link>
          <Link 
            to="/insights" 
            className={`text-sm font-medium transition-colors ${
              isActive('/insights') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            AI Insights
          </Link>
          <Link 
            to="/news" 
            className={`text-sm font-medium transition-colors ${
              isActive('/news') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            News
          </Link>
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