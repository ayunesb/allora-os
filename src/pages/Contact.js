"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Contact;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var lucide_react_1 = require("lucide-react");
function Contact() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4 py-12 max-w-7xl",
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        className: "text-4xl font-bold text-center mb-8",
        children: "Contact Us",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid md:grid-cols-2 gap-8",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: "Send Us a Message",
                }),
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsxs)("form", {
                  className: "space-y-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("label", {
                          htmlFor: "name",
                          className: "block text-sm font-medium mb-1",
                          children: "Your Name",
                        }),
                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                          id: "name",
                          placeholder: "Enter your name",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("label", {
                          htmlFor: "email",
                          className: "block text-sm font-medium mb-1",
                          children: "Email Address",
                        }),
                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                          id: "email",
                          type: "email",
                          placeholder: "Enter your email",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("label", {
                          htmlFor: "subject",
                          className: "block text-sm font-medium mb-1",
                          children: "Subject",
                        }),
                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                          id: "subject",
                          placeholder: "What is this regarding?",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("label", {
                          htmlFor: "message",
                          className: "block text-sm font-medium mb-1",
                          children: "Message",
                        }),
                        (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                          id: "message",
                          placeholder: "How can we help you?",
                          className: "min-h-[120px]",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      type: "submit",
                      className: "w-full",
                      children: "Send Message",
                    }),
                  ],
                }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-6",
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.Card, {
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                    children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      children: "Our Contact Information",
                    }),
                  }),
                  (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                    className: "space-y-4",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-start space-x-3",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Mail, {
                            className: "h-5 w-5 text-primary mt-0.5",
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)("h3", {
                                className: "font-medium",
                                children: "Email",
                              }),
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "text-muted-foreground",
                                children: "contact@allora-ai.com",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-start space-x-3",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Phone, {
                            className: "h-5 w-5 text-primary mt-0.5",
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)("h3", {
                                className: "font-medium",
                                children: "Phone",
                              }),
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "text-muted-foreground",
                                children: "+1 (555) 123-4567",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-start space-x-3",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, {
                            className: "h-5 w-5 text-primary mt-0.5",
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)("h3", {
                                className: "font-medium",
                                children: "Address",
                              }),
                              (0, jsx_runtime_1.jsxs)("p", {
                                className: "text-muted-foreground",
                                children: [
                                  "123 AI Innovation Way",
                                  (0, jsx_runtime_1.jsx)("br", {}),
                                  "San Francisco, CA 94105",
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(card_1.Card, {
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                    children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      children: "Business Hours",
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                    children: (0, jsx_runtime_1.jsxs)("ul", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)("li", {
                          className: "flex justify-between",
                          children: [
                            (0, jsx_runtime_1.jsx)("span", {
                              children: "Monday - Friday:",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              children: "9:00 AM - 6:00 PM",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("li", {
                          className: "flex justify-between",
                          children: [
                            (0, jsx_runtime_1.jsx)("span", {
                              children: "Saturday:",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              children: "10:00 AM - 4:00 PM",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("li", {
                          className: "flex justify-between",
                          children: [
                            (0, jsx_runtime_1.jsx)("span", {
                              children: "Sunday:",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              children: "Closed",
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
