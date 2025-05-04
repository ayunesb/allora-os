import { CallScript } from "@/hooks/useCallScripts";
interface ScriptSectionProps {
    title: string;
    scripts: CallScript[];
    onUseScript: (scriptId: string, scriptTitle: string) => void;
    type: 'call' | 'message';
    isAiSection?: boolean;
}
export default function ScriptSection({ title, scripts, onUseScript, type, isAiSection }: ScriptSectionProps): JSX.Element;
export {};
