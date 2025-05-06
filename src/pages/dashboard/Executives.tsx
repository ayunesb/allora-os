import React from "react";
import { PageTitle } from "@/components/ui/page-title";
import ExecutiveBoard from "@/components/ExecutiveBoard";
export default function Executives() {
  const executives = [
    {
      id: "1",
      name: "AI CEO",
      role: "Chief Executive Officer",
      avatar: "/assets/avatars/ai-ceo.png",
      status: "active",
      specialties: ["Strategy", "Leadership"],
      lastActivity: "Today at 10:30 AM",
    },
    {
      id: "2",
      name: "AI CMO",
      role: "Chief Marketing Officer",
      avatar: "/assets/avatars/ai-cmo.png",
      status: "active",
      specialties: ["Marketing", "Brand Strategy"],
      lastActivity: "Today at 9:45 AM",
    },
    {
      id: "3",
      name: "AI CFO",
      role: "Chief Financial Officer",
      avatar: "/assets/avatars/ai-cfo.png",
      status: "learning",
      specialties: ["Finance", "Budgeting"],
      lastActivity: "Yesterday at 4:15 PM",
    },
  ];
  const handleSelectExecutive = (executiveId) => {
    console.log(`Selected executive: ${executiveId}`);
  };
  return (
    <div className="container mx-auto px-4">
      <PageTitle title="Executive Team" description="Your AI executive team">
        Executive Team
      </PageTitle>

      <div className="my-8">
        <h2 className="text-xl font-semibold mb-4">Your AI Executive Team</h2>
        <ExecutiveBoard
          executives={executives}
          onSelectExecutive={handleSelectExecutive}
        />
        <button onClick={handleSelectExecutive}>View Executive</button>
      </div>
    </div>
  );
}
