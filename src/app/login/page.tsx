"use client";
import React, { useState } from 'react';
import { Card, Input, Button, SectionTitle } from '../../components/ui';
import { useAuth } from '../../firebase/auth-context';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { login, loading, loginWithGoogle } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      router.push('/profile');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <main className="container mx-auto py-8">
      <SectionTitle>Login</SectionTitle>
      <Card className="p-8 max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
          <Input label="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" required />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" className="w-full" loading={loading}>Login</Button>
        </form>
        <Button type="button" variant="outline" className="w-full mt-4" onClick={loginWithGoogle} disabled={loading}>
          Login with Google
        </Button>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account? <a href="/signup" className="text-primary underline">Sign Up</a>
        </div>
      </Card>
    </main>
  );
} 