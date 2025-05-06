import { DatabaseTableStatus } from "./types";
interface DatabaseTablesSectionProps {
  tables: Record<string, DatabaseTableStatus>;
}
export declare function DatabaseTablesSection({
  tables,
}: DatabaseTablesSectionProps): JSX.Element;
export {};
