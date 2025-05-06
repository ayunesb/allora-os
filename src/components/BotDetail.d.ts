interface BotDetailProps {
  bot?: {
    name: string;
    title: string;
    expertise: string;
    id?: string;
    description?: string;
    avatar?: string;
    industry?: string;
    specialties?: string[];
    [key: string]: any;
  };
}
export default function BotDetail({
  bot: initialBot,
}: BotDetailProps): JSX.Element;
export {};
