import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Download, Save } from "lucide-react";
const DebateSummary = ({
  debateTitle,
  onReturnToDebate,
  onExportSummary,
  onSaveToReports,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Executive Summary</CardTitle>
        <CardDescription>
          AI-generated summary of the key points and decisions from the debate
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 border rounded-lg bg-muted/50">
          <h3 className="text-lg font-medium mb-2">{debateTitle}</h3>
          <div className="space-y-3">
            <p>
              This executive summary provides an overview of the key points
              discussed during the {debateTitle} debate.
            </p>

            <h4 className="font-medium">Key Insights:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                The CEO emphasized the importance of aligning our strategy with
                long-term vision and mission.
              </li>
              <li>
                The CFO highlighted the need for careful budgeting and ROI
                analysis for all initiatives.
              </li>
              <li>
                The CTO suggested leveraging emerging technologies to gain
                competitive advantage.
              </li>
              <li>
                The CMO stressed the importance of aligning with our brand
                positioning and customer needs.
              </li>
            </ul>

            <h4 className="font-medium">Recommendations:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Develop a comprehensive roadmap that balances short-term results
                with long-term goals.
              </li>
              <li>
                Establish clear metrics for measuring success and ROI for all
                initiatives.
              </li>
              <li>
                Create cross-functional teams to ensure holistic implementation
                of strategies.
              </li>
              <li>
                Regularly review and adjust approaches based on market feedback
                and performance data.
              </li>
            </ul>

            <h4 className="font-medium">Next Steps:</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                Schedule follow-up meeting to assign action items and
                responsibilities.
              </li>
              <li>
                Prepare detailed implementation plan with timelines and resource
                requirements.
              </li>
              <li>Develop communication strategy for stakeholders.</li>
              <li>
                Set up regular review cycles to track progress and make
                adjustments.
              </li>
            </ol>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onReturnToDebate}>
          Return to Debate
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onExportSummary}>
            <Download className="h-4 w-4 mr-1" />
            Export Summary
          </Button>
          <Button onClick={onSaveToReports}>
            <Save className="h-4 w-4 mr-1" />
            Save to Reports
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
export default DebateSummary;
