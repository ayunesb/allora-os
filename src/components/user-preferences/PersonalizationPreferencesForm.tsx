import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
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
import { useUserPreferences } from "@/hooks/useUserPreferences";
export function PersonalizationPreferencesForm() {
  const { preferences, updatePreference, isLoading } = useUserPreferences();
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Personalization</CardTitle>
        <CardDescription>
          Customize how your AI executives communicate and make decisions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Writing Style
          </label>
          <Select
            value={preferences.writingStyle || "Formal"}
            onValueChange={(value) => updatePreference("writingStyle", value)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select writing style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Casual">Casual</SelectItem>
              <SelectItem value="Formal">Formal</SelectItem>
              <SelectItem value="Visionary">Visionary</SelectItem>
              <SelectItem value="Strategic">Strategic</SelectItem>
              <SelectItem value="Aggressive">Aggressive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tone</label>
          <Select
            value={preferences.tone || "Confident"}
            onValueChange={(value) => updatePreference("tone", value)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Friendly">Friendly</SelectItem>
              <SelectItem value="Confident">Confident</SelectItem>
              <SelectItem value="Direct">Direct</SelectItem>
              <SelectItem value="Inspiring">Inspiring</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
