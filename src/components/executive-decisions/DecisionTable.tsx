import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
export function DecisionTable({ decisions, loading, error }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  if (error) {
    return (
      <Card className="p-6 bg-red-50 border border-red-200 text-red-800">
        <p>{error}</p>
      </Card>
    );
  }
  if (decisions.length === 0) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-xl font-medium mb-2">No decisions found</h3>
        <p className="text-muted-foreground">
          No decisions match your current filters. Try adjusting your search
          criteria.
        </p>
      </Card>
    );
  }
  return (
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
          {decisions.map((decision) => (
            <TableRow key={decision.id}>
              <TableCell className="font-medium">
                <div>
                  <Link
                    to={`/dashboard/executives/${encodeURIComponent(decision.executiveName)}`}
                    className="hover:underline hover:text-primary"
                  >
                    {decision.executiveName}
                  </Link>
                </div>
                <div className="text-xs text-muted-foreground">
                  {decision.executiveRole}
                </div>
              </TableCell>
              <TableCell>{decision.task}</TableCell>
              <TableCell>
                <div className="font-medium">{decision.selectedOption}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {decision.reasoning}
                </div>
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
  );
}
