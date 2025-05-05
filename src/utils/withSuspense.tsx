import React, { Suspense } from 'react';

export default function withSuspense(element: JSX.Element) {
  return <Suspense fallback={<div className="p-4">Loading...</div>}>{element}</Suspense>;
}
