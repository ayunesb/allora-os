import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Campaigns", path: "/dashboard/campaigns" },
    { name: "Settings", path: "/dashboard/settings" },
    { name: "KPI Dashboard", path: "/dashboard/kpis" },
];
const navigation = [
    {
        title: 'Main',
        links: [
            { label: 'Dashboard', href: '/dashboard', icon: '🏠' },
        ],
    },
    {
        title: 'Explore',
        links: [
            {
                label: 'Galaxy',
                href: '/explore/galaxy',
                icon: '🌌',
            },
        ],
    },
];
export function Sidebar() {
    return (<aside className="w-64 border-r bg-card shadow-md dark:bg-muted/20">
      <div className="p-6 text-xl font-bold tracking-wide">Allora OS</div>
      <nav className="flex flex-col space-y-2 px-4">
        {navItems.map((item) => (<NavLink key={item.path} to={item.path} className={({ isActive }) => cn("rounded-md px-3 py-2 text-sm font-medium transition-colors", isActive
                ? "bg-muted text-accent-foreground"
                : "text-muted-foreground hover:text-primary")}>
            {item.name}
          </NavLink>))}
      </nav>
    </aside>);
}
