import React from "react";
import { Card, CardContent } from "@/components/ui/card";
const StatsCard = ({ title, value, description, icon: Icon }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-muted-foreground">
              {title}
            </h3>
            <div className="mt-1">
              <p className="text-2xl font-bold">{value}</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default StatsCard;
