"use client";
import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../components/ui';
import Link from 'next/link';
import { useAuth } from '../../firebase/auth-context';
import { db } from '../../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Image from 'next/image';

export default function CartPage() {
  const { user } = useAuth();
  const [cart, setCart] = useState<Array<{ id: string; name: string; image: string; price: number; qty: number; href: string }>>([]);
  const [loading, setLoading] = useState(true);

  // Load cart from Firestore or localStorage
  useEffect(() => {
    async function fetchCart() {
      setLoading(true);
      if (user) {
        const cartRef = doc(db, 'carts', user.uid);
        const cartSnap = await getDoc(cartRef);
        setCart(cartSnap.exists() ? cartSnap.data().items : []);
      } else {
        const local = localStorage.getItem('cart');
        setCart(local ? JSON.parse(local) : []);
      }
      setLoading(false);
    }
    fetchCart();
  }, [user]);

  // Sync cart to Firestore or localStorage
  useEffect(() => {
    if (loading) return;
    if (user) {
      setDoc(doc(db, 'carts', user.uid), { items: cart });
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, user, loading]);

  const updateQty = (id: string, qty: number) => {
    setCart((prev) => prev.map((item) => item.id === id ? { ...item, qty: Math.max(1, qty) } : item));
  };
  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (loading) return <div className="text-center py-16">Loading cart...</div>;

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          Your cart is empty.<br />
          <Link href="/shop" className="text-primary underline">Continue Shopping</Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <section className="flex-1 space-y-6">
            {cart.map((item) => (
              <Card key={item.id} className="flex items-center gap-4 p-4">
                <Image src={item.image} alt={item.name} width={96} height={96} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <Link href={item.href} className="font-semibold text-lg hover:underline">{item.name}</Link>
                  <div className="text-primary font-bold">₹{item.price}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-2 py-1 border rounded">-</button>
                    <span className="px-3">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-2 py-1 border rounded">+</button>
                  </div>
                </div>
                <Button variant="outline" onClick={() => removeItem(item.id)}>Remove</Button>
              </Card>
            ))}
          </section>
          <aside className="w-full md:w-80 bg-accent rounded-lg p-6 h-fit">
            <h2 className="font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <Link href="/checkout">
              <Button className="w-full">Proceed to Checkout</Button>
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
} 