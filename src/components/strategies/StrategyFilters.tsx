import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBreakpoint } from "@/hooks/use-mobile";
const StrategyFilters = ({
  searchQuery,
  setSearchQuery,
  riskFilter,
  setRiskFilter,
  sortBy,
  setSortBy,
}) => {
  const breakpoint = useBreakpoint();
  const isMobileOrTablet = breakpoint === "mobile" || breakpoint === "tablet";
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search strategies..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={`flex ${isMobileOrTablet ? "w-full" : ""} gap-2`}>
        <Select value={riskFilter} onValueChange={setRiskFilter}>
          <SelectTrigger className={isMobileOrTablet ? "flex-1" : "w-[140px]"}>
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
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              {!isMobileOrTablet && "Sort"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => setSortBy("newest")}
              className={sortBy === "newest" ? "bg-accent" : ""}
            >
              Newest First
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortBy("oldest")}
              className={sortBy === "oldest" ? "bg-accent" : ""}
            >
              Oldest First
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortBy("alphabetical")}
              className={sortBy === "alphabetical" ? "bg-accent" : ""}
            >
              Alphabetical
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortBy("risk")}
              className={sortBy === "risk" ? "bg-accent" : ""}
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
