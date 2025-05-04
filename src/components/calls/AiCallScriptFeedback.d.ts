interface AiCallScriptFeedbackProps {
    id: string;
    title: string;
    type: 'call' | 'message';
    primaryBot?: any;
}
export default function AiCallScriptFeedback({ id, title, type, primaryBot }: AiCallScriptFeedbackProps): import("react").JSX.Element;
export {};
