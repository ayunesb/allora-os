
import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";
import * as THREE from "three";

interface KpiSphereProps {
  position: [number, number, number];
  name: string;
  value: number;
  color: string;
  size?: number;
}

export default function KpiSphere({ position, name, value, color, size = 0.5 }: KpiSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const initialY = position[1];
  
  // On mount, randomly determine if this KPI should pulse (simulating anomaly)
  useEffect(() => {
    // 20% chance of pulsing (simulating anomaly)
    if (Math.random() < 0.2) {
      setPulsing(true);
    }
  }, []);
  
  // Add animations - hover effect and pulsing for anomalies
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Gentle floating animation
    meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime) * 0.1;
    
    // Hover effect - grow slightly when hovered
    if (hovered) {
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1.2, 0.1);
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1.2, 0.1);
      meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1.2, 0.1);
    } else {
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1.0, 0.1);
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1.0, 0.1);
      meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1.0, 0.1);
    }
    
    // Pulsing animation for anomalies
    if (pulsing) {
      const pulseScale = 1.0 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      meshRef.current.material.emissiveIntensity = 0.2 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
    }
  });
  
  // Format the value for display
  const formattedValue = typeof value === 'number' && value > 999 
    ? `${(value / 1000).toFixed(1)}K` 
    : typeof value === 'number' && value < 1 
      ? `${(value * 100).toFixed(1)}%` 
      : String(value);
  
  return (
    <group>
      <mesh 
        ref={meshRef} 
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[size, 32, 16]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.3}
          metalness={0.7}
          emissive={color}
          emissiveIntensity={0.2}
        />
        
        {/* Tooltip that appears on hover */}
        {hovered && (
          <Html distanceFactor={10} position={[0, size + 0.3, 0]} center>
            <div className="bg-black/80 text-white p-2 rounded text-xs whitespace-nowrap">
              <div className="font-bold">{name}</div>
              <div className="flex justify-between gap-2">
                <span>Value:</span>
                <span className="font-mono">{formattedValue}</span>
              </div>
              {pulsing && (
                <div className="text-red-300 text-[10px] mt-1 flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></span>
                  Anomaly detected
                </div>
              )}
            </div>
          </Html>
        )}
      </mesh>
      
      {/* KPI Name Label */}
      <Text
        position={[position[0], position[1] + size + 0.3, position[2]]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="bottom"
      >
        {name}
      </Text>
      
      {/* KPI Value Label */}
      <Text
        position={[position[0], position[1] - size - 0.3, position[2]]}
        fontSize={0.25}
        color="lightblue"
        anchorX="center"
        anchorY="top"
      >
        {formattedValue}
      </Text>
    </group>
  );
}
