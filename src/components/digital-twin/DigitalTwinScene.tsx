
import React, { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import { supabase } from "@/backend/supabase";
import KpiSphere from "./KpiSphere";
import KpiAxes from "./KpiAxes";
import LoadingScreen from "./LoadingScreen";

export interface KPIData {
  id: string;
  kpi: string;
  value: number;
  timestamp: string;
}

export default function DigitalTwinScene() {
  const [kpiData, setKpiData] = useState<KPIData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchKPIData() {
      try {
        // Using forecasts data from useForecastData hook as sample data
        const mockData: KPIData[] = [
          { id: '1', kpi: 'revenue', value: 15000, timestamp: new Date().toISOString() },
          { id: '2', kpi: 'churn', value: 0.12, timestamp: new Date().toISOString() },
          { id: '3', kpi: 'user_growth', value: 250, timestamp: new Date().toISOString() },
          { id: '4', kpi: 'retention', value: 0.78, timestamp: new Date().toISOString() },
          { id: '5', kpi: 'conversion_rate', value: 0.25, timestamp: new Date().toISOString() }
        ];
        
        setKpiData(mockData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch KPI data:", error);
        setLoading(false);
      }
    }

    fetchKPIData();

    // Optional Supabase Realtime Subscription - commented out until KPI history table exists
    /*
    const subscription = supabase
      .channel('kpi_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'kpi_history' }, (payload) => {
        setKpiData((current) => [...current, payload.new as KPIData]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
    */
  }, []);

  if (loading) {
    return <div className="flex h-full w-full items-center justify-center">Loading KPI data...</div>;
  }

  return (
    <Canvas>
      <color attach="background" args={['#000814']} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <Suspense fallback={<LoadingScreen />}>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        <KpiAxes />
        
        {kpiData.map((kpi, idx) => (
          <KpiSphere 
            key={kpi.id} 
            kpi={kpi} 
            position={[idx * 3 - 6, getScaledValue(kpi), 0]} 
            index={idx}
          />
        ))}
      </Suspense>
    </Canvas>
  );
}

// Helper function to scale KPI values appropriately for visualization
function getScaledValue(kpi: KPIData): number {
  switch (kpi.kpi) {
    case 'revenue':
      return (kpi.value / 5000); // Scale revenue down
    case 'churn':
      return kpi.value * 10; // Scale churn rate up (lower is better, but visualization higher = better)
    case 'user_growth':
      return kpi.value / 100;
    case 'retention':
      return kpi.value * 5;
    case 'conversion_rate':
      return kpi.value * 10;
    default:
      return kpi.value / 1000;
  }
}
