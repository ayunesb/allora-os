
import React from "react";
import { Text, Line } from "@react-three/drei";

export default function KpiAxes() {
  return (
    <group>
      {/* X Axis */}
      <Line
        points={[[-10, 0, 0], [10, 0, 0]]}
        color="white"
        lineWidth={1}
        dashed={true}
        opacity={0.3}
      />
      <Text
        position={[11, 0, 0]}
        fontSize={0.5}
        color="white"
        anchorX="left"
      >
        KPIs
      </Text>
      
      {/* Y Axis */}
      <Line
        points={[[0, -5, 0], [0, 5, 0]]}
        color="white"
        lineWidth={1}
        dashed={true}
        opacity={0.3}
      />
      <Text
        position={[0, 5.5, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
      >
        Value
      </Text>
      
      {/* Z Axis (not as prominent) */}
      <Line
        points={[[0, 0, -5], [0, 0, 5]]}
        color="white"
        lineWidth={1}
        dashed={true}
        opacity={0.1}
      />
    </group>
  );
}
