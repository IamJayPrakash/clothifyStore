import React from 'react';
import { Card, Button } from '../../components/ui';

const orders = [
  {
    id: 'ORD1234',
    date: '2024-06-01',
    status: 'Delivered',
    total: 8497,
    items: [
      { name: 'Elegant Red Saree', qty: 1 },
      { name: 'Floral Anarkali Suit', qty: 2 },
    ],
  },
  {
    id: 'ORD5678',
    date: '2024-05-20',
    status: 'Shipped',
    total: 2999,
    items: [
      { name: 'Classic Blue Kurti', qty: 1 },
    ],
  },
];

export default function OrdersPage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id} className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="font-bold text-lg mb-1">Order #{order.id}</div>
              <div className="text-gray-500 text-sm mb-2">{order.date} &middot; {order.status}</div>
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
    </main>
  );
} 