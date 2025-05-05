import { Agent, AgentPersonality } from './types';

const botExampleActions: Agent = {
  id: 'botExampleActions',
  name: 'Example Bot Actions',
  personality: "analytical" as const, // or validate against the enum
  actions: [
    // ...existing code...
  ],
  riskLevel: 'Medium', // Fixed riskLevel
};

const botOutputLocations: Agent = {
  id: 'botOutputLocations',
  name: 'Output Locations Bot',
  personality: "analytical" as const, // or validate against the enum
  actions: [
    // ...existing code...
  ],
  riskLevel: 'Medium', // Fixed riskLevel
};

const personalityXpMap: Record<AgentPersonality, number> = {
  analytical: 10,
  creative: 8,
  diplomatic: 7,
  aggressive: 12,
  cautious: 6,
};

// Define the executive object with a valid personality
const executive: ExecutiveAgentProfile = {
  id: 'executiveAgent',
  name: 'Executive Agent',
  personality: 'analytical', // ✅ Matches the union type
  actions: [],
  riskLevel: 'Medium', // Fixed riskLevel
};

const xp = personalityXpMap[executive.personality];

// Repeat this fix for similar objects like botExampleActions, botOutputLocations, etc.