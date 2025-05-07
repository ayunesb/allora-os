import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
const DebateParameters = ({ debateTitle, debateObjective, debateDuration, onTitleChange, onObjectiveChange, onDurationChange, }) => {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "title", children: "Debate Title" }), _jsx(Input, { id: "title", value: debateTitle, onChange: (e) => onTitleChange(e.target.value), placeholder: "Enter a title for this debate" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "objective", children: "Debate Objective" }), _jsx(Textarea, { id: "objective", value: debateObjective, onChange: (e) => onObjectiveChange(e.target.value), placeholder: "What should this debate achieve?", rows: 3 })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "duration", children: "Approximate Duration (minutes)" }), _jsxs(Select, { value: debateDuration, onValueChange: onDurationChange, children: [_jsx(SelectTrigger, { id: "duration", children: _jsx(SelectValue, { placeholder: "Select duration" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "5", children: "5 minutes" }), _jsx(SelectItem, { value: "10", children: "10 minutes" }), _jsx(SelectItem, { value: "15", children: "15 minutes" }), _jsx(SelectItem, { value: "30", children: "30 minutes" })] })] })] })] }));
};
export default DebateParameters;
