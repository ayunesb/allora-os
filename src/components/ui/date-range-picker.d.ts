import * as React from "react";
import { DateRange } from "react-day-picker";
export interface DateRangePickerProps {
    className?: string;
    onChange: (date: DateRange | undefined) => void;
    value: DateRange | undefined;
}
export declare function DateRangePicker({ className, value, onChange, }: DateRangePickerProps): React.JSX.Element;
