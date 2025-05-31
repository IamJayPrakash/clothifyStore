"use client";
import React, { useState } from 'react';
import { Card, Input, Button, SectionTitle } from '../../components/ui';
import { useAuth } from '../../firebase/auth-context';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const { signup, loading, loginWithGoogle } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signup(email, password);
      router.push('/profile');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    }
  };

  return (
    <main className="container mx-auto py-8">
      <SectionTitle>Sign Up</SectionTitle>
      <Card className="p-8 max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
          <Input label="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" required />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" className="w-full" loading={loading}>Sign Up</Button>
        </form>
        <Button type="button" variant="outline" className="w-full mt-4" onClick={loginWithGoogle} disabled={loading}>
          Sign Up with Google
        </Button>
        <div className="mt-4 text-center text-sm">
          Already have an account? <a href="/login" className="text-primary underline">Login</a>
        </div>
      </Card>
    </main>
  );
} 