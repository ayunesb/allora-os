import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };
    return (_jsxs(Button, { variant: "ghost", size: "icon", onClick: toggleTheme, title: theme === "dark" ? "Switch to light mode" : "Switch to dark mode", children: [theme === "dark" ? (_jsx(Sun, { className: "h-[1.2rem] w-[1.2rem]" })) : (_jsx(Moon, { className: "h-[1.2rem] w-[1.2rem]" })), _jsx("span", { className: "sr-only", children: "Toggle theme" })] }));
}
