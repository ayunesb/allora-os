
import React from 'react';
import { Stars, Award, BarChart3 } from "lucide-react";
import FeatureBlock from "@/components/home/FeatureBlock";

// Feature data
const features = [
  {
    emoji: "🚀",
    title: "AI Strategy Generation",
    description: "Get personalized business strategies created by our AI executive team.",
    icon: <Stars className="h-6 w-6 text-primary" />
  },
  {
    emoji: "💼",
    title: "Virtual Executive Team",
    description: "Access the expertise of AI personas modeled after top executives.",
    icon: <Award className="h-6 w-6 text-primary" />
  },
  {
    emoji: "📊",
    title: "Lead Management",
    description: "Track and nurture leads with our AI-powered CRM tools.",
    icon: <BarChart3 className="h-6 w-6 text-primary" />
  }
];

const Features = () => {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Powerful AI Business Tools
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <FeatureBlock
            key={index}
            emoji={feature.emoji}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            delay={index * 0.2}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;
