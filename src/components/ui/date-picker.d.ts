import * as React from "react";
interface DatePickerProps {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    label?: string;
    className?: string;
}
export declare function DatePicker({ date, setDate, label, className, }: DatePickerProps): React.JSX.Element;
export {};
