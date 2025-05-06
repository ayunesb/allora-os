import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export function TimePicker({ time, setTime, className }) {
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );
  const minutes = ["00", "15", "30", "45"];
  // Split the time into hours and minutes
  const [selectedHour, selectedMinute] = time.split(":") || ["12", "00"];
  const handleHourChange = (hour) => {
    setTime(`${hour}:${selectedMinute}`);
  };
  const handleMinuteChange = (minute) => {
    setTime(`${selectedHour}:${minute}`);
  };
  return (
    <div className={`flex space-x-2 ${className}`}>
      <Select value={selectedHour} onValueChange={handleHourChange}>
        <SelectTrigger className="w-[5rem]">
          <SelectValue placeholder="Hour" />
        </SelectTrigger>
        <SelectContent>
          {hours.map((hour) => (
            <SelectItem key={hour} value={hour}>
              {hour}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <span className="flex items-center">:</span>

      <Select value={selectedMinute} onValueChange={handleMinuteChange}>
        <SelectTrigger className="w-[5rem]">
          <SelectValue placeholder="Min" />
        </SelectTrigger>
        <SelectContent>
          {minutes.map((minute) => (
            <SelectItem key={minute} value={minute}>
              {minute}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
