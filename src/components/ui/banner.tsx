import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface BannerProps {
  image: string;
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
}

export function Banner({ image, title, subtitle, cta }: BannerProps) {
  return (
    <section className="relative w-full h-64 md:h-96 flex items-center justify-center overflow-hidden rounded-lg shadow mb-8">
      <Image src={image} alt={title} fill className="absolute inset-0 w-full h-full object-cover object-center" />
      <div className="relative z-10 text-center text-white bg-black/40 p-8 rounded-lg max-w-lg mx-auto">
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-2">{title}</h2>
        {subtitle && <p className="text-lg md:text-xl mb-4">{subtitle}</p>}
        {cta && <Link href={cta.href} className="inline-block px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">{cta.label}</Link>}
      </div>
    </section>
  );
} 