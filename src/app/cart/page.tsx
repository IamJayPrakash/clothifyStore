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
    <main className="max-w-5xl mx-auto px-2 md:px-6 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          Your cart is empty.<br />
          <Link href="/shop" className="text-primary underline">Continue Shopping</Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-10">
          <section className="flex-1 space-y-6">
            {cart.map((item) => (
              <Card key={item.id} className="flex flex-col sm:flex-row items-center gap-6 p-4 group">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover rounded-lg border" />
                </div>
                <div className="flex-1 w-full flex flex-col gap-2">
                  <Link href={item.href} className="font-semibold text-lg md:text-xl hover:text-primary transition-colors line-clamp-2">{item.name}</Link>
                  <div className="text-primary font-bold text-lg">₹{item.price}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="outline" size="sm" className="rounded-full px-3 py-1" aria-label="Decrease quantity" onClick={() => updateQty(item.id, item.qty - 1)}>-</Button>
                    <span className="px-3 text-base font-medium">{item.qty}</span>
                    <Button variant="outline" size="sm" className="rounded-full px-3 py-1" aria-label="Increase quantity" onClick={() => updateQty(item.id, item.qty + 1)}>+</Button>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="ml-auto mt-4 sm:mt-0" onClick={() => removeItem(item.id)} aria-label="Remove item">Remove</Button>
              </Card>
            ))}
          </section>
          <aside className="w-full md:w-80">
            <Card className="p-6 sticky top-24">
              <h2 className="font-bold text-xl mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2 text-base">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between mb-4 text-base">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <Link href="/checkout">
                <Button className="w-full text-lg py-3 rounded-full font-semibold shadow hover:scale-[1.02] transition-transform">Proceed to Checkout</Button>
              </Link>
            </Card>
          </aside>
        </div>
      )}
    </main>
  );
} 