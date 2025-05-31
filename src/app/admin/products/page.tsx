"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, Button, SectionTitle } from '../../../components/ui';
import { useAuth } from '../../../firebase/auth-context';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { db } from '../../../firebase/config';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

interface ProductAdmin {
  id: string;
  name: string;
  image: string;
  price: number;
}

export default function AdminProductsPage() {
  const { role, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<ProductAdmin[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && role !== 'admin') router.replace('/login');
  }, [role, loading, router]);

  useEffect(() => {
    if (role === 'admin') {
      async function fetchProducts() {
        setLoadingProducts(true);
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(productsRef);
        setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProductAdmin)));
        setLoadingProducts(false);
      }
      fetchProducts();
    }
  }, [role]);

  const handleDelete = async (productId: string) => {
    setDeleting(productId);
    await deleteDoc(doc(db, 'products', productId));
    setProducts(products => products.filter(p => p.id !== productId));
    setDeleting(null);
  };

  if (loading || role !== 'admin') return null;

  return (
    <main className="container mx-auto py-8">
      <SectionTitle>Manage Products</SectionTitle>
      <div className="flex justify-end mb-6">
        <Link href="/admin/products/new">
          <Button>Add New Product</Button>
        </Link>
      </div>
      {loadingProducts ? (
        <div className="text-center text-gray-500 py-16">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-500 py-16">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="p-4 flex flex-col items-center">
              <Image src={product.image} alt={product.name} width={128} height={128} className="w-32 h-32 object-cover rounded mb-4" />
              <div className="font-bold text-lg mb-1">{product.name}</div>
              <div className="text-primary font-bold mb-2">₹{product.price}</div>
              <div className="flex gap-2">
                <Link href={`/admin/products/${product.id}/edit`}><Button variant="secondary">Edit</Button></Link>
                <Button variant="outline" onClick={() => handleDelete(product.id)} loading={deleting === product.id}>Delete</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
      <Card className="p-8 mt-8 text-center text-gray-500">Cloudinary image/video upload coming soon.</Card>
    </main>
  );
} 