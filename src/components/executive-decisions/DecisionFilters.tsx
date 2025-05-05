import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export function DecisionFilters({ executiveFilter, setExecutiveFilter, priorityFilter, setPriorityFilter, riskFilter, setRiskFilter, searchQuery, setSearchQuery }) {
    return (<div className="flex flex-wrap gap-4 mb-8">
      {/* Search */}
      <Input type="text" placeholder="Search by task or decision..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="max-w-sm"/>

      {/* Executive Filter */}
      <Input type="text" placeholder="Filter by Executive..." value={executiveFilter} onChange={(e) => setExecutiveFilter(e.target.value)} className="max-w-sm"/>

      {/* Priority Filter */}
      <Select value={priorityFilter} onValueChange={setPriorityFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Priorities"/>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Priorities</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectContent>
      </Select>

      {/* Risk Filter */}
      <Select value={riskFilter} onValueChange={setRiskFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Risks"/>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Risks</SelectItem>
          {[1, 2, 3, 4, 5].map((score) => (<SelectItem key={score} value={score.toString()}>{score.toString()}</SelectItem>))}
        </SelectContent>
      </Select>
    </div>);
}
