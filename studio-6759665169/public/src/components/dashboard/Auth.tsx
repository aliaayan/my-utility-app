"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, LogIn, UserPlus, ArrowRight, Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export function Auth() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="flex items-center justify-center min-h-[70vh] p-4">
      <Card className="w-full max-w-md bg-card border-border shadow-2xl overflow-hidden">
        <div className="flex border-b border-border">
          <button 
            onClick={() => setMode('login')}
            className={cn(
              "flex-1 py-4 text-sm font-semibold transition-all",
              mode === 'login' ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted/50"
            )}
          >
            Login
          </button>
          <button 
            onClick={() => setMode('signup')}
            className={cn(
              "flex-1 py-4 text-sm font-semibold transition-all",
              mode === 'signup' ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted/50"
            )}
          >
            Sign Up
          </button>
        </div>

        <CardHeader className="space-y-1 pt-8">
          <CardTitle className="text-2xl font-headline text-center">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
          <CardDescription className="text-center">
            {mode === 'login' 
              ? 'Enter your credentials to access your dashboard' 
              : 'Join NextUtils to save your calculations and preferences'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="name@example.com" className="pl-10" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="password" type="password" placeholder="••••••••" className="pl-10" />
            </div>
          </div>

          <Button className="w-full h-11 bg-primary hover:bg-primary/90 mt-2">
            {mode === 'login' ? <LogIn className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />}
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Button variant="outline" className="h-11 border-border bg-secondary/20 hover:bg-secondary/40">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
        </CardContent>

        <CardFooter className="bg-muted/30 border-t flex flex-col items-center py-6">
          <p className="text-xs text-muted-foreground text-center">
            By clicking continue, you agree to our <br />
            <span className="text-primary hover:underline cursor-pointer">Terms of Service</span> and <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
