
import React from "react";
import { Text, Line } from "@react-three/drei";
import * as THREE from "three";

export default function KpiAxes() {
  // Set up axes dimensions
  const axisLength = 6;
  const axisColor = "white";
  const axisWidth = 1;
  
  // Define grid properties
  const gridSize = 10;
  const gridDivisions = 10;
  const gridColor = "#1a1a2a";
  
  return (
    <>
      {/* X-Axis */}
      <Line
        points={[
          [-axisLength, 0, 0],
          [axisLength, 0, 0]
        ]}
        color={axisColor}
        lineWidth={axisWidth}
      />
      <Text
        position={[axisLength + 0.5, 0, 0]}
        color={axisColor}
        fontSize={0.5}
        anchorX="left"
      >
        X
      </Text>
      
      {/* Y-Axis */}
      <Line
        points={[
          [0, -axisLength, 0],
          [0, axisLength, 0]
        ]}
        color={axisColor}
        lineWidth={axisWidth}
      />
      <Text
        position={[0, axisLength + 0.5, 0]}
        color={axisColor}
        fontSize={0.5}
        anchorX="center"
        anchorY="bottom"
      >
        Y
      </Text>
      
      {/* Z-Axis */}
      <Line
        points={[
          [0, 0, -axisLength],
          [0, 0, axisLength]
        ]}
        color={axisColor}
        lineWidth={axisWidth}
      />
      <Text
        position={[0, 0, axisLength + 0.5]}
        color={axisColor}
        fontSize={0.5}
        anchorX="center"
        anchorY="middle" // Changed from "center" to "middle" which is a valid value
      >
        Z
      </Text>
      
      {/* Bottom Grid */}
      <gridHelper 
        args={[gridSize, gridDivisions, gridColor, gridColor]} 
        position={[0, -0.01, 0]}
        rotation={[0, 0, 0]}
      />
      
      {/* Add some tick marks with labels */}
      {[-4, -2, 2, 4].map((pos) => (
        <React.Fragment key={`x-tick-${pos}`}>
          <Line
            points={[
              [pos, -0.1, 0],
              [pos, 0.1, 0]
            ]}
            color={axisColor}
            lineWidth={axisWidth}
          />
          <Text
            position={[pos, -0.3, 0]}
            color={axisColor}
            fontSize={0.3}
            anchorX="center"
            anchorY="top"
          >
            {pos}
          </Text>
        </React.Fragment>
      ))}
      
      {[-4, -2, 2, 4].map((pos) => (
        <React.Fragment key={`y-tick-${pos}`}>
          <Line
            points={[
              [-0.1, pos, 0],
              [0.1, pos, 0]
            ]}
            color={axisColor}
            lineWidth={axisWidth}
          />
          <Text
            position={[-0.3, pos, 0]}
            color={axisColor}
            fontSize={0.3}
            anchorX="right"
            anchorY="middle" // Changed from "center" to "middle" which is a valid value
          >
            {pos}
          </Text>
        </React.Fragment>
      ))}
      
      {[-4, -2, 2, 4].map((pos) => (
        <React.Fragment key={`z-tick-${pos}`}>
          <Line
            points={[
              [0, -0.1, pos],
              [0, 0.1, pos]
            ]}
            color={axisColor}
            lineWidth={axisWidth}
          />
          <Text
            position={[0, -0.3, pos]}
            color={axisColor}
            fontSize={0.3}
            anchorX="center"
            anchorY="top"
            rotation={[0, Math.PI / 2, 0]}
          >
            {pos}
          </Text>
        </React.Fragment>
      ))}
    </>
  );
}
