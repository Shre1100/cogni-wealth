import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  HelpCircle, 
  Search, 
  MessageCircle,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

const HelpCenter = () => {
  const faqs = [
    {
      id: "1",
      question: "How do I connect my investment accounts?",
      answer: "You can connect your investment accounts by going to Portfolio > Settings > Connected Accounts. We support most major brokers including TD Ameritrade, E*TRADE, Fidelity, and more. The connection is secure and read-only.",
      category: "Getting Started"
    },
    {
      id: "2",
      question: "How accurate are the AI recommendations?",
      answer: "Our AI recommendations are based on advanced algorithms analyzing market data, your risk profile, and historical performance. While past performance doesn't guarantee future results, our models have shown 78% accuracy in backtesting scenarios.",
      category: "AI Features"
    },
    {
      id: "3",
      question: "Is my financial data secure?",
      answer: "Yes, absolutely. We use bank-level encryption (256-bit SSL), secure data centers, and follow SOC 2 Type II compliance standards. Your data is never shared with third parties without your explicit consent.",
      category: "Security"
    },
    {
      id: "4",
      question: "What's the difference between plan tiers?",
      answer: "Basic plan includes portfolio tracking and basic insights. Pro plan adds AI recommendations, advanced analytics, and priority support. Enterprise includes custom analysis and dedicated account management.",
      category: "Pricing"
    },
    {
      id: "5",
      question: "Can I export my data?",
      answer: "Yes, you can export your portfolio data, transaction history, and reports in CSV, PDF, or Excel formats. Go to Settings > Data Export to download your information.",
      category: "Data Management"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-4">
      <div className="container mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-primary" />
            Help Center
          </h1>
          <p className="text-muted-foreground">Find answers to common questions and get support</p>
          
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search help articles..." className="pl-10" />
          </div>
        </div>

        {/* Quick Help Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="financial-card p-6 text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Get instant answers from our support team</p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-xs text-success">Available now</span>
              </div>
              <Button className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Chat
              </Button>
            </div>
          </Card>

          <Card className="financial-card p-6 text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center mx-auto">
                <Phone className="w-6 h-6 text-warning" />
              </div>
              <h3 className="font-semibold">Phone Support</h3>
              <p className="text-sm text-muted-foreground">Speak directly with our experts</p>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Mon-Fri 9AM-6PM EST</span>
              </div>
              <Button variant="outline" className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                Call Support
              </Button>
            </div>
          </Card>

          <Card className="financial-card p-6 text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold">Email Support</h3>
              <p className="text-sm text-muted-foreground">Send us a detailed message</p>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Response within 24 hours</span>
              </div>
              <Button variant="outline" className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
            </div>
          </Card>
        </div>

        {/* Status Banner */}
        <Card className="financial-card p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div className="flex-1">
              <h3 className="font-medium">All Systems Operational</h3>
              <p className="text-sm text-muted-foreground">All CogniWealth services are running normally</p>
            </div>
            <Button variant="ghost" size="sm">
              View Status Page
            </Button>
          </div>
        </Card>

        {/* FAQ Section */}
        <Card className="financial-card p-6">
          <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border border-border/40 rounded-lg px-4">
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{faq.question}</span>
                    <Badge variant="secondary" className="text-xs">
                      {faq.category}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* Contact Information */}
        <Card className="financial-card p-6">
          <h2 className="text-xl font-semibold mb-6">Still Need Help?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Contact Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>+1 (555) 123-HELP</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>support@cogniwealth.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>Monday - Friday, 9:00 AM - 6:00 PM EST</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Emergency Support</h3>
              <div className="p-4 border border-warning/30 rounded-lg bg-warning/10">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Critical Issues</p>
                    <p className="text-xs text-muted-foreground">
                      For account security issues or urgent technical problems, contact us immediately at 
                      <span className="text-warning font-medium"> emergency@cogniwealth.com</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenter;