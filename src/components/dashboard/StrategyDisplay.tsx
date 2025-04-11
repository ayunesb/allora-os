
import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useStrategies } from "@/hooks/useStrategies";
import { Strategy } from "@/models/strategy";
import { Loader2, Brain, TrendingUp, ArrowUpRight, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { exportStrategyToPdf } from "@/utils/strategy/pdfExport";
import { toast } from "sonner";

export function StrategyDisplay() {
  const { strategies, isLoading, error, refetch } = useStrategies();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch strategies on component mount
    refetch();
  }, [refetch]);
  
  const navigateToStrategies = () => {
    navigate("/dashboard/strategies");
  };
  
  const handleExportPDF = (strategy: Strategy) => {
    toast.info("Preparing PDF export...");
    
    setTimeout(() => {
      try {
        exportStrategyToPdf(strategy);
        toast.success("Strategy exported to PDF!");
      } catch (error) {
        console.error("Error exporting strategy:", error);
        toast.error("Failed to export strategy. Please try again.");
      }
    }, 1000);
  };
  
  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your personalized strategy...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-destructive">Error loading strategies. Please try again later.</p>
        <Button variant="outline" className="mt-4" onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }
  
  if (!strategies || strategies.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">No strategies found. Your AI Executive Team is preparing strategies for you.</p>
        <Button variant="outline" className="mt-4" onClick={() => refetch()}>Check Again</Button>
      </div>
    );
  }
  
  // Show only the first 3 strategies on the dashboard
  const displayStrategies = strategies.slice(0, 3);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">🚀 Your AI-Generated Strategic Plan</h2>
        <Button variant="outline" onClick={navigateToStrategies}>
          View All Strategies
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayStrategies.map((strategy: Strategy) => (
          <StrategyCard 
            key={strategy.id} 
            strategy={strategy} 
            onExport={() => handleExportPDF(strategy)}
          />
        ))}
      </div>
    </div>
  );
}

function StrategyCard({ strategy, onExport }: { strategy: Strategy; onExport: () => void }) {
  // Determine a color based on risk level
  const getRiskColor = (risk: string | undefined) => {
    switch (risk?.toLowerCase()) {
      case 'low':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300';
      case 'medium':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300';
      case 'high':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300';
      default:
        return 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{strategy.title}</CardTitle>
          {strategy.risk && (
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRiskColor(strategy.risk)}`}>
              {strategy.risk} Risk
            </span>
          )}
        </div>
        <CardDescription className="line-clamp-2">
          {strategy.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {strategy.impact && (
          <div className="text-sm mb-2">
            <span className="font-medium">Impact:</span> {strategy.impact}
          </div>
        )}
        {strategy.timeframe && (
          <div className="text-sm">
            <span className="font-medium">Timeframe:</span> {strategy.timeframe}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Brain className="h-4 w-4 mr-2" />
          <span>Proposed by: <span className="font-medium">{strategy.executiveBot || 'AI Executive Team'}</span></span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 px-2 text-muted-foreground hover:text-foreground"
          onClick={onExport}
        >
          <FileDown className="h-4 w-4 mr-1" />
          PDF
        </Button>
      </CardFooter>
    </Card>
  );
}
