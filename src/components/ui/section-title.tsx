import React from 'react';

export interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <h2 className={`text-2xl md:text-3xl font-bold mb-6 text-center ${className}`}>{children}</h2>
  );
} 