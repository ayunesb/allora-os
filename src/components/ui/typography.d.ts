import React from 'react';
export interface PageTitleProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
}
export declare const PageTitle: React.FC<PageTitleProps>;
export declare const TypographyH1: ({ children, className }: {
    children: React.ReactNode;
    className?: string;
}) => JSX.Element;
export declare const TypographyP: ({ children, className }: {
    children: React.ReactNode;
    className?: string;
}) => JSX.Element;
export declare const TypographySmall: ({ children, className }: {
    children: React.ReactNode;
    className?: string;
}) => JSX.Element;
