import React from "react";
interface FAQItem {
  question: string;
  answer: string;
}
interface FAQSectionProps {
  title: string;
  items: FAQItem[];
}
declare const FAQSection: React.FC<FAQSectionProps>;
export default FAQSection;
