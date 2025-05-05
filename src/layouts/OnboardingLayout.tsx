import React from 'react';
// Fixed import casing
import SomeComponent from '../components/SomeComponent';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}