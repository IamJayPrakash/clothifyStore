"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../firebase/auth-context';
import { useRouter } from 'next/navigation';
import { Card, Button } from '../../../components/ui';

interface Order {
  id: string;
  user?: string;
  address?: string;
  items: { name: string; qty: number }[];
  total: number;
  status: string;
  paymentId?: string;
  createdAt?: { seconds: number; nanoseconds: number };
}

export default function AdminOrdersPage() {
  const { role, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && role !== 'admin') router.replace('/login');
  }, [role, loading, router]);

  useEffect(() => {
    if (role === 'admin') {
      fetch('/api/orders')
        .then(res => res.json())
        .then(setOrders)
        .finally(() => setLoadingOrders(false));
    }
  }, [role]);

  const handleStatusChange = async (orderId: string, status: string) => {
    setUpdating(orderId);
    await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setOrders(orders => orders.map(o => o.id === orderId ? { ...o, status } : o));
    setUpdating(null);
  };

  if (loading || role !== 'admin') return null;

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
      {loadingOrders ? (
        <div className="text-center text-gray-500 py-16">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500 py-16">No orders found.</div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <Card key={order.id} className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="font-bold text-lg mb-1">Order #{order.id}</div>
                <div className="text-gray-500 text-sm mb-2">
                  {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleString() : ''} &middot; {order.status}
                </div>
                <ul className="mb-2 text-sm">
                  {order.items.map((item, i) => (
                    <li key={i}>{item.name} x {item.qty}</li>
                  ))}
                </ul>
                <div className="font-bold">Total: ₹{order.total}</div>
                {order.paymentId && <div className="text-xs text-gray-500 mt-2">Razorpay Payment ID: {order.paymentId}</div>}
              </div>
              <div className="flex flex-col gap-2 min-w-[180px]">
                <select
                  className="border rounded px-2 py-1"
                  value={order.status}
                  onChange={e => handleStatusChange(order.id, e.target.value)}
                  disabled={updating === order.id}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <Button variant="outline" disabled>View Details</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
} 