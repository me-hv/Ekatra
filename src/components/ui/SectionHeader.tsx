'use client';

import React from 'react';
import { EditorialLink } from './EditorialLink';

interface SectionHeaderProps {
  number: string;
  category: string;
  title: string;
  subtitle?: string;
  linkHref?: string;
  linkText?: string;
}

export function SectionHeader({
  number,
  category,
  title,
  subtitle,
  linkHref,
  linkText = 'VIEW ALL',
}: SectionHeaderProps) {
  return (
    <div className="space-y-2 border-b border-border pb-6 mb-10">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-accent tracking-[0.2em]">
          {number} / {category}
        </span>

        {linkHref && (
          <EditorialLink href={linkHref}>
            {linkText}
          </EditorialLink>
        )}
      </div>

      <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-foreground">
        {title}
      </h2>

      {subtitle && (
        <p className="font-sans text-sm text-foreground-muted max-w-2xl pt-1 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
