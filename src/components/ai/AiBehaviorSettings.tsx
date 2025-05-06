import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
export function AiBehaviorSettings() {
  const [creativeThinking, setCreativeThinking] = useState(70);
  const [riskTolerance, setRiskTolerance] = useState(50);
  const [autonomyLevel, setAutonomyLevel] = useState(60);
  const [proactiveAssistance, setProactiveAssistance] = useState(true);
  const [executiveModel, setExecutiveModel] = useState("balanced");
  const [decisionSpeed, setDecisionSpeed] = useState("normal");
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="executive-model">Executive AI Model</Label>
              <Select value={executiveModel} onValueChange={setExecutiveModel}>
                <SelectTrigger id="executive-model">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cautious">Cautious</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="aggressive">Growth-focused</SelectItem>
                  <SelectItem value="innovative">Innovative</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Determines overall approach to business decisions
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="decision-speed">Decision Speed</Label>
              <Select value={decisionSpeed} onValueChange={setDecisionSpeed}>
                <SelectTrigger id="decision-speed">
                  <SelectValue placeholder="Select speed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deliberate">Deliberate</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="fast">Fast</SelectItem>
                  <SelectItem value="immediate">Immediate</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                How quickly the AI executive team makes decisions
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="creative-thinking">Creative Thinking</Label>
                <span className="text-sm text-muted-foreground">
                  {creativeThinking}%
                </span>
              </div>
              <Slider
                id="creative-thinking"
                min={0}
                max={100}
                step={10}
                value={[creativeThinking]}
                onValueChange={(values) => setCreativeThinking(values[0])}
              />
              <p className="text-sm text-muted-foreground">
                Higher values prioritize novel and innovative solutions
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="risk-tolerance">Risk Tolerance</Label>
                <span className="text-sm text-muted-foreground">
                  {riskTolerance}%
                </span>
              </div>
              <Slider
                id="risk-tolerance"
                min={0}
                max={100}
                step={10}
                value={[riskTolerance]}
                onValueChange={(values) => setRiskTolerance(values[0])}
              />
              <p className="text-sm text-muted-foreground">
                Higher values mean more aggressive strategies
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="autonomy-level">Autonomy Level</Label>
                <span className="text-sm text-muted-foreground">
                  {autonomyLevel}%
                </span>
              </div>
              <Slider
                id="autonomy-level"
                min={0}
                max={100}
                step={10}
                value={[autonomyLevel]}
                onValueChange={(values) => setAutonomyLevel(values[0])}
              />
              <p className="text-sm text-muted-foreground">
                How independently the AI can make decisions without confirmation
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="proactive" className="mb-1 block">
                  Proactive Assistance
                </Label>
                <p className="text-sm text-muted-foreground">
                  Allow AI to suggest actions without being asked
                </p>
              </div>
              <Switch
                id="proactive"
                checked={proactiveAssistance}
                onCheckedChange={setProactiveAssistance}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
