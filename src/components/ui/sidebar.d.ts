import * as React from "react";
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}
declare const Sidebar: React.ForwardRefExoticComponent<
  SidebarProps & React.RefAttributes<HTMLDivElement>
>;
declare const SidebarHeader: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
>;
declare const SidebarContent: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
>;
declare const SidebarFooter: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
>;
declare const SidebarGroup: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
>;
declare const SidebarGroupLabel: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLParagraphElement> &
    React.RefAttributes<HTMLParagraphElement>
>;
declare const SidebarGroupContent: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
>;
declare const SidebarMenu: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLUListElement> & React.RefAttributes<HTMLUListElement>
>;
declare const SidebarMenuItem: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLLIElement> & React.RefAttributes<HTMLLIElement>
>;
declare const SidebarMenuButton: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement> & {
    active?: boolean;
    asChild?: boolean;
  } & React.RefAttributes<HTMLDivElement>
>;
type SidebarContextValue = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};
export declare function useSidebar(): SidebarContextValue;
interface SidebarProviderProps {
  children: React.ReactNode;
  defaultExpanded?: boolean;
}
export declare function SidebarProvider({
  children,
  defaultExpanded,
}: SidebarProviderProps): React.JSX.Element;
interface SidebarTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {}
export declare function SidebarTrigger({
  className,
  ...props
}: SidebarTriggerProps): React.JSX.Element;
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
export declare function SidebarLink(): React.JSX.Element;
