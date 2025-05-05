import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const OnboardingPage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Onboarding Process</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default OnboardingPage;
