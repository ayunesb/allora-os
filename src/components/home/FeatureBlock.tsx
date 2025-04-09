
import React from 'react';

interface FeatureBlockProps {
  emoji: string;
  title: string;
  description: string;
}

const FeatureBlock: React.FC<FeatureBlockProps> = ({ emoji, title, description }) => {
  return (
    <div className="bg-card p-6 rounded-lg border border-border">
      <div className="text-3xl mb-4">{emoji}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureBlock;
