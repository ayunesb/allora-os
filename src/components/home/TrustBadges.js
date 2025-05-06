"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var tooltip_1 = require("@/components/ui/tooltip");
var TrustBadges = function () {
  var badges = [
    {
      icon: lucide_react_1.ShieldCheck,
      label: "GDPR Compliant",
      description:
        "Our platform adheres to all GDPR requirements for data protection",
    },
    {
      icon: lucide_react_1.Shield,
      label: "SOC 2 Certified",
      description:
        "Validated security controls and procedures to protect your data",
    },
    {
      icon: lucide_react_1.Lock,
      label: "Bank-Level Security",
      description: "Enterprise-grade encryption for all your business data",
    },
    {
      icon: lucide_react_1.CheckCircle,
      label: "ISO 27001",
      description: "Internationally recognized information security standard",
    },
  ];
  return (0, jsx_runtime_1.jsx)("div", {
    className:
      "w-full bg-gradient-to-r from-[#0A0F24] to-[#1B1B3A] py-8 md:py-10",
    children: (0, jsx_runtime_1.jsx)("div", {
      className: "container mx-auto",
      children: (0, jsx_runtime_1.jsx)("div", {
        className: "flex flex-wrap justify-center gap-4 md:gap-8",
        children: (0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, {
          children: badges.map(function (badge, index) {
            return (0, jsx_runtime_1.jsxs)(
              tooltip_1.Tooltip,
              {
                children: [
                  (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                    asChild: true,
                    children: (0, jsx_runtime_1.jsxs)("div", {
                      className:
                        "flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300",
                      children: [
                        (0, jsx_runtime_1.jsx)(badge.icon, {
                          className: "h-5 w-5 text-primary",
                        }),
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "text-white/90 font-medium",
                          children: badge.label,
                        }),
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                    children: (0, jsx_runtime_1.jsx)("p", {
                      className: "text-xs max-w-[200px]",
                      children: badge.description,
                    }),
                  }),
                ],
              },
              index,
            );
          }),
        }),
      }),
    }),
  });
};
exports.default = TrustBadges;
