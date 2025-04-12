
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Target, TrendingUp, BarChart3, Users, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  fetchCompetitorBenchmarks,
  createCompetitorBenchmark,
  updateCompetitorBenchmark,
  deleteCompetitorBenchmark,
  calculateMarketPosition
} from "@/utils/strategyImplementation/competitorBenchmarking";
import { CompetitorBenchmark } from "@/models/strategyImplementation";

interface CompetitorBenchmarkingProps {
  strategyId: string;
}

const CompetitorBenchmarking: React.FC<CompetitorBenchmarkingProps> = ({ strategyId }) => {
  const [competitors, setCompetitors] = useState<CompetitorBenchmark[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCompetitor, setCurrentCompetitor] = useState<CompetitorBenchmark | null>(null);
  
  // Form state
  const [competitorName, setCompetitorName] = useState("");
  const [marketShare, setMarketShare] = useState(10);
  const [strengthScore, setStrengthScore] = useState(5);
  const [weaknessScore, setWeaknessScore] = useState(5);
  const [notes, setNotes] = useState("");
  
  const [competitivePosition, setCompetitivePosition] = useState({
    averageStrength: 0,
    averageWeakness: 0,
    relativeMarketShare: 0,
    competitiveAdvantage: "Moderate" as "Strong" | "Moderate" | "Weak"
  });

  useEffect(() => {
    const loadCompetitors = async () => {
      setIsLoading(true);
      const data = await fetchCompetitorBenchmarks(strategyId);
      setCompetitors(data);
      const position = calculateMarketPosition(data);
      setCompetitivePosition(position);
      setIsLoading(false);
    };

    loadCompetitors();
  }, [strategyId]);

  const handleAddCompetitor = () => {
    // Reset form
    setCompetitorName("");
    setMarketShare(10);
    setStrengthScore(5);
    setWeaknessScore(5);
    setNotes("");
    setCurrentCompetitor(null);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditCompetitor = (competitor: CompetitorBenchmark) => {
    setCompetitorName(competitor.competitorName);
    setMarketShare(competitor.marketShare);
    setStrengthScore(competitor.strengthScore);
    setWeaknessScore(competitor.weaknessScore);
    setNotes(competitor.notes || "");
    setCurrentCompetitor(competitor);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeleteCompetitor = async () => {
    if (!currentCompetitor) return;
    
    const success = await deleteCompetitorBenchmark(currentCompetitor.id);
    
    if (success) {
      setCompetitors(prev => prev.filter(c => c.id !== currentCompetitor.id));
      const position = calculateMarketPosition(
        competitors.filter(c => c.id !== currentCompetitor.id)
      );
      setCompetitivePosition(position);
      setIsDialogOpen(false);
    }
  };

  const handleSubmit = async () => {
    if (!competitorName.trim()) return;
    
    const benchmarkData = {
      strategyId,
      competitorName,
      marketShare,
      strengthScore,
      weaknessScore,
      notes: notes.trim() || undefined
    };
    
    if (isEditing && currentCompetitor) {
      // Update existing competitor
      const success = await updateCompetitorBenchmark(currentCompetitor.id, benchmarkData);
      
      if (success) {
        const updatedCompetitors = competitors.map(c => 
          c.id === currentCompetitor.id 
            ? { ...c, ...benchmarkData } 
            : c
        );
        setCompetitors(updatedCompetitors);
        const position = calculateMarketPosition(updatedCompetitors);
        setCompetitivePosition(position);
      }
    } else {
      // Create new competitor
      const newCompetitor = await createCompetitorBenchmark(benchmarkData);
      
      if (newCompetitor) {
        const updatedCompetitors = [...competitors, newCompetitor];
        setCompetitors(updatedCompetitors);
        const position = calculateMarketPosition(updatedCompetitors);
        setCompetitivePosition(position);
      }
    }
    
    setIsDialogOpen(false);
  };

  // Prepare pie chart data
  const getPieChartData = () => {
    const totalCompetitorShare = competitors.reduce((sum, c) => sum + c.marketShare, 0);
    const yourShare = Math.max(0, 100 - totalCompetitorShare);
    
    const data = [
      { name: "Your Company", value: yourShare },
      ...competitors.map(c => ({ name: c.competitorName, value: c.marketShare }))
    ];
    
    return data;
  };

  // Chart colors
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F"];

  // Prepare radar chart data
  const getRadarData = () => {
    return [
      {
        subject: "Market Share",
        "Your Company": competitivePosition.relativeMarketShare * 5, // Scale to 0-10
        "Competitors": 5
      },
      {
        subject: "Strengths",
        "Your Company": 10 - competitivePosition.averageWeakness,
        "Competitors": competitivePosition.averageStrength
      },
      {
        subject: "Weakness (Less is better)",
        "Your Company": competitivePosition.averageWeakness,
        "Competitors": 10 - competitivePosition.averageStrength
      },
      {
        subject: "Competitive Advantage",
        "Your Company": competitivePosition.competitiveAdvantage === "Strong" ? 8 : 
                       competitivePosition.competitiveAdvantage === "Moderate" ? 5 : 3,
        "Competitors": 5
      }
    ];
  };

  // Get the total market share of all competitors
  const getTotalCompetitorShare = () => {
    return competitors.reduce((sum, c) => sum + c.marketShare, 0);
  };

  // Get your company's market share
  const getYourMarketShare = () => {
    return Math.max(0, 100 - getTotalCompetitorShare());
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Competitor Benchmarking
          </CardTitle>
          <Button onClick={handleAddCompetitor}>
            <Plus className="mr-2 h-4 w-4" />
            Add Competitor
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-6 text-center text-muted-foreground">
            Loading competitor data...
          </div>
        ) : competitors.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            <p className="mb-4">No competitors have been added yet.</p>
            <Button variant="outline" onClick={handleAddCompetitor}>
              <Plus className="mr-2 h-4 w-4" />
              Add your first competitor
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Market Share Distribution
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getPieChartData()}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {getPieChartData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 text-center">
                  <p className="text-sm text-muted-foreground">
                    Your market share: {getYourMarketShare().toFixed(1)}%
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Competitive Position
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={90} data={getRadarData()}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 10]} />
                      <Radar
                        name="Your Company"
                        dataKey="Your Company"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                      />
                      <Radar
                        name="Competitors"
                        dataKey="Competitors"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        fillOpacity={0.6}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Competitor Analysis
              </h3>
              
              <div className="bg-muted/50 p-3 rounded-lg mb-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Competitive Advantage</div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium
                    ${competitivePosition.competitiveAdvantage === 'Strong' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : competitivePosition.competitiveAdvantage === 'Moderate'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                    {competitivePosition.competitiveAdvantage}
                  </div>
                </div>
                <div className="text-sm mt-2 text-muted-foreground">
                  {competitivePosition.competitiveAdvantage === 'Strong' 
                    ? 'Your strategy has a strong position compared to competitors.'
                    : competitivePosition.competitiveAdvantage === 'Moderate'
                      ? 'Your strategy is on par with your competitors.'
                      : 'Your strategy faces strong competition in the market.'}
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Competitor</TableHead>
                    <TableHead>Market Share</TableHead>
                    <TableHead>Strength</TableHead>
                    <TableHead>Weakness</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {competitors.map((competitor) => (
                    <TableRow key={competitor.id}>
                      <TableCell className="font-medium">{competitor.competitorName}</TableCell>
                      <TableCell>{competitor.marketShare}%</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${(competitor.strengthScore / 10) * 100}%` }}
                            ></div>
                          </div>
                          <span>{competitor.strengthScore}/10</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                            <div 
                              className="bg-amber-500 h-2.5 rounded-full" 
                              style={{ width: `${(competitor.weaknessScore / 10) * 100}%` }}
                            ></div>
                          </div>
                          <span>{competitor.weaknessScore}/10</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEditCompetitor(competitor)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>

      {/* Competitor Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? `Edit ${competitorName}` : "Add Competitor"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="competitorName">Competitor Name</Label>
              <Input
                id="competitorName"
                value={competitorName}
                onChange={(e) => setCompetitorName(e.target.value)}
                placeholder="Company name"
              />
            </div>
            
            <div className="grid gap-2">
              <div className="flex justify-between">
                <Label htmlFor="marketShare" className="flex items-center">
                  Market Share (%)
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Estimate the percentage of the market that this competitor controls
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <span className="text-sm font-mono">{marketShare}%</span>
              </div>
              <Slider
                id="marketShare"
                min={1}
                max={99}
                step={1}
                value={[marketShare]}
                onValueChange={(value) => setMarketShare(value[0])}
              />
            </div>
            
            <div className="grid gap-2">
              <div className="flex justify-between">
                <Label htmlFor="strengthScore" className="flex items-center">
                  Strength Score
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Rate the competitor's key strengths from 1 to 10
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <span className="text-sm font-mono">{strengthScore}/10</span>
              </div>
              <Slider
                id="strengthScore"
                min={1}
                max={10}
                step={1}
                value={[strengthScore]}
                onValueChange={(value) => setStrengthScore(value[0])}
              />
            </div>
            
            <div className="grid gap-2">
              <div className="flex justify-between">
                <Label htmlFor="weaknessScore" className="flex items-center">
                  Weakness Score
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Rate the competitor's key weaknesses from 1 to 10
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <span className="text-sm font-mono">{weaknessScore}/10</span>
              </div>
              <Slider
                id="weaknessScore"
                min={1}
                max={10}
                step={1}
                value={[weaknessScore]}
                onValueChange={(value) => setWeaknessScore(value[0])}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional notes about this competitor"
                rows={2}
              />
            </div>
          </div>
          
          <DialogFooter className="flex items-center justify-between">
            {isEditing && (
              <Button variant="destructive" onClick={handleDeleteCompetitor}>
                Delete
              </Button>
            )}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {isEditing ? "Update" : "Add"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CompetitorBenchmarking;
