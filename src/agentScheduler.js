const botExampleActions = {
    id: "botExampleActions",
    name: "Example Bot Actions",
    personality: "analytical", // or validate against the enum
    actions: [
    // ...existing code...
    ],
    riskLevel: "Medium", // Fixed riskLevel
};
const botOutputLocations = {
    id: "botOutputLocations",
    name: "Output Locations Bot",
    personality: "analytical", // or validate against the enum
    actions: [
    // ...existing code...
    ],
    riskLevel: "Medium", // Fixed riskLevel
};
const personalityXpMap = {
    analytical: 10,
    creative: 8,
    diplomatic: 7,
    aggressive: 12,
    cautious: 6,
};
// Define the executive object with a valid personality
const executive = {
    id: "executiveAgent",
    name: "Executive Agent",
    personality: "analytical", // ✅ Matches the union type
    actions: [],
    riskLevel: "Medium", // Fixed riskLevel
};
const xp = personalityXpMap[executive.personality];
const task = selectTaskForExecutive(Object.assign(Object.assign({}, executive), { personality: executive.personality }));
export {};
// Repeat this fix for similar objects like botExampleActions, botOutputLocations, etc.
