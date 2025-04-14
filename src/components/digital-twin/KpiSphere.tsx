
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Mesh } from "three";
import { KPIData } from "./DigitalTwinScene";

interface KpiSphereProps {
  kpi: KPIData;
  position: [number, number, number];
  index: number;
}

export default function KpiSphere({ kpi, position, index }: KpiSphereProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  // Color mapping based on KPI type
  const getColor = (kpiType: string) => {
    switch (kpiType) {
      case 'revenue':
        return '#4ade80'; // green
      case 'churn':
        return '#f87171'; // red
      case 'user_growth':
        return '#60a5fa'; // blue
      case 'retention':
        return '#a78bfa'; // purple
      case 'conversion_rate':
        return '#fbbf24'; // yellow
      default:
        return '#94a3b8'; // slate
    }
  };
  
  // Get size based on KPI value
  const getSize = (kpi: KPIData) => {
    switch (kpi.kpi) {
      case 'revenue':
        return Math.max(0.5, Math.min(2, kpi.value / 10000));
      case 'churn':
        return Math.max(0.5, Math.min(2, 1 - kpi.value));
      case 'user_growth':
        return Math.max(0.5, Math.min(2, kpi.value / 200));
      default:
        return 0.7;
    }
  };

  // Animation effects
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle floating effect
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
      
      // Pulsing effect when hovered
      if (hovered) {
        meshRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.05;
        meshRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.05;
        meshRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.05;
      }
      
      // Rotation
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  // Format KPI value for display
  const formatValue = (kpi: KPIData) => {
    switch (kpi.kpi) {
      case 'revenue':
        return `$${kpi.value.toLocaleString()}`;
      case 'churn':
      case 'retention':
      case 'conversion_rate':
        return `${(kpi.value * 100).toFixed(1)}%`;
      default:
        return kpi.value.toString();
    }
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        scale={clicked ? 1.2 : getSize(kpi)}
        onClick={() => setClicked(!clicked)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={getColor(kpi.kpi)} 
          emissive={getColor(kpi.kpi)}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>
      
      {/* KPI Label */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {kpi.kpi.replace('_', ' ')}
      </Text>
      
      {/* Value label - only show when hovered */}
      {hovered && (
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.35}
          color="white"
          anchorX="center"
          anchorY="middle"
          backgroundColor="rgba(0,0,0,0.5)"
          padding={0.2}
        >
          {formatValue(kpi)}
        </Text>
      )}
    </group>
  );
}
