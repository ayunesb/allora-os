
import React from "react";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { formatRoleTitle } from "@/utils/consultation";
import { executiveBots } from "@/backend/executiveBots";

interface BotSearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  roleFilter: string;
  setRoleFilter: (role: string) => void;
}

export const BotSearchAndFilter: React.FC<BotSearchAndFilterProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  roleFilter, 
  setRoleFilter 
}) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row gap-4">
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search advisors..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Select value={roleFilter} onValueChange={setRoleFilter}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Filter by role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          {Object.keys(executiveBots).map(role => (
            <SelectItem key={role} value={role}>
              {formatRoleTitle(role)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
