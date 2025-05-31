import React, { useState } from 'react';
import { Card, Input, Button, SectionTitle, CloudinaryUpload } from '../../../components/ui';
import { db } from '../../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../../../firebase/auth-context';
import { useRouter } from 'next/navigation';

export default function AdminNewProductPage() {
  const { role, loading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  React.useEffect(() => {
    if (!loading && role !== 'admin') router.replace('/login');
  }, [role, loading, router]);

  if (loading || role !== 'admin') return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert('Please upload an image.');
      return;
    }
    try {
      await addDoc(collection(db, 'products'), {
        name,
        price: Number(price),
        image,
        createdAt: new Date(),
      });
      setName('');
      setPrice('');
      setImage('');
      alert('Product added successfully!');
    } catch {
      alert('Failed to add product.');
    }
  };

  return (
    <main className="container mx-auto py-8">
      <SectionTitle>Add New Product</SectionTitle>
      <Card className="p-8 max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Product Name" value={name} onChange={e => setName(e.target.value)} required />
          <Input label="Price" value={price} onChange={e => setPrice(e.target.value)} type="number" required />
          {/* <Input label="Image URL" value={image} onChange={e => setImage(e.target.value)} required /> */}
          <CloudinaryUpload onUpload={setImage} />
          <Button type="submit" className="w-full">Add Product</Button>
        </form>
        <div className="mt-8 text-center text-gray-500">Cloudinary image/video upload coming soon.</div>
      </Card>
    </main>
  );
} 