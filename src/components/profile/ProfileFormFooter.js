import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import DangerZone from "./DangerZone";
const ProfileFormFooter = ({ isLoading, isDirty, avatarFile, onReset }) => {
    return (_jsxs(CardFooter, { className: "flex flex-col items-end space-y-4", children: [_jsxs("div", { className: "flex justify-end space-x-2 w-full", children: [_jsx(Button, { type: "button", variant: "outline", onClick: onReset, disabled: isLoading || !isDirty, children: "Cancel" }), _jsx(Button, { type: "submit", disabled: isLoading || (!isDirty && !avatarFile), children: isLoading ? "Saving..." : "Save Changes" })] }), _jsx(DangerZone, {})] }));
};
export default ProfileFormFooter;
