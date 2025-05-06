import type { Task } from "@/types/fixed/TaskTypes";
import type { ExecutiveAgentProfile, Agent } from "@/types/fixed/AgentTypes";

export class AgentScheduler {
  private agents: Agent[];
  private tasks: Task[];

  constructor(agents: Agent[], tasks: Task[]) {
    this.agents = agents;
    this.tasks = tasks;
  }

  public schedule(): void {
    // Scheduling logic here
  }
}

const agentProfile = {
  personality: "cautious" as ExecutiveAgentProfile["personality"],
};
