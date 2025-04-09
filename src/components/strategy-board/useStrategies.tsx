
import { useState, useEffect } from "react";

export interface Strategy {
  id: string;
  title: string;
  description: string;
  risk: string;
  risk_level?: string;
  created_at: string;
}

export function useStrategies() {
  const [strategies, setStrategies] = useState<Strategy[]>([
    { 
      id: '1',
      title: "Expand to New Markets", 
      description: "Analyze emerging markets and expand operations to increase geographical footprint and customer base.",
      risk: "Medium",
      risk_level: "Medium",
      created_at: new Date().toISOString()
    },
    { 
      id: '2',
      title: "AI Automation", 
      description: "Implement AI-driven automation in workflows to increase efficiency and reduce operational costs.",
      risk: "Low",
      risk_level: "Low",
      created_at: new Date().toISOString()
    },
    { 
      id: '3',
      title: "Disruptive Product Launch", 
      description: "Develop revolutionary product to disrupt industry standards and gain competitive advantage.",
      risk: "High",
      risk_level: "High",
      created_at: new Date().toISOString()
    },
    { 
      id: '4',
      title: "Digital Transformation", 
      description: "Overhaul legacy systems and processes with digital technologies to improve customer experience.",
      risk: "Medium",
      risk_level: "Medium",
      created_at: new Date().toISOString()
    },
    { 
      id: '5',
      title: "Strategic Partnerships", 
      description: "Form alliances with complementary businesses to expand offerings and reach new customer segments.",
      risk: "Low",
      risk_level: "Low",
      created_at: new Date().toISOString()
    },
    { 
      id: '6',
      title: "Venture Capital Funding", 
      description: "Secure Series B funding to accelerate growth initiatives and expand team capacity.",
      risk: "High",
      risk_level: "High",
      created_at: new Date().toISOString()
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const refetch = () => {
    // This would normally fetch data from the API
    setIsLoading(true);
    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return { strategies, isLoading, error, refetch };
}
