interface AiCallScriptProps {
  id: string;
  title: string;
  target: string;
  duration: string;
  primaryBot: any;
  collaborators?: any[];
  content?: string;
  onUse: (id: string, title: string) => void;
  type: "call" | "message";
}
export default function AiCallScript({
  id,
  title,
  target,
  duration,
  primaryBot,
  collaborators,
  content,
  onUse,
  type,
}: AiCallScriptProps): JSX.Element;
export {};
