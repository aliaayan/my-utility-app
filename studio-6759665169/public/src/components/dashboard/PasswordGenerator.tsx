"use client"

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Shield, Copy, RefreshCw, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState([16]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const generatePassword = useCallback(() => {
    const charset = {
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
    };

    let characters = charset.lowercase;
    if (includeUppercase) characters += charset.uppercase;
    if (includeNumbers) characters += charset.numbers;
    if (includeSymbols) characters += charset.symbols;

    let generatedPassword = '';
    for (let i = 0; i < length[0]; i++) {
      generatedPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setPassword(generatedPassword);
    setIsCopied(false);
  }, [length, includeUppercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setIsCopied(true);
    toast({
      title: "Password Copied",
      description: "Secure password has been saved to your clipboard.",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Generate a password on initial load
  React.useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <div className="max-w-xl mx-auto w-full">
      <Card className="bg-card/60 backdrop-blur-md border-border shadow-2xl rounded-2xl overflow-hidden transition-all duration-300">
        <CardHeader className="border-b border-border bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-headline">Password Generator</CardTitle>
              <CardDescription>Create complex, secure passwords instantly</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <div className="space-y-4">
            <div className="relative group">
              <Input
                readOnly
                value={password}
                placeholder="Click generate..."
                className="h-14 text-xl font-code bg-secondary/30 border-2 border-border focus:border-primary transition-all pr-12 rounded-xl"
              />
              <button
                onClick={generatePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors p-2"
                title="Regenerate"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col gap-4 bg-secondary/20 p-6 rounded-2xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <Label className="text-base font-bold">Password Length: {length[0]}</Label>
              </div>
              <Slider
                value={length}
                onValueChange={setLength}
                max={32}
                min={8}
                step={1}
                className="py-4"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center justify-between space-x-2 bg-secondary/10 p-4 rounded-xl border border-border/50">
              <Label htmlFor="uppercase" className="flex-1 cursor-pointer font-medium">Uppercase (A-Z)</Label>
              <Switch
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={setIncludeUppercase}
              />
            </div>
            <div className="flex items-center justify-between space-x-2 bg-secondary/10 p-4 rounded-xl border border-border/50">
              <Label htmlFor="numbers" className="flex-1 cursor-pointer font-medium">Numbers (0-9)</Label>
              <Switch
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={setIncludeNumbers}
              />
            </div>
            <div className="flex items-center justify-between space-x-2 bg-secondary/10 p-4 rounded-xl border border-border/50 sm:col-span-2">
              <Label htmlFor="symbols" className="flex-1 cursor-pointer font-medium">Special Characters (!@#$)</Label>
              <Switch
                id="symbols"
                checked={includeSymbols}
                onCheckedChange={setIncludeSymbols}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 bg-muted/10 border-t border-border flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={generatePassword} 
            className="flex-1 h-12 text-lg font-bold bg-primary hover:bg-primary/90 rounded-xl"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Generate
          </Button>
          <Button 
            variant="secondary" 
            onClick={copyToClipboard}
            className="flex-1 h-12 text-lg font-bold rounded-xl border-border"
          >
            {isCopied ? <Check className="mr-2 h-5 w-5 text-accent" /> : <Copy className="mr-2 h-5 w-5" />}
            {isCopied ? 'Copied!' : 'Copy to Clipboard'}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="mt-6 p-4 rounded-2xl bg-accent/5 border border-accent/20 flex items-start gap-3">
        <div className="mt-0.5 text-accent">
          <Shield className="h-4 w-4" />
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed italic">
          <strong>Security Tip:</strong> A longer password with a mix of letters, numbers, and symbols is exponentially harder to crack. Aim for at least 16 characters for high-security accounts.
        </p>
      </div>
    </div>
  );
}
