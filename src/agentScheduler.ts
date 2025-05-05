import { Agent, AgentPersonality } from './types';

const botExampleActions: Agent = {
  id: 'botExampleActions',
  name: 'Example Bot Actions',
  personality: "analytical" as const, // or validate against the enum
  actions: [
    // ...existing code...
  ],
};

const botOutputLocations: Agent = {
  id: 'botOutputLocations',
  name: 'Output Locations Bot',
  personality: "analytical" as const, // or validate against the enum
  actions: [
    // ...existing code...
  ],
};

// Repeat this fix for similar objects like botExampleActions, botOutputLocations, etc.