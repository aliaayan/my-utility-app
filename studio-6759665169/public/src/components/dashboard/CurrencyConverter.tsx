"use client"

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CURRENCIES, type Currency } from './CurrencySelector';
import { ArrowRightLeft, TrendingUp, RefreshCw } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

export function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('PKR');
  const [toCurrency, setToCurrency] = useState<string>('USD');

  // Mock exchange rates (relative to USD)
  const mockRates: Record<string, number> = {
    USD: 1,
    PKR: 278.5,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 151.4,
    SAR: 3.75,
    AED: 3.67,
    INR: 83.3,
    CAD: 1.35,
    AUD: 1.52,
  };

  const conversionResult = useMemo(() => {
    const rateFrom = mockRates[fromCurrency] || (Math.random() * 2 + 0.5);
    const rateTo = mockRates[toCurrency] || (Math.random() * 2 + 0.5);
    
    // Convert from source to USD, then USD to target
    const result = (amount / rateFrom) * rateTo;
    const rate = rateTo / rateFrom;
    
    return { result, rate };
  }, [amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getCurrency = (code: string) => CURRENCIES.find(c => c.code === code) || CURRENCIES[0];

  return (
    <div className="max-w-2xl mx-auto w-full">
      <Card className="bg-card/60 backdrop-blur-md border-border shadow-2xl rounded-2xl overflow-hidden">
        <CardHeader className="border-b bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <ArrowRightLeft className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-headline">Currency Converter</CardTitle>
              <CardDescription>Real-time exchange rate calculations</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="font-bold">Amount to Convert</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="h-14 text-2xl font-bold rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-end gap-4">
              <div className="space-y-2">
                <Label className="font-bold">From</Label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-card/95 backdrop-blur-md border-border">
                    <ScrollArea className="h-72">
                      {CURRENCIES.map(c => (
                        <SelectItem key={c.code} value={c.code} className="py-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-primary w-8">{c.symbol}</span>
                            <span>{c.code} - {c.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={swapCurrencies}
                className="mb-1 h-10 w-10 rounded-full hover:bg-primary/10 text-primary"
              >
                <RefreshCw className="h-5 w-5" />
              </Button>

              <div className="space-y-2">
                <Label className="font-bold">To</Label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-card/95 backdrop-blur-md border-border">
                    <ScrollArea className="h-72">
                      {CURRENCIES.map(c => (
                        <SelectItem key={c.code} value={c.code} className="py-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-primary w-8">{c.symbol}</span>
                            <span>{c.code} - {c.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col items-center text-center space-y-4">
            <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Converted Amount</p>
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-foreground">
              {getCurrency(toCurrency).symbol} {conversionResult.result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </h2>
            <div className="flex items-center gap-2 text-sm font-medium text-accent">
              <TrendingUp className="h-4 w-4" />
              <span>1 {fromCurrency} = {conversionResult.rate.toFixed(4)} {toCurrency}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6 flex justify-center">
        <p className="text-[10px] text-muted-foreground italic text-center max-w-sm">
          Exchange rates are illustrative. For real financial decisions, please verify with your bank or a real-time financial service.
        </p>
      </div>
    </div>
  );
}
