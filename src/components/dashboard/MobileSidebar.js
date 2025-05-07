import { jsx as _jsx } from "react/jsx-runtime";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
export function MobileSidebar({ open, onClose }) {
    return (_jsx(Sheet, { open: open, onOpenChange: onClose, children: _jsx(SheetContent, { side: "left", className: "p-0 w-72", children: _jsx(Sidebar, {}) }) }));
}
