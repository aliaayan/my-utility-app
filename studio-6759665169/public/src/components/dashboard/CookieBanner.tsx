"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-in fade-in slide-in-from-bottom-10 duration-500">
      <div className="max-w-7xl mx-auto bg-card border border-border shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 backdrop-blur-md bg-opacity-95">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
          <ShieldCheck className="h-6 w-6" />
        </div>
        
        <div className="flex-1 space-y-1">
          <h3 className="font-headline font-bold text-lg">We value your privacy</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            NextUtils uses cookies to enhance your experience, analyze site traffic, and serve personalized advertisements through Google AdSense. By clicking "Accept", you consent to our use of cookies and data processing as outlined in our Privacy Policy.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Button variant="outline" className="sm:w-32" onClick={() => window.location.hash = '#policies'}>
            Read Policies
          </Button>
          <Button className="sm:w-32 bg-primary hover:bg-primary/90" onClick={handleAccept}>
            Accept
          </Button>
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
