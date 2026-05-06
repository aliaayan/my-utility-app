
import type { Metadata, Viewport } from 'next';
import { Kalam } from 'next/font/google';
import './globals.css';
import { CookieBanner } from '@/components/dashboard/CookieBanner';
import { Toaster } from "@/components/ui/toaster";

const kalam = Kalam({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-kalam',
});

export const metadata: Metadata = {
  title: 'UniTool - Universal Multi-Tool',
  description: 'Universal Utility Dashboard with Voice Assistance, Mortgage, and Scientific Calculators.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'UniTool',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="UniTool" />
      </head>
      <body className={`${kalam.variable} font-body antialiased bg-background text-foreground overflow-x-hidden relative transition-colors duration-300`}>
        {children}
        <CookieBanner />
        <Toaster />
      </body>
    </html>
  );
}
