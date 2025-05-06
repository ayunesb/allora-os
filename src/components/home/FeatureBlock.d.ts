import React from "react";
interface FeatureBlockProps {
  emoji: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  delay?: number;
}
declare const FeatureBlock: React.FC<FeatureBlockProps>;
export default FeatureBlock;
