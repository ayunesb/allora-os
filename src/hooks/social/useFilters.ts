
import { useState, useCallback } from 'react';
import { SocialMediaCalendarFilters } from '@/types/socialMedia';

export function useFilters() {
  const [filters, setFilters] = useState<SocialMediaCalendarFilters>({});
  
  const setPostFilters = useCallback((newFilters: SocialMediaCalendarFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  }, []);
  
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  return {
    filters,
    setPostFilters,
    clearFilters
  };
}
