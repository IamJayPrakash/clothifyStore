"use client";
import React, { useState } from 'react';
import { Card, Input, Button } from '../../components/ui';
import { useAuth } from '../../firebase/auth-context';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';

export default function ProfilePage() {
  const { user, logout, loading: authLoading } = useAuth();
  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      if (!user) throw new Error('Not logged in');
      if (name && name !== user.displayName) {
        await updateProfile(user, { displayName: name });
      }
      if (email && email !== user.email) {
        await updateEmail(user, email);
      }
      if (password) {
        await updatePassword(user, password);
      }
      setSuccess('Profile updated successfully!');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <Card className="p-6 max-w-lg mx-auto">
        <form onSubmit={handleUpdate} className="space-y-4">
          <Input label="Name" value={name} onChange={e => setName(e.target.value)} required />
          <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
          <Input label="New Password" value={password} onChange={e => setPassword(e.target.value)} type="password" helperText="Leave blank to keep current password" />
          {success && <div className="text-green-600 text-sm">{success}</div>}
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" className="w-full" loading={loading}>Update Profile</Button>
        </form>
        <Button className="w-full mt-4" variant="outline" onClick={logout} loading={authLoading}>Sign Out</Button>
      </Card>
    </main>
  );
} 