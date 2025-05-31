import React, { useState } from 'react';
import { Card, Input, Button } from '../../components/ui';
import { useAuth } from '../../firebase/auth-context';

const userData = {
  name: 'Priya Sharma',
  email: 'priya@example.com',
};

export default function ProfilePage() {
  const { user, logout, loading: authLoading } = useAuth();
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Update profile in Firebase
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <Card className="p-6 max-w-lg mx-auto">
        <form onSubmit={handleUpdate} className="space-y-4">
          <Input label="Name" value={name} onChange={e => setName(e.target.value)} required />
          <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
          <Input label="New Password" value={password} onChange={e => setPassword(e.target.value)} type="password" helperText="Leave blank to keep current password" />
          <Button type="submit" className="w-full" loading={loading}>Update Profile</Button>
        </form>
        <Button className="w-full mt-4" variant="outline" onClick={logout} loading={authLoading}>Sign Out</Button>
      </Card>
    </main>
  );
} 