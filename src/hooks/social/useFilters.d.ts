import { SocialMediaCalendarFilters } from '@/types/socialMedia';
export declare function useFilters(): {
    filters: SocialMediaCalendarFilters;
    setPostFilters: (newFilters: SocialMediaCalendarFilters) => void;
    clearFilters: () => void;
};
