
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0A23] text-white py-8 px-4">
      <div className="container mx-auto flex flex-col items-center">
        <img src="/lovable-uploads/fa68c49e-02d3-4f17-b128-a5b8f6f1665b.png" alt="Allora AI Logo" className="h-16 mb-4" />
        <p className="mb-4">© 2025 Allora AI. All Rights Reserved.</p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <Link to="/legal/terms-of-service" className="text-[#63B3ED] hover:underline">Terms</Link>
          <span className="text-white">|</span>
          <Link to="/legal/privacy-policy" className="text-[#63B3ED] hover:underline">Privacy</Link>
          <span className="text-white">|</span>
          <Link to="/legal/cookies" className="text-[#63B3ED] hover:underline">Cookies</Link>
          <span className="text-white">|</span>
          <Link to="/legal/compliance" className="text-[#63B3ED] hover:underline">Compliance</Link>
          <span className="text-white">|</span>
          <Link to="/legal/refund-policy" className="text-[#63B3ED] hover:underline">Refund Policy</Link>
          <span className="text-white">|</span>
          <Link to="/legal/messaging-consent" className="text-[#63B3ED] hover:underline">Messaging Consent</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
