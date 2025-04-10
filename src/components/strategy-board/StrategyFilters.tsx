
import React from "react";
import { Search, SlidersHorizontal, CalendarRange, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useBreakpoint } from "@/hooks/use-mobile";

type SortOption = 'newest' | 'oldest' | 'alphabetical' | 'risk';

interface StrategyFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  riskFilter: string;
  setRiskFilter: (risk: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
}

const StrategyFilters: React.FC<StrategyFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  riskFilter,
  setRiskFilter,
  sortBy,
  setSortBy,
}) => {
  const breakpoint = useBreakpoint();
  const isMobileOrTablet = breakpoint === 'mobile' || breakpoint === 'tablet';

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 backdrop-blur-sm bg-black/20 p-4 rounded-lg border border-white/10">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search strategies..."
          className="pl-10 bg-black/30 border-white/10 focus:border-primary/50 transition-colors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className={`flex ${isMobileOrTablet ? 'w-full' : ''} gap-2`}>
        <Select value={riskFilter} onValueChange={setRiskFilter}>
          <SelectTrigger className={`${isMobileOrTablet ? "flex-1" : "w-[140px]"} bg-black/30 border-white/10`}>
            <AlertTriangle className="mr-2 h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Risk Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Risks</SelectItem>
            <SelectItem value="Low">Low Risk</SelectItem>
            <SelectItem value="Medium">Medium Risk</SelectItem>
            <SelectItem value="High">High Risk</SelectItem>
          </SelectContent>
        </Select>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 bg-black/30 border-white/10">
              <SlidersHorizontal className="h-4 w-4" />
              {!isMobileOrTablet && "Sort"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-black/80 backdrop-blur-md border border-white/10">
            <DropdownMenuItem 
              onClick={() => setSortBy('newest')} 
              className={sortBy === 'newest' ? "bg-primary/20" : ""}
            >
              <CalendarRange className="mr-2 h-4 w-4" /> Newest First
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setSortBy('oldest')} 
              className={sortBy === 'oldest' ? "bg-primary/20" : ""}
            >
              <CalendarRange className="mr-2 h-4 w-4" /> Oldest First
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setSortBy('alphabetical')} 
              className={sortBy === 'alphabetical' ? "bg-primary/20" : ""}
            >
              Alphabetical
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setSortBy('risk')} 
              className={sortBy === 'risk' ? "bg-primary/20" : ""}
            >
              By Risk Level
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default StrategyFilters;
