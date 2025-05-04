import React from 'react';
import { QuoteIcon } from 'lucide-react';
const Testimonial = ({ quote, author, role, avatar, delay = 0 }) => {
    return (<div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300" style={{ animationDelay: `${delay}s` }}>
      <div className="flex justify-between items-start mb-4">
        <QuoteIcon className="h-8 w-8 text-primary/30"/>
      </div>
      
      <p className="text-lg mb-6 italic">"{quote}"</p>
      
      <div className="flex items-center">
        <img src={avatar} alt={author} className="h-12 w-12 rounded-full mr-4 border-2 border-primary/20"/>
        <div>
          <p className="font-medium">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>);
};
export default Testimonial;
