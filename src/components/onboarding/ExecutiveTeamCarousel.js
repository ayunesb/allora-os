import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
export function ExecutiveTeamCarousel({ executives }) {
    return (_jsxs(Carousel, { className: "w-full", children: [_jsx(CarouselContent, { children: executives.map((executive) => (_jsx(CarouselItem, { className: "md:basis-1/2 lg:basis-1/3", children: _jsx(Card, { className: "border", children: _jsxs(CardContent, { className: "flex flex-col items-center p-4 pt-6 text-center", children: [_jsxs(Avatar, { className: "h-16 w-16 mb-2", children: [_jsx(AvatarImage, { src: executive.avatar, alt: executive.name }), _jsx(AvatarFallback, { className: "bg-primary/10 text-primary", children: executive.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("") })] }), _jsx("div", { className: "font-medium text-lg", children: executive.name }), _jsx(Badge, { variant: "outline", className: "mt-1 mb-2", children: executive.title }), _jsx("p", { className: "text-xs text-muted-foreground", children: executive.specialty })] }) }) }, executive.id))) }), _jsx(CarouselPrevious, { className: "left-2" }), _jsx(CarouselNext, { className: "right-2" })] }));
}
