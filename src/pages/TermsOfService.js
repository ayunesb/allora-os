"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TermsOfService;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_helmet_async_1 = require("react-helmet-async");
var card_1 = require("@/components/ui/card");
var scroll_area_1 = require("@/components/ui/scroll-area");
var Navbar_1 = require("@/components/Navbar");
var Footer_1 = require("@/components/Footer");
function TermsOfService() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "min-h-screen flex flex-col bg-background",
    children: [
      (0, jsx_runtime_1.jsxs)(react_helmet_async_1.Helmet, {
        children: [
          (0, jsx_runtime_1.jsx)("title", {
            children: "Terms of Service | Allora AI",
          }),
          (0, jsx_runtime_1.jsx)("meta", {
            name: "description",
            content: "Terms and conditions for using Allora AI's services",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(Navbar_1.default, {}),
      (0, jsx_runtime_1.jsx)("main", {
        className: "flex-grow container max-w-4xl mx-auto py-12 px-4",
        children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
          className: "mb-8",
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  className: "text-3xl font-bold",
                  children: "Terms of Service",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-muted-foreground",
                  children: "Last updated: April 14, 2025",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              children: (0, jsx_runtime_1.jsx)(scroll_area_1.ScrollArea, {
                className: "h-[60vh]",
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-6 pr-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("section", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h2", {
                          className: "text-xl font-semibold mb-3",
                          children: "1. Introduction",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          children:
                            "Welcome to Allora AI, a business acceleration platform designed to help businesses make strategic decisions, develop growth strategies, and gain competitive insights. These Terms of Service govern your use of our website, products, and services.",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("section", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h2", {
                          className: "text-xl font-semibold mb-3",
                          children: "2. Acceptance of Terms",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          children:
                            "By accessing or using Allora AI, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("section", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h2", {
                          className: "text-xl font-semibold mb-3",
                          children: "3. Use License",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          children:
                            "Permission is granted to temporarily use Allora AI for personal or business purposes, subject to the restrictions set forth in these Terms of Service. This license shall automatically terminate if you violate any of these restrictions.",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("section", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h2", {
                          className: "text-xl font-semibold mb-3",
                          children: "4. User Accounts",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          children:
                            "When you create an account with us, you must provide accurate, complete, and up-to-date information. You are responsible for safeguarding the password and for all activities that occur under your account.",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("section", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h2", {
                          className: "text-xl font-semibold mb-3",
                          children: "5. Payment Terms",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          children:
                            "Subscription fees are charged on a recurring basis. You may cancel your subscription at any time, but no refunds will be issued for the current billing period. We reserve the right to change our pricing with reasonable notice.",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("section", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h2", {
                          className: "text-xl font-semibold mb-3",
                          children: "6. Intellectual Property",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          children:
                            "Allora AI and its original content, features, and functionality are owned by Allora AI, Inc. and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("section", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h2", {
                          className: "text-xl font-semibold mb-3",
                          children: "7. Data Privacy",
                        }),
                        (0, jsx_runtime_1.jsxs)("p", {
                          children: [
                            "Your use of Allora AI is also governed by our Privacy Policy, which can be found at ",
                            (0, jsx_runtime_1.jsx)("a", {
                              href: "/privacy",
                              className: "text-primary hover:underline",
                              children: "Privacy Policy",
                            }),
                            ". By using Allora AI, you consent to the collection and use of information as detailed in our Privacy Policy.",
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("section", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h2", {
                          className: "text-xl font-semibold mb-3",
                          children: "8. Disclaimer of Warranties",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          children:
                            'Allora AI is provided "as is" and "as available" without any representations or warranties, express or implied. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the platform.',
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("section", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h2", {
                          className: "text-xl font-semibold mb-3",
                          children: "9. Limitation of Liability",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          children:
                            "In no event shall Allora AI, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("section", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h2", {
                          className: "text-xl font-semibold mb-3",
                          children: "10. Termination",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          children:
                            "We may terminate or suspend your account and access to Allora AI immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms of Service.",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("section", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h2", {
                          className: "text-xl font-semibold mb-3",
                          children: "11. Governing Law",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          children:
                            "These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("section", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h2", {
                          className: "text-xl font-semibold mb-3",
                          children: "12. Changes to Terms",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          children:
                            "We reserve the right to modify or replace these Terms at any time. It is your responsibility to check these Terms periodically for changes.",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("section", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h2", {
                          className: "text-xl font-semibold mb-3",
                          children: "13. Contact Us",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          children:
                            "If you have any questions about these Terms, please contact us at legal@allora-ai.com.",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(Footer_1.default, {}),
    ],
  });
}
