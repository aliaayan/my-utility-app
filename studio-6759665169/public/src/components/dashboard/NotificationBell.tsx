"use client"

import React from 'react';
import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const NOTIFICATIONS = [
  { id: 1, text: 'Maghrib prayer is in 15 minutes', time: '5m ago', unread: true },
  { id: 2, text: 'System updated successfully', time: '1h ago', unread: false },
  { id: 3, text: 'New blog post: Saving on Mortgage', time: '2h ago', unread: true },
  { id: 4, text: 'Welcome to NextUtils Dashboard!', time: '1d ago', unread: false },
];

export function NotificationBell() {
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative inline-block">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary transition-colors">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center p-0 text-[10px] border-2 border-background animate-in zoom-in duration-300"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-card/95 backdrop-blur-md border-border shadow-2xl rounded-2xl overflow-hidden p-0">
        <DropdownMenuLabel className="font-headline text-lg px-4 py-3 bg-muted/30">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="m-0" />
        <div className="max-h-80 overflow-y-auto">
          {NOTIFICATIONS.map((notif) => (
            <DropdownMenuItem key={notif.id} className="p-4 focus:bg-primary/5 cursor-pointer border-b border-border/30 last:border-0 rounded-none transition-colors">
              <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between items-start gap-2">
                  <p className={`text-sm leading-snug font-body ${notif.unread ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>
                    {notif.text}
                  </p>
                  {notif.unread && <div className="h-2 w-2 rounded-full bg-primary mt-1 shrink-0 shadow-[0_0_8px_hsl(var(--primary))]" />}
                </div>
                <span className="text-[10px] text-muted-foreground font-body">{notif.time}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator className="m-0" />
        <DropdownMenuItem className="justify-center text-xs text-primary font-bold py-3 hover:bg-primary/5 cursor-pointer transition-colors rounded-none">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
