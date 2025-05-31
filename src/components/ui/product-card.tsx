import React from 'react';
import Link from 'next/link';
import { Card } from './card';
import Image from 'next/image';

export interface ProductCardProps {
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  href: string;
}

export function ProductCard({ name, image, price, oldPrice, href }: ProductCardProps) {
  return (
    <Card className="overflow-hidden group">
      <Link href={href} className="block">
        <Image src={image} alt={name} width={224} height={224} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-primary font-bold text-lg">₹{price}</span>
            {oldPrice && <span className="text-gray-400 line-through text-sm">₹{oldPrice}</span>}
          </div>
          <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-1 rounded">Quick view</span>
        </div>
      </Link>
    </Card>
  );
} 