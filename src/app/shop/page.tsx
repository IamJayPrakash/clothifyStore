import React from 'react';
import { ProductCard, SectionTitle } from '../../components/ui';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

async function getProducts() {
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export default async function ShopPage() {
  const products = await getProducts();
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
          {products.map((product: any) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </section>
      </div>
    </main>
  );
} 