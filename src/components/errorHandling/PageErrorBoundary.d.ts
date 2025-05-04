import { ReactNode } from "react";
interface ErrorBoundaryProps {
    children: ReactNode;
    pageName: string;
}
export declare function PageErrorBoundary({ children, pageName }: ErrorBoundaryProps): JSX.Element;
export {};
