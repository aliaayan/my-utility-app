"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, MessageSquare, Loader2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { navigateByVoice } from '@/ai/flows/voice-navigation-flow';
import { explainFeature } from '@/ai/flows/voice-feature-explanation-flow';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

interface VoiceAssistantProps {
  onNavigate: (component: string) => void;
}

export function VoiceAssistant({ onNavigate }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your NextUtils Assistant. You can ask me to open a tool or explain how something works. Try saying 'Open the mortgage calculator' or 'What does the scientific calculator do?'",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleSendMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isProcessing]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  const handleSendMessage = async (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmedText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsProcessing(true);

    try {
      // Step 1: Check for navigation
      const navResult = await navigateByVoice({ voiceCommand: trimmedText });
      
      if (navResult.componentName) {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          text: `Navigating to ${navResult.componentName}...`,
          sender: 'ai',
          timestamp: new Date()
        }]);
        setTimeout(() => onNavigate(navResult.componentName), 1000);
      } else {
        // Step 2: Try feature explanation
        const explainResult = await explainFeature({ query: trimmedText });
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          text: explainResult.explanation,
          sender: 'ai',
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "I encountered an error processing that. Could you try again?",
        sender: 'ai',
        timestamp: new Date()
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto flex flex-col h-[600px] bg-card border-border shadow-xl">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/20 text-primary">
            <Mic className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl font-headline">Voice Assistant</CardTitle>
            <CardDescription>Speak to navigate or ask questions</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden bg-background/50">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4 pb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex flex-col max-w-[80%] gap-1",
                  msg.sender === 'user' ? "ml-auto items-end" : "items-start"
                )}
              >
                <div
                  className={cn(
                    "px-4 py-2 rounded-2xl text-sm shadow-sm",
                    msg.sender === 'user' 
                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                      : "bg-muted text-foreground rounded-tl-none border border-border"
                  )}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-muted-foreground px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            {isProcessing && (
              <div className="flex items-center gap-2 text-muted-foreground animate-pulse text-xs pl-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                Assistant is thinking...
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-muted/20">
          <div className="flex gap-2 items-center relative">
            <div className="relative flex items-center">
              <Button
                variant={isListening ? "destructive" : "outline"}
                size="icon"
                className={cn(
                  "rounded-full h-12 w-12 flex-shrink-0 transition-all duration-300",
                  isListening && "animate-pulse"
                )}
                onClick={toggleListening}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              {isListening && (
                <div className="absolute inset-0 rounded-full animate-pulse-ring bg-destructive/40 pointer-events-none" />
              )}
            </div>
            
            <form 
              className="flex-1 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
            >
              <Input
                placeholder="Type your command..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="rounded-full bg-background border-border h-11"
              />
              <Button 
                type="submit" 
                size="icon" 
                className="rounded-full h-11 w-11 flex-shrink-0 bg-primary hover:bg-primary/90"
                disabled={!inputText.trim() || isProcessing}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
          {isListening && (
             <p className="text-[10px] text-destructive font-medium text-center mt-2 animate-bounce">
              Listening for your command...
             </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
