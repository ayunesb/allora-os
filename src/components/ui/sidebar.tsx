import * as React from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transition-all duration-300 ease-in-out transform border-r border-border bg-sidebar dark:bg-sidebar shadow-sm",
          className
        )}
        {...props}
      />
    );
  }
);
Sidebar.displayName = "Sidebar";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("p-4 border-b border-border", className)}
      {...props}
    />
  );
});
SidebarHeader.displayName = "SidebarHeader";

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex-1 overflow-auto p-3", className)}
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("p-4 border-t border-border mt-auto", className)}
      {...props}
    />
  );
});
SidebarFooter.displayName = "SidebarFooter";

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("mb-4 last:mb-0", className)}
      {...props}
    />
  );
});
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        "text-xs text-muted-foreground font-medium mb-2 px-2",
        className
      )}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("space-y-1", className)}
      {...props}
    />
  );
});
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      className={cn("space-y-1", className)}
      {...props}
    />
  );
});
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => {
  return (
    <li
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  );
});
SidebarMenuItem.displayName = "SidebarMenuItem";

const SidebarMenuButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    active?: boolean;
    asChild?: boolean;
  }
>(({ className, active, asChild = false, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "div";
  return (
    <Comp
      {...(asChild ? {} : { ref, ...props })}
      {...(asChild
        ? {}
        : {
            className: cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              active
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              className
            ),
          })}
    >
      {props.children}
    </Comp>
  );
});
SidebarMenuButton.displayName = "SidebarMenuButton";

// Context provider for sidebar state management
type SidebarContextValue = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = React.createContext<SidebarContextValue | undefined>(
  undefined
);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

interface SidebarProviderProps {
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export function SidebarProvider({
  children,
  defaultExpanded = true,
}: SidebarProviderProps) {
  const [expanded, setExpanded] = React.useState(defaultExpanded);

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Sidebar toggle button
interface SidebarTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {}

export function SidebarTrigger({ className, ...props }: SidebarTriggerProps) {
  const { expanded, setExpanded } = useSidebar();

  return (
    <button
      type="button"
      onClick={() => setExpanded(!expanded)}
      className={cn(
        "inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
      <span className="sr-only">Toggle sidebar</span>
    </button>
  );
}

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
};

import Link from "next/link";

export function SidebarLink() {
  return (
    <Link
      href="/agents/performance"
      className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted"
    >
      <Sparkles className="w-4 h-4" />
      <span>Agent Performance</span>
    </Link>
  );
}
