
import React from "react";
import { PageTitle } from "@/components/ui/page-title";
import DigitalTwinScene from "@/components/digital-twin/DigitalTwinScene";
import { Card, CardContent } from "@/components/ui/card";

export default function DigitalTwin() {
  return (
    <div className="space-y-6 p-6">
      <PageTitle 
        title="Digital Twin Dashboard" 
        description="3D visualization of your company's key performance indicators"
      />
      
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="h-[70vh] w-full">
            <DigitalTwinScene />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
