import React from "react";
type LeadFilterBarProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeFilter: string;
  onFilterChange: (value: string) => void;
};
export declare const LeadFilterBar: React.FC<LeadFilterBarProps>;
export {};
