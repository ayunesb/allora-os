
import React from 'react';

interface LeadsHeaderProps {
  isMobileView: boolean;
}

export const LeadsHeader: React.FC<LeadsHeaderProps> = ({ isMobileView }) => {
  return (
    <h1 className={`${isMobileView ? 'text-xl' : 'text-2xl sm:text-3xl'} font-bold`}>
      Your Leads
    </h1>
  );
};
