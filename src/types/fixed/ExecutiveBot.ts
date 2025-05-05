export class ExecutiveBot {
  private fetchApi: (url: string, options: RequestInit) => Promise<any>;

  constructor(fetchApi: (url: string, options: RequestInit) => Promise<any>) {
    this.fetchApi = fetchApi;
  }

  async executeTask(task: string, payload: any) {
    return this.fetchApi(`/api/tasks/${task}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
