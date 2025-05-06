"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LegalDocument;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var DocumentLegalContent_1 = require("@/components/compliance/legal/DocumentLegalContent");
function LegalDocument() {
  var _a = (0, react_router_dom_1.useParams)().id,
    id = _a === void 0 ? "" : _a;
  // Content mapping based on document id
  var documentContentMap = {
    "terms-of-service": {
      title: "Terms of Service",
      description: "Our terms for using the platform",
      content: "These are the Terms of Service for our platform...",
    },
    "privacy-policy": {
      title: "Privacy Policy",
      description: "How we collect and use your data",
      content:
        "This Privacy Policy describes our policies on the collection, use, and disclosure of your information...",
    },
    cookies: {
      title: "Cookie Policy",
      description: "How we use cookies and similar technologies",
      content:
        "Our Cookie Policy explains how we use cookies and similar technologies...",
    },
    "refund-policy": {
      title: "Refund Policy",
      description: "Our refund and cancellation terms",
      content:
        "This Refund Policy outlines our procedures and rules for refunds and cancellations...",
    },
    "data-processing": {
      title: "Data Processing Agreement",
      description: "Terms for processing personal data",
      content:
        "This Data Processing Agreement supplements our Terms of Service...",
    },
    "messaging-consent": {
      title: "Messaging Consent",
      description: "Terms for communication consent",
      content:
        "This Messaging Consent document outlines how we communicate with you...",
    },
  };
  // Get document content or use defaults if not found
  var documentContent = documentContentMap[id] || {
    title: "Legal Document",
    description: "This legal document could not be found",
    content: "",
  };
  return (0, jsx_runtime_1.jsx)("div", {
    className: "container mx-auto py-8 px-4",
    children: (0, jsx_runtime_1.jsx)(DocumentLegalContent_1.default, {
      title: documentContent.title,
      description: documentContent.description,
      content: documentContent.content,
    }),
  });
}
