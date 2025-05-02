import React from 'react';
import { PageTitle } from "@/components/ui/page-title";
import { AgentList } from "@/components/executives/AgentList";
import { AgentFilters } from "@/components/executives/AgentFilters";
import { useExecutiveAgents } from "@/hooks/useExecutiveAgents";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ExecutiveAgents() {
  const { agents, isLoading, error } = useExecutiveAgents();
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
        <AgentFilters />
        <Button onClick={handleCreateAgent}>
          <Plus className="mr-2 h-4 w-4" />
          Create Agent
        </Button>
      </div>
      
      <AgentList 
        agents={agents} 
        isLoading={isLoading} 
        error={error} 
      />
    </div>
  );
}
