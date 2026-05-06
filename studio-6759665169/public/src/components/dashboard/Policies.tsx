"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Shield, Cookie, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Policies() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-headline font-bold">Legal & Policies</h1>
        <p className="text-muted-foreground text-lg">
          Please review our terms, privacy, and cookie policies to understand how we protect your data.
        </p>
      </div>

      <Card className="bg-card border-border shadow-xl overflow-hidden">
        <CardHeader className="bg-muted/30 border-b">
          <div className="flex items-center gap-2 text-primary">
            <Shield className="h-5 w-5" />
            <CardTitle className="font-headline">Privacy Policy</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-8 prose prose-invert max-w-none">
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                <Info className="h-4 w-4 text-primary" />
                Information We Collect
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We collect information you provide directly to us, such as when you create an account or use our calculators. This may include your email address and calculation preferences. We also collect certain technical data automatically, such as IP addresses and browser types, to ensure service stability.
              </p>
            </section>
            
            <Separator className="bg-border/50" />

            <section>
              <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                <Shield className="h-4 w-4 text-primary" />
                Data Usage & Security
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Your data is primarily used to provide and improve the NextUtils services. We employ industry-standard encryption and security measures to protect your information from unauthorized access or disclosure.
              </p>
            </section>

            <Separator className="bg-border/50" />

            <section>
              <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                <Cookie className="h-4 w-4 text-primary" />
                Advertising Partners
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We partner with Google AdSense to show relevant ads. AdSense may use cookies and web beacons to collect information as a result of ad serving on our site. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
              </p>
            </section>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border shadow-xl overflow-hidden">
        <CardHeader className="bg-muted/30 border-b">
          <div className="flex items-center gap-2 text-primary">
            <FileText className="h-5 w-5" />
            <CardTitle className="font-headline">Terms of Service</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>By using NextUtils, you agree to these terms. Our tools (Calculators, Voice Assistant) are provided "as is" for informational purposes and should not be considered financial or professional advice.</p>
            <p>Users are responsible for the accuracy of data they input into the calculators. We are not liable for any financial decisions made based on tool outputs.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border shadow-xl overflow-hidden">
        <CardHeader className="bg-muted/30 border-b">
          <div className="flex items-center gap-2 text-primary">
            <Cookie className="h-5 w-5" />
            <CardTitle className="font-headline">Cookie Policy</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <p className="text-muted-foreground leading-relaxed mb-4">
            NextUtils uses cookies to store user preferences, manage authentication sessions, and for analytics and advertising purposes.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Essential Cookies: Required for core site functionality.</li>
            <li>Analytics Cookies: Help us understand how visitors interact with the site.</li>
            <li>Marketing Cookies: Used to track visitors across websites to display relevant ads via Google AdSense.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
