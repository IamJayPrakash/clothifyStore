"use client";
import React, { useState, useEffect } from 'react';
import { Card, Button } from '../../components/ui';
import { useAuth } from '../../firebase/auth-context';
import { useRouter } from 'next/navigation';
import { db } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

interface Order {
  id: string;
  user?: string;
  address?: string;
  items: { name: string; qty: number }[];
  total: number;
  status: string;
  createdAt?: { seconds: number; nanoseconds: number };
}

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      async function fetchOrders() {
        setLoadingOrders(true);
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('user', '==', user!.uid));
        const snapshot = await getDocs(q);
        setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order)));
        setLoadingOrders(false);
      }
      fetchOrders();
    }
  }, [user]);

  if (loading || !user) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 flex flex-col py-8 px-2">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">Order History</h1>
      {loadingOrders ? (
        <div className="text-center text-gray-500 py-16">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500 py-16">No orders found.</div>
      ) : (
        <div className="space-y-6 max-w-3xl mx-auto">
          {orders.map((order) => (
            <Card key={order.id} className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-xl border-0">
              <div>
                <div className="font-bold text-lg mb-1">Order #{order.id}</div>
                <div className="text-gray-500 text-sm mb-2">
                  {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleString() : ''} &middot; <span className={`font-semibold ${order.status === 'pending' ? 'text-yellow-600' : order.status === 'delivered' ? 'text-green-600' : 'text-primary'}`}>{order.status}</span>
                </div>
                <ul className="mb-2 text-sm">
                  {order.items.map((item, i) => (
                    <li key={i}>{item.name} x {item.qty}</li>
                  ))}
                </ul>
                <div className="font-bold">Total: ₹{order.total}</div>
              </div>
              <div className="flex flex-col gap-2 min-w-[140px]">
                <Button variant="outline">Download Invoice</Button>
                <Button variant="secondary">Track Order</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
} 