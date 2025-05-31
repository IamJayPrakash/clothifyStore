"use client";
import React, { useState, useEffect } from 'react';
import { Button, Input, Card } from '../../components/ui';
import { useAuth } from '../../firebase/auth-context';
import { db } from '../../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) return resolve(true);
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const { user } = useAuth();
  const [cart, setCart] = useState<Array<{ id: string; name: string; image: string; price: number; qty: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState('');
  const [paying, setPaying] = useState(false);
  const router = useRouter();

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

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePay = async () => {
    setPaying(true);
    if (!address) {
      alert('Please enter your shipping address.');
      setPaying(false);
      return;
    }
    if (cart.length === 0) {
      alert('Your cart is empty.');
      setPaying(false);
      return;
    }
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Failed to load Razorpay.');
      setPaying(false);
      return;
    }
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: total * 100,
      currency: 'INR',
      name: 'Clothify Store',
      description: 'Order Payment',
      handler: async function (response: unknown) {
        // Save order to Firestore
        try {
          await addDoc(collection(db, 'orders'), {
            user: user ? user.uid : null,
            address,
            items: cart,
            total,
            paymentId: (response as { razorpay_payment_id: string }).razorpay_payment_id,
            status: 'pending',
            createdAt: Timestamp.now(),
          });
          // Clear cart
          if (user) {
            await setDoc(doc(db, 'carts', user.uid), { items: [] });
          } else {
            localStorage.removeItem('cart');
          }
          router.push('/orders/success');
        } catch {
          router.push('/orders/failure');
        }
      },
      prefill: {
        name: user?.displayName || '',
        email: user?.email || '',
      },
      theme: { color: '#e11d48' },
      modal: {
        ondismiss: function () {
          setPaying(false);
        },
      },
    };
    // @ts-expect-error: Razorpay is not typed in the window object
    const rzp = new window.Razorpay(options);
    rzp.open();
    setPaying(false);
  };

  if (loading) return <div className="text-center py-16">Loading cart...</div>;

  return (
    <main className="max-w-4xl mx-auto px-2 md:px-6 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">Checkout</h1>
      <div className="flex flex-col md:flex-row gap-10">
        {/* Address Form */}
        <section className="flex-1">
          <Card className="p-6 mb-6">
            <h2 className="font-bold text-xl mb-4">Shipping Address</h2>
            <Input
              label="Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Enter your shipping address"
              className="mb-4"
              required
            />
            {/* TODO: Add more address fields as needed */}
          </Card>
        </section>
        {/* Order Summary */}
        <aside className="w-full md:w-80">
          <Card className="p-6 sticky top-24">
            <h2 className="font-bold text-xl mb-4">Order Summary</h2>
            <ul className="mb-4 divide-y divide-gray-100">
              {cart.map((item, i) => (
                <li key={i} className="flex justify-between items-center py-2">
                  <span className="font-medium text-base line-clamp-1">{item.name} <span className="text-gray-400">× {item.qty}</span></span>
                  <span className="font-semibold">₹{item.price * item.qty}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <Button className="w-full text-lg py-3 rounded-full font-semibold shadow hover:scale-[1.02] transition-transform" loading={paying} onClick={handlePay} disabled={cart.length === 0 || !address}>Pay with Razorpay</Button>
          </Card>
        </aside>
      </div>
    </main>
  );
} 