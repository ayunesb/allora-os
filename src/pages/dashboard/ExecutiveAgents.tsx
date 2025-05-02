
import React from 'react';
import { PageTitle } from "@/components/ui/page-title";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ExecutiveAgents() {
  const navigate = useNavigate();
  
  const handleCreateAgent = () => {
    navigate("/dashboard/executives/create");
  };
  
  return (
    <div className="container mx-auto px-4">
      <PageTitle title="AI Executive Agents" description="Manage your AI executive team">
        AI Executive Agents
      </PageTitle>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          {/* Placeholder for agent filters */}
          <Button variant="outline">All Agents</Button>
        </div>
        <Button onClick={handleCreateAgent}>
          <Plus className="mr-2 h-4 w-4" />
          Create Agent
        </Button>
      </div>
      
      <Card>
        <CardContent className="py-8 text-center">
          <p>Executive agent functionality is being implemented.</p>
        </CardContent>
      </Card>
    </div>
  );
}
