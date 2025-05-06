import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { useAuthState } from "@/hooks/useAuthState";
import { Badge } from "@/components/ui/badge";
import { Check, Pen, Brain } from "lucide-react";
export function PreferencesForm() {
  const { user } = useAuthState();
  const { preferences, updatePreference, isLoading, lastSyncTime } =
    useUserPreferences();
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p>Please log in to set your AI preferences.</p>
        </CardContent>
      </Card>
    );
  }
  const handlePreferenceChange = async (key, value) => {
    try {
      await updatePreference(key, value);
      toast({
        title: "Preference updated",
        description: `Your ${key.replace(/([A-Z])/g, " $1").toLowerCase()} has been updated.`,
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description:
          "There was an error updating your preference. Please try again.",
        variant: "destructive",
      });
    }
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">
              🧠 Personalize Your AI Executives
            </CardTitle>
            <CardDescription>
              Customize how your AI executives think, communicate, and make
              decisions
            </CardDescription>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1"
          >
            {isEditing ? (
              <Check className="h-4 w-4" />
            ) : (
              <Pen className="h-4 w-4" />
            )}
            {isEditing ? "Done" : "Edit"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-2">
              Communication Style
            </label>
            {isEditing ? (
              <Select
                value={preferences.responseStyle}
                onValueChange={(value) =>
                  handlePreferenceChange("responseStyle", value)
                }
                disabled={isLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select communication style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concise">Concise</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Badge
                variant="outline"
                className="capitalize px-3 py-1 font-normal"
              >
                {preferences.responseStyle || "Not set"}
              </Badge>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              How verbose you want your AI executives to be in their
              communications
            </p>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">
              Risk Appetite
            </label>
            {isEditing ? (
              <Select
                value={preferences.riskAppetite}
                onValueChange={(value) =>
                  handlePreferenceChange("riskAppetite", value)
                }
                disabled={isLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select risk appetite" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Conservative</SelectItem>
                  <SelectItem value="medium">Medium - Balanced</SelectItem>
                  <SelectItem value="high">High - Aggressive</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Badge
                variant="outline"
                className={`capitalize px-3 py-1 font-normal ${
                  preferences.riskAppetite === "high"
                    ? "bg-red-100 text-red-800 border-red-200"
                    : preferences.riskAppetite === "low"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-yellow-100 text-yellow-800 border-yellow-200"
                }`}
              >
                {preferences.riskAppetite || "Not set"}
              </Badge>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              How much risk your AI executives should take in their decisions
            </p>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">
              Technical Level
            </label>
            {isEditing ? (
              <Select
                value={preferences.technicalLevel}
                onValueChange={(value) =>
                  handlePreferenceChange("technicalLevel", value)
                }
                disabled={isLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select technical level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic - Simple language</SelectItem>
                  <SelectItem value="intermediate">
                    Intermediate - Some terminology
                  </SelectItem>
                  <SelectItem value="advanced">
                    Advanced - Industry terminology
                  </SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Badge
                variant="outline"
                className="capitalize px-3 py-1 font-normal"
              >
                {preferences.technicalLevel || "Not set"}
              </Badge>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              How technical you want the language to be in executive
              communications
            </p>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Focus Area</label>
            {isEditing ? (
              <Select
                value={preferences.focusArea}
                onValueChange={(value) =>
                  handlePreferenceChange("focusArea", value)
                }
                disabled={isLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select focus area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Business</SelectItem>
                  <SelectItem value="strategy">Strategy</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Badge
                variant="outline"
                className="capitalize px-3 py-1 font-normal"
              >
                {preferences.focusArea || "Not set"}
              </Badge>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Business area to emphasize in executive responses
            </p>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">
              Preferred AI Model
            </label>
            {isEditing ? (
              <Select
                value={preferences.modelPreference}
                onValueChange={(value) =>
                  handlePreferenceChange("modelPreference", value)
                }
                disabled={isLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select AI model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">
                    Auto (System chooses best model)
                  </SelectItem>
                  <SelectItem value="smart">
                    Smart (Balanced speed/quality)
                  </SelectItem>
                  <SelectItem value="powerful">
                    Powerful (Highest quality)
                  </SelectItem>
                  <SelectItem value="fast">Fast (Quickest response)</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Badge
                variant="outline"
                className="capitalize px-3 py-1 font-normal"
              >
                {preferences.modelPreference || "Auto"}
              </Badge>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Which AI model you prefer your executives to use
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3 border-t pt-5 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-primary" />
          <span>
            Your preferences will be applied to all AI executive interactions
          </span>
        </div>
        {lastSyncTime && (
          <div className="text-xs text-muted-foreground">
            Last updated: {lastSyncTime.toLocaleString()}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
