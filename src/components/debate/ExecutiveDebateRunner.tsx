import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { runDebateSession } from "@/agents/debate/debateSession";
import { toast } from "sonner";
import { Loader2, AlertTriangle, ThumbsUp, ThumbsDown } from "lucide-react";
export default function ExecutiveDebateRunner() {
    const [task, setTask] = useState("");
    const [riskAppetite, setRiskAppetite] = useState("medium");
    const [businessPriority, setBusinessPriority] = useState("growth");
    const [isLoading, setIsLoading] = useState(false);
    const [debateResult, setDebateResult] = useState(null);
    const runDebate = async () => {
        if (!task) {
            toast.error("Please enter a task to debate");
            return;
        }
        setIsLoading(true);
        try {
            const result = await runDebateSession(task, riskAppetite, businessPriority);
            setDebateResult(result);
            toast.success("Executive debate completed");
        }
        catch (error) {
            console.error("Error running debate:", error);
            toast.error("Failed to run executive debate");
        }
        finally {
            setIsLoading(false);
        }
    };
    return (<div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Executive Debate</CardTitle>
          <CardDescription>
            Have your AI executive team debate a strategic decision
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task">Task or Decision to Debate</Label>
            <Textarea id="task" placeholder="e.g., Launch a new product line in Q3" value={task} onChange={(e) => setTask(e.target.value)}/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="risk-appetite">Risk Appetite</Label>
              <Select value={riskAppetite} onValueChange={setRiskAppetite}>
                <SelectTrigger id="risk-appetite">
                  <SelectValue placeholder="Select risk appetite"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="business-priority">Business Priority</Label>
              <Select value={businessPriority} onValueChange={setBusinessPriority}>
                <SelectTrigger id="business-priority">
                  <SelectValue placeholder="Select priority"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="growth">Growth</SelectItem>
                  <SelectItem value="profit">Profit</SelectItem>
                  <SelectItem value="innovation">Innovation</SelectItem>
                  <SelectItem value="stability">Stability</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={runDebate} disabled={isLoading || !task} className="w-full">
            {isLoading ? (<>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Running Debate...
              </>) : ("Run Executive Debate")}
          </Button>
        </CardFooter>
      </Card>

      {debateResult && (<Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Debate Results
              {debateResult.summary.majority === "For" ? (<div className="flex items-center text-green-500">
                  <ThumbsUp className="h-5 w-5 mr-1"/>
                  <span>Approved</span>
                </div>) : debateResult.summary.majority === "Against" ? (<div className="flex items-center text-red-500">
                  <ThumbsDown className="h-5 w-5 mr-1"/>
                  <span>Rejected</span>
                </div>) : (<div className="flex items-center text-yellow-500">
                  <AlertTriangle className="h-5 w-5 mr-1"/>
                  <span>Tie</span>
                </div>)}
            </CardTitle>
            <CardDescription>
              Task: {debateResult.task}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-2 justify-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-lg text-center">
                <div className="text-2xl font-bold">{debateResult.summary.totalExecutives}</div>
                <div className="text-sm">Executives</div>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-lg text-center">
                <div className="text-2xl font-bold">{debateResult.summary.forVotes}</div>
                <div className="text-sm">For</div>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-lg text-center">
                <div className="text-2xl font-bold">{debateResult.summary.againstVotes}</div>
                <div className="text-sm">Against</div>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 rounded-lg text-center">
                <div className="text-2xl font-bold">{`${(debateResult.summary.confidenceScore * 100).toFixed()}%`}</div>
                <div className="text-sm">Confidence</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Top Risks</h3>
                <ul className="list-disc list-inside space-y-1">
                  {debateResult.summary.topRisks.map((risk, i) => (<li key={i} className="text-sm">{risk}</li>))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Top Opportunities</h3>
                <ul className="list-disc list-inside space-y-1">
                  {debateResult.summary.topOpportunities.map((opp, i) => (<li key={i} className="text-sm">{opp}</li>))}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Executive Opinions</h3>
              {debateResult.debates.map((debate, i) => (<div key={i} className="border rounded-lg p-3 bg-muted/20">
                  <div className="flex justify-between mb-2">
                    <div className="font-medium">
                      {debate.executiveName} ({debate.role})
                    </div>
                    <div className={`px-2 py-0.5 rounded text-xs font-medium ${debate.stance === "For" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
                    debate.stance === "Against" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"}`}>
                      {debate.stance}
                    </div>
                  </div>
                  <div className="text-sm max-h-20 overflow-y-auto">
                    {debate.opinion.split('\n').map((line, i) => (line.trim() ? <p key={i} className="mb-1">{line}</p> : null))}
                  </div>
                </div>))}
            </div>
          </CardContent>
        </Card>)}
    </div>);
}
