
import React, { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import KpiAxes from "./KpiAxes";
import LoadingScreen from "./LoadingScreen";
import KpiSphere from "./KpiSphere";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/utils/i18n";

export default function DigitalTwinScene() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  // Sample KPI data (replace with real data fetching from your API)
  const kpiData = [
    { id: 1, name: "Revenue", value: 1250000, maxValue: 2000000, color: "green" },
    { id: 2, name: "User Growth", value: 7500, maxValue: 10000, color: "blue" },
    { id: 3, name: "Churn Rate", value: 0.05, maxValue: 0.15, color: "red", isNegative: true },
    { id: 4, name: "Conversion", value: 0.12, maxValue: 0.20, color: "purple" },
    { id: 5, name: "Engagement", value: 0.35, maxValue: 0.50, color: "orange" }
  ];

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} />
      
      <Suspense fallback={<LoadingScreen />}>
        <KpiAxes />
        {kpiData.map((kpi, index) => {
          // Position evenly around the X axis
          const angle = (index / kpiData.length) * Math.PI * 2;
          const radius = 5;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          
          // Scale the value to fit our visualization
          const normalizedValue = (kpi.isNegative ? 
            1 - (kpi.value / kpi.maxValue) : 
            kpi.value / kpi.maxValue);
          
          const y = normalizedValue * 4; // Scale to a reasonable height
          
          return (
            <KpiSphere 
              key={kpi.id}
              position={[x, y, z]}
              name={kpi.name}
              value={kpi.value}
              color={kpi.color}
              size={normalizedValue * 0.8 + 0.2} // Scale size between a minimum of 0.2 and a maximum of 1.0
            />
          );
        })}
      </Suspense>
      
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        zoomSpeed={0.6}
        panSpeed={0.5}
        rotateSpeed={0.5}
      />
    </Canvas>
  );
}
