
import React from "react";
import { PageTitle } from "@/components/ui/page-title";
import DigitalTwinScene from "@/components/digital-twin/DigitalTwinScene";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/utils/i18n";

export default function DigitalTwin() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  return (
    <div className="space-y-6 p-6">
      <PageTitle 
        title={t.digitalTwin.title}
        description={t.digitalTwin.description}
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
