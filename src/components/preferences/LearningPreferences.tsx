import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, LineChart, History, Globe, BookOpen } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
export default function LearningPreferences({ preferences, updatePreference }) {
  const handleLearningRateChange = (value) => {
    updatePreference("learningRate", value[0]);
  };
  const toggleFeedbackLearning = (enabled) => {
    updatePreference("enableFeedbackLearning", enabled);
  };
  const toggleAutomaticResearch = (enabled) => {
    updatePreference("enableAutomaticResearch", enabled);
  };
  const toggleContentAnalysis = (enabled) => {
    updatePreference("enableContentAnalysis", enabled);
  };
  const toggleKnowledgeAreas = (area, checked) => {
    const currentAreas = preferences.knowledgeAreas || [];
    let newAreas;
    if (checked) {
      newAreas = [...currentAreas, area];
    } else {
      newAreas = currentAreas.filter((a) => a !== area);
    }
    updatePreference("knowledgeAreas", newAreas);
  };
  return (
    <div className="space-y-6">
      <div>
        <Label className="flex items-center gap-2 mb-3">
          <Brain className="h-4 w-4 text-violet-500" />
          Learning Capabilities
        </Label>

        <Card className="border-dashed">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label
                  htmlFor="enableFeedbackLearning"
                  className="flex items-center gap-2"
                >
                  <LineChart className="h-4 w-4 text-green-500" />
                  Learn from Your Feedback
                </Label>
                <p className="text-sm text-muted-foreground">
                  Allow AI to adjust responses based on your likes and dislikes
                </p>
              </div>
              <Switch
                id="enableFeedbackLearning"
                checked={preferences.enableFeedbackLearning || false}
                onCheckedChange={toggleFeedbackLearning}
              />
            </div>

            <div>
              <Label className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-amber-500" />
                Learning Rate
              </Label>
              <div className="pt-4 pb-2">
                <Slider
                  value={[preferences.learningRate || 0.5]}
                  min={0.1}
                  max={1.0}
                  step={0.1}
                  onValueChange={handleLearningRateChange}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Conservative</span>
                <span>Balanced</span>
                <span>Aggressive</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                How quickly the AI adapts to your preferences
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <Label
                  htmlFor="enableAutomaticResearch"
                  className="flex items-center gap-2"
                >
                  <Globe className="h-4 w-4 text-blue-500" />
                  Automatic Research
                </Label>
                <p className="text-sm text-muted-foreground">
                  Allow AI to search for up-to-date information on topics
                </p>
              </div>
              <Switch
                id="enableAutomaticResearch"
                checked={preferences.enableAutomaticResearch || false}
                onCheckedChange={toggleAutomaticResearch}
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <Label
                  htmlFor="enableContentAnalysis"
                  className="flex items-center gap-2"
                >
                  <History className="h-4 w-4 text-indigo-500" />
                  Content Analysis
                </Label>
                <p className="text-sm text-muted-foreground">
                  Enable analysis of your documents and past conversations
                </p>
              </div>
              <Switch
                id="enableContentAnalysis"
                checked={preferences.enableContentAnalysis || false}
                onCheckedChange={toggleContentAnalysis}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Label className="flex items-center gap-2 mb-3">
          Knowledge Areas to Prioritize
        </Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="business"
              checked={(preferences.knowledgeAreas || []).includes("business")}
              onCheckedChange={(checked) =>
                toggleKnowledgeAreas("business", checked)
              }
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="business"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Business Strategy
              </Label>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="technology"
              checked={(preferences.knowledgeAreas || []).includes(
                "technology",
              )}
              onCheckedChange={(checked) =>
                toggleKnowledgeAreas("technology", checked)
              }
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="technology"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Technology Trends
              </Label>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="marketing"
              checked={(preferences.knowledgeAreas || []).includes("marketing")}
              onCheckedChange={(checked) =>
                toggleKnowledgeAreas("marketing", checked)
              }
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="marketing"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Marketing & Sales
              </Label>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="innovation"
              checked={(preferences.knowledgeAreas || []).includes(
                "innovation",
              )}
              onCheckedChange={(checked) =>
                toggleKnowledgeAreas("innovation", checked)
              }
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="innovation"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Innovation Research
              </Label>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="finance"
              checked={(preferences.knowledgeAreas || []).includes("finance")}
              onCheckedChange={(checked) =>
                toggleKnowledgeAreas("finance", checked)
              }
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="finance"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Finance & Investment
              </Label>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="operations"
              checked={(preferences.knowledgeAreas || []).includes(
                "operations",
              )}
              onCheckedChange={(checked) =>
                toggleKnowledgeAreas("operations", checked)
              }
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="operations"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Operations & Logistics
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
