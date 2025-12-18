import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Book, 
  Search, 
  ExternalLink,
  FileText,
  Video,
  Code,
  Lightbulb,
  Users,
  MessageCircle
} from "lucide-react";

const Documentation = () => {
  return (
    <div className="min-h-screen bg-background pt-4">
      <div className="container mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Book className="w-8 h-8 text-primary" />
            Documentation
          </h1>
          <p className="text-muted-foreground">Everything you need to master CogniWealth</p>
          
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search documentation..." className="pl-10" />
          </div>
        </div>

        <Tabs defaultValue="getting-started" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="getting-started" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="financial-card p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-primary" />
                    <h3 className="text-lg font-semibold">Quick Start Guide</h3>
                  </div>
                  <p className="text-muted-foreground">Get up and running with CogniWealth in 5 minutes</p>
                  <Button className="w-full">
                    Read Guide
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>

              <Card className="financial-card p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Video className="w-6 h-6 text-primary" />
                    <h3 className="text-lg font-semibold">Video Walkthrough</h3>
                  </div>
                  <p className="text-muted-foreground">Watch our comprehensive platform overview</p>
                  <Button variant="outline" className="w-full">
                    Watch Video
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="financial-card p-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Portfolio Management</h3>
                  <p className="text-sm text-muted-foreground">Learn how to track and optimize your investments</p>
                  <Badge variant="outline">Essential</Badge>
                </div>
              </Card>

              <Card className="financial-card p-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">AI Insights</h3>
                  <p className="text-sm text-muted-foreground">Understand our AI-powered recommendations</p>
                  <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">Pro</Badge>
                </div>
              </Card>

              <Card className="financial-card p-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Risk Analysis</h3>
                  <p className="text-sm text-muted-foreground">Master advanced risk assessment tools</p>
                  <Badge variant="outline" className="border-warning/30 text-warning bg-warning/10">Advanced</Badge>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-6">
            <div className="space-y-4">
              <Card className="financial-card p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Setting Up Your First Portfolio</h3>
                    <p className="text-sm text-muted-foreground">Step-by-step guide to creating your investment portfolio</p>
                  </div>
                  <Button variant="outline">
                    Start Tutorial
                  </Button>
                </div>
              </Card>

              <Card className="financial-card p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Understanding AI Recommendations</h3>
                    <p className="text-sm text-muted-foreground">Learn how to interpret and act on AI insights</p>
                  </div>
                  <Button variant="outline">
                    Start Tutorial
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="financial-card p-6 text-center">
                <div className="space-y-4">
                  <MessageCircle className="w-8 h-8 text-primary mx-auto" />
                  <h3 className="font-semibold">Live Chat</h3>
                  <p className="text-sm text-muted-foreground">Get instant help from our support team</p>
                  <Button className="w-full">Start Chat</Button>
                </div>
              </Card>

              <Card className="financial-card p-6 text-center">
                <div className="space-y-4">
                  <Users className="w-8 h-8 text-primary mx-auto" />
                  <h3 className="font-semibold">Community</h3>
                  <p className="text-sm text-muted-foreground">Connect with other CogniWealth users</p>
                  <Button variant="outline" className="w-full">Join Community</Button>
                </div>
              </Card>

              <Card className="financial-card p-6 text-center">
                <div className="space-y-4">
                  <Code className="w-8 h-8 text-primary mx-auto" />
                  <h3 className="font-semibold">API Reference</h3>
                  <p className="text-sm text-muted-foreground">Technical documentation for developers</p>
                  <Button variant="outline" className="w-full">View API Docs</Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documentation;