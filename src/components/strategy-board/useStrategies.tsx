
import { useState } from "react";

export interface Strategy {
  title: string;
  description: string;
  risk: string;
}

export function useStrategies() {
  const [strategies, setStrategies] = useState<Strategy[]>([
    { 
      title: "Expand to New Markets", 
      description: "Analyze emerging markets and expand operations.",
      risk: "Medium"
    },
    { 
      title: "AI Automation", 
      description: "Implement AI-driven automation in workflows.",
      risk: "Low"
    },
    { 
      title: "Disruptive Product Launch", 
      description: "Develop revolutionary product to disrupt industry standards.",
      risk: "High"
    }
  ]);

  return { strategies };
}
