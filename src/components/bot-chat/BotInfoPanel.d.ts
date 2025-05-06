export interface BotInfoPanelProps {
  bot?: {
    name: string;
    title?: string;
    avatar?: string;
    description?: string;
    expertise?: string;
    specialties?: string[];
  };
  description?: string;
  specialties?: string[];
  expertise?: string;
}
declare const BotInfoPanel: ({
  bot,
  description: propDescription,
  specialties: propSpecialties,
  expertise: propExpertise,
}: BotInfoPanelProps) => JSX.Element;
export default BotInfoPanel;
