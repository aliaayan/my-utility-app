
"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Mic, 
  Calculator, 
  LayoutDashboard, 
  ChevronRight,
  Cpu,
  Search,
  Sun,
  Moon,
  Clock,
  Coins,
  ShoppingBag,
  Newspaper,
  LogIn,
  ShieldCheck,
  User,
  LogOut,
  Key,
  ArrowRightLeft,
  Sparkles
} from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { VoiceAssistant } from '@/components/dashboard/VoiceAssistant';
import { MortgageCalc } from '@/components/dashboard/MortgageCalc';
import { ScientificCalc } from '@/components/dashboard/ScientificCalc';
import { PrayerTimings } from '@/components/dashboard/PrayerTimings';
import { ZakatCalc } from '@/components/dashboard/ZakatCalc';
import { EcommerceCalc } from '@/components/dashboard/EcommerceCalc';
import { PasswordGenerator } from '@/components/dashboard/PasswordGenerator';
import { CurrencyConverter } from '@/components/dashboard/CurrencyConverter';
import { Blog } from '@/components/dashboard/Blog';
import { Auth } from '@/components/dashboard/Auth';
import { Policies } from '@/components/dashboard/Policies';
import { AdPlaceholder } from '@/components/dashboard/AdPlaceholder';
import { NotificationBell } from '@/components/dashboard/NotificationBell';
import { CurrencySelector, CURRENCIES, type Currency } from '@/components/dashboard/CurrencySelector';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type ViewState = 'Home' | 'VoiceAssistant' | 'MortgageCalc' | 'ScientificCalc' | 'PrayerTimings' | 'ZakatCalc' | 'EcommerceCalc' | 'PasswordGenerator' | 'CurrencyConverter' | 'Blog' | 'Auth' | 'Policies';

