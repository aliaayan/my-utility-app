import React from 'react';

export function AdPlaceholder() {
  return (
    <div className="w-full flex justify-center mt-auto py-8">
      <div className="w-full max-w-[728px] min-h-[90px] bg-secondary/50 border border-dashed border-muted-foreground/30 text-muted-foreground flex flex-col items-center justify-center rounded-lg shadow-inner">
        <span className="text-xs font-medium uppercase tracking-widest opacity-60">Advertisement</span>
        <span className="text-sm">Google AdSense Placeholder (728x90)</span>
      </div>
    </div>
  );
}
