import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Scale,
  Calendar,
  FileText,
  Shield
} from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background pt-4">
      <div className="container mx-auto px-4 space-y-8 max-w-4xl">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Scale className="w-8 h-8 text-primary" />
            Terms of Service
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Last updated: December 1, 2024
            </div>
            <div className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              Version 2.1
            </div>
          </div>
        </div>

        <Card className="financial-card p-8">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using CogniWealth ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold mb-4">2. Description of Service</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  CogniWealth provides AI-powered financial intelligence and portfolio management tools. Our services include but are not limited to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Portfolio tracking and analysis</li>
                  <li>AI-generated investment insights and recommendations</li>
                  <li>Risk assessment and management tools</li>
                  <li>Market data and news analysis</li>
                  <li>Financial planning and goal tracking</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold mb-4">3. Investment Disclaimer</h2>
                <div className="p-4 border border-warning/30 rounded-lg bg-warning/10 mb-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-warning mt-0.5" />
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-warning">Important Investment Notice</p>
                      <p className="text-xs text-muted-foreground">
                        CogniWealth provides general information and analysis for educational purposes only. 
                        It is not intended as personalized financial advice.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    <strong>No Financial Advice:</strong> The information, analysis, and recommendations provided by CogniWealth 
                    are for informational purposes only and should not be considered as financial, investment, or professional advice.
                  </p>
                  <p>
                    <strong>Investment Risks:</strong> All investments involve risk, including the potential loss of principal. 
                    Past performance does not guarantee future results. Market conditions can change rapidly.
                  </p>
                  <p>
                    <strong>Professional Consultation:</strong> Before making any investment decisions, you should consult with 
                    qualified financial advisors, tax professionals, or legal counsel who can provide personalized advice 
                    based on your specific circumstances.
                  </p>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold mb-4">4. User Responsibilities</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>As a user of CogniWealth, you agree to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide accurate and complete information when creating your account</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Use the service in compliance with all applicable laws and regulations</li>
                    <li>Not attempt to gain unauthorized access to our systems or other user accounts</li>
                    <li>Not use the service for any illegal or unauthorized purpose</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                  </ul>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold mb-4">5. Data and Privacy</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, 
                    which is incorporated into these Terms of Service by reference.
                  </p>
                  <p>
                    <strong>Data Security:</strong> We implement industry-standard security measures to protect your personal and 
                    financial information. However, no method of transmission over the internet is 100% secure.
                  </p>
                  <p>
                    <strong>Data Accuracy:</strong> While we strive to provide accurate and up-to-date information, 
                    we cannot guarantee the accuracy or completeness of all data displayed in our service.
                  </p>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold mb-4">6. Limitation of Liability</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    <strong>Service Availability:</strong> We strive to maintain high service availability but cannot guarantee 
                    uninterrupted access. We reserve the right to modify, suspend, or discontinue the service at any time.
                  </p>
                  <p>
                    <strong>Financial Losses:</strong> CogniWealth shall not be liable for any investment losses, 
                    missed opportunities, or financial damages resulting from the use of our service or reliance on our recommendations.
                  </p>
                  <p>
                    <strong>Third-Party Services:</strong> We are not responsible for the accuracy or reliability of 
                    third-party data sources, linked websites, or integrated services.
                  </p>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold mb-4">7. Subscription and Billing</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    <strong>Subscription Plans:</strong> CogniWealth offers various subscription tiers with different features and pricing. 
                    Billing occurs according to your selected plan interval.
                  </p>
                  <p>
                    <strong>Cancellation:</strong> You may cancel your subscription at any time. Cancellation takes effect at the end 
                    of your current billing period. No refunds are provided for partial billing periods.
                  </p>
                  <p>
                    <strong>Price Changes:</strong> We reserve the right to modify subscription prices with 30 days advance notice 
                    to existing subscribers.
                  </p>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold mb-4">8. Intellectual Property</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    All content, features, and functionality of CogniWealth, including but not limited to text, graphics, logos, 
                    algorithms, and software, are owned by CogniWealth and are protected by copyright, trademark, and other 
                    intellectual property laws.
                  </p>
                  <p>
                    You are granted a limited, non-exclusive license to use the service for personal financial management purposes only.
                  </p>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold mb-4">9. Termination</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    We reserve the right to terminate or suspend your account and access to the service at our discretion, 
                    without notice, for any reason, including violation of these Terms of Service.
                  </p>
                  <p>
                    Upon termination, your right to use the service will cease immediately, and any data associated with 
                    your account may be deleted after a reasonable period.
                  </p>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold mb-4">10. Changes to Terms</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    We reserve the right to modify these Terms of Service at any time. Material changes will be notified 
                    to users via email or through the service interface.
                  </p>
                  <p>
                    Continued use of the service after such modifications constitutes acceptance of the updated terms.
                  </p>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold mb-4">11. Contact Information</h2>
                <div className="text-muted-foreground leading-relaxed">
                  <p>If you have any questions about these Terms of Service, please contact us at:</p>
                  <ul className="list-none space-y-2 mt-4">
                    <li><strong>Email:</strong> legal@cogniwealth.com</li>
                    <li><strong>Phone:</strong> +1 (555) 123-HELP</li>
                    <li><strong>Address:</strong> 123 Financial District, New York, NY 10004</li>
                  </ul>
                </div>
              </section>
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;