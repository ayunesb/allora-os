import React from "react";
import { BaseProps } from "@/types/props";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const OnboardingLayout: React.FC<BaseProps> = ({ children, className }) => {
  return <div className={`onboarding-layout ${className}`}>{children}</div>;
};

export default OnboardingLayout;
