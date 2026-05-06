"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Clock, Sunrise, Sun, CloudSun, Sunset, Moon, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

const PRAYER_TIMES = [
  { name: 'Fajr', time: '05:12 AM', icon: Sunrise, color: 'text-blue-400' },
  { name: 'Dhuhr', time: '12:25 PM', icon: Sun, color: 'text-yellow-500' },
  { name: 'Asr', time: '03:45 PM', icon: CloudSun, color: 'text-orange-400' },
  { name: 'Maghrib', time: '06:10 PM', icon: Sunset, color: 'text-red-400' },
  { name: 'Isha', time: '07:35 PM', icon: Moon, color: 'text-indigo-400' },
];

export function PrayerTimings() {
  const [playAzaan, setPlayAzaan] = useState(false);

  return (
    <div className="max-w-3xl mx-auto w-full">
      <Card className="bg-card/60 backdrop-blur-md border-border shadow-2xl rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-border bg-muted/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-headline">Prayer Timings</CardTitle>
                <CardDescription>Daily schedules for local prayers</CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-secondary/30 p-2 rounded-full px-4 border border-border">
              <Label htmlFor="azaan-toggle" className="cursor-pointer flex items-center gap-2 text-sm font-medium">
                {playAzaan ? <Volume2 className="h-4 w-4 text-primary" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
                Play Azaan
              </Label>
              <Switch 
                id="azaan-toggle" 
                checked={playAzaan} 
                onCheckedChange={setPlayAzaan}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PRAYER_TIMES.map((prayer) => (
              <div 
                key={prayer.name}
                className="flex flex-col items-center p-4 rounded-2xl bg-secondary/20 border border-border hover:border-primary/50 transition-all duration-300 group"
              >
                <prayer.icon className={cn("h-8 w-8 mb-3 transition-transform group-hover:scale-110", prayer.color)} />
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{prayer.name}</span>
                <span className="text-xl font-bold font-headline mt-1">{prayer.time}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/10 text-center">
            <p className="text-sm text-muted-foreground italic">
              "Prayer is the pillar of religion."
            </p>
            <p className="text-xs text-muted-foreground mt-2 opacity-70">
              Timings are based on standard local calculations and may vary by a few minutes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
