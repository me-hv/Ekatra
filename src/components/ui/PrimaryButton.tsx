'use client';

import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export function PrimaryButton({
  children,
  variant = 'outline',
  size = 'md',
  icon,
  className = '',
  ...props
}: PrimaryButtonProps) {
  const baseStyle = "inline-flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer border";

  const variants = {
    solid: "bg-accent/15 border-accent/40 text-foreground hover:bg-accent/25 hover:border-accent",
    outline: "bg-background-card border-border hover:border-accent/70 text-foreground-muted hover:text-foreground",
    ghost: "bg-transparent border-transparent hover:border-border text-foreground-muted hover:text-foreground",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-[11px]",
    md: "px-5 py-2.5 text-xs",
    lg: "px-7 py-3.5 text-xs",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}
