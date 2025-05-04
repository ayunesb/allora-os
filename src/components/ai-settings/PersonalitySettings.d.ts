import { BotPersonalitySettings } from '@/types/aiSettings';
interface PersonalitySettingsProps {
    botPersonalities: BotPersonalitySettings[];
    onUpdatePersonality: (botId: string, settings: Partial<BotPersonalitySettings>) => void;
}
export declare function PersonalitySettings({ botPersonalities, onUpdatePersonality }: PersonalitySettingsProps): JSX.Element;
export {};
