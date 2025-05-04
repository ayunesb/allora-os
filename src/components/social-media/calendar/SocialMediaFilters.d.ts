import React from 'react';
interface SocialMediaFiltersProps {
    currentMonth: Date;
    onMonthChange: (date: Date) => void;
    searchQuery: string;
    onSearchChange: (value: string) => void;
    selectedPlatform: string;
    onPlatformChange: (value: string) => void;
    selectedStatus: string;
    onStatusChange: (value: string) => void;
    onApplyFilters: (e: React.FormEvent) => void;
    onClearFilters: () => void;
}
export declare function SocialMediaFilters({ currentMonth, onMonthChange, searchQuery, onSearchChange, selectedPlatform, onPlatformChange, selectedStatus, onStatusChange, onApplyFilters, onClearFilters, }: SocialMediaFiltersProps): JSX.Element;
export {};
