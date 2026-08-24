'use client';

import React from 'react';
import { EditorialLink } from './EditorialLink';

interface SectionHeaderProps {
  number: string;
  category: string;
  title: string;
  linkHref?: string;
  linkText?: string;
}

export function SectionHeader({
  number,
  category,
  title,
  linkHref,
  linkText = 'VIEW ALL',
}: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between border-b border-border pb-4 mb-8">
      <div>
        <span className="font-mono-tech text-xs text-accent tracking-widest block">
          {number} / {category}
        </span>
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-foreground mt-1">
          {title}
        </h2>
      </div>

      {linkHref && (
        <EditorialLink href={linkHref}>
          {linkText}
        </EditorialLink>
      )}
    </div>
  );
}
