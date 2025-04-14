
import React from "react";
import { Text, Html } from "@react-three/drei";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/utils/i18n";

export default function LoadingScreen() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  return (
    <Html center>
      <div className="flex flex-col items-center">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <Text 
          fontSize={0.5} 
          color="white"
        >
          {t.digitalTwin.loading}
        </Text>
      </div>
    </Html>
  );
}
