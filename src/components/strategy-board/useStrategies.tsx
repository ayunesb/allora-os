
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
      description: "Analyze emerging markets and expand operations to increase geographical footprint and customer base.",
      risk: "Medium"
    },
    { 
      title: "AI Automation", 
      description: "Implement AI-driven automation in workflows to increase efficiency and reduce operational costs.",
      risk: "Low"
    },
    { 
      title: "Disruptive Product Launch", 
      description: "Develop revolutionary product to disrupt industry standards and gain competitive advantage.",
      risk: "High"
    },
    { 
      title: "Digital Transformation", 
      description: "Overhaul legacy systems and processes with digital technologies to improve customer experience.",
      risk: "Medium"
    },
    { 
      title: "Strategic Partnerships", 
      description: "Form alliances with complementary businesses to expand offerings and reach new customer segments.",
      risk: "Low"
    },
    { 
      title: "Venture Capital Funding", 
      description: "Secure Series B funding to accelerate growth initiatives and expand team capacity.",
      risk: "High"
    }
  ]);

  return { strategies };
}
