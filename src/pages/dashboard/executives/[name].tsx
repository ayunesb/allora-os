
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { PageTitle } from "@/components/ui/page-title";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExecutiveDecision } from "@/types/agents";

export default function ExecutiveProfile() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [decisions, setDecisions] = useState<ExecutiveDecision[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [executiveRole, setExecutiveRole] = useState<string>("");
  
  useEffect(() => {
    if (!name) return;

    async function fetchDecisions() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("executive_decisions")
          .select("*")
          .eq("executive_name", name)
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        const formattedData = (data || []).map(item => ({
          id: item.id,
          executiveName: item.executive_name,
          executiveRole: item.executive_role,
          task: item.task,
          options: item.options,
          selectedOption: item.selected_option,
          reasoning: item.reasoning,
          riskAssessment: item.risk_assessment,
          timestamp: item.created_at,
          priority: item.priority
        }));

        if (formattedData.length > 0) {
          setExecutiveRole(formattedData[0].executiveRole);
        }
        
        setDecisions(formattedData);
        setError(null);
      } catch (err) {
        console.error("Failed to load executive decisions:", err);
        setError("Could not load decisions for this executive. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchDecisions();
  }, [name]);

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const calculateAverageRisk = () => {
    if (!decisions.length) return "N/A";
    
    // Count decisions with numeric risk assessments
    let count = 0;
    const sum = decisions.reduce((acc, decision) => {
      if (decision.riskAssessment && !isNaN(parseInt(decision.riskAssessment))) {
        count++;
        return acc + parseInt(decision.riskAssessment);
      }
      return acc;
    }, 0);
    
    return count ? (sum / count).toFixed(1) : "N/A";
  };

  const goBack = () => {
    navigate('/dashboard/decisions');
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <Button onClick={goBack} variant="outline" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Decision Log
        </Button>
        <Card className="p-6 bg-red-50 border border-red-200 text-red-800">
          <p>{error}</p>
        </Card>
      </div>
    );
  }

  if (!decisions.length) {
    return (
      <div className="container mx-auto py-6">
        <Button onClick={goBack} variant="outline" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Decision Log
        </Button>
        <Card className="p-8 text-center">
          <h3 className="text-xl font-medium mb-2">No decisions found</h3>
          <p className="text-muted-foreground">
            No decisions were found for executive: {name}
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <Button onClick={goBack} variant="outline" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Decision Log
      </Button>
      
      <PageTitle 
        title={`Executive Profile: ${name}`} 
        description={`${executiveRole} • ${decisions.length} decisions`}
      />

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <BarChart2 className="mr-2 h-5 w-5 text-primary" /> 
            Risk Assessment
          </h3>
          <p className="text-3xl font-bold">{calculateAverageRisk()}</p>
          <p className="text-muted-foreground text-sm mt-1">Average risk score</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">Decision Count</h3>
          <p className="text-3xl font-bold">{decisions.length}</p>
          <p className="text-muted-foreground text-sm mt-1">Total decisions made</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">Latest Decision</h3>
          <p className="font-medium line-clamp-2">{decisions[0].task}</p>
          <p className="text-muted-foreground text-sm mt-1">
            {new Date(decisions[0].timestamp).toLocaleDateString()}
          </p>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Decision</TableHead>
              <TableHead>Risk Assessment</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {decisions.map((decision) => (
              <TableRow key={decision.id}>
                <TableCell>{decision.task}</TableCell>
                <TableCell>
                  <div className="font-medium">{decision.selectedOption}</div>
                  <div className="text-sm text-muted-foreground mt-1">{decision.reasoning}</div>
                </TableCell>
                <TableCell>
                  {decision.riskAssessment || "No risk assessment"}
                </TableCell>
                <TableCell>
                  {decision.priority && (
                    <Badge className={getPriorityColor(decision.priority)}>
                      {decision.priority}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {new Date(decision.timestamp).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
