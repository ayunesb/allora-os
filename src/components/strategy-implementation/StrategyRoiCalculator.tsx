
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { 
  Calculator, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Save
} from "lucide-react";
import { 
  calculateROI, 
  calculatePaybackPeriod, 
  formatCurrency,
  fetchStrategyROI,
  saveStrategyROI
} from "@/utils/strategyImplementation/roiCalculator";
import { StrategyRoi } from "@/models/strategyImplementation";
import { toast } from "sonner";

interface StrategyRoiCalculatorProps {
  strategyId: string;
}

const StrategyRoiCalculator: React.FC<StrategyRoiCalculatorProps> = ({ strategyId }) => {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [projectedRevenue, setProjectedRevenue] = useState(25000);
  const [timeframeMonths, setTimeframeMonths] = useState(12);
  const [annualCosts, setAnnualCosts] = useState(5000);
  
  const [roi, setRoi] = useState(0);
  const [paybackPeriod, setPaybackPeriod] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load existing ROI data on component mount
  useEffect(() => {
    const loadRoiData = async () => {
      setIsLoading(true);
      const data = await fetchStrategyROI(strategyId);
      
      if (data) {
        setInitialInvestment(data.initialInvestment);
        setProjectedRevenue(data.projectedRevenue);
        setTimeframeMonths(data.timeframeMonths);
        setAnnualCosts(data.annualCosts);
      }
      
      setIsLoading(false);
    };
    
    loadRoiData();
  }, [strategyId]);
  
  // Calculate ROI whenever inputs change
  useEffect(() => {
    const calculatedRoi = calculateROI(
      initialInvestment,
      projectedRevenue,
      timeframeMonths,
      annualCosts
    );
    
    setRoi(calculatedRoi);
    
    // Calculate payback period
    const monthlyRevenue = projectedRevenue / timeframeMonths;
    const monthlyCosts = annualCosts / 12;
    const calculatedPaybackPeriod = calculatePaybackPeriod(
      initialInvestment,
      monthlyRevenue,
      monthlyCosts
    );
    
    setPaybackPeriod(calculatedPaybackPeriod);
  }, [initialInvestment, projectedRevenue, timeframeMonths, annualCosts]);
  
  const handleSave = async () => {
    setIsSaving(true);
    
    const roiData: Omit<StrategyRoi, 'id' | 'lastUpdated'> = {
      strategyId,
      initialInvestment,
      projectedRevenue,
      timeframeMonths,
      annualCosts,
      projectedROI: roi
    };
    
    await saveStrategyROI(roiData);
    setIsSaving(false);
  };
  
  // Prepare data for chart
  const getChartData = () => {
    const monthlyCost = annualCosts / 12;
    const monthlyRevenue = projectedRevenue / timeframeMonths;
    
    return Array.from({ length: timeframeMonths + 1 }, (_, i) => {
      const month = i;
      const investment = month === 0 ? initialInvestment : 0;
      const costs = month > 0 ? monthlyCost : 0;
      const revenue = month > 0 ? monthlyRevenue : 0;
      const cumulativeCosts = initialInvestment + (monthlyCost * month);
      const cumulativeRevenue = monthlyRevenue * month;
      const balance = cumulativeRevenue - cumulativeCosts;
      
      return {
        month: `Month ${month}`,
        investment,
        costs,
        revenue,
        cumulativeCosts,
        cumulativeRevenue,
        balance
      };
    });
  };
  
  // Format numbers for display
  const formatValue = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };
  
  // Get ROI color based on value
  const getRoiColor = (roi: number) => {
    if (roi < 0) return "text-red-500";
    if (roi < 25) return "text-yellow-500";
    if (roi < 50) return "text-blue-500";
    return "text-green-500";
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Calculator className="mr-2 h-5 w-5" />
            ROI Calculator
          </CardTitle>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-6 text-center text-muted-foreground">
            Loading ROI data...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="initialInvestment" className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Initial Investment
                    </Label>
                    <span className="text-sm font-mono">{formatValue(initialInvestment)}</span>
                  </div>
                  <Slider
                    id="initialInvestment"
                    min={1000}
                    max={100000}
                    step={1000}
                    value={[initialInvestment]}
                    onValueChange={(value) => setInitialInvestment(value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="projectedRevenue" className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Projected Revenue
                    </Label>
                    <span className="text-sm font-mono">{formatValue(projectedRevenue)}</span>
                  </div>
                  <Slider
                    id="projectedRevenue"
                    min={0}
                    max={200000}
                    step={1000}
                    value={[projectedRevenue]}
                    onValueChange={(value) => setProjectedRevenue(value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="timeframeMonths" className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Timeframe (Months)
                    </Label>
                    <span className="text-sm font-mono">{timeframeMonths} months</span>
                  </div>
                  <Slider
                    id="timeframeMonths"
                    min={1}
                    max={36}
                    step={1}
                    value={[timeframeMonths]}
                    onValueChange={(value) => setTimeframeMonths(value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="annualCosts" className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Annual Operational Costs
                    </Label>
                    <span className="text-sm font-mono">{formatValue(annualCosts)}</span>
                  </div>
                  <Slider
                    id="annualCosts"
                    min={0}
                    max={50000}
                    step={1000}
                    value={[annualCosts]}
                    onValueChange={(value) => setAnnualCosts(value[0])}
                  />
                </div>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4 flex flex-col justify-center">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-medium mb-1">Projected Return on Investment</h3>
                  <div className={`text-4xl font-bold ${getRoiColor(roi)}`}>
                    {roi.toFixed(1)}%
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-background/80 p-3 rounded-md">
                      <div className="text-sm text-muted-foreground">Profit</div>
                      <div className="font-medium">
                        {formatValue(projectedRevenue - (annualCosts / 12 * timeframeMonths) - initialInvestment)}
                      </div>
                    </div>
                    
                    <div className="bg-background/80 p-3 rounded-md">
                      <div className="text-sm text-muted-foreground">Payback Period</div>
                      <div className="font-medium">
                        {paybackPeriod === Infinity 
                          ? "Never" 
                          : `${paybackPeriod.toFixed(1)} months`}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Investment:</span>
                    <span className="font-medium">
                      {formatValue(initialInvestment + (annualCosts / 12 * timeframeMonths))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Revenue:</span>
                    <span className="font-medium">{formatValue(projectedRevenue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Revenue:</span>
                    <span className="font-medium">{formatValue(projectedRevenue / timeframeMonths)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Costs:</span>
                    <span className="font-medium">{formatValue(annualCosts / 12)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Investment & Revenue Projection</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getChartData()} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatValue(value as number)} />
                    <ReferenceLine y={0} stroke="#000" />
                    <Bar dataKey="balance" fill="#1e88e5" name="Balance" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default StrategyRoiCalculator;
