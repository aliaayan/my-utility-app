
"use client"

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Calculator, Percent, Calendar } from 'lucide-react';
import { type Currency } from './CurrencySelector';

interface MortgageCalcProps {
  currency: Currency;
}

export function MortgageCalc({ currency }: MortgageCalcProps) {
  const [principal, setPrincipal] = useState(300000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [years, setYears] = useState(30);

  const results = useMemo(() => {
    const p = Math.max(0, principal);
    const r = (interestRate || 0) / 100 / 12;
    const n = (years || 1) * 12;

    if (r === 0) {
      const monthly = p / n;
      const totalInterest = 0;
      return { monthly, totalInterest, totalPayment: p };
    }

    const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthly * n;
    const totalInterest = totalPayment - p;

    return { monthly, totalInterest, totalPayment };
  }, [principal, interestRate, years]);

  const chartData = [
    { name: 'Principal', value: Math.max(0, principal), color: 'hsl(var(--chart-1))' },
    { name: 'Interest', value: Math.max(0, results.totalInterest), color: 'hsl(var(--chart-2))' },
  ];

  const formatValue = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.code }).format(val);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
      <Card className="bg-card/60 backdrop-blur-md border-border shadow-2xl rounded-2xl overflow-hidden h-fit">
        <CardHeader>
          <div className="flex items-center gap-2 text-primary mb-2">
            <Calculator className="h-5 w-5" />
            <CardTitle className="text-2xl font-headline">Loan Details</CardTitle>
          </div>
          <CardDescription>Enter your loan details to calculate monthly payments.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="principal" className="flex items-center gap-2">
              <span className="h-4 w-4 text-muted-foreground font-bold flex items-center justify-center">{currency.symbol}</span>
              Principal Amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">{currency.symbol}</span>
              <Input
                id="principal"
                type="number"
                value={principal || ''}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="pl-9 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interest" className="flex items-center gap-2">
              <Percent className="h-4 w-4 text-muted-foreground" />
              Interest Rate (%)
            </Label>
            <Input
              id="interest"
              type="number"
              step="0.1"
              value={interestRate || ''}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="years" className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              Loan Term (Years)
            </Label>
            <Input
              id="years"
              type="number"
              value={years || ''}
              onChange={(e) => setYears(Number(e.target.value))}
              className="rounded-xl"
            />
          </div>

          <div className="pt-6 border-t border-border">
            <div className="bg-primary/10 rounded-2xl p-6 text-center overflow-hidden">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Estimated Monthly Payment</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-headline break-words">
                {formatValue(results.monthly)}
              </h2>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/60 backdrop-blur-md border-border shadow-2xl rounded-2xl overflow-hidden flex flex-col">
        <CardHeader>
          <CardTitle className="text-xl font-headline">Payment Breakdown</CardTitle>
          <CardDescription>Visualization of principal vs total interest paid.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="relative w-full h-64 mx-auto flex items-center justify-center">
            <div className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => formatValue(value)}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '1rem' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-2xl bg-secondary/30 border border-border overflow-hidden text-center sm:text-left">
              <p className="text-xs text-muted-foreground mb-1">Total Principal</p>
              <p className="text-base sm:text-lg font-semibold truncate" title={formatValue(principal)}>
                {formatValue(principal)}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-secondary/30 border border-border overflow-hidden text-center sm:text-left">
              <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
              <p className="text-base sm:text-lg font-semibold truncate" title={formatValue(results.totalInterest)}>
                {formatValue(results.totalInterest)}
              </p>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-2xl bg-primary/5 border border-primary/20 text-center overflow-hidden">
             <p className="text-xs text-muted-foreground mb-1">Total Cost of Loan</p>
             <p className="text-lg sm:text-xl font-bold text-primary truncate" title={formatValue(results.totalPayment)}>
                {formatValue(results.totalPayment)}
             </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
