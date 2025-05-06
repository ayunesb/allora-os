export interface ValidationResultItemProps {
  id: string;
  title: string;
  result: {
    valid: boolean;
    message: string;
    details?: Record<string, any>;
  };
}
export declare function ValidationResultItem({
  id,
  title,
  result,
}: ValidationResultItemProps): JSX.Element;