export default function Dashboard() {
  const [activeView, setActiveView] = useState<ViewState>('Home');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);
  const { toast } = useToast();

  const appLogo = PlaceHolderImages.find(img => img.id === 'app-logo');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    toast({
      title: `${newTheme === 'dark' ? 'Dark' : 'Light'} Mode Activated`,
      description: `Switched theme to ${newTheme} mode successfully.`,
    });
  };

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    toast({
      title: `Currency Changed to ${newCurrency.code}`,
      description: `Now using ${newCurrency.symbol} for all calculations.`,
    });
  };

  const navigationItems = [
    { id: 'Home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'VoiceAssistant', label: 'Voice Assistant', icon: Mic },
    { id: 'MortgageCalc', label: 'Mortgage Calc', icon: Calculator },
    { id: 'ScientificCalc', label: 'Scientific Calc', icon: Cpu },
    { id: 'PrayerTimings', label: 'Prayer Timings', icon: Clock },
    { id: 'ZakatCalc', label: 'Zakat Calc', icon: Coins },
    { id: 'EcommerceCalc', label: 'E-commerce Profit', icon: ShoppingBag },
    { id: 'CurrencyConverter', label: 'Currency Converter', icon: ArrowRightLeft },
    { id: 'PasswordGenerator', label: 'Password Gen', icon: Key },
    { id: 'Blog', label: 'Blog & News', icon: Newspaper },
    { id: 'Auth', label: 'Login / Sign Up', icon: LogIn },
    { id: 'Policies', label: 'Policies', icon: ShieldCheck },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'VoiceAssistant':
        return <VoiceAssistant onNavigate={(comp) => setActiveView(comp as ViewState)} />;
      case 'MortgageCalc':
        return <MortgageCalc currency={currency} />;
      case 'ScientificCalc':
        return <ScientificCalc />;
      case 'PrayerTimings':
        return <PrayerTimings />;
      case 'ZakatCalc':
        return <ZakatCalc currency={currency} />;
      case 'EcommerceCalc':
        return <EcommerceCalc currency={currency} />;
      case 'CurrencyConverter':
        return <CurrencyConverter />;
      case 'PasswordGenerator':
        return <PasswordGenerator />;
      case 'Blog':
        return <Blog />;
      case 'Auth':
        return <Auth />;
      case 'Policies':
        return <Policies />;
      default:
        return (
          <div className="flex flex-col gap-8 w-full">
            <div className="p-6 md:p-10 rounded-3xl bg-primary/5 border border-primary/10 flex flex-col items-center text-center backdrop-blur-sm relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-1000">
                  <Sparkles className="absolute top-4 left-10 h-8 w-8 text-primary animate-pulse" />
                  <Sparkles className="absolute bottom-10 right-12 h-6 w-6 text-accent animate-bounce" />
               </div>
               
               <div className="flex items-center gap-4 mb-6 relative">
                 <div className="relative h-16 w-16 md:h-24 md:w-24 rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20 group-hover:scale-105 transition-transform duration-500">
                    {appLogo && (
                      <Image 
                        src={appLogo.imageUrl} 
                        alt="App Logo" 
                        fill 
                        className="object-cover"
                        data-ai-hint={appLogo.imageHint}
                      />
                    )}
                 </div>
                 <div className="absolute -top-2 -right-2">
                    <Sparkles className="h-6 w-6 text-primary animate-spin-slow" />
                 </div>
               </div>

               <div className="flex items-center gap-3 mb-4">
                 <h2 className="text-3xl md:text-5xl font-headline font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text leading-tight">
                   Asalam u alikum ✨
                 </h2>
               </div>
               
               <p className="text-muted-foreground max-w-lg text-lg md:text-2xl leading-relaxed font-body">
                 Welcome back to your premium utility hub. Experience precision and productivity with every tool.
               </p>
               
               <div className="mt-8 flex gap-4">
                  <div className="h-1 w-32 md:w-48 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full" />
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {navigationItems.slice(1, 9).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id as ViewState)}
                  className="group relative flex flex-col p-6 bg-card/60 backdrop-blur-md border border-border rounded-2xl hover:border-primary transition-all duration-300 text-left overflow-hidden shadow-xl"
                >
                  <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg md:text-xl font-headline font-semibold mb-2 group-hover:text-primary transition-colors">{item.label}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Launch our {item.label.toLowerCase()} tool to handle your tasks efficiently.
                  </p>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="h-5 w-5 text-primary" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background font-body">
        <Sidebar collapsible="icon" className="border-r border-border">
          <SidebarHeader className="h-16 flex items-center px-4 border-b border-border">
            <div className="flex items-center gap-3 group cursor-pointer w-full" onClick={() => setActiveView('Home')}>
              <div className="h-10 w-10 rounded-xl overflow-hidden shadow-lg border border-primary/20 shrink-0">
                {appLogo && (
                  <Image 
                    src={appLogo.imageUrl} 
                    alt="Logo" 
                    width={40} 
                    height={40} 
                    className="object-cover"
                    data-ai-hint={appLogo.imageHint}
                  />
                )}
              </div>
              <span className="font-headline font-bold text-xl group-data-[collapsible=icon]:hidden truncate">NextUtils</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Tools</SidebarGroupLabel>
              <SidebarMenu>
                {navigationItems.slice(0, 10).map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      isActive={activeView === item.id}
                      onClick={() => setActiveView(item.id as ViewState)}
                      tooltip={item.label}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Account & Support</SidebarGroupLabel>
              <SidebarMenu>
                {navigationItems.slice(10).map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      isActive={activeView === item.id}
                      onClick={() => setActiveView(item.id as ViewState)}
                      tooltip={item.label}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-border p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={toggleTheme} tooltip="Toggle Theme">
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  <span className="group-data-[collapsible=icon]:hidden">
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full">
                  <User className="h-4 w-4" />
                  <span className="group-data-[collapsible=icon]:hidden">Profile</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
                  <LogOut className="h-4 w-4" />
                  <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex flex-col">
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <SidebarTrigger />
              <Separator orientation="vertical" className="hidden sm:block h-4" />
              <h1 className="font-headline font-semibold text-base md:text-lg truncate max-w-[150px] sm:max-w-none">
                {activeView === 'Home' ? 'Dashboard Overview' : navigationItems.find(i => i.id === activeView)?.label}
              </h1>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden sm:block">
                <CurrencySelector currentCurrency={currency} onCurrencyChange={handleCurrencyChange} />
              </div>
              <Button variant="ghost" size="icon" className="hidden sm:flex text-muted-foreground hover:text-primary" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Search className="h-5 w-5" />
              </Button>
              <NotificationBell />
              <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent hover:ring-primary transition-all">
                <AvatarImage src="https://picsum.photos/seed/user/32/32" />
                <AvatarFallback>NU</AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-8 flex flex-col gap-6 bg-gradient-to-br from-background via-background to-primary/5 overflow-x-hidden">
            <div className="max-w-7xl mx-auto w-full flex-1">
              {renderContent()}
            </div>
            
            {activeView !== 'Blog' && activeView !== 'Policies' && activeView !== 'Auth' && <AdPlaceholder />}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
