import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Zap, BarChart3 } from "lucide-react";
const CaseStudy = ({ title, industry, challenge, solution, results }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge
            variant="outline"
            className="px-2 py-0.5 bg-primary/10 text-primary font-normal text-xs"
          >
            {industry}
          </Badge>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-4 flex-1">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Challenge:
            </p>
            <p className="text-sm">{challenge}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Solution:
            </p>
            <p className="text-sm">{solution}</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t">
          <p className="text-sm font-medium mb-3">Results:</p>
          <div className="grid grid-cols-2 gap-3">
            {results.map((result, index) => (
              <div key={index} className="flex items-center space-x-2">
                <result.icon className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">{result.value}</p>
                  <p className="text-xs text-muted-foreground">
                    {result.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
const OutcomeShowcase = () => {
  const caseStudies = [
    {
      title: "SaaS Startup Accelerated Growth",
      industry: "Software",
      challenge:
        "Early-stage SaaS startup struggling with low conversion rates and unclear market positioning.",
      solution:
        "AI executive team identified ideal customer profile and created targeted marketing strategy with optimized pricing model.",
      results: [
        { icon: TrendingUp, label: "Revenue Growth", value: "+156%" },
        { icon: BarChart3, label: "Conversion Rate", value: "+43%" },
        { icon: Clock, label: "Time to Market", value: "-65%" },
        { icon: Zap, label: "Customer Acq. Cost", value: "-38%" },
      ],
    },
    {
      title: "Retail Brand Expansion",
      industry: "E-commerce",
      challenge:
        "Mid-market retailer facing increasing competition and plateauing growth in primary market.",
      solution:
        "AI identified new market segments and created targeted expansion strategy with optimized logistics plan.",
      results: [
        { icon: TrendingUp, label: "Market Share", value: "+12%" },
        { icon: BarChart3, label: "New Markets", value: "3" },
        { icon: Clock, label: "Strategy Dev. Time", value: "5 days" },
        { icon: Zap, label: "Implementation", value: "8 weeks" },
      ],
    },
    {
      title: "Professional Services Transformation",
      industry: "Consulting",
      challenge:
        "Established consulting firm facing declining margins and difficulty adapting to changing client needs.",
      solution:
        "AI executive debate resulted in strategic pivot to specialized service offerings with value-based pricing.",
      results: [
        { icon: TrendingUp, label: "Profit Margin", value: "+22%" },
        { icon: BarChart3, label: "Client Retention", value: "95%" },
        { icon: Clock, label: "Decision Time", value: "-78%" },
        { icon: Zap, label: "Team Utilization", value: "+31%" },
      ],
    },
  ];
  return (
    <div className="bg-gradient-to-b from-background to-primary/5 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real Results, Real Businesses
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how businesses like yours achieved measurable growth with Allora
            AI's executive advisory platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <CaseStudy key={index} {...study} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default OutcomeShowcase;
