import { DebateMessage } from '@/utils/consultation/types';
export default function useDebateState(): {
    newMessage: string;
    activeTab: string;
    debateTopics: import("@/utils/consultation/types").DebateTopic[];
    handleNewMessageChange: (value: string) => void;
    handleTabChange: (value: string) => void;
    setNewMessage: import("react").Dispatch<import("react").SetStateAction<string>>;
    exportDebate: (messages: DebateMessage[], debateTitle: string) => void;
    saveDebate: () => void;
    exportSummary: () => void;
    saveToReports: () => void;
};
