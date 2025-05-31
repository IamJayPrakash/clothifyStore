import React from 'react';
import { ProductCard, SectionTitle } from '../../components/ui';

const products = [
  {
    id: '1',
    name: 'Elegant Red Saree',
    image: 'https://source.unsplash.com/400x400/?saree,red',
    price: 2499,
    oldPrice: 3999,
    href: '/product/elegant-red-saree',
  },
  {
    id: '2',
    name: 'Floral Anarkali Suit',
    image: 'https://source.unsplash.com/400x400/?anarkali,suit',
    price: 2999,
    oldPrice: 4499,
    href: '/product/floral-anarkali-suit',
  },
  {
    id: '3',
    name: 'Classic Blue Kurti',
    image: 'https://source.unsplash.com/400x400/?kurti,blue',
    price: 1199,
    oldPrice: 1999,
    href: '/product/classic-blue-kurti',
  },
  {
    id: '4',
    name: 'Designer Co-ord Set',
    image: 'https://source.unsplash.com/400x400/?co-ord,set',
    price: 1899,
    oldPrice: 2999,
    href: '/product/designer-coord-set',
  },
];

export default function ShopPage() {
  return (
    <main className="container mx-auto py-8">
      <SectionTitle>Shop</SectionTitle>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 bg-accent rounded-lg p-6 mb-6 md:mb-0">
          <h3 className="font-bold mb-4">Filters</h3>
          {/* TODO: Add category, price, discount, color filters */}
          <div className="text-gray-500">Filters coming soon.</div>
        </aside>
        {/* Product Grid */}
        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </section>
      </div>
    </main>
  );
} 