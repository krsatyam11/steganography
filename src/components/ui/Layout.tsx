import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("bg-card/50 border border-border rounded-lg backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 overflow-hidden", className)}>
    {children}
  </div>
);

export const NeonButton = ({ 
  children, 
  variant = 'cyan', 
  onClick, 
  disabled, 
  className 
}: { 
  children: React.ReactNode; 
  variant?: 'cyan' | 'purple'; 
  onClick?: () => void; 
  disabled?: boolean;
  className?: string;
}) => {
  const colors = variant === 'cyan' 
    ? 'border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:shadow-[0_0_20px_hsl(185_100%_50%_/_0.5)]' 
    : 'border-purple-500 text-purple-500 hover:bg-purple-500 hover:shadow-[0_0_20px_hsl(270_100%_65%_/_0.5)]';

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-6 py-2 font-mono border-2 rounded-lg hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
        colors,
        className
      )}
    >
      {children}
    </button>
  );
};