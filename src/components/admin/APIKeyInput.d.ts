interface APIKeyInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isSecret?: boolean;
}
declare const APIKeyInput: ({
  id,
  label,
  value,
  onChange,
  placeholder,
  isSecret,
}: APIKeyInputProps) => JSX.Element;
export default APIKeyInput;
