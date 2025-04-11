
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronRight, BarChart, MessageSquare, Users, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const InteractiveDemo = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => {
    setStep((prev) => (prev >= totalSteps ? 1 : prev + 1));
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">See Allora AI in Action</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Experience how our AI executive team transforms your business strategy with real-time insights and actionable recommendations.
        </p>
      </div>

      <Tabs defaultValue="strategy" className="w-full max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="strategy">
            <BarChart className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Strategy</span>
          </TabsTrigger>
          <TabsTrigger value="debate">
            <Users className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">AI Boardroom</span>
          </TabsTrigger>
          <TabsTrigger value="campaigns">
            <MessageSquare className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Campaigns</span>
          </TabsTrigger>
          <TabsTrigger value="insights">
            <Brain className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Insights</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 bg-black/5 rounded-xl p-1 sm:p-4 md:p-6 min-h-[400px]">
          <TabsContent value="strategy" className="mt-0">
            <Card className="border-none shadow-none">
              <CardContent className="p-0">
                <motion.div 
                  key={`strategy-${step}`}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="p-4"
                >
                  {step === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold">Sample Strategy: Market Expansion</h3>
                      <p>Our AI has analyzed your industry positioning and identified 3 high-growth market segments that align with your current capabilities.</p>
                      <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                        <h4 className="font-medium">Executive Insight:</h4>
                        <p className="text-sm italic">"With your current cash flow, targeting the enterprise segment would yield 25% higher ROI than consumer markets." - AI Finance Advisor</p>
                      </div>
                    </div>
                  )}
                  
                  {step === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold">Implementation Roadmap</h3>
                      <p>Your AI executive team has developed a 90-day roadmap for successful implementation:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Week 1-2: Market research validation</li>
                        <li>Week 3-4: Competitor analysis & positioning</li>
                        <li>Week 5-8: Initial outreach & lead generation</li>
                        <li>Week 9-12: Sales enablement & account management</li>
                      </ul>
                    </div>
                  )}
                  
                  {step === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold">Projected Outcomes</h3>
                      <p>Based on industry benchmarks and your company profile, our AI projects:</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                          <p className="text-sm font-medium">Revenue Growth</p>
                          <p className="text-2xl font-bold text-primary">+22%</p>
                        </div>
                        <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                          <p className="text-sm font-medium">Customer Acquisition</p>
                          <p className="text-2xl font-bold text-primary">+15%</p>
                        </div>
                        <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                          <p className="text-sm font-medium">Market Share</p>
                          <p className="text-2xl font-bold text-primary">+7%</p>
                        </div>
                        <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                          <p className="text-sm font-medium">Customer Retention</p>
                          <p className="text-2xl font-bold text-primary">+18%</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end mt-6">
                    <Button onClick={nextStep} className="group">
                      Next <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="debate" className="mt-0">
            <Card className="border-none shadow-none">
              <CardContent className="p-4">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Executive Boardroom Debate</h3>
                  <p className="text-muted-foreground">Watch how our AI executives debate the best strategy for your business, considering different perspectives and approaches.</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-blue-200 flex-shrink-0 flex items-center justify-center">
                        EB
                      </div>
                      <div>
                        <p className="font-medium">Elon B, Innovation Advisor</p>
                        <p className="text-sm">"We should focus on disruptive product innovation to create a new market category."</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-green-200 flex-shrink-0 flex items-center justify-center">
                        WB
                      </div>
                      <div>
                        <p className="font-medium">Warren B, Investment Advisor</p>
                        <p className="text-sm">"I disagree. The ROI on operational efficiency would be 36% higher in the first year."</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 bg-purple-50 p-3 rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-purple-200 flex-shrink-0 flex items-center justify-center">
                        SN
                      </div>
                      <div>
                        <p className="font-medium">Satya N, Strategy Advisor</p>
                        <p className="text-sm">"Let's consider a hybrid approach. We can improve operations while developing our innovation pipeline."</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                    <h4 className="font-medium">Consensus Recommendation:</h4>
                    <p className="text-sm">After debate, the executive team recommends a phased approach: first optimize operations (3 months), then invest 25% of savings into product innovation.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="campaigns" className="mt-0">
            <Card className="border-none shadow-none">
              <CardContent className="p-4">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">AI-Generated Marketing Campaigns</h3>
                  <p className="text-muted-foreground">Our AI creates ready-to-launch marketing campaigns tailored to your business objectives and target audience.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">FB</div>
                        <h4 className="font-medium">Facebook Campaign</h4>
                      </div>
                      <p className="text-sm">Targeted at decision-makers in mid-market companies</p>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Headline:</span> "Cut Decision Time by 65%"</p>
                        <p><span className="font-medium">Hook:</span> "AI that thinks like your best executives"</p>
                        <p><span className="font-medium">CTA:</span> "Get Executive Insights Now"</p>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">LI</div>
                        <h4 className="font-medium">LinkedIn Campaign</h4>
                      </div>
                      <p className="text-sm">Focused on C-suite executives in growing companies</p>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Headline:</span> "Your AI Executive Team"</p>
                        <p><span className="font-medium">Hook:</span> "McKinsey-quality strategies at 1/10th the cost"</p>
                        <p><span className="font-medium">CTA:</span> "Transform Your Business"</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                    <h4 className="font-medium">Campaign Performance Projection:</h4>
                    <p className="text-sm">Based on your industry and target market, these campaigns are projected to generate 45 qualified leads in the first month with a 12% conversion rate.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights" className="mt-0">
            <Card className="border-none shadow-none">
              <CardContent className="p-4">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">AI Business Insights</h3>
                  <p className="text-muted-foreground">Our AI analyzes market trends, competitive landscapes, and your business data to generate actionable insights.</p>
                  
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 bg-gradient-to-r from-primary/5 to-transparent">
                      <h4 className="font-medium text-lg">Market Opportunity Analysis</h4>
                      <p className="text-sm mt-2">Emerging market segment in [Industry] showing 26% YoY growth with limited competition from established players.</p>
                      <div className="mt-3 text-sm">
                        <p className="font-medium">Key Insight:</p>
                        <p className="italic">First-mover advantage can secure 15-20% market share within 12 months if entering with a focused solution.</p>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 bg-gradient-to-r from-primary/5 to-transparent">
                      <h4 className="font-medium text-lg">Competitive Edge Assessment</h4>
                      <p className="text-sm mt-2">Analysis of 12 competitors revealed a significant gap in [specific feature/service] that aligns with your core strengths.</p>
                      <div className="mt-3 text-sm">
                        <p className="font-medium">Key Insight:</p>
                        <p className="italic">Positioning around this unique value proposition could increase conversion rates by 32% based on industry benchmarks.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                    <h4 className="font-medium">McKinsey-Grade Analysis:</h4>
                    <p className="text-sm">Our AI combines data from 50+ industry sources, proprietary algorithms, and benchmarks from 10,000+ companies to deliver insights comparable to top consulting firms.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default InteractiveDemo;
