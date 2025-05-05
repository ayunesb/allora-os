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

const personalityXpMap: Record<AgentPersonality, number> = {
  analytical: 10,
  creative: 8,
  diplomatic: 7,
  aggressive: 12,
  cautious: 6,
};

// Define the executive object with a valid personality
const executive: Agent = {
  id: 'executiveAgent',
  name: 'Executive Agent',
  personality: "analytical" as const,
  actions: [],
};

const xp = personalityXpMap[executive.personality];

// Repeat this fix for similar objects like botExampleActions, botOutputLocations, etc.