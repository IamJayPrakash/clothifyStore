import React, { useState } from 'react';
import { Card, Input, Button, SectionTitle, CloudinaryUpload } from '../../../../components/ui';
import { db } from '../../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../../../firebase/auth-context';
import { useRouter } from 'next/navigation';

const product = {
  name: 'Elegant Red Saree',
  price: 2499,
  image: 'https://source.unsplash.com/400x400/?saree,red',
};

export default function AdminEditProductPage({ params }: { params: { id: string } }) {
  const { role, loading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());
  const [image, setImage] = useState(product.image);

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
      await updateDoc(doc(db, 'products', params.id), {
        name,
        price: Number(price),
        image,
        updatedAt: new Date(),
      });
      alert('Product updated successfully!');
    } catch {
      alert('Failed to update product.');
    }
  };

  return (
    <main className="container mx-auto py-8">
      <SectionTitle>Edit Product: {params.id}</SectionTitle>
      <Card className="p-8 max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Product Name" value={name} onChange={e => setName(e.target.value)} required />
          <Input label="Price" value={price} onChange={e => setPrice(e.target.value)} type="number" required />
          {/* <Input label="Image URL" value={image} onChange={e => setImage(e.target.value)} required /> */}
          <CloudinaryUpload onUpload={setImage} initialUrl={image} />
          <Button type="submit" className="w-full">Update Product</Button>
        </form>
        <div className="mt-8 text-center text-gray-500">Cloudinary image/video upload coming soon.</div>
      </Card>
    </main>
  );
} 