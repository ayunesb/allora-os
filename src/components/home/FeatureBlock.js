import React from 'react';
const FeatureBlock = ({ emoji, title, description, icon, delay = 0 }) => {
    return (<div className="bg-card hover:bg-card/80 p-6 sm:p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden relative h-full" style={{ animationDelay: `${delay}s` }}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] -mr-8 -mt-8 z-0"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col items-center mb-4">
          <div className="text-2xl sm:text-3xl mb-2">{emoji}</div>
          {icon && <div className="mt-2">{icon}</div>}
        </div>
        
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-center">{title}</h3>
        <p className="text-sm sm:text-base text-muted-foreground text-center">{description}</p>
      </div>
    </div>);
};
export default FeatureBlock;
