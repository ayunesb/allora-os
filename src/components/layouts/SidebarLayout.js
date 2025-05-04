import { Link, Outlet, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";
import clsx from "clsx";
const navLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "KPI Dashboard", path: "/dashboard/kpis" },
    { label: "Campaigns", path: "/dashboard/campaigns" },
    { label: "Executives", path: "/dashboard/executives" },
    { label: "AI Settings", path: "/dashboard/ai-settings" },
    { label: "Galaxy Explorer", path: "/explore/galaxy" },
];
export default function SidebarLayout() {
    const { pathname } = useLocation();
    return (<div className="flex h-screen bg-background text-foreground">
      <aside className="w-60 bg-muted border-r border-border p-4 space-y-6">
        <div className="text-lg font-bold tracking-wide">Allora OS</div>
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (<Link key={link.path} to={link.path} className={clsx("text-sm px-3 py-2 rounded-md transition", pathname.startsWith(link.path)
                ? "bg-accent text-accent-foreground"
                : "hover:bg-muted/70")}>
              {link.label}
            </Link>))}
        </nav>
        <div className="absolute bottom-4 left-4">
          <ThemeToggle />
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>);
}
