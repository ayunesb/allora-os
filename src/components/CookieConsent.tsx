
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already provided consent
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
    // Here you would disable non-essential cookies
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:max-w-md md:left-4 md:right-auto bg-background border border-border p-4 rounded-lg shadow-lg z-50">
      <p className="text-sm mb-4">
        We use cookies to personalize content and ads, to provide social media features and to analyze our traffic.
        <Link to="/legal/cookies" className="text-primary underline ml-1">Learn more</Link>.
      </p>
      <div className="flex gap-2">
        <Button onClick={acceptCookies} className="bg-green-600 hover:bg-green-700 text-white">
          Accept
        </Button>
        <Button onClick={declineCookies} variant="destructive">
          Decline
        </Button>
      </div>
    </div>
  );
}
