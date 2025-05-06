import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
export function TimePicker({ time, setTime, className }) {
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
    const minutes = ["00", "15", "30", "45"];
    // Split the time into hours and minutes
    const [selectedHour, selectedMinute] = time.split(":") || ["12", "00"];
    const handleHourChange = (hour) => {
        setTime(`${hour}:${selectedMinute}`);
    };
    const handleMinuteChange = (minute) => {
        setTime(`${selectedHour}:${minute}`);
    };
    return (_jsxs("div", { className: `flex space-x-2 ${className}`, children: [_jsxs(Select, { value: selectedHour, onValueChange: handleHourChange, children: [_jsx(SelectTrigger, { className: "w-[5rem]", children: _jsx(SelectValue, { placeholder: "Hour" }) }), _jsx(SelectContent, { children: hours.map((hour) => (_jsx(SelectItem, { value: hour, children: hour }, hour))) })] }), _jsx("span", { className: "flex items-center", children: ":" }), _jsxs(Select, { value: selectedMinute, onValueChange: handleMinuteChange, children: [_jsx(SelectTrigger, { className: "w-[5rem]", children: _jsx(SelectValue, { placeholder: "Min" }) }), _jsx(SelectContent, { children: minutes.map((minute) => (_jsx(SelectItem, { value: minute, children: minute }, minute))) })] })] }));
}
