import React from 'react';
import { Card, SectionTitle } from '../../../components/ui';

const stats = [
  { label: 'Total Sales', value: '₹1,25,000' },
  { label: 'Orders', value: '320' },
  { label: 'Top Product', value: 'Elegant Red Saree' },
  { label: 'Revenue (This Month)', value: '₹45,000' },
];

export default function AdminDashboardPage() {
  return (
    <main className="container mx-auto py-8">
      <SectionTitle>Admin Dashboard</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 text-center">
            <div className="text-2xl font-bold mb-2">{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.label}</div>
          </Card>
        ))}
      </div>
      <Card className="p-8 text-center text-gray-500">Analytics and charts coming soon.</Card>
    </main>
  );
} 