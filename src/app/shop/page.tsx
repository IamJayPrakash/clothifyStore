"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { ProductCard, SectionTitle, Input, Button, Card } from '../../components/ui';
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
  discount?: number;
}

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Discount', value: 'discount' },
];

export default function ShopPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minDiscount, setMinDiscount] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

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

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (maxPrice && p.price > Number(maxPrice)) return false;
      if (minDiscount && (!p.oldPrice || Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) < Number(minDiscount))) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    if (sort === 'price-asc') filtered = filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') filtered = filtered.sort((a, b) => b.price - a.price);
    if (sort === 'discount') filtered = filtered.sort((a, b) => {
      const aDisc = a.oldPrice ? ((a.oldPrice - a.price) / a.oldPrice) : 0;
      const bDisc = b.oldPrice ? ((b.oldPrice - b.price) / b.oldPrice) : 0;
      return bDisc - aDisc;
    });
    return filtered;
  }, [products, selectedCategory, maxPrice, minDiscount, search, sort]);

  return (
    <main className="max-w-7xl mx-auto px-2 md:px-6 py-8">
      <SectionTitle>Shop</SectionTitle>
      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <Input
          className="w-full md:w-80"
          placeholder="Search for products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="w-full md:w-56 border rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 mb-6 md:mb-0">
          <Card className="p-6">
            <h3 className="font-bold mb-4 text-lg">Filters</h3>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Category</label>
              <select className="w-full border rounded px-2 py-1" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                <option value="">All</option>
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Max Price</label>
              <Input type="number" className="w-full" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="No limit" />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Min. Discount (%)</label>
              <Input type="number" className="w-full" value={minDiscount} onChange={e => setMinDiscount(e.target.value)} placeholder="0" />
            </div>
            <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => { setSelectedCategory(''); setMaxPrice(''); setMinDiscount(''); }}>Clear Filters</Button>
          </Card>
        </aside>
        {/* Product Grid */}
        <section className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="animate-pulse p-4 flex flex-col gap-4">
                  <div className="bg-gray-200 h-40 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-100 rounded w-1/2" />
                  <div className="h-8 bg-gray-100 rounded w-full mt-2" />
                </Card>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center text-gray-500 py-16">No products found.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} href={`/product/${product.slug}`} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
} 