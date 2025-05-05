import React from 'react';
import { Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { format, addMonths, subMonths } from 'date-fns';
export function SocialMediaFilters({ currentMonth, onMonthChange, searchQuery, onSearchChange, selectedPlatform, onPlatformChange, selectedStatus, onStatusChange, onApplyFilters, onClearFilters, }) {
    return (<Card>
      <CardContent className="p-4">
        <form onSubmit={onApplyFilters} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
            <Input placeholder="Search posts..." className="pl-8" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)}/>
          </div>
          
          <Select value={selectedPlatform} onValueChange={onPlatformChange}>
            <SelectTrigger>
              <SelectValue placeholder="Platform"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Platforms</SelectItem>
              <SelectItem value="Facebook">Facebook</SelectItem>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
              <SelectItem value="Twitter">Twitter</SelectItem>
              <SelectItem value="TikTok">TikTok</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Status"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          
          <div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" type="button" onClick={() => onMonthChange(subMonths(currentMonth, 1))} size="icon">
                <ChevronLeft className="h-4 w-4"/>
              </Button>
              <span className="font-medium">
                {format(currentMonth, 'MMMM yyyy')}
              </span>
              <Button variant="outline" type="button" onClick={() => onMonthChange(addMonths(currentMonth, 1))} size="icon">
                <ChevronRight className="h-4 w-4"/>
              </Button>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button type="submit" variant="default" className="w-full">
              <Filter className="mr-2 h-4 w-4"/>
              Apply Filters
            </Button>
            <Button type="button" variant="outline" onClick={onClearFilters}>
              Clear
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>);
}
