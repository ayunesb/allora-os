import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Separator } from "@/components/ui/separator";
import DeleteAccountDialog from "./DeleteAccountDialog";
const DangerZone = () => {
    return (_jsxs("div", { className: "w-full", children: [_jsx(Separator, { className: "my-4" }), _jsx("h3", { className: "text-lg font-medium text-destructive mb-2", children: "Danger Zone" }), _jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Permanently delete your account and all associated data. This action cannot be undone." }), _jsx(DeleteAccountDialog, {})] }));
};
export default DangerZone;
