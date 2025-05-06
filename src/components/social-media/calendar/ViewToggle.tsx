import React from "react";
import { CalendarIcon, List } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
export function ViewToggle({ view, onViewChange, postCount }) {
  // Create a typed wrapper function for onViewChange
  const handleViewChange = (value) => {
    if (value === "calendar" || value === "list") {
      onViewChange(value);
    }
  };
  return (
    <div className="flex justify-between items-center">
      <Tabs value={view} onValueChange={handleViewChange}>
        <TabsList>
          <TabsTrigger value="calendar">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="list">
            <List className="mr-2 h-4 w-4" />
            List
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {postCount > 0 && (
        <Badge variant="outline">
          {postCount} post{postCount !== 1 ? "s" : ""}
        </Badge>
      )}
    </div>
  );
}
