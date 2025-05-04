import React from 'react';
import { Check, X, HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { pricingTiers } from './pricingData';
import { useBreakpoint } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
const PlanComparisonTable = ({ featureData }) => {
    const breakpoint = useBreakpoint();
    const isMobileView = ['xs', 'mobile'].includes(breakpoint);
    if (isMobileView) {
        return <MobilePlanComparison featureData={featureData}/>;
    }
    return (<div className="mt-10 border rounded-lg overflow-hidden">
      <ScrollArea className="w-full">
        <div className="min-w-[800px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[280px]">Features</TableHead>
                {pricingTiers.map((tier, index) => (<TableHead key={index} className="text-center">
                    <div className="font-bold">{tier.title}</div>
                    <div className="text-2xl font-bold mt-2">{tier.price}</div>
                    <div className="text-muted-foreground text-xs mt-1">/month</div>
                  </TableHead>))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {featureData.map((category, categoryIndex) => (<React.Fragment key={categoryIndex}>
                  <TableRow className="bg-muted/30">
                    <TableCell colSpan={4} className="font-bold">
                      {category.category}
                    </TableCell>
                  </TableRow>
                  {category.features.map((feature, featureIndex) => (<TableRow key={`${categoryIndex}-${featureIndex}`}>
                      <TableCell className="py-4">
                        <div className="flex items-start gap-2">
                          <div>
                            <div className="font-medium">{feature.name}</div>
                            {feature.description && (<div className="text-muted-foreground text-xs mt-1">{feature.description}</div>)}
                          </div>
                          {feature.description && (<TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-1"/>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-[200px] text-xs">{feature.description}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>)}
                        </div>
                      </TableCell>
                      <TableCell className="text-center py-4">
                        {renderFeatureValue(feature.starter)}
                      </TableCell>
                      <TableCell className="text-center py-4 bg-primary/5">
                        {renderFeatureValue(feature.growth)}
                      </TableCell>
                      <TableCell className="text-center py-4">
                        {renderFeatureValue(feature.enterprise)}
                      </TableCell>
                    </TableRow>))}
                </React.Fragment>))}
              <TableRow>
                <TableCell></TableCell>
                {pricingTiers.map((tier, index) => (<TableCell key={index} className="text-center p-4">
                    <Button variant={tier.buttonVariant} className="w-full" onClick={() => handlePlanSelect(tier.priceId, tier.title)}>
                      {tier.buttonText}
                    </Button>
                  </TableCell>))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>);
};
const MobilePlanComparison = ({ featureData }) => {
    const selectedPlan = pricingTiers[1]; // Default to Growth plan for mobile
    return (<div className="mt-8 space-y-8">
      <div className="flex justify-center space-x-2 mb-4">
        {pricingTiers.map((tier, index) => (<Badge key={index} variant={tier.title === selectedPlan.title ? "default" : "outline"} className="cursor-pointer px-3 py-1">
            {tier.title}
          </Badge>))}
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted/50 p-4 text-center border-b">
          <div className="font-bold text-xl">{selectedPlan.title}</div>
          <div className="text-2xl font-bold mt-2">{selectedPlan.price}<span className="text-sm font-normal">/month</span></div>
          <div className="text-muted-foreground text-sm mt-1">{selectedPlan.description}</div>
        </div>
        
        <div className="divide-y">
          {featureData.map((category, categoryIndex) => (<div key={categoryIndex}>
              <div className="p-3 font-bold bg-muted/30">
                {category.category}
              </div>
              <div className="divide-y">
                {category.features.map((feature, featureIndex) => {
                const value = getPlanValue(feature, selectedPlan.title.toLowerCase());
                return (<div key={`${categoryIndex}-${featureIndex}`} className="p-3 flex justify-between items-center">
                      <div>
                        <div className="font-medium">{feature.name}</div>
                        {feature.description && (<div className="text-muted-foreground text-xs mt-1">{feature.description}</div>)}
                      </div>
                      <div className="ml-3">{renderFeatureValue(value)}</div>
                    </div>);
            })}
              </div>
            </div>))}
        </div>
        
        <div className="p-4 border-t">
          <Button variant={selectedPlan.buttonVariant} className="w-full" onClick={() => handlePlanSelect(selectedPlan.priceId, selectedPlan.title)}>
            {selectedPlan.buttonText}
          </Button>
        </div>
      </div>
    </div>);
};
function renderFeatureValue(value) {
    if (typeof value === 'boolean') {
        return value ? (<Check className="mx-auto h-5 w-5 text-green-500"/>) : (<X className="mx-auto h-5 w-5 text-muted-foreground"/>);
    }
    if (value === 'Basic') {
        return <Badge variant="outline" className="bg-blue-50">Basic</Badge>;
    }
    if (value === 'Advanced' || value === 'Full access') {
        return <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">Advanced</Badge>;
    }
    if (value.includes('Enterprise') || value.includes('Custom') || value === 'Full access' || value === 'All channels' || value.includes('24/7')) {
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">{value}</Badge>;
    }
    if (value.includes('Limited')) {
        return <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-700">{value}</Badge>;
    }
    return <span className="text-sm">{value}</span>;
}
function getPlanValue(feature, planName) {
    return feature[planName];
}
function handlePlanSelect(priceId, planName) {
    if (!priceId) {
        // For Enterprise plan
        window.location.href = "/signup";
        return;
    }
    // For plans with priceId
    // You would trigger the Stripe checkout here
    console.log(`Selected plan: ${planName} with priceId: ${priceId}`);
}
export default PlanComparisonTable;
