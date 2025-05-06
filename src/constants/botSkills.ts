export const botSkills = {
  greeting: 'greeting',
  farewell: 'farewell',
  smallTalk: 'smallTalk',
  help: 'help',
  fallback: 'fallback',
};

export const botSpecialSkills: Record<string, string[]> = {
  ceo: ['vision', 'leadership'],
  strategy: ['planning', 'execution'],
};

export const botOutputLocations: Record<string, string[]> = {
  ceo: ['dashboard', 'overview'],
  strategy: ['timeline', 'vault'],
};

export const botExampleActions: Record<string, string[]> = {
  ceo: ['setVision', 'assignTasks'],
  strategy: ['runCampaign', 'analyzeKPI'],
};

export {}; // <- makes it a module