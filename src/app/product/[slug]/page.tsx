import React from 'react';
import { Button, Card } from '../../../components/ui';

const product = {
  name: 'Elegant Red Saree',
  images: [
    'https://source.unsplash.com/600x800/?saree,red',
    'https://source.unsplash.com/600x800/?saree,ethnic',
    'https://source.unsplash.com/600x800/?saree,indian',
  ],
  price: 2499,
  oldPrice: 3999,
  description: 'A beautiful red saree with intricate embroidery and premium fabric. Perfect for festive occasions.',
  sizes: ['S', 'M', 'L', 'XL'],
};

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  return (
    <main className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Gallery */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="w-full aspect-[3/4] bg-accent rounded-lg overflow-hidden flex items-center justify-center">
            <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full" />
          </div>
          <div className="flex gap-2">
            {product.images.map((img, i) => (
              <img key={i} src={img} alt="thumb" className="w-16 h-16 object-cover rounded border hover:border-primary cursor-pointer" />
            ))}
          </div>
        </div>
        {/* Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary text-2xl font-bold">₹{product.price}</span>
            <span className="text-gray-400 line-through text-lg">₹{product.oldPrice}</span>
            <span className="bg-secondary text-dark px-2 py-1 rounded text-xs font-semibold ml-2">Save {Math.round(((product.oldPrice-product.price)/product.oldPrice)*100)}%</span>
          </div>
          <p className="mb-6 text-gray-700">{product.description}</p>
          <div className="mb-6">
            <div className="font-semibold mb-2">Select Size:</div>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button key={size} className="px-4 py-2 border rounded hover:bg-primary hover:text-white transition text-sm font-medium">{size}</button>
              ))}
            </div>
          </div>
          <Button className="w-full md:w-auto">Add to Cart</Button>
        </div>
      </div>
    </main>
  );
} 