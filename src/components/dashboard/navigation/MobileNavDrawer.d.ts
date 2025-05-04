interface MobileNavDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentPath: string;
}
export declare function MobileNavDrawer({ open, onOpenChange, currentPath }: MobileNavDrawerProps): import("react").JSX.Element;
export {};
