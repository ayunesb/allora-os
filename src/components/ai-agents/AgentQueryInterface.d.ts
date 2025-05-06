interface AgentQueryInterfaceProps {
  title?: string;
  placeholder?: string;
  initialContext?: Record<string, any>;
  onResult?: (result: string) => void;
}
export declare function AgentQueryInterface({
  title,
  placeholder,
  initialContext,
  onResult,
}: AgentQueryInterfaceProps): JSX.Element;
export {};
