import React from 'react';
import { Outlet } from 'react-router-dom';
// Fixed import casing
import SomeComponent from '../components/SomeComponent';

const OnboardingLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      {children || <Outlet />} {/* Provide fallback if children are missing */}
    </div>
  );
};

export default OnboardingLayout;