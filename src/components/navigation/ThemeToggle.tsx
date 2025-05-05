import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };
    return (<Button variant="ghost" size="icon" onClick={toggleTheme} title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
      {theme === "dark" ? (<Sun className="h-[1.2rem] w-[1.2rem]"/>) : (<Moon className="h-[1.2rem] w-[1.2rem]"/>)}
      <span className="sr-only">Toggle theme</span>
    </Button>);
}
