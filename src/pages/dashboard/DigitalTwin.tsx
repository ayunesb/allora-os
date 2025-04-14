
import React, { useState } from "react";
import { PageTitle } from "@/components/ui/page-title";
import DigitalTwinScene from "@/components/digital-twin/DigitalTwinScene";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/utils/i18n";
import { Button } from "@/components/ui/button";
import { RefreshCw, ZoomIn, ZoomOut, RotateCw } from "lucide-react";

export default function DigitalTwin() {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh - in a real app, this would fetch fresh data
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 p-6">
      <PageTitle 
        title={t.digitalTwin.title}
        description={t.digitalTwin.description}
      />
      
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="h-[70vh] w-full relative">
            <DigitalTwinScene />
            
            {/* Controls overlay */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button 
                variant="secondary" 
                size="sm" 
                className="backdrop-blur-sm bg-background/80"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground pt-2 pb-4">
          <p>{t.digitalTwin.tooltip || "Hover over spheres to see detailed KPI information. Drag to rotate, scroll to zoom."}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
