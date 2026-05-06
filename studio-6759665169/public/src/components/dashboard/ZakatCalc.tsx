"use client"

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Coins, Wallet, Landmark, Gem, ArrowRight } from 'lucide-react';
import { type Currency } from './CurrencySelector';

interface ZakatCalcProps {
  currency: Currency;
}

export function ZakatCalc({ currency }: ZakatCalcProps) {
  const [cash, setCash] = useState<number>(0);
  const [gold, setGold] = useState<number>(0);
  const [silver, setSilver] = useState<number>(0);
  const [otherAssets, setOtherAssets] = useState<number>(0);

  const results = useMemo(() => {
    const total = (Number(cash) || 0) + (Number(gold) || 0) + (Number(silver) || 0) + (Number(otherAssets) || 0);
    const zakat = total * 0.025;
    return { total, zakat };
  }, [cash, gold, silver, otherAssets]);

  const formatValue = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.code }).format(val);

  return (
    <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-card/60 backdrop-blur-md border-border shadow-2xl rounded-2xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Coins className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-headline">Zakat Calculator</CardTitle>
              <CardDescription>Calculate your 2.5% payable Zakat</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cash" className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-muted-foreground" />
              Cash & Bank Balance ({currency.symbol})
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">{currency.symbol}</span>
              <Input
                id="cash"
                type="number"
                placeholder="0.00"
                value={cash || ''}
                onChange={(e) => setCash(parseFloat(e.target.value))}
                className="rounded-xl pl-9"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gold" className="flex items-center gap-2">
              <Gem className="h-4 w-4 text-muted-foreground" />
              Value of Gold ({currency.symbol})
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">{currency.symbol}</span>
              <Input
                id="gold"
                type="number"
                placeholder="0.00"
                value={gold || ''}
                onChange={(e) => setGold(parseFloat(e.target.value))}
                className="rounded-xl pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="silver" className="flex items-center gap-2">
              <Landmark className="h-4 w-4 text-muted-foreground" />
              Value of Silver ({currency.symbol})
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">{currency.symbol}</span>
              <Input
                id="silver"
                type="number"
                placeholder="0.00"
                value={silver || ''}
                onChange={(e) => setSilver(parseFloat(e.target.value))}
                className="rounded-xl pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="others" className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              Other Assets ({currency.symbol})
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">{currency.symbol}</span>
              <Input
                id="others"
                type="number"
                placeholder="0.00"
                value={otherAssets || ''}
                onChange={(e) => setOtherAssets(parseFloat(e.target.value))}
                className="rounded-xl pl-9"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6">
        <Card className="bg-primary text-primary-foreground border-none shadow-2xl rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Coins className="h-32 w-32" />
          </div>
          <CardHeader>
            <CardTitle className="text-xl font-headline">Calculation Result</CardTitle>
            <CardDescription className="text-primary-foreground/70">Total net assets and zakat</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm font-medium opacity-80 uppercase tracking-wider">Total Assets Value</p>
              <h3 className="text-3xl font-bold font-headline truncate">
                {formatValue(results.total)}
              </h3>
            </div>
            
            <div className="pt-6 border-t border-primary-foreground/20">
              <p className="text-sm font-medium opacity-80 uppercase tracking-wider">Payable Zakat (2.5%)</p>
              <h2 className="text-4xl md:text-5xl font-bold font-headline truncate">
                {formatValue(results.zakat)}
              </h2>
            </div>
          </CardContent>
        </Card>

        <div className="p-6 rounded-2xl bg-card/40 border border-border backdrop-blur-sm">
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            Nisab Reminder
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Zakat is only mandatory if your net assets exceed the Nisab threshold (equivalent to 87.48g of gold or 612.36g of silver) held for one lunar year.
          </p>
        </div>
      </div>
    </div>
  );
}
