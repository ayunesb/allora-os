export default function useDebateContext(): {
    sessionId: string;
    setSessionId: import("react").Dispatch<import("react").SetStateAction<string>>;
    profile: import("../types").User;
};
