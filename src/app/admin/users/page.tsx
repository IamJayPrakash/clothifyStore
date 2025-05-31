import React from 'react';
import { Card, Button, SectionTitle } from '../../../components/ui';

const users = [
  { id: 'u1', name: 'Priya Sharma', email: 'priya@example.com', status: 'Active' },
  { id: 'u2', name: 'Amit Verma', email: 'amit@example.com', status: 'Blocked' },
];

export default function AdminUsersPage() {
  return (
    <main className="container mx-auto py-8">
      <SectionTitle>Manage Users</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id} className="p-6 flex flex-col gap-2">
            <div className="font-bold text-lg mb-1">{user.name}</div>
            <div className="text-gray-500 text-sm mb-2">{user.email}</div>
            <div className="mb-2 text-xs">Status: <span className={user.status === 'Blocked' ? 'text-red-500' : 'text-green-600'}>{user.status}</span></div>
            <div className="flex gap-2">
              <Button variant="secondary">{user.status === 'Blocked' ? 'Unblock' : 'Block'}</Button>
              <Button variant="outline">Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
} 