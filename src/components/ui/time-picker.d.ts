import * as React from "react";
interface TimePickerProps {
    time: string;
    setTime: (time: string) => void;
    className?: string;
}
export declare function TimePicker({ time, setTime, className }: TimePickerProps): React.JSX.Element;
export {};
