import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { 
  Bell, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Clock,
  CheckCircle2,
  Circle,
  Target,
  Wallet
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'achievement' | 'market' | 'portfolio';
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

// Mock notifications data - Replace with API call
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Portfolio Alert',
    message: 'AAPL is down 5% from your average price',
    type: 'alert',
    timestamp: '2 min ago',
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    title: 'Market Update',
    message: 'S&P 500 reached new all-time high',
    type: 'market',
    timestamp: '15 min ago',
    read: false,
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Achievement Unlocked',
    message: 'You have reached 90% of your investment goal',
    type: 'achievement',
    timestamp: '1 hour ago',
    read: true,
    priority: 'low'
  },
  {
    id: '4',
    title: 'Price Target Hit',
    message: 'TSLA has reached your target price of $250',
    type: 'portfolio',
    timestamp: '2 hours ago',
    read: true,
    priority: 'medium'
  },
  {
    id: '5',
    title: 'Market Alert',
    message: 'High volatility detected in tech sector',
    type: 'market',
    timestamp: '3 hours ago',
    read: false,
    priority: 'high'
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'alert':
      return <AlertCircle className="w-4 h-4 text-decline" />;
    case 'achievement':
      return <Target className="w-4 h-4 text-success" />;
    case 'market':
      return <TrendingUp className="w-4 h-4 text-primary" />;
    case 'portfolio':
      return <Wallet className="w-4 h-4 text-warning" />;
    default:
      return <Bell className="w-4 h-4" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
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

interface NotificationsSidebarProps {
  open: boolean;
  onClose: () => void;
  onNotificationUpdate?: (unreadCount: number) => void;
}

export const NotificationsSidebar = ({ open, onClose, onNotificationUpdate }: NotificationsSidebarProps) => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: string) => {
    // TODO: Connect to database to update notification status
    setNotifications(prev => {
      const updated = prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      );
      const newUnreadCount = updated.filter(n => !n.read).length;
      onNotificationUpdate?.(newUnreadCount);
      return updated;
    });
  };

  const markAllAsRead = () => {
    // TODO: Connect to database to update all notifications
    setNotifications(prev => {
      const updated = prev.map(notif => ({ ...notif, read: true }));
      onNotificationUpdate?.(0);
      return updated;
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const allNotifications = notifications;
  const unreadNotifications = notifications.filter(n => !n.read);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-96 p-0">
        <SheetHeader className="p-6 border-b border-border/40">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="bg-decline text-decline-foreground">
                  {unreadCount}
                </Badge>
              )}
            </SheetTitle>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all read
              </Button>
            )}
          </div>
        </SheetHeader>

        <Tabs defaultValue="all" className="h-full">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All ({allNotifications.length})</TabsTrigger>
              <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-4 px-6 space-y-3 max-h-[calc(100vh-16rem)] overflow-y-auto pb-6">
            {allNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`p-4 cursor-pointer transition-all hover:border-primary/30 ${
                  !notification.read ? 'border-primary/20 bg-primary/5' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <div className="flex items-center gap-2">
                        {!notification.read ? (
                          <Circle className="w-2 h-2 fill-primary text-primary" />
                        ) : (
                          <CheckCircle2 className="w-3 h-3 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {notification.timestamp}
                      </div>
                      <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                        {notification.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="unread" className="mt-4 px-6 space-y-3 max-h-[calc(100vh-16rem)] overflow-y-auto pb-6">
            {unreadNotifications.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
                <h3 className="font-medium text-lg">All caught up!</h3>
                <p className="text-muted-foreground">No unread notifications</p>
              </div>
            ) : (
              unreadNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className="p-4 cursor-pointer transition-all hover:border-primary/30 border-primary/20 bg-primary/5"
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <Circle className="w-2 h-2 fill-primary text-primary mt-1" />
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {notification.timestamp}
                        </div>
                        <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};