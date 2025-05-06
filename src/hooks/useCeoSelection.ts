import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { executiveBots } from "@/backend/executiveBots";

export function useCeoSelection() {
  const { profile } = useAuth();
  const [selectedCeo, setSelectedCeo] = useState({
    name: "Elon Musk",
    role: "ceo",
  });

  useEffect(() => {
    // Select a CEO based on the user's industry or preferences
    if (profile) {
      const industry = profile.industry || "Technology";
      let ceoBotName = "Elon Musk"; // Default

      // Customize CEO bot selection based on industry
      if (industry === "Finance" || industry === "Banking") {
        ceoBotName = "Warren Buffett";
      } else if (industry === "Retail" || industry === "E-commerce") {
        ceoBotName = "Jeff Bezos";
      } else if (industry === "Software" || industry === "Technology") {
        ceoBotName = "Satya Nadella";
      } else if (industry === "Manufacturing" || industry === "Hardware") {
        ceoBotName = "Tim Cook";
      }

      setSelectedCeo({
        name: ceoBotName,
        role: "ceo",
      });
    }
  }, [profile]);

  return { selectedCeo };
}
