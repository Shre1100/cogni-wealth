import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, User, Menu, Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { NotificationsSidebar } from "@/components/NotificationsSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [notificationCount, setNotificationCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // TODO: Replace with actual notification data from backend
  useEffect(() => {
    // Mock notification data - would come from your backend
    const mockNotifications = [
      { id: '1', read: false },
      { id: '2', read: false },
      { id: '3', read: true },
      { id: '4', read: true },
      { id: '5', read: false }
    ];
    
    const unreadCount = mockNotifications.filter(n => !n.read).length;
    setNotificationCount(unreadCount);

    // Listen for notification updates
    const handleNotificationUpdate = (event: CustomEvent) => {
      setNotificationCount(event.detail.unreadCount);
    };

    window.addEventListener('notificationUpdate', handleNotificationUpdate as EventListener);
    return () => {
      window.removeEventListener('notificationUpdate', handleNotificationUpdate as EventListener);
    };
  }, []);
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleNotificationClick = () => {
    setShowNotifications(true);
  };

  const handleProfileClick = () => {
    // Navigate to profile page
    window.location.href = '/profile';
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
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative" onClick={handleNotificationClick}>
            <Bell className="h-4 w-4" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary rounded-full text-xs text-primary-foreground flex items-center justify-center animate-pulse">
                {notificationCount}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={handleProfileClick}>
            <User className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Notifications Sidebar */}
        <NotificationsSidebar 
          open={showNotifications} 
          onClose={() => setShowNotifications(false)}
          onNotificationUpdate={(unreadCount) => setNotificationCount(unreadCount)}
        />
      </div>
    </header>
  );
};