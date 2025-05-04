interface CallTabsProps {
    activeTab: string;
    onTabChange: (value: string) => void;
    isLoading?: boolean;
}
export default function CallTabs({ activeTab, onTabChange, isLoading }: CallTabsProps): import("react").JSX.Element;
export {};
