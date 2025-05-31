"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { ProductCard, SectionTitle } from '../../components/ui';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

interface ProductType {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  slug: string;
  description?: string;
  category?: string;
  color?: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const productsRef = collection(db, 'products');
      const snapshot = await getDocs(productsRef);
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProductType)));
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category).filter(Boolean))), [products]);
  const colors = useMemo(() => Array.from(new Set(products.map((p) => p.color).filter(Boolean))), [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (selectedColor && p.color !== selectedColor) return false;
      if (maxPrice && p.price > Number(maxPrice)) return false;
      return true;
    });
  }, [products, selectedCategory, selectedColor, maxPrice]);

  return (
    <main className="container mx-auto py-8">
      <SectionTitle>Shop</SectionTitle>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 bg-accent rounded-lg p-6 mb-6 md:mb-0">
          <h3 className="font-bold mb-4">Filters</h3>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Category</label>
            <select className="w-full border rounded px-2 py-1" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
              <option value="">All</option>
              {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Color</label>
            <select className="w-full border rounded px-2 py-1" value={selectedColor} onChange={e => setSelectedColor(e.target.value)}>
              <option value="">All</option>
              {colors.map((color) => <option key={color} value={color}>{color}</option>)}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Max Price</label>
            <input type="number" className="w-full border rounded px-2 py-1" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="No limit" />
          </div>
          <button className="text-sm text-gray-500 underline" onClick={() => { setSelectedCategory(''); setSelectedColor(''); setMaxPrice(''); }}>Clear Filters</button>
        </aside>
        {/* Product Grid */}
        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-gray-500 py-16">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-16">No products found.</div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} href={`/product/${product.slug}`} />
            ))
          )}
        </section>
      </div>
    </main>
  );
} 