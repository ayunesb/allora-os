import { AgentTask } from '@/types/fixed/AgentTask';
import { Agent } from '@/types/Agent';
import { Task } from '@/types/Task';

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