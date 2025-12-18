import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, User, Menu, Bell, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { NotificationsSidebar } from "@/components/NotificationsSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

export const Header = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [notificationCount, setNotificationCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const mockNotifications = [
      { id: '1', read: false },
      { id: '2', read: false },
      { id: '3', read: true },
      { id: '4', read: true },
      { id: '5', read: false }
    ];
    
    const unreadCount = mockNotifications.filter(n => !n.read).length;
    setNotificationCount(unreadCount);

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
    window.location.href = '/profile';
  };

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/insights', label: 'AI Insights' },
    { path: '/news', label: 'News' },
  ];

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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`text-sm font-medium transition-colors ${
                isActive(link.path) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
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
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={handleProfileClick}>
            <User className="h-4 w-4" />
          </Button>
          
          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent">
                      <TrendingUp className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-lg font-bold">CogniWealth</span>
                  </div>
                </div>
                
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        isActive(link.path) 
                          ? 'bg-primary/10 text-primary' 
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                
                <div className="mt-auto pt-6 border-t border-border">
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <NotificationsSidebar 
          open={showNotifications} 
          onClose={() => setShowNotifications(false)}
          onNotificationUpdate={(unreadCount) => setNotificationCount(unreadCount)}
        />
      </div>
    </header>
  );
};