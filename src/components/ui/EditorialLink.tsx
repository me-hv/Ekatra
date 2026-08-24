'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface EditorialLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  showArrow?: boolean;
}

export function EditorialLink({
  href,
  children,
  external = false,
  className = '',
  showArrow = true,
}: EditorialLinkProps) {
  const content = (
    <span className={`inline-flex items-center gap-2 font-mono text-xs text-foreground-muted hover:text-foreground transition-colors group relative py-0.5 border-b border-transparent hover:border-accent ${className}`}>
      <span className="tracking-wider">{children}</span>
      {showArrow && (
        <ArrowRight className="w-3.5 h-3.5 text-accent group-hover:translate-x-1 transition-transform" />
      )}
    </span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="no-underline">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="no-underline">
      {content}
    </Link>
  );
}
