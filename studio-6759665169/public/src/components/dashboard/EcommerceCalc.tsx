"use client"

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Briefcase, ShoppingBag, Truck, Package, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Currency } from './CurrencySelector';

interface EcommerceCalcProps {
  currency: Currency;
}

export function EcommerceCalc({ currency }: EcommerceCalcProps) {
  const [sellingPrice, setSellingPrice] = useState<number>(0);
  const [itemCost, setItemCost] = useState<number>(0);
  const [courierCharges, setCourierCharges] = useState<number>(0);
  const [packagingCost, setPackagingCost] = useState<number>(0);

  const results = useMemo(() => {
    const totalCost = (Number(itemCost) || 0) + (Number(courierCharges) || 0) + (Number(packagingCost) || 0);
    const profit = (Number(sellingPrice) || 0) - totalCost;
    const margin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;
    return { profit, margin, totalCost };
  }, [sellingPrice, itemCost, courierCharges, packagingCost]);

  const formatValue = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.code }).format(val);

  return (
    <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-card/60 backdrop-blur-md border-border shadow-2xl rounded-2xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-headline">E-commerce Profit</CardTitle>
              <CardDescription>Calculate your net margin per sale</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sellingPrice" className="flex items-center gap-2">
              <span className="font-bold">{currency.symbol}</span>
              Selling Price
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">{currency.symbol}</span>
              <Input
                id="sellingPrice"
                type="number"
                placeholder="0.00"
                value={sellingPrice || ''}
                onChange={(e) => setSellingPrice(parseFloat(e.target.value))}
                className="rounded-xl pl-9"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="itemCost" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              Item Cost Price ({currency.symbol})
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">{currency.symbol}</span>
              <Input
                id="itemCost"
                type="number"
                placeholder="0.00"
                value={itemCost || ''}
                onChange={(e) => setItemCost(parseFloat(e.target.value))}
                className="rounded-xl pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="courier" className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-muted-foreground" />
              Courier Charges ({currency.symbol})
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">{currency.symbol}</span>
              <Input
                id="courier"
                type="number"
                placeholder="0.00"
                value={courierCharges || ''}
                onChange={(e) => setCourierCharges(parseFloat(e.target.value))}
                className="rounded-xl pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="packaging" className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              Packaging Cost ({currency.symbol})
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">{currency.symbol}</span>
              <Input
                id="packaging"
                type="number"
                placeholder="0.00"
                value={packagingCost || ''}
                onChange={(e) => setPackagingCost(parseFloat(e.target.value))}
                className="rounded-xl pl-9"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6">
        <Card className={cn(
          "border-none shadow-2xl rounded-2xl overflow-hidden transition-colors duration-500",
          results.profit >= 0 ? "bg-accent text-accent-foreground" : "bg-destructive text-destructive-foreground"
        )}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-headline">Net Profit</CardTitle>
              {results.profit >= 0 ? <TrendingUp className="h-6 w-6" /> : <TrendingDown className="h-6 w-6" />}
            </div>
            <CardDescription className={cn(
              results.profit >= 0 ? "text-accent-foreground/70" : "text-destructive-foreground/70"
            )}>After all expenses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold font-headline truncate">
              {formatValue(results.profit)}
            </h2>
            
            <div className={cn(
              "pt-6 border-t",
              results.profit >= 0 ? "border-accent-foreground/20" : "border-destructive-foreground/20"
            )}>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm font-medium opacity-80 uppercase tracking-wider">Profit Margin</p>
                  <p className="text-2xl font-bold font-headline">{results.margin.toFixed(2)}%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium opacity-80 uppercase tracking-wider">Total Expenses</p>
                  <p className="text-xl font-bold font-headline">{formatValue(results.totalCost)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="p-6 rounded-2xl bg-card/40 border border-border backdrop-blur-sm space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Revenue:</span>
            <span className="font-bold">{formatValue(sellingPrice)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Costs:</span>
            <span className="font-bold text-destructive">{formatValue(results.totalCost)}</span>
          </div>
          <div className="h-px bg-border" />
          <div className="flex items-center justify-between text-lg font-bold">
            <span>Net:</span>
            <span className={results.profit >= 0 ? "text-accent" : "text-destructive"}>
              {formatValue(results.profit)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
