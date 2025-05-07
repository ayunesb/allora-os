import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
const SecurityToggleItem = ({ id, title, description, icon: Icon, checked, onCheckedChange, }) => {
    return (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "space-y-0.5 flex items-center", children: [_jsx(Icon, { className: "h-4 w-4 mr-2 text-primary" }), _jsxs("div", { children: [_jsx(Label, { htmlFor: id, children: title }), _jsx("p", { className: "text-sm text-muted-foreground", children: description })] })] }), _jsx(Switch, { id: id, checked: checked, onCheckedChange: onCheckedChange })] }));
};
export default SecurityToggleItem;
