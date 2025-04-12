
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Plus, Edit2, Trash2, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { 
  fetchStrategyMilestones, 
  calculateStrategyProgress, 
  getStatusColor 
} from "@/utils/strategyImplementation/implementationUtils";
import { StrategyMilestone, ImplementationStatus } from "@/models/strategyImplementation";
import MilestoneDialog from "./MilestoneDialog";

interface StrategyImplementationTrackerProps {
  strategyId: string;
  strategyTitle: string;
}

const StrategyImplementationTracker: React.FC<StrategyImplementationTrackerProps> = ({ 
  strategyId, 
  strategyTitle 
}) => {
  const [milestones, setMilestones] = useState<StrategyMilestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalProgress, setTotalProgress] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState<StrategyMilestone | null>(null);

  useEffect(() => {
    const loadMilestones = async () => {
      setIsLoading(true);
      const data = await fetchStrategyMilestones(strategyId);
      setMilestones(data);
      setTotalProgress(calculateStrategyProgress(data));
      setIsLoading(false);
    };

    loadMilestones();
  }, [strategyId]);

  const handleAddMilestone = () => {
    setCurrentMilestone(null);
    setIsDialogOpen(true);
  };

  const handleEditMilestone = (milestone: StrategyMilestone) => {
    setCurrentMilestone(milestone);
    setIsDialogOpen(true);
  };

  const handleMilestoneSaved = (savedMilestone: StrategyMilestone) => {
    // Update the milestone list and recalculate progress
    const updated = currentMilestone
      ? milestones.map(m => m.id === savedMilestone.id ? savedMilestone : m)
      : [...milestones, savedMilestone];
    
    setMilestones(updated);
    setTotalProgress(calculateStrategyProgress(updated));
    setIsDialogOpen(false);
  };

  const handleMilestoneDeleted = (milestoneId: string) => {
    const updated = milestones.filter(m => m.id !== milestoneId);
    setMilestones(updated);
    setTotalProgress(calculateStrategyProgress(updated));
  };

  const getStatusLabel = (status: ImplementationStatus): string => {
    switch (status) {
      case 'not_started': return 'Not Started';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'delayed': return 'Delayed';
      default: return status;
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Implementation Tracker</CardTitle>
          <Button onClick={handleAddMilestone}>
            <Plus className="mr-2 h-4 w-4" />
            Add Milestone
          </Button>
        </div>
        <div className="mt-2 space-y-1">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{totalProgress}%</span>
          </div>
          <Progress value={totalProgress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-6 text-center text-muted-foreground">
            Loading milestones...
          </div>
        ) : milestones.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            <p className="mb-4">No milestones have been added yet.</p>
            <Button variant="outline" onClick={handleAddMilestone}>
              <Plus className="mr-2 h-4 w-4" />
              Create your first milestone
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Milestone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {milestones.map((milestone) => (
                <TableRow key={milestone.id}>
                  <TableCell className="font-medium">{milestone.title}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
                      {getStatusLabel(milestone.status)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-sm">{formatDistanceToNow(new Date(milestone.dueDate), { addSuffix: true })}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress value={milestone.progress} className="h-2" />
                      <span className="text-xs text-muted-foreground">{milestone.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleEditMilestone(milestone)}
                    >
                      <Edit2 className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {isDialogOpen && (
        <MilestoneDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          strategyId={strategyId}
          milestone={currentMilestone}
          onSave={handleMilestoneSaved}
          onDelete={handleMilestoneDeleted}
        />
      )}
    </Card>
  );
};

export default StrategyImplementationTracker;
