import { jsx as _jsx } from "react/jsx-runtime";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    return (_jsx(Button, { size: "icon", variant: "ghost", onClick: () => setTheme(theme === "dark" ? "light" : "dark"), "aria-label": "Toggle theme", children: theme === "dark" ? (_jsx(Sun, { className: "h-5 w-5" })) : (_jsx(Moon, { className: "h-5 w-5" })) }));
}
