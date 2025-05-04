import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
const AnalyticsDateRangePicker = ({ dateRange, onDateRangeChange, className = '' }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [from, to] = dateRange;
    // Format the date range for display
    const formattedDateRange = React.useMemo(() => {
        if (from && to) {
            return `${format(from, 'MMM d, yyyy')} - ${format(to, 'MMM d, yyyy')}`;
        }
        if (from) {
            return `From ${format(from, 'MMM d, yyyy')}`;
        }
        if (to) {
            return `Until ${format(to, 'MMM d, yyyy')}`;
        }
        return 'Select date range';
    }, [from, to]);
    return (<div className={className}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            <CalendarIcon className="mr-2 h-4 w-4"/>
            {formattedDateRange}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="range" selected={{
            from,
            to,
        }} onSelect={(range) => {
            onDateRangeChange([range?.from || null, range?.to || null]);
            if (range?.to) {
                setIsOpen(false);
            }
        }} initialFocus/>
        </PopoverContent>
      </Popover>
    </div>);
};
export default AnalyticsDateRangePicker;
