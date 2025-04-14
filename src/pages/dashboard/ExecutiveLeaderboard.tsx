
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { PageTitle } from "@/components/ui/page-title";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Medal, Award, TrendingUp, Brain, ShieldAlert } from 'lucide-react';
import { Link } from "react-router-dom";

interface LeaderboardEntry {
  executiveName: string;
  executiveRole: string;
  decisionCount: number;
  averageRisk: number;
  priorityScore: number;
}

export default function ExecutiveLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchLeaderboardData() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("executive_decisions")
          .select("executive_name, executive_role, priority, risk_assessment");

        if (error) {
          throw error;
        }

        // Process the data to create leaderboard entries
        const executiveMap = new Map<string, {
          name: string,
          role: string,
          decisions: number,
          totalRisk: number,
          priorityTotal: number
        }>();

        data.forEach(decision => {
          const name = decision.executive_name;
          const riskValue = decision.risk_assessment ? parseFloat(decision.risk_assessment) : 0;
          
          // Calculate priority score: High = 3, Medium = 2, Low = 1
          let priorityValue = 0;
          if (decision.priority === 'high') priorityValue = 3;
          else if (decision.priority === 'medium') priorityValue = 2;
          else if (decision.priority === 'low') priorityValue = 1;

          if (!executiveMap.has(name)) {
            executiveMap.set(name, {
              name,
              role: decision.executive_role,
              decisions: 1,
              totalRisk: riskValue,
              priorityTotal: priorityValue
            });
          } else {
            const entry = executiveMap.get(name)!;
            entry.decisions += 1;
            entry.totalRisk += riskValue;
            entry.priorityTotal += priorityValue;
          }
        });

        // Convert map to array and calculate averages
        const leaderboardData = Array.from(executiveMap.entries()).map(([_, value]) => ({
          executiveName: value.name,
          executiveRole: value.role,
          decisionCount: value.decisions,
          averageRisk: value.decisions > 0 ? value.totalRisk / value.decisions : 0,
          priorityScore: value.decisions > 0 ? value.priorityTotal / value.decisions : 0
        }));

        setLeaderboard(leaderboardData);
        setError(null);
      } catch (err) {
        console.error("Failed to load leaderboard data:", err);
        setError("Could not load leaderboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboardData();
  }, []);

  // Render a medal based on position
  const getMedal = (position: number) => {
    switch (position) {
      case 0:
        return <Medal className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Medal className="h-5 w-5 text-amber-700" />;
      default:
        return null;
    }
  };

  // Function to get color based on risk score
  const getRiskColor = (score: number) => {
    if (score >= 4) return 'text-red-500';
    if (score >= 3) return 'text-orange-500';
    if (score >= 2) return 'text-yellow-500';
    return 'text-green-500';
  };

  // Function to get color based on priority score
  const getPriorityColor = (score: number) => {
    if (score >= 2.5) return 'text-purple-500';
    if (score >= 1.5) return 'text-blue-500';
    return 'text-gray-500';
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <PageTitle 
          title="Executive Leaderboard" 
          description="Top performing AI executives by decisions, risk, and priorities"
        />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <PageTitle 
          title="Executive Leaderboard" 
          description="Top performing AI executives by decisions, risk, and priorities"
        />
        <Card className="p-6 bg-red-50 border border-red-200 text-red-800">
          <p>{error}</p>
        </Card>
      </div>
    );
  }

  // Sort leaderboards by different metrics
  const byDecisions = [...leaderboard].sort((a, b) => b.decisionCount - a.decisionCount);
  const byRisk = [...leaderboard].sort((a, b) => b.averageRisk - a.averageRisk);
  const byPriority = [...leaderboard].sort((a, b) => b.priorityScore - a.priorityScore);

  return (
    <div className="container mx-auto py-6">
      <PageTitle 
        title="Executive Leaderboard" 
        description="Top performing AI executives by decisions, risk, and priorities"
      />

      <Tabs defaultValue="decisions" className="w-full mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="decisions">
            <Brain className="mr-2 h-4 w-4" /> Most Decisions
          </TabsTrigger>
          <TabsTrigger value="risk">
            <ShieldAlert className="mr-2 h-4 w-4" /> Risk Takers
          </TabsTrigger>
          <TabsTrigger value="priority">
            <TrendingUp className="mr-2 h-4 w-4" /> Priority Focused
          </TabsTrigger>
        </TabsList>

        <TabsContent value="decisions">
          <Card className="p-0 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Executive</TableHead>
                  <TableHead className="text-right">Decisions Made</TableHead>
                  <TableHead className="text-right">Avg. Risk Score</TableHead>
                  <TableHead className="text-right">Avg. Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {byDecisions.map((entry, index) => (
                  <TableRow key={entry.executiveName} className={index < 3 ? 'bg-muted/20' : ''}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {getMedal(index)}
                        <span className="ml-2">#{index + 1}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link 
                        to={`/dashboard/executives/${encodeURIComponent(entry.executiveName)}`} 
                        className="hover:underline hover:text-primary font-medium"
                      >
                        {entry.executiveName}
                      </Link>
                      <div className="text-xs text-muted-foreground">{entry.executiveRole}</div>
                    </TableCell>
                    <TableCell className="text-right font-bold">{entry.decisionCount}</TableCell>
                    <TableCell className={`text-right ${getRiskColor(entry.averageRisk)}`}>
                      {entry.averageRisk.toFixed(1)}
                    </TableCell>
                    <TableCell className={`text-right ${getPriorityColor(entry.priorityScore)}`}>
                      {entry.priorityScore.toFixed(1)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="risk">
          <Card className="p-0 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Executive</TableHead>
                  <TableHead className="text-right">Avg. Risk Score</TableHead>
                  <TableHead className="text-right">Decisions Made</TableHead>
                  <TableHead className="text-right">Avg. Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {byRisk.map((entry, index) => (
                  <TableRow key={entry.executiveName} className={index < 3 ? 'bg-muted/20' : ''}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {getMedal(index)}
                        <span className="ml-2">#{index + 1}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link 
                        to={`/dashboard/executives/${encodeURIComponent(entry.executiveName)}`} 
                        className="hover:underline hover:text-primary font-medium"
                      >
                        {entry.executiveName}
                      </Link>
                      <div className="text-xs text-muted-foreground">{entry.executiveRole}</div>
                    </TableCell>
                    <TableCell className={`text-right font-bold ${getRiskColor(entry.averageRisk)}`}>
                      {entry.averageRisk.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-right">{entry.decisionCount}</TableCell>
                    <TableCell className={`text-right ${getPriorityColor(entry.priorityScore)}`}>
                      {entry.priorityScore.toFixed(1)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="priority">
          <Card className="p-0 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Executive</TableHead>
                  <TableHead className="text-right">Avg. Priority</TableHead>
                  <TableHead className="text-right">Decisions Made</TableHead>
                  <TableHead className="text-right">Avg. Risk Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {byPriority.map((entry, index) => (
                  <TableRow key={entry.executiveName} className={index < 3 ? 'bg-muted/20' : ''}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {getMedal(index)}
                        <span className="ml-2">#{index + 1}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link 
                        to={`/dashboard/executives/${encodeURIComponent(entry.executiveName)}`} 
                        className="hover:underline hover:text-primary font-medium"
                      >
                        {entry.executiveName}
                      </Link>
                      <div className="text-xs text-muted-foreground">{entry.executiveRole}</div>
                    </TableCell>
                    <TableCell className={`text-right font-bold ${getPriorityColor(entry.priorityScore)}`}>
                      {entry.priorityScore.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-right">{entry.decisionCount}</TableCell>
                    <TableCell className={`text-right ${getRiskColor(entry.averageRisk)}`}>
                      {entry.averageRisk.toFixed(1)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Executive Leadership Stats</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          View performance metrics for your AI executive team. The leadership board ranks executives based on 
          decision volume, risk tolerance, and priority levels.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-medium flex items-center">
              <Brain className="h-4 w-4 mr-2 text-blue-500" /> Decision Score
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Total number of decisions made by each executive
            </p>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-medium flex items-center">
              <ShieldAlert className="h-4 w-4 mr-2 text-orange-500" /> Risk Score
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Average risk level of decisions (higher = more risky)
            </p>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-purple-500" /> Priority Score
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Average priority level (High = 3, Medium = 2, Low = 1)
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
