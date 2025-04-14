
import React, { useState, useEffect } from 'react';
import { PageTitle } from "@/components/ui/page-title";
import { getExecutiveDecisions } from "@/agents/decisionService";
import { ExecutiveDecision } from "@/types/agents";
import { Card } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function ExecutiveDecisions() {
  const [decisions, setDecisions] = useState<ExecutiveDecision[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [executiveFilter, setExecutiveFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [riskFilter, setRiskFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    async function loadDecisions() {
      try {
        setLoading(true);
        const decisionsData = await getExecutiveDecisions();
        setDecisions(decisionsData);
        setError(null);
      } catch (err) {
        console.error("Failed to load executive decisions:", err);
        setError("Could not load executive decisions. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadDecisions();
  }, []);

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

  // Filter the decisions based on all filter criteria
  const filteredDecisions = decisions.filter((decision) => {
    const matchesExecutive = executiveFilter
      ? decision.executiveName.toLowerCase().includes(executiveFilter.toLowerCase())
      : true;

    const matchesPriority = priorityFilter
      ? decision.priority?.toLowerCase() === priorityFilter.toLowerCase()
      : true;

    const matchesRisk = riskFilter
      ? decision.riskAssessment?.includes(riskFilter)
      : true;

    const matchesSearch = searchQuery
      ? (decision.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
         decision.selectedOption.toLowerCase().includes(searchQuery.toLowerCase()) ||
         (decision.reasoning && decision.reasoning.toLowerCase().includes(searchQuery.toLowerCase())))
      : true;

    return matchesExecutive && matchesPriority && matchesRisk && matchesSearch;
  });

  return (
    <div className="container mx-auto py-6">
      <PageTitle 
        title="Executive Decision Log" 
        description="Review decisions made by your AI executive team"
      />

      <div className="flex flex-wrap gap-4 mb-8">
        {/* Search */}
        <Input
          type="text"
          placeholder="Search by task or decision..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />

        {/* Executive Filter */}
        <Input
          type="text"
          placeholder="Filter by Executive..."
          value={executiveFilter}
          onChange={(e) => setExecutiveFilter(e.target.value)}
          className="max-w-sm"
        />

        {/* Priority Filter */}
        <Select
          value={priorityFilter}
          onValueChange={setPriorityFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        {/* Risk Filter */}
        <Select
          value={riskFilter}
          onValueChange={setRiskFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Risks" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Risks</SelectItem>
            {[1, 2, 3, 4, 5].map((score) => (
              <SelectItem key={score} value={score.toString()}>{score.toString()}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <Card className="p-6 bg-red-50 border border-red-200 text-red-800">
          <p>{error}</p>
        </Card>
      ) : filteredDecisions.length === 0 ? (
        <Card className="p-8 text-center">
          <h3 className="text-xl font-medium mb-2">No decisions found</h3>
          <p className="text-muted-foreground">
            {decisions.length > 0 
              ? "No decisions match your current filters. Try adjusting your search criteria."
              : "Your AI executives haven't made any decisions yet. They will automatically analyze business situations and record their decisions here."}
          </p>
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Executive</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Decision</TableHead>
                <TableHead>Risk Assessment</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDecisions.map((decision) => (
                <TableRow key={decision.id}>
                  <TableCell className="font-medium">
                    <div>{decision.executiveName}</div>
                    <div className="text-xs text-muted-foreground">{decision.executiveRole}</div>
                  </TableCell>
                  <TableCell>{decision.task}</TableCell>
                  <TableCell>
                    <div className="font-medium">{decision.selectedOption}</div>
                    <div className="text-sm text-muted-foreground mt-1">{decision.reasoning}</div>
                  </TableCell>
                  <TableCell className="max-w-xs">
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
      )}
    </div>
  );
}
