"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ChevronRight, Newspaper, ArrowLeft } from 'lucide-react';
import { AdPlaceholder } from './AdPlaceholder';
import { BLOG_POSTS, type BlogPost } from '@/app/data/blog-posts';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const getImageUrl = (imageId: string) => {
    return PlaceHolderImages.find(img => img.id === imageId)?.imageUrl || "https://picsum.photos/seed/blog/800/600";
  };

  const getImageHint = (imageId: string) => {
    return PlaceHolderImages.find(img => img.id === imageId)?.imageHint || "blog post";
  };

  if (selectedPost) {
    return (
      <div className="flex flex-col gap-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedPost(null)}
          className="w-fit gap-2 text-primary hover:text-primary/80 hover:bg-primary/5"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Insights
        </Button>

        <Card className="bg-card/40 backdrop-blur-md border-border overflow-hidden shadow-2xl">
          <div className="relative h-64 md:h-96 w-full">
            <Image 
              src={getImageUrl(selectedPost.imageId)} 
              alt={selectedPost.title}
              fill
              className="object-cover"
              data-ai-hint={getImageHint(selectedPost.imageId)}
            />
          </div>
          <CardHeader className="space-y-4 p-8">
            <div className="flex justify-between items-center">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-medium">
                {selectedPost.category}
              </Badge>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {selectedPost.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {selectedPost.readTime}</span>
              </div>
            </div>
            <CardTitle className="text-3xl md:text-4xl font-headline font-bold leading-tight">
              {selectedPost.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0 prose prose-invert max-w-none">
            <div className="text-muted-foreground text-lg leading-relaxed space-y-6 font-body whitespace-pre-wrap">
              {selectedPost.content}
            </div>
          </CardContent>
          <CardFooter className="p-8 border-t border-border/50 bg-muted/20">
            <div className="w-full">
              <AdPlaceholder />
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div className="px-4 md:px-0">
        <AdPlaceholder />
      </div>
      
      <div className="space-y-2 px-4 md:px-0">
        <div className="flex items-center gap-3 text-primary mb-2">
          <Newspaper className="h-8 w-8" />
          <h2 className="text-3xl font-headline font-bold">Utility Insights</h2>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Expert tips, guides, and industry news to help you get the most out of our utility tools and improve your productivity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
        {BLOG_POSTS.map((post) => (
          <Card key={post.id} className="bg-card/40 backdrop-blur-md border-border hover:border-primary/50 transition-all duration-300 flex flex-col group shadow-lg overflow-hidden">
            <div className="relative h-48 w-full">
              <Image 
                src={getImageUrl(post.imageId)} 
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={getImageHint(post.imageId)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <Badge className="absolute top-4 left-4 bg-primary/20 backdrop-blur-md text-primary-foreground border-none">
                {post.category}
              </Badge>
            </div>
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-headline leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </CardTitle>
              <div className="flex items-center gap-4 text-[10px] text-muted-foreground mt-3 uppercase tracking-widest font-bold">
                <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3 text-primary" /> {post.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-primary" /> {post.readTime}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 pb-6">
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed font-body">
                {post.description}
              </p>
            </CardContent>
            <CardFooter className="pt-0 border-t border-border/50 py-4">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedPost(post)}
                className="p-0 h-auto text-primary font-bold hover:text-primary/80 hover:bg-transparent group/btn"
              >
                Read Article <ChevronRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="px-4 md:px-0">
        <AdPlaceholder />
      </div>
    </div>
  );
}