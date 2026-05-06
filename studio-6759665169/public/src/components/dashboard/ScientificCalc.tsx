"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Delete, Eraser, MoveLeft, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ScientificCalc() {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState('');

  const handleAction = (val: string) => {
    if (val === 'AC') {
      setDisplay('0');
      setHistory('');
      return;
    }

    if (val === 'C') {
      setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
      return;
    }

    if (val === '=') {
      try {
        // Simple safety: replace readable symbols with JS equivalents
        let expression = display
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/sin\(/g, 'Math.sin(')
          .replace(/cos\(/g, 'Math.cos(')
          .replace(/tan\(/g, 'Math.tan(')
          .replace(/log\(/g, 'Math.log10(')
          .replace(/ln\(/g, 'Math.log(')
          .replace(/π/g, 'Math.PI')
          .replace(/e/g, 'Math.E')
          .replace(/√\(/g, 'Math.sqrt(')
          .replace(/\^/g, '**');

        // Close dangling parentheses for convenience
        const openParens = (expression.match(/\(/g) || []).length;
        const closeParens = (expression.match(/\)/g) || []).length;
        if (openParens > closeParens) {
          expression += ')'.repeat(openParens - closeParens);
        }

        const result = eval(expression);
        setHistory(display + ' =');
        setDisplay(Number(result).toLocaleString('en-US', { maximumFractionDigits: 8 }));
      } catch (e) {
        setDisplay('Error');
      }
      return;
    }

    if (display === '0' || display === 'Error') {
      if (['sin(', 'cos(', 'tan(', 'log(', 'ln(', '√(', '('].includes(val)) {
        setDisplay(val);
      } else {
        setDisplay(val);
      }
    } else {
      setDisplay(display + val);
    }
  };

  const buttons = [
    { label: 'sin', action: 'sin(', type: 'func' },
    { label: 'cos', action: 'cos(', type: 'func' },
    { label: 'tan', action: 'tan(', type: 'func' },
    { label: 'AC', action: 'AC', type: 'danger' },
    { label: 'C', action: 'C', type: 'danger' },
    
    { label: 'log', action: 'log(', type: 'func' },
    { label: 'ln', action: 'ln(', type: 'func' },
    { label: '(', action: '(', type: 'op' },
    { label: ')', action: ')', type: 'op' },
    { label: '÷', action: '÷', type: 'op' },
    
    { label: 'π', action: 'π', type: 'func' },
    { label: '7', action: '7', type: 'num' },
    { label: '8', action: '8', type: 'num' },
    { label: '9', action: '9', type: 'num' },
    { label: '×', action: '×', type: 'op' },
    
    { label: '√', action: '√(', type: 'func' },
    { label: '4', action: '4', type: 'num' },
    { label: '5', action: '5', type: 'num' },
    { label: '6', action: '6', type: 'num' },
    { label: '-', action: '-', type: 'op' },
    
    { label: '^', action: '^', type: 'func' },
    { label: '1', action: '1', type: 'num' },
    { label: '2', action: '2', type: 'num' },
    { label: '3', action: '3', type: 'num' },
    { label: '+', action: '+', type: 'op' },
    
    { label: 'e', action: 'e', type: 'func' },
    { label: '0', action: '0', type: 'num' },
    { label: '.', action: '.', type: 'num' },
    { label: '=', action: '=', type: 'accent', colSpan: 2 },
  ];

  return (
    <Card className="w-full max-w-md mx-auto bg-card border-border shadow-2xl overflow-hidden">
      <CardHeader className="bg-secondary/50 border-b p-4">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-primary" />
          <CardTitle className="text-lg font-headline">Scientific Calculator</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="bg-black/20 p-6 flex flex-col items-end gap-1">
          <span className="text-xs text-muted-foreground min-h-[1rem] font-code">{history}</span>
          <span className="text-4xl font-code truncate max-w-full text-foreground">{display}</span>
        </div>
        
        <div className="grid grid-cols-5 gap-px bg-border p-px">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={() => handleAction(btn.action)}
              className={cn(
                "h-14 flex items-center justify-center text-sm font-medium transition-all hover:brightness-125 focus:outline-none",
                btn.type === 'num' ? "bg-card text-foreground" : 
                btn.type === 'func' ? "bg-secondary/40 text-accent font-code italic" :
                btn.type === 'op' ? "bg-secondary text-primary font-bold text-lg" :
                btn.type === 'danger' ? "bg-destructive/10 text-destructive" :
                btn.type === 'accent' ? "bg-accent text-accent-foreground font-bold text-xl" : "bg-card",
                btn.colSpan === 2 && "col-span-2"
              )}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
