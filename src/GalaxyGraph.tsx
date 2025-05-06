import React from "react";
import { ForceGraph2D } from "react-force-graph";
import { useRouter } from "next/router";

const GalaxyGraph = ({ data }) => {
  const router = useRouter();

  const handleNodeClick = (node: any) => {
    if (node.type === "plugin") {
      router.push(`/plugin/${node.id}`);
    } else if (node.type === "strategy") {
      router.push(`/strategy/${node.id}`);
    }
  };

  return (
    <ForceGraph2D
      graphData={data}
      onNodeClick={(node) => {
        handleNodeClick(node);
        // any extra logic here
      }}
    />
  );
};

export default GalaxyGraph;
