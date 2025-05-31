'use client';
import React, { useState } from 'react';
import { Button } from '../../../components/ui';
import { db } from '../../../firebase/config';
import { collection, getDocs, query, where, doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../../firebase/auth-context';
import Image from 'next/image';

// Define ProductType and CartItemType
interface ProductType {
  id: string;
  name: string;
  image: string;
  images?: string[];
  price: number;
  oldPrice?: number;
  slug: string;
  description?: string;
  sizes?: string[];
}
interface CartItemType {
  id: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  href: string;
}

async function getProduct(slug: string) {
  const productsRef = collection(db, 'products');
  const q = query(productsRef, where('slug', '==', slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as ProductType;
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const { user } = useAuth();
  const [product, setProduct] = useState<ProductType | null>(null);

  React.useEffect(() => {
    getProduct(params.slug).then(setProduct);
  }, [params.slug]);

  if (!product) return <div className="text-center py-16">Loading...</div>;

  const handleAddToCart = async () => {
    setAdding(true);
    let cart: CartItemType[] = [];
    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      const cartSnap = await getDoc(cartRef);
      cart = cartSnap.exists() ? cartSnap.data().items as CartItemType[] : [];
      const exists = cart.find((item) => item.id === product.id);
      if (exists) {
        cart = cart.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      } else {
        cart.push({ id: product.id, name: product.name, image: product.images?.[0] || product.image, price: product.price, qty: 1, href: `/product/${product.slug}` });
      }
      await setDoc(cartRef, { items: cart });
    } else {
      cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const exists = cart.find((item: CartItemType) => item.id === product.id);
      if (exists) {
        cart = cart.map((item: CartItemType) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      } else {
        cart.push({ id: product.id, name: product.name, image: product.images?.[0] || product.image, price: product.price, qty: 1, href: `/product/${product.slug}` });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <main className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Gallery */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="w-full aspect-[3/4] bg-accent rounded-lg overflow-hidden flex items-center justify-center">
            <Image src={product.images?.[0] || product.image} alt={product.name} width={400} height={400} className="object-cover w-full h-full" />
          </div>
          <div className="flex gap-2">
            {(product.images || [product.image]).map((img: string, i: number) => (
              <Image key={i} src={img} alt="thumb" width={64} height={64} className="w-16 h-16 object-cover rounded border hover:border-primary cursor-pointer" />
            ))}
          </div>
        </div>
        {/* Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary text-2xl font-bold">₹{product.price}</span>
            {product.oldPrice && <span className="text-gray-400 line-through text-lg">₹{product.oldPrice}</span>}
            {product.oldPrice && <span className="bg-secondary text-dark px-2 py-1 rounded text-xs font-semibold ml-2">Save {Math.round(((product.oldPrice-product.price)/product.oldPrice)*100)}%</span>}
          </div>
          <p className="mb-6 text-gray-700">{product.description}</p>
          {product.sizes && (
            <div className="mb-6">
              <div className="font-semibold mb-2">Select Size:</div>
              <div className="flex gap-2">
                {product.sizes.map((size: string) => (
                  <button key={size} className="px-4 py-2 border rounded hover:bg-primary hover:text-white transition text-sm font-medium">{size}</button>
                ))}
              </div>
            </div>
          )}
          <Button className="w-full md:w-auto" onClick={handleAddToCart} loading={adding} disabled={added}>
            {added ? 'Added!' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </main>
  );
} 