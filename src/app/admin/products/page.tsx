import React from 'react';
import Link from 'next/link';
import { Card, Button, SectionTitle } from '../../../components/ui';

const products = [
  {
    id: '1',
    name: 'Elegant Red Saree',
    image: 'https://source.unsplash.com/400x400/?saree,red',
    price: 2499,
  },
  {
    id: '2',
    name: 'Floral Anarkali Suit',
    image: 'https://source.unsplash.com/400x400/?anarkali,suit',
    price: 2999,
  },
];

export default function AdminProductsPage() {
  return (
    <main className="container mx-auto py-8">
      <SectionTitle>Manage Products</SectionTitle>
      <div className="flex justify-end mb-6">
        <Link href="/admin/products/new">
          <Button>Add New Product</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="p-4 flex flex-col items-center">
            <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded mb-4" />
            <div className="font-bold text-lg mb-1">{product.name}</div>
            <div className="text-primary font-bold mb-2">₹{product.price}</div>
            <div className="flex gap-2">
              <Link href={`/admin/products/${product.id}/edit`}><Button variant="secondary">Edit</Button></Link>
              <Button variant="outline">Delete</Button>
            </div>
          </Card>
        ))}
      </div>
      <Card className="p-8 mt-8 text-center text-gray-500">Cloudinary image/video upload coming soon.</Card>
    </main>
  );
} 