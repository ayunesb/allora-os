import { DebateTopic } from '@/utils/consultation/types';
export default function useDebateSetup(): {
    selectedTopic: string;
    debateTitle: string;
    debateObjective: string;
    debateDuration: string;
    isDebateActive: boolean;
    riskAppetite: "medium" | "high" | "low";
    businessPriority: string;
    debateTopics: DebateTopic[];
    setSelectedTopic: (value: string) => void;
    setDebateTitle: import("react").Dispatch<import("react").SetStateAction<string>>;
    setDebateObjective: import("react").Dispatch<import("react").SetStateAction<string>>;
    setDebateDuration: import("react").Dispatch<import("react").SetStateAction<string>>;
    setIsDebateActive: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    setRiskAppetite: import("react").Dispatch<import("react").SetStateAction<"medium" | "high" | "low">>;
    setBusinessPriority: import("react").Dispatch<import("react").SetStateAction<string>>;
    getSelectedTopicDetails: () => DebateTopic | undefined;
};
