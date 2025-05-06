import React from "react";
interface BotSearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  roleFilter: string;
  setRoleFilter: (role: string) => void;
}
export declare const BotSearchAndFilter: React.FC<BotSearchAndFilterProps>;
export {};
