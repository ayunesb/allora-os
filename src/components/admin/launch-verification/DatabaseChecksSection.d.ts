interface DatabaseCheckItem {
  name?: string;
  table?: string;
  status: string;
  message: string;
}
interface DatabaseChecksSectionProps {
  title: string;
  items: DatabaseCheckItem[] | null | undefined;
}
export declare function DatabaseChecksSection({
  title,
  items,
}: DatabaseChecksSectionProps): JSX.Element;
export {};
