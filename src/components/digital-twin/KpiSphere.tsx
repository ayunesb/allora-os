
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
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
  
  // Add a subtle animation effect
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
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
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 16]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.3}
          metalness={0.7}
          emissive={color}
          emissiveIntensity={0.2}
        />
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
