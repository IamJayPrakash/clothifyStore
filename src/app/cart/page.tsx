import React, { useState } from 'react';
import { Button, Card } from '../../components/ui';
import Link from 'next/link';

const initialCart = [
  {
    id: '1',
    name: 'Elegant Red Saree',
    image: 'https://source.unsplash.com/400x400/?saree,red',
    price: 2499,
    qty: 1,
    href: '/product/elegant-red-saree',
  },
  {
    id: '2',
    name: 'Floral Anarkali Suit',
    image: 'https://source.unsplash.com/400x400/?anarkali,suit',
    price: 2999,
    qty: 2,
    href: '/product/floral-anarkali-suit',
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const updateQty = (id: string, qty: number) => {
    setCart((prev) => prev.map((item) => item.id === id ? { ...item, qty: Math.max(1, qty) } : item));
  };
  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

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
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
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