import React from 'react';
export const PageTitle = ({ title, description, children }) => {
    return (<div className="mb-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
          {description && (<p className="text-muted-foreground mt-1">{description}</p>)}
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          {children}
        </div>
      </div>
    </div>);
};
export default PageTitle;
