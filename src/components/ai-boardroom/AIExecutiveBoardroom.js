import { jsx as _jsx } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { useBreakpoint } from "@/hooks/use-mobile";
import { useBoardroomData } from "./useBoardroomData";
import { LoadingState } from "./LoadingState";
import { TimeoutError } from "./TimeoutError";
import { EmptyDebateState } from "./EmptyDebateState";
import { IntroductionState } from "./IntroductionState";
import { DebateContent } from "./DebateContent";
export default function AIExecutiveBoardroom({ companyId }) {
    const navigate = useNavigate();
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    const { topic, summary, discussion, conclusion, isLoading, error, timeoutError, sampleDebate, } = useBoardroomData(companyId);
    const handleStartNewDebate = () => {
        // Navigate directly to the debate page
        navigate("/dashboard/debate");
    };
    // Show loading state
    if (isLoading && !timeoutError) {
        return _jsx(LoadingState, {});
    }
    // Show timeout error
    if (timeoutError && isLoading) {
        return _jsx(TimeoutError, { onRefresh: () => window.location.reload() });
    }
    // Show error state with sample data
    if (error) {
        return (_jsx(IntroductionState, { sampleDebate: sampleDebate, onStartNewDebate: handleStartNewDebate }));
    }
    // Show empty state
    if (!topic && !summary && discussion.length === 0) {
        return _jsx(EmptyDebateState, { onStartNewDebate: handleStartNewDebate });
    }
    // Show debate content
    return (_jsx(DebateContent, { topic: topic, summary: summary, discussion: discussion, conclusion: conclusion, onStartNewDebate: handleStartNewDebate }));
}
