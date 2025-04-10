
import React from 'react';

export function LaunchInfoBox() {
  return (
    <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 rounded-xl p-4">
      <h3 className="text-sm font-medium text-indigo-800 dark:text-indigo-300 mb-2">What happens when you launch?</h3>
      <ul className="text-xs text-indigo-700 dark:text-indigo-400 space-y-1.5">
        <li className="flex items-start gap-1.5">
          <span className="text-indigo-500">•</span>
          <span>Creates Allora AI as its own demo customer</span>
        </li>
        <li className="flex items-start gap-1.5">
          <span className="text-indigo-500">•</span>
          <span>Generates strategic launch plans</span>
        </li>
        <li className="flex items-start gap-1.5">
          <span className="text-indigo-500">•</span>
          <span>Sets up initial marketing campaigns</span>
        </li>
        <li className="flex items-start gap-1.5">
          <span className="text-indigo-500">•</span>
          <span>Pre-loads sample leads for demonstrations</span>
        </li>
        <li className="flex items-start gap-1.5">
          <span className="text-indigo-500">•</span>
          <span>Notifies team channels of launch initiation</span>
        </li>
      </ul>
    </div>
  );
}
