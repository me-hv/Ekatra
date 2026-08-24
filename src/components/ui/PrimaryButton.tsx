'use client';

import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export function PrimaryButton({
  children,
  variant = 'accent',
  size = 'md',
  icon,
  className = '',
  ...props
}: PrimaryButtonProps) {
  const baseStyle = "inline-flex items-center justify-center gap-2 rounded font-mono text-xs font-bold tracking-wider uppercase transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    accent: "bg-accent text-[#09090b] hover:bg-accent-hover shadow-[0_0_20px_var(--accent-glow)]",
    outline: "bg-background-card border border-border hover:border-accent text-foreground hover:text-accent",
    ghost: "bg-transparent hover:bg-background-hover text-foreground-muted hover:text-foreground",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-[11px]",
    md: "px-5 py-2.5 text-xs",
    lg: "px-8 py-4 text-xs tracking-widest",
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
