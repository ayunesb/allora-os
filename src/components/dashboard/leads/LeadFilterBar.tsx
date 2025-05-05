import React from 'react';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
export const LeadFilterBar = ({ searchQuery, onSearchChange, activeFilter, onFilterChange }) => {
    return (<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
        <Input placeholder="Search leads..." className="pl-8" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)}/>
      </div>
      
      <Tabs value={activeFilter} onValueChange={onFilterChange} className="w-full sm:w-auto">
        <TabsList className="grid grid-cols-4 w-full sm:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="contacted">Contacted</TabsTrigger>
          <TabsTrigger value="qualified">Qualified</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>);
};
