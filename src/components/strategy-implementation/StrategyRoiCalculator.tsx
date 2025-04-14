
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { TypographyP } from "@/components/ui/typography";
import { StrategyRoi } from "@/models/strategyImplementation";
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';

interface StrategyRoiCalculatorProps {
  strategyId: string;
}

const StrategyRoiCalculator: React.FC<StrategyRoiCalculatorProps> = ({ strategyId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [roiData, setRoiData] = useState<StrategyRoi | null>(null);
  
  // Form state
  const [initialInvestment, setInitialInvestment] = useState<number>(0);
  const [projectedRevenue, setProjectedRevenue] = useState<number>(0);
  const [timeframeMonths, setTimeframeMonths] = useState<number>(12);
  const [annualCosts, setAnnualCosts] = useState<number>(0);
  const [actualRevenue, setActualRevenue] = useState<number | undefined>(undefined);
  const [actualCosts, setActualCosts] = useState<number | undefined>(undefined);
  
  // Calculated values
  const [projectedROI, setProjectedROI] = useState<number>(0);
  const [actualROI, setActualROI] = useState<number | undefined>(undefined);
  
  // Load existing ROI data
  useEffect(() => {
    const fetchRoiData = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('strategy_roi')
          .select('*')
          .eq('strategyId', strategyId)
          .single();
        
        if (error) {
          if (error.code !== 'PGRST116') { // PGRST116 is "no rows returned" which is expected if no ROI data exists yet
            console.error('Error fetching ROI data:', error);
            toast.error('Failed to load ROI data');
          }
        } else if (data) {
          setRoiData(data);
          setInitialInvestment(data.initialInvestment);
          setProjectedRevenue(data.projectedRevenue);
          setTimeframeMonths(data.timeframeMonths);
          setAnnualCosts(data.annualCosts);
          setProjectedROI(data.projectedROI);
          
          if (data.actualRevenue !== undefined) setActualRevenue(data.actualRevenue);
          if (data.actualCosts !== undefined) setActualCosts(data.actualCosts);
          if (data.actualROI !== undefined) setActualROI(data.actualROI);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        toast.error('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRoiData();
  }, [strategyId]);
  
  // Calculate projected ROI whenever inputs change
  useEffect(() => {
    if (initialInvestment > 0) {
      // Convert annual costs to the specified timeframe
      const timeframeCosts = annualCosts * (timeframeMonths / 12);
      const totalCosts = initialInvestment + timeframeCosts;
      
      if (totalCosts > 0) {
        const roi = ((projectedRevenue - totalCosts) / totalCosts) * 100;
        setProjectedROI(Number(roi.toFixed(2)));
      }
    }
  }, [initialInvestment, projectedRevenue, timeframeMonths, annualCosts]);
  
  // Calculate actual ROI when actual data is provided
  useEffect(() => {
    if (actualRevenue !== undefined && actualCosts !== undefined && actualCosts > 0) {
      const roi = ((actualRevenue - actualCosts) / actualCosts) * 100;
      setActualROI(Number(roi.toFixed(2)));
    }
  }, [actualRevenue, actualCosts]);
  
  // Save ROI data
  const handleSave = async () => {
    try {
      const roiDataToSave = {
        strategyId,
        initialInvestment,
        projectedRevenue,
        timeframeMonths,
        annualCosts,
        projectedROI,
        actualRevenue,
        actualCosts,
        actualROI,
        lastUpdated: new Date().toISOString()
      };
      
      if (roiData?.id) {
        // Update existing record
        const { error } = await supabase
          .from('strategy_roi')
          .update(roiDataToSave)
          .eq('id', roiData.id);
        
        if (error) throw error;
        toast.success('ROI data updated successfully');
      } else {
        // Create new record
        const { error } = await supabase
          .from('strategy_roi')
          .insert([roiDataToSave]);
        
        if (error) throw error;
        toast.success('ROI data saved successfully');
      }
    } catch (error) {
      console.error('Error saving ROI data:', error);
      toast.error('Failed to save ROI data');
    }
  };
  
  // Prepare chart data
  const getChartData = () => {
    const chartData = [
      { name: 'Initial Investment', value: initialInvestment },
      { name: 'Ongoing Costs', value: annualCosts * (timeframeMonths / 12) },
      { name: 'Projected Revenue', value: projectedRevenue }
    ];
    
    if (actualRevenue !== undefined && actualCosts !== undefined) {
      chartData.push(
        { name: 'Actual Costs', value: actualCosts },
        { name: 'Actual Revenue', value: actualRevenue }
      );
    }
    
    return chartData;
  };
  
  const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#8884d8', '#82ca9d'];
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>ROI Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-6 text-center text-muted-foreground">
            Loading ROI calculator...
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <Label htmlFor="initialInvestment">Initial Investment ($)</Label>
                <Input
                  id="initialInvestment"
                  type="number"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                />
              </div>
              
              <div>
                <Label htmlFor="projectedRevenue">Projected Revenue ($)</Label>
                <Input
                  id="projectedRevenue"
                  type="number"
                  value={projectedRevenue}
                  onChange={(e) => setProjectedRevenue(Number(e.target.value))}
                />
              </div>
              
              <div>
                <Label htmlFor="timeframeMonths">Timeframe (Months)</Label>
                <Input
                  id="timeframeMonths"
                  type="number"
                  value={timeframeMonths}
                  onChange={(e) => setTimeframeMonths(Number(e.target.value))}
                />
              </div>
              
              <div>
                <Label htmlFor="annualCosts">Annual Ongoing Costs ($)</Label>
                <Input
                  id="annualCosts"
                  type="number"
                  value={annualCosts}
                  onChange={(e) => setAnnualCosts(Number(e.target.value))}
                />
              </div>
              
              <div className="pt-4 border-t">
                <Label htmlFor="actualRevenue">Actual Revenue ($) (Optional)</Label>
                <Input
                  id="actualRevenue"
                  type="number"
                  value={actualRevenue === undefined ? '' : actualRevenue}
                  onChange={(e) => setActualRevenue(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="Enter once strategy is implemented"
                />
              </div>
              
              <div>
                <Label htmlFor="actualCosts">Actual Costs ($) (Optional)</Label>
                <Input
                  id="actualCosts"
                  type="number"
                  value={actualCosts === undefined ? '' : actualCosts}
                  onChange={(e) => setActualCosts(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="Enter once strategy is implemented"
                />
              </div>
              
              <Button onClick={handleSave} className="w-full">Save ROI Data</Button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Projected ROI</h3>
                <div className="text-3xl font-bold text-primary">{projectedROI}%</div>
                <TypographyP className="text-sm mt-1">
                  Over {timeframeMonths} months
                </TypographyP>
              </div>
              
              {actualROI !== undefined && (
                <div className="bg-muted p-4 rounded-md">
                  <h3 className="text-lg font-semibold mb-2">Actual ROI</h3>
                  <div className={`text-3xl font-bold ${actualROI >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {actualROI}%
                  </div>
                  <TypographyP className="text-sm mt-1">
                    Based on reported actual costs and revenue
                  </TypographyP>
                </div>
              )}
              
              <div className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getChartData()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {getChartData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StrategyRoiCalculator;
