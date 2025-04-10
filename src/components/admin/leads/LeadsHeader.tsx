
import React from 'react';

type LeadsHeaderProps = {
  isMobileView: boolean;
};

export const LeadsHeader: React.FC<LeadsHeaderProps> = ({ 
  isMobileView
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className={`${isMobileView ? 'text-xl' : 'text-2xl sm:text-3xl'} font-bold text-white`}>
          Leads Management
        </h1>
        <p className="text-gray-400 mt-1 text-sm">
          View and manage all leads
        </p>
      </div>
    </div>
  );
};
