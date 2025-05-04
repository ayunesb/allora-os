export interface BotSettingsPanelProps {
    botId?: string;
    bot?: {
        name: string;
        title?: string;
        avatar?: string;
        settings?: {
            autoRespond?: boolean;
            proactiveInsights?: boolean;
            responseLength?: number;
            creativityLevel?: number;
        };
    };
    onSettingChange?: (setting: string, value: any) => void;
}
declare const BotSettingsPanel: ({ botId, bot, onSettingChange }: BotSettingsPanelProps) => JSX.Element;
export default BotSettingsPanel;
