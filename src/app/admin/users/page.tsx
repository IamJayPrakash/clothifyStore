"use client";
import React, { useState, useEffect } from 'react';
import { Card, Button, SectionTitle } from '../../../components/ui';
import { useAuth } from '../../../firebase/auth-context';
import { useRouter } from 'next/navigation';

interface UserAdmin {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Blocked';
}

export default function AdminUsersPage() {
  const { role, loading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<UserAdmin[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && role !== 'admin') router.replace('/login');
  }, [role, loading, router]);

  useEffect(() => {
    if (role === 'admin') {
      fetch('/api/users')
        .then(res => res.json())
        .then(setUsers)
        .finally(() => setLoadingUsers(false));
    }
  }, [role]);

  const handleBlockToggle = async (user: UserAdmin) => {
    setUpdating(user.id);
    await fetch(`/api/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: user.status === 'Blocked' ? 'Active' : 'Blocked' }),
    });
    setUsers(users => users.map(u => u.id === user.id ? { ...u, status: user.status === 'Blocked' ? 'Active' : 'Blocked' } : u));
    setUpdating(null);
  };

  const handleDelete = async (user: UserAdmin) => {
    setUpdating(user.id);
    await fetch(`/api/users/${user.id}`, { method: 'DELETE' });
    setUsers(users => users.filter(u => u.id !== user.id));
    setUpdating(null);
  };

  if (loading || role !== 'admin') return null;

  return (
    <main className="container mx-auto py-8">
      <SectionTitle>Manage Users</SectionTitle>
      {loadingUsers ? (
        <div className="text-center text-gray-500 py-16">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-500 py-16">No users found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <Card key={user.id} className="p-6 flex flex-col gap-2">
              <div className="font-bold text-lg mb-1">{user.name}</div>
              <div className="text-gray-500 text-sm mb-2">{user.email}</div>
              <div className="mb-2 text-xs">Status: <span className={user.status === 'Blocked' ? 'text-red-500' : 'text-green-600'}>{user.status}</span></div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => handleBlockToggle(user)} loading={updating === user.id}>
                  {user.status === 'Blocked' ? 'Unblock' : 'Block'}
                </Button>
                <Button variant="outline" onClick={() => handleDelete(user)} loading={updating === user.id}>Delete</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
} 