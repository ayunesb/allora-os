// Creating/fixing the pagination component exports
import React from "react";
import { cn } from "@/lib/utils";
const Pagination = React.forwardRef(({ className, ...props }, ref) => (<nav ref={ref} className={cn("mx-auto flex w-full justify-center", className)} role="navigation" aria-label="pagination" {...props}/>));
Pagination.displayName = "Pagination";
const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (<ul ref={ref} className={cn("flex flex-wrap items-center gap-1", className)} {...props}/>));
PaginationContent.displayName = "PaginationContent";
const PaginationItem = React.forwardRef(({ className, ...props }, ref) => (<li ref={ref} className={cn("", className)} {...props}/>));
PaginationItem.displayName = "PaginationItem";
const PaginationLink = React.forwardRef(({ className, isActive, size = "icon", ...props }, ref) => (<a ref={ref} aria-current={isActive ? "page" : undefined} className={cn("flex h-9 w-9 items-center justify-center rounded-md border text-center text-sm transition-colors hover:bg-accent", isActive && "bg-primary text-primary-foreground hover:bg-primary/90", className)} {...props}/>));
PaginationLink.displayName = "PaginationLink";
const PaginationPrevious = React.forwardRef(({ className, ...props }, ref) => (<PaginationLink ref={ref} aria-label="Go to previous page" size="default" className={cn("gap-1", className)} {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
      <span>Previous</span>
    </PaginationLink>));
PaginationPrevious.displayName = "PaginationPrevious";
const PaginationNext = React.forwardRef(({ className, ...props }, ref) => (<PaginationLink ref={ref} aria-label="Go to next page" size="default" className={cn("gap-1", className)} {...props}>
      <span>Next</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    </PaginationLink>));
PaginationNext.displayName = "PaginationNext";
const PaginationEllipsis = React.forwardRef(({ className, ...props }, ref) => (<span ref={ref} aria-hidden className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <circle cx="12" cy="12" r="1"/>
      <circle cx="19" cy="12" r="1"/>
      <circle cx="5" cy="12" r="1"/>
    </svg>
    <span className="sr-only">More pages</span>
  </span>));
PaginationEllipsis.displayName = "PaginationEllipsis";
export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious };
